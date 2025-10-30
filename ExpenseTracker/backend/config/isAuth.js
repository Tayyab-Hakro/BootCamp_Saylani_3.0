import jwt from "jsonwebtoken";

export const isAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "User is unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded user data save
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
