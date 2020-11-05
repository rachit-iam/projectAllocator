const express = require("express");
const router = express.Router();

// add some middleware also
// like -  const {checkToken} = require("../controllers/UserController");

const {
    getWorksByStudentId,
    addWork,
    getWorkById,
} = require("../controllers/workController");

router.get("/getWorksByStudentId", getWorksByStudentId);
router.post("/addWork", addWork);
router.get("/getWorkById", getWorkById);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
