import { useNavigate } from "react-router-dom"

export default function NotFound (){
    const goToHome = useNavigate()
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <h2 className="link-text" style={{textAlign: "center"}} onClick={() => goToHome('/')}>HOME</h2>
        </div>
    )
}