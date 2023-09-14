import { Team, UnitTeam, Teams } from "./team.interface"
import {v4 as random} from "uuid"
import fs from "fs"

// Array of teams
let teams: Teams = loadTeams()

/**
 * loadTeams
 * Load all teams from JSON DB
 *
 * @return {*}  {Teams}
 */
function loadTeams () : Teams {
  try {
    const data = fs.readFileSync("./src/db/teams.json", "utf-8")
    return JSON.parse(data)
  } catch (error){
    console.log(`Error ${error}`)
    return {}
  }
}

/**
 * saveTeams
 * Save all teams inside JSON file
 *
 * @return void
 */
function saveTeams () {
  try {
    fs.writeFileSync("./src/db/teams.json", JSON.stringify(teams), "utf-8")
    console.log(`Team saved successfully!`)
  } catch (error) {
    console.log(`Error : ${error}`)
  }
}

/**
 * findAll
 * Retrieves all the teams from JSON file
 * 
 * @return {*} {Teams}
 */
export const findAll = async (): Promise<UnitTeam[]> => Object.values(teams);

/** 
 * findOne
 * Retrieves one team by ID
 * 
 * @param id: string
 * @return {*} {Team}
*/
export const findOne = async (id: string): Promise<UnitTeam> => teams[id];

/**
 * findByName
 * Retrieves one team by name
 * 
 * @param team_name: string
 * @return {*} {Team} 
 */
export const findByName = async (team_name: string): Promise<null | UnitTeam> => {
  const allTeams = await findAll();

  const getTeam = allTeams.find(result => team_name === result.name);

  if(!getTeam){
    return null;
  }
  return getTeam;
}

/**
 * findByPlayers
 * Retrieves one team by players
 * 
 * @param player_one_id: string
 * @param player_two_id: string
 * @return {*} {Team} 
 */
export const findByPlayers = async(player_one_id: string, player_two_id: string): Promise<null | UnitTeam> => {
  const allTeams = await findAll()

  const getTeam = allTeams.find(result => ((player_one_id === result.idJoueurA || player_two_id === result.idJoueurB) && (player_two_id === result.idJoueurA || player_one_id === result.idJoueurB)) )

  if(!getTeam){
    return null
  }

  return getTeam
}

/**
 * create
 * Create team
 * 
 * @param teamData: UnitTeam
 * @return {*} {Team} 
 */
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

/**
 * update
 * Update a team (id) with updateValues(array)
 * 
 * @param id 
 * @param updateValues 
 * @returns {*} {Team}
 */
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

/**
 * remove
 * Remove a team by ID
 *
 * @param id 
 * @returns void
 */
export const remove = async (id: string) : Promise<null | void> => {
  const team = await findOne(id)

  if(!team){
    return null
  }

  delete teams[id]

  saveTeams()
}