import React, { createContext, useState, useContext, useEffect } from 'react'

const GuestContext = createContext()

export const useGuest = () => {
  const context = useContext(GuestContext)
  if (!context) {
    throw new Error('useGuest must be used within GuestProvider')
  }
  return context
}

export const GuestProvider = ({ children }) => {
  const [guestMessages, setGuestMessages] = useState([])
  const [isGuestMode, setIsGuestMode] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      setIsGuestMode(true)
      // Load guest messages from localStorage
      const saved = localStorage.getItem('guest_messages')
      if (saved) {
        setGuestMessages(JSON.parse(saved))
      }
    }
  }, [])

  const addGuestMessage = (message) => {
    const newMessages = [...guestMessages, message]
    setGuestMessages(newMessages)
    localStorage.setItem('guest_messages', JSON.stringify(newMessages))
  }

  const clearGuestMessages = () => {
    setGuestMessages([])
    localStorage.removeItem('guest_messages')
  }

  const getGuestMessages = () => {
    return guestMessages
  }

  return (
    <GuestContext.Provider value={{
      isGuestMode,
      guestMessages,
      addGuestMessage,
      clearGuestMessages,
      getGuestMessages,
      setIsGuestMode
    }}>
      {children}
    </GuestContext.Provider>
  )
}
