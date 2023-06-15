import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const WelcomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/posts" />;
    return (
        <div>
            welcome
        </div>
    )
}

export default WelcomePage
