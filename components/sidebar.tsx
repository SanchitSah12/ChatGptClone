'use client'
import { signOut, useSession } from "next-auth/react"
import NewChat from "./newchat"
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from './Behavior';
import { useState } from "react";

const SideBar = () => {
    const { data: session } = useSession();
    const [dropdown, setDropdown] = useState(true)
    const [chats, loading, error] = useCollection(
        session && query(collection(db, "users", session.user?.email!, "chats"), orderBy("createdAt", "asc")
        ));

    const handleClick = () => {
        setDropdown((prev) => {
            return !prev;
        })
    }
    return (
        <div className="p-2 flex flex-col h-screen ">
            <div className="flex-1">
                {/* New Chat */}
                <NewChat />

                {/* <div className="hidden md:inline">
                    <ModelSelection/>
                </div> */}

                <div className="flex flex-col space-y-2 my-2">
                    {/* {map through the chat rows} */}
                    {loading && (
                        <div className="animate-pulse text-center text-white">Loading Chats...</div>
                    )}
                    {chats?.docs.map(chat => {
                        return <ChatRow key={chat.id} id={chat.id} />
                    })}

                </div>
            </div>
            <div id="dropdownNavbar" className={`z-10 ${dropdown && 'hidden'} font-normal bg-white divide-y dark:hover:bg-gray-600 dark:hover:text-white divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute bottom-16 left-10`}>

                <div className="py-1 ">
                    <button onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-700   dark:text-gray-400 ">Sign out</button>
                </div>
            </div>
            {session && (<div className="cursor-pointer  mb-2 hover:opacity-50 flex space-x-3" onClick={handleClick}>

                <img  src={session.user?.image!} className="h-12 w-12 rounded-full " alt="Profile Pic" />
                <p className="text-white text-base items-center font-bold p-2">{session.user?.name}</p>
            </div>

            )}
        </div>
    )
}

export default SideBar