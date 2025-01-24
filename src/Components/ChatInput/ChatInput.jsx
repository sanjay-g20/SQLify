import React, { useEffect, useRef , useState } from 'react';
import axios from 'axios';
import './ChatInput.scss'
import { LOCAL_URI } from '../../constants';

const ChatInput = ({onQuerySubmit,onQuerySucess}) => {

  const [query,setValue] = useState("");
  const [answer,setAnswer] = useState("");

  const textAreaRef = useRef(null);

  const adjustHeight = () => {
    const textArea = textAreaRef.current;
    textArea.style.height  = "auto";
    textArea.style.height = Math.min(textArea.scrollHeight,150) + "px"; 
  }

  const getResult = async() => {
    if(query.length === 0) {
      return;
    } else {
      setValue('');
      onQuerySubmit(query);
      await axios.post(`${LOCAL_URI}/api/convert`,{query},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Retrieve token from localStorage
        },
      }).then((res)=>{
        if(res.status === 200) {
          console.log(res.data);
          setAnswer(res.data.sqlQuery);
          onQuerySucess(query,res.data.sqlQuery);
        }
        
      }).catch((err)=>{
        throw err;
      })
    }
  }

  useEffect(() => {
    adjustHeight();
  },[query])

  return (
    <div className='chat-input-main'>
      <div className='input-box-container'>
        <div className='input-box-area'>
          <textarea value={query} onChange={(e) => {setValue(e.target.value)}} ref={textAreaRef} type='text' placeholder='Input here' />
        </div>
        <div className='input-box-btns'>
          <button disabled={!query.length}className='input-box-send' onClick={getResult}>
            <svg width="28" height="25" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-2xl">
              <path fillRule="evenodd" clip-rule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor">
              </path>
            </svg>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ChatInput;
