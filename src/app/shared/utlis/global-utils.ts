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
