export interface Team {
  name : string,
  idJoueurA : string,
  idJoueurB : string,
}

export interface UnitTeam extends Team {
  id : string
}

export interface Teams {
  [key : string] : UnitTeam
}