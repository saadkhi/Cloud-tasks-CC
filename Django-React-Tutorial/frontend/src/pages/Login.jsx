import Form from "../components/Form"
import "../styles/Auth.css"

function Login() {
    return <div className="page-container"><Form route="/api/token/" method="login" /></div>;
}

export default Login