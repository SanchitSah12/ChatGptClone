// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, getDoc, getDocs, orderBy, query as queryFirebase } from 'firebase/firestore';
import { db } from "../../firebase";

type Data = {
    answer: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { prompt, chatId, model, session } = req.body;

    if (!chatId) {
        res.status(400).json({ answer: "please provide a valid chat ID" });
    }
    //get collection from firebase
    //   const [messages] = useCollection(collection(db,'users',session?.user?.email!,"chats",id,"messages"))
    const collectionRef = collection(db, "users", session?.user?.email!, "chats", chatId, "messages")
    const orderedCollection = queryFirebase(collectionRef, orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(
        orderedCollection
    );
    let messages: { role: string; content: any; }[] = []
    // const docRef = doc(db, "users", session?.user?.email!,"chats",chatId);
    model&&messages.push({
        "role":"system",
        "content":model
    })
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        
        let name = doc.data().user.name;
        let role = name == 'ChatGPT'?"assistant":"user";

        messages.push({
            "role":role,
            "content":doc.data().text
        })
    });
    // Query
    const response = await query(prompt, chatId, model,messages);
    const message: Message = {
        text: response || "ChatGPT was unable to find an answer for that",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "/ChatGPT-Icon-Logo-PNG.png",
        },
    };

    await adminDb
        .collection("users")
        .doc(session?.user?.email!)
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add(message);

    res.status(200).json({ answer: message.text });
}
