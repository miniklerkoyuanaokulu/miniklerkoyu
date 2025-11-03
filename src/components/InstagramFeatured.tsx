"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import type { InstagramPost } from "@/lib/types";

interface InstagramFeaturedProps {
  posts: InstagramPost[];
}

export function InstagramFeatured({ posts }: InstagramFeaturedProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-orange-50/80" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
              <FaInstagram className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Instagram&apos;dan
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Minikler Köyü&apos;nden en güncel paylaşımlar
          </p>
          <Link
            href="https://instagram.com/vardaliminiklerkoyu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            @vardaliminiklerkoyu
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Firestore'dan çekilen thumbnail - performanslı */}
                {post.thumbnailUrl ? (
                  <img
                    src={post.thumbnailUrl}
                    alt={post.caption || "Instagram gönderisi"}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-400 group-hover:scale-110 transition-transform duration-500" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Instagram Icon */}
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaInstagram className="w-4 h-4 text-purple-600" />
                </div>

                {/* Caption on hover */}
                {post.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {post.caption.length > 50
                      ? `${post.caption.slice(0, 50)}...`
                      : post.caption}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="https://instagram.com/vardaliminiklerkoyu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <FaInstagram className="w-5 h-5" />
            Instagram&apos;da Takip Et
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

