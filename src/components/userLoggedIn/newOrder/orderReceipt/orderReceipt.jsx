import React, { Component } from 'react'
import axios from 'axios'
import uuid from 'react-uuid'
import './orderReceipt.css'
import Receipt from '../../../../resources/receipt.svg'
export default class OrderReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = { confirmStatus: true, taskId:uuid() };
    }
    componentDidMount() {
        let taskData = {
            pickUpAddress: this.props.value.pickupAddress,
            deliveryAddress: this.props.value.deliveryAddress
        }
        axios({
            url: "/home/price-calculation",
            data: taskData,
            method: "post",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                this.props.priceCalculator(res.data)
            })

    }

    handleClick = (e) => {
        e.preventDefault();
        let taskData2 = {
            taskId:this.state.taskId,
            customerId: localStorage.getItem("user"),
            pickUpAddress: this.props.value.pickupAddress,
            deliveryAddress: this.props.value.deliveryAddress,
            userPhoneNumber: this.props.value.userPhoneNumber,
            taskStatus: "Ordered",
            orderedTime: Date().toLocaleString(),
            taskDescription: this.props.value.text,
            deliveryCharge: this.props.value.price
        }
        let formData = new FormData();
        formData.append('file', this.props.value.file)
        if (this.props.value.file === "") {
            axios({
                url: "/home/user-text-task-submit",
                data: taskData2,
                method: "post",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => {
                    console.log("Task with text description added successfully")
                    this.props.history.push({
                        pathname: '/order-confirmed',
                        state: { detail: "hii" }
                    })
                })
        }
        else if (this.props.value.text === "") {
            axios({
                url: "/home/file-upload",
                data: formData,
                method: "post",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    let taskData1 = {
                        taskId:this.state.taskId,
                        customerId: localStorage.getItem("user"),
                        pickUpAddress: this.props.value.pickupAddress,
                        deliveryAddress: this.props.value.deliveryAddress,
                        userPhoneNumber: this.props.value.userPhoneNumber,
                        taskStatus: "Ordered",
                        orderedTime: Date().toLocaleString(),
                        fileAttachment: "src/main/java/com/dexlock/ft/dao/images/" + res.data + this.props.value.file.name,
                        deliveryCharge: this.props.value.price
                    }
                    axios({
                        url: "/home/task-submit",
                        data: taskData1,
                        method: "post",
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                        .then(response => {
                            console.log("Task with file uploaded successfully")
                            this.props.history.push({
                                pathname: '/order-confirmed',
                                state: "new-order"
                            })
                        }
                        )
                }
                )
        }
    }
    render() {
        return (
            <div className="receipt-container">
                <div className="section-header">
                    Confirm Order Details!
                </div>
                <div className="receipt-image-wrapper">
                <div className="receipt-wrapper">
                    <div className="task-description">
                        Task Description: <br /> {this.props.value.text === "" ? <div className="imgPreview"><img src={this.props.value.imagePreviewUrl} /></div> : (this.props.value.text)}
                    </div>  
                    <div className="price">
                        {!this.state.confirmStatus ?
                            <div> Invalid Address!</div> :
                            [(this.props.value.price > "10" ?
                                <div>Price : Rs. {this.props.value.price}/-</div> :
                                <div> Sorry we don't Deliver to your Address</div>)]}
                    </div>
                    <div className="phone-number">
                        <div>
                            Phone Number: {this.props.value.userPhoneNumber}
                        </div>
                    </div>
                   
                        <div>
                            Delivery Address: <br /> {this.props.value.deliveryAddress}
                        </div>
                        <div>
                            Pickup Address: <br /> {this.props.value.pickupAddress}
                        </div>
                   
                    </div>
                    <div className="receipt-image-container">
                            <img src={Receipt}/>
                        </div>
                </div>
                <div className="receipt-buttons">
                    <button type="back" onClick={this.props.comeBackButton} className="confirm-button">
                        BACK
                    </button>
                    <button disabled={(!this.state.confirmStatus) || (this.props.value.price < "10")} 
                    onClick={this.handleClick} 
                    className={`${(!this.state.confirmStatus) || (this.props.value.price < "10") ? "disabled-confirm": "confirm-button"}`}>
                        CONFIRM
                    </button>
                </div>
            </div>
        )
    }
}
