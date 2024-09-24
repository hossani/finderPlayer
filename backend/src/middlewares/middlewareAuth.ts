import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index"; // Import the custom error class

interface AuthenticatedRequest extends Request {
  user?: any;
}
// Middleware function to check authentication
const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  // Extract the Authorization header
  const authHeader = req.headers["authorization"];

  // Check if the Authorization header is missing
  if (!authHeader) {
    throw new UnauthenticatedError("Authorization header missing");
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  // Check if the token is missing
  if (!token) {
    throw new UnauthenticatedError("No token, authorization denied");
  }

  try {
    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
    // Attach decoded user to the request object
    req.user = decoded;
    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Problem in auth middleware", error);
    if (error instanceof UnauthenticatedError) {
      return res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization denied." });
    }

    res.status(500).json({ message: "Error in auth middleware" });
  }
};

export default authMiddleware;
