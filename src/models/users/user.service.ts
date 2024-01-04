// import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import * as database from './user.database';
// import { UnitUser } from '.';

// export async function list(req: Request, res: Response) : Promise<UnitUser> {
//   const allUsers : UnitUser[] = await database.findAll();

// if (!allUsers) {
//   return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No users at this time..' });
// }

//   return res.status(StatusCodes.OK).json({ total_user: allUsers.length, allUsers });
// }
