const Post = require("../../models/Post");

module.exports={
  Query:{
    posts: async()=> Post.find(),
  },

  Mutation:{
    createPost: async(_,args) => Post.create(args),
  }
}