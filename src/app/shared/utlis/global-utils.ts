import { ValueFormatterParams } from 'ag-grid-community';

export function capitalize(word: string): string {
  if (!word) {
    return word;
  }
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function accValueFormatter(params: ValueFormatterParams): string {
  return `${params.value.toFixed(2)}%`;
}

export function songNameValueGetter(data: any): string {
  return `${data.songAuthorName} - ${data.songName}`;
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
