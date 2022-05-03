import React,{Component} from "react";
import http from "./services/httpService";
class AddCust extends Component
{   state=
    {   user:{name:"",password:"",pass:""},
        errors:[],
        alert1:"",
        edit:false,
    }
    async getData()
    {  let{edit}=this.state;
        if(edit)
        {   this.setState({user:this.state.user,edit:true});}
        else
        {   let user={name:"",password:"",pass:""};
            this.setState({user:user,edit:false});
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
        this.handleValidate(e)
    }
    async postData(url,obj)
    {   try{   
            let response=await http.post(url,obj);
            let {data}=response;
            this.state.edit=true;
            window.alert("Employee Successfully added");
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
        const {user,edit}=this.state;
        let errors=this.validateAll();
        if(this.isValid(errors))
        {   this.postData(`/register`,user);
        }
        else
        {   let s1={...this.state};
            s1.errors=errors;
            this.setState(s1);
        }
        
    }
    isValid=(errors)=>
    {   let keys=Object.keys(errors);
        let count=keys.reduce((acc,curr)=>(errors[curr]?acc+1:acc),0);
        return count===0;
    }
    validateAll=()=>
    {   let {password,name,pass}=this.state.user;
        let errors={};
        errors.pass=this.validatePass(pass);
        errors.password=this.validatePassword(password);
        errors.name=this.validateName(name);
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
        {   case "name":s1.errors.name=this.validateName(input.value);
            break;
            case "password":s1.errors.password=this.validatePassword(input.value);
            break;
            case "pass":s1.errors.username=this.validatePass(input.value);
            break;
            default:
            break;
        }this.setState(s1)

    }
    validatePassword=(password)=>
       !password?
        "password must be Entered"
        :password.length<6
        ?"password should have minimum 6"
        :!this.checkPass(password)?
        "Password must have 1 Upper Case ,1 Lowwer Case ,1 digit"
        :"";
    validateName=(name)=>
       !name?
        "Name must be Entered"
        :!name.length>7?
        "Name must have 8 strs"
        :"";
    validatePass=(pass)=>
        pass!==this.state.user.password?
         "Not a valid Email"
         :"";
    checkPass=(str)=>
    {   let ch;
        let capitalFlag = false;
        let lowerCaseFlag = false;
        let numberFlag = false;
        for(let i=0;i <str.length;i++) 
        {   ch = str.charAt(i);
            if (ch>="A" && ch<="Z") 
            {   capitalFlag = true;
            } 
            else if (ch>="a" && ch<="z") 
            {   lowerCaseFlag = true;
            }
            else if(ch>="0"||ch<="9") 
            {   numberFlag = true;
            }
            if(numberFlag && capitalFlag && lowerCaseFlag)
                return true;
        }
        return false;

    }
    render()
    {   let{name,password,pass}=this.state.user;
        console.log(this.state.user)
        let{Errors=null,errors,edit,alert1}=this.state;
        return(
            <div className="container">
                <h1 className="text-center">Welcome to Employee Management Portal</h1>
                <div className="container bg-light">
                        {edit?<h1 className="text-center text-success">{alert1}</h1>:""}
                            <div className="row">
                                Name:
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    onBlur={this.handleValidate}
                                    />
                                    {errors && errors.name && <span className="text-danger">{errors.name}</span>}
                                </div>
                            </div><br/>
                            <div className="row">
                                Password:
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    onBlur={this.handleValidate}
                                    />
                                </div>
                                {errors && errors.password && <span className="text-danger">{errors.password}</span>}
                            </div><br/>
                            <div className="row">
                                Confirm Password:
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <input
                                    type="password"
                                    className="form-control"
                                    id="pass"
                                    name="pass"
                                    value={pass}
                                    onChange={this.handleChange}
                                    />
                                </div>
                                {errors && errors.pass && <span className="text-danger">{errors.pass}</span>}
                            </div><br/>
                        <h1 className="mt-1"><button className="btn btn-primary" onClick={this.handleSubmit}>Create</button></h1>
                </div>
            </div>
            
        )

    }

}export default AddCust;
