import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './WelcomePage.css'

const WelcomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/posts" />;
    return (
        <div className="wp-c">
        <div className="wp-right">
        <h1>
            Welcome to BingeWorthy!
        </h1>
        <h3>A place to finally help you decide what to BINGE!</h3>
        <p>Log in or Sign up to start binging!</p>

        </div>
        <img src="https://wwwcdn.cincopa.com/_cms/design18/images/streaming-Professional-live_1.png?fts=2018-04-11T10:41:44.3195406Z"></img>

        </div>
    )
}

export default WelcomePage
