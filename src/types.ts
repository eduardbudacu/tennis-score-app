export type Player = {
    id: number;
    name: string;
}

export type Match = {
    playerId: number;
    opponentId: number;
    result: [number, number][];
    aces: [number, number];
    smashedRackets: [number, number];
    doubleFaults: [number, number];
}

export type PlayerData = {
    players: Player[],
    matches: Match[],
}