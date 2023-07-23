import { db } from "@/firebase";
import { closeCommentModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import Modal from "@mui/material/Modal";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CommentModal() {
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const userImage = useSelector((state) => state.user.photoUrl);
  const tweetDetails = useSelector(state => state.modals.commentTweetDetails)
  const user = useSelector(state => state.user)
  
  const dispatch = useDispatch();

  const [comment, setComment] = useState("")

  const router = useRouter()

  async function sendComment() {
    const docRef = doc(db, "posts", tweetDetails.id )
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment
    }
    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails)
    })

    dispatch(closeCommentModal())
    router.push("/" + tweetDetails.id)

  }

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div
          className="bg-white h-full w-full sm:w-[600px] sm:h-[386px] rounded-lg border border-gray-500 text-white 
        sm:p-10 p-4 relative"
        >
            
            <div className="absolute top-4">
                <XIcon className="w-6 cursor-pointer text-black"
                onClick={() => dispatch(closeCommentModal())}
                ></XIcon>
            </div>
            <div className="absolute w-[2px] h-[57px] bg-gray-500 
            left-[40px] top-[96px] sm:left-[64px] sm:top-[124px]
            ">
            </div>
          <div className="mt-8">
            <div className="flex space-x-3">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={tweetDetails.photoUrl}
                alt=""
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="text-black font-bold">{tweetDetails.name}</h1>
                  <h1 className="text-gray-500">@{tweetDetails.username}</h1>
                </div>
                <p className="mt-2 text-black">{tweetDetails.tweet}</p>
                <h1 className="text-gray-500 text-15px">
                  Replying to <span className="text-[#1b9bf0]">@{tweetDetails.username}</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-11 ">
            <div className="flex space-x-3">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={userImage}
                alt=""
              />
              <div className="w-full ">
                <textarea
                  placeholder="Tweet your reply"
                  className="w-full text-lg outline-none bg-transparent resize-none text-black"
                  onChange={e => setComment(e.target.value)}
                ></textarea>

                <div className="flex justify-between">
                  <div className="flex space-x-0">
                    <div className="iconsAnimation">
                      <PhotographIcon className="h-[22px] text-[#1d9bf0]"></PhotographIcon>
                    </div>
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
                  disabled={!comment}
                  onClick={sendComment}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CommentModal;
