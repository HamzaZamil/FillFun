import React, { useEffect, useRef } from "react";
import "./bubbles.css";

const Bubbles = () => {
    const containerRef = useRef(null);
    const maxBubbles = 10; // Limit the number of bubbles

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const createBubble = () => {
            if (container.childElementCount >= maxBubbles) return; // Check max bubbles

            const bubble = document.createElement("div");
            bubble.className = "bubble";

            const size = Math.random() * 50 + 50; // Random size between 50px and 100px
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`; // Spread across the width
            bubble.style.top = `${Math.random() * 100}%`; // Spread across the height
            bubble.style.animationDuration = `${Math.random() * 3 + 3}s`; // Duration between 3s and 6s
            container.appendChild(bubble);

            // Remove bubble after animation
            bubble.addEventListener("animationend", () => {
                bubble.remove();
            });
        };

        // Generate bubbles at intervals
        const interval = setInterval(createBubble, 1000); // One bubble every 1.5 seconds

        return () => clearInterval(interval);
    }, []);

    return <div ref={containerRef} className="bubbles-container"></div>;
};

export default Bubbles;
