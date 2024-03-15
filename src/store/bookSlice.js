import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// action to get the books
export const getBooks = createAsyncThunk("books/getBooks",async(args,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI
    try{
        // const res =await fetch("http://localhost:30");
        const res =await fetch("http://localhost:3005/books");
        const data = await res.json();
        return data;
    }catch(err){
        return rejectWithValue(err.message)
    }
})
// action to insert the books
export const insertBook = createAsyncThunk("books/insertBook",async(bookData,thunkAPI) =>{
    // getState to access the global state 
    // rejectWithValue to handle the error
    // dispatch if we need to dispatch another action here
    // const {rejectWithValue,getState,dispatch} = thunkAPI
    const {rejectWithValue,getState} = thunkAPI
    try{
        bookData.userName = getState().auth.user
        const res =await fetch("http://localhost:3005/books",{
            method:"POST",
            body:JSON.stringify(bookData),
            headers:{
                "Content-type":"applicatoin/json; charset=UTF-8"
            }
        });
        const data = await res.json();
        return data;
    }catch(err){
        return rejectWithValue(err.message)
    }
})
// action to delete the books
export const deleteBook = createAsyncThunk("books/deleteBook",async(id,thunkAPI) =>{
    // rejectWithValue to handle the error
    const {rejectWithValue} = thunkAPI
    try{
        await fetch(`http://localhost:3005/books/${id}`,{
            method: 'DELETE',
            headers:{
                "Content-type":"applicatoin/json; charset=UTF-8"
            }
        });
        return id;
    }catch(err){
        return rejectWithValue(err.message)
    }
})

const bookSlice = createSlice({
    name:"books",
    initialState:{books:[],isLoading:false,error:null},
    // extra Reducers if we need to listen to action or function built outside our slice
    extraReducers:{
        // get Books
        [getBooks.pending]:(state,action)=>{
            state.isLoading = true
            state.error = null
        },
        [getBooks.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.books = action.payload;
            state.error = null
        },
        [getBooks.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.payload
        },
        // insert Books
        [insertBook.pending]:(state,action)=>{
            state.isLoading = true
            state.error = null
        },
        [insertBook.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.books.push(action.payload)
            state.error = null
        },
        [insertBook.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.payload
        },
        // delete Books
        [deleteBook.pending]:(state,action)=>{
            state.isLoading = true
            state.error = null
        },
        [deleteBook.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.books = state.books.filter((ele) => ele.id !== action.payload)
            state.error = null
        },
        [deleteBook.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export default bookSlice.reducer