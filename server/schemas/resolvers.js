const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async () => {
      return User.findOne();
    }
  },
  Mutation: {
    login: async (parent, args, context) => {
      const user = await User.findOne({ email: args.email });

      if (!user) {
        throw new AuthenticationError("Incorrect email or password!");
      }
      const correctPassword = await user.isCorrectPassword(args.password);

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
    saveBook: async (parent, args, context) => {
      console.log(args);
      
      const saveBooks = await User.findByIdAndUpdate(
        args._id,
        { $addToSet: { savedBooks: args } },
        { new: true,  runValidators: true}
      );

      console.log(saveBooks);

      return { saveBooks };
    },
    removeBook: async (parent, args, context) => {
      console.log(args);

      const updatedUser = await User.findByIdAndUpdate(
        args._id,
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      )

      if (!updatedUser) {
        console.log("Could not find user with this id!");
      }

      return { updatedUser };
    }

  }

}


module.exports = resolvers;