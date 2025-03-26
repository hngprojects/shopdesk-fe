import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Missing Authorization token' },
        { status: 400 }
      );
    }

    const response = await fetch(
      'https://api.timbu.cloud/auth/refresh-access-token',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: refreshToken,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to refresh access token', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.access_token) {
      return NextResponse.json(
        { message: 'No access token found in response' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { access_token: data.access_token },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error refreshing access token:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error?.message || error },
      { status: 500 }
    );
  }
}
