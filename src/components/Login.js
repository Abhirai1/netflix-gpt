import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { set } from "firebase/database";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name=useRef(null);
  const email=useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClicked = () => {
    // validate the data
    const message = checkValidData(email.current.value, password.current.value);
    setErrMessage(message);
    if(message) return;

    // sign/signup logic
    if(!isSignInForm){
      // matlab signup wala logic ynha
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://images.nightcafe.studio/jobs/RKTGe0iwA0EMK2scfUyH/RKTGe0iwA0EMK2scfUyH--1--wq0v7_4x.jpg?tr=w-1600,c-at_max",
          })
            .then(() => {
              // Profile updated!
               const { uid, email, displayName, photoURL } = auth.currentUser;
               dispatch(
                 addUser({
                   uid: uid,
                   email: email,
                   displayName: displayName,
                   photoURL: photoURL,
                 })
               );
              navigate("/browse");
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }else{
      // sign in wala logic ynha
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
           navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorMessage + " " + errorMessage);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background-img"
          className="w-full h-full object-cover" // Tailwind classes for opacity and full cover
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-70"
      >
        <h1 className="font-bold text-xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 m-2 w-full rounded-lg  text-black"
          ></input>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 m-2 w-full rounded-lg  text-black"
        ></input>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 m-2 mt-3 w-full rounded-lg text-black"
        ></input>
        <p className="text-red-500 mx-2 font-bold text-lg py-2">{errMessage}</p>
        <button
          className="py-2 mt-5 m-2 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClicked}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Aready a user? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
