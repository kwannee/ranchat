import React, { Component } from 'react'
import MessageHeader from './MessageHeader'
import Message from './Message'
import MessageForm from './MessageForm'
import WaitingPanel from './WaitingPanel'
export class MainPanel extends Component {
    render() {
        return (
            <div style={{padding:'2rem 2rem 0 2rem',height:'90vh'}}>
                <MessageHeader />
                <WaitingPanel />
            </div>
        )
    }
}

export default MainPanel
