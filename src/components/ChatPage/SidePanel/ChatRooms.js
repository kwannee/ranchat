import React, { Component } from 'react'
import {Button,Modal,Form} from 'react-bootstrap'
import {connect} from 'react-redux'
import firebase from '../../../firebase'

export class ChatRooms extends Component {

    state = {
        show:false,
        name: "",
        description:"",
        chatRoomsRef:firebase.database().ref('chatrooms'),
        chatRooms: []
    }

    componentDidMount() {
        this.AddChatRoomsListeners();
    }

    AddChatRoomsListeners = () =>{
        let chatRoomsArray = [];
        //child_added되는거 리슨하고 있음.
        this.state.chatRoomsRef.on("child_added",DataSnapshot =>{
            chatRoomsArray.push(DataSnapshot.val())
            this.setState({chatRooms:chatRoomsArray})
        })
    }

    handleClose = () => this.setState({show:false})
    handleShow= () => this.setState({show:true})
    handleSubmit = (e) =>{
        e.preventDefault();
        const {name,description} = this.state;
        if(this.isFormValid(name,description)){
            this.addChatRoom();
        }
    }

    addChatRoom = async () => {
        const key = this.state.chatRoomsRef.push().key //파베에서 자동생성 키 만들기
        const {name,description} = this.state;
        const {user} = this.props;
        const newChatRoom = {
            id:key,
            name:name,
            description:description,
            createBy:{
                name:user.displayName
            }
        }
        try{
            await this.state.chatRoomsRef.child(key).update(newChatRoom)
            this.setState({
                name:"",
                description:"",
                show:false
            })
        }catch(error){
            alert(error)
        }
    }

    isFormValid = (name,desc) =>
        name && desc;

        renderChatRooms = (chatRooms) =>(
            chatRooms.length && chatRooms.map(room=>(
                <li
                    key={room.id}
                >
                    {room.name}
                </li>
            ))
        )
    
    render() {
        return (
            <div>
                <div className="menuItem" onClick={this.handleShow}>
                    ChatRooms
                </div>
                {/* <ul style={{listStyleType:'none',padding:0}}>
                    {this.renderChatRooms(this.state.chatRooms)}
                </ul> */}
                <Modal centered={true} show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create a Chatroom</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>방 이름</Form.Label>
                            <Form.Control
                            onChange={(e)=>this.setState({name:e.target.value})}
                            type="text" placeholder="Enter a chat room name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>방 설명</Form.Label>
                            <Form.Control
                            onChange={(e)=>this.setState({description:e.target.value})}
                            type="text" placeholder="Enter a chat room description" />
                        </Form.Group>
                    </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        생성
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        user:state.user.currentUser
    }
}
export default connect(mapStateToProps)(ChatRooms) 
