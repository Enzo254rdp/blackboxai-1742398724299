
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { Banner as BannerType } from '../lib/types';

interface BannerProps {
  banner: BannerType;
  onClose?: () => void;
  variant?: 'full' | 'compact' | 'mini';
  className?: string;
}

export default function Banner({ 
  banner, 
  onClose, 
  variant = 'full', 
  className = '' 
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    // Trigger animation after a small delay for better effect
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [banner.id]);
  
  const handleClose = () => {
    setIsLeaving(true);
    // Add delay to match animation duration before removing from DOM
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 300);
    
    // Store closed banner IDs in localStorage so we don't show them again in this session
    const closedBanners = JSON.parse(localStorage.getItem('closedBanners') || '[]');
    localStorage.setItem('closedBanners', JSON.stringify([...closedBanners, banner.id]));
  };
  
  if (!isVisible) return null;
  
  // Get animation classes based on banner animation property and state
  const getAnimationClass = () => {
    if (isLeaving) {
      switch (banner.animation) {
        case 'fade':
          return 'opacity-0 -translate-y-full';
        case 'slide':
          return 'translate-x-full opacity-0';
        case 'bounce':
          return 'opacity-0 scale-95';
        case 'pulse':
          return 'opacity-0';
        default:
          return 'opacity-0';
      }
    }
    
    if (!isAnimated) {
      switch (banner.animation) {
        case 'fade':
          return 'opacity-0 -translate-y-full';
        case 'slide':
          return 'translate-x-full opacity-0';
        case 'bounce':
          return 'opacity-0 scale-95';
        case 'pulse':
          return 'opacity-0';
        default:
          return 'opacity-0';
      }
    }
    
    switch (banner.animation) {
      case 'bounce':
        return 'animate-bounce';
      case 'pulse':
        return 'animate-pulse';
      default:
        return '';
    }
  };
  
  // Get size classes based on banner size property
  const getSizeClass = () => {
    switch (banner.size) {
      case 'small':
        return 'py-1 px-2';
      case 'medium':
        return 'py-1.5 px-3';
      case 'large':
        return 'py-2 px-4';
      default:
        return 'py-1 px-2';
    }
  };
  
  // Define styles based on variant
  if (variant === 'compact') {
    return (
      <div 
        ref={bannerRef}
        className={`relative ${getSizeClass()} ${className} transition-all duration-300 ease-in-out`}
        style={{ 
          backgroundColor: banner.backgroundColor || '#4dabf7',
          color: banner.textColor || '#ffffff',
          opacity: isLeaving ? 0 : isAnimated ? 1 : 0,
          transform: isLeaving ? 'translateY(-100%)' : isAnimated ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <p className="text-xs font-medium mr-2 truncate max-w-[120px] sm:max-w-full">
              {banner.title}
              {banner.subtitle && <span className="hidden sm:inline text-xs"> - {banner.subtitle}</span>}
            </p>
          </div>
          
          <div className="flex items-center">
            {banner.ctaText && banner.ctaLink && (
              <Link 
                to={banner.ctaLink} 
                className="text-[10px] sm:text-xs font-medium hover:underline flex items-center mr-2"
              >
                {banner.ctaText} <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
              </Link>
            )}
            
            <button
              type="button"
              className="text-current p-0.5 hover:opacity-75 rounded-full transition-opacity"
              onClick={handleClose}
              aria-label="Close banner"
            >
              <X className="h-2 w-2 sm:h-3 sm:w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'mini') {
    return (
      <div 
        ref={bannerRef}
        className={`fixed bottom-4 right-4 z-50 max-w-[160px] rounded-lg shadow-lg overflow-hidden ${getAnimationClass()} ${className}`}
        style={{ 
          backgroundColor: banner.backgroundColor || '#4dabf7',
          color: banner.textColor || '#ffffff',
          opacity: isLeaving ? 0 : isAnimated ? 1 : 0,
          transform: isLeaving ? 'translateX(100%)' : isAnimated ? 'translateX(0)' : 'translateX(100%)',
          transition: 'opacity 0.3s ease, transform 0.3s ease'
        }}
      >
        <button
          type="button"
          className="absolute top-1 right-1 text-current p-0.5 hover:opacity-75 rounded-full transition-opacity bg-black/10"
          onClick={handleClose}
          aria-label="Close banner"
        >
          <X className="h-2 w-2" />
        </button>
        
        <div className="p-2">
          <h3 className="font-medium text-[10px]">{banner.title}</h3>
          {banner.subtitle && <p className="text-[8px] mt-0.5 opacity-90">{banner.subtitle}</p>}
          
          {banner.ctaText && banner.ctaLink && (
            <Link 
              to={banner.ctaLink} 
              className="inline-block mt-1 text-[8px] font-medium py-0.5 px-1 rounded bg-white/20 hover:bg-white/30 transition-colors"
            >
              {banner.ctaText}
            </Link>
          )}
        </div>
      </div>
    );
  }
  
  // Default full variant - significantly smaller
  return (
    <div 
      ref={bannerRef}
      className={`relative overflow-hidden ${getAnimationClass()} ${className}`}
      style={{ 
        backgroundColor: banner.backgroundColor || '#4dabf7',
        color: banner.textColor || '#ffffff',
        opacity: isLeaving ? 0 : isAnimated ? 1 : 0,
        transform: isLeaving ? 'translateY(-20px)' : isAnimated ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        height: banner.size === 'small' ? '40px' : banner.size === 'medium' ? '50px' : '60px'
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex-1 flex items-center">
            {/* Image - much smaller */}
            {banner.image && (
              <div className="flex-shrink-0 w-6 h-6 rounded overflow-hidden mr-2">
                <img
                  src={banner.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Content - more compact */}
            <div>
              <h3 className="text-xs font-semibold">{banner.title}</h3>
              {banner.subtitle && <p className="text-[10px] opacity-90">{banner.subtitle}</p>}
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex items-center ml-2">
            {banner.ctaText && banner.ctaLink && (
              <Link 
                to={banner.ctaLink} 
                className="bg-white/20 hover:bg-white/30 transition-colors text-current py-0.5 px-1.5 rounded text-[10px] font-medium mr-2"
              >
                {banner.ctaText}
              </Link>
            )}
            
            <button
              type="button"
              className="text-current p-0.5 hover:bg-black/10 rounded-full transition-colors"
              onClick={handleClose}
              aria-label="Close banner"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
