import { gql } from 'apollo-server-express';
import Users from './models/mongo/UsersSchema';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { token } from '../utils/jwtHelp';

const PRIVATE_KEY = 'cloudshadow.me';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getUsersList(offset: Int, limit: Int): UserPageInfo
  }

  type UserPageInfo {
    totalCount: Int
    userList: [User]
  }

  type AuthPayLoad {
    user: User!
    token: String!
  }

  type User {
    email: String
    userName: String
    role: Int
    phone: String
    position: String
    sex: String
    updateTime: String
    createTime: String
  }

  input UserInput {
    email: String
    userName: String
    password: String
    role: Int
    phone: String
    position: String
    sex: String
  }

  type Mutation {
    createUser(user: UserInput): User
    updateUser(user: UserInput): User
    loginUser(email: String, password: String): AuthPayLoad!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getUsersList: async (root, { offset = 1, limit = 10 }, context) => {
      console.log('limit', limit);
      console.log('offset', offset);
      // if (!context.userToken || parseInt(context.userToken.exp) * 1000 < new Date().getTime()) {
      //   throw new Error('Not Authenticated')
      // }
      const totalCount = await Users.count();
      const userList = await Users.aggregate([{ $skip: (offset - 1) * limit }, { $limit: limit }]);
      return { totalCount, userList };
    },
  },
  Mutation: {
    loginUser: async (root, { email, password }) => {
      console.log(`in login`);
      const hashPassword = crypto.createHash('sha256').update(password).digest('base64');
      const user = await Users.findOne({ email, password: hashPassword });
      console.log(`in login2`);
      if (!user) throw new Error('Please Check the User Name and Password');
      return {
        user,
        token: token(user),
        // token: jwt.sign(
        //   {
        //     // exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
        //     data: { email: user.email },
        //   },
        //   PRIVATE_KEY,
        //   {
        //     expiresIn: 300, // seconds
        //   }
        // ),
      };
    },
    createUser: async (root, { user }) => {
      const hashPassword = crypto.createHash('sha256').update(user.password).digest('base64');
      return await Users.create({ ...user, password: hashPassword }, (error, docs) => {
        if (error) console.log(error);
      });
    },
    updateUser: async (root, { user }, context) => {
      // console.log(parseInt(context.userToken.exp) * 1000)
      // console.log(parseInt(new Date().getTime()))
      if (!context.userToken || parseInt(context.userToken.exp) * 1000 < new Date().getTime()) {
        throw new Error('Not Authenticated');
      }
      return await Users.findOneAndUpdate({ email: user.email }, user, (error, docs) => {
        if (error) console.log(error);
      });
    },
  },
};

const getUserToken = (token) => {
  try {
    if (token) {
      return jwt.verify(token, PRIVATE_KEY);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const context = ({ req }) => {
  // Note! This example uses the `req` object to access headers,
  // but the arguments received by `context` vary by integration.
  // This means they will vary for Express, Koa, Lambda, etc.!
  //
  // To find out the correct arguments for a specific integration,
  // see the `context` option in the API reference for `apollo-server`:
  // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

  // Get the user token from the headers.
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : '';
  // try to retrieve a user with the token
  const userToken = getUserToken(token);

  // // add the user to the context
  // return { user };
  return { userToken };
};

export default {
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: true,
};
