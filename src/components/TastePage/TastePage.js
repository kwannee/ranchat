import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Image} from 'react-bootstrap'
import md5 from 'md5'
import check from './check.png'
import firebase from '../../firebase'
import {useSelector} from 'react-redux'
import {
    useHistory
  } from 'react-router-dom'

function TastePage() {
    const user = useSelector(state => state.user.currentUser)
    const [array, setArray] = useState([])
    const [checkdTaste, setCheckdTaste] = useState([])
    let history = useHistory()
    useEffect(() => {
        let tmpArray = []
        let limit = 30
        for(let i =0; i < limit; i++){
            while(true){
                let randNum = Math.round(Math.random()*100);
                if(!tmpArray.includes(randNum)){
                    tmpArray.push(randNum)
                    break
                }
            }
            if(i === limit-1){
                setArray(tmpArray)
            }
        }
    },[])
    const handleItemClick = (item) =>{
        if(document.getElementsByClassName(`tasteItem_${item}`)[0].classList.contains('tasteItemChecked')){
            document.getElementsByClassName(`tasteItem_${item}`)[0].classList.remove('tasteItemChecked')
            document.getElementsByClassName(item)[0].classList.remove("checkOn")
            //filter로 없애기
            setCheckdTaste(checkdTaste.filter(cur => cur !== item))
        }else{
            document.getElementsByClassName(`tasteItem_${item}`)[0].classList.add('tasteItemChecked')
            document.getElementsByClassName(item)[0].classList.add("checkOn")
            setCheckdTaste(arr => [...arr,item])
            for(let i =0; i < 6; i++){
                while(true){
                    let randNum = Math.round(Math.random()*100);
                    let index = array.indexOf(item)+(6-array.indexOf(item) % 6)
                    if(!array.includes(randNum)){
                        let tmpArray = array
                        tmpArray.splice(index,0,randNum)
                        setArray(tmpArray)
                        break
                    }
                }
            }
        }
    }
    const handleTasteSubmit = async () =>{
        let userTaste = await firebase.database().ref(`users/${user.uid}`).once('value',snapshot=>{
            return snapshot.val()
        })
        let prevTaste = userTaste.val()["taste"] !== undefined ? userTaste.val()["taste"].split(',').map(item=>Number(item)) : []
        let newTaste = checkdTaste.concat(prevTaste)
        newTaste =  newTaste.filter((item, pos) => newTaste.indexOf(item) === pos);
        let update = {
            taste :newTaste.join()
        }
        try{
            await firebase.database().ref(`users/${user.uid}`).update(update).then(
                history.push('/')
            )
        }catch(error){
            alert(error)
        }
    }
    return (
        <div>
            <div style={{width:'70vw',minHeight:'100vh',margin:'2rem auto',textAlign:'center'}}>
                <h1 style={{fontWeight:'bold',color:'#c2c2c2'}}>좋아하는 아티스트를 선택해주세요</h1>
                <h6 style={{color:'white',paddingBottom:'1rem'}}>비슷한 취향의 상대와 매칭됩니다</h6>
                <div>
                    <Container style={{padding:0}} fluid={true}>
                        <Row style={{padding:'2rem 0'}}>
                            {
                               array && array.map(item =>(
                                    <Col key={item} onClick={()=>handleItemClick(item)} style={{paddingBottom:'1rem'}} xl={2} lg={4} md={6} xs={9}>
                                        <Image className={`tasteItem tasteItem_${item}`} style={{width:'100%'}} src={`http://gravatar.com/avatar/${(md5(item))}?d=identicon`} roundedCircle></Image>
                                        <Image className={item} style={{position:'absolute',width:'100%',top:0,left:0,zIndex:50,background:'transparent',display:'none'}} src={check} roundedCircle/>
                                        <p>{item}</p>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </div>
            </div>
            <footer style={{position:'sticky',bottom:0,height:'7.6vh',color:'#c2c2c2',fontSize:'15px',textAlign:'center',backgroundColor:'#181818',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div onClick={handleTasteSubmit} style={{background:'linear-gradient(to right, #1B4EB4,rgb(133, 133, 238))',border:'none',padding:'0.2rem 1rem',borderRadius:'5px'}}>
                    완료
                </div>
            </footer>
        </div>
    )
}

export default TastePage
