"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAll = void 0;
const fs = require("fs");
const emptyUsers = () => fs.writeFileSync('./src/db/users.json', JSON.stringify({}), 'utf-8');
const emptyTeams = () => fs.writeFileSync('./src/db/teams.json', JSON.stringify({}), 'utf-8');
const emptyGames = () => fs.writeFileSync('./src/db/games.json', JSON.stringify({}), 'utf-8');
const removeAll = () => {
    emptyGames();
    emptyTeams();
    emptyUsers();
};
exports.removeAll = removeAll;
//# sourceMappingURL=utils.js.map