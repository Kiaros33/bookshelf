import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './components/home/home';
import Layout from './HOC/layout';
import BookView from './components/books';
import Login from './containers/admin/login';
import Auth from './HOC/auth';
import User from './components/profile';
import AddReview from './containers/admin/add';
import UserReviews from './components/profile/userReviews';
import EditReview from './containers/admin/edit';
import Register from './containers/admin/register';
import Logout from './components/profile/logout';

const Routes = () => (
    <Layout>
        <Switch>
            <Route path="/" exact component={Auth(Home,null)}/>
            <Route path="/login" exact component={Auth(Login,false)}/>
            <Route path="/user" exact component={Auth(User,true)}/>
            <Route path="/user/logout" exact component={Auth(Logout,true)}/>
            <Route path="/user/add" exact component={Auth(AddReview,true)}/>
            <Route path="/user/register" exact component={Auth(Register,true)}/>
            <Route path="/user/edit-post/:id" exact component={Auth(EditReview,true)}/>
            <Route path="/user/reviews" exact component={Auth(UserReviews,true)}/>
            <Route path="/books/:id" exact component={Auth(BookView,null)}/>
        </Switch>
    </Layout>
);

export default Routes;
