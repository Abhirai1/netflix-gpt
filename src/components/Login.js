import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background-img"
          className="w-full h-full object-cover"  // Tailwind classes for opacity and full cover
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-70">
        <h1 className="font-bold text-xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 m-2 w-full rounded-lg"
          ></input>
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 m-2 w-full rounded-lg"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="p-4 m-2 mt-3 w-full rounded-lg"
        ></input>
        <button className="py-2 mt-5 m-2 bg-red-700 w-full rounded-lg">
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
