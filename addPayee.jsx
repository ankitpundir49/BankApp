import React,{Component} from "react";
import http from "./services/httpService";
import auth from "./services/authServices.js";
import SDay from "./date";
class AddPayee extends Component
{   state=
    {   user:{name:"",payeeName:"",bankName:"",IFSC:"",accNumber:"",type:""},
        types:["Same Bank","Other Bank"],
        errors:[],
        banks:[],
    }
    async getData()
    {   let username=auth.getUser().name;
        let response=await http.get(`/getBanks`);
        let user={name:username,payeeName:"",bankName:"",IFSC:"",accNumber:"",type:""};
        this.setState({user:user,banks:response.data});
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
        this.handleValidate(e)
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
        this.postData(`/addPayee`,user);
    }
    isValid=(errors)=>
    {   let keys=Object.keys(errors);
        let count=keys.reduce((acc,curr)=>(errors[curr]?acc+1:acc),0);
        return count===0;
    }
    validateAll=()=>
    {   let {payeeName,bankName,IFSC,accNumber,type}=this.state.user;
        let errors={};
        errors.payeeName=this.validatepayeeName(payeeName);
        errors.type=this.validatetype(type);
        errors.accNumber=this.validateaccNumber(accNumber);
        if(type&&type==="Other Bank")
        {   errors.bankName=this.validatebankName(bankName);
            errors.IFSC=this.validateIFSC(IFSC);
        }
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
        {   case "payeeName":s1.errors.payeeName=this.validatepayeeName(input.value);
            break;
            case "bankName":s1.errors.bankName=this.validatebankName(input.value);
            break;
            case "IFSC":s1.errors.IFSC=this.validateIFSC(input.value);
            break;
            case "accNumber":s1.errors.accNumber=this.validateaccNumber(input.value);
            break;
            case "type":s1.errors.type=this.validatetype(input.value);
            break;
            default:
            break;
        }this.setState(s1)

    }
    validatepayeeName=(payeeName)=>
       !payeeName?
        "payeeName must be Entered"
        :"";
    validatebankName=(bankName)=>
       !bankName?
        "Address must be Entered"
        :"";
    validateIFSC=(IFSC)=>
       !IFSC?
        "IFSC must be Entered"
        :IFSC.length<5||IFSC.length>5?
        "Must be 5 Digit"
        :"";
    validateaccNumber=(accNumber)=>
        !accNumber?
         "accNumber must be Entered"
         :accNumber.length<11||accNumber.length>11?
        "11 Digit Number"
        :"";
    validatetype=(type)=>
        !type?
         "Bank Type must be Entered"
         :"";
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
                    onBlur={this.handleValidate}
                    />
                <span>{d1}</span>
            </div>
            ))}
        </div> 
    )
    makeDrop=(arr,value,name,lable)=>
     (  <div className="row roundes">
            <select 
            className="form-control"
            name={name}
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
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
    {   let{payeeName,bankName,IFSC,accNumber,type}=this.state.user;
        let{Errors=null,errors,banks,types}=this.state;
        return(
            <div className="container">
                <h1 className="text-center">Add Payee</h1>
                        <div className="row"><div>Payee Number<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="payeeName"
                                        name="payeeName"
                                        value={payeeName}
                                        placeholder="Enter Payee Number"
                                        onChange={this.handleChange}
                                        onBlur={this.handleValidate}
                                        />
                                    </div>
                                {errors.payeeName?<span className="text-danger">{errors.payeeName}</span>:""}
                        </div><hr/>
                        
                        <div className="row"><div>Acc. Number<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="accNumber"
                                    name="accNumber"
                                    value={accNumber}
                                    placeholder="Enter accNumber"
                                    onChange={this.handleChange}
                                    onBlur={this.handleValidate}
                                    />
                                </div>
                                {errors.accNumber?<span className="text-danger">{errors.accNumber}</span>:""}
                        </div><hr/>
                        
                        <div className="row m-0 p-0">
                            {this.makeR(types,type,"type")}
                            {errors.type?<span className="text-danger">{errors.type}</span>:""}
                        </div><hr/>
                        
                        {type==="Other Bank"?
                        <React.Fragment>
                           <div className="row"><div>IFSC Code<span className="required-field"></span></div></div>
                            <div className="row">
                                    <div className="form-group">
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="IFSC"
                                        name="IFSC"
                                        value={IFSC}
                                        placeholder="Enter IFSC"
                                        onChange={this.handleChange}
                                        onBlur={this.handleValidate}
                                        />
                                    </div>
                                    {errors.IFSC?<span className="text-danger">{errors.IFSC}</span>:""}
                            </div><hr/>
                            
                            <div className="row"><div>Bank Name<span className="required-field"></span></div></div>
                            <div className="row m-0 p-0">
                                {this.makeDrop(banks,bankName,"bankName","Select Bank")}
                                {errors.bankName?<span className="text-danger">{errors.bankName}</span>:""}
                            </div><hr/> 
                        </React.Fragment>
                        :""}
                        <br/>
                        <h1 className="text-center mt-1"><button className="btn btn-primary" onClick={this.handleSubmit} disabled={!this.isFormValid()}>Add</button></h1>
                </div>
        )

    }

}export default AddPayee;
