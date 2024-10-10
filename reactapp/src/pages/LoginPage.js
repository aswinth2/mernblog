import {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage() {
    const [username,setUsername]= useState('');
    const [ password,setPassword]= useState('');
    const {setUserInfo} = useContext(UserContext);
    let navigate = useNavigate();
    async function Login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/Login',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
              setUserInfo(userInfo);
              navigate("/");
            });
          } else {
            alert('wrong credentials');
          }
         

    }
    return(
        <form className="login" onSubmit={Login}>
            <h1>Login</h1>
            <input type="text"
                placeholder="username"   
                value={username}
                onChange={ev=>setUsername(ev.target.value)}/>


            <input type="password"
                placeholder="password"
                value={password}
                onChange={ev=> setPassword(ev.target.value)}/>
            <button>Login</button>
        </form>
    );
}