import DataProvider  from '../../src/dataProvider';
import SalaryService from '../../src/salaryService';

describe("test data provider", () => {

    it("can get player by id",async () => {
        let obj = new DataProvider();
        let data = await obj.load();
        let SalaryService = new SalaryService(data);
    });

});