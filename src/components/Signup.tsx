import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Login.css";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("Password , Confirm Password incorrect.");
    }
  };

  return (
    <div className="loginregister">
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={onNameHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onEmailHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <button type="submit" className="loginregister__button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
