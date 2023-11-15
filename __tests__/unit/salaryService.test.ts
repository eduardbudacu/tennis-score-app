import DataProvider from '../../src/dataProvider';
import SalaryService from '../../src/salaryService';
import { type Player } from '../../src/types';

describe('test data provider', () => {
  it('can get player by id', async () => {
    const provider: DataProvider = new DataProvider();
    const data = await provider.load();
    const salaryService: SalaryService = new SalaryService(data);
    const player: Player = salaryService.getPlayer(1);
    expect(player.id).toBe(1);
    expect(player.name).toEqual('Novak Djokovic');
  });

  it('thorws error for non existent player', async () => {
    const provider: DataProvider = new DataProvider();
    const data = await provider.load();
    const salaryService: SalaryService = new SalaryService(data);
    const t = (): void => {
      salaryService.getPlayer(5);
    };
    expect(t).toThrow('Player not found');
  });

  it('calculates salary of player 1', async () => {
    const provider: DataProvider = new DataProvider();
    const data = await provider.load();
    const salaryService: SalaryService = new SalaryService(data);
    const salary: number = salaryService.getSalary(1);
    expect(salary).toBe(21250);
  });

  it('calculates salary of player 2', async () => {
    const provider: DataProvider = new DataProvider();
    const data = await provider.load();
    const salaryService: SalaryService = new SalaryService(data);
    const salary: number = salaryService.getSalary(2);
    expect(salary).toBe(19350);
  });

  it('player won one game with one set', () => {
    const salaryService: SalaryService = new SalaryService({
      players: [
        {
          id: 1,
          name: 'Eduard'
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
    const playerSalary: number = salaryService.getSalary(1);
    const opponentSalary: number = salaryService.getSalary(2);
    expect(playerSalary).toBe(SalaryService.MATCH_PRICE + SalaryService.GAME_WON_PRICE * 3 + SalaryService.SET_WON_PRICE * 3 + SalaryService.MATCH_WON_PRICE);
    expect(opponentSalary).toBe(SalaryService.MATCH_PRICE);
  });

  it('should calculate aces', () => {
    const salaryService: SalaryService = new SalaryService({
      players: [
        {
          id: 1,
          name: 'Eduard'
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
    const playerSalary: number = salaryService.getSalary(1);
    const opponentSalary: number = salaryService.getSalary(2);
    expect(playerSalary).toBe(SalaryService.MATCH_PRICE + SalaryService.GAME_WON_PRICE * 3 + SalaryService.SET_WON_PRICE * 3 + SalaryService.MATCH_WON_PRICE + SalaryService.ACE_PRICE);
    expect(opponentSalary).toBe(SalaryService.MATCH_PRICE);
  });

  it('should calculate smashed rackets', () => {
    const salaryService: SalaryService = new SalaryService({
      players: [
        {
          id: 1,
          name: 'Eduard'
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
    const playerSalary: number = salaryService.getSalary(1);
    const opponentSalary: number = salaryService.getSalary(2);
    expect(playerSalary).toBe(SalaryService.MATCH_PRICE + SalaryService.GAME_WON_PRICE * 3 + SalaryService.SET_WON_PRICE * 3 + SalaryService.MATCH_WON_PRICE + SalaryService.SMASHED_RACKET_PRICE);
    expect(opponentSalary).toBe(SalaryService.MATCH_PRICE);
  });

  it('should calculate double faults', () => {
    const salaryService: SalaryService = new SalaryService({
      players: [
        {
          id: 1,
          name: 'Eduard'
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
    const playerSalary: number = salaryService.getSalary(1);
    const opponentSalary: number = salaryService.getSalary(2);
    expect(playerSalary).toBe(SalaryService.MATCH_PRICE + SalaryService.GAME_WON_PRICE * 3 + SalaryService.SET_WON_PRICE * 3 + SalaryService.MATCH_WON_PRICE + SalaryService.DOUBLE_FAULT_PRICE);
    expect(opponentSalary).toBe(SalaryService.MATCH_PRICE);
  });
});
