import React from 'react';
import profilePng from '../../images/zzz.png';
import {Rating} from '@material-ui/lab'

const ReviewCard = ({ review }) => {

  const options ={
    value: review.rating,
    readOnly: true,
    precision: 0.1,
  }

  return (
    <div className='reviewCard'>
        <img src={profilePng} alt='User' />
        <p>{review.name}</p>
        <Rating {...options}/>
        <span className='reviewCardComment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard