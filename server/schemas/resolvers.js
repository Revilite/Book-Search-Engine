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
    login: async (parent, {email, password}) => {
      const user = User.findOne({email});

      if(!user) {
        throw new AuthenticationError("No User with the email has been found")
      }
    }
  }
}
