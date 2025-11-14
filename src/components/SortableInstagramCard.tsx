"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit, FaTrash, FaGripVertical, FaInstagram, FaEye, FaEyeSlash } from "react-icons/fa";
import type { InstagramPost } from "@/lib/types";

interface SortableInstagramCardProps {
  id: string;
  post: InstagramPost;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  index: number;
}

export default function SortableInstagramCard({
  id,
  post,
  onEdit,
  onDelete,
  onToggleActive,
  index,
}: SortableInstagramCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.6 : 1,
    transformOrigin: "50% 50%",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white rounded-xl border-2 ${
        post.isActive ? "border-purple-200" : "border-gray-200"
      } hover:border-purple-300 hover:shadow-xl transition-all duration-300 overflow-hidden will-change-transform transform-gpu`}
      role="listitem"
    >
      {/* Drag Handle - Sadece buradan sürüklenebilir */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-20 bg-purple-600 text-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-grab active:cursor-grabbing touch-none"
        aria-label="Taşı"
        type="button"
      >
        <FaGripVertical className="text-sm" />
      </button>

      {/* Sıra Badge */}
      <div className="absolute top-2 right-2 z-20 bg-gray-800/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
        {index + 1}
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-square bg-linear-to-br from-pink-100 via-purple-100 to-orange-100">
        {post.thumbnailUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 select-none"
            style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FaInstagram className="text-6xl text-purple-300" />
          </div>
        )}
        {!post.isActive && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold">
              Pasif
            </span>
          </div>
        )}
      </div>

      {/* Caption - Sabit yükseklik, sadece caption varsa göster */}
      {post.caption && (
        <div className="bg-white h-12 flex items-center border-t border-gray-200">
          <p className="px-3 py-2 text-xs text-gray-700 font-medium line-clamp-2">
            {post.caption}
          </p>
        </div>
      )}

      {/* Aksiyon Butonları */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
        <button
          onClick={onToggleActive}
          className={`px-3 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
            post.isActive
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
          type="button"
        >
          {post.isActive ? <FaEye /> : <FaEyeSlash />}
          {post.isActive ? "Aktif" : "Pasif"}
        </button>
        <button
          onClick={onEdit}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          type="button"
        >
          <FaEdit />
          Düzenle
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
          type="button"
        >
          <FaTrash />
          Sil
        </button>
      </div>
    </div>
  );
}

