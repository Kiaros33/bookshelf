import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getBooks} from '../actions';
import BookItem from '../widgets/bookItem';

class HomeContainer extends Component {

    
    componentWillMount() {
        this.props.dispatch(getBooks('desc',0,2))
    }

    componentWillUnmount() {
        this.props.dispatch(getBooks('desc',0,2))
    }
    
    renderItems = (books) => (
        books.list ? 
            books.list.map(item=>(
                <BookItem {...item} key={item._id}/>
            ))
        :
            null
    )

    loadmore = () => {
        let count = this.props.books.list.length;
        this.props.dispatch(getBooks('desc',count,2,this.props.books.list))
    }

    render() {
        return (
            <div>
                {this.renderItems(this.props.books)}
                <div className="loadmore" onClick={this.loadmore}>Load More</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books:state.books
    }
}

export default connect(mapStateToProps)(HomeContainer);
