import { v4 as random } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { UnitGame, Game, Games } from './game.interface';

/**
 * loadGames
 * Load every games from corresponding JSON file
 *
 * @return {*}  {Games}
 */
function loadGames() : Games {
  try {
    const filePath = path.join(__dirname, './../../db/games.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error ${error}`);
    return {};
  }
}

// Array of games
const games: Games = loadGames();

/**
 * saveGames
 * Saves every games present in games array
 *
 */
function saveGames() {
  try {
    fs.writeFileSync('./src/db/games.json', JSON.stringify(games), 'utf-8');
    console.log('Team saved successfully!');
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

/**
 * findAll
 * Returns all the games in JSON file
 *
 * @returns {*}  {Games}
 */
export const findAll = async (): Promise<UnitGame[]> => Object.values(games);

/**
 * findOne
 * Return the game with id in params
 *
 * @param id: string
 * @returns {UnitGame}
 */
export const findOne = async (id: string): Promise<UnitGame> => games[id];

// export const findByTeam = async(team: UnitTeam): Promise<null | UnitGame[]> => {
//   const allGames = await findAll();

//   const reducer = (acc: UnitGame[], cur: UnitGame) => {
//     if(team.id === cur.teams[0].id
//       || team.id === cur.teams[1].id)
//       {
//         return acc.push(cur)
//       }
//   }
//   const getGames = allGames.reduce(reducer, new Array<UnitGame>)

//   console.log("getGames : ", getGames)

//   if(!getGames){
//     return null
//   }

//   return getGames
// }

/**
 * create
 * Creates a new game and record it in JSON
 *
 * @param gameData: UnitGame
 * @returns Promise<UnitGame | null>
 */
export const create = async (gameData: UnitGame): Promise<UnitGame | null> => {
  let id = random();

  let checkGame = await findOne(id);

  // Really, 2 times in a raw ?
  if (checkGame) {
    id = random();
    checkGame = await findOne(id);
  }

  const game : UnitGame = {
    id,
    teams: gameData.teams,
    scores: gameData.scores,
    date: new Date(),
  };

  games[id] = game;

  saveGames();

  return game;
};

/**
 * update
 * Update the game target by id
 *
 * @param id: string
 * @param updateValues: Game
 * @returns Game
 */
export const update = async (id: string, updateValues: Game) : Promise<UnitGame | null> => {
  const gameExists = await findOne(id);

  if (!gameExists) {
    return null;
  }

  games[id] = {
    ...gameExists,
    ...updateValues,
  };

  saveGames();

  return games[id];
};

/**
 * remove
 * Removes target id from games array
 *
 * @param id: string
 * @returns Promise<null | void>
 */
export const remove = async (id: string) : Promise<null | void> => {
  const game = await findOne(id);

  if (!game) {
    return null;
  }

  delete games[id];

  return saveGames();
};
