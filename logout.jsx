import React,{Component} from "react";
import http from "./services/httpService.js";
import auth from "./services/authServices.js";
class Logout extends Component
{   componentDidMount()
    {   auth.logout();
        //this.props.history.push("/login");
        window.location="/login";
    }
    render()
    {   return "";
    }

}export default Logout;
