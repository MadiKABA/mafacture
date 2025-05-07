"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SectionPricing() {
    const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

    const plans = [
        {
            name: "Gratuit",
            monthly: "0€",
            yearly: "0€",
            desc: "Pour les indépendants ou les tests.",
            features: ["Facturation de base", "3 clients max", "Support limité"],
            highlight: false,
        },
        {
            name: "Pro",
            monthly: "19€",
            yearly: "190€",
            desc: "Idéal pour les PME et auto-entrepreneurs.",
            features: ["Facturation illimitée", "Paiement en ligne", "Suivi en temps réel", "Support prioritaire"],
            highlight: true,
        },
        {
            name: "Entreprise",
            monthly: "Sur devis",
            yearly: "Sur devis",
            desc: "Solutions sur mesure pour grandes structures.",
            features: ["Accès multi-utilisateurs", "Intégrations avancées", "Support dédié"],
            highlight: false,
        },
    ];

    return (
        <section id="pricing" className="relative bg-slate-950 py-20 text-white overflow-hidden" aria-labelledby="pricing-heading">
            {/* Wave top */}
            <div className="absolute -top-1 w-full overflow-hidden leading-[0] rotate-180 z-0">
                <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-[50px]">
                    <path d="M0,0 C150,50 350,0 500,50 L500,0 L0,0 Z" className="fill-slate-950" />
                </svg>
            </div>

            {/* Fond décoratif */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-slate-800/10 to-slate-900/10 z-0 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <h2 id="pricing-heading" className="text-4xl font-bold mb-4 text-blue-400 neon-text">Nos tarifs</h2>
                <p className="text-slate-400 mb-8 glow-text">
                    Des plans pour tous les besoins, de l’indépendant à l’entreprise.
                </p>

                {/* Switch mensuel/annuel */}
                <div className="flex justify-center items-center gap-4 mb-12">
                    <span className={billing === "monthly" ? "text-white font-semibold" : "text-slate-500"}>
                        Mensuel
                    </span>
                    <button
                        onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                        role="switch"
                        aria-checked={billing === "yearly"}
                        aria-label="Changer le mode de facturation"
                        className="relative w-14 h-7 bg-slate-700 rounded-full p-1 flex items-center transition"
                    >
                        <div
                            className={`w-5 h-5 bg-blue-500 rounded-full shadow-md transform transition ${billing === "yearly" ? "translate-x-7" : ""
                                }`}
                        />
                    </button>
                    <span className={billing === "yearly" ? "text-white font-semibold" : "text-slate-500"}>
                        Annuel <span className="text-xs text-blue-400">(2 mois offerts)</span>
                    </span>
                </div>

                {/* Cartes de prix */}
                <div className="grid md:grid-cols-3 gap-10">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-8 border relative transition transform hover:-translate-y-1 ${plan.highlight
                                    ? "border-blue-500 shadow-lg shadow-blue-500/30 bg-slate-900 hover:shadow-blue-400/50"
                                    : "border-slate-700 bg-slate-900 hover:bg-slate-800"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-4 right-4 text-xs px-3 py-1 bg-blue-600 text-white rounded-full animate-pulse shadow-md">
                                    Populaire
                                </div>
                            )}

                            <h3 className="text-xl font-semibold mb-2 neon-text">{plan.name}</h3>
                            <p className="text-3xl font-bold mb-4 text-blue-300 transition duration-300" aria-live="polite">
                                {billing === "monthly" ? plan.monthly : plan.yearly}
                            </p>
                            <p className="text-slate-400 mb-6">{plan.desc}</p>
                            <ul className="text-left text-sm space-y-2 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" /> {feature}
                                    </li>
                                ))}
                            </ul>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition glow-button"
                            >
                                {plan.highlight ? "Commencer" : "En savoir plus"}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Wave bottom */}
            <div className="absolute bottom-0 w-full overflow-hidden leading-[0] z-0">
                <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-[50px]">
                    <path d="M0,0 C150,50 350,0 500,50 L500,0 L0,0 Z" className="fill-gray-500" />
                </svg>
            </div>
        </section>
    );
}
