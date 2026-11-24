// Public game servers shown on the home page.
// Add or remove entries here; the page is generated from this list at build time.
// `game` must be an id from src/data/games.js.
// Minecraft servers use their address. Other games use a server name or IP,
// which is searched on BattleMetrics (the best-ranked match is shown).
export const servers = [
  { game: 'minecraft', name: 'Hypixel', address: 'mc.hypixel.net', note: 'Minigames network' },
  { game: 'minecraft', name: 'CubeCraft', address: 'play.cubecraft.net', note: 'Minigames network' },
  { game: 'minecraft', name: '2b2t', address: '2b2t.org', note: 'Anarchy survival' },
  { game: 'rust', name: 'Rustoria', address: 'Rustoria.co - US Main', note: 'Rust survival' },
  { game: 'gmod', name: 'DarkRP', address: 'DarkRP', note: "Garry's Mod roleplay" },
];
