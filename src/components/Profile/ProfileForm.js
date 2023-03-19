import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const ChangepasswordInput = useRef();
  const authCxt = useContext(AuthContext);

  const ChangePasswordHandler = (event) => {
    event.preventDefault();
    const passwordValue = ChangepasswordInput.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA8NBmruAkzigSMs1HAVcEqIAt6pEzCNM8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCxt.token,
          password: passwordValue,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      // if (res.status === 200) {
      //   alert("Password changed successfully");
      // }
    });

    console.log(passwordValue);
  };
  return (
    <form className={classes.form} onSubmit={ChangePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={ChangepasswordInput}
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
