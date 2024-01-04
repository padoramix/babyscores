import { User, UnitUser } from './user.interface';
export declare const findAll: () => Promise<UnitUser[]>;
export declare const findOne: (id: string) => Promise<UnitUser>;
export declare const create: (userData: UnitUser) => Promise<UnitUser | null>;
export declare const findByEmail: (user_email: string) => Promise<null | UnitUser>;
export declare const comparePassword: (email: string, supplied_password: string) => Promise<null | UnitUser>;
export declare const update: (id: string, updateValues: User) => Promise<UnitUser | null>;
export declare const remove: (id: string) => Promise<null | void>;
