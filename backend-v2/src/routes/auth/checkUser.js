
export const checkUser = async (req, res) => {
   const sessionId = req.cookies.sessionId
   console.log(sessionId)
   try {
      if (!sessionId) {
         console.log('No sessionId provided')
         res.status(401).json({ message: 'unauthorized user' })
      }
      const decoded = jwt.verifyToken(sessionId)
      if (decoded !== null) {
         const { userId, password } = decoded
         const user = await findUserById(db, userId)
         if (!user) {
            console.log('User not found')
            res.status(404).json({ message: 'user not found' })
            return
         }
         if (password === user.password) {
            console.log('user verified successfully')
            res.status(200).json({ message: 'user verified successfully' })
            return
         } else {
            console.log('incorrect user info')
            res.status(401).json({ message: 'unauthorized user' })
            return
         }
      }
      else {
         console.log(`middleware verifyAuthUser: Invalid sessionId`)
         res.status(401).json({ message: 'unauthorized user' })
         return
      }

   } catch (err) {
      console.error(`Error in verifyAuthUser middleware: ${err.message}`)
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "unauthorized user" }));
      return
   }
}