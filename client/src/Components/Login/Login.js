import { useContext, useState } from "react";
import "./LoginPage.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const {setUserInfo} =useContext(UserContext);
   async function loginfunction(e) {
    e.preventDefault();
    
    const response = await fetch('http://localhost:4000/login', {
      method: "Post",
      body: JSON.stringify({username, password}),
      headers: { "Content-Type": "application/json" },

      credentials:"include",
    });
    console.log(response);
    if(response.status===200){ 
      
      alert('Login Successfully');
      response.json().then(userInfo =>{
        console.log(userInfo);
        setUserInfo(userInfo);
      setRedirect(true);
     });
      

    }else{
      alert('Login Failed');
    }
  }

  if(redirect){
return <Navigate to={'/'} />
  }
  return (
    <div className="Loginbox">
      <form className="login" onSubmit={loginfunction}>
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        ></input>

        <input
          type="text"
          placeholder="Enter your Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <a href="/register">New User?Register Here</a>
        <button className="btn">Login</button>
      </form>
    </div>
  );
}

