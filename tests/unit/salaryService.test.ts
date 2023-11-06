import DataProvider from '../../src/dataProvider';
import SalaryService from '../../src/salaryService';
import { Player } from '../../src/types';

describe("test data provider", () => {

    it("can get player by id", async () => {
        let provider: DataProvider = new DataProvider();
        let data = await provider.load();
        let salaryService: SalaryService = new SalaryService(data);
        let player: Player = salaryService.getPlayer(1);
        expect(player.id).toBe(1);
        expect(player.name).toEqual("Novak Djokovic");
    });

    it("thorws error for non existent player", async () => {
        let provider: DataProvider = new DataProvider();
        let data = await provider.load();
        let salaryService: SalaryService = new SalaryService(data);
        const t = () => {
            salaryService.getPlayer(5);
        }
        expect(t).toThrow("Player not found");
    });

    it("calculates salary of player 1", async () => {
        let provider: DataProvider = new DataProvider();
        let data = await provider.load();
        let salaryService: SalaryService = new SalaryService(data);
        let salary: number = salaryService.getSalary(1);
        expect(salary).toBe(21250);
    });

    it("calculates salary of player 2", async () => {
        let provider: DataProvider = new DataProvider();
        let data = await provider.load();
        let salaryService: SalaryService = new SalaryService(data);
        let salary: number = salaryService.getSalary(2);
        expect(salary).toBe(19350);
    });

    it('player won one game with one set', () => {
        let salaryService: SalaryService = new SalaryService({
            players: [
                {
                    id: 1,
                    name: "Eduard"
                }
            ],
            matches: [
                {
                    playerId: 1,
                    opponentId: 2,
                    result: [[1, 0], [1, 0], [1, 0]],
                    aces: [0, 0],
                    smashedRackets: [0, 0],
                    doubleFaults: [0, 0]
                }
            ]
        });
        let playerSalary: number = salaryService.getSalary(1);
        let opponentSalary: number = salaryService.getSalary(2);
        expect(playerSalary).toBe(SalaryService.MATCH_PRICE + SalaryService.GAME_WON_PRICE * 3 + SalaryService.SET_WON_PRICE * 3 + SalaryService.MATCH_WON_PRICE);
        expect(opponentSalary).toBe(SalaryService.MATCH_PRICE);
    });

    it('should calculate aces', () => {
        let salaryService: SalaryService = new SalaryService({
            players: [
                {
                    id: 1,
                    name: "Eduard"
                }
            ],
            matches: [
                {
                    playerId: 1,
                    opponentId: 2,
                    result: [[1, 0], [1, 0], [1, 0]],
                    aces: [1, 0],
                    smashedRackets: [0, 0],
                    doubleFaults: [0, 0]
                }
            ]
        });
        let playerSalary: number = salaryService.getSalary(1);
        let opponentSalary: number = salaryService.getSalary(2);
        expect(playerSalary).toBe(SalaryService.MATCH_PRICE + SalaryService.GAME_WON_PRICE * 3 + SalaryService.SET_WON_PRICE * 3 + SalaryService.MATCH_WON_PRICE + SalaryService.ACE_PRICE);
        expect(opponentSalary).toBe(SalaryService.MATCH_PRICE);
    });

    it('should calculate smashed rackets', () => {
        let salaryService: SalaryService = new SalaryService({
            players: [
                {
                    id: 1,
                    name: "Eduard"
                }
            ],
            matches: [
                {
                    playerId: 1,
                    opponentId: 2,
                    result: [[1, 0], [1, 0], [1, 0]],
                    aces: [0, 0],
                    smashedRackets: [1, 0],
                    doubleFaults: [0, 0]
                }
            ]
        });
        let playerSalary: number = salaryService.getSalary(1);
        let opponentSalary: number = salaryService.getSalary(2);
        expect(playerSalary).toBe(SalaryService.MATCH_PRICE + SalaryService.GAME_WON_PRICE * 3 + SalaryService.SET_WON_PRICE * 3 + SalaryService.MATCH_WON_PRICE + SalaryService.SMASHED_RACKET_PRICE);
        expect(opponentSalary).toBe(SalaryService.MATCH_PRICE);
    });

    it('should calculate double faults', () => {
        let salaryService: SalaryService = new SalaryService({
            players: [
                {
                    id: 1,
                    name: "Eduard"
                }
            ],
            matches: [
                {
                    playerId: 1,
                    opponentId: 2,
                    result: [[1, 0], [1, 0], [1, 0]],
                    aces: [0, 0],
                    smashedRackets: [0, 0],
                    doubleFaults: [1, 0]
                }
            ]
        });
        let playerSalary: number = salaryService.getSalary(1);
        let opponentSalary: number = salaryService.getSalary(2);
        expect(playerSalary).toBe(SalaryService.MATCH_PRICE + SalaryService.GAME_WON_PRICE * 3 + SalaryService.SET_WON_PRICE * 3 + SalaryService.MATCH_WON_PRICE + SalaryService.DOUBLE_FAULT_PRICE);
        expect(opponentSalary).toBe(SalaryService.MATCH_PRICE);
    });

});