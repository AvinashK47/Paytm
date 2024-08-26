import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";


export const Signup = ()=>{
    return <div className="bg-slate-300 h-screen flex justify-center " >
        <div className="flex flex-col justify-center" >
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 " >
                <Heading label = {"Sign Up"} />
                <SubHeading label = {"Enter Your Information to Create an Account "} />
                <InputBox label={"First Name"} placeholder={"John"} />
                <InputBox label={"Last Name"} placeholder={"Doe"} />
                <InputBox label={"E-Mail"} placeholder={"johndoe@xyz.com"} />
                <InputBox label={"Password"} placeholder={"123456"} />
                <div>
                    <Button label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already have an account ? "} buttonText = {"Sign In"} to = {"/signin"} />
            </div>
        </div>
    </div>
}