/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};
const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log('show', show);

  if (isLoading) {
    return <div>data is being loaded</div>;
  }
  if (error) {
    return <div>error occured {error}</div>;
  }
  return <div>this is something</div>;
};

export default Show;