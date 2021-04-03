import React, {Component} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import '../../LoggedInAdmins/LoggedInAdmin.css';


import AssignedCardDetails from './AssignedCardDetails';
import UnassignedCardDetails from './UnassignedCardDetails';


class ManageRequests extends Component{
    constructor(props){
        super(props);
        this.state={
            task:[],
            assignedTask:[],
            unassignedTask:[],
            isUassigned: true,
            activePage: 15
        }

        this.setFilterAssign=this.setFilterAssign.bind(this);
        this.setFilterUnassign=this.setFilterUnassign.bind(this);
        

    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }

    async componentDidMount(){
        this.setFilterUnassign();
      } 

      setFilterUnassign(){
      
        axios({
            url:"/home/unassigned-tasks",
            method:"get",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res=> {
                console.log(res.data)
          this.setState({ unassignedTask: res.data , isUassigned: true}) 
        }).catch(err=>{
            console.error(err);
        }
        )

      }
      setFilterAssign(){
        
        axios({
            url:"/home/assigned-tasks",
            method:"get",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res=> {
            console.log("assigned")
          this.setState({ assignedTask: res.data,isUassigned:false })
         
        }).catch(err=>{
            console.error(err);
        }
        )
    }

render(){
    return( 
<div className="admin-page-contents-main1">
    <div className="admin-page-contents1">
                <div className="admin-manage-heading1">
                    <p className="admin-manage-heading-text1">Requests</p>
                </div>
                <div className="admin-filter-tasks1">
                    <button className="filter-tasks-link1" onClick={this.setFilterUnassign}>Un-assigned</button>
                    <button className="filter-tasks-link1" onClick={this.setFilterAssign}>Assigned</button>        
                </div>
    </div>

    
            {this.state.isUassigned && <div class="request-cards-list-unassign1">
            <p className="card-request-subheading1">Un-assigned Requests</p>
            <div className="request-cards-scroll1">
                {this.state.unassignedTask.map(unassignedTask =>
                    <UnassignedCardDetails unassignedTask={unassignedTask}/>      
                )} 
            </div> 
            </div> }

        
      
            {!this.state.isUassigned && <div class="request-cards-list-assign1">
            <p className="card-request-subheading1">Assigned Requests</p>
            <div className="request-cards-scroll1">
                {this.state.assignedTask.map(assignedTask =>
                    <AssignedCardDetails assignedTask={assignedTask}/>      
                )}
            </div>  
            </div>}
</div>
    )
}
}

export default ManageRequests;
