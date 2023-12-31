import { db, storage } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Tweetinput() {
  const user = useSelector((state) => state.user);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const dispatch = useDispatch()

  async function sendTweet() {

    if (!user.username) {
      dispatch(openLoginModal())
      return
    }

    setLoading(true)
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });
    console.log(text)
    setText("")
    setImage(null)
    setLoading(false)

    if (image) {
      const imageRef = ref(storage, `tweetImages/${docRef.id}`)
      const uploadImage = await uploadString(imageRef, image, "data_url")
      const downloadURL = await getDownloadURL(imageRef)

      await updateDoc(doc(db, "posts", docRef.id), {
        image:downloadURL
      })
    }
  }


  function addImagetoTweet(e) {
    const reader = new FileReader()
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.addEventListener("load", e => {
      setImage(e.target.result)
    })

  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      <img
        src={user.photoUrl || "/assets/2021 Twitter logo - blue.png"}
        className="w-11 h-11 rounded-full object-contain"
        alt=""
      />
      {loading && <h1 className="text-2xl text-gray-500">Uploading Post...</h1>}

      {!loading && (<div className="w-full">
        <textarea
          placeholder="What is happening?!"
          className="bg-transparent resize-none outline-none  min-h-[50px] text-lg"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>

        {
          image && (
            <div className="relative mb-4">
              <div className="absolute top-1 left-1 bg-[#272c26] rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-white hover:bg-opacity-10"
              onClick={() => setImage(null)}
              >
                <XIcon className="h-5 text-white"></XIcon>
              </div>
              <img className="rounded-2xl max-h-80 object-contain" src={image} alt="" />
            </div>
          )
        }

        <div className="flex justify-between border-t border-gray-700 pt-4">
          <div className="flex space-x-0">
            <div className="iconsAnimation">
              <PhotographIcon 
              onClick={() => filePickerRef.current.click()}
              className="h-[22px] text-[#1d9bf0]"></PhotographIcon>
            </div>
            <input className="hidden" type="file" 
            ref={filePickerRef}
            onChange={addImagetoTweet}
            />
            <div className="iconsAnimation">
              <ChartBarIcon className="h-[22px] text-[#1d9bf0]"></ChartBarIcon>
            </div>
            <div className="iconsAnimation">
              <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]"></EmojiHappyIcon>
            </div>
            <div className="iconsAnimation">
              <CalendarIcon className="h-[22px] text-[#1d9bf0]"></CalendarIcon>
            </div>
            <div className="iconsAnimation">
              <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]"></LocationMarkerIcon>
            </div>
          </div>
          <button className="bg-[#1d9bf0] rounded-full px-4 py-1.5 text-white disabled:opacity-50"
          onClick={sendTweet}
          disabled={!text && !image}
          >
            Tweet
          </button>
        </div>
      </div>)}
    </div>
  );
}

export default Tweetinput;
