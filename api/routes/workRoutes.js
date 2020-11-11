const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/UserController");

// add some middleware also
// like -  const {checkToken} = require("../controllers/UserController");

const {
    getWorksByProjectId,
    addWork,
    getWorkById,
} = require("../controllers/workController");

router.get("/getWorksByProjectId", verifyToken, getWorksByProjectId);
router.post("/addWork", verifyToken, addWork);
router.get("/getWorkById", verifyToken, getWorkById);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
