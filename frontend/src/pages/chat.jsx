import { useState, useRef, useEffect } from 'react'
import './chat.css'
import './contacts.css'
import profilePic from '../assets/blank-profile-picture-dark.jpg'
import addContactIcon from '../assets/add-contact.svg'
import chatAppLogo from '../assets/chat-app-logo.svg'
import settingIcon from '../assets/settings.svg'

import { useAuthStore } from '../store/useAuthStore.js'
import { useChatStore } from '../store/useChatStore.js'
import ChatArea from '../components/chatArea.jsx'
import { Link, useNavigate } from 'react-router-dom'

import Logout from './logout.jsx'



const contacts = [
   {
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
   },
   {
      name: 'Jane Smith',
      lastMessage: 'Let\'s catch up later.',
      time: '9:15 AM',
   },
   {
      name: 'Alice Johnson',
      lastMessage: 'Can you send me the report?',
      time: 'Yesterday',
   },
   {
      name: 'Bob Brown',
      lastMessage: 'Happy Birthday!',
      time: '2 days ago',
   },
   {
      name: 'Charlie Green',
      lastMessage: 'Are we still on for the meeting?',
      time: '3 days ago',
   },
   {
      name: 'David White',
      lastMessage: 'I\'ll call you later.',
      time: '4 days ago',
   },
   {
      name: 'Eve Black',
      lastMessage: 'Thanks for your help!',
      time: '5 days ago',
   },
   {
      name: 'Frank Blue',
      lastMessage: 'See you at the party!',
      time: '6 days ago',
   },
   {
      name: 'Grace Yellow',
      lastMessage: 'Let\'s grab lunch sometime.',
      time: '7 days ago',
   },
   {
      name: 'Hank Red',
      lastMessage: 'I have a question about the project.',
      time: '8 days ago',
   },
   {
      name: 'Ivy Purple',
      lastMessage: 'Can you review my code?',
      time: '9 days ago',
   },
   {
      name: 'Jack Orange',
      lastMessage: 'Looking forward to the weekend!',
      time: '10 days ago',
   },
   {
      name: 'Kathy Pink',
      lastMessage: 'Let\'s schedule a meeting.',
      time: '11 days ago',
   },
   {
      name: 'Leo Gray',
      lastMessage: 'I need your feedback.',
      time: '12 days ago',
   },
   {
      name: 'Mia Cyan',
      lastMessage: 'Can we reschedule our call?',
      time: '13 days ago',
   },
   {
      name: 'Nina Magenta',
      lastMessage: 'Great job on the presentation!',
      time: '14 days ago',
   }

]

function HorizontalToolbar({ appIcon }) {
   return (
      <>
         <div className='horizontal-tool-bar'>
            <img src={appIcon} alt="App Icon" className="chat-app-icon" />
            <div>ChatApp</div>
         </div>
      </>
   )
}
function VerticalToolbar({ logoutHandler }) {
   return (
      <>
         <div className='vertical-tool-bar'>
            <img src={profilePic} alt="visit profile" className="visit-profile-icon" />
            <img src={settingIcon} alt="settings" className="settings-icon" />

            <button className='logout-button' onClick={logoutHandler}>
            </button>
         </div>
      </>
   )
}

function AddContactMenu() {
   const [addContactMenuOpen, setAddContactMenuOpen] = useState(false)


   const { addUser } = useChatStore()
   const { authUser } = useAuthStore()

   const formRef = useRef(null)
   const buttonRef = useRef(null)
   useEffect(() => {


      function handleClickOutside(event) {
         if (
            formRef.current &&
            !formRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
         ) {
            setAddContactMenuOpen(false);
         }
      }

      if (addContactMenuOpen) {
         document.addEventListener("mousedown", handleClickOutside);
      } else {
         document.removeEventListener("mousedown", handleClickOutside);
      }

      // Clean up on unmount
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [addContactMenuOpen]);
   const handleAddContact = () => {
      const userToAdd = document.getElementsByClassName('add-contact-input')[0].value
      addUser(userToAdd)
   }


   return (
      <>
         <button className='new-chat-button' onClick={() => {
            setAddContactMenuOpen(!addContactMenuOpen)
         }}
            ref={buttonRef}
         >
            <img src={addContactIcon} alt="Add Contact" className="add-contact-icon" />
         </button>
         {addContactMenuOpen && (<div className='add-contact-menu' ref={formRef}>
            <input type="text" placeholder="add a contact" className="add-contact-input"
            />
            <input type="button" value="Add" className="add-contact-button" onClick={handleAddContact} />
         </div>)}
      </>
   )
}

function ContactElements() {
   const { users, isUsersLoading, selectedUser, setSelectedUser, getUsers } = useChatStore()
   const [contactElements, setContactElements] = useState([])

   useEffect(() => {
      getUsers()
   }, [])

   useEffect(() => {
      setContactElements(
         users.map((contact) => {
            const isSelected = selectedUser?._id === contact._id
            return (<div className={`contact ${isSelected ? 'selectedContact' : ''}`} key={contact._id} onClick={() => { setSelectedUser(contact) }}>
               <img src={profilePic} alt="Profile" className="profile-pic" />
               <p className="contact-name">{contact.name}</p>
            </div>)
         })
      )
   }, [users, selectedUser])

   return (
      <>
         {contactElements}
      </>
   )
}

function Chat() {
   const { logout, authUser } = useAuthStore()
   const navigate = useNavigate()
   const logoutHandler = async () => {
      await logout()
      navigate('/logout')
   }



   return (
      <>
         <div className="home-page">
            <HorizontalToolbar appIcon={chatAppLogo} />
            <VerticalToolbar logoutHandler={logoutHandler} />
            <div className="chat-page">
               <div className='left-side'>
                  <div className='contacts-header'>
                     <h2>Chats</h2>
                     <AddContactMenu />
                  </div>
                  <div className="contact-list">
                     <ContactElements />
                  </div>
               </div>
               <div className='right-side'>
                  <ChatArea />
               </div>
            </div>
         </div>
      </>
   )
}
export default Chat