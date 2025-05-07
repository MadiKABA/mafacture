import { ArrowUpRight } from "lucide-react";

export default function SectionWhoIsItFor() {
    const targetAudiences = [
        {
            name: "Freelancers & Small Businesses",
            image: "/assets/images/image-1.jpg",
            description:
                "Impressionnez vos clients avec des factures professionnelles qui correspondent à votre marque. Acceptez les cartes de crédit, paiements ACH et envoyez des rappels automatisés pour paiements en retard.",
            imagePosition: "left",
        },
        {
            name: "Tech Experts & Service Providers",
            image: "/assets/images/image-2.jpg",
            description:
                "Offrez à vos clients un accès à un portail dédié où ils peuvent consulter leurs factures, l'historique des paiements, les documents et bien plus encore.",
            imagePosition: "right",
        },
    ];

    return (
        <section id="who-is-it-for" className="relative bg-gradient-to-r from-gray-300 to-gray-200 py-20 text-gray-800 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-6 text-blue-500">Pour qui est-ce ?</h2>
                <p className="text-gray-600 mb-12">
                    Découvrez des outils adaptés à votre domaine d'activité, qu'il s'agisse de freelances ou de services techniques.
                </p>

                {/* Grid des cibles */}
                <div className="space-y-20">
                    {targetAudiences.map((audience, idx) => (
                        <div
                            key={idx}
                            className={`
                                flex flex-col-reverse md:flex-row 
                                ${audience.imagePosition === "left" ? "md:flex-row-reverse" : ""}
                                items-center gap-10 md:gap-16
                            `}
                        >
                            <div className="w-full md:w-1/2">
                                <img
                                    src={audience.image}
                                    alt={audience.name}
                                    className="object-cover w-full h-64 md:h-[300px] rounded-xl shadow-sm hover:shadow-md transition"
                                />
                            </div>
                            <div className="w-full md:w-1/2 text-left">
                                <h3 className="text-2xl font-semibold mb-4 text-blue-600">{audience.name}</h3>
                                <p className="text-gray-700 mb-6">{audience.description}</p>

                                <button className="flex items-center gap-2 px-5 py-2 rounded-full text-white bg-slate-950/80 hover:bg-slate-950/90 transition-all duration-300 backdrop-blur-md border border-blue-500/40 shadow-[0_0_8px_#3b82f680] hover:shadow-[0_0_12px_#3b82f6aa]">
                                    En savoir plus
                                    <ArrowUpRight className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition" />
                                </button>





                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
