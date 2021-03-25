import React from 'react'
import {Dropdown} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import firebase from '../../../firebase'
function UserPanel() {
    const user = useSelector(state => state.user.currentUser)
    const handleLogout = () => {
        firebase.auth().signOut()
    }
    return (
        <div style={{display:'flex',alignItems:'center'}}>
            <Dropdown style={{outline:'none',border:'0'}}>
                <Dropdown.Toggle className={"dropdown"} style={{background:'linear-gradient(to right, #1B4EB4,rgb(133, 133, 238))',border:'none',fontSize:'14px'}}>
                    {user && user.displayName}
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight="true" style={{background:'transparent',color:'#c2c2c2',border:'.1px solid #c2c2c2', textAlign:'right'}}>
                    <Dropdown.Item  style={{color:'#c2c2c2'}} >Profile</Dropdown.Item>
                    <Dropdown.Item  style={{color:'#c2c2c2'}} onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>         
        </div>
    )
}

export default UserPanel
