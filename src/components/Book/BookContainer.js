import React, { Fragment,useEffect,useState } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import { useDispatch ,useSelector} from 'react-redux';
import { getBooks } from '../../store/bookSlice';
import './book.css';

const PostContainer = () => {
  const [selectedBook,setSelectedBook] = useState({})
  const dispatch = useDispatch()
  const {isLoading,books} = useSelector(state => state.books)
  useEffect(()=>{
    dispatch(getBooks())
  },[dispatch])
  const getBook = (id)=>{
    const selectedB = books.find((el) => el.id === id)
    setSelectedBook((prev) => {return {...prev,...selectedB}})
  }
  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList isLoading={isLoading} books={books} getBook={getBook}/>
        </div>
        <div className='col side-line'>
          <BookInfo bookInfo={selectedBook}/>
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
