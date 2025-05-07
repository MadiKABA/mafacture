'use client';
import { useState, useEffect } from 'react';

export default function Header() {
    // Créer un état pour suivre le défilement de la page
    const [isFixed, setIsFixed] = useState(false);

    // Utiliser un effet pour surveiller le défilement de la page
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsFixed(true); // Le header devient fixe après 100px de défilement
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Nettoyage de l'événement lors du démontage du composant
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`bg-slate-900 text-white px-6 py-4 shadow-sm ${isFixed ? 'fixed top-0 left-0 right-0 z-50' : ''} transition-all duration-300`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-2xl font-extrabold tracking-tight text-blue-500">maFacture</div>
                <nav className="hidden md:flex space-x-8 text-sm font-medium">
                    <a href="#features" className="hover:text-blue-400">Fonctionnalités</a>
                    <a href="#pricing" className="hover:text-blue-400">Tarifs</a>
                    <a href="#about" className="hover:text-blue-400">À propos</a>
                    <a href="#contact" className="hover:text-blue-400">Contact</a>
                </nav>
                <div className="flex gap-3">
                    <button className="text-sm font-medium hover:text-blue-400">Connexion</button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-lg font-semibold transition">
                        Essai gratuit
                    </button>
                </div>
            </div>
        </header>
    );
}
