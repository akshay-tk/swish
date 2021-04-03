import React from "react";
import './AgentNavBar.css';
import CloseButton from '../../../resources/close-button-png-30221.png'
import axios from "axios";
class agentNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        }
    }
    openNav = () => {
        document.getElementById("agentSidenav").style.width = "100vw";
    }
    closeNav = () => {
        document.getElementById("agentSidenav").style.width = "0";
    }
    handleResize = () =>{
        if(window.innerWidth > 863){
            document.getElementById("agentSidenav").style.width = "26vw";
        }
        if(window.innerWidth < 863){
            document.getElementById("agentSidenav").style.width = "0";
        }
    }
    componentDidMount() {
        window.addEventListener('resize',this.handleResize);
        let
            custData = {
                userEmail: localStorage.getItem('user')
            }
        axios({
            url: "/home/get-name",
            data: custData,
            method: "post",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => { this.setState({ userName: res.data }) })
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.handleResize)
    }

    render() {
        return (
            <React.Fragment>
                <div id="agentSidenav" className="agent-side-nav">
                <button className="closebutton" onClick={this.closeNav}> <img src={CloseButton} width="20px" height="auto" /></button>
                    <div className="agent-nav-header">
                        Hello {this.state.userName}!
                    </div>
                    <div className="agent-nav-nav-menu">
                        <a id="active-orders" className={this.props.agentActiveElement} onClick={this.props.updateActivePage}>Upcoming Orders</a>
                        <a id="past-orders" className={this.props.agentActiveElement} onClick={this.props.updateActivePage}>Orders Completed</a>
                        <a id="agent-profile" className={this.props.agentActiveElement} onClick={this.props.updateActivePage}>Agent Profile</a>
                    </div>
                </div>
                <div id="burger-menu">
                    <button id="burger-menu-button" onClick={this.openNav}><i class="fa fa-bars fa-2x" aria-hidden="true" width="100" height="100"></i></button>
                </div>
            </React.Fragment>
        )
    }
}

export default agentNavBar