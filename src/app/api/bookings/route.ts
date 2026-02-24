import { NextRequest, NextResponse } from 'next/server';
import { getPayloadInstance } from '@/lib/payloadClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { location, courtType, date, startTime, endTime, level, audience, phoneNumber, price } = body;

    // Validate required fields
    if (!location || !courtType || !date || !startTime || !endTime || !level || !audience || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Combine date and time for startTime and endTime
    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    // Validate times
    if (endDateTime <= startDateTime) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      );
    }

    // Get Payload instance
    const payload = await getPayloadInstance();
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Create the booked slot
    const bookedSlot = await payload.create({
      collection: 'booked-slots',
      data: {
        location: Number(location), // Convert to number for relationship field
        courtType,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        level,
        audience,
        phoneNumber,
        price: price || 0,
      },
    });

    return NextResponse.json({
      success: true,
      bookingId: bookedSlot?.id,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create booking' },
      { status: 500 }
    );
  }
}
