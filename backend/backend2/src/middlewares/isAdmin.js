export function isAdminMiddleware(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Acceso denegado: solo para administradores' });
  }
  next();
}