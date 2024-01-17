"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet_1 = require("helmet");
const user_routes_1 = require("./models/users/user.routes");
dotenv.config();
if (!process.env.PORT) {
    console.log('No port value specified...');
}
const PORT = parseInt(process.env.PORT, 10);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((0, helmet_1.default)());
app.use('/', user_routes_1.userRouter);
exports.server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map