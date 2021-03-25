import React from 'react'
import SidePanel from './SidePanel/SidePanel'
import MainPanel from './MainPanel/MainPanel'

function ChatPage() {
    return (
        <div style={{display:'flex',flexDirection:'column',overflowX:'hidden'}}>
            <MainPanel/>    
        </div>
    )
}

export default ChatPage
