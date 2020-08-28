import React, {Component} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

export default class CreateExercises extends Component {

    constructor(props){
        super(props);

        //bind ".this" to these methods, so that when within these methods, .this refers to the CreateExercises class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //state is an Object property of Component. Component listens for changes to the state, and updates the DOM when it changes
        //this Component's state is being set to a new object with the following properties: 
        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    //automatically called by React before anything is displayed to page
    //preform a get request to the backend to get all users, 
    //collect their usernames as an array of string, 
    //then change the state to include those usernames
    componentDidMount() {
        var userList = [];
        var newUser;
        axios.get('/api/users/')
            .then((response) => {
                this.setState({
                    users: response.data.map(i => {return i.username;}),
                    username: response.data[0].username
                })
                
            })
    }

    //methods for updating the state of this component based on info from the form
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    //submit exercise to database
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('/api/exercises/add', exercise)
            .then(result => {
                    window.location = "/"
                    console.log(result) 
            })
            .catch(err => console.log(err))

        
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>

                                {
                                    this.state.users.map(function(user) {
                                        return <option key={user} value={user}>{user}</option>
                                    })
                                }

                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}