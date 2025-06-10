import './chatArea.css';
import chatIcon from '../assets/chat-icon.svg'


import userProfilePic from '../assets/blank-profile-picture-dark.jpg';

import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'

import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore.js';

const messages1 = [
   {
      sender: 'John Doe',
      text: 'Hey, how are you?',
      time: '10:30 AM',
   },
   {
      sender: 'You',
      text: 'I\'m good, thanks! How about you?',
      time: '10:31 AM',
   },
   {
      sender: 'John Doe',
      text: 'Doing well, just busy with work.',
      time: '10:32 AM',
   },
   {
      sender: 'You',
      text: 'Same here! Let\'s catch up soon.',
      time: '10:33 AM',
   },
   {
      sender: 'John Doe',
      text: 'Definitely! How about this weekend?',
      time: '10:34 AM',
   },
   {
      sender: 'You',
      text: 'Sounds good! Let\'s plan for Saturday.',
      time: '10:35 AM',
   },
   {
      sender: 'John Doe',
      text: 'Great! I\'ll text you the details.',
      time: '10:36 AM',
   },
   {
      sender: 'You',
      text: 'Looking forward to it!',
      time: '10:37 AM',
   },
   {
      sender: 'John Doe',
      text: 'Me too! Take care.',
      time: '10:38 AM',
   },
   {
      sender: 'You',
      text: 'You too! Bye!',
      time: '10:39 AM',
   },
   {
      sender: 'John Doe',
      text: 'Bye!',
      time: '10:40 AM',
   },
   {
      sender: 'You',
      text: 'See you later!',
      time: '10:41 AM',
   },
   {
      sender: 'John Doe',
      text: 'Sure! Bye for now.',
      time: '10:42 AM',
   },
   {
      sender: 'You',
      text: 'Bye!',
      time: '10:43 AM',
   },
   {
      sender: 'John Doe',
      text: 'Take care!',
      time: '10:44 AM',
   },
   {
      sender: 'You',
      text: 'You too! Bye!',
      time: '10:45 AM',
   },
   {
      sender: 'You',
      text: 'aknrlkanflknatl nlant labngnb3nlnrln lnl3ntl3nt lnl3nlanlantlkna ltnla3ntrl3tn5h4ltnlfaljaljt jljljlkj;agfnalg',
      time: '00:23 AM',
   }
]
export default function ChatArea({ }) {
   const messageEndRef = useRef()
   const [isUserSelected, setIsUserSelected] = useState(false)
   const { authUser } = useAuthStore()
   const { selectedUser, messages, isMessagesLoading, getMessages, sendMessage, subscribeToMessages, unsubscribeToMessages } = useChatStore()
   useLayoutEffect(() => {
      if (messageEndRef.current) {
         messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [messages])
   useEffect(() => {
      if (selectedUser) {
         setIsUserSelected(true)
      } else {
         setIsUserSelected(false)
      }
   }, [selectedUser])

   useEffect(() => {
      if (selectedUser) {
         getMessages(selectedUser._id);
         subscribeToMessages()
      }

      return () => unsubscribeToMessages()
   }, [selectedUser, subscribeToMessages, unsubscribeToMessages])




   const [message, setMessage] = useState('');

   const handleMessageInputChange = (e) => {
      setMessage(e.target.value);
   };

   const handleMessageSubmit = async (e) => {
      e.preventDefault();
      if (!message.trim()) return;
      try {
         await sendMessage({
            text: message.trim()
         })

         setMessage('')

      } catch (err) {
         console.log("failed to send message")
      }
   };
   return (
      <>{selectedUser ? (<div className="chat-area">
         <div className="chat-header">
            {/* <h2>{selectedContact.name}</h2> */}
            <img src={userProfilePic} alt="Profile" className="chat-user-profile-pic" />
            <h2 className="chat-user-name">{selectedUser.name}</h2>
         </div>
         <div className="chat-messages" >
            {/* Messages will be displayed here */}
            {messages && messages.map((message, index) => {
               const senderId = message.senderId
               const isMine = senderId === authUser._id;

               return (
                  <div key={index} className={isMine ? "sent-message" : "received-message"}>
                     <div className="message-text">{message.text}</div>
                     {false && <div className="message-time">{message.createdAt}</div>}
                  </div>
               );
            })}
            <div ref={messageEndRef} />
         </div>
         <form className="chat-input" onSubmit={handleMessageSubmit}>
            <input type="text" placeholder="Type a message..." value={message}
               onChange={handleMessageInputChange} />
            <button type="submit" disabled={!message.trim()}>Send</button>
         </form>
      </div>) :
         <div className='blank-chat-area'>
            <img src={chatIcon} className='blank-chat-area-icon' />
            <h3>Select a contact to start messaging. Send and receive messages without keeping your phone online. Use any number of accounts at once. Made with React, CSS, NodeJs, MongoDB. Realtime message functionality using Socket io</h3>
         </div>}</>
   );
}