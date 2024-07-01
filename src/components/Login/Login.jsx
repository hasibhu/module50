import {  sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../../firebase/firebase.config";
import { Link } from "react-router-dom";


const Login = () => {


    const [registerError, setRgeisterError] = useState('');
    const [sucess, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        


        //reset error and reset success message
        setRgeisterError('');
        setSuccess('');

        //Create user

        // if (password.length < 6) {
        //     setRgeisterError('Password should be at least 6 characters or higher')
        //     return;
        // }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                console.log(result);
                
            })
            .catch(error => {
                console.log(error);
                setRgeisterError(error.message);
            })

    }

    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        console.log(email);
        if (!email) {
            console.log("Please write an email.");
            return; //putting this return will block further setp. 
            
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { //regex
            console.log('write full email please.');
            return; //putting this return will block further setp. 
        }

        //Send a password reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('password reset email sent');
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
            })


    }

    return (
        <div className=" border-blue-400 border-8 pr-8 pl-8 pb-10 max-auto m-auto mt-6 md:w-1/2 ">
            <h2 className="text-2xl mb-6 mt-16">Log in Here</h2>

            <form onSubmit={handleLogin}>
                <input className="border border-black  mb-5 w-[100%] py-2 px-4"
                    type="email"
                    name="email"
                    ref={emailRef}
                    id="emm"
                    placeholder="Email Address"
                    required />
                
                <br />

                <input className="border border-black w-[100%] py-2 px-4"
                    type="password"
                    name="password"
                    id="psss"
                    placeholder="Password"
                    required />
                <br />
                
                <label className="label pt-6"><a onClick={handleForgotPassword} href="#">Fogot Password?</a></label>

            
                <input className="btn btn-accent mt-5" type="submit" value="Log in" />
            </form>

            {
                registerError && <p className="text-red-600 pt-7">{registerError}</p>
            }

            {
                sucess && <p className="text-green-600 pt-7">{sucess}</p>
            }

            <p className="pt-6">New to this website? Please <span className="text-red-500 "><Link to='/register'>Register</Link></span> here. </p>
        </div>
    );
};


export default Login;