export interface RankedStatistics {
  mapCount: number;
  trueAccMapCount: number;
  standardAccMapCount: number;
  techAccMapCount: number;

  techynessToMapCount: { [n: number]: number };
}
