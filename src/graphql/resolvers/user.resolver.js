const User = require("../../models/User");

module.exports={
  Query:{
    users: async()=> User.find(),
  },

  Mutation:{
    createUser: async(_,args) => User.create(args),
  }
}
