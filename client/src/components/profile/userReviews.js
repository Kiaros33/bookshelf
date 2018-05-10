import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserReviews} from '../../actions';
import moment from 'moment-js';
import {Link} from 'react-router-dom';

class UserReviews extends Component {

    
    componentWillMount() {
        this.props.dispatch(getUserReviews(this.props.users.login.id))
        
    }


    showUserReviews = (user) => (
        user.reviews ?
            user.reviews.map(item => (
                <tr key={item._id}>
                    <td><Link to={`/user/edit-post/${item._id}`}>{item.name}</Link></td>
                    <td>{item.author}</td>
                    <td>{moment(item.createdAt).format("DD-MM-YY")}</td>
                </tr>
            ))
        :
            null
    )


    render() {
        let user = this.props.users
        return (
            <div className="user_posts">
                <h4>Your reviews:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserReviews(user)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(UserReviews);
