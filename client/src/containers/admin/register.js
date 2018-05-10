import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {getUsers,registerUser} from '../../actions';

class Register extends PureComponent {

    state = {
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:''
    }

    
    componentWillMount() {
        this.props.dispatch(getUsers())
    }
    

    handleInputEmail = (event) => {
        this.setState({
            email:event.target.value
        })
    }

    handleInputPassword = (event) => {
        this.setState({
            password:event.target.value
        })
    }

    handleInputName = (event) => {
        this.setState({
            name:event.target.value
        })
    }

    handleInputLastname = (event) => {
        this.setState({
            lastname:event.target.value
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        this.setState({error:''});
        this.props.dispatch(registerUser({
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            lastname:this.state.lastname
            },
            this.props.users.users));
    }
    
    showUsers = (users) => (
        users.users ?
            users.users.map((item,i)=>(
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
            ))
        :
            null
    )

    componentWillReceiveProps(nextProps) {
        if (nextProps.users.register === false) {
            this.setState({error:'Error, try again'})
        }
        else{
            this.setState({
                name:'',
                lastname:'',
                email:'',
                password:''
            })
        }
    }
    

    render() {
        let users = this.props.users
        return (
            <div className="rl_container">

                <form action="" onSubmit={this.submitForm}>

                    <h2>Add new user</h2>

                    <div className="form_element">
                        <input type="text" placeholder="Enter a name" value={this.state.name} onChange={this.handleInputName}/>
                    </div>

                    <div className="form_element">
                        <input type="text" placeholder="Enter a lastname" value={this.state.lastname} onChange={this.handleInputLastname}/>
                    </div>

                    <div className="form_element">
                        <input type="email" placeholder="Enter an e-mail" value={this.state.email} onChange={this.handleInputEmail}/>
                    </div>

                    <div className="form_element">
                        <input type="password" placeholder="Enter a password" value={this.state.password} onChange={this.handleInputPassword}/>
                    </div>

                    <button type="submit">Add</button>
                    
                    <div className="error">
                        {this.state.error}
                    </div>

                </form>
                <div className="current_users">
                    <h4>Current users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>E-mail</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.showUsers(users)}
                        </tbody>
                    </table>

                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(Register);
