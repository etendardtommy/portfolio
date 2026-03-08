const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchApi<T>(endpoint: string): Promise<T> {
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const finalUrl = `${baseUrl}${path}`;

    const response = await fetch(finalUrl, {
        headers: {
            'x-site-id': '1',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} sur ${finalUrl}`);
    }

    return response.json();
}
