import React,{Component} from "react";
import { Route,Switch,Redirect } from "react-router-dom";
import auth from "./services/authServices.js";
class Welcome extends Component
{   render()
    {   let user=auth.getUser();
        return(
            <div className="container">
                <br/><h1 className="text-center text-danger">Welcome to GBI Bank</h1>
                <h1 className="text-center"><img className="rounded mx-auto d-block" src="https://as1.ftcdn.net/v2/jpg/02/19/11/50/1000_F_219115064_tVDSTrYjSUXCW1tM1Wf2KkcRin42MTC5.jpg" alt="bank_Image"/></h1>
            </div>
        )
    }

}export default Welcome;