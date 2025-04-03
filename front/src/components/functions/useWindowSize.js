import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            document.documentElement.style.setProperty(
                "--window-height",
                `${window.innerHeight}px`
            );
        };

        window.addEventListener("resize", handleResize);
        handleResize();  
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;  
};

export default useWindowSize;
