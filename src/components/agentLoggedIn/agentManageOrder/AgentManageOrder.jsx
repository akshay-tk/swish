import React, { Component } from 'react';
import Nav from '../../nav/Nav';
import './AgentManageOrder.css';
import axios from 'axios'
import SlideToggle from "react-slide-toggle";




class AgentManageOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }





    render() {
        return (
            <React.Fragment>

                <SlideToggle
                    duration={800}
                    collapsed
                    render={({ onToggle, setCollapsibleElement, progress }) => (
                        <div className="toggle-collapsible">
                            <div class="single-request-card2">
                                {this.props.activePage ? <></> : <>
                                    <button type="button" className="request-card-task-number-button2" onClick={onToggle}>{this.props.taskDetails.customerId}<i class="fas fa-caret-down"></i></button>
                                    <div className="agent-task-response-btn">
                                        <button id="accept" taskDetails={
                                            this.props.taskDetails}
                                            onClick={this.props.updateActivePage
                                            }>Accept</button>
                                        <button id="reject" taskDetails={this.props.taskDetails} onClick={this.props.updateActivePage}>Reject</button>
                                    </div>
                                </>}



                            </div>

                            <div className="toggle-collapsible__content" ref={setCollapsibleElement}>
                                <div
                                    className="toggle-collapsible__content-inner"
                                    style={{
                                        transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
                                    }}
                                >
                                    <p>Task Id : {this.props.taskDetails.taskId}</p>
                                    <p>Pick Up Address : {this.props.taskDetails.pickUpAddress}</p>
                                    <p>Delivery Address : {this.props.taskDetails.deliveryAddress}</p>
                                    <p>Delivery Charge : {this.props.taskDetails.deliveryCharge}</p>


                                </div>
                                <div>
                                    <button type="button" className="request-card-close-button" onClick={onToggle}>Roll Up</button>
                                </div>

                            </div>

                        </div>
                    )}
                />


            </React.Fragment>
        )
    }


}

export default AgentManageOrder