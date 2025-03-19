
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BannerService } from "../../lib/api/bannerService"; 
import { Banner } from "../../lib/types";
import { Edit, Trash, Plus, X, Save, Eye, Copy, ToggleLeft, ToggleRight, Filter, RefreshCw, ChevronDown, Download, Upload, Maximize2, Calendar, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EnzoBayLogo from "../../components/EnzoBayLogo";

export default function AdminBannerManager() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [previewBanner, setPreviewBanner] = useState<Banner | null>(null);
  const [selectedBanners, setSelectedBanners] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    position: '',
    status: '',
    search: ''
  });
  const [stats, setStats] = useState<{
    totalCount: number;
    activeCount: number;
    byPosition: Record<Banner['position'], number>;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBanners();
    fetchStats();
  }, []);
  
  useEffect(() => {
    if (banners.length > 0) {
      applyFilters();
    }
  }, [banners, filters]);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const fetchedBanners = await BannerService.getAllBanners();
      setBanners(fetchedBanners);
      setFilteredBanners(fetchedBanners);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast({
        title: "Error",
        description: "Failed to load banners",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchStats = async () => {
    try {
      const stats = await BannerService.getBannerStats();
      setStats(stats);
    } catch (error) {
      console.error('Error fetching banner stats:', error);
    }
  };

  const applyFilters = () => {
    let result = [...banners];
    
    // Filter by position
    if (filters.position) {
      result = result.filter(banner => banner.position === filters.position);
    }
    
    // Filter by status
    if (filters.status) {
      result = result.filter(banner => banner.status === filters.status);
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(banner => 
        banner.title.toLowerCase().includes(searchTerm) || 
        (banner.subtitle || '').toLowerCase().includes(searchTerm) ||
        (banner.description || '').toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredBanners(result);
  };

  const handleDelete = async (id: string) => {
    try {
      await BannerService.deleteBanner(id);
      setBanners(prev => prev.filter(banner => banner.id !== id));
      setSelectedBanners(prev => prev.filter(bannerId => bannerId !== id));
      toast({
        title: "Success",
        description: "Banner deleted successfully",
      });
      fetchStats();
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast({
        title: "Error",
        description: "Failed to delete banner",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (!editingBanner) return;
    
    try {
      if (editingBanner.id.startsWith('new-')) {
        // Create new banner
        const { id, createdAt, updatedAt, ...bannerData } = editingBanner;
        const newBanner = await BannerService.createBanner(bannerData);
        setBanners(prev => [...prev, newBanner]);
        toast({
          title: "Success",
          description: "New banner created successfully",
        });
      } else {
        // Update existing banner
        const { id, createdAt, updatedAt, ...bannerData } = editingBanner;
        const updatedBanner = await BannerService.updateBanner(id, bannerData);
        if (updatedBanner) {
          setBanners(prev => prev.map(b => b.id === id ? updatedBanner : b));
        }
        toast({
          title: "Success",
          description: "Banner updated successfully",
        });
      }
      
      setEditingBanner(null);
      fetchStats();
    } catch (error) {
      console.error('Error saving banner:', error);
      toast({
        title: "Error",
        description: "Failed to save banner",
        variant: "destructive",
      });
    }
  };

  const handleCreateNew = () => {
    const newBanner: Banner = {
      id: `new-${Date.now()}`,
      title: "New Banner",
      subtitle: "Banner subtitle",
      description: "Banner description",
      ctaText: "Click Here",
      ctaLink: "/",
      image: "https://via.placeholder.com/400x150",
      position: "home_top",
      status: "inactive",
      priority: banners.length + 1,
      backgroundColor: "#4dabf7",
      textColor: "#ffffff",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      animation: "fade",
      size: "small"
    };
    
    setEditingBanner(newBanner);
  };
  
  const handleDuplicate = async (id: string) => {
    try {
      const duplicatedBanner = await BannerService.duplicateBanner(id);
      if (duplicatedBanner) {
        setBanners(prev => [...prev, duplicatedBanner]);
        toast({
          title: "Success",
          description: "Banner duplicated successfully",
        });
        fetchStats();
      }
    } catch (error) {
      console.error('Error duplicating banner:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate banner",
        variant: "destructive",
      });
    }
  };
  
  const handleToggleStatus = async (id: string) => {
    try {
      const updatedBanner = await BannerService.toggleBannerStatus(id);
      if (updatedBanner) {
        setBanners(prev => prev.map(b => b.id === id ? updatedBanner : b));
        toast({
          title: "Success",
          description: `Banner ${updatedBanner.status === 'active' ? 'activated' : 'deactivated'} successfully`,
        });
        fetchStats();
      }
    } catch (error) {
      console.error('Error toggling banner status:', error);
      toast({
        title: "Error",
        description: "Failed to toggle banner status",
        variant: "destructive",
      });
    }
  };
  
  const handleBulkDelete = async () => {
    if (selectedBanners.length === 0) return;
    
    try {
      const deletePromises = selectedBanners.map(id => BannerService.deleteBanner(id));
      await Promise.all(deletePromises);
      
      setBanners(prev => prev.filter(banner => !selectedBanners.includes(banner.id)));
      setSelectedBanners([]);
      
      toast({
        title: "Success",
        description: `${selectedBanners.length} banners deleted successfully`,
      });
      fetchStats();
    } catch (error) {
      console.error('Error deleting banners:', error);
      toast({
        title: "Error",
        description: "Failed to delete banners",
        variant: "destructive",
      });
    }
  };
  
  const handleBulkToggleStatus = async (status: 'active' | 'inactive') => {
    if (selectedBanners.length === 0) return;
    
    try {
      const updatedCount = await BannerService.bulkUpdateBanners(selectedBanners, { status });
      
      if (updatedCount > 0) {
        setBanners(prev => prev.map(banner => 
          selectedBanners.includes(banner.id) 
            ? { ...banner, status, updatedAt: new Date().toISOString() } 
            : banner
        ));
        
        toast({
          title: "Success",
          description: `${updatedCount} banners ${status === 'active' ? 'activated' : 'deactivated'} successfully`,
        });
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating banners:', error);
      toast({
        title: "Error",
        description: "Failed to update banners",
        variant: "destructive",
      });
    }
  };
  
  const handleSelectAll = () => {
    if (selectedBanners.length === filteredBanners.length) {
      setSelectedBanners([]);
    } else {
      setSelectedBanners(filteredBanners.map(banner => banner.id));
    }
  };
  
  const handleResetFilters = () => {
    setFilters({
      position: '',
      status: '',
      search: ''
    });
    setShowFilters(false);
  };
  
  const exportBanners = () => {
    const dataToExport = filteredBanners.length > 0 ? filteredBanners : banners;
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
    
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = `enzobay-banners-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Success",
      description: `${dataToExport.length} banners exported successfully`,
    });
  };

  const positions: Array<Banner['position']> = [
    'home_top', 
    'home_middle', 
    'category_top', 
    'product_page', 
    'cart_page', 
    'site_wide'
  ];

  const animations: Array<Banner['animation']> = [
    'fade',
    'slide',
    'bounce',
    'pulse',
    'none'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-enzobay-brown mb-1">Banner Management</h1>
            <p className="text-sm text-enzobay-neutral-600 mb-2 sm:mb-0">
              Create and manage promotional banners across your site.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-enzobay-neutral-100 text-enzobay-neutral-700 py-1.5 px-3 rounded-md flex items-center text-sm"
            >
              <Filter className="h-3.5 w-3.5 mr-1.5" /> Filters
              <ChevronDown className={`h-3.5 w-3.5 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <button
              onClick={exportBanners}
              className="bg-enzobay-neutral-100 text-enzobay-neutral-700 py-1.5 px-3 rounded-md flex items-center text-sm"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" /> Export
            </button>
            
            <button
              onClick={handleCreateNew}
              className="bg-enzobay-blue text-white py-1.5 px-3 rounded-md flex items-center text-sm"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Create Banner
            </button>
          </div>
        </div>
        
        {/* Stats section */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-enzobay-neutral-100">
              <div className="text-xs text-enzobay-neutral-500 mb-1">Total Banners</div>
              <div className="text-lg font-semibold text-enzobay-brown">{stats.totalCount}</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-enzobay-neutral-100">
              <div className="text-xs text-enzobay-neutral-500 mb-1">Active Banners</div>
              <div className="text-lg font-semibold text-green-600">{stats.activeCount}</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-enzobay-neutral-100">
              <div className="text-xs text-enzobay-neutral-500 mb-1">Sitewide Banners</div>
              <div className="text-lg font-semibold text-enzobay-blue">{stats.byPosition?.site_wide || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-enzobay-neutral-100">
              <div className="text-xs text-enzobay-neutral-500 mb-1">Filtered Banners</div>
              <div className="text-lg font-semibold text-enzobay-orange">{filteredBanners.length}</div>
            </div>
          </div>
        )}
        
        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg p-3 shadow-sm border border-enzobay-neutral-100 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-enzobay-neutral-600 mb-1">Search</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  placeholder="Search by title or content"
                  className="w-full border border-enzobay-neutral-200 rounded-md px-3 py-1.5 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs text-enzobay-neutral-600 mb-1">Position</label>
                <select
                  value={filters.position}
                  onChange={(e) => setFilters({...filters, position: e.target.value})}
                  className="w-full border border-enzobay-neutral-200 rounded-md px-3 py-1.5 text-sm"
                >
                  <option value="">All Positions</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos}>
                      {pos.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-enzobay-neutral-600 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full border border-enzobay-neutral-200 rounded-md px-3 py-1.5 text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-3 pt-2 border-t border-enzobay-neutral-100">
              <button
                onClick={handleResetFilters}
                className="text-enzobay-neutral-600 text-xs hover:text-enzobay-neutral-800 mr-3"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="bg-enzobay-blue text-white py-1 px-2 rounded-md text-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Bulk actions */}
        {selectedBanners.length > 0 && (
          <div className="bg-enzobay-neutral-800 text-white rounded-lg p-2 mb-4 shadow-md flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm ml-2">
                {selectedBanners.length} {selectedBanners.length === 1 ? 'banner' : 'banners'} selected
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkToggleStatus('active')}
                className="text-white bg-green-700 hover:bg-green-800 rounded-md py-1 px-2 text-xs flex items-center"
              >
                <ToggleRight className="h-3 w-3 mr-1" /> Activate
              </button>
              <button
                onClick={() => handleBulkToggleStatus('inactive')}
                className="text-white bg-enzobay-neutral-600 hover:bg-enzobay-neutral-700 rounded-md py-1 px-2 text-xs flex items-center"
              >
                <ToggleLeft className="h-3 w-3 mr-1" /> Deactivate
              </button>
              <button
                onClick={handleBulkDelete}
                className="text-white bg-red-600 hover:bg-red-700 rounded-md py-1 px-2 text-xs flex items-center"
              >
                <Trash className="h-3 w-3 mr-1" /> Delete
              </button>
            </div>
          </div>
        )}

        {/* Banner Editor */}
        {editingBanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-enzobay-neutral-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-enzobay-brown">
                  {editingBanner.id.startsWith('new-') ? 'Create New Banner' : 'Edit Banner'}
                </h2>
                <button
                  onClick={() => setEditingBanner(null)}
                  className="text-enzobay-neutral-500 hover:text-enzobay-neutral-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingBanner.title}
                      onChange={(e) => setEditingBanner({...editingBanner, title: e.target.value})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={editingBanner.subtitle || ''}
                      onChange={(e) => setEditingBanner({...editingBanner, subtitle: e.target.value})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editingBanner.description || ''}
                      onChange={(e) => setEditingBanner({...editingBanner, description: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      CTA Text
                    </label>
                    <input
                      type="text"
                      value={editingBanner.ctaText || ''}
                      onChange={(e) => setEditingBanner({...editingBanner, ctaText: e.target.value})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      CTA Link
                    </label>
                    <input
                      type="text"
                      value={editingBanner.ctaLink || ''}
                      onChange={(e) => setEditingBanner({...editingBanner, ctaLink: e.target.value})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={editingBanner.image}
                      onChange={(e) => setEditingBanner({...editingBanner, image: e.target.value})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Position
                    </label>
                    <select
                      value={editingBanner.position}
                      onChange={(e) => setEditingBanner({...editingBanner, position: e.target.value as Banner['position']})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    >
                      {positions.map(pos => (
                        <option key={pos} value={pos}>
                          {pos.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Status
                    </label>
                    <select
                      value={editingBanner.status}
                      onChange={(e) => setEditingBanner({...editingBanner, status: e.target.value as 'active' | 'inactive'})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Priority
                    </label>
                    <input
                      type="number"
                      value={editingBanner.priority}
                      onChange={(e) => setEditingBanner({...editingBanner, priority: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Animation
                    </label>
                    <select
                      value={editingBanner.animation || 'fade'}
                      onChange={(e) => setEditingBanner({...editingBanner, animation: e.target.value as Banner['animation']})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    >
                      {animations.map(anim => (
                        <option key={anim} value={anim}>
                          {anim.charAt(0).toUpperCase() + anim.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Size
                    </label>
                    <select
                      value={editingBanner.size || 'small'}
                      onChange={(e) => setEditingBanner({...editingBanner, size: e.target.value as 'small' | 'medium' | 'large'})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Background Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={editingBanner.backgroundColor || '#4dabf7'}
                        onChange={(e) => setEditingBanner({...editingBanner, backgroundColor: e.target.value})}
                        className="w-10 h-10 border border-enzobay-neutral-300 rounded-md mr-2"
                      />
                      <input
                        type="text"
                        value={editingBanner.backgroundColor || '#4dabf7'}
                        onChange={(e) => setEditingBanner({...editingBanner, backgroundColor: e.target.value})}
                        className="flex-1 px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Text Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={editingBanner.textColor || '#ffffff'}
                        onChange={(e) => setEditingBanner({...editingBanner, textColor: e.target.value})}
                        className="w-10 h-10 border border-enzobay-neutral-300 rounded-md mr-2"
                      />
                      <input
                        type="text"
                        value={editingBanner.textColor || '#ffffff'}
                        onChange={(e) => setEditingBanner({...editingBanner, textColor: e.target.value})}
                        className="flex-1 px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Start Date (optional)
                    </label>
                    <input
                      type="date"
                      value={editingBanner.startDate ? editingBanner.startDate.split('T')[0] : ''}
                      onChange={(e) => setEditingBanner({...editingBanner, startDate: e.target.value ? `${e.target.value}T00:00:00Z` : undefined})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      End Date (optional)
                    </label>
                    <input
                      type="date"
                      value={editingBanner.endDate ? editingBanner.endDate.split('T')[0] : ''}
                      onChange={(e) => setEditingBanner({...editingBanner, endDate: e.target.value ? `${e.target.value}T23:59:59Z` : undefined})}
                      className="w-full px-3 py-2 border border-enzobay-neutral-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-enzobay-neutral-200 flex justify-between">
                  <button
                    onClick={() => setPreviewBanner(editingBanner)}
                    className="bg-enzobay-neutral-200 text-enzobay-neutral-800 py-2 px-4 rounded-md text-sm flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-2" /> Preview
                  </button>
                  
                  <div>
                    <button
                      onClick={() => setEditingBanner(null)}
                      className="bg-enzobay-neutral-200 text-enzobay-neutral-800 py-2 px-4 rounded-md text-sm mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-enzobay-blue text-white py-2 px-4 rounded-md text-sm flex items-center inline-flex"
                    >
                      <Save className="h-4 w-4 mr-2" /> Save Banner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Banner Preview */}
        {previewBanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
              <div className="p-3 bg-enzobay-neutral-100 border-b border-enzobay-neutral-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium text-enzobay-brown">Banner Preview</h3>
                  <button
                    onClick={() => setPreviewBanner(null)}
                    className="text-enzobay-neutral-500 hover:text-enzobay-neutral-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-enzobay-neutral-700 mb-2">Full Size:</h4>
                  <div className="border border-enzobay-neutral-200 rounded-md overflow-hidden">
                    {previewBanner && (
                      <div
                        style={{
                          backgroundColor: previewBanner.backgroundColor || '#4dabf7',
                          color: previewBanner.textColor || '#ffffff'
                        }}
                        className="p-2 sm:p-3"
                      >
                        <div className="flex items-center">
                          {previewBanner.image && (
                            <img
                              src={previewBanner.image}
                              alt=""
                              className="h-6 w-6 sm:h-8 sm:w-8 object-cover rounded mr-2 sm:mr-3"
                            />
                          )}
                          <div>
                            <h3 className="text-xs sm:text-sm font-semibold">{previewBanner.title}</h3>
                            {previewBanner.subtitle && <p className="text-[10px] sm:text-xs">{previewBanner.subtitle}</p>}
                          </div>
                          {previewBanner.ctaText && (
                            <button className="ml-auto bg-white/20 py-0.5 px-1.5 sm:py-1 sm:px-2 rounded text-[10px] sm:text-xs font-medium">
                              {previewBanner.ctaText}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-enzobay-neutral-700 mb-2">Compact Size:</h4>
                  <div className="border border-enzobay-neutral-200 rounded-md overflow-hidden">
                    {previewBanner && (
                      <div
                        style={{
                          backgroundColor: previewBanner.backgroundColor || '#4dabf7',
                          color: previewBanner.textColor || '#ffffff'
                        }}
                        className="py-1 px-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">
                            {previewBanner.title}
                            {previewBanner.subtitle && <span className="hidden sm:inline ml-1 text-xs">- {previewBanner.subtitle}</span>}
                          </span>
                          {previewBanner.ctaText && (
                            <button className="text-[10px] font-medium hover:underline flex items-center">
                              {previewBanner.ctaText} <ArrowRight className="ml-1 h-2 w-2" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-enzobay-neutral-700 mb-2">Mini Size:</h4>
                  <div className="border border-enzobay-neutral-200 rounded-md overflow-hidden w-36">
                    {previewBanner && (
                      <div
                        style={{
                          backgroundColor: previewBanner.backgroundColor || '#4dabf7',
                          color: previewBanner.textColor || '#ffffff'
                        }}
                        className="p-2"
                      >
                        <div>
                          <h3 className="font-medium text-[10px]">{previewBanner.title}</h3>
                          {previewBanner.subtitle && <p className="text-[8px] mt-0.5">{previewBanner.subtitle}</p>}
                          {previewBanner.ctaText && (
                            <button className="mt-1 text-[8px] font-medium py-0.5 px-1 rounded bg-white/20">
                              {previewBanner.ctaText}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-2 bg-enzobay-neutral-50 rounded border border-enzobay-neutral-200 text-[10px] text-enzobay-neutral-500">
                  {previewBanner.animation && (
                    <div><strong>Animation:</strong> {previewBanner.animation}</div>
                  )}
                  {previewBanner.size && (
                    <div><strong>Size:</strong> {previewBanner.size}</div>
                  )}
                  {previewBanner.position && (
                    <div><strong>Position:</strong> {previewBanner.position.replace(/_/g, ' ')}</div>
                  )}
                  {previewBanner.startDate && (
                    <div><strong>Start Date:</strong> {new Date(previewBanner.startDate).toLocaleDateString()}</div>
                  )}
                  {previewBanner.endDate && (
                    <div><strong>End Date:</strong> {new Date(previewBanner.endDate).toLocaleDateString()}</div>
                  )}
                </div>
              </div>
              
              <div className="p-3 border-t border-enzobay-neutral-200 flex justify-end">
                <button
                  onClick={() => setPreviewBanner(null)}
                  className="bg-enzobay-blue text-white py-1.5 px-3 rounded-md text-sm"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Banners Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-enzobay-neutral-200 border-t-enzobay-blue"></div>
              <p className="mt-2 text-enzobay-neutral-600">Loading banners...</p>
            </div>
          ) : filteredBanners.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-enzobay-neutral-100">
                <Calendar className="h-6 w-6 text-enzobay-neutral-500" />
              </div>
              <p className="mt-4 text-enzobay-neutral-700 font-medium">No banners found</p>
              <p className="text-enzobay-neutral-500 text-sm mb-6">Create a new banner or adjust your filter settings.</p>
              <button
                onClick={handleCreateNew}
                className="mt-1 bg-enzobay-blue text-white py-2 px-4 rounded-md inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" /> Create New Banner
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-enzobay-neutral-200">
                <thead className="bg-enzobay-neutral-100">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs">
                      <input
                        type="checkbox"
                        checked={selectedBanners.length === filteredBanners.length && filteredBanners.length > 0}
                        onChange={handleSelectAll}
                        className="h-3 w-3 rounded border-enzobay-neutral-300"
                      />
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-enzobay-neutral-700 uppercase tracking-wider">
                      Banner
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-enzobay-neutral-700 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-enzobay-neutral-700 uppercase tracking-wider">
                      Size/Animation
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-enzobay-neutral-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-enzobay-neutral-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-enzobay-neutral-200">
                  {filteredBanners.map((banner) => (
                    <tr key={banner.id} className="hover:bg-enzobay-neutral-50">
                      <td className="px-3 py-2 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedBanners.includes(banner.id)}
                          onChange={() => setSelectedBanners(prev => 
                            prev.includes(banner.id) 
                              ? prev.filter(id => id !== banner.id) 
                              : [...prev, banner.id]
                          )}
                          className="h-3 w-3 rounded border-enzobay-neutral-300"
                        />
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          {banner.image && (
                            <div className="flex-shrink-0 h-8 w-8 rounded overflow-hidden mr-3">
                              <img
                                src={banner.image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-enzobay-neutral-900">{banner.title}</div>
                            {banner.subtitle && (
                              <div className="text-xs text-enzobay-neutral-500">{banner.subtitle}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-md bg-enzobay-neutral-100">
                          {banner.position.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-enzobay-neutral-700">
                        <div className="flex items-center space-x-1">
                          <span className="px-1.5 py-0.5 bg-enzobay-blue/10 rounded text-enzobay-blue">
                            {banner.size || 'small'}
                          </span>
                          <span className="px-1.5 py-0.5 bg-enzobay-orange/10 rounded text-enzobay-orange">
                            {banner.animation || 'none'}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${
                            banner.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-enzobay-neutral-100 text-enzobay-neutral-600'
                          }`}
                        >
                          {banner.status === 'active' ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-enzobay-neutral-400 mr-1"></span>
                          )}
                          {banner.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-right text-xs font-medium">
                        <button
                          onClick={() => setPreviewBanner(banner)}
                          className="text-enzobay-blue hover:text-enzobay-blue-dark p-1"
                          title="Preview"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(banner.id)}
                          className="text-enzobay-neutral-600 hover:text-enzobay-neutral-900 p-1"
                          title="Duplicate"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(banner.id)}
                          className={`${
                            banner.status === 'active' 
                              ? 'text-green-600 hover:text-green-800' 
                              : 'text-enzobay-neutral-500 hover:text-enzobay-neutral-800'
                          } p-1`}
                          title={banner.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {banner.status === 'active' ? (
                            <ToggleRight className="h-3.5 w-3.5" />
                          ) : (
                            <ToggleLeft className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => setEditingBanner(banner)}
                          className="text-enzobay-neutral-600 hover:text-enzobay-neutral-900 p-1"
                          title="Edit"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="text-enzobay-neutral-600 hover:text-red-600 p-1"
                          title="Delete"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
