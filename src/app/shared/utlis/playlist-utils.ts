import { GridApi } from 'ag-grid-community';
import { Playlist } from '../model/playlists/playlist';
import { PlaylistSong } from '../model/playlists/playlist-song';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

export function createPlaylist(api: GridApi, http: HttpClient): void {
  http.get('assets/logo-data', { responseType: 'text' }).subscribe((imageData) => {
    const songs: PlaylistSong[] = [];
    api.forEachNode((row) =>
      addIfNotExists({ songName: row.data.songName, hash: row.data.songHash }, songs)
    );

    const playlist: Playlist = {
      playlistAuthor: 'accsaber',
      image: imageData,
      playlistTitle: 'Accsaber Ranked Maps',
      songs,
    };

    const blob = new Blob([JSON.stringify(playlist)], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'accsaber-rankedmaps.json');
  });
}

function addIfNotExists(song: PlaylistSong, songs: PlaylistSong[]): void {
  if (songs.every((s) => s.hash !== song.hash)) {
    songs.push(song);
  }
}
