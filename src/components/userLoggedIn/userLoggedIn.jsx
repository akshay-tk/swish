import React, { Component } from 'react'
import UserNavBar from './userNavBar/userNavBar'
import Nav from '../nav/Nav'
import NewOrder from './newOrder/newOrder'
import UserProfile from './userProfile/userProfile'
import ActiveOrders from './activeOrder/activeOrder'
import PastOrders from './pastOrders/pastOrder'
import './userLoggedIn.css'
export default class userLoggedIn extends Component {
    constructor(props) {
        super(props)
        this.state = { activePage: "new-order" }
        this.updateActivePage = this.updateActivePage.bind(this);
    }
    componentDidMount(){
        if(!localStorage.getItem('token')){
            window.location="/login"
        }
        if(this.props.location.state){
            this.setState({activePage:this.props.location.state.state})
        }
    }
    updateActivePage(event){
        console.log(event.target.id)
        this.setState({activePage:event.target.id})
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Nav type="logged-in"  {...this.props}/>
                <div  className="user-container">
                <div><UserNavBar updateActivePage={this.updateActivePage}/></div>
                <div className="active-container">{this.state.activePage==="new-order" && <NewOrder {...this.props}/>}
                {this.state.activePage==="my-profile" && <UserProfile {...this.props}/>}
                {this.state.activePage==="past-orders" && <PastOrders/>}
                {this.state.activePage==="active-orders" && <ActiveOrders/>}</div>
                </div> 
            </div>
        )
    }
}
