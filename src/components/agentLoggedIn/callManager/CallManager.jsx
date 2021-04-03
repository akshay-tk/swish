import React, { Component } from 'react';
import Nav from '../../nav/Nav';
import './CallManager.css';
import axios from 'axios'
import callIcon from "../../../resources/phone.png"

class CallManager extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }





    render() {
        return (
            <React.Fragment>
                    <div className="call-manager">
                        <h3>
                            Call Manager
                        </h3>
                        <a href={'tel:7846189877'}> <i class="fa fa-phone fa-2x " aria-hidden="true"></i></a>
                    </div>

            </React.Fragment>
        )
    }


}

export default CallManager