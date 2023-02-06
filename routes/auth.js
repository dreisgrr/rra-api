import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("RRA - Auth base endpoint")
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;