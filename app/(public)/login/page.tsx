'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        // 🔐 À remplacer par ton API réelle
        setTimeout(() => {
            if (email === "admin@gmail.com" && password === "admin123") {
                router.push("/admin")
            } else if (email === "client@gmail.com") {
                router.push("/my-shop")
            } else if (email === "livreur@colizon.com") {
                router.push("/livreur")
            } else {
                setError("Identifiants incorrects")
            }
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-200 px-4 z-10 overflow-hidden">
            <svg
                className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] opacity-10 animate-spin-slow z-0"
                viewBox="0 0 100 100"
                fill="none"
            >
                <circle cx="50" cy="50" r="45" stroke="#005A9C" strokeWidth="5" />
            </svg>

            <svg
                className="absolute bottom-[-60px] right-[-60px] w-[250px] h-[250px] opacity-10 animate-spin-slow z-0"
                viewBox="0 0 100 100"
                fill="none"
            >
                <path
                    d="M50 0 C77 0 100 23 100 50 C100 77 77 100 50 100 C23 100 0 77 0 50 C0 23 23 0 50 0 Z"
                    stroke="#005A9C"
                    strokeWidth="4"
                />
            </svg>

            <Card className="w-full max-w-md shadow-lg border border-gray-200 z-10 relative">

                <CardHeader className="text-center">
                    <div className="flex justify-center mb-2">
                        <Image
                            src="/logo.jpeg"
                            alt="ColiZon Logo"
                            width={72}
                            height={72}
                            className="h-32 w-auto"
                            priority
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@colizon.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button type="submit" className="w-full bg-blue-900" disabled={loading}>
                            {loading ? "Connexion..." : "Se connecter"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
