import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";


export const Signin = ()=>{
    return <div className="bg-slate-300 h-screen flex justify-center " >
        <div className="flex flex-col justify-center" >
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 " >
                <Heading label = {"Sign In"} />
                <SubHeading label = {"Enter Your Credentials To Get Access To Your Account "} />
                <InputBox label={"E-Mail"} placeholder={"johndoe@xyz.com"} />
                <InputBox label={"Password"} placeholder={"123456"} />
                <div>
                    <Button label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have  an account ? "} buttonText = {"Sign Up"} to = {"/signup"} />
            </div>
        </div>
    </div>
}