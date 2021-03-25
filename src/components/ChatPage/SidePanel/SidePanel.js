import React from 'react'
import UserPanel from './UserPanel'
import Favorited from './Favorited'
import ChatRooms from './ChatRooms'
import Taste from './Taste'
import DirectMessages from './DirectMessages'
import logo from '../../../logo.png'
import {Link} from 'react-router-dom'
function SidePanel() {
    return (
        <div style={{position:'sticky',top:0,display:'flex',zIndex:'99',flexDirection:'row',height:'7.5vh',justifyContent:'space-between',padding:'1rem 2rem'}}>
            <Link style={{width:0}} to="/"><img style={{height:'100%',width:'auto'}} src={logo} alt={"logo"}/></Link>
            <div className="panels" style={{display:'flex',alignItems:'center',paddingLeft:'6.2rem'}}>
                <Favorited/>
                <ChatRooms/>
                <Taste/>
                <DirectMessages/>
            </div>
            <UserPanel/>
        </div>
    )
}

export default SidePanel
