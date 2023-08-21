"use client"
import Chat from "@/components/chat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSender from "@/components/chat/ChatSender"
import useCustomParams from "@/hooks/navigationHooks/useCustomParams";

export default function Home() {
  const {selectedChat,selectedGroup,selectedUser} = useCustomParams();
  return (
      <div 
        className='
          h-full w-full bg-light-surfce dark:bg-dark-surface
          grid grid-rows-[max-content,1fr,max-content]
        '
      >
        <ChatHeader 
          chatId={selectedChat}
          groupId={selectedGroup}
          userId={selectedUser}
        />
        <Chat chatId={selectedChat}/>
        <ChatSender 
          chatId={selectedChat}
          anotherUserId={selectedUser}
          groupId={selectedGroup}
        />
      </div>
  )
}
