import React, {Component} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import './LoggedInAdmin.css'
import AdminNavBar from './AdminNavBar';

import ManageRequests from './ManageRequests/ManageRequests';
import RemoveAgent from './RemoveAgent';
import RemoveUser from './RemoveUser'
import Nav from '../../components/nav/Nav'
class LoggedInAdmin extends Component{
    constructor(props){
        super(props);
            this.state = { activeComponent: "manage-requests" };
        }
        componentDidMount=()=>{
            if(!localStorage.getItem('token')){
                window.location="/login"
            }
        }
         updateActiveComponent=(event)=>{
            console.log(event.target.id)
            this.setState({activeComponent:event.target.id})
        }

render(){
    
    return(      
        <div >  
            <Nav type="logged-in" {...this.props}/>
            <div className="logged-in-admin-wrapper">
            <div >
            <AdminNavBar updateActiveComponent={this.updateActiveComponent}/>
            </div> 
            <div className="flex-container"> 
            {this.state.activeComponent==="manage-requests" && <ManageRequests/>}
            {this.state.activeComponent==="manage-users" && <RemoveUser />}
            {this.state.activeComponent==="manage-agents" && <RemoveAgent />} </div>
            </div>
            
           
      
        </div>
    )
    }
}
export default LoggedInAdmin;