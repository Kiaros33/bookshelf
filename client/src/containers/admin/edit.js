import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getBook, updateBook, clearBook, deleteBook} from '../../actions';

class EditReview extends PureComponent {

    state = {
        formdata:{
            _id:this.props.match.params.id,
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
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
        this.props.dispatch(updateBook(this.state.formdata))
    }

    
    componentWillMount() {
        this.props.dispatch(getBook(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps) {
        let book = nextProps.books.book;
        this.setState({
            formdata:{
                _id:book._id,
                name:book.name,
                author:book.author,
                review:book.review,
                pages:book.pages,
                rating:book.rating,
                price:book.price
            }
        })
    }
    
    deleteReview = () => {
        this.props.dispatch(deleteBook(this.props.books.book._id));
    }

    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/user/reviews')
        },700)
    }

    componentWillUnmount() {
        this.props.dispatch(clearBook());
    }
    
    render() {
        return (
            <div className="rl_container article">
                {
                    this.props.books.updateBook ?
                        <div className="edit_confirm">
                            Review is updated, <Link to={`/books/${this.props.books.book._id}`}>Check it!</Link>
                        </div>
                    :
                        null
                }
                {
                    this.props.books.postDeleted ?
                        <div className="red_tag">
                            Post deleted
                            {this.redirectUser()}
                        </div>
                    :
                        null
                }
                <form action="" onSubmit={this.submitForm}>

                    <h2>Edit review</h2>

                    <div className="form_element">
                        <input type="text" placeholder="Book title" value={this.state.formdata.name} onChange={(event) => this.handleInput(event,'name')}/>
                    </div>

                    <div className="form_element">
                        <input type="text" placeholder="Author" value={this.state.formdata.author} onChange={(event) => this.handleInput(event,'author')}/>
                    </div>

                    <textarea name="review" id="" cols="30" rows="6" value={this.state.formdata.review} placeholder="Review" onChange={(event) => this.handleInput(event,'review')}/>

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

                    <button type="submit">Submit changes</button>
                    <div className="delete_post">
                        <div className="button" onClick={this.deleteReview}>
                            Delete review
                        </div>
                    </div>
                    

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

export default connect(mapStateToProps)(EditReview);
