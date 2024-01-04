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
exports.teamRouter = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const database = require("./team.database");
exports.teamRouter = (0, express_1.Router)();
exports.teamRouter.get('/teams', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTeams = yield database.findAll();
        if (!allTeams) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'No teams at this time..' });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ total_team: allTeams.length, allTeams });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.teamRouter.get('/team/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = yield database.findOne(req.params.id);
        if (!team) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'Team not found!' });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ team });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.teamRouter.post('/teams', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, players } = req.body;
        console.log(req.body);
        if (!name || !players) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the required parameters..' });
        }
        const team = yield database.findByName(name);
        const teamByPlayers = yield database.findByPlayers(players);
        if (team) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'This team name has already been registered..' });
        }
        if (teamByPlayers) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'This team composition has already been registered..' });
        }
        const newTeam = yield database.create(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ newTeam });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.teamRouter.put('/team/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, players } = req.body;
        const getTeam = yield database.findOne(req.params.id);
        if (!name || !players) {
            return res.status(401).json({ error: 'Please provide all the required parameters..' });
        }
        if (!getTeam) {
            return res.status(404).json({ error: `No team with id ${req.params.id}` });
        }
        const updateTeam = yield database.update((req.params.id), req.body);
        return res.status(201).json({ updateTeam });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}));
exports.teamRouter.delete('/team/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const team = yield database.findOne(id);
        if (!team) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'Team does not exist' });
        }
        yield database.remove(id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Team deleted' });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
//# sourceMappingURL=team.routes.js.map