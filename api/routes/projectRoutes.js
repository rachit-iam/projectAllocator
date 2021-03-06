const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/UserController");

// add some middleware also like -  const {checkToken} = require("../controllers/UserController");

const {
    getProjectsByStudentId,
    addProject,
    getProjectById,
} = require("../controllers/projectController");

router.get("/getProjectsByStudentId/:studentId", verifyToken, getProjectsByStudentId);
router.post("/addProject/:studentId", verifyToken, addProject);
router.get("/getProjectById/:projectId", verifyToken, getProjectById);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
