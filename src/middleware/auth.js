const jwt = require('jsonwebtoken');

const authMiddleware=(req,res)=>{
  const authHeader = req.headers.authorization || "";
  console.log('----authHeader---',authHeader);
  if(!authHeader) return null;
  const token = authHeader.replace("Bearer ","");
  // const token = authHeader.split(7,"");
  console.log('----token---',token);
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token")
  }
}

module.exports= authMiddleware;
