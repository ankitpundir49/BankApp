import React,{Component} from "react";
import http from "./services/httpService";
import auth from "./services/authServices.js";
import SDay from "./date";
class NetBanking extends Component
{   state=
    {   user:{name:"",payeeName:"",bankName:"",comment:"",amount:""},
        errors:[],
        data:[],
    }
    async getData()
    {   let username=auth.getUser().name;
        let response=await http.get(`/getPayees/${username}`);
        let s1={...this.state};
        let user={name:username,payeeName:"",bankName:"",comment:"",amount:""};
        this.setState({user:user,data:response.data});
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
        let person=s1.data.find(st=>st.payeeName===s1.user.payeeName);
        s1.user["bankName"]=person.bankName;
        console.log(person)
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
        this.postData(`/postNet`,user);
    }
    isValid=(errors)=>
    {   let keys=Object.keys(errors);
        let count=keys.reduce((acc,curr)=>(errors[curr]?acc+1:acc),0);
        return count===0;
    }
    validateAll=()=>
    {   let {payeeName,bankName,comment,amount}=this.state.user;
        let errors={};
        errors.payeeName=this.validatepayeeName(payeeName);
        errors.comment=this.validatecomment(comment);
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
        {   case "payeeName":s1.errors.payeeName=this.validatepayeeName(input.value);
            break;
            case "comment":s1.errors.comment=this.validatecomment(input.value);
            break;
            case "amount":s1.errors.comment=this.validateamount(input.value);
            break;
            default:
            break;
        }this.setState(s1)

    }
    validatepayeeName=(payeeName)=>
       !payeeName?
        "payeeName must be Entered"
        :"";
    validatecomment=(comment)=>
       !comment?
        "comment must be Entered"
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
    {   let{payeeName,comment,amount}=this.state.user;
        let{Errors=null,errors,data}=this.state;
        let names=this.getDifferentValue(data,"payeeName")
        return(
            <div className="container">
                <h1 className="text-center">Net Banking Details</h1>
                    
                        <div className="row"><div>Payee Name<span className="required-field"></span></div></div>
                        <div className="row m-0 p-0">
                            {this.makeDrop(names,payeeName,"payeeName","Select Name")}
                            {errors.payeeName?<span className="text-danger">{errors.payeeName}</span>:""}
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
                        
                        <div className="row"><div>comment<span className="required-field"></span></div></div>
                        <div className="row">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="comment"
                                    name="comment"
                                    value={comment}
                                    placeholder="Enter comment"
                                    onChange={this.handleChange}
                                    onBlur={this.handleValidate}
                                    />
                                </div>
                                {errors.comment?<span className="text-danger">{errors.comment}</span>:""}
                        </div><hr/>
                        <br/>
                        <h1 className="text-center mt-1"><button className="btn btn-primary" onClick={this.handleSubmit} disabled={!this.isFormValid()}>Add</button></h1>
                </div>
        )

    }

}export default NetBanking;
