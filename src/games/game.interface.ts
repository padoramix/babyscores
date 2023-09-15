import { UnitTeam } from "../teams/team.interface";

export interface Game {
  equipes: Array<UnitTeam>,
  scores: Array<Number>,
  date: Date
}

export interface UnitGame {
  id: string,
}

export interface Games {
  [key : string] : UnitGame
}