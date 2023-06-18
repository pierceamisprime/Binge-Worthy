import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './WelcomePage.css'

const WelcomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/posts" />;
    return (
        <h1>
            Welcome to BingeWorthy!
        </h1>
    )
}

export default WelcomePage
