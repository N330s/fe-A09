import { VenueItem } from '@/interface';
import { notFound } from 'next/navigation';

export default async function getVenue(id: string) {
    try {
        const response = await fetch(`https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch venue');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching venue:', error);
        notFound();
    }
} 

