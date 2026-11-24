// Games ServerPulse can check, and which public API answers for each.
// "mcsrvstat" games are looked up by address; "battlemetrics" games by name or IP.
export const games = [
  { id: 'minecraft', label: 'Minecraft (Java)', source: 'mcsrvstat' },
  { id: 'bedrock', label: 'Minecraft (Bedrock)', source: 'mcsrvstat' },
  { id: 'rust', label: 'Rust', source: 'battlemetrics' },
  { id: 'ark', label: 'ARK: Survival Evolved', source: 'battlemetrics' },
  { id: 'dayz', label: 'DayZ', source: 'battlemetrics' },
  { id: 'cs2', label: 'Counter-Strike 2', source: 'battlemetrics' },
  { id: 'gmod', label: "Garry's Mod", source: 'battlemetrics' },
  { id: 'arma3', label: 'Arma 3', source: 'battlemetrics' },
  { id: 'squad', label: 'Squad', source: 'battlemetrics' },
  { id: 'valheim', label: 'Valheim', source: 'battlemetrics' },
  { id: 'palworld', label: 'Palworld', source: 'battlemetrics' },
];

export const gameLabel = (id) => games.find((g) => g.id === id)?.label ?? id;
