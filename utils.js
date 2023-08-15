import jwt from 'jsonwebtoken';


function getTokenPayload(token) {
  return jwt.verify(token, process.env.APP_SECRET);
}

export default function getUserId(authToken) {
if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error('Not authenticated User');
}

