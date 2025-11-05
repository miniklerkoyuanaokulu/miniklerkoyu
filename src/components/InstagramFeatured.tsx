"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { InstagramPost } from "@/lib/types";

interface InstagramFeaturedProps {
  posts: InstagramPost[];
}

// Instagram Card with loading state
function InstagramCard({
  post,
  index,
}: {
  post: InstagramPost;
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block relative aspect-4/5 rounded-xl overflow-hidden border-2 border-white shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {/* Skeleton/Shimmer Loading */}
        {post.thumbnailUrl && !imageLoaded && (
          <div className="absolute inset-0 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <FaInstagram className="text-gray-300 text-5xl" />
            </div>
          </div>
        )}

        {/* Actual Image or linear */}
        {post.thumbnailUrl ? (
          <Image
            src={post.thumbnailUrl}
            alt={post.caption || "Instagram gönderisi"}
            fill
            className={`object-cover group-hover:scale-110 transition-all duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-pink-400 via-purple-400 to-orange-400 group-hover:scale-110 transition-transform duration-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <FaInstagram className="text-white text-6xl opacity-80" />
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Instagram Icon on hover */}
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
  );
}

export function InstagramFeatured({ posts }: InstagramFeaturedProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden mt-20 py-12 md:py-16">
      {/* Background linear */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-pink-50/80 via-purple-50/60 to-orange-50/80" />
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
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
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
            <InstagramCard key={post.id} post={post} index={idx} />
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <FaInstagram className="w-5 h-5" />
            Instagram&apos;da Takip Et
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
