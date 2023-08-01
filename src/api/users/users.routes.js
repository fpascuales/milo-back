const { signUp, login, getAllUsers, getUserById, updateUser, deleteUser, isAuthenticated } = require('./users.controller');
const passport = require('passport');
const usersRoutes = require('express').Router();

usersRoutes.post("/", signUp);
usersRoutes.post("/login", login);
usersRoutes.get("/", getAllUsers);
// usersRoutes.get("/", isAuthenticated, getAllUsers);
usersRoutes.get("/is-authenticated", isAuthenticated);
usersRoutes.get("/:id", getUserById);
// usersRoutes.get("/:id", isAuthenticated, getUserById);
usersRoutes.put("/:id", updateUser);
// usersRoutes.put("/:id", isAuthenticated, updateUser);
usersRoutes.delete("/:id", deleteUser);
// usersRoutes.delete("/:id", isAuthenticated, deleteUser);

module.exports = usersRoutes;