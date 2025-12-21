require("dotenv").config();
const createApp = require('./app');
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

(async ()=>{
  await connectDB();
  const app= await createApp();
  app.listen(port,()=>{
    console.log(`-server listening at http://localhost:${port}/graphql`);
  })
})();