import ListButton from "@/components/uiElements/buttons/ListButton";
import {FaUser} from 'react-icons/fa'

export default function ChatSidebar(){
    return(
        <div className="h-full w-full dark:bg-dark bg-light border-r-2 border-black/20">
            <ListButton selected={true}>
                <FaUser/>
                <p>Edit Profile</p>
            </ListButton>
        </div>
    )
}