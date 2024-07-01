import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from "react-router-dom";


const Register = () => {

    const [registerError, setRgeisterError] = useState('');
    const [sucess, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false)


    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);


        //reset error 
        setRgeisterError('');
        //reset success message
        setSuccess('');

        //Create user

        if (password.length < 6) {
            setRgeisterError('Password should be at least 6 characters or higher.')
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRgeisterError('Password should be with at least one capital case.')
            return;
        } else if (!accepted) {
            setRgeisterError('Please Accept the terms and conditions.')
            return;
        }


        // create user part 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                console.log(result);
                setSuccess('User has been created successfully.');
            })
            .catch(error => {
                console.log(error);
                setRgeisterError(error.message);
            })
            
    }



    return (
        <div className="mx-auto  md:w-1/2  ">

            <h2 className="text-2xl mb-6 mt-16">Register Here</h2>

            <form onSubmit={handleRegister}>

                {/* email input field */}
                <div><input
                    className=" border  border-black mb-4 w-full py-2 px-4"
                    type="email"
                    name="email"
                    id="emm"
                    placeholder="Email Address"
                    required />  <br />
                </div>
                

                {/* password filed including show and not show */}
                <div className=" relative border  ">
                    <input className="border  border-black 
                        w-full py-2 px-4 w- "
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="psss"
                        placeholder="Password"
                        required />
                    <span className=" absolute top-3 right-3 "  onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ? <BsEyeSlash></BsEyeSlash>:<BsEye></BsEye>
                        }
                    </span>
                </div>
                
                <br />

                        {/* terms and conditions */}
                <div className="mb-2">
                    <input type="checkbox" name="terms" id="terms"  />
                    <label className="ml-2" htmlFor="terms">Accept out Terms and Conditions</label>
                </div>
             
                <br />
                <input  className="btn btn-accent  w-full mt-6" type="submit" value="Register" />
            </form>
            
            {
                registerError && <p className="text-red-600 pt-7">{registerError}</p>
            }

            {
                sucess && <p className="text-green-600 pt-7">{sucess}</p>
            }

            <p  className="pt-10" >Already registered? Please <span className="text-red-500"><Link to='/login'>login</Link></span> here. </p>
        </div>
    );
};

export default Register;