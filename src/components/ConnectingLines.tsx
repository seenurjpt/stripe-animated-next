import React from 'react';

const DrawnLine = ({ d, id, active }: { d: string, id: string, active: boolean }) => (
    <>
        {/* Base faint dashed line */}
        <path
            d={d}
            className="stroke-[#2a2f42] stroke-[1.5px] fill-none"
            strokeDasharray="4 4"
        />

        {/* Mask to reveal the glowing line sequentially */}
        <mask id={id}>
            <path
                d={d}
                stroke="white"
                strokeWidth="6"
                fill="none"
                pathLength="100"
                strokeDasharray="100 100"
                strokeDashoffset={active ? "0" : "100"}
                className="transition-all duration-500 ease-in-out"
            />
        </mask>

        {/* Glowing active dashed line */}
        <path
            d={d}
            className="stroke-[#635bff] stroke-[2px] fill-none drop-shadow-[0_0_8px_rgba(99,91,255,0.8)]"
            strokeDasharray="4 4"
            mask={`url(#${id})`}
        />
    </>
);

// Stripe box center: (500, 300), ~112×112px → edges: left=444, right=556, top=244
const desktopPaths = {
    // Top sources → directly into Stripe box
    erpToStripe:     "M 220 100 V 180 Q 220 275 280 275 H 444",
    crmToStripe:     "M 350 100 V 200 Q 350 244 400 244 H 466",
    subsToStripe:    "M 480 100 V 220 Q 480 244 494 244",
    legacyToStripe:  "M 640 100 V 200 Q 640 244 600 244 H 534",
    bookingToStripe: "M 780 100 V 180 Q 780 275 720 275 H 556",

    // Flow inward from sides
    gridToStripe:   "M 220 300 H 430",
    marketToStripe: "M 380 300 H 430",

    // Flow outward to right
    stripeToPipeline: "M 570 300 H 620",
    pipelineToDb:     "M 706 300 H 822",

    // Flow to Orchestration
    stripeToOrch: "M 500 370 V 420",
};

// Mobile: top nodes in 2 rows (3+2)
//   Row 1 (y=72): ERP(215), CRM(490), Subscriptions(780)
//   Row 2 (y=148): Legacy billing(340), Booking system(660)
const mobilePaths = {
    // Top sources → directly into Stripe box
    erpToStripe:     "M 215 72 V 180 Q 215 275 275 275 H 444",
    crmToStripe:     "M 490 72 V 220 Q 490 244 494 244",
    subsToStripe:    "M 780 72 V 180 Q 780 275 720 275 H 556",
    legacyToStripe:  "M 340 148 V 220 Q 340 280 390 280 H 444",
    bookingToStripe: "M 660 148 V 220 Q 660 280 620 280 H 556",

    // Flow inward from sides
    gridToStripe:   "M 220 300 H 430",
    marketToStripe: "M 380 300 H 430",

    // Flow outward to right
    stripeToPipeline: "M 570 300 H 620",
    pipelineToDb:     "M 706 300 H 822",

    // Flow to Orchestration
    stripeToOrch: "M 500 370 V 420",
};

export default function ConnectingLines({
    activeLines = [false, false, false, false],
    isMobile = false,
}: {
    activeLines?: boolean[];
    isMobile?: boolean;
}) {
    const paths = isMobile ? mobilePaths : desktopPaths;

    const bottomPaths = [
        "M 500 460 V 490 H 350 V 520",
        "M 500 460 V 490 H 450 V 520",
        "M 500 460 V 490 H 550 V 520",
        "M 500 460 V 490 H 650 V 520",
    ];

    return (
        <svg
            className="absolute inset-0 pointer-events-none w-full h-full"
            viewBox="0 0 1000 640"
            xmlns="http://www.w3.org/2000/svg"
        >
            {Object.entries(paths).map(([key, d]) => (
                <path
                    key={key}
                    d={d}
                    className="stroke-[#2a2f42] stroke-[1.5px] fill-none"
                    strokeDasharray="4 4"
                />
            ))}

            {/* Dynamic Animated Bottom Lines */}
            {bottomPaths.map((d, i) => (
                <DrawnLine
                    key={`bottom-line-${i}`}
                    id={`psp-line-${i}`}
                    d={d}
                    active={activeLines[i] ?? false}
                />
            ))}
        </svg>
    );
}
