import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeSignUpModal, openSignUpModal } from "@/redux/modalSlice";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

function SignUpModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [password, setPassword] = useState("");

  const router = useRouter()

  async function handleSignup() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/profilePictures/pfp${Math.ceil(Math.random() * 6)}.png`
   
    })

    router.reload()
  }

  async function handleGuestSignin(){
    await signInWithEmailAndPassword(auth, "guest123@gmail.com", "123123")
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      console.log(currentUser);
      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
      // handle redux actions
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <button
        className="bg-white border border-white text-black w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
        onClick={() => dispatch(openSignUpModal())}
      >
        Sign Up
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-[600px] bg-white md:w-[560px] md:h-[600px] rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <button className="bg-blue-500 text-black w-full font-bold text-lg p-2 rounded-md"
            onClick={handleGuestSignin}
            >
              Sign In as Guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <h1 className="mt-4 font-bold text-4xl">Create your Account</h1>
            <input
              placeholder="Full Name"
              className="h-10 mt-8 rounded-md border border-gray-700 p-6"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              className="h-10 mt-8 rounded-md border border-gray-700 p-6"
              type="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="h-10 mt-8 rounded-md border border-gray-700 p-6"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-black text-white w-full font-bold text-lg p-2 mt-8 rounded-md"
              onClick={handleSignup}
            >
              Create Account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SignUpModal;
