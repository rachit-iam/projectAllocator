const express = require("express");
const router = express.Router();

// add some middleware also
// like -  const {checkToken} = require("../controllers/UserController");

const {
    getWorksByProjectId,
    addWork,
    getWorkById,
} = require("../controllers/workController");

router.get("/getWorksByProjectId", getWorksByProjectId);
router.post("/addWork", addWork);
router.get("/getWorkById", getWorkById);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
