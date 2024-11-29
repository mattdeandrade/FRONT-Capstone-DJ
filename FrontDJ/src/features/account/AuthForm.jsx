import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";

/** AuthForm allows a user to either login or register for an account. */
function AuthForm() {
  const navigate = useNavigate();

  // Handles swapping between login and register
  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin
    ? "Need an account? Register here."
    : "Already have an account? Login here.";

  const [login, { error: loginError }] = useLoginMutation();
  const [register, { error: registerError }] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const attemptAuth = async (evt) => {
    evt.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { username, password, firstName, lastName, email };

    try {
      await authMethod(credentials).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Auth error:", error);
      console.error(error);
       setErrorMessage(error.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <h1>{authAction}</h1>
      <form onSubmit={attemptAuth}>
        <label>
          Username
          <input
            name="username"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </label>{" "}
        <br />
        {!isLogin && (
          <>
            <label>
              Email
              <input
                name="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </label>
            <br />
            <label>
              First Name
              <input
                name="firstName"
                value={firstName}
                onChange={(evt) => setFirstName(evt.target.value)}
              />
            </label>{" "}
            <br />
            <label>
              Last Name
              <input
                name="lastName"
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
              />
            </label>
          </>
        )}
        <button>{authAction}</button>
      </form>
      <a href="#" onClick={() => setIsLogin(!isLogin)}>
        {altCopy}
      </a>
      {isLogin && errorMessage && <p role="alert">{errorMessage}</p>}
    
      {!isLogin && registerError && <p role="alert">{registerError.message}</p>}
    </>
  );
}

export default AuthForm;
