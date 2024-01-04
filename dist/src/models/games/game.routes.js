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
exports.gameRouter = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const database = require("./game.database");
exports.gameRouter = (0, express_1.Router)();
exports.gameRouter.get('/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGames = yield database.findAll();
        if (!allGames) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'No games at this time..' });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ total_games: allGames.length, allGames });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.gameRouter.post('/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teams, scores, date } = req.body;
        if (!teams || !scores || !date) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the required parameters..' });
        }
        const newGame = yield database.create(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ newGame });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
//# sourceMappingURL=game.routes.js.map