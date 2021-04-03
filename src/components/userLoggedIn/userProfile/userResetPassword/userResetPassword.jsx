import React, { Component } from 'react';
import './userResetPassword.css';
import axios from "axios";
import Password from '../../../../resources/passwordReset.svg'
import Notification from "../../../Notification/Notification"
const validPasswordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/i);

export default class UserResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "", newPassword: "",
            messageStatus: "", confirmNewPassword: "",
            passwordsMatch: true, showNotification: false,
            notificationMessage: "", notificationSeverity: ""
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ showNotification: false, notificationMessage: "", notificationSeverity: "" })
        if (this.state.confirmNewPassword === this.state.newPassword) {
            var length = this.state.newPassword.length;
            if (length > 7) {
                let
                    customerData = {
                        newPassword: this.state.newPassword,
                        userEmail: localStorage.getItem('user'),
                        password: this.state.currentPassword
                    }
                console.log(customerData)

                axios({
                    url: "/home/reset-password",
                    data: customerData,
                    method: "post",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then((response) => {
                        console.log(response)
                        if (response.data === "Password changed successfully") {
                            this.setState({ messageStatus: "E" })
                            this.setState({ showNotification: true, notificationMessage: "Password changed successfully", notificationSeverity: "success" })
                            setTimeout(() => { this.props.comeBack() }, 3000);
                        }
                        if (response.data === "Password doesn't match") {
                            this.setState({ showNotification: true, notificationMessage: "The current password is invalid", notificationSeverity: "error" })
                        }
                    })
                    .catch(function (err) {
                        this.setState({ showNotification: true, notificationMessage: "please check your network connection", notificationSeverity: "error" })
                        console.log(err);
                    });
            } else if (length < 8) { this.setState({ messageStatus: "G" }) }
        }
        else if (this.state.confirmNewpassword != this.state.newPassword) {
            this.setState({ messageStatus: "F" })
        }

    }
    showNotification = () => {
        if (this.state.showNotification)
            return <Notification message={this.state.notificationMessage} severity={this.state.notificationSeverity} />;
        else return null;
    }

    render() {
        return (
            <React.Fragment>
                {this.showNotification()}
                <div className="user-reset-password-caption-1">
                    Reset Password
                </div>
                <div className="password-image-wrapper">
                    <div className="user-reset-password-wrapper">
                        <form className="form-items-reset-password-1">
                            <label>
                                Current password:
                        <input
                                    type="Password"
                                    required
                                    name="currentPassword"
                                    value={this.state.currentPassword}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                New password:
                        <input
                                    type="Password"
                                    required
                                    name="newPassword"
                                    value={this.state.newPassword}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                Confirm new Password:
                        <input
                                    type="Password"
                                    required
                                    name="confirmNewPassword"
                                    value={this.state.confirmNewPassword}
                                    onChange={this.handleChange}
                                />
                            </label>
                            {this.state.messageStatus === "F" && <div className="signup-warning"> Password do not match</div>}
                            {this.state.messageStatus === "G" && <div className="signup-warning"> Password should contain atleast 8 characters</div>}
                            <div className="reset-button-container">
                                <input
                                    className="user-reset-button"
                                    type="submit"
                                    value="CONFIRM"
                                    onClick={this.handleSubmit}
                                />
                            </div>
                            <div className="user-reset-button-container">
                                <input
                                    className="user-reset-button"
                                    type="submit"
                                    value="CANCEL"
                                    onClick={this.props.comeBack}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="password-image-container">
                        <img src={Password} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

