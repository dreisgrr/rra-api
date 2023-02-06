import express from "express";
import {
    createSite,
    updateSite,
    deleteSite,
    getSite,
    getSites
} from "../controllers/siteController.js"
import { verifyAdmin } from "../utils/verifyAccess.js";

const router = express.Router();

//create
router.post("/", verifyAdmin, createSite);

//update
router.put("/:id", verifyAdmin, updateSite);
//delete
router.delete("/:id", verifyAdmin, deleteSite);
//get
router.get("/:id", getSite);
//get all
router.get("/", getSites);

export default router;