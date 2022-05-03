import React,{Component}from"react";
import { Link } from "react-router-dom";
class LeftPanel extends Component
{   state=
    {   bankList:["SBI", "ICICI", "HDFC", "AXIS", "DBS", "GBI"],
        amountList:["<10000", ">10000"],
    }
    handleChange=(e)=>
        {   let {currentTarget:input}=e;
            let options={...this.props.options};
            options[input.name]=input.value;
            console.log(options)
            options["page"]="1";
            this.props.onOptionChange(options);
        }
    makeR=(arr,value,name)=>
     (  <React.Fragment>
            {arr.map((d1)=>(
            <div className="row roundes border ">
                <div className="col-4 text-center">
                    <input
                    type="radio"
                    className="form-radio-input"
                    name={name}
                    value={d1}
                    checked={value===d1?d1:false}
                    onChange={this.handleChange}
                    />
                </div>
                <div className="col-4 text-center">{d1}</div>
            </div>))}
        </React.Fragment> 
    )
    render()
    {   let{options}=this.props;
        let {bank,amount,page}=options;
        let {bankList,amountList}=this.state;
        return(
            <div className="container">
                <div className="container">
                    <div className="row rounded border">
                        <p>Bank</p>
                    </div>
                    {this.makeR(bankList,bank,"bank")}
                </div><br/>
                <div className="container">
                    <div className="row rounded border">
                        <p>Amount</p>
                    </div>
                    {this.makeR(amountList,amount,"amount")}
                </div><br/>
            </div>
            
            )
    }

}export default LeftPanel;