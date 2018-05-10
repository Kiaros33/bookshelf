import React, { Component } from 'react';
import {auth} from '../actions';
import { connect } from 'react-redux';


export default function (ComposedClass,reload) {
    class AuthenticationCheck extends Component {

        state = {
            loading:true
        }

        componentWillMount() {
            this.props.dispatch(auth())
        }
        
        componentWillReceiveProps(nextProps) {
            //check if Auth != 0
            this.setState({
                loading:false
            });

            if (!nextProps.users.login.isAuth && reload === true) {
                this.props.history.push('/login');
            }
            if(nextProps.users.login.isAuth && reload === false){
                this.props.history.push('/user');
            }
        }
        
        render(){
            if (this.state.loading) {
                return <div className="loader">Loading...</div>
            }
            return(
                <ComposedClass {...this.props}/>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            users: state.users
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
};