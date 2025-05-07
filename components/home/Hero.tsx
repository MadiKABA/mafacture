// app/page.tsx
export default function SectionHero() {
    return (
        <section className="relative bg-slate-900 text-white min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-blue-400/10 blur-3xl"></div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                Générez vos factures <span className="text-blue-500">en un clic</span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10">
                La plateforme SaaS de facturation conçue pour les commerçants, artisans et freelances modernes.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-lg font-medium transition">
                    Essai gratuit
                </button>
                <button className="border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 px-6 py-3 rounded-lg text-lg transition">
                    En savoir plus
                </button>
            </div>
        </section>
    );
}
