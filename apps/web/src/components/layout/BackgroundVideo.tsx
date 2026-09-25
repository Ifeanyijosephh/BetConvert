import React from "react";

export const BackgroundVideo: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* High-Resolution Image: Player's boot on football on grass pitch */}
      <img
        src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=2000&q=80"
        alt="Player boot on football"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-50 scale-105"
      />

      {/* Dark Gradient Overlay for Maximum Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/65 via-[#0A0A0B]/80 to-[#0A0A0B]/98" />

      {/* Neon Radial Glow Highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00FF66]/12 rounded-full blur-[150px]" />
    </div>
  );
};
