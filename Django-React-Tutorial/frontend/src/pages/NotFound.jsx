import { useNavigate } from "react-router-dom"
import "../styles/NotFound.css"

function NotFound() {
    const navigate = useNavigate()
    
    return (
        <div className="page-container">
            <div className="not-found-container">
                <div className="not-found-emoji">🔍</div>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for does not exist.</p>
                <button className="not-found-button" onClick={() => navigate('/')}>
                    Go Back Home
                </button>
            </div>
        </div>
    );
}

export default NotFound;