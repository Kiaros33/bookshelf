import axios from 'axios';

export function getBooks(
    order = 'asc',
    skip = 0,
    limit = 10,
    list = ''
){
    
    const request = axios.get(`/api/getBooks?order=${order}&skip=${skip}&limit=${limit}`)
    .then(response=>{
        if (list) {
            return [...list,...response.data]
        }
        else{
            return response.data
        }
    })

    return {
        type:'GET_BOOKS',
        payload:request
    }
}

export function getBookWithReviewer(id){
    const request = axios.get(`/api/getBook?id=${id}`)

    return (dispatch)=>{
        request.then(({data})=>{
            let book = data;
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data})=>{
                let response = {
                    book,
                    reviewer:data
                }

                dispatch({
                    type:'GET_BOOK_W_R',
                    payload:response
                })
            })
        })
    }
}


export function clearBookWithReviewer(id){
    return {
        type:'CLEAR_BOOK_W_R',
        payload:{
            book:{},
            reviewer:{}
        }
    }
}

export function newReview(book) {
    const request = axios.post('/api/book',book)
    .then(response=>response.data);
    
    return {
        type:'ADD_BOOK',
        payload:request
    }
}

export function clearNewBook() {
    return{
        type:'CLEAR_NEW_BOOK',
        payload:{}
    }
}

export function getBook(bookId){

    const request = axios.get(`/api/getBook?id=${bookId}`)
    .then(response=>response.data);

    return{
        type:'GET_BOOK',
        payload:request
    }
}

export function updateBook(data){
    const request = axios.post('/api/updateBook',data)
    .then(response=>response.data);

    return{
        type:'UPDATE_BOOK',
        payload:request
    }
}

export function deleteBook(bookId){
    const request = axios.delete(`/api/deleteBook?id=${bookId}`)
    .then(response=>response.data);

    return{
        type:'DELETE_BOOK',
        payload:request
    }
}

export function clearBook(){
    return{
        type:'CLEAR_BOOK',
        payload:{
            book:null,
            updateBook:false,
            postDeleted:false
        }
    }
}

/*============= USER ==============*/

export function loginUser({email,password}){

    const request = axios.post('/api/login',{email,password})
    .then(response=>response.data);

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function getUserReviews(userId){

    const request = axios.get(`/api/userReviews?user=${userId}`)
    .then(response=>response.data);

    return {
        type:'GET_USER_REVIEWS',
        payload:request
    }
}

export function auth(){

    const request = axios.get('/api/auth')
    .then(response=>response.data);

    return {
        type:'USER_AUTH',
        payload:request
    }
}

export function getUsers(){
    const request = axios.get('/api/users')
    .then(response=>response.data);

    return {
        type:'GET_USERS',
        payload:request
    }
}

export function registerUser(user,userList) {
    const request = axios.post(`/api/register`,user)

    return(dispatch)=>{
        request.then(({data})=>{
            let users = data.success ? [...userList,data.user] : userList;

            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
    
}