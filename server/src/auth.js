import jwt from 'jsonwebtoken';
export function requireJWT(req, res, next){
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({error:'missing token'});
  try{ jwt.verify(token, process.env.JWT_SECRET || 'dev'); next(); }catch{ return res.status(401).json({error:'bad token'}); }
}
