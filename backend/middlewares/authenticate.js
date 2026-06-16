import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.auth_token;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : cookieToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRETA);
    req.user = decode;
    next();
  } catch (error) {
    console.error("Server error", error);
    return res.status(500).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authenticate;
