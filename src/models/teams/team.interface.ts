import { UnitUser } from '../users/user.interface';

export interface Team {
  name : string,
  players : Array<UnitUser>
}

export interface UnitTeam extends Team {
  id : string
}

export interface Teams {
  [key : string] : UnitTeam
}
