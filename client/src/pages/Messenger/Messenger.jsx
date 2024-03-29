import axios from "axios"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import ChatOnline from "../../components/ChatOnline/ChatOnline"
import Conversation from "../../components/Conversation/Conversation"
import Message from "../../components/Message/Message"
import Topbar from "../../components/Topbar/Topbar"
import { io } from "socket.io-client"
import "./messenger.css"

const Messenger = () => {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMesssages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef()
  const { user } = useSelector((state) => state.user)
  const scrollRef = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMesssages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket?.current?.emit("addUser", user._id)
    socket?.current?.on("getUsers", (users) => {
      console.log(users)
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id)
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversations()
  }, [user._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id)
        setMesssages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMessages()
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find((member) => member !== user._id)

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    })
    try {
      const res = await axios.post("/messages", message)
      setMesssages([...messages, res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversations.map((c, i) => (
              <div onClick={() => setCurrentChat(c)} key={i}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  <div ref={scrollRef}>
                    {messages.map((m, i) => (
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        key={i}
                      />
                    ))}
                  </div>
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Write something..."
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleOnSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a convesation to start a chat session.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
