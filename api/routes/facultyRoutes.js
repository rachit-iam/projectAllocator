const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/UserController");

// add some middleware also
// like -  const {checkToken} = require("../controllers/UserController");

const {
    getAllFaculty,
    assignFaculty,
} = require("../controllers/facultyController");

router.get("/getAllFaculty", verifyToken, getAllFaculty);
router.post("/assignFaculty", verifyToken, assignFaculty);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
