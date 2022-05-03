import React,{Component}from"react";
import http from "./services/httpService.js";
import auth from "./services/authServices.js";
import queryString from "query-string";
import { Link } from "react-router-dom";
class Customer extends Component
{   state={ data:[],
        };
async fetchData()
    {   let queryParams=queryString.parse(this.props.location.search)
        let searchStr=this.makeSearchString(queryParams);
        console.log(queryParams,searchStr)
        let response=await http.get(`/getCustomers?${searchStr}`);
        console.log(response)
        let {data}=response;
        this.setState({data:data.items,page:data.page,totalItems:data.totalItems,totalNum:data.totalNum});

    }
componentDidMount()
    {   this.fetchData();
    }
componentDidUpdate(prevProps,prevState)
    {   if(prevProps!==this.props) this.fetchData();
    }
handlePage=(incr)=>
    {   let queryParams=queryString.parse(this.props.location.search)
        let{page="1"}=queryParams; 
        let newPage= +page + incr;
        queryParams.page=newPage;
        this.callURL("/allCustomers",queryParams);
    }
    callURL=(url,options)=>
    {   let searchString=this.makeSearchString(options);
        this.props.history.push({
            pathname:url,
            search:searchString,
        })
        return searchString;
    }
    addToQueryString=(str,paramName,paramValue)=>
       paramValue?
            str?
                `${str}&${paramName}=${paramValue}`
                :`${paramName}=${paramValue}`
            :str;

    
    makeSearchString=(options)=>
    {   let {page}=options;
        let searchStr="";
        searchStr=this.addToQueryString(searchStr,"page",page);
        return searchStr;
    }
detailUser=(id)=>
{   console.log(id);
    this.props.history.push(`/admin/viewemps/${id}`)

}

    render()
    {   const{data,page,totalItems,totalNum}=this.state;
        const user=auth.getUser();
        let startIndex = (page - 1) *5;
        return(
        <div className="container">
        <h4>Welcome</h4>
            <h6>{startIndex+1}-{startIndex+totalItems} of {totalNum}</h6>
            <div className="row">
                <div className="col-2 border">Name</div>
                <div className="col-2 border">State</div>
                <div className="col-2 border">City</div>
                <div className="col-3 border">PAN</div>
                <div className="col-3 border">DOB</div>
            </div>
          {data.map((st,index)=>(
                <div className={index%2?"row":"row bg-light"} key={st.username}>
                        <div className="col-2 border">{st.name}</div>
                        <div className="col-2 border">{st.state}</div>
                        <div className="col-2 border">{st.city}</div>
                        <div className="col-3 border">{st.PAN}</div>
                        <div className="col-3 border">{st.dob}</div>
                    </div>
            ))}
             <div className="row">
                            <div className="col-2">
                                {startIndex>1?(
                                <button 
                                    className="btn btn-secondary btn-sm m-1" 
                                    onClick={()=>this.handlePage(-1)}>
                                    Prev
                                </button>):("")}
                            </div>
                            <div className="col-8"></div>
                            <div className="col-2">
                                {""}
                                {startIndex+totalItems<totalNum?
                                <button className="btn btn-secondary btn-sm m-1"
                                    onClick={()=>this.handlePage(1)}>Next
                                </button>
                                :""}
                            </div>
                </div> 
        </div>
        );

    }

}export default Customer;