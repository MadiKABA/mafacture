"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const testimonials = [
    {
        name: "Fatou Ndiaye",
        message: "Service exceptionnel, je recommande vivement !",
        avatar: "/images/avatar1.jpg",
    },
    {
        name: "Amadou Ba",
        message: "Très satisfait du professionnalisme de l'équipe.",
        avatar: "/images/avatar2.jpg",
    },
    {
        name: "Sophie Diallo",
        message: "Rapide, efficace et fiable. Merci beaucoup !",
        avatar: "/images/avatar3.jpg",
    },
    {
        name: "Jean-Paul",
        message: "Une expérience fluide et agréable du début à la fin.",
        avatar: "/images/avatar4.jpg",
    },
    {
        name: "Aminata Sy",
        message: "Je referai appel à eux sans hésiter.",
        avatar: "/images/avatar5.jpg",
    },
];

const renderStars = (count: number = 5) =>
    Array.from({ length: count }, (_, i) => (
        <svg
            key={i}
            className="w-4 h-4 text-yellow-400 inline-block mr-0.5 drop-shadow-[0_0_2px_gold]"
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967h4.173c.969 0 1.371 1.24.588 1.81l-3.377 2.455 1.286 3.967c.3.921-.755 1.688-1.539 1.118L10 13.347l-3.377 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.967-3.377-2.455c-.784-.57-.38-1.81.588-1.81h4.173L9.049 2.927z" />
        </svg>
    ));

const SectionTestimonials = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="py-16 bg-black text-white">
            <div className="container max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-400 drop-shadow-[0_0_10px_#3b82f6]">
                    Ce que disent nos clients
                </h2>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    spaceBetween={30}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-xl border border-blue-500/30 shadow-[0_0_25px_#3b82f680] hover:scale-105 hover:shadow-[0_0_40px_#3b82f6dd] transition-transform duration-300 ease-in-out h-full flex flex-col items-center text-center">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-full mb-4 border-2 border-blue-400 shadow-md"
                                />
                                <p className="text-sm italic mb-3 text-gray-200">“{item.message}”</p>
                                <div className="mb-2">{renderStars(5)}</div>
                                <p className="font-semibold text-blue-400">{item.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default SectionTestimonials;
