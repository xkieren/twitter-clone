import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import CommentModal from "@/components/modals/CommentModal";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Noto_Sans_Tamil_Supplement } from "@next/font/google";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const formattedData = {
    username: data.username,
    namer: data.name,
    photoUrl: data.photoUrl,
    comments: data.comments || null,
    timestamp: JSON.stringify(data.timestamp.toDate()),
    image: data.image || null,
    text:data.tweet
  };

  return {
    props: {
      tweetData: formattedData,
    },
  };
}

function CommentsPage({ tweetData }) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <div className="max-w-[1400px] mx-auto flex">
        <Sidebar></Sidebar>
        <div className="sm:ml-16 xl:ml-80 max-w-2xl flex-grow border-gray-700 border-x">
          <div className="flex space-x-2 px-3 py-2 text-lg sm:text-xl font-bold border-b border-gray-700 sticky top-0 z-50">
            <Link href={"/"}>
              <ArrowLeftIcon className="w-7 cursor-pointer"></ArrowLeftIcon>
            </Link>
            <h1>Tweet</h1>
          </div>
          <div className="border-b border-gray-700">
            <div className="flex space-x-3 p-3 border-gray-700">
              <img
                src={tweetData.photoUrl}
                className="h-11 w-11 rounded-full object-cover"
                alt=""
              />

              <div>
                <div className="text-gray-500 flex items-center space-x-2 mb-1">
                  <h1 className="text-black font-bold">{tweetData.name}</h1>
                  <span>@{tweetData.username}</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
                </div>
                <span className="text-2xl">{tweetData.text}</span>

                {tweetData.image && <img className="object-cover rounded-l mt-3 max-h-80 border border-gray-700" src={tweetData.image}></img>}
              </div>
            </div>
          </div>
          <div className="flex justify-between p-2 border-b border-gray-700 items-center">
            <div className="flex justify-center items-center p-1 space-x-2 ">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={user.photoUrl}
                alt=""
              />
              <h1 className="text-2xl text-gray-500">Tweet your reply</h1>
            </div>
            <button
              className="bg-[#1d9bf0] rounded-full px-4 py-1.5 text-white disabled:opacity-50"
              disabled={true}
            >
              Tweet
            </button>
          </div>

          {tweetData.comments?.map((comment) => (
            <div className="border-b border-gray-700">
              <div className="flex space-x-3 p-3 border-gray-700">
                <img
                  src={comment.photoUrl}
                  className="h-11 w-11 rounded-full object-cover"
                  alt=""
                />

                <div>
                  <div className="text-gray-500 flex items-center space-x-2 mb-1">
                    <h1 className="text-black font-bold">{comment.name}</h1>
                    <span>@{comment.username}</span>
                  </div>
                  <span className="">{comment.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Trending></Trending>
      </div>
      <CommentModal></CommentModal>
    </div>
  );
}

export default CommentsPage;
