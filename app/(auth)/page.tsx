"use client"
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
        <div className="overflow-y-auto">
        </div>
        <ChatSender/>
      </div>
  )
}
