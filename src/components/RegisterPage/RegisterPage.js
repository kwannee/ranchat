import React,{useRef,useState} from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import firebase from '../../firebase'

function RegisterPage() {

    const {register,watch,errors,handleSubmit} = useForm();
    const [errorFromSubmit, setErrorFromSubmit] = useState("")
    const [loading, setLoading] = useState(false)
    const password = useRef()
    password.current = watch("password")
    const onSubmit = async (data) =>{
        // data는 react-hook-form을 쓰기 때문에 넘어오는거. 여기에 정보들이 넘어옴
        try{
            setLoading(true)
            let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email,data.password)

            await createdUser.user.updateProfile({
                displayName:data.name
            })
            await firebase.database().ref("users").child(createdUser.user.uid).set({
                name:data.name,
            })
            
            setLoading(false)
        } catch (error){
            setErrorFromSubmit(error)
            setLoading(false)
            setTimeout(() => {
                setErrorFromSubmit("")
            }, 7000);
        }
    }

    return (
        <div className="auth-wrapper">
            <div style={{textAlign:'center'}}>
                <h3>Register</h3>
                {/* style={{background:`linear-gradient(to right, #4627CC,#1B4EB4)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}} */}
            </div>
            {/* react-hook-form을 안쓰면 그냥 onSubmit에 하면 되지만 이걸 쓰면 handlesubmit을 useForm에서 불러와서
            거기에 처리하는 함수를 넣어야한다. */}
           <form onSubmit={handleSubmit(onSubmit)}>
                <label >Email</label>
                <input
                    name="email"
                    type="email"
                    ref={register({ required: true, pattern:/^\S+@\S+$/i })}
                />
                {errors.email && <p>This field is required</p>}
                <label>Name</label>
                <input
                    name="name"
                    ref={register({ required: true, maxLength: 10 })}
                />
                {errors.name && errors.name.type==="required"
                    &&<p>This name field is required</p>}
                {errors.name && errors.name.type==="maxLength"
                    &&<p>10글자 이내로 작성해주세요.</p>}    
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type==="required"
                    &&<p>This password field is required</p>}
                {errors.password && errors.password.type==="minLength"
                    &&<p>비밀번호는 6자를 넘어야 합니다.</p>}
                <label>Password Confirm</label>
                <input
                    name="password_confirm"
                    type="password"
                    ref={register({ required: true,
                    validate:(value)=>
                        value===password.current
                    })}
                />
                {errors.password_confirm && errors.password_confirm.type === "required" &&
                 <p>This password_confirm is required</p>}
                 {errors.password_confirm && errors.password_confirm.type === "validate" &&
                 <p>비밀번호가 일치하지 않습니다.</p>}
                 {errorFromSubmit && <p>{errorFromSubmit.message}</p>}
                <input disabled={loading} type="submit" value="회원가입"/>
            
                <Link style={{textDecoration:'none',color:'rgba(255, 255, 255, 0.842)'}} to="login">이미 아이디가 있다면...</Link>
            </form> 
        </div>
    )
}

export default RegisterPage
