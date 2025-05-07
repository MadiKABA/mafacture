import { ArrowUpRight } from "lucide-react";

export default function SectionCTA() {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat  py-28 px-6"
        >
            {/* Overlay sombre */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-10 z-0"></div> */}

            {/* Contenu */}
            <div className="relative z-10 max-w-3xl mx-auto text-center bg-cover bg-center bg-no-repeat rounded-lg shadow-lg p-10"
                style={{ backgroundImage: "url('/assets/images/bg-ctasection.png')" }} //remplace par une image haute résolution

            >
                <h2 className="text-4xl font-bold mb-4">Commencez à facturer dès aujourd’hui !</h2>
                <p className="text-lg mb-6 text-slate-900">
                    Créez vos factures, envoyez-les à vos clients et recevez vos paiements plus rapidement.
                </p>
               
                <button className="mx-auto text-center flex items-center gap-2 px-5 py-2 rounded-full text-white bg-slate-950/80 hover:bg-slate-950/90 transition-all duration-300 backdrop-blur-md border border-blue-500/40 shadow-[0_0_8px_#3b82f680] hover:shadow-[0_0_12px_#3b82f6aa]">
    Créer un compte gratuit
    <ArrowUpRight className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition" />
</button>

            </div>
        </section>
    );
}
