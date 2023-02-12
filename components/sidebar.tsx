'use client'
import { signOut, useSession } from "next-auth/react"
import NewChat from "./newchat"
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from './ModelSelection';

const SideBar = () => {
    const { data: session } = useSession();
    const [chats, loading, error] = useCollection(
        session && query(collection(db, "users", session.user?.email!, "chats"),orderBy("createdAt","asc")
    ));


    return (
        <div className="p-2 flex flex-col h-screen ">
            <div className="flex-1">
                {/* New Chat */}
                <NewChat />

                <div className="hidden md:inline">
                    <ModelSelection/>
                </div>

                <div className="flex flex-col space-y-2 my-2">
                    {/* {map through the chat rows} */}
                    {loading&&(
                        <div className="animate-pulse text-center text-white">Loading Chats...</div>
                    )}
                    {chats?.docs.map(chat => {
                        return <ChatRow key={chat.id} id={chat.id} />
                    })}

                </div>
            </div>
            {session && (
                <img onClick={() => signOut()} src={session.user?.image!} className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" alt="Profile Pic" />
            )}
        </div>
    )
}

export default SideBar