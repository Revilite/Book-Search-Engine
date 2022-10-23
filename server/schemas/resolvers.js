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
    saveBook: async (parent, { user, body }, context) => {
      console.log(user, body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      const token = signToken(updatedUser);

      return { updatedUser, token };
    },
    removeBook: async (parent, { user, params }, context) => {
      console.log(user, params);

      const updatedUser = await User.findOneandUpdate(
        {_id: user._id},
        {$pull: {savedBooks: { bookId: params.bookId} } },
        { new: true }
      );

      if (!updatedUser) {
        console.log("Could not find user with this id!");
      }

      const token = signToken(updatedUser);

      return { token, updatedUser };
    }

  }

}


module.exports = resolvers;