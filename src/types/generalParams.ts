export interface GeneralParams {
  temperature: number;
  minBpm: number;
  maxBpm: number;
  avgBpm: number;
  day: string;
  bloodPressure: {
    min: number;
    max: number;
  };
}
