"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

export function FloatingInstagramButton() {
  return (
    <motion.a
      href="https://www.instagram.com/vardaliminiklerkoyu"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.7 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-42 right-6 z-50 group"
      style={{ bottom: "10.5rem" }} // 42 = 168px = 10.5rem
      aria-label="Instagram'da takip edin"
    >
      <div className="relative">
        {/* Ping animasyonu - sadece 5 kere */}
        <span
          className="absolute inset-0 rounded-full bg-pink-400 opacity-75"
          style={{
            animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) 5",
          }}
        />

        {/* Ana buton */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center text-white shadow-2xl hover:shadow-pink-500/50 transition-all duration-300">
          <FaInstagram className="w-7 h-7 md:w-8 md:h-8" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-xl">
            Instagram&apos;da Takip Edin
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
