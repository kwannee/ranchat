import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import firebase from '../../firebase'

function LoginPage() {

    const {register,errors,handleSubmit} = useForm();
    const [errorFromSubmit, setErrorFromSubmit] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) =>{
        // data는 react-hook-form을 쓰기 때문에 넘어오는거. 여기에 정보들이 넘어옴
        try{
            setLoading(true)

            await firebase.auth().signInWithEmailAndPassword(data.email,data.password)

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
                <h3>Login</h3>
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
                 {errorFromSubmit && <p>{errorFromSubmit.message}</p>}
                <input disabled={loading} type="submit" value="로그인"/>
            
                <Link style={{textDecoration:'none',color:'rgba(255, 255, 255, 0.842)'}} to="register">아직 아이디가 없다면...</Link>
            </form> 
        </div>
    )
}

export default LoginPage
