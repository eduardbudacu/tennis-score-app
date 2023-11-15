export type Player = {
    id: number;
    name: string;
}

export type Set = [number, number];

export type Match = {
    playerId: number;
    opponentId: number;
    result: Set[];
    aces: [number, number];
    smashedRackets: [number, number];
    doubleFaults: [number, number];
}

export type PlayerData = {
    players: Player[];
    matches: Match[];
}