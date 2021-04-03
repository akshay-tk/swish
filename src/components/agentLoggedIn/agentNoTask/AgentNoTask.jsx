import React, { Component } from 'react';
import './AgentNoTask.css';
import NotTask from '../../../resources/noTask.svg'

class AgentNoTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <React.Fragment>
                <div className="agent-no-task-image-wrapper">
                <div className="agent-no-task">
                    <h2>No tasks assigned to you. Please wait!</h2>
                </div>
                    <div className="no-task-picture">
                        <img src={NotTask}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }


}

export default AgentNoTask