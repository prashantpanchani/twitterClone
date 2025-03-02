import Notification from "../models/notificationModel.js"

export const getNotifications = async (req,res) => {
    try {
        const  userId = req.user._id;
        const notifications = await Notification.find({to:userId}).populate({
            path:"from",
            select : "username profileImg"
        })
        await Notification.updateMany({to:userId},{read:true})
        res.status(200).json(notifications)
    } catch (error) {
        console.log("Error in getNotifications Controller function",error.message)
        res.status(500).json({error : "internal server error"})
    }
}
export const deleteNotifications = async (req,res) => {
    try {
        const  userId = req.user._id;
        await Notification.deleteMany({to:userId})
        res.status(200).json({message : "notifications deleted successfully "})
    } catch (error) {
        console.log("Error in deleteNotifications Controller function",error.message)
        res.status(500).json({error : "internal server error"})
    }
}

