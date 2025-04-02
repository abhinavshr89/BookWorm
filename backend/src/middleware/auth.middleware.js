
import jwt from "jsonwebtoken";
import User from "../Models/Users.js";  


const protectRoute = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }t
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        
        console.error(error);
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default protectRoute;
