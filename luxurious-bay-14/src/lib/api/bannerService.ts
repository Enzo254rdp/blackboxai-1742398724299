
import { Banner, BANNERS } from "../types";

// Simulated API service for banners with advanced features
export const BannerService = {
  // Get all banners
  getAllBanners: async (): Promise<Banner[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(BANNERS);
      }, 300);
    });
  },

  // Get active banners by position
  getBannersByPosition: async (position: Banner['position']): Promise<Banner[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date().toISOString();
        const filteredBanners = BANNERS.filter(banner => 
          banner.position === position && 
          banner.status === 'active' &&
          (!banner.startDate || banner.startDate <= now) &&
          (!banner.endDate || banner.endDate >= now)
        ).sort((a, b) => a.priority - b.priority);
        
        resolve(filteredBanners);
      }, 300);
    });
  },

  // Get a single banner by ID
  getBannerById: async (id: string): Promise<Banner | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const banner = BANNERS.find(b => b.id === id) || null;
        resolve(banner);
      }, 300);
    });
  },

  // Create a new banner (admin only)
  createBanner: async (bannerData: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Banner> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBanner: Banner = {
          ...bannerData,
          id: `banner-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // In a real implementation, this would be saved to a database
        BANNERS.push(newBanner);
        resolve(newBanner);
      }, 500);
    });
  },

  // Update an existing banner (admin only)
  updateBanner: async (id: string, bannerData: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Banner | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const bannerIndex = BANNERS.findIndex(b => b.id === id);
        if (bannerIndex === -1) {
          resolve(null);
          return;
        }
        
        const updatedBanner: Banner = {
          ...BANNERS[bannerIndex],
          ...bannerData,
          updatedAt: new Date().toISOString()
        };
        
        // In a real implementation, this would update the database
        BANNERS[bannerIndex] = updatedBanner;
        resolve(updatedBanner);
      }, 500);
    });
  },

  // Delete a banner (admin only)
  deleteBanner: async (id: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const bannerIndex = BANNERS.findIndex(b => b.id === id);
        if (bannerIndex === -1) {
          resolve(false);
          return;
        }
        
        // In a real implementation, this would delete from the database
        BANNERS.splice(bannerIndex, 1);
        resolve(true);
      }, 500);
    });
  },

  // Get banner statistics (admin only)
  getBannerStats: async (): Promise<{
    totalCount: number;
    activeCount: number;
    byPosition: Record<Banner['position'], number>;
  }> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date().toISOString();
        const activeCount = BANNERS.filter(banner => 
          banner.status === 'active' &&
          (!banner.startDate || banner.startDate <= now) &&
          (!banner.endDate || banner.endDate >= now)
        ).length;
        
        const byPosition = BANNERS.reduce((acc, banner) => {
          acc[banner.position] = (acc[banner.position] || 0) + 1;
          return acc;
        }, {} as Record<Banner['position'], number>);
        
        resolve({
          totalCount: BANNERS.length,
          activeCount,
          byPosition
        });
      }, 300);
    });
  },

  // Get banners by date range (admin only)
  getBannersByDateRange: async (startDate: string, endDate: string): Promise<Banner[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredBanners = BANNERS.filter(banner => {
          // Check if banner is active during the given date range
          const bannerStart = banner.startDate || '0000-01-01T00:00:00Z';
          const bannerEnd = banner.endDate || '9999-12-31T23:59:59Z';
          
          return bannerStart <= endDate && bannerEnd >= startDate;
        });
        
        resolve(filteredBanners);
      }, 300);
    });
  },
  
  // Toggle banner status (activate/deactivate) (admin only)
  toggleBannerStatus: async (id: string): Promise<Banner | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const bannerIndex = BANNERS.findIndex(b => b.id === id);
        if (bannerIndex === -1) {
          resolve(null);
          return;
        }
        
        const banner = BANNERS[bannerIndex];
        const updatedBanner: Banner = {
          ...banner,
          status: banner.status === 'active' ? 'inactive' : 'active',
          updatedAt: new Date().toISOString()
        };
        
        // In a real implementation, this would update the database
        BANNERS[bannerIndex] = updatedBanner;
        resolve(updatedBanner);
      }, 300);
    });
  },
  
  // Duplicate a banner (admin only)
  duplicateBanner: async (id: string): Promise<Banner | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const banner = BANNERS.find(b => b.id === id);
        if (!banner) {
          resolve(null);
          return;
        }
        
        const { id: _, ...bannerData } = banner;
        const duplicatedBanner: Banner = {
          ...bannerData,
          id: `banner-${Date.now()}`,
          title: `${banner.title} (Copy)`,
          status: 'inactive', // Always create as inactive to avoid accidental duplicates showing up
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // In a real implementation, this would save to the database
        BANNERS.push(duplicatedBanner);
        resolve(duplicatedBanner);
      }, 300);
    });
  },
  
  // Bulk operations (admin only)
  bulkUpdateBanners: async (ids: string[], updates: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>): Promise<number> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        let updatedCount = 0;
        
        ids.forEach(id => {
          const bannerIndex = BANNERS.findIndex(b => b.id === id);
          if (bannerIndex !== -1) {
            BANNERS[bannerIndex] = {
              ...BANNERS[bannerIndex],
              ...updates,
              updatedAt: new Date().toISOString()
            };
            updatedCount++;
          }
        });
        
        resolve(updatedCount);
      }, 500);
    });
  }
};
