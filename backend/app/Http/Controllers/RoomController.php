<?php
// ─── app/Http/Controllers/RoomController.php ─────────────────────────────────
namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /** List all rooms (optionally filter by availability). */
    public function index(Request $request)
    {
        $query = Room::query();

        if ($request->filled('available')) {
            $query->where('is_available', filter_var($request->available, FILTER_VALIDATE_BOOLEAN));
        }

        return response()->json($query->orderBy('price')->get());
    }

    /** Get single room details. */
    public function show($id)
    {
        $room = Room::findOrFail($id);
        return response()->json($room);
    }

    /** [Admin] Create a new room. */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'         => 'required|string|max:100',
            'type'         => 'required|in:single,shared,bedsitter',
            'price'        => 'required|numeric|min:0',
            'size'         => 'nullable|string',
            'occupancy'    => 'required|integer|min:1|max:10',
            'description'  => 'nullable|string',
            'amenities'    => 'nullable|array',
            'images'       => 'nullable|array',
            'is_available' => 'boolean',
        ]);

        $room = Room::create($data);
        return response()->json($room, 201);
    }

    /** [Admin] Update a room. */
    public function update(Request $request, $id)
    {
        $room = Room::findOrFail($id);
        $room->update($request->validate([
            'name'         => 'sometimes|string|max:100',
            'price'        => 'sometimes|numeric|min:0',
            'description'  => 'nullable|string',
            'amenities'    => 'nullable|array',
            'is_available' => 'sometimes|boolean',
        ]));

        return response()->json($room);
    }

    /** [Admin] Toggle availability status. */
    public function toggleAvailability($id)
    {
        $room = Room::findOrFail($id);
        $room->update(['is_available' => !$room->is_available]);

        return response()->json(['message' => 'Availability updated.', 'room' => $room]);
    }

    /** [Admin] Delete a room. */
    public function destroy($id)
    {
        Room::findOrFail($id)->delete();
        return response()->json(['message' => 'Room deleted.'], 204);
    }
}
