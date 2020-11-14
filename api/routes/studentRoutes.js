const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/UserController");

// add some middleware also
// like -  const {checkToken} = require("../controllers/UserController");

const {
    getAllStudents,
    getStudentsByFacultyById,
    getStudentDetails,
} = require("../controllers/studentController");

router.get("/getAllStudents", verifyToken, getAllStudents);
router.get("/getStudentsByFacultyById", verifyToken, getStudentsByFacultyById);
router.get("/getStudentDetails/:studentId", verifyToken, getStudentDetails);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
