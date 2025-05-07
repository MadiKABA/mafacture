import { ArrowUpRight } from "lucide-react";

export default function SectionFeatures() {
    const features = [
        {
            title: "Factures instantanées",
            desc: "Créez et envoyez des factures professionnelles en quelques clics.",
            icon: "🧾",
        },
        {
            title: "Paiements intégrés",
            desc: "Acceptez les paiements par carte ou mobile directement via la plateforme.",
            icon: "💳",
        },
        {
            title: "Suivi en temps réel",
            desc: "Visualisez qui a vu votre facture, et recevez des alertes de paiement.",
            icon: "📊",
        },
    ];

    return (
        <div className="relative bg-gray-100 overflow-hidden">
            {/* Étoiles animées en fond */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-blue-400/40 rounded-full blur-[1.5px] animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${2 + Math.random() * 4}s`,
                            transform: `translateY(${Math.random() * 10}px)`
                        }}
                    ></div>
                ))}
            </div>

            {/* Wave blanche inversée */}
            <div className="absolute -top-1 w-full overflow-hidden leading-[0] rotate-180 z-0">
                <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-[50px]">
                    <path d="M0,0 C150,50 350,0 500,50 L500,00 L0,0 Z" className="fill-white" />
                </svg>
            </div>

            {/* Dégradé décoratif bleu en fond */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-blue-300/10 to-blue-200/10 z-0 pointer-events-none"></div>

            <section id="features" className="py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6 glow-text">Des fonctionnalités puissantes</h2>
                    <p className="text-slate-600 mb-12 glow-text">
                        Tout ce dont vous avez besoin pour gérer vos factures efficacement.
                    </p>
                    <div className="grid md:grid-cols-3 gap-10">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl backdrop-blur-md hover:backdrop-blur-lg transition duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-700/50 flex flex-col justify-between hover:shadow-md hover:shadow-blue-400/50"
                            >
                                <div>
                                    <div className="text-5xl mb-4 glow-icon">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2 glow-text">{feature.title}</h3>
                                    <p className="text-slate-400">{feature.desc}</p>
                                </div>
                                <div className="mt-6 text-right">
                                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition backdrop-blur-md hover:backdrop-blur-lg glow-button">
                                        <ArrowUpRight className="w-5 h-5 text-blue-400 hover:text-blue-300" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
