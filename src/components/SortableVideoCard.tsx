"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { FaEdit, FaTrash, FaGripVertical, FaYoutube, FaVideo } from "react-icons/fa";
import type { MediaItem } from "@/lib/types";

interface SortableVideoCardProps {
  id: string;
  video: MediaItem;
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}

export default function SortableVideoCard({
  id,
  video,
  onEdit,
  onDelete,
  index,
}: SortableVideoCardProps) {
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
      className="group relative bg-white rounded-xl border-2 border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 overflow-hidden will-change-transform transform-gpu"
      role="listitem"
    >
      {/* Drag Handle - Sadece buradan sürüklenebilir */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-20 bg-green-600 text-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-grab active:cursor-grabbing touch-none"
        aria-label="Taşı"
        type="button"
      >
        <FaGripVertical className="text-sm" />
      </button>

      {/* Sıra Badge */}
      <div className="absolute top-2 right-2 z-20 bg-gray-800/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
        {index + 1}
      </div>

      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-100">
        {video.source === "youtube" ? (
          // YouTube Thumbnail
          video.thumbnailUrl ? (
            <Image
              src={video.thumbnailUrl}
              alt={video.caption || "Video"}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 select-none"
              draggable={false}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaYoutube className="text-6xl text-red-500" />
            </div>
          )
        ) : (
          // Uploaded Video
          <video
            src={video.url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
            muted
            draggable={false}
          />
        )}

        {/* Source Badge */}
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium flex items-center gap-1">
          {video.source === "youtube" ? (
            <>
              <FaYoutube /> YouTube
            </>
          ) : (
            <>
              <FaVideo /> Upload
            </>
          )}
        </div>
      </div>

      {/* Caption - Sabit yükseklik, sadece caption varsa göster */}
      {video.caption && (
        <div className="bg-white h-12 flex items-center border-t border-gray-200">
          <p className="px-3 py-2 text-xs text-gray-700 font-medium line-clamp-2">
            {video.caption}
          </p>
        </div>
      )}

      {/* Aksiyon Butonları */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
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

