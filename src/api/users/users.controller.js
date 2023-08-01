const User = require('./users.model');
const passport = require('../../utils/passport');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    try {
        if(req.body.rol === "admin"){
            req.body.rol = "user";
        }
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({msg: 'Not Found'});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}

const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: 'Not Found' });
      }
  
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      }
      const userUpdated = await User.findByIdAndUpdate(id, req.body, { new: true });
  
      return res.status(201).json(userUpdated);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "Not Found" });
      }
      const userDeleted = await User.findByIdAndDelete(id);
      return res.status(200).json(userDeleted);
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
}

const login = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({ success: false, message: "Error de autenticación", error: err });
    }
    if (!user) {
      return res.status(404).json({ success: false, message: "Datos incorrectos" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: "Error al iniciar sesión" });
      }
      return res.status(200).json({ success: true, message: "Inicio de sesión correcto" });
    });
  })(req, res, next);
};

const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ msg: 'No autorizado'});
    }
};

module.exports = {
    signUp,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    login,
    isAuthenticated
}