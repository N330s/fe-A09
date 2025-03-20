import { Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import VenueCatalog from '@/components/VenueCatalog';
import getVenues from '@/libs/getVenues';

export default async function Venue() {
    const venueData = await getVenues();
    
    return (
        <main className="text-center p-5">
            <Suspense fallback={<LinearProgress />}>
                <VenueCatalog venuesJson ={venueData} />
            </Suspense>
        </main>
    );
}