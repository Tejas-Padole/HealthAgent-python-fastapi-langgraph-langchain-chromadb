import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useGuest } from '../../context/GuestContext'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { Bot, LogIn, UserPlus, Sparkles } from 'lucide-react'
import './Chat.css'

const GuestChat = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const { guestMessages, addGuestMessage } = useGuest()
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)

  useEffect(() => {
    // Only redirect if auth has finished loading and user exists
    if (!loading && user) {
      navigate('/chat')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    // Load guest messages
    setMessages(guestMessages)
  }, [guestMessages])

  // Show loading while auth is initializing
  if (loading) {
    return (
      <div className="guest-chat-container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontSize: '1.2rem',
          color: 'var(--text-secondary)'
        }}>
          Loading...
        </div>
      </div>
    )
  }

  const handleSendMessage = async (content, imageFile = null) => {
    if (!content.trim()) return

    setSending(true)

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMessage])
    addGuestMessage(userMessage)

    // Add typing indicator immediately to show AI is processing
    const assistantMessageId = Date.now() + 1
    const typingIndicatorMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString(),
      streaming: true,
      isTyping: true  // Flag to show typing dots
    }
    setMessages(prev => [...prev, typingIndicatorMessage])
    addGuestMessage(typingIndicatorMessage)

    try {
      const response = await fetch('http://localhost:8009/api/guest/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.done) {
                setMessages(prev => prev.map(msg =>
                  msg.id === assistantMessageId
                    ? { ...msg, streaming: false }
                    : msg
                ))
                // Save final message
                addGuestMessage({
                  id: assistantMessageId,
                  role: 'assistant',
                  content: fullResponse,
                  created_at: new Date().toISOString(),
                  streaming: false
                })
              } else if (data.token) {
                fullResponse += data.token
                setMessages(prev => {
                  const existingMessage = prev.find(msg => msg.id === assistantMessageId)
                  if (existingMessage) {
                    // Update existing message - replace typing indicator with content
                    // Only set isTyping to false when we have actual content
                    return prev.map(msg =>
                  msg.id === assistantMessageId
                        ? { ...msg, content: fullResponse, streaming: true, isTyping: false }
                    : msg
                    )
                  } else {
                    // Create new message with first token (fallback)
                    return [...prev, {
                      id: assistantMessageId,
                      role: 'assistant',
                      content: fullResponse,
                      created_at: new Date().toISOString(),
                      streaming: true,
                      isTyping: false
                    }]
                  }
                })
              }
            } catch (e) {
              console.warn('Invalid JSON:', line)
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => {
        const existingMessage = prev.find(msg => msg.id === assistantMessageId)
        if (existingMessage) {
          return prev.map(msg =>
        msg.id === assistantMessageId
              ? { ...msg, content: msg.content || 'Error: Failed to connect. Please try again.', streaming: false }
          : msg
          )
        } else {
          // Create error message if no message exists yet
          return [...prev, {
            id: assistantMessageId,
            role: 'assistant',
            content: 'Error: Failed to connect. Please try again.',
            created_at: new Date().toISOString(),
            streaming: false
          }]
        }
      })
    }

    setSending(false)
  }

  return (
    <div className="guest-chat-container">
      <div className="guest-header">
        <div className="guest-header-left">
          <Bot size={32} strokeWidth={1.5} />
          <div>
            <h1>Medical Assistant</h1>
            <p className="guest-subtitle">Try our AI - No login required!</p>
          </div>
        </div>
        <div className="guest-header-right">
          <button 
            className="guest-login-btn"
            onClick={() => navigate('/login')}
          >
            <LogIn size={18} />
            Login
          </button>
          <button 
            className="guest-signup-btn"
            onClick={() => navigate('/signup')}
          >
            <UserPlus size={18} />
            Sign Up
          </button>
        </div>
      </div>

      <div className="guest-chat-content">
        {messages.length === 0 ? (
          <div className="guest-welcome">
            <Sparkles size={64} strokeWidth={1.5} />
            <h2>Welcome to Medical Assistant</h2>
            <p>Ask me anything about symptoms, treatments, or medical advice</p>
            <div className="guest-info-box">
              <strong>💡 Tip:</strong> Sign up to save your conversations and unlock all features!
            </div>
          </div>
        ) : (
          <MessageList messages={messages} />
        )}
        <MessageInput onSend={handleSendMessage} disabled={sending} />
      </div>
    </div>
  )
}

export default GuestChat
