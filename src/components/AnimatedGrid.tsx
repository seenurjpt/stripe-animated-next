"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const ICONS_WEB = [
    "/assets/aws-web.png",
    "/assets/azure-web.png",
    "/assets/chatgpt-web.png",
    "/assets/copilot-web.png",
    "/assets/crewai-web.png",
    "/assets/docker-web.png",
    "/assets/fastapi-web.png",
    "/assets/github-web.png",
    "/assets/google-cloude-web.png",
    "/assets/jira-web.png",
    "/assets/langchain-web.png",
    "/assets/mongodb-web.png",
    "/assets/n8n-web.png",
    "/assets/pine-coin-1.png",
    "/assets/postgresql-web.png",
    "/assets/postman-web.png",
    "/assets/pyspark-web.png",
    "/assets/python-mob.png",
    "/assets/pytorch-web.png",
    "/assets/react-web.png",
    "/assets/slack-web.png",
    "/assets/sql-web.png",
    "/assets/tensorflow-web.png",
    "/assets/vercel-web.png",
    "/assets/vs-code-web.png",
    "/assets/zapier-web.png",
];

const ICONS_MOB = [
    "/assets/aws-mob.png",
    "/assets/azure-mob.png",
    "/assets/chatgpt-mob.png",
    "/assets/copilot-mob.png",
    "/assets/crewai-mob.png",
    "/assets/docker-mob.png",
    "/assets/fastapi-mob.png",
    "/assets/github-mob.png",
    "/assets/google-cloude-mob.png",
    "/assets/jira-mob.png",
    "/assets/langchain-mob.png",
    "/assets/mongodb-mob.png",
    "/assets/n8n-mob.png",
    "/assets/pine-coin-1.png",
    "/assets/postgresql-mob.png",
    "/assets/postman-mob.png",
    "/assets/pyspark-mob.png",
    "/assets/python-mob.png",
    "/assets/pytorch-mob.png",
    "/assets/react-mob.png",
    "/assets/slack-mob.png",
    "/assets/sql-mob.png",
    "/assets/tensorflow-mob.png",
    "/assets/vercel-mob.png",
    "/assets/vs-code-mob.png",
    "/assets/zapier-mob.png",
];

export default function AnimatedGrid({ isMobile = false }: { isMobile?: boolean }) {
    const ICONS = isMobile ? ICONS_MOB : ICONS_WEB;
    const [slots, setSlots] = useState<(string | "EMPTY")[]>(["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]);

    useEffect(() => {
        setSlots([
            ICONS[Math.floor(Math.random() * ICONS.length)],
            ICONS[Math.floor(Math.random() * ICONS.length)],
            ICONS[Math.floor(Math.random() * ICONS.length)],
            "EMPTY",
            ICONS[Math.floor(Math.random() * ICONS.length)],
            ICONS[Math.floor(Math.random() * ICONS.length)],
        ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlots(prev => {
                const next = [...prev];
                const slotToUpdate = Math.floor(Math.random() * 6);
                if (Math.random() > 0.7) {
                    next[slotToUpdate] = "EMPTY";
                } else {
                    let newIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
                    while (next.includes(newIcon)) {
                        newIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
                    }
                    next[slotToUpdate] = newIcon;
                }
                return next;
            });
        }, 2000);
        return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    return (
        <div className="grid grid-cols-3 gap-2 bg-[#0a0e17]/90 p-3 rounded-2xl border border-[#1e2336] shadow-2xl">
            {slots.map((src, i) => (
                <div
                    key={i}
                    className={`w-14 h-14 rounded-lg flex items-center justify-center p-2 overflow-hidden ${src === "EMPTY" ? 'border-[1.5px] border-dashed border-white/15 bg-[rgba(15,20,35,0.3)] opacity-30' : 'bg-white border border-gray-100'}`}
                >
                    {src !== "EMPTY" && (
                        <div key={src} className="animate-flip-in">
                            <Image
                                src={src}
                                alt="stack-icon"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
