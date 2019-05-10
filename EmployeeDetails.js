import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

class EmployeeDetails extends PureComponent {

    render() {

        return(<div>
            <div>
                <img src={this.props.url} alt="avatar"/>
            </div>
            <div>
                <span>ID:</span><span>{this.props.id}</span>
                <span>Name:</span><span>{this.props.name}</span>
            </div>
        </div>)
    }
}
const mapStateToProps = (state)=>{
    return {
        id: state.id,
        name: state.name,
        url: state.url
    }
}
export default connect(mapStateToProps)(EmployeeDetails)