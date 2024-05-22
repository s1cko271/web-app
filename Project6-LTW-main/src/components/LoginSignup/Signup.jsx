import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp(){
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const [isRepasswordShowed, setIsRepasswordShowed] = useState(false);
    const goTo = useNavigate();
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameref = useRef(null);
    const occupationRef = useRef(null);
    const discriptionRef = useRef(null);
    const locationRef = useRef(null);
    const repasswordRef = useRef(null);

    const handleRegister = async () => {
        if (!userNameRef.current.value 
            || !passwordRef.current.value 
            || !firstNameRef.current.value 
            || !lastNameref.current.value) {
            alert("Please fill in all input boxes!");
            return;
        }
        if (passwordRef.current.value !== repasswordRef.current.value) {
            alert("Passwords do not match! Please try again.");
            return;
        }
        const body = {
            user_name: userNameRef.current.value,
            password: passwordRef.current.value,
            first_name: firstNameRef.current.value,
            last_name: lastNameref.current.value,
            occupation: occupationRef.current.value,
            location: locationRef.current.value,
            description: discriptionRef.current.value
        };
        try {
            const res = await axios.post(
                "https://sqvfxf-8080.csb.app/api/admin/register",
                body
            );
            alert("Account created successfully!");
            goTo("/login");
        } catch (e) {
            alert(e.response.data.message);
            console.error("Failed to create account!", e);
        }
    };

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
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription first-name">First Name: </span>
                <div className="input-box name">
                    <input 
                        type="text" 
                        className="firstname-input" 
                        placeholder="Enter first name"
                        ref={firstNameRef}
                        required
                    />
                
                </div>
                <span className="input-discription name">Last Name: </span>
                <div className="input-box name">
                    <input 
                        type="text" 
                        className="lastname-input" 
                        placeholder="Enter last name"
                        ref={lastNameref}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Occupation: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="occupation-input" 
                        placeholder="Enter occupation"
                        ref={occupationRef}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Location: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="location-input" 
                        placeholder="Enter location"
                        ref={locationRef}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Description: </span>
                <div className="input-box">
                    <textarea 
                        name="description" 
                        id="description" 
                        placeholder="Enter description"
                        cols={15}
                        rows={5}
                        ref={discriptionRef}
                        required
                    >
                    </textarea>
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Password: </span>
                <div className="input-box">
                    <input 
                        type={isPasswordShowed ? "text" : "password"} 
                        className="password-input"
                        placeholder="Password"
                        ref={passwordRef}
                        required
                    />
                    <FontAwesomeIcon 
                        icon={isPasswordShowed ? faEye : faEyeSlash} 
                        className="show-pass-icon"
                        onClick={() => setIsPasswordShowed(!isPasswordShowed)}
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Confirm Password: </span>
                <div className="input-box">
                    <input 
                        type={isRepasswordShowed ? "text" : "password"} 
                        className="password-input"
                        placeholder="Confirm Password"
                        ref={repasswordRef}
                        required
                    />
                    <FontAwesomeIcon 
                        icon={isRepasswordShowed ? faEye : faEyeSlash} 
                        className="show-pass-icon"
                        onClick={() => setIsRepasswordShowed(!isRepasswordShowed)}
                    />
                </div>
            </div>
            <div className="btn-login">
                <button onClick={handleRegister}>Register</button>
            </div>
            <span className="navigation-msg">
                Have an account? 
                <span className="link-text" onClick={() => goTo('/login')}> Log in</span>
            </span>
        </div>
    )
}
