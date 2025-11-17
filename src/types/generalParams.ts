export interface GeneralParams {
  temperature: number;
  minBpm: number;
  maxBpm: number;
  bloodPressure: {
    min: number;
    max: number;
  };
}
