import dayjs from "dayjs";
import hashPassword from "../helpers/hashPassword";
import passwordCompareSync from "../helpers/passwordCompareSync";
import { User, Role, Session } from "../models";
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

const USER_SESSION_EXPIRY_HOURS = 2;

exports.signup = async (data) => {
  // Creates the user in the database
  console.log(data);
};
