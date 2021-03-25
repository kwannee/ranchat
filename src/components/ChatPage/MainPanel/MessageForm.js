import React,{useState} from 'react'
import {Form,ProgressBar,Row,Col,Button} from 'react-bootstrap'
import firebase from '../../../firebase'

function MessageForm() {
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const messagesRef =firebase.database().ref("messages")

    const handleSubmit = async () =>{
        if(!content){
            setErrors(prev => prev.concat("Type Contents First"))
            return;
        }
        setLoading(true)

        // try{
        //     await messagesRef.child(chatRooms.id)
        // }catch(error){

        // }
    }
    const handleChange = (e) => {
        setContent(e.target.value)
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{display:'flex',flexDirection:'row'}} controlId="exampleForm.ControlTextarea1">
                    <Form.Control 
                        value={content}
                        onChange={handleChange}
                        style={{marginRight:'1rem'}}
                        as="textarea" rows={3} />
                    <Button
                        type="submit"
                        onClick={handleSubmit}>
                        SEND
                    </Button>
                </Form.Group>
            </Form>
            <ProgressBar style={{margin:'1rem 0'}} variant="warning" label="60%" now={60} />
            <Row>
                <Col>

                </Col>
                <Col>
                    <button
                    style={{width:'100%'}}>
                        UPLOAD
                    </button>
                </Col>
            </Row>
        </div>
    )
}

export default MessageForm
