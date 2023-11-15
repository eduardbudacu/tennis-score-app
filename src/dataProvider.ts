import fs from 'fs';
import path from 'path';
import { type PlayerData, type Player, type Match } from './types';

export default class DataProvider {
  public async load (): Promise<PlayerData> {
    return await new Promise((resolve, reject) => {
      fs.readFile(path.resolve(__dirname, '../data/player_data.json'), (err: Error, data: Buffer) => {
        if (err === null) {
          const [parsedData] = JSON.parse(data.toString());

          const result: PlayerData = {
            players: this.loadPlayers(parsedData),
            matches: this.loadMatches(parsedData)
          };

          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  }

  protected loadPlayers (parsedData: any): Player[] {
    if (parsedData.players !== undefined && Array.isArray(parsedData.players)) {
      return parsedData.players.map((el: any): Player => {
        return {
          id: el.id,
          name: el.name
        };
      });
    } else {
      return [];
    }
  }

  protected loadMatches (parsedData: any): Match[] {
    if (parsedData.matches !== undefined && Array.isArray(parsedData.matches)) {
      return parsedData.matches.map((el: any): Match => {
        return {
          playerId: el.playerId,
          opponentId: el.opponentId,
          result: el.result !== undefined && Array.isArray(el.result) ? el.result.map((set: any): [number, number] => [set[0], set[1]]) : [],
          aces: el.aces !== undefined && Array.isArray(el.aces) ? [el.aces[0], el.aces[1]] : [0, 0],
          smashedRackets: el.smashedRackets !== undefined && Array.isArray(el.smashedRackets) ? [el.smashedRackets[0], el.smashedRackets[1]] : [0, 0],
          doubleFaults: el.doubleFaults !== undefined && Array.isArray(el.doubleFaults) ? [el.doubleFaults[0], el.doubleFaults[1]] : [0, 0]
        };
      });
    } else {
      return [];
    }
  }
}
