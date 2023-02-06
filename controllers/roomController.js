import Room from "../models/Room.js"
import Site from "../models/Site.js"
import { createError } from "../utils/error.js"

export const createRoom = async (req, res, next) => {
    const siteId = req.params.siteId;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save() 
        try {
            await Site.findByIdAndUpdate(siteId, {$push : { rooms: savedRoom._id }})
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom);
    }
    catch(error) {
        next(error);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom)
    }
    catch(err) {
        next(err);
    }
} 

export const deleteRoom = async (req, res, next) => {
    const siteId = req.params.siteId;
    try {
        await Room.findByIdAndDelete(
            req.params.id
        );
        try {
            await Site.findByIdAndUpdate(siteId, {
                $pull: { rooms: req.params.id }
            })
        } catch (error) {
            
        }
        res.status(200).json(`Room Type ${req.params.id} has been deleted.`)
    }
    catch(err) {
        next(err);
    }
} 

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(
            req.params.id
        );
        res.status(200).json(room)
    }
    catch(err) {
        next(err);
    }
} 

export const getRooms = async (req, res, next) => {
    let isQueryEmpty = false;
    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) isQueryEmpty = true;

    if(isQueryEmpty) {
        try {
            const rooms = await Room.find({
                
            }).limit(req.query.limit);
            res.status(200).json(rooms)
        }
        catch(err) {
            next(err);
        }
    }
    else {
        const { capacity, ...others } = req.query;
        if (capacity == undefined) {
            try {
                const rooms = await Room.find({
                    ...others,
                }).limit(req.query.limit);
                res.status(200).json(rooms)
            }
            catch(err) {
                next(err);
            }
        }
        else {
            try {
                const rooms = await Room.find({
                    ...others,
                    capacity: { $gte: capacity },
                }).limit(req.query.limit);
                res.status(200).json(rooms)
            }
            catch(err) {
                next(err);
            }
        }
        
    }
    

} 

export const getAvailableRooms = async (req, res, next) => {
    const { capacity, requestStart, requestEnd, siteId, facilityType } = req.query;
    const numCapacity = Number(capacity);
    console.log(req.query)
    let requestStartTime = new Date(Number(requestStart))
    let requestEndTime = new Date(Number(requestEnd)) 


    // let requestStartTime = new Date()
    // let requestEndTime = new Date() 
    // requestStartTime.setDate(2)
    // requestStartTime.setHours(18)
    // requestStartTime.setMinutes(0)
    // requestStartTime.setSeconds(0)
    // requestStartTime.setMonth(1)

    // requestEndTime.setDate(2)
    // requestEndTime.setHours(22)
    // requestEndTime.setMinutes(0)
    // requestEndTime.setSeconds(0)
    // requestEndTime.setMonth(1)
    console.log(requestStartTime)
    console.log(requestEndTime)

    try {
        let rooms = await Room.aggregate([
            {
                $project: {
                    "_id": {
                        $toString: "$_id"
                    },
                    "name": 1,
                    "siteId": 1,
                    "facilityType": 1,
                    "description": 1,
                    "capacity": 1,
                    "floor": 1,
                    "isRestricted": 1,
                    "features": 1,
                }
            },
            {
                $lookup: {
                    from: "reservations",
                    localField: "_id",
                    foreignField: "roomId",
                    as: "reservation"
                }
            },
            {
                $match: {
                    $or: [
                        {reservation: { $eq: []}},
                        {
                            
                                    $or: [
                                        {
                                            $and: [
                                                {
                                                    "reservation.reservationStartTime": { $lt: requestStartTime}
                                                },
                                                { 
                                                    "reservation.reservationEndTime": { $lte: requestStartTime }
                                                }
                                            ]
                                        },
                                        {
                                            $and: [
                                                {
                                                    "reservation.reservationStartTime": { $gt: requestStartTime}
                                                },
                                                { 
                                                    "reservation.reservationStartTime": { $gte: requestEndTime }
                                                }
                                            ]
                                        },
                                        // {
                                        //     $or: [
                                        //         {
                                        //             "reservation.reservationStatus": { $eq: "CANCELLED"}
                                        //         },
                                        //         {
                                        //             "reservation.reservationStatus": { $eq: "REJECTED"}
                                        //         }
                                        //     ]
                                        // }
                                    ]
                                
                        },
                        // {"reservation.reservationStartTime": { $lt: requestStartTime}}
                    ],
                    siteId: siteId,
                    facilityType: facilityType,
                    capacity: { $gte: numCapacity },
                }
            }
            
        ])
        res.status(200).json(rooms)
    }
    catch(err) {
        next(err);
    }
} 
