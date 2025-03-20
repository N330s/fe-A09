'use client'

import styles from './banner.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Banner = () => {
  const router = useRouter();
  const bannerImages = [
    '/img/cover.jpg',
    '/img/cover2.jpg',
    '/img/cover3.jpg',
    '/img/cover4.jpg'
  ];

  const {data : session} = useSession();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBannerClick = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.banner} onClick={handleBannerClick}>
      <img 
        src={bannerImages[currentImageIndex]} 
        alt="venue" 
        className={styles.bannerImage} 
      />

      {
        session ? <div className = 'z-30 absolute top-5 right-10 text-cyan-800 font-semibold text-xl'> Welcome {session.user?.name}</div> : null
      }

      <div className={styles.bannerText}>
        <h1 className='text-4xl font-medium'>where every event finds its venue</h1>
        <h3 className='text-xl'>Finding the perfect venue has never been easier. Whether it's a wedding, corporate event, or private party, we connect people to the perfect place.</h3>
      </div>
      <button 
        className="absolute bottom-5 right-5 px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
        onClick={(e) => {
          e.stopPropagation();
          router.push('/venue');
        }}
      >
        Select Venue
      </button>
    </div>
  );
};

export default Banner;