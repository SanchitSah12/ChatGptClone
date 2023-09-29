import React from 'react'
import Chat from '../../../components/Chat'
import ChatInput from '../../../components/ChatInput'

type Props = {
  params:{
    id: string
  }
}
const CharPage = ({params:{id}}:Props) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>

      {/* chat window */}
      <Chat chatId= {id}></Chat>
      {/** chat input */}
      <ChatInput chatId = {id}></ChatInput>
    </div>
  )
}

export default CharPage