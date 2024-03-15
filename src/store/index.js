import { configureStore } from "@reduxjs/toolkit";
import books from './bookSlice'
import auth from './authSlice'
export  const store = configureStore(
    {
        reducer:{books,auth}
}
    )