import DataProvider  from '../../src/dataProvider';
import SalaryService from '../../src/salaryService';
import { Player } from '../../src/types';

describe("test data provider", () => {

    it("can get player by id",async () => {
        let provider: DataProvider = new DataProvider();
        let data = await provider.load();
        let salaryService: SalaryService = new SalaryService(data);
        let player: Player = salaryService.getPlayer(1);
        expect(player.id).toBe(1);
        expect(player.name).toEqual("Novak Djokovic");
    });

    it("thorws error for non existent player",async () => {
        let provider: DataProvider = new DataProvider();
        let data = await provider.load();
        let salaryService: SalaryService = new SalaryService(data);
        const t = () => {
            salaryService.getPlayer(5);
        }
        expect(t).toThrow("Player not found");
    });

});