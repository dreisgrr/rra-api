import express from "express";
import { createReservation, updateReservation, deleteReservation, getReservation, getReservations } from "../controllers/reservationController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyAccess.js";

const router = express.Router();

//create
router.post("/", createReservation);

//update
router.put("/:id", updateReservation);
//delete
router.delete("/:id", verifyAdmin, deleteReservation);
//get
router.get("/:id", getReservation);
//get all
router.get("/", getReservations);



export default router;