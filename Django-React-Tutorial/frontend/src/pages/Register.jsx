import Form from "../components/Form"
import "../styles/Auth.css"

function Register() {
    return <div className="page-container"><Form route="/api/user/register/" method="register" /></div>;
}

export default Register;