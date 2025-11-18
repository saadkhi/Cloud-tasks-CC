import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Auth.css"

function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password})
            // method prop is passed as 'login' or 'register'
            if (method === 'login') {
                // on successful login store tokens and navigate to home
                if (res?.data?.access) localStorage.setItem(ACCESS_TOKEN, res.data.access);
                if (res?.data?.refresh) localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                // after registration go to login page
                navigate('/login');
            }
        }
        catch (error) {
            alert(error)
        } finally {
            setLoading(false);
        }

    }

    return <form onSubmit={handleSubmit} className="auth-container">
        <h1>{name}</h1>
        <div className="auth-form">
            <div className="auth-form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div className="auth-form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button className="auth-button" type="submit" disabled={loading}>
                {loading ? "Loading..." : name}
            </button>
        </div>
        <div className="auth-link">
            {method === "login" ? (
                <>Don't have an account? <a href="/register">Register here</a></>
            ) : (
                <>Already have an account? <a href="/login">Login here</a></>
            )}
        </div>
    </form>
}

export default Form;