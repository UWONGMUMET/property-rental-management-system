import { z } from 'zod';

export const createPaymentSchema = z.object({
    bookingId: z.uuid({
        required_error: 'Booking ID is required',
        invalid_type_error: 'Booking ID must be a valid UUID'
    })
});