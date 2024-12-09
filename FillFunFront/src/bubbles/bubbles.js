import React, { useEffect, useRef } from "react";
import "./bubbles.css"; // Ensure the correct CSS file path

const Bubbles = () => {
    const bubblesContainer = useRef(null);

    useEffect(() => {
        const container = bubblesContainer.current;

        // Create 20 bubbles dynamically
        for (let i = 0; i < 20; i++) {
            const bubble = document.createElement("span");
            const size = Math.random() * 50 + 10; // Random size
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`; // Random horizontal position
            bubble.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random speed
            bubble.style.animationDelay = `${Math.random() * 5}s`; // Random delay
            container.appendChild(bubble);
        }

        // Cleanup on unmount
        return () => {
            container.innerHTML = "";
        };
    }, []);

    return <div className="bubbles" ref={bubblesContainer}></div>;
};

export default Bubbles;
