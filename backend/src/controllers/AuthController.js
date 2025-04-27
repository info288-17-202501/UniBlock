export function loginController(req, res) {
  // const { email, password } = req.body;

  res.status(200).json({ message: "Login successful" });
  
}

export function registerController(req, res) {
  // const { name, email, password } = req.body;

  res.status(201).json({ message: "User registered successfully" });
}

export function sendOTPController(req, res) {
  // const { email } = req.body;

  res.status(200).json({ message: "OTP sent successfully" });
}

export function verifyOTPController(req, res) {
  // const { email, otp } = req.body;

  res.status(200).json({ message: "OTP verified successfully" });
}

export function recoverPasswordController(req, res) {
  // const { email, newPassword } = req.body;

  res.status(200).json({ message: "Password recovered successfully" });
}