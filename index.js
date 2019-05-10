import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import EmployeeDetails from './EmployeeDetails';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {getEmployeeDetail} from './actions'

const initialState = {
    isLoading: false,
    id: '',
    name: '',
    url:''
}

//const GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS';


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_DETAILS_BEGIN':
            return {
                ...state,
                isLoading:true
            }
        case "GET_DETAILS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                id: action.empDetails.id,
                name: action.empDetails.first_name,
                url: action.empDetails.avatar
            }

            case "RESET":
            return {
                
                id: '',
                name: '',
                url: ''
            }

        default :
            return state

    }
}

const store = createStore(reducer, applyMiddleware(thunk));



class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedDept: 0,
            selctedEmployee: 1,
            empIds: [[1,2,3,4,5], [6,7,8,9,10]]
        }
    }

    deptListHandler = (e) => {
        this.setState({
            selectedDept: e.target.value,
            selctedEmployee: (e.target.value === 0 ? 1 : 6)
        })
        this.reset();
    }

    empListHandler = (e) => {
        this.setState({
            selctedEmployee: e.target.value
        })
    }

    getDetails = (e) => {
        e.preventDefault();
        store.dispatch(getEmployeeDetail(this.state.selctedEmployee))
    }

    reset = () => {
        store.dispatch({type:'RESET'})
    } 

    clearHandler = (e) => {
        e.preventDefault();
        store.dispatch({type:'RESET'})
    }

    render(){
        //const options = {}
        return(
            <div>
                <form>
                    <p>
                    <label>Department</label>
                    <select value={this.state.selectedDept} onChange={this.deptListHandler}>
                        <option value={0}>HR</option>
                        <option value={1}>ENGINEERING</option>
                    </select>
                    </p>
                    <p>
                    <label>Employee</label>
                    <select value={this.state.selectedEmp} onChange={this.empListHandler}>
                       {this.state.empIds[this.state.selectedDept].map((item)=>{
                           return <option value={item} key={item}>{item}</option>
                       })}
                    </select>
                    </p>
                    <div>
                        <button onClick={this.getDetails}>Get Details</button>
                        <button onClick={this.clearHandler}>Clear</button>
                    </div>
                </form>

                <div>
                    <div>{this.state.isLoading? 'Loading...': ''}</div>
                    <Provider store={store}>
                        <EmployeeDetails />
                    </Provider>
                    
                </div>
            </div>
        )
    }
}

render(<App />, document.getElementById('root'));
