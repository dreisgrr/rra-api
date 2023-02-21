import Reservation from "../models/Reservation.js"
import { createError } from "../utils/error.js"

export const createReservation = async (req, res, next) => {
    const newReservation = new Reservation(req.body)

    try {
        const savedReservation = await newReservation.save() 
        res.status(200).json(savedReservation);
    }
    catch(error) {
        next(error);
    }
}

export const updateReservation = async (req, res, next) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedReservation)
    }
    catch(err) {
        next(err);
    }
} 

export const deleteReservation = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(`ReservationId - ${req.params.id} has been deleted.`)
    }
    catch(err) {
        next(err);
    }
} 

export const getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(
            req.params.id
        );
        res.status(200).json(reservation)
    }
    catch(err) {
        next(err);
    }
} 

export const getReservations = async (req, res, next) => {
    const { domainId, isAdmin, reservationStatus, ...others } = req.query;
    
    if (isAdmin) {
        if(reservationStatus==="ALL") {
            try {
                const reservations = await Reservation.find({
                    ...others,
                }).limit(req.query.limit).sort({updatedAt: -1});
                res.status(200).json(reservations)
            } catch (error) {
                next(err);
            }
        }
        try {
            const reservations = await Reservation.find({
                ...others,
                reservationStatus: reservationStatus,
            }).limit(req.query.limit).sort({updatedAt: -1});
            res.status(200).json(reservations)
        } catch (error) {
            next(error);
        }
    }
    else {
        try {
            const reservations = await Reservation.find({
                ...others,
                domainId: domainId ,
            }).limit(req.query.limit).sort({updatedAt: -1});
            res.status(200).json(reservations)
        }
        catch(err) {
            next(err);
        }
    }
} 
