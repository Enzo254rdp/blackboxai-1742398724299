
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface EnzoBayLogoProps {
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export default function EnzoBayLogo({
  variant = "default",
  size = "md",
  className = "",
  animated = true,
}: EnzoBayLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Define colors based on variant
  const colors = {
    default: {
      enzo: "text-enzobay-brown",
      bay: "text-enzobay-orange",
      dot: "bg-enzobay-orange"
    },
    light: {
      enzo: "text-white",
      bay: "text-enzobay-orange-light",
      dot: "bg-enzobay-orange-light"
    },
    dark: {
      enzo: "text-enzobay-brown-dark",
      bay: "text-enzobay-orange-dark",
      dot: "bg-enzobay-orange-dark"
    }
  };
  
  // Define sizing
  const sizing = {
    sm: "text-xl leading-tight",
    md: "text-2xl md:text-3xl leading-tight",
    lg: "text-3xl md:text-4xl leading-tight"
  };
  
  // Define animations
  const baseTransition = "transition-all duration-300";
  const dotAnimation = animated ? "animate-pulse" : "";
  const loadAnimation = isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  
  return (
    <Link 
      to="/" 
      className={`flex items-center ${className} ${baseTransition} ${loadAnimation}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transitionDelay: "150ms" }}
    >
      <div className="font-bold tracking-tight relative inline-flex items-baseline">
        <span 
          className={`${colors[variant].enzo} ${sizing[size]} font-serif italic ${baseTransition}`}
          style={{ 
            transform: isHovered ? "translateX(-1px) rotate(-1deg)" : "translateX(0) rotate(0)",
            transitionDelay: "50ms"
          }}
        >
          Enzo
        </span>
        <span 
          className={`${colors[variant].bay} ${sizing[size]} font-sans not-italic font-black ${baseTransition}`}
          style={{ 
            letterSpacing: '-0.02em',
            transform: isHovered ? "translateX(1px) rotate(1deg)" : "translateX(0) rotate(0)",
            transitionDelay: "100ms"
          }}
        >
          Bay
        </span>
        <span 
          className={`absolute -top-1 -right-2 w-2 h-2 ${colors[variant].dot} rounded-full opacity-90 ${dotAnimation} ${baseTransition}`}
          style={{ 
            transform: isHovered ? "scale(1.3)" : "scale(1)",
            transitionDelay: "150ms"
          }}
        ></span>
      </div>
    </Link>
  );
}
