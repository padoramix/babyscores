import express, {Request, Response} from "express"
import { UnitTeam, Team} from "./team.interface"
import * as database from "./team.database"
import { StatusCodes } from "http-status-codes"

export const teamRouter = express.Router()

teamRouter.get("/teams", async (req : Request, res : Response) => {
  try {
    const allTeams : UnitTeam[] = await database.findAll()

    if( !allTeams) {
      return res.status(StatusCodes.NOT_FOUND).json({msg: `No teams at this time..`})
    }

    return res.status(StatusCodes.OK).json({total_team : allTeams.length, allTeams})
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
})

teamRouter.get("/team/:id", async (req : Request, res : Response) => {
  try {
    const team : UnitTeam = await database.findOne(req.params.id)

    if(!team){
      return res.status(StatusCodes.NOT_FOUND).json({error : `Team not found!`})
    }

    return res.status(StatusCodes.OK).json({team})
  } catch (error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
})

teamRouter.post("/teams", async (req : Request, res: Response) => {
  try {
    const { name, idJoueurA, idJoueurB } = req.body
    console.log(req.body)

    if( !name || !idJoueurA || !idJoueurB ) {
      return res.status(StatusCodes.BAD_REQUEST).json({error : `Please provide all the required parameters..`})
    }

    const team = await database.findByName(name)
    const teamByPlayers = await database.findByPlayers(idJoueurA, idJoueurB)

    if(team) {
      return res.status(StatusCodes.BAD_REQUEST).json({error : `This team name has already been registered..`})
    }
    if(teamByPlayers){
      return res.status(StatusCodes.BAD_REQUEST).json({error : `This team composition has already been registered..`})
    }

    const newTeam = await database.create(req.body)

    return res.status(StatusCodes.CREATED).json({newTeam})

  } catch(error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
})

teamRouter.put('/team/:id', async (req: Request, res: Response) => {
  try{
    const { name, idJoueurA, idJoueurB} = req.body

    const getTeam = await database.findOne(req.params.id)

    if(!name || !idJoueurA || !idJoueurB){
      return res.status(401).json({error : `Please provide all the required parameters..`})
    }

    if(!getTeam){
      return res.status(404).json({error : `No team with id ${req.params.id}`})
    }

    const updateTeam = await database.update((req.params.id), req.body)

    return res.status(201).json({updateTeam})
  }catch(error){
    console.log(error)
    return res.status(500).json({error})
  }
})

teamRouter.delete("/teams/:id", async (req : Request, res : Response) => {
  try{
    const id = req.params.id

    const team = await database.findOne(id)

    if(!team){
      return res.status(StatusCodes.NOT_FOUND).json({error: `Team does not exist`})
    }

    await database.remove(id)

    return res.status(StatusCodes.OK).json({msg : "Team deleted"})
  }catch(error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
})