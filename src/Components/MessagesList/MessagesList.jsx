import React, {useEffect, useRef} from 'react';
import './MessagesList.scss'
import Loader from '../Loader/Loader';
import { CircularProgress } from '@mui/material';


function MessagesList({ messages , isLoadingData, query }) {
    const currQuery = useRef(null);
    const lastMessageRef =  useRef(null);
    const display = messages.length === 0 && query.length === 0 ? 'none' : '';

    useEffect(()=>{
        // const elm = currQuery.current;
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
            
          }
        // if (elm) {
        //     elm.scrollIntoView({ behavior: 'smooth' });
        // }
    }, [messages, isLoadingData]);

    const ResponseDisplay = ({ response }) => {
        //const cleanResponse = response === '' ? response : response.replace(/\n/g, "");
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: response,
            }}
          />
        );
      };

    return (
        <>
            <ul className='messages-container' style={{display : `${display}` , animation : 'all 1s ease-in-out'}}>
                {messages.map((message) => {
                    const uuid = crypto.randomUUID();
                    return (
                        <li className='message-pair' key={uuid}>
                            <div className='message-query'>
                                {message.query}
                            </div>
                            <br/>
                            <div className='message-ans'>
                                <ResponseDisplay response={message.answer} />
                            </div>
                        </li>
                )})}
                {
                    isLoadingData && 
                        <li key={1} className='message-pair' style={{display : `${display}`}}>
                            <div className='message-query'>
                                {query}
                            </div>
                            <br/>
                            <div className='message-ans'>
                                <CircularProgress size={24} color="inherit" />
                            </div>
                        </li>
                }
            </ul>
            <div ref={currQuery} ></div>
        </>
    );
}

export default MessagesList;