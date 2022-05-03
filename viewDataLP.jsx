import React,{Component}from"react";
import http from "./services/httpService.js";
import auth from "./services/authServices.js";
import queryString from "query-string";
import { Link } from "react-router-dom";
import LeftPanel from "./leftPanel.jsx";
class DataV extends Component
{   state={ data:[],
        };
async fetchData()
    {   let queryParams=queryString.parse(this.props.location.search)
        let searchStr=this.makeSearchString(queryParams);
        let{page="1"}=queryParams;
        console.log(queryParams,searchStr,this.props.type)
        let response=await http.get(`/getAllCheques?${searchStr}`);
            let {data}=response;
            console.log(response)
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
        this.callURL("/allCheque",queryParams)
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
    {   let {page,bank,amount}=options;
        let searchStr="";
        searchStr=this.addToQueryString(searchStr,"page",page);
        searchStr=this.addToQueryString(searchStr,"bank",bank);
        searchStr=this.addToQueryString(searchStr,"amount",amount);
        return searchStr;
    }
    detailUser=(id)=>
    {   console.log(id);
        this.props.history.push(`/admin/viewemps/${id}`)

    }
    handleOptionChange=(options)=>
    {   console.log(options)
        this.callURL("/allCheque",options)
    }

    render()
    {   let queryParams=queryString.parse(this.props.location.search)
        const{data,page,totalItems,totalNum}=this.state;
        const user=auth.getUser();
        let startIndex =(page-1) *5;
        console.log(data);
        return(
        <div className="row">
            <div className="col-3">
                <LeftPanel options={queryParams} onOptionChange={this.handleOptionChange}/>
            </div>
            <div className="col-9">
                <div className="container">
                <h4>Welcome</h4>
                <h6>{startIndex+1}-{startIndex+totalItems} of {totalNum}</h6>
                <div className="row">
                    <div className="col-2 border">Name</div>
                    <div className="col-2 border">Cheque Number</div>
                   <div className="col-2 border">Bank Name</div>
                    <div className="col-3 border">Branch</div>
                    <div className="col-3 border">Amount</div>
                </div>
                {data.map((st,index)=>(
                    <div className={index%2?"row":"row bg-light"} key={st.username}>
                            <div className="col-2 border">{st.name}</div>
                            <div className="col-2 border">{st.chequeNumber}</div>
                            <div className="col-2 border">{st.bankName}</div>
                            <div className="col-3 border">{st.branch}</div>
                            <div className="col-3 border">{st.amount}</div>
                        </div>
                ))}
                {console.log(startIndex)}
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
            </div>
        </div>
        );

    }

}export default DataV;