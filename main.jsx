import React,{Component} from "react";
import { Route,Switch,Redirect } from "react-router-dom";
import auth from "./services/authServices.js";
import AddCust from "./addCust.jsx";
import AddPayee from "./addPayee.jsx";
import Cheque from "./cheque.jsx";
import Customer from "./customers.jsx";
import DataNet from "./dataNet.jsx";
import CustDetail from "./detail.jsx";
import Login from "./login.jsx";
import Logout from "./logout.jsx";
import NavBar from "./navBar";
import NetBanking from "./netBanking.jsx";
import NomDetail from "./nominee.jsx";
import NotAllowed from "./notAllowed.jsx";
import ViewCheque from "./viewCheque.jsx";
import DataV from "./viewDataLP.jsx";
import ViewNet from "./ViewNet.jsx";
import Welcome from "./welcome.jsx";
class MainView extends Component
{   render()
    {   const user=auth.getUser();
        return(
            <div className="container-fluid m-0 p-0">
              <NavBar user={user}/>
                <Switch>
                    <Route path="/addPayee" 
                    render={(props)=>
                    user ? 
                        user.role==="customer"?
                        <AddPayee {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />

                    <Route path="/netBanking" 
                    render={(props)=>
                    user ? 
                        user.role==="customer"?
                        <NetBanking {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />

                    <Route path="/cheque" 
                    render={(props)=>
                    user ? 
                        user.role==="customer"?
                        <Cheque {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />

                    <Route path="/nomineeDetails" 
                    render={(props)=>
                    user ? 
                        user.role==="customer"?
                        <NomDetail {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />

                    <Route path="/customerDetails" 
                    render={(props)=>
                    user ? 
                        user.role==="customer"?
                        <CustDetail {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />
                    
                    <Route path="/viewNet/:username" 
                    render={(props)=>
                    user ?
                        user.role==="customer"?
                        <ViewNet {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />

                    <Route path="/viewCheque/:username" 
                    render={(props)=>
                    user?
                        user.role==="customer"?
                        <DataNet {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />
                    <Route path="/allNet" 
                    render={(props)=>
                    user?
                        user.role==="manager"?
                        <DataNet {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />
                    <Route path="/allCheque" 
                    render={(props)=>
                    user?
                        user.role==="manager"?
                        <DataV {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />
                    
                    <Route path="/addCustomer" 
                    render={(props)=>
                    user?
                        user.role==="manager"?
                        <AddCust {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />
                    
                    <Route path="/allCustomers" 
                    render={(props)=>
                    user?
                        user.role==="manager"?
                        <Customer {...props}/>
                        :<Redirect to="/notAllowed"/>
                    :<Redirect from="/" to="/login" />}
                    />
                    <Route path="/home" component={Welcome}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/notAllowed" component={NotAllowed}/>
                    <Redirect from="/" to="/login" />
                </Switch>  
            </div>
        )
    }

}export default MainView;