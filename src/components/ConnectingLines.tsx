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

export default function ConnectingLines({ activeLines = [false, false, false, false] }: { activeLines?: boolean[] }) {
    const paths = {
        // Top sources
        erpToSdk: "M 220 100 V 130 Q 220 140 230 140 H 340 Q 350 140 350 150 V 180",
        crmToSdk: "M 350 100 V 180",
        subsToSdk: "M 480 100 V 130 Q 480 140 470 140 H 360 Q 350 140 350 150 V 180",

        // Top sources to Event Dest
        legacyToEd: "M 640 100 V 130 Q 640 140 650 140 H 700 Q 710 140 710 150 V 180",
        bookingToEd: "M 780 100 V 130 Q 780 140 770 140 H 720 Q 710 140 710 150 V 180",

        // Intermediate to Stripe
        sdkToStripe: "M 350 220 V 240 Q 350 260 370 265 L 430 280",
        edToStripe: "M 710 220 V 240 Q 710 260 690 265 L 570 280",

        // Flow inward from sides
        gridToStripe: "M 220 300 H 430",
        marketToStripe: "M 380 300 H 430",

        // Flow outward to rights
        stripeToPipeline: "M 570 300 H 620",
        pipelineToDb: "M 706 300 H 822",

        // Flow to Orchestration
        stripeToOrch: "M 500 370 V 420",
    };

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
