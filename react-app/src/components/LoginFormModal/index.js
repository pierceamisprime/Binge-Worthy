import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    history.push('/posts')
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demoUser = (e) => {
    e.preventDefault()
    return dispatch(login("demo@aa.io", "password")).then(() => closeModal())
  }



  return (
    <div className="login-modal">
      <i onClick={() => closeModal()} class="fa-solid fa-xmark fa-lg"></i>
      <form className="login-modal-container" onSubmit={handleSubmit}>
      <h1 className="login-title">Log In</h1>
        <ul className="error-login">
          {errors.map((error, idx) => (
            <li className="login-errors" key={idx} style={{ color: 'red '}}>{error}</li>
          ))}
        </ul>
        <label>
          <input
          placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </label>
        <label>

          <input
          placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </label>
        <div className="login-btn-container">

        <button className="login-btn" type="submit">Log In</button>
        </div>
        <div className="demo-btn-container">
        <button onClick={demoUser} className="login-btn">Demo User</button>

        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
