import { ChatCompletionRequestMessage } from "openai";
import openai from "./chatGPT";
type messages = {
  role:string,
  content:string,
}
const query = async (prompt: string, chatId: string, model: string,messages:any) => {
  const res = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages:messages,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].message?.content)
    .catch(
      (err) =>
        `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
    );
    return res;
};

export default query;
