import { useNavigate } from "react-router-dom"
import './Home.css'

export default function Home(){
    const goTo = useNavigate()
    const token = localStorage.getItem("token");

    return(
        <div className="home-content">
            <h1 className="home-h1">Welcome to Photo Sharing App</h1>
            <h2 className="home-h2">This is home page</h2>
            {!token && <span 
                className="link-text" 
                onClick={() => goTo("/login")}
            >
                Log in
            </span>}
        </div>
    )
}