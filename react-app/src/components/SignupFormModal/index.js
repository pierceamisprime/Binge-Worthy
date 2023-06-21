import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstname, lastname, username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-modal-container">
			 <i onClick={() => closeModal()} class="fa-solid fa-xmark fa-lg"></i>
			<form className="signup-modal" onSubmit={handleSubmit}>
			<h1>Sign Up</h1>
				<ul className="error-login">
					{errors.map((error, idx) => (
						<li className="login-errors" key={idx} style={{ color: 'red '}}>{error}</li>
					))}
				</ul>
				<label>
					<input
					placeholder="First Name"
					type="text"
					value={firstname}
					onChange={(e) => setFirstname(e.target.value)}
					required
					/>
				</label>
				<label>
					<input
					placeholder="Last Name"
					type="text"
					value={lastname}
					onChange={(e) => setLastname(e.target.value)}
					required
					/>
				</label>
				<label>

					<input
					placeholder="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>

					<input
					placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>

					<input
					placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>

					<input
					placeholder="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<div className="signup-btn-container">
				<button className="signup-btn" type="submit">Sign Up</button>

				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
