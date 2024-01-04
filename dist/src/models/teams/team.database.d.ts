import { Team, UnitTeam } from './team.interface';
import { UnitUser } from '../users/user.interface';
export declare const findAll: () => Promise<UnitTeam[]>;
export declare const findOne: (id: string) => Promise<UnitTeam>;
export declare const findByName: (team_name: string) => Promise<null | UnitTeam>;
export declare const findByPlayers: (players: Array<UnitUser>) => Promise<null | UnitTeam>;
export declare const create: (teamData: UnitTeam) => Promise<UnitTeam | null>;
export declare const update: (id: string, updateValues: Team) => Promise<UnitTeam | null>;
export declare const remove: (id: string) => Promise<null | void>;
