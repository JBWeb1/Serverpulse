// The only JavaScript shipped to the browser.
// It asks the public mcsrvstat.us API for each server's status and fills in the cards.
const API = 'https://api.mcsrvstat.us/3/';

async function getStatus(address) {
  const res = await fetch(API + encodeURIComponent(address));
  if (!res.ok) throw new Error('Status lookup failed');
  return res.json();
}

function setField(card, field, text) {
  const el = card.querySelector(`[data-field="${field}"]`);
  if (el) el.textContent = text; // textContent, so server-supplied text can never inject HTML
}

function setState(card, state, label) {
  const pill = card.querySelector('[data-field="state"]');
  pill.dataset.state = state;
  pill.textContent = label;
}

async function fillCard(card) {
  try {
    const data = await getStatus(card.dataset.server);
    if (data.online) {
      setState(card, 'on', 'Online');
      setField(card, 'players', `${data.players?.online ?? 0} / ${data.players?.max ?? '?'}`);
      setField(card, 'version', data.protocol?.name || data.version || 'Unknown');
    } else {
      setState(card, 'off', 'Offline');
    }
  } catch {
    setState(card, 'off', 'No data');
  }
}

document.querySelectorAll('.card[data-server]').forEach(fillCard);

// "Check any server" form: clone the hidden template card and fill it.
const form = document.querySelector('#lookup');
const results = document.querySelector('#results');
const template = document.querySelector('#card-template');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const address = new FormData(form).get('address').toString().trim();
  if (!address) return;
  const card = template.content.firstElementChild.cloneNode(true);
  card.dataset.server = address;
  card.querySelector('h3').textContent = address;
  card.querySelector('.addr').textContent = address;
  results.prepend(card);
  fillCard(card);
  form.reset();
});
