'use client';

import Card from './Card';
import { useReducer } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rating } from '@mui/material';

type RatingAction = {
  type: 'UPDATE_RATING';
  venue: string;
  rating: number;
} | {
  type: 'REMOVE_RATING';
  venue: string;
};

type RatingsState = Map<string, number>;

function ratingsReducer(state: RatingsState, action: RatingAction): RatingsState {
  switch (action.type) {
    case 'UPDATE_RATING':
      const newState = new Map(state);
      newState.set(action.venue, action.rating);
      return newState;
    case 'REMOVE_RATING':
      const updatedState = new Map(state);
      updatedState.delete(action.venue);
      return updatedState;
    default:
      return state;
  }
}

export default function CardPanel() {
  const initialRatings = new Map([
    ['The Bloom Pavilion', 0],
    ['Spark Space', 0],
    ['The Grand Table', 0]
  ]);

  const [ratings, dispatch] = useReducer(ratingsReducer, initialRatings);

  const handleRatingChange = (venue: string, newRating: number) => {
    dispatch({ type: 'UPDATE_RATING', venue, rating: newRating });
  };

  const handleRemoveRating = (venue: string) => {
    dispatch({ type: 'REMOVE_RATING', venue });
  };

  const mockVenueRepo = [
    {vid : "001", venueName: 'The Bloom Pavilion',  imgSrc: '/img/bloom.jpg'},
    {vid : "002", venueName:'Spark Space', imgSrc: '/img/grandtable.jpg'},
    {vid : "003", venueName: 'The Grand Table', imgSrc: '/img/sparkspace.jpg'}
  ]

  return (
    <div>
      <div style={{margin: '20px', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', alignContent:'space-around'}}>
        {
          mockVenueRepo.map((venue) => (
            <div key={venue.vid} className="w-1/4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-[400px] overflow-hidden flex flex-col">
              <Link href={'/venue/' + venue.vid} className="block flex-grow">
                <div className='w-full h-[70%] relative'>
                  <Image src={venue.imgSrc} alt={venue.venueName} fill={true} className='object-cover' />
                </div>
                <div className='p-[10px]'>
                  <div className='text-2xl text-black'>{venue.venueName}</div>
                </div>
              </Link>
              <div className='p-[10px]'>
                <Rating
                  name={venue.venueName + ' Rating'}
                  id={venue.venueName + ' Rating'}
                  data-testid={venue.venueName + ' Rating'}
                  value={ratings.get(venue.venueName) || 0}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      handleRatingChange(venue.venueName, newValue);
                    }
                  }}
                />
              </div>
            </div>
          ))
        }
      </div>
      
      <div className="mt-8 mx-4">
        <h2 className="text-xl font-bold mb-4 text-black">Venue List with Ratings</h2>
        <ul className="space-y-2">
          {Array.from(ratings.entries()).map(([venue, rating]) => (
            <li 
              key={venue}
              data-testid = {venue}
              onClick={() => handleRemoveRating(venue)}
              className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors text-black"
            >
              {venue}: {rating} stars
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}