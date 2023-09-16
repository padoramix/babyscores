import express from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import { userRouter } from "./users/user.routes"
import { teamRouter } from "./teams/team.routes"
import { gameRouter } from "./games/game.routes"

// TODO : Add and configure jest for tests
// TODO : Add all tests
// TODO : Start look for quick interface with vusjs maybe tailwind for CSS
// INTERFACES : 
// Login => simple login / account creation page
// Home =>  SIDE MENU / HEADER MENU ? (OPTIONS : COMPTE / EQUIPES / BTN NOUVEAU MATCH)
//          EN PAGE D'ACCUEIL : MES DERNIERS MATCHS
// COMPTE => MODIFICATION MDP / SURNOM / AVATAR
// 

dotevnv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())

// Setting up routes
app.use('/', userRouter)
app.use('/', teamRouter)
app.use('/', gameRouter)

// Launching server and listening for PORT (from .env)
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})