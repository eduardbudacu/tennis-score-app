export interface Player {
  id: number
  name: string
};

export type Set = [number, number];

export interface Match {
  playerId: number
  opponentId: number
  result: Set[]
  aces: [number, number]
  smashedRackets: [number, number]
  doubleFaults: [number, number]
};

export interface PlayerData {
  players: Player[]
  matches: Match[]
}
