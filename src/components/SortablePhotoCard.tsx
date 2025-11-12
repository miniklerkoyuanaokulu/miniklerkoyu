"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { FaEdit, FaTrash, FaGripVertical } from "react-icons/fa";
import type { MediaItem } from "@/lib/types";

interface SortablePhotoCardProps {
  id: string;
  photo: MediaItem;
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}

export default function SortablePhotoCard({
  id,
  photo,
  onEdit,
  onDelete,
  index,
}: SortablePhotoCardProps) {
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
      className="group relative bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden will-change-transform transform-gpu"
      role="listitem"
    >
      {/* Drag Handle - Sadece buradan sürüklenebilir */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-20 bg-blue-600 text-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-grab active:cursor-grabbing touch-none"
        aria-label="Taşı"
        type="button"
      >
        <FaGripVertical className="text-sm" />
      </button>

      {/* Sıra Badge */}
      <div className="absolute top-2 right-2 z-20 bg-gray-800/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
        {index + 1}
      </div>

      {/* Görsel - Caption varsa kare, yoksa daha uzun (caption alanını kaplasın) */}
      <div className={`relative ${photo.caption ? 'aspect-square' : 'aspect-[1/1.13]'}`}>
        <Image
          src={photo.url}
          alt={photo.caption || "Fotoğraf"}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 select-none"
          draggable={false}
          unoptimized
        />
      </div>

      {/* Caption - Sabit yükseklik, sadece caption varsa göster */}
      {photo.caption && (
        <div className="bg-white h-9 flex items-center border-t border-gray-200">
          <p className="px-3 py-2 text-xs text-gray-700 font-medium line-clamp-2">
            {photo.caption}
          </p>
        </div>
      )}

      {/* Aksiyon Butonları */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          type="button"
        >
          <FaEdit />
          Düzenle
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
          type="button"
        >
          <FaTrash />
          Sil
        </button>
      </div>
    </div>
  );
}

