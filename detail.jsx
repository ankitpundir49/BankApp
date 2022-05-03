import React,{Component} from "react";
import http from "./services/httpService";
import auth from "./services/authServices.js";
import SDay from "./date";
class CustDetail extends Component
{   state=
    {   user:{name:"",gender:"",addressLine1:"",state:"",city:"",dob:"",PAN:"",garbage:""},
        errors:[],
        addressData:[],
        genders:["Male","Female"],
        data:[],
    }
    async getData()
    {   let username=auth.getUser().name;
        let response1=await http.get(`/getCustomer/${username}`);
        console.log(response1)
        let response2=await http.get(`/statecity`);
        if(response1.data)
        {   this.setState({user:response1.data,addressData:response2.data});}
        else
        {   let user={name:username,gender:"",addressLine1:"",state:"",city:"",dob:"",PAN:"",garbage:""};
            this.setState({user:user,addressData:response2.data});
        }
    }
    componentDidMount()
    {   this.getData();
    }
    componentDidUpdate(prevProps,PrevState)
    {   if(prevProps!==this.props)
        {   this.getData();
        }
    }
    handleChange=(e)=>
    {   const {currentTarget:input}=e;
        let s1={...this.state};
        s1.user[input.name]=input.value;
        this.setState(s1);
        this.isFormValid();
    }
    async postData(url,obj)
    {   try{   
            let{id}=this.props.match.params;
            console.log(obj)
            let response=await http.post(url,obj);
            let {data}=response;
            window.alert("Details Successfully added");
            window.location="/home";
        }
        catch(ex){
            if(ex.response && ex.response.status===400)
            {   let Errors={};
                Errors.username=ex.response.data;
                this.setState({Errors:Errors})
            }
        }
        
    }
    handleSubmit=(e)=>
    {   e.preventDefault();
        let{id}=this.props.match.params;
        const {user}=this.state;
        console.log(user)
        this.postData(`/customerDetails`,user);
    }
    isValid=(errors)=>
    {   let keys=Object.keys(errors);
        let count=keys.reduce((acc,curr)=>(errors[curr]?acc+1:acc),0);
        return count===0;
    }
    validateAll=()=>
    {   let {gender,addressLine1,state,city,dob,PAN}=this.state.user;
        let errors={};
        errors.gender=this.validategender(gender);
        errors.addressLine1=this.validateaddressLine1(addressLine1);
        errors.state=this.validatestate(state);
        errors.city=this.validatecity(city);
        errors.dob=this.validatedob(dob);
        errors.PAN=this.validatePAN(PAN);
       return errors;
    }
    isFormValid=()=>
    {   let errors=this.validateAll();
        return this.isValid(errors);
    }
    handleValidate=(e)=>
    {   //only the field which the event has bee fired
        let {currentTarget:input}=e;
        let s1={...this.state}
        switch(input.name)
        {   case "gender":s1.errors.gender=this.validategender(input.value);
            break;
            case "addressLine1":s1.errors.addressLine1=this.validateDesc(input.value);
            break;
            case "state":s1.errors.state=this.validateProd(input.value);
            break;
            case "city":s1.errors.city=this.validatecity(input.value);
            break;
            case "dob":s1.errors.state=this.validatedob(input.value);
            break;
            case "PAN":s1.errors.city=this.validatePAN(input.value);
            break;
            default:
            break;
        }this.setState(s1)

    }
    validategender=(gender)=>
       !gender?
        "Gender must be Entered"
        :"";
    validateaddressLine1=(addressLine1)=>
       !addressLine1?
        "Address must be Entered"
        :"";
    validatestate=(state)=>
       !state?
        "Name must be Entered"
        :"";
    validatecity=(city)=>
       !city?
        "City must be Entered"
        :"";
    validatedob=(dob)=>
        !dob?
         "Date of Birth must be Entered"
         :"";
     validatePAN=(PAN)=>
        !PAN?
         "PAN must be Entered"
         :"";
    handleSDate=(date)=>
    {   let s1={...this.state};
        s1.user.dob=date;
        this.setState(s1);
    }
    makeR=(arr,value,name)=>
     (  <div className="row m-0 p-0">
            {arr.map((d1)=>(
            <div className="col-3">
                <input
                    type="radio"
                    className="form-radio-input"
                    name={name}
                    value={d1}
                    checked={value===d1?d1:false}
                    onChange={this.handleChange}
                    />
                <span>{d1}</span>
            </div>
            ))}
        </div> 
    )
    makeDrop=(arr,value,name,lable)=>
     (  <div className="row roundes m-2">
            <select 
            className="form-control"
            name={name}
            value={value}
            onChange={this.handleChange}
            >
                <option value="">{lable}</option>
                {arr.map((opt,index)=>(
                    <option onChange={()=>this.props.onSort(index)}>{opt}</option>
                ))}
            </select>
        </div>
    )
    getDifferentValue=(arr,name)=>
       arr.reduce((acc,curr)=>
       acc.find(val=>val===curr[name])?acc:[...acc,curr[name]],[])

    render()
    {   let{state,city,gender,addressLine1,dob,PAN,garbage}=this.state.user;
        let{Errors=null,errors,genders,data,addressData}=this.state;
        let states=this.getDifferentValue(addressData,"stateName");
        let cities=state?addressData.find(s1=>s1.stateName===state).cityArr:[];
        let sDay={};
        if(dob)
        {let arr1=dob.split("-");
        sDay={sd:arr1[0],sm:arr1[1],sy:arr1[2]};}
        return(
            <div className="container">
                <div className="container bg-light">
                    <h1 className="text-center">Customer Details</h1>
                        <div className="row">
                            <div className="col-3 m-0 p-0">Gender<span className="required-field"></span></div>
                            <div className="col-6">
                                {this.makeR(genders,gender,"gender")}
                            </div>
                        </div><br/>
                        <div className="row"><div>Date of Birth<span className="required-field"></span></div></div>
                        <div className="row">
                                <SDay sDay={dob?sDay:{}} onChange={this.handleSDate}/>
                        </div><br/>
                        <div className="row"><div>PAN<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="PAN"
                                    name="PAN"
                                    value={PAN}
                                    onChange={this.handleChange}
                                    />
                                </div>
                        </div><br/>
                        <div className="row">Address</div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="addressLine1"
                                        name="addressLine1"
                                        value={addressLine1}
                                        onChange={this.handleChange}
                                        />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="garbage"
                                        name="garbage"
                                        value={garbage}
                                        onChange={this.handleChange}
                                        />
                                </div>
                            </div>
                        </div><br/>
                        <div className="row">
                            <div className="col-6">
                                State<span className="required-field"></span>
                                {this.makeDrop(states,state,"state","Select State")}
                            </div>
                            <div className="col-6">
                                <div>City<span className="required-field"></span></div>
                                {this.makeDrop(cities,city,"city","Select City")}
                            </div>
                        </div>
                        <br/>
                        <h1 className="text-center mt-1"><button className="btn btn-primary" onClick={this.handleSubmit} disabled={!this.isFormValid()}>Add</button></h1>
                </div>
            </div>
            
        )

    }

}export default CustDetail;
