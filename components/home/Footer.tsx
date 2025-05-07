import { FaEnvelope, FaPhoneAlt, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative bg-slate-950 text-white py-16 border-t border-blue-500/10">
            {/* Wave bottom */}
            <div className="absolute top-0 w-full overflow-hidden leading-[0] z-0">
                <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-[50px]">
                    <path d="M0,0 C150,50 350,0 500,50 L500,0 L0,0 Z" className="fill-gray-500" />
                </svg>
            </div>
            <div className="container max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">

                {/* Logo + Description */}
                <div>
                    <h2 className="text-3xl font-bold text-blue-400 mb-2 animate-pulse drop-shadow-[0_0_20px_#3b82f6]">
                        MaFacture
                    </h2>
                    <p className="text-gray-300">
                        Créez des factures professionnelles rapidement et gérez vos paiements de manière simple et sécurisée.
                    </p>
                </div>

                {/* Produits */}
                <div>
                    <h3 className="text-blue-400 font-semibold mb-3 text-xl">Nos Produits</h3>
                    <ul className="space-y-1 text-gray-300">
                        <li><a href="#features" className="hover:text-blue-300 transition duration-300">Génération de Factures</a></li>
                        <li><a href="#pricing" className="hover:text-blue-300 transition duration-300">Plans et Tarification</a></li>
                        <li><a href="#security" className="hover:text-blue-300 transition duration-300">Sécurisation des Paiements</a></li>
                        <li><a href="#integration" className="hover:text-blue-300 transition duration-300">Intégration API</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-blue-400 font-semibold mb-3 text-xl">Support</h3>
                    <ul className="space-y-1 text-gray-300">
                        <li><a href="#faq" className="hover:text-blue-300 transition duration-300">FAQ</a></li>
                        <li><a href="#blog" className="hover:text-blue-300 transition duration-300">Blog</a></li>
                        <li><a href="#contact" className="hover:text-blue-300 transition duration-300">Contactez-nous</a></li>
                        <li><a href="#roadmap" className="hover:text-blue-300 transition duration-300">Roadmap</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-blue-400 font-semibold mb-3 text-xl">Contactez-nous</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-blue-400" /> support@mafacture.com
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt className="text-blue-400" /> +221 77 000 00 00
                        </li>
                        <li className="flex items-center gap-2">
                            <FaLinkedin className="text-blue-400" /> <a href="#" className="hover:text-blue-300 transition duration-300">Suivez-nous sur LinkedIn</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="mt-10 border-t border-blue-500/10 pt-5 text-center text-gray-500 text-xs">
                <p>&copy; {new Date().getFullYear()} MaFacture. Tous droits réservés. - <a href="#" className="text-blue-300 hover:text-blue-500">Mentions légales</a></p>
            </div>
        </footer>
    );
};

export default Footer;
