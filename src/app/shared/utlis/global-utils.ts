export function executeOnDelay(ms: number, func: () => void): void {
  new Promise((resolve) => setTimeout(resolve, ms)).then(func);
}

export function capitalize(word: string): string {
  if (!word) {
    return word;
  }
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function getTitleCase(str): string {
  return capitalize(str).replace('-', ' ');
}


export function savePlayerToStorage(playerName: string, playerId: string): void {
  localStorage.setItem('playerName', playerName);
  localStorage.setItem('playerId', playerId);
}

export function getPlayerName(): string {
  return localStorage.getItem('playerName');
}

export function getPlayerId(): string {
  return localStorage.getItem('playerId');
}

export function setTheme(theme: string): void {
  localStorage.setItem('theme', theme);
}

export function getTheme(): string {
  let theme = localStorage.getItem('theme');
  if (!theme) {
    theme = 'light';
    setTheme(theme);
  }
  return theme;
}

export function clearToken(): void {
  localStorage.removeItem('jwt');
}

export function getToken(): string {
  return localStorage.getItem('jwt');
}

export function setToken(token: string): void {
  return localStorage.setItem('jwt', token);
}
