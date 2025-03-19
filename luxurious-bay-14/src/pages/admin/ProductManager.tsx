
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";
import { 
  Package, 
  Search, 
  Filter, 
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const ProductManager = () => {
  useScrollToTop();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });

  // Mock products data (would come from API/database)
  const products = [
    { id: 1, name: 'Wireless Earbuds', image: 'https://via.placeholder.com/40', sku: 'PRD-001', price: 1400, stock: 25, category: 'Electronics', status: 'active' },
    { id: 2, name: 'Smart Watch', image: 'https://via.placeholder.com/40', sku: 'PRD-002', price: 2400, stock: 18, category: 'Electronics', status: 'active' },
    { id: 3, name: 'Bluetooth Speaker', image: 'https://via.placeholder.com/40', sku: 'PRD-003', price: 1500, stock: 12, category: 'Electronics', status: 'active' },
    { id: 4, name: 'Cotton T-Shirt', image: 'https://via.placeholder.com/40', sku: 'PRD-004', price: 600, stock: 45, category: 'Clothing', status: 'active' },
    { id: 5, name: 'Denim Jeans', image: 'https://via.placeholder.com/40', sku: 'PRD-005', price: 1200, stock: 30, category: 'Clothing', status: 'draft' },
    { id: 6, name: 'Smart Phone', image: 'https://via.placeholder.com/40', sku: 'PRD-006', price: 15000, stock: 10, category: 'Electronics', status: 'active' },
    { id: 7, name: 'Coffee Maker', image: 'https://via.placeholder.com/40', sku: 'PRD-007', price: 3500, stock: 8, category: 'Home & Kitchen', status: 'active' },
    { id: 8, name: 'Air Fryer', image: 'https://via.placeholder.com/40', sku: 'PRD-008', price: 8000, stock: 15, category: 'Home & Kitchen', status: 'active' },
  ];

  // Mock categories
  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty & Personal Care"];

  const filteredProducts = products.filter(product => {
    // Filter by search query
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Executed",
      description: `Searched for: ${searchQuery}`,
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(currentProducts.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleSaveProduct = () => {
    // Validation
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call to save the product
    toast({
      title: "Product Saved",
      description: `Product "${newProduct.name}" has been saved.`,
    });
    
    setShowAddModal(false);
    setNewProduct({
      name: "",
      sku: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      image: "",
    });
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      // In a real app, this would be an API call to delete the product
      toast({
        title: "Product Deleted",
        description: `Product has been deleted.`,
      });
      
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length > 0) {
      // In a real app, this would be an API call to delete multiple products
      toast({
        title: "Products Deleted",
        description: `${selectedProducts.length} products have been deleted.`,
      });
      
      setSelectedProducts([]);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-semibold text-enzobay-brown mb-4 md:mb-0">
              <span className="flex items-center">
                <Package className="mr-2 h-6 w-6" /> Product Management
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
              <form onSubmit={handleSearch} className="flex-grow relative">
                <input 
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-enzobay-neutral-200 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enzobay-neutral-500" />
              </form>
              
              <select 
                className="border rounded-md px-3 py-2 text-sm bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <button 
                className="bg-enzobay-blue text-white px-4 py-2 rounded-md text-sm flex items-center"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Product
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-enzobay-neutral-200">
              <thead>
                <tr className="text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
                  <th className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-enzobay-neutral-300"
                      onChange={handleSelectAll}
                      checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
                    />
                  </th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-enzobay-neutral-200">
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-enzobay-neutral-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        className="rounded border-enzobay-neutral-300"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-10 w-10 rounded-md object-cover mr-3"
                        />
                        <span className="font-medium text-enzobay-neutral-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-enzobay-neutral-900">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-enzobay-neutral-100 text-enzobay-neutral-700'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      <div className="flex space-x-2">
                        <button 
                          className="text-enzobay-blue hover:text-enzobay-blue-dark"
                          onClick={() => {
                            toast({
                              title: "Edit Product",
                              description: `Editing product: ${product.name}`,
                            });
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            setProductToDelete(product.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {currentProducts.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-enzobay-neutral-600">
                      No products found. Try a different search query or category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {selectedProducts.length > 0 && (
            <div className="border-t border-enzobay-neutral-200 py-3 px-4 mt-4">
              <button 
                className="text-red-600 hover:text-red-800 text-sm flex items-center"
                onClick={handleBulkDelete}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete Selected ({selectedProducts.length})
              </button>
            </div>
          )}
          
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-enzobay-neutral-600 mb-2 sm:mb-0">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
            </p>
            
            <div className="flex space-x-1">
              <button 
                className={`px-3 py-1 rounded border text-sm ${currentPage === 1 ? 'text-enzobay-neutral-400 cursor-not-allowed' : 'text-enzobay-neutral-700'}`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === i + 1 ? 'bg-enzobay-blue text-white' : 'text-enzobay-neutral-700'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className={`px-3 py-1 rounded border text-sm ${currentPage === totalPages ? 'text-enzobay-neutral-400 cursor-not-allowed' : 'text-enzobay-neutral-700'}`}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-enzobay-brown">Add New Product</h3>
              <button 
                className="text-enzobay-neutral-500 hover:text-enzobay-neutral-800"
                onClick={() => setShowAddModal(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded-md px-3 py-2"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      SKU
                    </label>
                    <input 
                      type="text" 
                      className="w-full border rounded-md px-3 py-2"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number" 
                      className="w-full border rounded-md px-3 py-2"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Stock Quantity
                    </label>
                    <input 
                      type="number" 
                      className="w-full border rounded-md px-3 py-2"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select 
                      className="w-full border rounded-md px-3 py-2"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                    Product Description
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full border rounded-md px-3 py-2"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                    Product Image URL
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded-md px-3 py-2"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 border rounded-md text-enzobay-neutral-700"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-enzobay-blue text-white rounded-md"
                  onClick={handleSaveProduct}
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-enzobay-neutral-900 mb-2">Delete Product</h3>
                <p className="text-sm text-enzobay-neutral-600">
                  Are you sure you want to delete this product? This action cannot be undone.
                </p>
              </div>
              
              <div className="mt-6 flex justify-center space-x-3">
                <button 
                  className="px-4 py-2 border rounded-md text-enzobay-neutral-700"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                  onClick={handleDeleteProduct}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default ProductManager;
