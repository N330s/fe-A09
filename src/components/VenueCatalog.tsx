'use client';

import Link from 'next/link';
import Card from './Card';
import { VenueItem, VenueJson } from '../interface';

interface VenueCatalogProps {
    venuesJson: VenueJson;
}

export default async function VenueCatalog({ venuesJson }: VenueCatalogProps) {
    try {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {venuesJson.data.map((venue: VenueItem) => (
                    <Link href={`/venue/${venue._id}`} key={venue._id}>
                        <Card
                            venueName={venue.name}
                            imgSrc={venue.picture}
                        />
                    </Link>
                ))}
            </div>
        );
    } catch (err) {
        console.error(err);
        return (
            <div className="text-center p-8 text-red-500">
                Failed to load venues
            </div>
        );
    }
}