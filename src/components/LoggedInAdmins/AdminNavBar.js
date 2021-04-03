import { render } from '@testing-library/react';
import React, {Component} from 'react';
import CloseButton from '../../resources/close-button-png-30221.png'


import './AdminNavBar.css'


class AdminNavBar extends Component{
    constructor(props){
        super(props);
        this.state={
            activeElement: "manage-users",
            isOpen:false
        }
     
    }
    openAdminNav = () => {
        document.getElementById("adminSideNav").style.width = "100vw";
    }
    closeAdminNav = () => {
        document.getElementById("adminSideNav").style.width = "0";
    }
    handleResize = () =>{
        if(window.innerWidth > 600){
            document.getElementById("adminSideNav").style.width = "20vw";
        }
        if(window.innerWidth < 600){
            document.getElementById("adminSideNav").style.width = "0";
        }

    }
    componentDidMount(){
        window.addEventListener('resize',this.handleResize)
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.handleResize)
    }
 
render(){
    return(
        
        <React.Fragment>
            <div  className="side-nav-bar-container" id="adminSideNav">
            <button className="closebutton" onClick={this.closeAdminNav}> <img src={CloseButton} width="20px" height="auto" /></button>
                    <div className="admin-sidebar-links">
                    {/* <div className="admin-profile-pic-and-name"> */}
                        <div className="admin-profile-pic"  alt="admin-icon" ></div> 
                        <a href="" className="admin-profile-name"> Hello Admin!</a>
                    {/* </div>    */}
                    
                        <a id="manage-requests"  className="admin-sidebar-link-text" onClick={this.props.updateActiveComponent}>Manage Requests</a>
                        <a id="manage-users" className="admin-sidebar-link-text" onClick={this.props.updateActiveComponent}>Manage Users</a>
                        <a id="manage-agents" className="admin-sidebar-link-text" onClick={this.props.updateActiveComponent}>Manage Agents</a>
                    </div>
            </div>
            <div id="admin-burger-menu">
                <button  id="admin-burger-menu-button" onClick={this.openAdminNav}><i class="fa fa-bars fa-2x" aria-hidden="true"  width="100" height="100"></i></button>
            
            </div>
            </React.Fragment>
        
    )
}
}

export default AdminNavBar;