import express from "express";
import { createReservation, updateReservation, deleteReservation, getReservation, getReservations } from "../controllers/reservationController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyAccess.js";

const router = express.Router();

//create
router.post("/", verifyUser, createReservation);

//update
router.put("/:id", verifyUser, updateReservation);
//delete
router.delete("/:id", verifyAdmin, deleteReservation);
//get
router.get("/:id", verifyUser, getReservation);
//get all
router.get("/", verifyUser, getReservations);



export default router;