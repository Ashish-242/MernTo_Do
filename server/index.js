const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const UserModel=require('./models/user');
const TodoModel=require('./models/todo');
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

const PORT=process.env.PORT || 4000;
const app=express();
const connectionstring="mongodb+srv://ash242242:w1FysDuchP4el2Ga@cluster0.xs8hlf6.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionstring);

app.get('/',(req,res)=>{
    res.json({message:"Hello from Server"});
})
app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
});
// app.use(cors({
//     origin: 'http://192.168.0.109:3000', // Allow requests from this origin
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }));

  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  
// const corsOptions ={
//    origin:'http://localhost:3000/', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions))
  app.use(express.json());
app.use(cookieparser());

const salt = bcrypt.genSaltSync(10);
const secret="lksfjaijfowjpoerjwfnaksfdaf";

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userdoc = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    
    res.json(userdoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const data = req.body;
    if (data.username) {
      const user = await UserModel.findOne({ username: data.username });
      if (user) {
        console.log(user);
        const passok = await bcrypt.compareSync(data.password, user.password);
        if (passok) {
          // this is used to create a cookie
          jwt.sign(
            { username: data.username, id: user._id },
            secret,
            {},
            (err, token) => {
              if (err) throw err;
            
              res.cookie("token", token, {
              }).json({
                id: user._id,
                username: data.username,
              });
            }
          );
        } else {
          res.status(400);
          res.json({
            message: "Wrong ",
          });
        }
      } else {
        res.status(400);
        res.json({
          message: "User Not Found",
        });
      }
    } else {
      res.status(400);
      res.json({
        message: "Empty data field",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
  }
});
app.get("/profile", (req, res) => {
    // now her we check that our login cookie is active or not so to deal with cookies we install cookie parser
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
      });
      // res.json(req.cookies);
    }
  });
  
  app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
  });
  
  app.get("/getTodoList", async (req, res) => {
    const token=req.cookies;
    if(token){
    
      res.json(
        await TodoModel.find()
          .populate("author", ["username"])
          .sort({ createdAt: -1 })
          .limit(20)
      );
    }
      
      
}); 
  
// Add new task to the database 
app.post("/addTodoList", async (req, res) => { 
  const { token } = req.cookies;
  console.log(token);
  if(token){
    
      jwt.verify(token,secret,{},async(err,info)=>{
        const tododoc=await TodoModel.create({ 
          title: req.body.title, 
          description: req.body.description, 
          date: req.body.date,  
          priority: req.body.priority, 
          status:req.body.status,
          author:info.id, 
      
      })
      res.json(tododoc);
    }) 
    
    
   
  }else{
    res.status(404).json("You are not LoggedIn");
  }


}); 
  
// Update task fields (including deadline) 
app.put("/updateTodoList/:id",async (req, res) => { 
  const { token } = req.cookies;

  if (token != "") {  
  const id = req.params.id; 
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const PostDoc = await Post.findById(id);
      //  res.json(PostDoc);
      const isAuthor =
        JSON.stringify(PostDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json("You are not the author");
      }
    const updateData = { 
      title: req.body.title, 
      description: req.body.description, 
      date: req.body.date,  
      priority: req.body.priority,  
      status:req.body.status,  
    }; 
    await TodoModel.findByIdAndUpdate(id, updateData) 
        .then((todo) => res.json(TodoModel)) 
        .catch((err) => res.json(err)); 
  });
}else {
    res.status(404).json("You are not LoggedIn");
  }
}); 
  
// Delete task from the database 
app.delete("/deleteTodoList/", async (req, res) => { 
  const { token } = req.cookies;
  const id = req.body.id;
  // res.json(id);
  if (token) {
    // iska mtlb mai login hu
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const todolist = await TodoModel.findById(id);
      //   res.json(postdoc);
      await TodoModel.deleteOne();
      res.json("successfull");
    });
    // res.json({id});
  } else {
    res.status(404).json("Please Login");
  }
}); 
  
