"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/905522897191"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="WhatsApp ile iletişime geç"
    >
      <div className="relative">
        {/* Ping animasyonu - sadece 5 kere */}
        <span
          className="absolute inset-0 rounded-full bg-green-400 opacity-75"
          style={{
            animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) 5",
          }}
        />

        {/* Ana buton */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-2xl hover:shadow-green-500/50 transition-all duration-300">
          <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-xl">
            WhatsApp ile Mesaj Gönderin
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
