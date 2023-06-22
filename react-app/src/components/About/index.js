import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import "./about.css"

const AboutMe = () => {
    const user = useSelector(state => state.session.user);


    if (!user) return <Redirect to='/login'></Redirect>



    return (
        <>
        <div className="about-house">
            <div className="my-info">
            <div className="about-img-container">
                <img className="about-img"
                src="https://i.imgur.com/Uq6KjnH.jpg" alt="Pierce"></img>
            </div>
                <div className="bio">
                    <div className="name">Pierce Henriksbo</div>
                    <a href="https://github.com/pierceamisprime" target="_blank"><i className="fa-brands fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/pierce-henriksbo" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                </div>
            </div>

        </div>

        <div className="footer">


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python"/>


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="flask"/>


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="react"/>


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="redux"/>


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="postgresql"/>



        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" alt="sqlalchemy"/>


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript"/>



        </div>
        </>
    )
}

export default AboutMe
