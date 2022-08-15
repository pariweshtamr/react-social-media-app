import ChatOnline from "../../components/ChatOnline/ChatOnline"
import Conversation from "../../components/Conversation/Conversation"
import Message from "../../components/Message/Message"
import Topbar from "../../components/Topbar/Topbar"
import "./messenger.css"

const Messenger = () => {
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
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                placeholder="Write something..."
                className="chatMessageInput"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
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
