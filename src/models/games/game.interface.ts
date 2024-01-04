import { UnitTeam } from '../teams/team.interface';

export interface Game {
  teams: Array<UnitTeam>,
  scores: Array<Number>,
  date: Date
}

export interface UnitGame extends Game {
  id: string,
}

export interface Games {
  [key : string] : UnitGame
}
