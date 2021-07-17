import express from 'express';
import jwt from 'jsonwebtoken';
import { token } from '../utils/jwtHelp';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});
router.post('/CloudShadow/Api/login', function (req, res) {
  const user = {
    username: `cloud`,
    sex: `male`,
  };
  // jwt.verify(token(user));
  res.json({
    user,
    accessToken: token(user).accessToken,
    refreshToken: token(user).refreshToken,
  });
});
router.post('/CloudShadow/Api/refresh', function (req, res) {
  const user = {
    username: `cloud`,
    sex: `male`,
  };
  res.json({
    accessToken: token(user).accessToken,
    refreshToken: token(user).refreshToken,
  });
});
router.get('/CloudShadow/Api/users', verifyToken, function (req, res) {
  res.json({
    users: [
      {
        email: 'cloud1@restful',
        userName: 'cloud1',
        phone: '1234567890',
      },
      {
        email: 'cloud2@restful',
        userName: 'cloud2',
        phone: '1234567890',
      },
      {
        email: 'cloud3@restful',
        userName: 'cloud3',
        phone: '1234567890',
      },
      {
        email: 'cloud4@restful',
        userName: 'cloud4',
        phone: '1234567890',
      },
      {
        email: 'cloud5@restful',
        userName: 'cloud5',
        phone: '1234567890',
      },
      {
        email: 'cloud6@restful',
        userName: 'cloud6',
        phone: '1234567890',
      },
      {
        email: 'cloud7@restful',
        userName: 'cloud7',
        phone: '1234567890',
      },
      {
        email: 'cloud8@restful',
        userName: 'cloud8',
        phone: '1234567890',
      },
      {
        email: 'cloud9@restful',
        userName: 'cloud9',
        phone: '1234567890',
      },
      {
        email: 'cloud10@restful',
        userName: 'cloud10',
        phone: '1234567890',
      },
    ],
  });
});
router.get('/CloudShadow/Api/title', function (req, res) {
  res.json({
    id: 1,
    title: 'cloud title',
    epicTitle: 'cloud epic title',
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const accessToken = getUserToken(bearerHeader.split(' ')[1]);
    console.log('accessToken', accessToken);
    if (!accessToken || parseInt(accessToken.exp) * 1000 < new Date().getTime()) {
      // throw new Error('Not Authenticated');
      res.sendStatus(401);
    } else {
      next();
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

const getUserToken = (token) => {
  console.log('============1');
  try {
    console.log('============2');
    if (token) {
      console.log('jwt', jwt.verify(token, 'cloudshadow.me'));
      return jwt.verify(token, 'cloudshadow.me');
      // return jwt.verify(token, PRIVATE_KEY);
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    console.log('============3');
    return null;
  }
};

export default router;
