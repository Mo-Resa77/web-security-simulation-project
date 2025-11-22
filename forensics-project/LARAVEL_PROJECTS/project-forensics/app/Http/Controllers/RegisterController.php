<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class RegisterController extends Controller
{
    public function signup(Request $request)
    {
        $email = $request->input('email');
        $username = $request->input('username');
        $password = $request->input('password'); // store as plain text (vulnerable)

        // No validation or duplicate check (vulnerable)
        $user = User::create([
            'email' => $email,
            'name' => $username, // 'name' column for username
            'password' => $password,
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ]);
    }
}
