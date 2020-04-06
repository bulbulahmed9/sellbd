import React from 'react'
import { Container} from 'react-bootstrap'
import { MdComment } from 'react-icons/md'
import { Link } from 'react-router-dom'

import './Chat.scss'

const Chat = () => {

    return (
        <>
            <div className="msg">
                <Container>
                    <div className="msg-box">
                        <h5>Currently You don't have any conversation</h5>
                        <MdComment />
                        <p>Click "Chat" on an ad or post your own ad to start chatting.</p>
                        <div className="button">
                            <Link to="/product" className="chat-link" >Browse ads</Link>
                            <Link className="chat-link" to="/post-ad">Post an ad</Link>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Chat
