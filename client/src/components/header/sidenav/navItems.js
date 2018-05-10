import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

const NavItems = ({users}) => {
    const items = [
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted:false
        },
        {
            type:'navItem',
            icon:'user',
            text:'My Profile',
            link:'/user',
            restricted:true
        },
        {
            type:'navItem',
            icon:'user-plus',
            text:'Add admins',
            link:'/user/register',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-in',
            text:'Log-in',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My reviews',
            link:'/user/reviews',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text',
            text:'Add review',
            link:'/user/add',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-out',
            text:'Log-out',
            link:'/user/logout',
            restricted:true
        }
    ]

    const splitElements = (item,i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        users.login ?
            items.map((item,i)=>{
                if (users.login.isAuth) {
                    return !item.exclude ?
                        splitElements(item,i)
                    :
                        null
                }
                else{
                    return !item.restricted ?
                        splitElements(item,i)
                    :
                        null
                }
            })
        :
            null
    )

    return (
        <div>
            {showItems()}
        </div>
    );
};

 const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(NavItems);