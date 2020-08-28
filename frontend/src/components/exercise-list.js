import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default class ExerciseList extends Component {

    constructor(props){
        super(props)

        this.updateFromDatabase = this.updateFromDatabase.bind(this)
        this.deleteExercise = this.deleteExercise.bind(this)

        this.state ={
            exercises: []
        }
    }

    componentDidMount() {
        this.updateFromDatabase()
    }

    updateFromDatabase(){
        axios.get('/api/exercises')
            .then((response) => {
                this.setState({exercises: response.data})
            })
            .catch((error) => console.log(error)) 
    }

    deleteExercise(id) {
        axios.delete(`/api/exercises/${id}`)
            .then(result => console.log(result.data))
            .catch(console.log(id))
        this.setState({
            exercises: this.state.exercises.filter(element => element._id !== id)
        })
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.exercises.map(i => {
                                return <ExerciseRow exercise={i} deleteExercise={this.deleteExercise} key={i._id}/>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

/**
 * a <tr> component for a table row that contains the following: 
 * username
 * description
 * duration
 * date
 */
class ExerciseRow extends Component {
    constructor(props){
        super(props)

        this.editOnClick = this.editOnClick.bind(this)
        this.deleteOnClick = this.deleteOnClick.bind(this)
        this.confirmEditOnClick = this.confirmEditOnClick.bind(this)
        this.cancelEditOnClick = this.cancelEditOnClick.bind(this)

        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)

        this.updateUsersFromDatabase = this.updateUsersFromDatabase.bind(this)

        this.state = {
            editMode: false,
            users: [],
            exercise: {
                _id: props.exercise._id,
                username: props.exercise.username,
                description: props.exercise.description,
                duration: props.exercise.duration,
                date: props.exercise.date
            }
        }
    }

    componentDidMount(){
        this.updateUsersFromDatabase()
    }

    updateUsersFromDatabase(){
        axios.get('/api/users/')
            .then((response) => {
                this.setState({
                    users: response.data.map(i => {return i.username})
                })
            })
    }

    

    onChangeUsername(e){
        this.setState({
            exercise: {
                _id: this.state.exercise._id,
                username: e.target.value,
                description: this.state.exercise.description,
                duration: this.state.exercise.duration,
                date: this.state.exercise.date
            }
        })
    }

    onChangeDescription(e){
        this.setState({
            exercise: {
                _id: this.state.exercise._id,
                username: this.state.exercise.username,
                description: e.target.value,
                duration: this.state.exercise.duration,
                date: this.state.exercise.date
            }
        })
    }

    onChangeDuration(e){
        this.setState({
            exercise: {
                _id: this.state.exercise._id,
                username: this.state.exercise.username,
                description: this.state.exercise.description,
                duration: e.target.value,
                date: this.state.exercise.date
            }
        })
    }

    onChangeDate(date){
        this.setState({
            exercise: {
                _id: this.state.exercise._id,
                username: this.state.exercise.username,
                description: this.state.exercise.description,
                duration: this.state.exercise.duration,
                date: date
            }
        })
        //e.target.selected = e.target.value
    }

    editOnClick(){
        this.setState({
            editMode: true
        })
    }

    deleteOnClick(){
        axios.delete('/api/exercises/' + this.state.exercise._id)
            .then(window.location = '/')
    }

    confirmEditOnClick(){
        axios.post('/api/exercises/update/' + this.state.exercise._id, this.state.exercise)
            .then(window.location = '/')
        
    }

    cancelEditOnClick(){
        this.setState({
            editMode: false,
            exercise: {
                _id: this.props.exercise._id,
                username: this.props.exercise.username,
                description: this.props.exercise.description,
                duration: this.props.exercise.duration,
                date: this.props.exercise.date
            }
        })
    }

    render(){
        //if in edit mode, get a list of all users, then return the component as a <tr> with entries built in
        if(this.state.editMode){
                    return(
                        <tr>
                            <td>
                                <select required value={this.state.exercise.username} onChange={this.onChangeUsername}>
                                    {
                                        this.state.users.map((i) => {
                                            return <option key={i} value={i}>{i}</option>
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input type="text" required value={this.state.exercise.description} onChange={this.onChangeDescription}/>
                            </td>
                            <td>
                                <input type="number" required value={this.state.exercise.duration} onChange={this.onChangeDuration}/>
                            </td>
                            <td>
                                <div>
                                    <DatePicker selected={Date.parse(this.state.exercise.date)} onChange={this.onChangeDate}/>
                                </div>
                            </td>
                            <td>
                                <button onClick={this.confirmEditOnClick}>Save</button>
                            </td>
                            <td>
                                <button onClick={this.confirmEditOnClick}>Cancel</button>
                            </td>
                        </tr>
                    )
        }
        else{
            return(
                <tr>
                    <td>{this.state.exercise.username}</td>
                    <td>{this.state.exercise.description}</td>
                    <td>{this.state.exercise.duration}</td>
                    <td>{this.state.exercise.date}</td>
                    <td><button onClick={this.editOnClick}>edit</button></td>
                    <td><button onClick={() => { this.props.deleteExercise(this.props.exercise._id) }}>delete</button></td>
                </tr>
            )
        }
    }
}