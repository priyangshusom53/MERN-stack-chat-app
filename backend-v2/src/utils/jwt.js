import jwt from 'jsonwebtoken';


// payload = {userId: _id, password: password}
export const generateToken = (payload, expiresIn) => {
   const JWT_SECRET = process.env.JWT_SECRET;
   if (!JWT_SECRET) throw new Error("No JWT secret found in .env file");
   return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
}

export const verifyToken = (token) => {
   try {
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) throw new Error("No JWT secret found in .env file");
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
   } catch (err) {
      console.log("Error verifying token:", err.message);
      return null;
   }
}

export const decodeToken = (token) => {
   try {
      const decoded = jwt.decode(token);
      return decoded;
   } catch (err) {
      console.log("Error decoding token:", err.message);
      return null;
   }
}
