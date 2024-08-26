import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Signup = ()=>{
    const [firstname , setFirstName] = useState("");
    const [lastname , setLastName] = useState("");
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center " >
        <div className="flex flex-col justify-center" >
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 " >
                <Heading label = {"Sign Up"} />
                <SubHeading label = {"Enter Your Information to Create an Account "} />
                <InputBox onChange = {e =>{setFirstName(e.target.value)}} label={"First Name"} placeholder={"John"} />
                <InputBox onChange = {e =>{setLastName(e.target.value)}} label={"Last Name"} placeholder={"Doe"} />
                <InputBox onChange = {e =>{setUsername(e.target.value)}} label={"E-Mail"} placeholder={"johndoe@xyz.com"} />
                <InputBox onChange = {e =>{setPassword(e.target.value)}} label={"Password"} placeholder={"123456"} />
                <div>
                    <Button onClick = { async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username : username,
                            firstname : firstname,
                            lastname : lastname,
                            password : password
                        })

                        localStorage.setItem("token",response.data.token)
                        navigate("/dashboard");
                    }} label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already have an account ? "} buttonText = {"Sign In"} to = {"/signin"} />
            </div>
        </div>
    </div>
}