import { UnitGame, Game } from './game.interface';
export declare const findAll: () => Promise<UnitGame[]>;
export declare const findOne: (id: string) => Promise<UnitGame>;
export declare const create: (gameData: UnitGame) => Promise<UnitGame | null>;
export declare const update: (id: string, updateValues: Game) => Promise<UnitGame | null>;
export declare const remove: (id: string) => Promise<null | void>;
