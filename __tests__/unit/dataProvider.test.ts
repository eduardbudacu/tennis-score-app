import DataProvider from '../../src/dataProvider';
import data from '../../data/player_data.json';
import fs from 'fs';

describe('test data provider', () => {
  it('create object data provider', async () => {
    const spy = jest.spyOn(fs, 'readFile')
      .mockImplementation((_, callback) => { callback(null, Buffer.from(JSON.stringify(data))); });

    const obj = new DataProvider();
    const result = await obj.load();
    expect(spy).toHaveBeenCalled();
    expect(result.players).toHaveLength(4);
    expect(result.matches).toHaveLength(6);
    expect(result).toMatchObject(data[0]);
  });
});
