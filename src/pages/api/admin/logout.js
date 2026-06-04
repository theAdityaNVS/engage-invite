export default function handler(req, res) {
  // Clear the admin_session cookie by setting its expiration to the past
  const secureAttr = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const cookieStr = `admin_session=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT${secureAttr}`;
  
  res.setHeader('Set-Cookie', cookieStr);
  return res.status(200).json({ success: true });
}
