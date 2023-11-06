import fs from 'fs';
import path from 'path';
import { PlayerData, Player, Match } from './types';

export default class DataProvider {
    public load(): Promise<PlayerData> {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../data/player_data.json'), (err: Error, data: Buffer) => {
                if (!err) {
                    const [parsedData] = JSON.parse(data.toString());

                    let result: PlayerData = {
                        players: [],
                        matches: []
                    }
                    if (parsedData.players && Array.isArray(parsedData.players)) {
                        result.players = parsedData.players.map((el: any): Player => {
                            return {
                                id: el.id,
                                name: el.name
                            }
                        });
                    }

                    if (parsedData.matches && Array.isArray(parsedData.matches)) {
                        result.matches = parsedData.matches.map((el: any): Match => {
                            return {
                                playerId: el.playerId,
                                opponentId: el.opponentId,
                                result: el.result && Array.isArray(el.result) ? el.result.map((set: any): [number, number] => [set[0], set[1]]) : [],
                                aces: el.aces && Array.isArray(el.aces) ? [el.aces[0], el.aces[1]] : [0,0],
                                smashedRackets:  el.smashedRackets && Array.isArray(el.smashedRackets) ? [el.smashedRackets[0], el.smashedRackets[1]] : [0,0],
                                doubleFaults: el.doubleFaults && Array.isArray(el.doubleFaults) ? [el.doubleFaults[0], el.doubleFaults[1]] : [0,0],
                            }
                        })
                    }
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        })
    }
}