"use client";

import React, { useState, useEffect } from "react";
import ConnectingLines from "./ConnectingLines";
import AnimatedGrid from "./AnimatedGrid";
import Image from "next/image";

const DashedBox = ({ className = "" }: { className?: string }) => (
  <div
    className={`w-[85px] h-[36px] rounded-lg border-[1.5px] border-dashed border-white/15 bg-[rgba(15,20,35,0.3)] transition-all duration-300 ${className}`}
  ></div>
);

const NodeContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`px-4 py-1.5 rounded-lg border bg-[#533afd] border-[#635bff] text-white text-[13px] font-medium whitespace-nowrap ${className}`}
  >
    {children}
  </div>
);

const FloatingNode = ({
  children,
  x,
  y,
}: {
  children: React.ReactNode;
  x: number;
  y: number;
}) => (
  <div
    className='absolute -translate-x-1/2 -translate-y-1/2 z-10'
    style={{ left: `${x}px`, top: `${y}px` }}
  >
    {children}
  </div>
);

const DB_ICONS_WEB = [
  "/assets/postgresql-web.png",
  "/assets/mongodb-web.png",
  "/assets/sql-web.png",
  "/assets/docker-web.png",
  "/assets/aws-web.png",
  "/assets/azure-web.png",
];

const DB_ICONS_MOB = [
  "/assets/postgresql-mob.png",
  "/assets/mongodb-mob.png",
  "/assets/sql-mob.png",
  "/assets/docker-mob.png",
  "/assets/aws-mob.png",
  "/assets/azure-mob.png",
];

export default function StripeSection() {
  const [tick, setTick] = useState(0);
  const [dbIdx, setDbIdx] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      setScale(Math.min(1, vw / 1000));
      setIsMobile(vw < 768);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev + 1) % 20);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDbIdx((prev) => (prev + 1) % DB_ICONS_WEB.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const DB_ICONS = isMobile ? DB_ICONS_MOB : DB_ICONS_WEB;

  const pspOrder = [1, 2, 0, 3]; // 2nd, 3rd, 1st, 4th PSP slots, exactly as requested

  const isLineActive = (index: number) => {
    const orderPos = pspOrder.indexOf(index);
    if (tick <= 8) return tick >= orderPos * 2 + 1; // Build-up
    if (tick > 9 && tick <= 17) return tick < 10 + (3 - orderPos) * 2 + 1; // Teardown
    if (tick > 17) return false; // Idle
    return true; // Hold (tick 9)
  };

  const isPspActive = (index: number) => {
    const orderPos = pspOrder.indexOf(index);
    if (tick <= 8) return tick >= orderPos * 2 + 2; // Build-up
    if (tick > 9 && tick <= 17) return tick < 10 + (3 - orderPos) * 2; // Teardown
    if (tick > 17) return false; // Idle
    return true; // Hold (tick 9)
  };

  const activeLines = [
    isLineActive(0),
    isLineActive(1),
    isLineActive(2),
    isLineActive(3),
  ];

  return (
    <div
      style={{ width: `${1000 * scale}px`, height: `${640 * scale}px` }}
      className='relative flex-shrink-0'
    >
      <div
        className='relative w-[1000px] h-[640px]'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <ConnectingLines activeLines={activeLines} isMobile={isMobile} />

        {/* Top Nodes — desktop: single row; mobile: two rows, CRM hidden */}
        {isMobile ? (
          <>
            {/* Row 1 */}
            <FloatingNode x={240} y={72}>
              <NodeContent className='!bg-[#362baa]'>ERP</NodeContent>
            </FloatingNode>
            <FloatingNode x={720} y={72}>
              <NodeContent className='!bg-[#362baa]'>Subscriptions</NodeContent>
            </FloatingNode>
            {/* Row 2 */}
            <FloatingNode x={290} y={148}>
              <NodeContent className='!bg-[#362baa]'>Legacy billing</NodeContent>
            </FloatingNode>
            <FloatingNode x={720} y={148}>
              <NodeContent className='!bg-[#362baa]'>Booking system</NodeContent>
            </FloatingNode>
          </>
        ) : (
          <>
            <FloatingNode x={220} y={100}>
              <NodeContent className='!bg-[#362baa]'>ERP</NodeContent>
            </FloatingNode>
            <FloatingNode x={350} y={100}>
              <NodeContent className='!bg-[#362baa]'>CRM</NodeContent>
            </FloatingNode>
            <FloatingNode x={480} y={100}>
              <NodeContent className='!bg-[#362baa]'>Subscriptions</NodeContent>
            </FloatingNode>
            <FloatingNode x={640} y={100}>
              <NodeContent className='!bg-[#362baa]'>Legacy billing</NodeContent>
            </FloatingNode>
            <FloatingNode x={780} y={100}>
              <NodeContent className='!bg-[#362baa]'>Booking system</NodeContent>
            </FloatingNode>
          </>
        )}

        {/* Mid Nodes (Fixed) */}
        <FloatingNode x={350} y={200}>
          <NodeContent>SDK</NodeContent>
        </FloatingNode>

        <FloatingNode x={710} y={200}>
          <NodeContent>Event Destinations</NodeContent>
        </FloatingNode>

        {/* Left side (Fixed/Grid) */}
        <FloatingNode x={350} y={300}>
          <NodeContent className='flex items-center gap-1'>
            App Marketplace <span className='text-[10px]'>↗</span>
          </NodeContent>
        </FloatingNode>

        <div
          className='absolute -translate-y-1/2'
          style={{ left: "40px", top: "300px" }}
        >
          <AnimatedGrid isMobile={isMobile} />
        </div>

        {/* Center Logo (Persistent) */}
        <FloatingNode x={500} y={300}>
          <div className='w-28 h-28 rounded-[20px] bg-[#533afd] flex items-center justify-center border border-[#7a73ff]/30'>
            <span className='text-white font-bold text-3xl tracking-tighter'>
              stripe
            </span>
          </div>
        </FloatingNode>

        {/* Right side (Fixed) */}
        <FloatingNode x={650} y={300}>
          <NodeContent>Data Pipeline</NodeContent>
        </FloatingNode>

        <FloatingNode x={850} y={300}>
          <div className='w-14 h-14 bg-white rounded-xl flex items-center justify-center p-2 animate-flip-in'>
            <div key={dbIdx} className=''>
              <Image
                src={DB_ICONS[dbIdx]}
                alt='db'
                width={40}
                height={40}
                className='object-contain'
              />
            </div>
          </div>
        </FloatingNode>

        {/* Bottom Processing (Fixed) */}
        <FloatingNode x={500} y={420}>
          <NodeContent className='px-6 py-2'>Orchestration</NodeContent>
        </FloatingNode>

        {/* Bottom Sequence Nodes (0 to 4 logic) plotted at exact SVG line endings */}
        {isPspActive(0) ? (
          <FloatingNode x={350} y={520}>
            <NodeContent className='w-[85px] text-center !bg-[#362baa] animate-[swipeReveal_0.6s_cubic-bezier(0.2,0.8,0.2,1)_forwards]'>
              PSP
            </NodeContent>
          </FloatingNode>
        ) : (
          <FloatingNode x={350} y={520}>
            <DashedBox />
          </FloatingNode>
        )}

        {isPspActive(1) ? (
          <FloatingNode x={450} y={520}>
            <NodeContent className='w-[85px] text-center !bg-[#362baa] animate-[swipeReveal_0.6s_cubic-bezier(0.2,0.8,0.2,1)_forwards]'>
              PSP
            </NodeContent>
          </FloatingNode>
        ) : (
          <FloatingNode x={450} y={520}>
            <DashedBox />
          </FloatingNode>
        )}

        {isPspActive(2) ? (
          <FloatingNode x={550} y={520}>
            <NodeContent className='w-[85px] text-center !bg-[#362baa] animate-[swipeReveal_0.6s_cubic-bezier(0.2,0.8,0.2,1)_forwards]'>
              PSP
            </NodeContent>
          </FloatingNode>
        ) : (
          <FloatingNode x={550} y={520}>
            <DashedBox />
          </FloatingNode>
        )}

        {isPspActive(3) ? (
          <FloatingNode x={650} y={520}>
            <NodeContent className='w-[85px] text-center !bg-[#362baa] animate-[swipeReveal_0.6s_cubic-bezier(0.2,0.8,0.2,1)_forwards]'>
              PSP
            </NodeContent>
          </FloatingNode>
        ) : (
          <FloatingNode x={650} y={520}>
            <DashedBox />
          </FloatingNode>
        )}
      </div>
    </div>
  );
}
