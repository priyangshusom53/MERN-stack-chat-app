'use client';


// redux states
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import { useEffect, createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const ClientContext = createContext(null)
export const useClientContext = () => {
   const contextValue = useContext(ClientContext)
   return contextValue
}

export const ClientContextProvider = ({ children, authUser }) => {

   const [socket, setSocket] = useState(null)
   const [socketStatus, setSocketStatus] = useState('not connected')
   useEffect(() => {
      const socket = io('http://localhost:8000', {
         withCredentials: true,
         auth: { email: authUser }
      })
      console.log('authUser state: ', authUser)
      setSocket(socket)
      socket.on("connect", () => {
         console.log('Connected to Socket.io server with id: ', socket.id)
      });
      setSocketStatus('connected')
   }, [])

   const contextValue = {
      socket: socket,
      socketStatus: socketStatus
   }
   return (
      <Provider store={store}>
         <SetReduxStates states={{ authUser: authUser }} />
         <ClientContext.Provider value={contextValue}>
            {children}
         </ClientContext.Provider>
      </Provider>
   )
}


// redux states 
import { useDispatch } from "react-redux";
import { setAuthUser } from "./authUserSlice/authUserSlice.js";
const SetReduxStates = ({ states }) => {
   const dispatch = useDispatch()
   // wrapped in useEffect to avoid error during hydration
   useEffect(() => {
      dispatch(setAuthUser(states.authUser))
   }, [])

   return (<></>)
}