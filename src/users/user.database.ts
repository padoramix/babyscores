import { User, UnitUser, Users } from "./user.interface";
import bcrypt from "bcryptjs"
import {v4 as random} from "uuid"
import fs from "fs"

/** 
 * @type {*}
 */
let users: Users = loadUsers() 

/**
 * loadUsers
 * Function that load all users from JSON file
 * Return empty object when no users
 *
 * @return {*}  {Users}
 */
function loadUsers () : Users {
  try {
    const data = fs.readFileSync("./src/db/users.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(`Error ${error}`)
    return {}
  }
}

/**
 * saveUsers
 * Function that record the users array in the corresponding JSON file 
 *
 */
function saveUsers () {
  try {
    fs.writeFileSync("./src/db/users.json", JSON.stringify(users), "utf-8")
    console.log(`User saved successfully!`)
  } catch (error) {
    console.log(`Error : ${error}`)
  }
}

/**
 * findAll
 * Search and returns all users from DB
 * 
 * @return {*} {Users}
 */
export const findAll = async (): Promise<UnitUser[]> => Object.values(users);

/**
 * findOne
 * Search and returns the user targetted by ID
 * 
 * @param id: string
 * @returns {User}
 */
export const findOne = async (id: string): Promise<UnitUser> => users[id];


/**
 * create
 * Creates user with data in param
 *
 * @param {UnitUser} userData
 * @return {*}  {(Promise<UnitUser | null>)}
 */
export const create = async (userData: UnitUser): Promise<UnitUser | null> => {

  let id = random()

  let check_user = await findOne(id);

  while (check_user) {
    id = random()
    check_user = await findOne(id)
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user : UnitUser = {
    id : id,
    username : userData.username,
    email : userData.email,
    password: hashedPassword,
    avatar: userData.avatar
  };

  users[id] = user;

  saveUsers()

  return user;
};


/**
 * findByEmail
 * Find a user by email
 *
 * @param {string} user_email
 * @return {*}  {(Promise<null | UnitUser>)}
 */
export const findByEmail = async (user_email: string): Promise<null | UnitUser> => {

  const allUsers = await findAll();

  const getUser = allUsers.find(result => user_email === result.email);

  if (!getUser) {
    return null;
  }

  return getUser;
};


/**
 * comparePassword
 * Check if supplied_password matches with user password
 *
 * @param {string} email
 * @param {string} supplied_password
 * @return {*}  {(Promise<null | UnitUser>)}
 */
export const comparePassword  = async (email : string, supplied_password : string) : Promise<null | UnitUser> => {

    const user = await findByEmail(email)

    const decryptPassword = await bcrypt.compare(supplied_password, user!.password)

    if (!decryptPassword) {
        return null
    }

    return user
}

/**
 * update
 * Updates the target user (id) with updateValues
 *
 * @param {string} id
 * @param {User} updateValues
 * @return {*}  {(Promise<UnitUser | null>)}
 */
export const update = async (id : string, updateValues : User) : Promise<UnitUser | null> => {

    const userExists = await findOne(id)

    if (!userExists) {
        return null
    }

    if(updateValues.password) {
        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(updateValues.password, salt)

        updateValues.password = newPass
    }

    users[id] = {
        ...userExists,
        ...updateValues
    }

    saveUsers()

    return users[id]
}

// TODO: Remove user which is already in one or more 
// teams must return a specific code for UI to ask if we want to remove teams as well
// Look forward for player flag to know wether user is active or inactive


/**
 * remove
 * Remove the user that matches id in param
 *
 * @param {string} id
 * @return {*}  {(Promise<null | void>)}
 */
export const remove = async (id : string) : Promise<null | void> => {

    const user = await findOne(id)

    if (!user) {
        return null
    }

    delete users[id]

    saveUsers()
}