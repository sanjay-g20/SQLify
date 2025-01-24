import React, {useState , useRef} from "react";
import MessagesList from "../MessagesList/MessagesList";
import ChatInput from "../ChatInput/ChatInput";

import './Chat.scss';

const Chat = () => {
    const [messages,setMessages] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const queryRef = useRef('');

    const onQuerySubmit = (query) => {
        queryRef.current = query;
        setIsLoadingData(true);        
    }

    const onQuerySucess = (query,answer) => {
        const obj = {
            query,
            answer
        }
        queryRef.current = '';
        setMessages([...messages,obj]);
        setIsLoadingData(false);
    }

    return (
        <div className="chat-wrapper"> 
            {messages.length>0 && <div className="chat-fade"></div>}
            <MessagesList messages={messages} isLoadingData={isLoadingData} query={queryRef.current}/>
            <ChatInput onQuerySubmit={onQuerySubmit} onQuerySucess={onQuerySucess}/>
        </div>
    )
}

export default Chat;