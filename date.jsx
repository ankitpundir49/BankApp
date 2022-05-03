import React,{Component} from "react";
class SDay extends Component
{   state=
    {   sDay:this.props.sDay,
        months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    
    }
    handleChange=(e)=>
    {   const {currentTarget:input}=e;
        let s1={...this.state};
        s1.sDay[input.name]=input.value;
        this.setState(s1);
        console.log(s1.sDay);
        if(this.isValid(s1.sDay))
        {   let sDate=s1.sDay.sd+"-"+s1.sDay.sm+"-"+s1.sDay.sy;
            this.props.onChange(sDate);
        }
    }
    isValid=(pr1)=>
    {   if(pr1.sy!=""&&pr1.sm!=""&&pr1.sd!="")
        return true;
    }
    Range =(startYear,endYear)=> 
    {   let years = [];
        while ( startYear<= endYear ) 
         {
             years.push(startYear++);
        }   
        return years;
    }
    render()
    {   let{sd,sm,sy}=this.props.sDay;
        let{months}=this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <select className="col-4 form-select" name="sy" value={sy} onChange={this.handleChange}>
                            <option disabled value="">Select Year</option>
                            {this.Range(1900,2021).map((st)=>(<option>{st}</option>))}
                        </select>
                    </div>
                    <div className="col-4">
                        <select className="col-4 form-select" name="sm" value={sm} onChange={this.handleChange}>
                            <option disabled value="">Select Month</option>
                            {months.map((st)=>(<option>{st}</option>))}
                        </select>
                    </div>
                    <div className="col-4">
                        <select className="col-4 form-control" name="sd" value={sd} onChange={this.handleChange} >
                            <option disabled value="">Select Day</option>
                            {sy%4===0&&sy%400&&sm==="February"?this.Range(1,29).map((st)=>(<option>{st}</option>)):sm==="February"?this.Range(1,28).map((st)=>(<option>{st}</option>)):months.findIndex(st=>st===sm)%2?this.Range(1,30).map((st)=>(<option>{st}</option>)):this.Range(1,31).map((st)=>(<option>{st}</option>))}
                        </select>
                    </div>
                </div>
            </div>
        )

    }

}export default SDay;
                           
                            
                            
                            