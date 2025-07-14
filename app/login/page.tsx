'use client'; // if using App Router

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // or 'next/router' in Pages Router

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
console.log('res', res);
    if (res?.error === 'OTP_NOT_VERIFIED') {
      router.push('/verify'); 
    } else if (res?.ok) {
     
      router.push('/');
    } else {
      alert('Login failed');
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold">Login</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />

      {/* {error && <p className="text-red-500">{error}</p>} */}

      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        Sign In
      </button>
    </form>
  );
}
