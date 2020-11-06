# projectAllocator<br />
Backend {<br />
  *added all the neccessary files for this project<br />
  added tables also in the api/Models<br />
  basically added faculty, student , project and Work , the userModel is same as example from ck <br />
  check this : https://sequelize.org/master/manual/getting-started.html<br />
  check model associations also , i have also added associations in the models folder but i have not checked if it is correct, you can modify if you need<br />
  MAIN thing is making an suitable middleware() like - <br />
        *app.use(async (req, res, next) => {<br />
          if (req.headers["x-access-token"]) {<br />
            const accessToken = req.headers["x-access-token"];<br />
            const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);<br />
            // Check if token has expired<br />
            if (exp < Date.now().valueOf() / 1000) {<br />
             return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });<br />
            }<br />
            res.locals.loggedInUser = await User.findById(userId); next();<br />
          } else {<br />
            next();<br />
          }<br />
        });<br />
  and fill all the apis in CONTROLLER (will heavily use sequelize) I have added comments, but feel free to modify anything<br />
  you may have to change mysql details in config and models/index.js<br />
  }<br />
