import React, { Component } from 'react'
import './orderConfirmation.css';
import Nav from '../../../nav/Nav';
import UserNavBar from '../../userNavBar/userNavBar'
import Confirmation from '../../../../resources/confirmation.svg'
export default class OrderConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state={state:""}
    }
    render() {
        return (
            <React.Fragment>
                <Nav  type="logged-in" />
                <div className="order-confirmation-container">
                    <div className="message-button-wrapper">
                    <div className="section-header">
                        Order Confirmed!
                    </div>
                    <div>
                        <button id="new-order-button" 
                        onClick={(e) => { 
                            e.preventDefault();
                            this.props.history.push("/user",{state:"active-orders"})}} >
                            TRACK MY ORDER
                        </button>
                    </div>
                    <div>
                        <button id="new-order-button" onClick={(e) => { e.preventDefault(); this.props.history.push("/user",{state:"new-order"})}} >PLACE A NEW ORDER</button>
                    </div>
                    <div>
                        <button id="new-order-button" onClick={(e) => { e.preventDefault();  this.props.history.push("/user",{state:"my-profile"})}} >GO TO DASHBOARD</button>
                    </div>
                    </div>
                    <div className="confirmation-image">
                        <img src={Confirmation}/>
                    </div>
                </div>
            </React.Fragment >

        )
    }
}
