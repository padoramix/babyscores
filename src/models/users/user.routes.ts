import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UnitUser } from './user.interface';
import * as database from './user.database';
// TODO: Include service, make promise for api calls and maange response template
// import { } from './user.service';

// Init router
const userRouter : Router = Router();

/**
 * GET /users
 * Returns all the users
 */
userRouter.get('/users', async (req : Request, res : Response) => {
  console.log('In get /users...');
  try {
    const allUsers : UnitUser[] = await database.findAll();

    if (!allUsers) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No users at this time..' });
    }

    console.log('AllUsers : ', allUsers);

    return res.status(StatusCodes.OK).json({ total_user: allUsers.length, users: allUsers });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

/**
 * GET /user/:id
 * Get the full details for user with corresponding id
 */
userRouter.get('/user/:id', async (req : Request, res : Response) => {
  try {
    const user : UnitUser = await database.findOne(req.params.id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found!' });
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

/**
 * POST /register
 * Record a new user
 */
userRouter.post('/users', async (req : Request, res : Response) => {
  try {
    const {
      username, email, password, avatar,
    } = req.body;
    console.log('Req.body : ', req.body);

    if (!username || !email || !password || !avatar) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the required parameters..' });
    }

    const user = await database.findByEmail(email);
    console.log('FindByEmail result : ', user);

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'This email has already been registered..' });
    }

    const newUser = await database.create(req.body);

    return res.status(StatusCodes.CREATED).json({ newUser });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

/**
 * POST /login
 * Login the user
 */
userRouter.post('/login', async (req : Request, res : Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the required parameters..' });
    }

    const user = await database.findByEmail(email);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'No user exists with the email provided..' });
    }

    const comparePassword = await database.comparePassword(email, password);

    if (!comparePassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Incorrect Password!' });
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

/**
 * PUT /user/:id
 * Update user
 */
userRouter.put('/user/:id', async (req : Request, res : Response) => {
  try {
    const {
      username, email, password, avatar,
    } = req.body;

    const getUser = await database.findOne(req.params.id);

    if (!username || !email || !password || !avatar) {
      return res.status(401).json({ error: 'Please provide all the required parameters..' });
    }

    if (!getUser) {
      return res.status(404).json({ error: `No user with id ${req.params.id}` });
    }

    const updateUser = await database.update((req.params.id), req.body);

    return res.status(201).json({ updateUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

/**
 * DELETE /user/:id
 * Put the user with id in delete state(or not active state)
*/
userRouter.delete('/user/:id', async (req : Request, res : Response) => {
  try {
    const { id } = req.params;

    const user = await database.findOne(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User does not exist' });
    }

    await database.remove(id);

    return res.status(StatusCodes.OK).json({ msg: 'User deleted' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

export { userRouter };
