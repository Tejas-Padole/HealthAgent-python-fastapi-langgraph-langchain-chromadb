import React, { useState, useEffect } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { chatAPI } from '../../services/api'
import { Bot, Sparkles, Menu } from 'lucide-react'

const ChatArea = ({ session, onUpdateTitle, sidebarCollapsed = false, onToggleSidebar }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('') // NEW

  useEffect(() => {
    if (session) {
      loadMessages()
    }
  }, [session])

  const loadMessages = async () => {
    if (!session) return
    
    setLoading(true)
    try {
      const data = await chatAPI.getMessages(session.id)
      setMessages(data)
    } catch (error) {
      console.error('Failed to load messages:', error)
    } finally {
      setLoading(false)
    }
  }

//   const handleSendMessage = async (content) => {
//     if (!session || !content.trim()) return

//     setSending(true)
    
//     // Add user message immediately for better UX
//     const userMessage = {
//       id: Date.now(),
//       role: 'user',
//       content: content,
//       created_at: new Date().toISOString(),
//     }
//     setMessages([...messages, userMessage])

//     try {
//       const response = await chatAPI.sendMessage(session.id, content)
      
//       // Reload messages to get the complete conversation
//       await loadMessages()
      
//       // Update session title if it's the first message
//       if (messages.length === 0) {
//         const title = content.slice(0, 50) + (content.length > 50 ? '...' : '')
//         onUpdateTitle(session.id, title)
//       }
//     } catch (error) {
//       console.error('Failed to send message:', error)
//       // Remove the optimistically added message on error
//       setMessages(messages)
//     } finally {
//       setSending(false)
//     }
//   }

//   if (!session) {
//     return (
//       <div className="chat-area empty">
//         <div className="empty-state">
//           <Bot size={64} strokeWidth={1.5} />
//           <h2>Welcome to Medical Assistant</h2>
//           <p>Start a conversation to get medical information and assistance</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className={`chat-area ${sidebarCollapsed ? 'expanded' : ''}`}>
//       <div className="chat-header">
//         <div className="chat-title">
//           <Sparkles size={20} />
//           <h2>{session.title}</h2>
//         </div>
//       </div>

//       {loading ? (
//         <div className="loading-messages">
//           <div className="spinner spin"></div>
//           <p>Loading conversation...</p>
//         </div>
//       ) : (
//         <>
//           <MessageList messages={messages} />
//           <MessageInput onSend={handleSendMessage} disabled={sending} />
//         </>
//       )}
//     </div>
//   )
// }

// export default ChatArea
const handleSendMessage = async (content, imageFile = null) => {
  if (!session || (!content.trim() && !imageFile)) return

  setSending(true)
  
  // Create image preview URL if image is provided
  let imageUrl = null
  if (imageFile) {
    imageUrl = URL.createObjectURL(imageFile)
  }
  
  const userMessageContent = content + (imageFile ? ` [Image: ${imageFile.name}]` : '')
  const userMessage = {
    id: Date.now(),
    role: 'user',
    content: userMessageContent,
    imageUrl: imageUrl,
    created_at: new Date().toISOString(),
  }
  setMessages(prev => [...prev, userMessage])

  const assistantMessageId = Date.now() + 1
  // Add typing indicator immediately to show AI is processing
  const typingIndicatorMessage = {
    id: assistantMessageId,
    role: 'assistant',
    content: '',
    created_at: new Date().toISOString(),
    streaming: true,
    isTyping: true  // Flag to show typing dots
  }
  setMessages(prev => [...prev, typingIndicatorMessage])

  let fullResponse = ''

  try {
    await chatAPI.streamMessage(
      session.id,
      content,
      imageFile,
      // Callback 1: onToken
      (token) => {
        fullResponse += token
        setMessages(prev => {
          const existingMessage = prev.find(msg => msg.id === assistantMessageId)
          if (existingMessage) {
            // Update existing message - replace typing indicator with content
            // Only set isTyping to false when we have actual content
            const newContent = (existingMessage.content || '') + token
            return prev.map(msg => 
              msg.id === assistantMessageId 
                ? { ...msg, content: newContent, streaming: true, isTyping: false }
                : msg
            )
          } else {
            // Create new message with first token (fallback)
            return [...prev, {
              id: assistantMessageId,
              role: 'assistant',
              content: token,
              created_at: new Date().toISOString(),
              streaming: true,
              isTyping: false
            }]
          }
        })
      },
      // Callback 2: onComplete
      () => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, streaming: false }
            : msg
        ))
        setSending(false)
        
        if (messages.length === 0) {
          const title = content.slice(0, 50) + (content.length > 50 ? '...' : '')
          onUpdateTitle(session.id, title)
        }
      },
      // Callback 3: onError
      (error) => {
        console.error('Streaming error:', error)
        setMessages(prev => {
          const existingMessage = prev.find(msg => msg.id === assistantMessageId)
          if (existingMessage) {
            return prev.map(msg => 
              msg.id === assistantMessageId 
                ? { ...msg, content: msg.content || 'Error: ' + error, streaming: false }
                : msg
            )
          } else {
            // Create error message if no message exists yet
            return [...prev, {
              id: assistantMessageId,
              role: 'assistant',
              content: 'Error: ' + error,
              created_at: new Date().toISOString(),
              streaming: false
            }]
          }
        })
        setSending(false)
      }
    )
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId))
      setSending(false)
    }
  }

  if (!session) {
    return (
      <div className={`chat-area empty ${sidebarCollapsed ? 'expanded' : ''}`}>
        {sidebarCollapsed && (
          <button 
            className="sidebar-toggle-btn floating" 
            onClick={onToggleSidebar || (() => {})}
            title="Show sidebar"
            aria-label="Show sidebar"
          >
            <Menu size={24} />
          </button>
        )}
        <div className="empty-state">
          <Bot size={64} strokeWidth={1.5} />
          <h2>Welcome to Medical Assistant</h2>
          <p>Start a conversation to get medical information and assistance</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`chat-area ${sidebarCollapsed ? 'expanded' : ''}`}>
      {sidebarCollapsed && (
        <button 
          className="sidebar-toggle-btn floating" 
          onClick={onToggleSidebar || (() => {})}
          title="Show sidebar"
          aria-label="Show sidebar"
        >
          <Menu size={24} />
        </button>
      )}
      <div className="chat-header">
        <div className="chat-title">
          <Sparkles size={20} />
          <h2>{session.title}</h2>
        </div>
      </div>

      {loading ? (
        <div className="loading-messages">
          <div className="spinner spin"></div>
          <p>Loading conversation...</p>
        </div>
      ) : (
        <>
          <MessageList messages={messages} />
          <MessageInput onSend={handleSendMessage} disabled={sending} />
        </>
      )}
    </div>
  )
}

export default ChatArea
