import DataProvider from '../../src/dataProvider';
import data from '../../data/player_data.json';

describe('test data provider', () => {
  it('create object data provider', async () => {
    const obj = new DataProvider();
    const result = await obj.load();
    expect(result.players).toHaveLength(4);
    expect(result.matches).toHaveLength(6);
    expect(result).toMatchObject(data[0]);
  });
});
