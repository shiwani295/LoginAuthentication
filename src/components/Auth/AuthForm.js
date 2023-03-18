import { useRef, useState } from "react";
import UserProfile from "../Profile/UserProfile";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoding] = useState(false);
  //const [isError, setIsError] = useState("");

  const InpurEmailRef = useRef("");
  const InputPasswordRef = useRef("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const FormSubmitHandler = (event) => {
    event.preventDefault();
    const enternedEmail = InpurEmailRef.current.value;
    const enternedPassword = InputPasswordRef.current.value;

    //add validation
    // if (enternedEmail === "" && enternedPassword === "") {
    //   setIsError("Please enter email and password");
    // } else {
    //   setIsError("");
    // }

    setIsLoding(true);
    if (isLogin) {
      //...
    } else {
      // setTimeout(() => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8NBmruAkzigSMs1HAVcEqIAt6pEzCNM8",
        {
          method: "POST",
          body: JSON.stringify({
            email: enternedEmail,
            password: enternedPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setIsLoding(false);
        if (res.ok) {
          // setIsLoding("Sending Request..");
          // setTimeout(() => {
          //   setIsLoding("Sending Succesfull...");
          // }, 2000);
          // setTimeout(() => {
          //   setIsLoding("");
          //   InpurEmailRef.current.value = "";
          //   InputPasswordRef.current.value = "";
          // }, 3000);
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      });
      //}, 2000);
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={FormSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={InpurEmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={InputPasswordRef} />
        </div>
        {/* <div>
          <p className={classes.loadingMess}>{isLoading}</p>
        </div> */}
        {/* <span className={classes.Formerror}>
          <em>{isError}</em>
        </span> */}

        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p className={classes.loadingMess}>Sending Request</p>}
          <button
            type="button"
            onClick={switchAuthModeHandler}
            className={classes.toggle}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
//emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
