import bcrypt from 'bcryptjs';
import { v4 as random } from 'uuid';
import * as fs from 'fs';
import { User, UnitUser, Users } from './user.interface';

// TODO : Implement email is unique and 1 email == 1 username

/**
 * @type {*}
 */
let users: Users = [] as unknown as Users;

/**
 * Private loadUsers
 * Function that load all users from JSON file
 * Return empty object when no users
 *
 * @return {*}  {Users}
 */
export function loadUsers() : Users {
  try {
    const here = __dirname;
    const data = fs.readFileSync(`${here}/../../db/users.json`, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error ${error}`);
    return {};
  }
}

/**
 * Init function that initialises the Users array
 *
 * @export
 */
export function init() {
  try {
    users = loadUsers();
  } catch (e) {
    console.log('Error during the initialization of users');
  }
}

/**
 * saveUsers
 * Function that record the users array in the corresponding JSON file
 *
 */
function saveUsers() {
  try {
    console.log('Users before save : ', users);
    fs.writeFileSync('./src/db/users.json', JSON.stringify(users), 'utf-8');
    console.log('User saved successfully!');
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

/**
 * findAll
 * Search and returns all users from DB
 *
 * @return {*} {Users}
 */
export const findAll = async (): Promise<UnitUser[]> => {
  console.log('Users in user.database : ', users);
  return Object.values(users);
};

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
  let id = random();
  let checkUser = await findOne(id);

  if (checkUser) {
    id = random();
    checkUser = await findOne(id);
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user : UnitUser = {
    ...userData,
    id,
    password: hashedPassword,
  };

  // Adding user to users global array
  users[id] = user;

  saveUsers();

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

  const getUser = allUsers.find((result) => user_email === result.email);

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
export const comparePassword = async (
  email : string,
  supplied_password : string,
) : Promise<null | UnitUser> => {
  const user = await findByEmail(email);

  const decryptPassword = await bcrypt.compare(supplied_password, user!.password);

  if (!decryptPassword) {
    return null;
  }

  return user;
};

/**
 * update
 * Updates the target user (id) with updateValues
 *
 * @param {string} id
 * @param {User} updateValues
 * @return {*}  {(Promise<UnitUser | null>)}
 */
export const update = async (id : string, updateValues : User) : Promise<UnitUser | null> => {
  const userExists = await findOne(id);
  let newPass = null;

  if (!userExists) {
    return null;
  }

  if (updateValues.password) {
    const salt = await bcrypt.genSalt(10);
    newPass = await bcrypt.hash(updateValues.password, salt);
  }

  users[id] = {
    ...userExists,
    ...updateValues,
    password: newPass,
  };

  saveUsers();

  return users[id];
};

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
  const user = await findOne(id);

  if (!user) {
    return null;
  }

  delete users[id];

  return saveUsers();
};
