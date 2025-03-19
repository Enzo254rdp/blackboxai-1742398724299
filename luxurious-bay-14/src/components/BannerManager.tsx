
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Banner as BannerType } from '../lib/types';
import { BannerService } from '../lib/api/bannerService';
import Banner from './Banner';

interface BannerManagerProps {
  position: BannerType['position'];
  variant?: 'full' | 'compact' | 'mini';
  className?: string;
  maxBanners?: number;
}

export default function BannerManager({ 
  position, 
  variant = 'compact',
  className = '',
  maxBanners = 1 
}: BannerManagerProps) {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        // Get banners for this position
        const fetchedBanners = await BannerService.getBannersByPosition(position);
        
        // Filter out banners that have been closed by the user
        const closedBanners = JSON.parse(localStorage.getItem('closedBanners') || '[]');
        const filteredBanners = fetchedBanners.filter(banner => !closedBanners.includes(banner.id));
        
        // Limit to maxBanners
        setBanners(filteredBanners.slice(0, maxBanners));
      } catch (error) {
        console.error('Error fetching banners:', error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBanners();
  }, [position, maxBanners, location.pathname]);
  
  const handleCloseBanner = (bannerId: string) => {
    setBanners(prevBanners => prevBanners.filter(banner => banner.id !== bannerId));
  };
  
  if (loading || banners.length === 0) return null;
  
  return (
    <>
      {banners.map((banner) => (
        <Banner
          key={banner.id}
          banner={banner}
          variant={variant}
          className={className}
          onClose={() => handleCloseBanner(banner.id)}
        />
      ))}
    </>
  );
}
