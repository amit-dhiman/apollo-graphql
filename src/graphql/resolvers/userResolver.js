const userResolver={
  Query:{
    getUser:()=>{
      return {
        naem:"Static User"
      }
    }
  },
  Mutation:{
    createUser:(_,{name})=>{
      return {
        name
      }
    }
  }
}
module.exports= userResolver;