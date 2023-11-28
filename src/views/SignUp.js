import React, { useState } from "react";
import "../assets/css/Login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userFlag, setUserFlag] = useState(true);
    const [emailFlag, setEmailFlag] = useState(true);
    const [passwordFlag, setPasswordFlag] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this state variable
    // const [values, setValues] = useState({
    //     name: "",
    //     email: "",
    //     password: ""
    // })
    const navigate = useNavigate()
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        // setValues({ ...values, email: e.target.value })
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        // setValues({ ...values, password: e.target.value })
    };

    const validatePassword = (password) => {
        if (!password) {
            return false;
        } else {
            return true;
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        validateUser();
    };

    const validateUser = async () => {
        let passwordIsValid = validatePassword(password);
        setUserFlag(true);

        if (passwordIsValid) {
            setEmailFlag(true);
            setPasswordFlag(true);
            submitUser();
        } else {
            setEmailFlag(false);
            setPasswordFlag(false);
        }
    };
    // const submitUser = async (e) => {
    //     axios.post("http://localhost:8080/login/post", name,email,password)
    //         .then(res => {
    //             if (res.data.Status === "Succses") {
    //                 navigate("/")
    //             }
    //             else {
    //                 alert("error")
    //             }
    //         })
    //         .then(err => {
    //             console.log(err)
    //         })
    // }
    // const submitUser = async () => {
    //   try {
    //     const response = await axios.post(
    //       'https://monkfish-app-wyvrc.ondigitalocean.app/login',
    //       {
    //         email: email,
    //         password: password,
    //       }
    //     );

    //     const result = await response.data;
    //     // console.log(result);

    //     if (result.status === 'error') {
    //       console.log(result.message);
    //       setUserFlag(false);
    //     }
    //     if (result.status === 'success') {
    //       console.log("result", result);
    //       console.log("role", result.role_id);

    //                 if(result.role_id === 1){
    //         console.log(result.token);
    //         setUserFlag(true);
    //         navigate('/admin/dashboard')
    //       }
    //       else{
    //         console.log("unauthorized access")
    //         setUserFlag(false)
    //       }

    //       // setUserContext(result.user)
    //     }
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // };


    const submitUser = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/auth/signup/post',
                {
                    name: name,
                    email: email,
                    password: password,
                }
            );

            const result = response.data; // Remove the await here
            console.log("status", result)

            if (result.Status === 'error') {
                console.log(result.message);
                setUserFlag(false);
            }
            if (result.Status === "Succses") {

                // // console.log("role",result.role_id)
                // //       if (result.role_id === 1) {
                        setUserFlag(true);
                navigate("/")
            }
            else {
                alert("error")
                        setUserFlag(false);

            }
            //     if (result.status === 'Succses') {
            // // console.log("role",result.role_id)
            // //       if (result.role_id === 1) {
            //         setUserFlag(true);
            //         navigate('/');
            //     }
            //        else {
            //         console.log("error ");
            //         setUserFlag(false);
            //       }

        } catch (err) {
            console.log(err.message);
        }
    };


    return (
        <div className="container">

            <div id="login-form">
                <h1>SignUp</h1>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="username">name:</label>
                    <input type="text" id="name" name="name"
                        onChange={e => setName(e.target.value)} />
                    <label htmlFor="username">Email:</label>
                    <input type="text" id="email" name="email"
                        onChange={handleEmailChange} />
                    <label htmlFor="password" >Password:</label>
                    <input type="password" id="password" name="password"
                        onChange={handlePasswordChange} />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>

    );
};

export default SignUp;
