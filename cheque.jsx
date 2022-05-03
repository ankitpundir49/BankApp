import React,{Component} from "react";
import http from "./services/httpService";
import auth from "./services/authServices.js";
import SDay from "./date";
class Cheque extends Component
{   state=
    {   user:{name:"",chequeNumber:"",bankName:"",branch:"",amount:""},
        errors:[],
        banks:[],
    }
    async getData()
    {   let username=auth.getUser().name;
        let response=await http.get(`/getBanks`);
        let user={name:username,chequeNumber:"",bankName:"",branch:"",amount:""};
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
        this.postData(`/postCheque`,user);
    }
    isValid=(errors)=>
    {   let keys=Object.keys(errors);
        let count=keys.reduce((acc,curr)=>(errors[curr]?acc+1:acc),0);
        return count===0;
    }
    validateAll=()=>
    {   let {chequeNumber,bankName,branch,amount}=this.state.user;
        let errors={};
        errors.chequeNumber=this.validatechequeNumber(chequeNumber);
        errors.bankName=this.validatebankName(bankName);
        errors.branch=this.validatebranch(branch);
        errors.amount=this.validateamount(amount);
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
        {   case "chequeNumber":s1.errors.chequeNumber=this.validatechequeNumber(input.value);
            break;
            case "bankName":s1.errors.bankName=this.validatebankName(input.value);
            break;
            case "branch":s1.errors.branch=this.validatebranch(input.value);
            break;
            case "amount":s1.errors.branch=this.validateamount(input.value);
            break;
            default:
            break;
        }this.setState(s1)

    }
    validatechequeNumber=(chequeNumber)=>
       !chequeNumber?
        "chequeNumber must be Entered"
        :chequeNumber.length<11||chequeNumber.length>11?
        "11 Digit Number"
        :"";
    validatebankName=(bankName)=>
       !bankName?
        "Address must be Entered"
        :"";
    validatebranch=(branch)=>
       !branch?
        "branch must be Entered"
        :branch.length<5||branch.length>5?
        "Must be 5 Digit"
        :"";
    validateamount=(amount)=>
        !amount?
         "amount must be Entered"
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
    {   let{chequeNumber,bankName,branch,amount}=this.state.user;
        let{Errors=null,errors,banks}=this.state;
        return(
            <div className="container">
                <h1 className="text-center">Deposit Cheque</h1>
                        <div className="row"><div>Cheque Number<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="chequeNumber"
                                        name="chequeNumber"
                                        value={chequeNumber}
                                        placeholder="Enter Cheque Number"
                                        onChange={this.handleChange}
                                        onBlur={this.handleValidate}
                                        />
                                    </div>
                                {errors.chequeNumber?<span className="text-danger">{errors.chequeNumber}</span>:""}
                        </div><hr/>
                        <div className="row"><div>Bank Name<span className="required-field"></span></div></div>
                        <div className="row m-0 p-0">
                            {this.makeDrop(banks,bankName,"bankName","Select Bank")}
                            {errors.bankName?<span className="text-danger">{errors.bankName}</span>:""}
                        </div><hr/>
                        <div className="row"><div>Branch Code<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="branch"
                                    name="branch"
                                    value={branch}
                                    placeholder="Enter Branch"
                                    onChange={this.handleChange}
                                    onBlur={this.handleValidate}
                                    />
                                </div>
                                {errors.branch?<span className="text-danger">{errors.branch}</span>:""}
                        </div><hr/>
                        <div className="row"><div>Amount<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                    value={amount}
                                    placeholder="Enter Amount"
                                    onChange={this.handleChange}
                                    onBlur={this.handleValidate}
                                    />
                                </div>
                                {errors.amount?<span className="text-danger">{errors.amount}</span>:""}
                        </div><hr/>
                        <br/>
                        <h1 className="text-center mt-1"><button className="btn btn-primary" onClick={this.handleSubmit} disabled={!this.isFormValid()}>Add</button></h1>
                </div>
        )

    }

}export default Cheque;
