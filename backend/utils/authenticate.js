import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log(`authHeader: `, authHeader)
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const token = authHeader.split(" ")[1];
    // console.log(`token`,token)
    const decode = jwt.verify(token, process.env.JWT_SECRETA);
    // console.log(`decode`,decode);
    req.user = decode;
    // console.log("decoded", decode);
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
