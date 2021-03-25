import React,{useState,useEffect} from 'react'
import firebase from '../../../firebase'
import {useSelector} from 'react-redux'
import md5 from 'md5'
import {Image} from 'react-bootstrap'

function MessageHeader() {
    const user = useSelector(state => state.user.currentUser)
    const [taste, setTaste] = useState("")
    useEffect(() => {
        firebase.database().ref(`users/${user.uid}`).once('value',snapshot=>{
            let userTaste = snapshot.val()["taste"] !== undefined ? snapshot.val()["taste"].split(",") : ""
            setTaste(userTaste)
        })
    }, [])
    return (
        <div style={{color:'#1B4EB4',fontWeight:'bold',fontSize:'30px',paddingBottom:'1rem'}}>
            {taste && taste.map((item,idx)=>{
                if(idx < 6){
                    return <Image style={{paddingRight:'5px',width:'40px'}} src={`http://gravatar.com/avatar/${(md5(item))}?d=identicon`} roundedCircle/>
                }
            }
        )}
        </div>
    )
}

export default MessageHeader
