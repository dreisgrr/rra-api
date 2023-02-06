import Site from "../models/Site.js"

export const createSite = async (req, res, next) => {
    const newSite = new Site(req.body)
    try {
        const savedSite = await newSite.save();
        res.status(200).json(savedSite)
    }
    catch(err) {
        next(err);
    }
} 

export const updateSite = async (req, res, next) => {
    try {
        const updatedSite = await Site.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedSite)
    }
    catch(err) {
        next(err);
    }
} 

export const deleteSite = async (req, res, next) => {
    try {
        await Site.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(`Site ID ${req.params.id} has been deleted.`)
    }
    catch(err) {
        next(err);
    }
} 

export const getSite = async (req, res, next) => {
    try {
        const site = await Site.findById(
            req.params.id
        );
        res.status(200).json(site)
    }
    catch(err) {
        next(err);
    }
} 

export const getSites = async (req, res, next) => {
    try {
        const sites = await Site.find();
        res.status(200).json(sites)
    }
    catch(err) {
        next(err);
    }
} 