const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async () => {
      return User.find();
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect email or password!");
      }
      const correctPassword = await user.isCorrectPassword(password);

      if (correctPassword) {
        throw new AuthenticationError("Incorrect email or password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { user, token };
    },

    // saveBook: async (parent, { authors, description, title, bookId, image, link, }) => {
    //   const savedBooks = await User.findOneAndUpdate(
    //     {}
    //   )

    //   return { savedBooks, token };
    // },


  }
}


module.exports = resolvers;