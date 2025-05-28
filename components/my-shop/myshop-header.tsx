"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sun, Moon, User, Settings, LogOut, Menu } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function MyShopHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
    const [isDark, setIsDark] = useState(false)

    const handleThemeToggle = () => {
        setIsDark(!isDark)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
                {/* Menu Burger visible en petit écran */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={onMenuToggle}
                >
                    <Menu className="w-5 h-5" />
                </Button>

                {/* Nom utilisateur */}
                <span className="font-semibold text-lg hidden sm:inline">👤 John Doe</span>
            </div>

            <div className="flex items-center space-x-4">
                {/* Dark Mode Switch */}
                <div className="flex items-center space-x-2">
                    <Switch checked={isDark} onCheckedChange={handleThemeToggle} />
                    <Label className="cursor-pointer">
                        {isDark ? <Moon size={18} /> : <Sun size={18} />}
                    </Label>
                </div>

                {/* Dropdown Profil */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                            <User size={20} />
                            <span className="hidden sm:inline">Mon Compte</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Paramètres
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <User className="w-4 h-4 mr-2" />
                            Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LogOut className="w-4 h-4 mr-2 text-red-500" />
                            <span className="text-red-500">Déconnexion</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
