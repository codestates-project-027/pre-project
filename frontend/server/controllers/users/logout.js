module.exports = (req, res) => {
  const refreshToken = req.cookies['refresh_jwt'];
  if (refreshToken) {
    res.clearCookie('refresh_jwt', {
      domain: 'localhost',
      path: '/',
      sameSite: 'none',
      secure: true,
    });
  }
  res.clearCookie('access_jwt', {
    domain: 'localhost',
    path: '/',
    sameSite: 'none',
    secure: true,
  });
  return res.status(205).send('Logged Out Successfully');
};
