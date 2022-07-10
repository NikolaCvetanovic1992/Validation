import { useState, useRef, useContext } from "react";
import axios from "axios";
import classes from "./AuthForm.module.css";

import AuthContext from "../store/auth-context";

const AuthForm = () => {
  const emailInputRef: any = useRef();
  const passwordInputRef: any = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    console.log(authCtx);

    setIsLogin((prevState) => !prevState);
  };

  //const enteredEmail: any = emailInputRef.current.value;
  //const enteredPassword = passwordInputRef.current.value;

  const submitHandler = (e: any) => {
    e.preventDefault();
    const enteredEmail: any = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    let url: string;

    if (isLogin) {
      console.log("first singup");

      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkgpZQAGo7giYXJf1bmbViDWuLBnvbDvc";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkgpZQAGo7giYXJf1bmbViDWuLBnvbDvc";
    }
    axios
      .post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      })
      .then(function (response) {
        authCtx.login(response.data.idToken);
        console.log(response.data.idToken);
        setIsLoading(false);
      })
      .catch(function (error) {
        let errorMessage: string = "Auth Failed";

        if (error.response.data.error.errors[0]) {
          errorMessage = error.response.data.error.errors[0].message;
        }
        alert(errorMessage);
        setIsLoading(false);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
