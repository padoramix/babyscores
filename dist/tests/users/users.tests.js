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
const globals_1 = require("@jest/globals");
const request = require("supertest");
const utils_1 = require("../utils");
const app_1 = require("../../src/app");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.removeAll)();
}));
(0, globals_1.describe)('GET /users', () => {
    it('Should return an empty users list', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request(app_1.default)
            .get('/users')
            .set('Accept', 'appliaction/json')
            .expect('Content-type', /json/)
            .expect(200);
        (0, globals_1.expect)(result.users).toBe([]);
    }));
});
//# sourceMappingURL=users.tests.js.map