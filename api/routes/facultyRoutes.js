const express = require("express");
const router = express.Router();

// add some middleware also
// like -  const {checkToken} = require("../controllers/UserController");

const {
    getAllFaculty,
    assignFaculty,
} = require("../controllers/facultyController");

router.get("/getAllFaculty", getAllFaculty);
router.post("/assignFaculty", assignFaculty);

//router.post("/fellowship/saveLeaveMaster",checkToken, saveLeaveMaster);

module.exports = router;
