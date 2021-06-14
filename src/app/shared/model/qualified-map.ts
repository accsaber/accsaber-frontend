export interface QualifiedMap {
  songName: string;
  songSubName: string;
  songAuthorName: string;
  levelAuthorName: string;

  techynessSuggestions: number[];

  difficulty: string;
  leaderboardId: string;
  beatsaverKey: string;
  songHash: string;

  upvotes: number;
  downvotes: number;
  userVote: number; // lists of players who voted (by id)
}
