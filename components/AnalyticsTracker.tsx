'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Send tracking request to the backend
        const trackView = async () => {
            try {
                await fetch(`${API_URL}/analytics/visit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-site-id': '1', // Default site ID for the portfolio
                    },
                    body: JSON.stringify({ path: pathname }),
                });
            } catch (error) {
                console.error('Failed to track page view:', error);
            }
        };

        trackView();
    }, [pathname]);

    return null; // This component doesn't render anything
}
