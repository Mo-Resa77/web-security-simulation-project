<?php

/* login method is vulnerable because it trusts raw user input in SQL query (whereRaw).

Passwords are assumed to be stored as plaintext.

Token generation is insecure.

This vulnerability allows attackers to bypass login via SQL injection */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    // Vulnerable login method with SQL Injection risk
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        // Vulnerable to SQL Injection raw sql no filtring 
        $user = User::whereRaw("email = '$email' AND password = '$password'")->first();

        if ($user) {
            // Simple insecure token generation no encryption 
            $token = base64_encode($user->email . ':' . now());

            //if success 
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user
            ]);
        }
           // if failed
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
