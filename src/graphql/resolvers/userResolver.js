// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const User = require('../../models/User');
// const {subscribe} = require('../../pubsub');
const pubsub = require('../../pubsub');
const USER_CREATED = "USER_CREATED"


// const userResolver = {
//   Query: {
//     users: async (_, __,{user}) => {
//       console.log('----user---',user);
//       if(!user) return new Error("Unathorized")
//         return await User.find().sort({ createdAt: -1 })
//     },
//     user: async (_, { id },{user}) => {
//       if(!user) return new Error("Unathorized")
//       return await User.findById(id);
//     }
//   },
//   Mutation: {
//     registerUser: async (_, { name, email,password }) => {
//       const exists = await User.findOne({ email });
//       if (exists) throw new Error("email already registered!");
      
//       const hashP = await bcrypt.hash(password, 10)
//       const newUser = new User({ name, email,password: hashP });
//       await newUser.save();
//       const token= jwt.sign({userId:newUser.id},process.env.JWT_SECRET)
//       return {token, user: newUser}
//     },
//     loginUser: async (_, { email,password }) => {
//       const user = await User.findOne({ email });
//       console.log('--loginUser----',user);
//       if (!user) throw new Error("User not found!");
      
//       const isMatch = await bcrypt.compare(password, user.password)
//       if(!isMatch) throw new Error("Invalid Creds")

//       const token= jwt.sign({userId: user.id},process.env.JWT_SECRET,{
//         expiresIn:"1d",
//       })
//       return {token, user}
//     },
//   }
// }

const userResolver = {
  Query: {
    users: async()=> await User.find().sort({ createdAt: -1 })
  },
  Mutation: {
    createUser: async(_,{name, email})=>{
      const user = new User({name,email});
      await user.save();
      await pubsub.publish(USER_CREATED,{userCreated: user});
      return user;
    }
  },
  Subscription:{
    userCreated:{
      subscribe:()=> pubsub.asyncIterableIterator([USER_CREATED])
    }
  },

}
module.exports = userResolver;
