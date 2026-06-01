import jwt from "jsonwebtoken";

export const loginUser = (req, res) => {

  
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required.",
    });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials.",
    });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.cookie("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, 
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  })
  return res.json({ success: true, message: "Logged out" })
}

export const verify = (req, res) => {
  const token = req.cookies?.admin_token  

  if (!token) {
    return res.json({ valid: false })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET) 
    return res.json({ valid: true })
  } catch {
    return res.json({ valid: false })
  }
}