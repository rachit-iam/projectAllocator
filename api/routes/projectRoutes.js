const express = require("express");
const router = express.Router();

// add some middleware also like -  const {checkToken} = require("../controllers/UserController");

const {
    getProjectsByStudentId,
    addProject,
    getProjectById,
} = require("../controllers/projectController");

router.get("/getProjectsByStudentId", getProjectsByStudentId);
router.post("/addProject", addProject);
router.get("/getProjectById", getProjectById);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
