import Message from "./Message"
import { useData } from "context/appContext"

const Messages = ({data, filterMsgs}) => {
    const { handleMessageTerm } = useData()
    return (
        <div className="flex flex-col space-y-3 mt-5">
            {data.map(msgs => {
                return filterMsgs(msgs.messages).map(message => (
                    <Message 
                        id={msgs._id}
                        key={message.msgId} 
                        data={message}
                        handleMessageTerm={() => handleMessageTerm({id: msgs._id, msgsLength:msgs.messages.length, email: msgs.emailTujuan, ...message})}/>
                ))
            })}
        </div>
    )
}

export default Messages