<?php
// ─── app/Http/Controllers/ContactController.php ───────────────────────────────
namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email',
            'phone'   => 'nullable|string|max:20',
            'subject' => 'required|string|max:150',
            'message' => 'required|string|max:2000',
        ]);

        ContactMessage::create($data);

        // TODO: Mail::to('info@consolatahostel.co.ke')->send(new ContactReceived($data));

        return response()->json(['message' => 'Message received. We\'ll be in touch shortly.'], 201);
    }
}
