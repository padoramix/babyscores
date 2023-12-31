import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UnitTeam } from './team.interface';
import * as database from './team.database';

export const teamRouter = Router();

/**
 * GET /teams
 * Return all teams
 */
teamRouter.get('/teams', async (req : Request, res : Response) => {
  try {
    const allTeams : UnitTeam[] = await database.findAll();

    if (!allTeams) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No teams at this time..' });
    }

    return res.status(StatusCodes.OK).json({ total_team: allTeams.length, allTeams });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

/**
 * GET /team/:id
 * Return the route complete information
 */
teamRouter.get('/team/:id', async (req : Request, res : Response) => {
  try {
    const team : UnitTeam = await database.findOne(req.params.id);

    if (!team) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Team not found!' });
    }

    return res.status(StatusCodes.OK).json({ team });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

/**
 * POST /teams
 * Create a new team
 */
teamRouter.post('/teams', async (req : Request, res: Response) => {
  try {
    const { name, players } = req.body;
    console.log(req.body);

    if (!name || !players) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the required parameters..' });
    }

    const team = await database.findByName(name);
    const teamByPlayers = await database.findByPlayers(players);

    if (team) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'This team name has already been registered..' });
    }
    if (teamByPlayers) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'This team composition has already been registered..' });
    }

    const newTeam = await database.create(req.body);

    return res.status(StatusCodes.CREATED).json({ newTeam });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

/**
 * PUT /team/:id
 * Update team information
 */
teamRouter.put('/team/:id', async (req: Request, res: Response) => {
  try {
    const { name, players } = req.body;

    const getTeam = await database.findOne(req.params.id);

    if (!name || !players) {
      return res.status(401).json({ error: 'Please provide all the required parameters..' });
    }

    if (!getTeam) {
      return res.status(404).json({ error: `No team with id ${req.params.id}` });
    }

    const updateTeam = await database.update((req.params.id), req.body);

    return res.status(201).json({ updateTeam });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

/**
 * DELETE /teams/:id
 * Put the team with id in delete state(or not active state)
 */
teamRouter.delete('/team/:id', async (req : Request, res : Response) => {
  try {
    const { id } = req.params;

    const team = await database.findOne(id);

    if (!team) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Team does not exist' });
    }

    await database.remove(id);

    return res.status(StatusCodes.OK).json({ msg: 'Team deleted' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});
