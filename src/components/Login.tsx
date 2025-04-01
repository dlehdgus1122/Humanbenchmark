import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Login.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithRedirect } = useAuth0();

  const onEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginWithRedirect();
    // Handle form submission logic here
  };

  return (
    <div className="loginregister">
      {/* <form onSubmit={onSubmit}>
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
        <div> */}
      <LoginButton />
      {/* <button
            onClick={() => loginWithRedirect()}
            type="submit"
            className="loginregister__button"
          >
            Log in
          </button> */}
      {/* </div>
      </form> */}
    </div>
  );
};

export default LoginPage;
