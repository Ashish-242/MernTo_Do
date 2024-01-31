
import { useContext, useEffect } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";
export default function Header(){

  // but ye ab nhi krenge kyunki ab hum usercontext ka use kr rhe h 
  const {setUserInfo,userInfo}=useContext(UserContext);
  const username=userInfo?.username;
    
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      if(response.ok){
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      }
      
    });
  }, []);

  async function logout() {
    await fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }



    return(

        <header>
        <Link to="/" className="Logo">1% CLUB</Link>
          <nav>
          {username && (
            <>
              
              <button onClick={logout}>Logout</button>
            </>
          )}
          {!username && (
            <>
            <Link to="/login">Login</Link>
            
            </>
          )}

          
          </nav>
        </header>
    );
}
