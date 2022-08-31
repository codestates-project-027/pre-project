const { USER_DATA } = require('../../db/data');
const { generateToken } = require('../helper/tokenFunctions');

module.exports = async (req, res) => {
  const { userId, password } = req.body.loginInfo;
  const { checkedKeepLogin } = req.body;
  const userInfo = {
    ...USER_DATA.filter((user) => user.userId === userId && user.password === password)[0],
  };

  if (!userInfo.id) {
    res.status(401).send('Not Authorized');
  }
  const { accessToken, refreshToken } = await generateToken(userInfo, checkedKeepLogin);

  if (refreshToken) {
    res.cookie('refresh_jwt', refreshToken, {
      domain: 'localhost',
      path: '/',
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 3600 * 1000 * 7), // 7일 후 소멸되는 Persistent Cookie
    });
  }
  res.cookie('access_jwt', accessToken, {
    domain: 'localhost',
    path: '/',
    sameSite: 'none',
    httpOnly: true,
    secure: true,
    // Expires 옵션이 없는 Session Cookie
  });
  return res.redirect('/userinfo');
};
