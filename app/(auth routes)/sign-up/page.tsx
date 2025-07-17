'use client';

import { AuthRequest, register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import css from './SignUp.module.css';

export const dynamic = 'force-static';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as AuthRequest;
      const user = await register(formValues);
      if (user) {
        setUser(user);
        router.replace('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Oops... some error');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required className={css.input} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required className={css.input} />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
