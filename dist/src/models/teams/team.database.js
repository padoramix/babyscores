"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findByPlayers = exports.findByName = exports.findOne = exports.findAll = void 0;
const uuid_1 = require("uuid");
const fs = require("fs");
function loadTeams() {
    try {
        const data = fs.readFileSync('./src/db/teams.json', 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.log(`Error ${error}`);
        return {};
    }
}
const teams = loadTeams();
function saveTeams() {
    try {
        fs.writeFileSync('./src/db/teams.json', JSON.stringify(teams), 'utf-8');
        console.log('Team saved successfully!');
    }
    catch (error) {
        console.log(`Error : ${error}`);
    }
}
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(teams); });
exports.findAll = findAll;
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () { return teams[id]; });
exports.findOne = findOne;
const findByName = (team_name) => __awaiter(void 0, void 0, void 0, function* () {
    const allTeams = yield (0, exports.findAll)();
    const getTeam = allTeams.find((result) => team_name === result.name);
    if (!getTeam) {
        return null;
    }
    return getTeam;
});
exports.findByName = findByName;
const findByPlayers = (players) => __awaiter(void 0, void 0, void 0, function* () {
    const allTeams = yield (0, exports.findAll)();
    const getTeam = allTeams.find((result) => ((players[0].username === result.players[0].username
        && players[1].username === result.players[1].username) || (players[0].username === result.players[1].username
        || players[1].username === result.players[0].username)));
    if (!getTeam) {
        return null;
    }
    return getTeam;
});
exports.findByPlayers = findByPlayers;
const create = (teamData) => __awaiter(void 0, void 0, void 0, function* () {
    let id = (0, uuid_1.v4)();
    let checkTeam = yield (0, exports.findOne)(id);
    if (checkTeam) {
        id = (0, uuid_1.v4)();
        checkTeam = yield (0, exports.findOne)(id);
    }
    const team = {
        id,
        name: teamData.name,
        players: teamData.players,
    };
    teams[id] = team;
    saveTeams();
    return team;
});
exports.create = create;
const update = (id, updateValues) => __awaiter(void 0, void 0, void 0, function* () {
    const teamExists = yield (0, exports.findOne)(id);
    if (!teamExists) {
        return null;
    }
    teams[id] = Object.assign(Object.assign({}, teamExists), updateValues);
    saveTeams();
    return teams[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield (0, exports.findOne)(id);
    if (!team) {
        return null;
    }
    delete teams[id];
    return saveTeams();
});
exports.remove = remove;
//# sourceMappingURL=team.database.js.map