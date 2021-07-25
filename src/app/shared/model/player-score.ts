export interface PlayerScore {
  rank: number;
  ap: number;
  score: number;
  accuracy: number;

  songName: string;
  songAuthorName: string;
  levelAuthorName: string;
  complexity: number;
  songHash: string;

  difficulty: string;
  leaderboardId: string;
  beatsaverKey: string;
}
