import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers
} from "../controllers/userController.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyAccess.js";

const router = express.Router();

router.get("/checkAuthentication", verifyToken, (req, res, next) => {
    res.send("User authenticated.")
})

router.get("/checkUser/:id", verifyUser, (req, res, next) => {
    res.send("User authenticated.")
})

router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
    res.send("Admin access verified.")
})

//update
router.put("/:id", verifyUser, updateUser);
//delete
router.delete("/:id", verifyUser, deleteUser);
//get
router.get("/:id", verifyUser, getUser);
//get all
router.get("/", verifyAdmin, getUsers);

export default router;