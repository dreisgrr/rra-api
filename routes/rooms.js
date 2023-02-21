import express from "express";
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms, getAvailableRooms } from "../controllers/roomController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyAccess.js";

const router = express.Router();

//get available
router.get("/getavailable", verifyUser, getAvailableRooms);
//create
router.post("/:siteId", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);
//delete
router.delete("/:id/:siteId", verifyAdmin, deleteRoom);
//get
router.get("/:id", verifyUser, getRoom);
//get all
router.get("/", verifyUser, getRooms);



export default router;