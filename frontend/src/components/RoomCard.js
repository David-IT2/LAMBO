import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  return (
    <article className="room-card bg-white rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="thumb relative overflow-hidden" style={{height:"240px"}}>
        <img src={room.image} alt={room.type} className="img-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {room.badge && (
          <span className="absolute top-4 left-4 pill bg-white text-ink">{room.badge}</span>
        )}
        <span className={`absolute top-4 right-4 pill ${room.available ? "bg-brand text-white" : "bg-white/20 text-white backdrop-blur-sm"}`}>
          {room.available ? "Available" : "Fully Booked"}
        </span>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <p className="font-display text-white font-bold text-xl leading-tight">{room.type}</p>
          <p className="text-white font-bold text-sm bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            KSh {room.price.toLocaleString()}<span className="font-normal text-white/70">/mo</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-stone-500 text-sm mb-4">{room.tagline}</p>

        {/* Quick stats */}
        <div className="flex gap-5 mb-4 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-parchment flex items-center justify-center text-[10px]">👤</span>
            {room.occupancy === 1 ? "Single" : `${room.occupancy} people`}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-parchment flex items-center justify-center text-[10px]">📐</span>
            {room.size}
          </span>
        </div>

        {/* Top amenities */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.amenities.slice(0,3).map(a => (
            <span key={a} className="text-xs bg-parchment text-gray-600 px-2.5 py-1 rounded-full">{a}</span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs bg-parchment text-gray-400 px-2.5 py-1 rounded-full">+{room.amenities.length-3}</span>
          )}
        </div>

        <Link to={`/rooms/${room.slug}`}
          className="block w-full text-center btn-dark text-sm py-3 rounded-xl">
          View Details →
        </Link>
      </div>
    </article>
  );
}
