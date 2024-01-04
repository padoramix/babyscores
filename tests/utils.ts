import * as fs from 'fs';

const emptyUsers = () => fs.writeFileSync('./src/db/users.json', JSON.stringify({}), 'utf-8');

const emptyTeams = () => fs.writeFileSync('./src/db/teams.json', JSON.stringify({}), 'utf-8');

const emptyGames = () => fs.writeFileSync('./src/db/games.json', JSON.stringify({}), 'utf-8');

// Some utils functions for tests
export const removeAll = () => {
  emptyGames();
  emptyTeams();
  emptyUsers();
};
