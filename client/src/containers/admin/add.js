import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {newReview,clearNewBook} from '../../actions';

class AddReview extends Component {

    state = {
        formdata:{
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:1,
            price:''
        }
    }

    handleInput = (event,name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value
        
        this.setState({
            formdata:newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(newReview({
            ...this.state.formdata,
            ownerId:this.props.users.login.id
        }))
    }

    showNewBook = (book) => (
        book.post ? 
            <div className="conf_link">
                Cool!!! <Link to={`/books/${book.bookId}`}>
                    Click to see your review
                </Link>
            </div>
        :
            null
    )

    componentWillUnmount() {
        this.props.dispatch(clearNewBook())
    }
    

    render() {
        return (
            <div className="rl_container article">
                <form action="" onSubmit={this.submitForm}>

                    <h2>Add a review</h2>

                    <div className="form_element">
                        <input type="text" placeholder="Book title" value={this.state.formdata.name} onChange={(event) => this.handleInput(event,'name')}/>
                    </div>

                    <div className="form_element">
                        <input type="text" placeholder="Author" value={this.state.formdata.author} onChange={(event) => this.handleInput(event,'author')}/>
                    </div>

                    <textarea name="review" id="" cols="30" rows="10" value={this.state.formdata.review} placeholder="Review" onChange={(event) => this.handleInput(event,'review')}/>

                    <div className="form_element">
                        <input type="number" placeholder="Number of pages" value={this.state.formdata.pages} onChange={(event) => this.handleInput(event,'pages')}/>
                    </div>

                    <div className="form_element">
                        <input type="number" placeholder="Price" value={this.state.formdata.price} onChange={(event) => this.handleInput(event,'price')}/>
                    </div>

                    <div className="form_element">
                        <select name="rating" id="" value={this.state.formdata.rating} onChange={(event) => this.handleInput(event,'rating')}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <button type="submit">Submit</button>
                    {
                        this.props.books.newbook ? 
                            this.showNewBook(this.props.books.newbook)
                        :
                            null
                    }

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(AddReview);
