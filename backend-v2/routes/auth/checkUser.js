
export const checkUser = async (req, res) => {
   res.status(200).json({ user: req.user, status: 'valid' })
}