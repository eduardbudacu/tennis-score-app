import { Player, PlayerData } from "./types";

export default class SalaryService {
    constructor(
        protected data: PlayerData
    ) {}

    public getPlayer(playerId: number): Player {
        let player: Player = this.data.players.find((el: Player) => el.id === playerId);
        if (!player) {
            throw new Error('Player not found');
        }
        return player;
    }

    public getSalary(playerId: number): number {
        return 100;
    }
}