import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { onAuthStateChanged } from "firebase/auth";
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from "../utils/userSlice"

const Body = () => {
  const dispatch = useDispatch(); // always use at the top, ignore all things

    const appRouter = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/Browse",
        element: <Browse />,
      },
    ]);


    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName,photoURL}  = user;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL:photoURL,
            })
          );
        } else {
          dispatch(removeUser());
        }
      });
    },[])
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
