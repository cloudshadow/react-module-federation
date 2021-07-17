import jwt from 'jsonwebtoken';

export const token = (user) => {
  return {
    accessToken: jwt.sign(
      {
        // exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
        data: { ...user },
      },
      'cloudshadow.me', // PRIVATE_KEY
      {
        expiresIn: 30, // seconds
      }
    ),
    refreshToken: jwt.sign(
      {
        // exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
        data: { ...user },
      },
      'cloudshadow.me', // PRIVATE_KEY
      {
        expiresIn: 60, // seconds
      }
    ),
  };
};
