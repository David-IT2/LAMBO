<?php
// ─── app/Http/Controllers/BookingController.php ───────────────────────────────
namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{
    /** Get bookings for the authenticated student. */
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->bookings()->with('room')->latest()->get()
        );
    }

    /** Get a single booking (must belong to auth user or admin). */
    public function show(Request $request, $id)
    {
        $booking = Booking::with('room', 'user')->findOrFail($id);

        if ($request->user()->role !== 'admin' && $booking->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return response()->json($booking);
    }

    /** Create a new booking. */
    public function store(Request $request)
    {
        $data = $request->validate([
            'room_id'        => 'required|exists:rooms,id',
            'move_in_date'   => 'required|date|after_or_equal:today',
            'duration_months'=> 'required|integer|min:1|max:12',
            'payment_method' => 'required|in:mpesa,bank,cash',
            'mpesa_number'   => 'nullable|string',
            'notes'          => 'nullable|string|max:500',
        ]);

        $room = Room::findOrFail($data['room_id']);

        if (!$room->is_available) {
            return response()->json(['message' => 'Room is not available.'], 422);
        }

        $totalAmount = $room->price * $data['duration_months'];
        $deposit     = $room->price; // 1 month deposit

        $booking = Booking::create([
            'user_id'         => $request->user()->id,
            'room_id'         => $data['room_id'],
            'move_in_date'    => $data['move_in_date'],
            'duration_months' => $data['duration_months'],
            'total_amount'    => $totalAmount,
            'deposit_amount'  => $deposit,
            'payment_method'  => $data['payment_method'],
            'mpesa_number'    => $data['mpesa_number'] ?? null,
            'notes'           => $data['notes'] ?? null,
            'status'          => 'pending',
        ]);

        // TODO: Send confirmation email
        // Mail::to($request->user()->email)->send(new BookingConfirmed($booking));

        // TODO: Trigger M-Pesa STK push if payment_method === 'mpesa'

        return response()->json([
            'message' => 'Booking submitted successfully.',
            'booking' => $booking->load('room'),
        ], 201);
    }

    /** Cancel a booking (student). */
    public function cancel(Request $request, $id)
    {
        $booking = Booking::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        if (in_array($booking->status, ['confirmed', 'cancelled'])) {
            return response()->json(['message' => 'Booking cannot be cancelled at this stage.'], 422);
        }

        $booking->update(['status' => 'cancelled']);
        return response()->json(['message' => 'Booking cancelled.']);
    }

    /** [Admin] List all bookings with filters. */
    public function adminIndex(Request $request)
    {
        $query = Booking::with('user', 'room')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('room_id')) {
            $query->where('room_id', $request->room_id);
        }

        return response()->json($query->paginate(20));
    }

    /** [Admin] Update booking status. */
    public function updateStatus(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $request->validate(['status' => 'required|in:pending,confirmed,waitlist,cancelled']);

        $booking->update(['status' => $request->status]);
        return response()->json(['message' => 'Status updated.', 'booking' => $booking]);
    }
}
