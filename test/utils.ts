import * as fs from 'fs';

// Some utils functions for tests
export const removeAll = () => {
  emptyGames()
  emptyTeams()
  emptyUsers()
}

const emptyUsers = () => {
  return fs.writeFileSync("./src/db/users.json", JSON.stringify({}), "utf-8")
}

const emptyTeams = () => {
  return fs.writeFileSync("./src/db/teams.json", JSON.stringify({}), "utf-8")
}

const emptyGames = () => {
  return fs.writeFileSync("./src/db/games.json", JSON.stringify({}), "utf-8")
}