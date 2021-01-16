export interface Player {
  rank: number;
  playerName: string;
  playerId: string;
  ap: number;
  averageAcc: number;
  hmd: string;
  avatarUrl: string;
  isAccChamp: boolean;

  averageApPerMap: number;
  rankedPlays: number;
}
