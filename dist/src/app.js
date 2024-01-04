"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv = require("dotenv");
const cors_1 = require("cors");
const helmet_1 = require("helmet");
const user_routes_1 = require("./models/users/user.routes");
const team_routes_1 = require("./models/teams/team.routes");
const game_routes_1 = require("./models/games/game.routes");
dotenv.config();
if (!process.env.PORT) {
    console.log('No port value specified...');
}
const PORT = parseInt(process.env.PORT, 10);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use('/', user_routes_1.userRouter);
app.use('/', team_routes_1.teamRouter);
app.use('/', game_routes_1.gameRouter);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map