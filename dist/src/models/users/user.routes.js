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
exports.userRouter = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const database = require("./user.database");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('In get /users...');
    try {
        const allUsers = yield database.findAll();
        if (!allUsers) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'No users at this time..' });
        }
        console.log('AllUsers : ', allUsers);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ total_user: allUsers.length, users: allUsers });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
userRouter.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database.findOne(req.params.id);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'User not found!' });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ user });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
userRouter.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, avatar, } = req.body;
        console.log('Req.body : ', req.body);
        if (!username || !email || !password || !avatar) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the required parameters..' });
        }
        const user = yield database.findByEmail(email);
        console.log('FindByEmail result : ', user);
        if (user) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'This email has already been registered..' });
        }
        const newUser = yield database.create(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ newUser });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the required parameters..' });
        }
        const user = yield database.findByEmail(email);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'No user exists with the email provided..' });
        }
        const comparePassword = yield database.comparePassword(email, password);
        if (!comparePassword) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Incorrect Password!' });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ user });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
userRouter.put('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, avatar, } = req.body;
        const getUser = yield database.findOne(req.params.id);
        if (!username || !email || !password || !avatar) {
            return res.status(401).json({ error: 'Please provide all the required parameters..' });
        }
        if (!getUser) {
            return res.status(404).json({ error: `No user with id ${req.params.id}` });
        }
        const updateUser = yield database.update((req.params.id), req.body);
        return res.status(201).json({ updateUser });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}));
userRouter.delete('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield database.findOne(id);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'User does not exist' });
        }
        yield database.remove(id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'User deleted' });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
//# sourceMappingURL=user.routes.js.map