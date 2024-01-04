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
exports.remove = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const uuid_1 = require("uuid");
const path = require("path");
const fs = require("fs");
function loadGames() {
    try {
        const filePath = path.join(__dirname, './../../db/games.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.log(`Error ${error}`);
        return {};
    }
}
const games = loadGames();
function saveGames() {
    try {
        fs.writeFileSync('./src/db/games.json', JSON.stringify(games), 'utf-8');
        console.log('Team saved successfully!');
    }
    catch (error) {
        console.log(`Error : ${error}`);
    }
}
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(games); });
exports.findAll = findAll;
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () { return games[id]; });
exports.findOne = findOne;
const create = (gameData) => __awaiter(void 0, void 0, void 0, function* () {
    let id = (0, uuid_1.v4)();
    let checkGame = yield (0, exports.findOne)(id);
    if (checkGame) {
        id = (0, uuid_1.v4)();
        checkGame = yield (0, exports.findOne)(id);
    }
    const game = {
        id,
        teams: gameData.teams,
        scores: gameData.scores,
        date: new Date(),
    };
    games[id] = game;
    saveGames();
    return game;
});
exports.create = create;
const update = (id, updateValues) => __awaiter(void 0, void 0, void 0, function* () {
    const gameExists = yield (0, exports.findOne)(id);
    if (!gameExists) {
        return null;
    }
    games[id] = Object.assign(Object.assign({}, gameExists), updateValues);
    saveGames();
    return games[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield (0, exports.findOne)(id);
    if (!game) {
        return null;
    }
    delete games[id];
    return saveGames();
});
exports.remove = remove;
//# sourceMappingURL=game.database.js.map