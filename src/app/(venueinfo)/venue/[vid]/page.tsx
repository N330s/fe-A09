import Image from 'next/image';
import { notFound } from 'next/navigation';
import getVenue from '@/libs/getVenue';

export default async function VenueDetail({ params }: { params: { vid: string } }) {
    const venueJson = await getVenue(params.vid);
    const venue = venueJson.data;
    if (!venue) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left side - Image */}
                    <div className="relative h-[400px] w-full">
                        <Image 
                            src={venue.picture} 
                            alt={venue.name}
                            fill
                            className="rounded-lg object-cover"
                            priority
                        />
                    </div>

                    {/* Right side - Venue Details */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h1 className="text-3xl font-bold text-black mb-6">
                            {venue.name}
                        </h1>
                        <div className="space-y-4 text-lg text-black">
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">ที่อยู่:</span>
                                <span>{venue.address}</span>
                            </div>
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">เขต/อำเภอ:</span>
                                <span>{venue.district}</span>
                            </div>
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">จังหวัด:</span>
                                <span>{venue.province}</span>
                            </div>
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">รหัสไปรษณีย์:</span>
                                <span>{venue.postalcode}</span>
                            </div>
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">เบอร์โทร:</span>
                                <span>{venue.tel}</span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="text-2xl font-bold text-blue-600">
                                    ฿{venue.dailyrate} / วัน
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
