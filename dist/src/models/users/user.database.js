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
exports.remove = exports.update = exports.comparePassword = exports.findByEmail = exports.create = exports.findOne = exports.findAll = exports.init = exports.loadUsers = void 0;
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
const fs = require("fs");
let users = [];
function loadUsers() {
    try {
        const here = __dirname;
        const data = fs.readFileSync(`${here}/../../db/users.json`, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.log(`Error ${error}`);
        return {};
    }
}
exports.loadUsers = loadUsers;
function init() {
    try {
        users = loadUsers();
    }
    catch (e) {
        console.log('Error during the initialization of users');
    }
}
exports.init = init;
function saveUsers() {
    try {
        console.log('Users before save : ', users);
        fs.writeFileSync('./src/db/users.json', JSON.stringify(users), 'utf-8');
        console.log('User saved successfully!');
    }
    catch (error) {
        console.log(`Error : ${error}`);
    }
}
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Users in user.database : ', users);
    return Object.values(users);
});
exports.findAll = findAll;
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () { return users[id]; });
exports.findOne = findOne;
const create = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    let id = (0, uuid_1.v4)();
    let checkUser = yield (0, exports.findOne)(id);
    if (checkUser) {
        id = (0, uuid_1.v4)();
        checkUser = yield (0, exports.findOne)(id);
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(userData.password, salt);
    const user = Object.assign(Object.assign({}, userData), { id, password: hashedPassword });
    users[id] = user;
    saveUsers();
    return user;
});
exports.create = create;
const findByEmail = (user_email) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield (0, exports.findAll)();
    const getUser = allUsers.find((result) => user_email === result.email);
    if (!getUser) {
        return null;
    }
    return getUser;
});
exports.findByEmail = findByEmail;
const comparePassword = (email, supplied_password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.findByEmail)(email);
    const decryptPassword = yield bcryptjs_1.default.compare(supplied_password, user.password);
    if (!decryptPassword) {
        return null;
    }
    return user;
});
exports.comparePassword = comparePassword;
const update = (id, updateValues) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield (0, exports.findOne)(id);
    let newPass = null;
    if (!userExists) {
        return null;
    }
    if (updateValues.password) {
        const salt = yield bcryptjs_1.default.genSalt(10);
        newPass = yield bcryptjs_1.default.hash(updateValues.password, salt);
    }
    users[id] = Object.assign(Object.assign(Object.assign({}, userExists), updateValues), { password: newPass });
    saveUsers();
    return users[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.findOne)(id);
    if (!user) {
        return null;
    }
    delete users[id];
    return saveUsers();
});
exports.remove = remove;
//# sourceMappingURL=user.database.js.map