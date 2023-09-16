import express, {Request, Response} from "express";
import { UnitGame } from "./game.interface";
import * as database from "./game.database"
import { StatusCodes } from "http-status-codes";

export const gameRouter = express.Router()

/**
 * GET /games
 * Get all the games in database
 */
gameRouter.get("/games", async (req: Request, res : Response) => {
  try{
    const allGames: UnitGame[] = await database.findAll()

    if(!allGames) {
      return res.status(StatusCodes.NOT_FOUND).json({msg: `No games at this time..`})
    }

    return res.status(StatusCodes.OK).json({total_games : allGames.length, allGames})
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
})

/**
 * POST /games
 * Creates a new game and set score
 */
gameRouter.post("/games", async (req: Request, res : Response) => {
  try{
    const { teams, scores, date } = req.body

    if( !teams || !scores || !date ){
      return res.status(StatusCodes.BAD_REQUEST).json({error : `Please provide all the required parameters..`})
    }

    const newGame = await database.create(req.body)

    return res.status(StatusCodes.CREATED).json({newGame})

  } catch(error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
})