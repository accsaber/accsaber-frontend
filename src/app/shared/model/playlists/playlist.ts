import { PlaylistSong } from './playlist-song';

export interface Playlist {
  playlistTitle: string;
  playlistAuthor: string;
  image: string;
  songs: PlaylistSong[];
}
