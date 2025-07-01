export function checkAdmin(req, res) {
  res.status(200).json({
    message: 'Acceso permitido',
  });
}