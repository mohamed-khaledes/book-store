import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { deleteBook } from '../../store/bookSlice';
const BooksList = ({isLoading,books,getBook}) => {
  const dispatch = useDispatch()
  const {isLogedIn} = useSelector(state => state.auth)

  return (
    <div>
      <h2>Books List</h2>
      {
        isLoading?"loading...":(
      <ul className='list-group'>
        {
          books?.length>0?books.map((item) =>(
              <li className='list-group-item d-flex  justify-content-between align-items-center' key={item?.id}>
              <div>{item?.title}</div>
              <div className='btn-group' role='group'>
                <button type='button' className='btn btn-primary'disabled={!isLogedIn} onClick={()=>getBook(item.id)}>
                  Read
                </button>
                <button type='button' className='btn btn-danger' disabled={!isLogedIn} onClick={()=>dispatch(deleteBook(item.id))}>
                  Delete
                </button>
              </div>
            </li>
          ))
          :"there is no books available"
        }
      </ul>
        )
      }
    </div>
  );
};

export default BooksList;
