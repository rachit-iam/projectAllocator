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

router.get("/getWorksByProjectId/:projectId", verifyToken, getWorksByProjectId);
router.post("/addWork/:projectId", verifyToken, addWork);
router.get("/getWorkById/:workId", verifyToken, getWorkById);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
