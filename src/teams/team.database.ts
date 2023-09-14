import { Team, UnitTeam, Teams } from "./team.interface"
import {v4 as random} from "uuid"
import fs from "fs"

let teams: Teams = loadTeams()

function loadTeams () : Teams {
  try {
    const data = fs.readFileSync("./src/db/teams.json", "utf-8")
    return JSON.parse(data)
  } catch (error){
    console.log(`Error ${error}`)
    return {}
  }
}

function saveTeams () {
  try {
    fs.writeFileSync("./src/db/teams.json", JSON.stringify(teams), "utf-8")
    console.log(`Team saved successfully!`)
  } catch (error) {
    console.log(`Error : ${error}`)
  }
}

export const findAll = async (): Promise<UnitTeam[]> => Object.values(teams);

export const findOne = async (id: string): Promise<UnitTeam> => teams[id];

export const findByName = async (team_name: string): Promise<null | UnitTeam> => {
  const allTeams = await findAll();

  const getTeam = allTeams.find(result => team_name === result.name);

  if(!getTeam){
    return null;
  }
  return getTeam;
}

export const findByPlayers = async(player_one_id: string, player_two_id: string): Promise<null | UnitTeam> => {
  const allTeams = await findAll()

  const getTeam = allTeams.find(result => ((player_one_id === result.idJoueurA || player_two_id === result.idJoueurB) && (player_two_id === result.idJoueurA || player_one_id === result.idJoueurB)) )

  if(!getTeam){
    return null
  }

  return getTeam
}

export const create = async (teamData: UnitTeam): Promise<UnitTeam | null> => {

  let id = random()

  let check_team = await findOne(id)

  while (check_team){
    id = random()
    check_team = await findOne(id)
  }

  const team : UnitTeam = {
    id: id,
    name : teamData.name,
    idJoueurA : teamData.idJoueurA,
    idJoueurB : teamData.idJoueurB,
  }

  teams[id] = team;

  saveTeams()

  return team;
}

export const update = async (id: string, updateValues: Team) : Promise<UnitTeam | null> => {
  const teamExists = await findOne(id)

  if(!teamExists){
    return null
  }

  teams[id] = {
    ...teamExists,
    ...updateValues
  }

  saveTeams()

  return teams[id]
}

export const remove = async (id: string) : Promise<null | void> => {
  const team = await findOne(id)

  if(!team){
    return null
  }

  delete teams[id]

  saveTeams()
}