const express = require("express");
const { createUser } = require("");

const router = express.Router();

router.get("/create-user", upload.single("file"), createUser);


module.exports = router;
