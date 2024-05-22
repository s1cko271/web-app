import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({setToken}){
    const [isShowed, setIsShowed] = useState(false);
    const [showDialog, setShowDialog] = useState(false)
    const [typeDialog, setTypeDialog] = useState("")
    const userNameRef = useRef(null)
    const passwordRef = useRef(null)
    const goTo = useNavigate()

    const handleLogin = async () => {
        const username = userNameRef.current.value;
        const password = passwordRef.current.value;
        try{
            const res = await axios.post("https://sqvfxf-8080.csb.app/api/admin/login", {
                username,
                password
            });

            const token = res.data.token;
            localStorage.setItem("token", token);
            setToken(token)
            setTypeDialog("success")
            setShowDialog(true)
        } catch(e){
            passwordRef.current.value = "";
            setTypeDialog("fail")
            setShowDialog(true)
            console.error("Login Failed: ", e);
        }
    }

    const goToHome = () => {
        goTo("/");
    }

    return (
        <div className="login-container">
            <h2 className="sign-up-header">Photo Sharing App</h2>
            <div className="input-box-container">
                <span className="input-discription">Username: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="username-input" 
                        placeholder="Enter username"
                        ref={userNameRef}
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Password: </span>
                <div className="input-box">
                    <input 
                        type={isShowed ? "text" : "password"} 
                        className="password-input"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                    <FontAwesomeIcon 
                        icon={isShowed ? faEye : faEyeSlash} 
                        className={isShowed ? "show-pass-icon" : "show-pass-icon hide"}
                        onClick={() => setIsShowed(!isShowed)}
                    />
                </div>
            </div>
            <div className="btn-login" onClick={handleLogin}>
                <button>Login</button>
            </div>
            <span className="navigation-msg">
                Don't have an account? 
                <span className="link-text" onClick={() => goTo('/signup')}> Register</span>
            </span>
        </div>
    )
}