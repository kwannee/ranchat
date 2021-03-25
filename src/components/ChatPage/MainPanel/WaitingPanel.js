import React,{useState} from 'react'
import {Button,ProgressBar} from 'react-bootstrap'
import MessageForm from './MessageForm'
function WaitingPanel() {
    const [isFinding, setIsFinding] = useState(false)
    const [findedChat, setFindedChat] = useState(false)
    const [chatStarted, setChatStarted] = useState(false)
    const [remainedTime, setRemainedTime] = useState(0)
    const handleClickChatButton = () =>{
        setIsFinding(true)
        setTimeout(() => {
            setFindedChat(true)
            setInterval(() => {
                setRemainedTime(prev => prev+1)
            }, 100);

        }, 2000);
    }
    const handleStartChat = () =>{
        setIsFinding(false)
        setFindedChat(false)
        setChatStarted(true)
    }
    return (
        <div style={{height:"65vh",display:'flex',alignItems:'center',justifyContent:'center',borderTop:'0.2px solid #c2c2c2',borderBottom:'.2px solid #c2c2c2',flexDirection:'column',}}>
            <div  style={{display:(isFinding || chatStarted )? 'none':'block'}}>
                <h1>당신과 취향이 비슷한 사람과 채팅이 매칭됩니다.</h1>
                <Button style={{background:'linear-gradient(to right, #1B4EB4,rgb(133, 133, 238))'}} size="lg" onClick={handleClickChatButton}>대화 상대 찾기</Button>
            </div>
            <div style={{display:(isFinding && !chatStarted)  ? 'block' : 'none',position:'absolute',left:'50%'}} className="loader"></div>
            <div className="animate__animated animate__bounce" style={{display:findedChat ? 'flex' : 'none',flexDirection:'column',borderRadius:'3px',textAlign:'center',justifyContent:'center',alignItems:'center'}}>
                <h1 style={{background:'transparent',paddingBottom:'2rem'}}>
                    상대가 매칭 되었습니다.
                    <br/>
                    대화를 시작하시겠습니까?
                    <h3 style={{color:'white'}}>매칭률 76%</h3>
                    <ProgressBar className="matchTimeProgressbar" style={{backgroundColor:'#c2c2c2',marginTop:'1.3rem'}} now={remainedTime} />
                </h1>
                <div style={{display:'flex',width:'70%',justifyContent:'space-between'}}>
                    <Button onClick={handleStartChat} style={{background:'linear-gradient(to right, #1B4EB4,rgb(133, 133, 238))',width:'100px'}}>대화 시작</Button>    
                    <Button onClick={()=>setFindedChat(false)} style={{background:'linear-gradient(to right, #1B4EB4,rgb(133, 133, 238))',width:'100px'}}>취소</Button>
                </div>
            </div>
            <div className="animate__animated animate__fadeIn" style={{display:chatStarted ? 'block' : 'none',width:'100%',height:'90%'}}>
                <div style={{
                    height:'70%',
                    border:'.2px solid #c2c2c2',
                    borderRadius:'4px',
                    padding:'1rem',
                    marginBottom:'1rem',
                    overflowY:'auto',
                }}>
                    안녕하세요
                </div>
                <MessageForm />
            </div>
        </div>
    )
}

export default WaitingPanel
