const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userResolver = {
  Query: {
    users: async () => {
      return await User.find().sort({ createdAt: -1 })
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    }
  },
  Mutation: {
    registerUser: async (_, { name, email,password }) => {
      const exists = await User.findOne({ email });
      if (exists) throw new Error("email already registered!");
      
      const hashP = await bcrypt.hash(password, 10)
      const newUser = new User({ name, email,password: hashP });
      await newUser.save();
      const token= jwt.sign({userId:newUser.id},process.env.JWT_SECRET,{
        expiresIn:"1d",
      })
      return {token, user: newUser}
    },
    loginUser: async (_, { email,password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found!");
      
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) throw new Error("Invalid Creds")

      const token= jwt.sign({userId: user.id},process.env.JWT_SECRET,{
        expiresIn:"1d",
      })
      return {token, user}
    },
  }
}
module.exports = userResolver;
