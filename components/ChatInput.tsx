"use client"
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { FormEvent } from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Toaster,toast } from 'react-hot-toast';
import ModelSelection from './ModelSelection';
import useSwr from 'swr';
type Props = {
    chatId: string;
}
const ChatInput = ({ chatId }: Props) => {
    const { data: session } = useSession();

    const [prompt, setPrompt] = useState("");

    //useSwr to get model
    const {data:model} = useSwr('model',{
        fallbackData:'text-davinci-003'
    })

    const sendMsg = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt) return;

        const input = prompt.trim();
        setPrompt("");
        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), message);

        //Toast Notification
        const notification = toast.loading("ChatGpt is Thinking...")

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(()=>{
            toast.success("ChatGPT has responded!",{
                id:notification,
            })
            //toast notification to say loading
        })
    }
    return (
        <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
            <form onSubmit={sendMsg} className='p-5 space-x-5 flex'>
                <input type="text"
                    className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
                    placeholder='Type Your Prompt Here...'
                    disabled={!session}
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                />

                <button type="submit"
                    disabled={!prompt || !session}
                    className='bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed'>
                    <PaperAirplaneIcon className='h-5 w-5 -rotate-45' />
                </button>
            </form>

            {/* Model Selection */}
            <div className='md:hidden'>
                <ModelSelection></ModelSelection>
            </div>
        </div>
    )
}

export default ChatInput