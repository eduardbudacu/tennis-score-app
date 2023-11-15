import { type Match, type Player, type PlayerData, type Set } from './types'

export default class SalaryService {
  static readonly MATCH_PRICE = 500
  static readonly GAME_WON_PRICE = 200
  static readonly SET_WON_PRICE = 750
  static readonly MATCH_WON_PRICE = 2500
  static readonly ACE_PRICE = 100
  static readonly SMASHED_RACKET_PRICE = -500
  static readonly DOUBLE_FAULT_PRICE = -100
  static readonly WIN_COUNT = 3

  constructor (
    protected data: PlayerData
  ) { }

  public getPlayer (playerId: number): Player {
    const player: Player | undefined = this.data.players.find((el: Player) => el.id === playerId)
    if (player === undefined) {
      throw new Error('Player not found')
    }
    return player
  }

  public getSalary (playerId: number): number {
    let totalSalary: number = 0
    this.data.matches
      .filter((el: Match) => el.playerId === playerId || el.opponentId === playerId)
      .forEach((match: Match) => {
        totalSalary += SalaryService.MATCH_PRICE
        const position = match.playerId === playerId ? 0 : 1
        const opponent = position === 1 ? 0 : 1

        // calculate won games
        totalSalary += match.result.reduce((acc, currentValue) => {
          return acc + currentValue[position]
        }, 0) * SalaryService.GAME_WON_PRICE

        const setsWonByPlayer: Set[] = match.result.filter((set: Set) => { return set[position] > set[opponent] })
        totalSalary += setsWonByPlayer.length * SalaryService.SET_WON_PRICE

        if (setsWonByPlayer.length === SalaryService.WIN_COUNT) {
          totalSalary += SalaryService.MATCH_WON_PRICE
        }

        totalSalary += match.aces[position] * SalaryService.ACE_PRICE
        totalSalary += match.smashedRackets[position] * SalaryService.SMASHED_RACKET_PRICE
        totalSalary += match.doubleFaults[position] * SalaryService.DOUBLE_FAULT_PRICE
      })

    return totalSalary
  }
}
