import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import helmet from 'helmet';
import { userRouter } from './models/users/user.routes';
// import { teamRouter } from './models/teams/team.routes';
// import { gameRouter } from './models/games/game.routes';

// TODO : Add and configure jest for tests
// TODO : Add all tests
// TODO : Start look for quick interface with vusjs maybe tailwind for CSS
// INTERFACES :
// Login => simple login / account creation page
// Home =>  SIDE MENU / HEADER MENU ? (OPTIONS : COMPTE / EQUIPES / BTN NOUVEAU MATCH)
//          EN PAGE D'ACCUEIL : MES DERNIERS MATCHS
// COMPTE => MODIFICATION MDP / SURNOM / AVATAR

dotenv.config();

if (!process.env.PORT) {
  console.log('No port value specified...');
}

const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Setting up routes
app.use('/', userRouter);
// app.use('/', teamRouter);
// app.use('/', gameRouter);

// Launching server and listening for PORT (from .env)
export const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
