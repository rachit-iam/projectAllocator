const express = require("express");
const router = express.Router();

// add some middleware also
// like -  const {checkToken} = require("../controllers/UserController");

const {
    getAllStudents,
    getStudentsByFacultyById,
    getStudentDetails,
} = require("../controllers/studentController");

router.get("/getAllStudents", getAllStudents);
router.get("/getStudentsByFacultyById", getStudentsByFacultyById);
router.get("/getStudentDetails", getStudentDetails);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
