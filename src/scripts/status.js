// The only JavaScript shipped to the browser.
// Minecraft servers are checked with the public mcsrvstat.us API;
// other games with the public BattleMetrics API. Both allow browser requests.
import { games, gameLabel } from '../data/games.js';

const MC_API = { minecraft: 'https://api.mcsrvstat.us/3/', bedrock: 'https://api.mcsrvstat.us/bedrock/3/' };
const BM_API = 'https://api.battlemetrics.com/servers';

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Status lookup failed');
  return res.json();
}

// Every lookup returns the same shape: { online, players, version, name? } or null if not found.
async function minecraftStatus(game, address) {
  const data = await getJSON(MC_API[game] + encodeURIComponent(address));
  if (!data.online) return { online: false };
  return {
    online: true,
    players: `${data.players?.online ?? 0} / ${data.players?.max ?? '?'}`,
    version: data.protocol?.name || data.version || 'Unknown',
  };
}

async function battlemetricsStatus(game, query) {
  const params = new URLSearchParams({
    'filter[game]': game,
    'filter[search]': query,
    'page[size]': '1',
    sort: 'rank',
  });
  const { data } = await getJSON(`${BM_API}?${params}`);
  const server = data?.[0]?.attributes;
  if (!server) return null;
  return {
    online: server.status === 'online',
    players: `${server.players ?? 0} / ${server.maxPlayers ?? '?'}`,
    version: server.details?.map || server.details?.version || 'Unknown',
    name: server.name,
  };
}

function getStatus(game, address) {
  const source = games.find((g) => g.id === game)?.source;
  if (source === 'mcsrvstat') return minecraftStatus(game, address);
  if (source === 'battlemetrics') return battlemetricsStatus(game, address);
  throw new Error('Unknown game');
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
    const status = await getStatus(card.dataset.game || 'minecraft', card.dataset.server);
    if (!status) return setState(card, 'off', 'Not found');
    if (status.name) card.querySelector('.addr').textContent = status.name;
    if (status.online) {
      setState(card, 'on', 'Online');
      setField(card, 'players', status.players);
      setField(card, 'version', status.version);
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
const gameSelect = document.querySelector('#game');
const addressInput = document.querySelector('#address');

function updatePlaceholder() {
  const isMinecraft = games.find((g) => g.id === gameSelect.value)?.source === 'mcsrvstat';
  addressInput.placeholder = isMinecraft ? 'play.example.net' : 'Server name or IP';
}
gameSelect?.addEventListener('change', updatePlaceholder);

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = new FormData(form);
  const address = fields.get('address').toString().trim();
  const game = fields.get('game').toString();
  if (!address) return;
  const card = template.content.firstElementChild.cloneNode(true);
  card.dataset.server = address;
  card.dataset.game = game;
  card.querySelector('h3').textContent = address;
  card.querySelector('.addr').textContent = address;
  setField(card, 'game', gameLabel(game));
  results.prepend(card);
  fillCard(card);
  addressInput.value = '';
});
