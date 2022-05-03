import React,{Component} from "react";
import http from "./services/httpService";
import auth from "./services/authServices.js";
import SDay from "./date";
class NomDetail extends Component
{   state=
    {   user:{name:"",nomineeName:"",gender:"",dob:"",relationship:"",jointsignatory:""},
        errors:[],
        genders:["Male","Female"],
    }
    async getData()
    {   let username=auth.getUser().name;
        let response1=await http.get(`/getNominee/${username}`);
        console.log(response1)
        if(response1.data)
        {   this.setState({user:response1.data});}
        else
        {   let user={name:username,nomineeName:"",gender:"",dob:"",relationship:"",jointsignatory:""};
            this.setState({user:user});
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
        if(input.type==="checkbox")
        s1.user[input.name]=input.checked;
        else
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
        this.postData(`/nomineeDetails`,user);
    }
    isValid=(errors)=>
    {   let keys=Object.keys(errors);
        let count=keys.reduce((acc,curr)=>(errors[curr]?acc+1:acc),0);
        return count===0;
    }
    validateAll=()=>
    {   let {nomineeName,gender,dob,relationship,jointsignatory}=this.state.user;
        let errors={};
        errors.gender=this.validategender(gender);
        errors.nomineeName=this.validatenomineeName(nomineeName);
        errors.relationship=this.validaterelationship(relationship);
        errors.dob=this.validatedob(dob);
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
            case "nomineeName":s1.errors.nomineeName=this.validateDesc(input.value);
            break;
            case "relationship":s1.errors.relationship=this.validaterelationship(input.value);
            break;
            case "dob":s1.errors.state=this.validatedob(input.value);
            break;
            default:
            break;
        }this.setState(s1)

    }
    validategender=(gender)=>
       !gender?
        "Gender must be Entered"
        :"";
    validatenomineeName=(nomineeName)=>
       !nomineeName?
        "Address must be Entered"
        :"";
    validaterelationship=(relationship)=>
       !relationship?
        "relationship must be Entered"
        :"";
    validatedob=(dob)=>
        !dob?
         "Date of Birth must be Entered"
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
    render()
    {   let{nomineeName,gender,dob,relationship,jointsignatory}=this.state.user;
        let{Errors=null,errors,genders}=this.state;
        let sDay={};
        if(dob)
        {let arr1=dob.split("-");
        sDay={sd:arr1[0],sm:arr1[1],sy:arr1[2]};}
        return(
            <div className="container">
                <div className="container bg-light">
                    <h1 className="text-center">Nominee Details</h1>
                        <div className="row"><div>Nominee Name<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="nomineeName"
                                    name="nomineeName"
                                    value={nomineeName}
                                    onChange={this.handleChange}
                                    />
                                </div>
                        </div><br/>
                        <div className="col-3 m-0 p-0">Gender<span className="required-field"></span></div>
                            <div className="col-6">
                                {this.makeR(genders,gender,"gender")}
                            </div>
                        </div><br/>
                        <hr/>
                       <div className="row"><div>Date of Birth<span className="required-field"></span></div></div>
                        <div className="row">
                                <SDay sDay={dob?sDay:{}} onChange={this.handleSDate}/>
                        </div><br/>
                        <hr/>
                        <div className="row"><div>Relationship<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="relationship"
                                    name="relationship"
                                    value={relationship}
                                    onChange={this.handleChange}
                                    />
                                </div>
                        </div><br/>
                        <div className="row"><div>jointsignatory<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                    <input
                                    type="checkbox"
                                    className="form-group"
                                    id="jointsignatory"
                                    name="jointsignatory"
                                    checked={jointsignatory}
                                    onChange={this.handleChange}
                                    />
                                </div>
                        </div><br/>
                        <h1 className="text-center mt-1"><button className="btn btn-primary" onClick={this.handleSubmit} disabled={!this.isFormValid()}>Add</button></h1>
                </div>
            
        )

    }

}export default NomDetail;
