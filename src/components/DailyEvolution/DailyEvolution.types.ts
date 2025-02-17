export interface DailyEvolutionData {
  hour: number;
  temperature: number;
}

export const mockDailyEvolutionData: DailyEvolutionData[] = [
  { hour: 0, temperature: 18 },
  { hour: 3, temperature: 16 },
  { hour: 6, temperature: 15 },
  { hour: 9, temperature: 20 },
  { hour: 12, temperature: 25 },
  { hour: 15, temperature: 27 },
  { hour: 18, temperature: 23 },
  { hour: 21, temperature: 20 },
];
