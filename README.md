# projectAllocator
Backend {
  added all the neccessary files for this project
  added tables also in the api/Models
  basically added faculty, student , project and Work , the userModel is same as example from ck 
  check this : https://sequelize.org/master/manual/getting-started.html
  check model associations also , i have also added associations in the models folder but i have not checked if it is correct, you can modify if you need
  MAIN thing is making an suitable middleware() like - 
        app.use(async (req, res, next) => {
          if (req.headers["x-access-token"]) {
            const accessToken = req.headers["x-access-token"];
            const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
            // Check if token has expired
            if (exp < Date.now().valueOf() / 1000) {
             return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
            }
            res.locals.loggedInUser = await User.findById(userId); next();
          } else {
            next();
          }
        });
  and fill all the apis in CONTROLLER (will heavily use sequelize) I have added comments, but feel free to modify anything
  you may have to change mysql details in config and models/index.js
  }
