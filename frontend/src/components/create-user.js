import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props){
        super(props);

        //bind ".this" to these methods, so that when within these methods, .this refers to the CreateExercises class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //state is an Object property of Component. Component listens for changes to the state, and updates the DOM when it changes
        //this Component's state is being set to a new object with the following properties: 
        this.state = {
            username: ""
        }
    }

    //methods for updating the state of this component based on info from the form
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    //submit exercise to database
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user)

        axios.post('/api/users/add',  user)
            .then(res => console.log(res.data));

        this.setState({
            username: ""
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                            required 
                            className="form-control" 
                            value={this.state.username} 
                            onChange={this.onChangeUsername} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}