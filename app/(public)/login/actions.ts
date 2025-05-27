'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export async function login(prevState: any, formData: FormData) {
    const validated = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validated.success) {
        return { error: 'Email ou mot de passe invalide' }
    }

    const { email, password } = validated.data

    // Appel à ton backend NestJS
    const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        return { error: 'Identifiants incorrects' }
    }

    // Tu peux ici stocker le token en cookie si nécessaire

    redirect('/dashboard')
}
