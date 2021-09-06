const express = require("express"),
  router = express.Router(),
  jwt = require("jsonwebtoken"),
  jwtdecode = require("jwt-decode"),
  auth = require("../middleware/auth");

(User = require("../models/user")), (config = require("../config/jwt"));

/* POST User register */
router.post("/register", (req, res) => {
  let newUser = new User();

  newUser.name = req.body.name;
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  

  newUser.created_at = new Date();
  newUser.updated_at = new Date();
  console.log(newUser);

  newUser.save(function (err, saved) {
    try {
      console.log(err);
      if (err) throw err.errmsg;

      res.status(200).json({
        success: true,
        message: "Successfully registered",
      });
    } catch (e) {
      console.log(e);

      res.status(500).json({
        success: false,
        message: "Something has gone wrong",
      });
    }
  });
});

/* POST User login */
router.post("/login", (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (error, user) => {
      if (error)
        res.status(500).json({
          success: false,
          message:
            "There is something wrong with the system. Please contact Administrator immediately",
          system_error: error,
        });

      if (user) {
        user.comparePassword(req.body.password, (err, isMatch) => {
          console.log(err, req.body.password, isMatch, "isMatch");
          if (err) throw err;

          if (isMatch) {
            User.findOneAndUpdate(
              { _id: user._id },
              { $set: { last_login: new Date() } },
              (err, updated) => {
                console.log(user._id);

                if (err) throw err;
                console.log(config);
                var token = jwt.sign(
                  {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                  },
                  config.JWT_SECRET,
                  { expiresIn: "1h" }
                );
                res.setHeader('Set-Cookie',[`token=${token};  Path=/;HttpOnly; maxAge=86400000;SameSite=None;Secure=true;`]);

                res.sendStatus(200);
              }
            );
          } else {
            res.status(401).json({
              success: false,
              message: "Invalid Username/Password",
              result: {},
            });
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: "No user found",
          result: {},
        });
      }
    }
  );
});

module.exports = router;
