import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import Nav from './sidenav/sidenav';

class Header extends Component {

    state = {
        showNav:false
    }

    onNav = ()=>{
        const navState = this.state.showNav;
        if (navState) {
            this.setState({showNav:false})
        }
        else{
            this.setState({showNav:true})
        }
        
    }

    render() {
        return (
            <header>
                <div className="open_nav">
                    <FontAwesome name="bars" style={{color:'#fff', padding:'10px', cursor:'pointer'}} onClick={()=>this.onNav()}/>
                </div>
                <Nav 
                    showNav={this.state.showNav}
                    onNav={()=>this.onNav()}
                />
                <Link to="/" className="logo">
                    The Book Shelf
                </Link>
                
            </header>
        );
    }
}

export default Header;
