
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Check, Star, ChevronDown, ChevronUp, Share2, ShieldCheck, Truck, RotateCw, Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../lib/types";
import { formatPrice } from "../lib/utils";
import { useRecentlyViewedStore, useCartStore, useWishlistStore } from "../lib/store";
import WishlistButton from "./WishlistButton";
import ImageModal from "./ImageModal";
import SimilarProducts from "./SimilarProducts";
import RecentlyViewed from "./RecentlyViewed";
import AddToCartButton from "./AddToCartButton";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  const { addItem } = useCartStore();
  const { addItem: addToRecentlyViewed } = useRecentlyViewedStore();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  
  // Add to recently viewed
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const openImageModal = (index: number) => {
    setSelectedImage(index);
    setIsImageModalOpen(true);
  };

  const goToNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };
  
  const goToPrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Calculate discount percentage
  const discountPercentage = product.discount || 0;
  const originalPrice = product.price;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm font-medium mb-4">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-enzobay-neutral-500 hover:text-enzobay-blue">Home</a>
            </li>
            <li className="text-enzobay-neutral-500">/</li>
            <li>
              <a href="/products" className="text-enzobay-neutral-500 hover:text-enzobay-blue">Products</a>
            </li>
            <li className="text-enzobay-neutral-500">/</li>
            <li>
              <a href={`/products/${product.category}`} className="text-enzobay-neutral-500 hover:text-enzobay-blue capitalize">{product.category}</a>
            </li>
            <li className="text-enzobay-neutral-500">/</li>
            <li className="text-enzobay-neutral-800 truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-lg relative bg-enzobay-neutral-100 aspect-square">
              {/* Main image */}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => openImageModal(selectedImage)}
              />
              
              {/* Image navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-1.5 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-enzobay-neutral-800" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-1.5 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-enzobay-neutral-800" />
                  </button>
                </>
              )}
              
              {/* Fullscreen button */}
              <button
                onClick={() => openImageModal(selectedImage)}
                className="absolute top-2 right-2 bg-white/70 hover:bg-white/90 rounded-full p-2 backdrop-blur-sm transition-all"
                aria-label="View fullscreen"
              >
                <Maximize className="h-5 w-5 text-enzobay-neutral-800" />
              </button>
              
              {/* Discount badge */}
              {product.discount && (
                <div className="absolute top-2 left-2 bg-enzobay-orange text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            
            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative rounded overflow-hidden aspect-square ${
                      selectedImage === idx
                        ? 'ring-2 ring-enzobay-blue'
                        : 'ring-1 ring-enzobay-neutral-200 hover:ring-enzobay-neutral-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Benefits icons row */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="flex flex-col items-center p-2 rounded-lg border border-enzobay-neutral-200">
                <Truck className="h-5 w-5 text-enzobay-blue mb-1" />
                <span className="font-medium text-enzobay-neutral-700">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg border border-enzobay-neutral-200">
                <RotateCw className="h-5 w-5 text-enzobay-blue mb-1" />
                <span className="font-medium text-enzobay-neutral-700">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg border border-enzobay-neutral-200">
                <ShieldCheck className="h-5 w-5 text-enzobay-blue mb-1" />
                <span className="font-medium text-enzobay-neutral-700">Quality Assured</span>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-6 lg:mt-0">
            {/* Badge row */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.isNew && (
                <span className="bg-enzobay-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  New
                </span>
              )}
              {product.inStock ? (
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
              {product.brand && (
                <span className="bg-enzobay-neutral-100 text-enzobay-neutral-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {product.brand}
                </span>
              )}
            </div>
            
            {/* Product title and reviews */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight text-enzobay-brown sm:text-3xl">
                {product.name}
              </h1>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-enzobay-orange fill-enzobay-orange"
                          : "text-enzobay-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-enzobay-neutral-600">
                  {product.rating.toFixed(1)} ({product.reviews} ratings)
                </p>
              </div>
            </div>
            
            {/* Price */}
            <div className="flex items-end mb-5">
              {product.discount ? (
                <>
                  <p className="text-3xl tracking-tight text-enzobay-brown font-bold">
                    {formatPrice(discountedPrice)}
                  </p>
                  <p className="text-lg line-through text-enzobay-neutral-500 ml-2">
                    {formatPrice(originalPrice)}
                  </p>
                  <p className="text-sm font-medium text-green-600 ml-2">
                    Save {product.discount}%
                  </p>
                </>
              ) : (
                <p className="text-3xl tracking-tight text-enzobay-brown font-bold">
                  {formatPrice(originalPrice)}
                </p>
              )}
            </div>
            
            {/* Short description */}
            <div className="space-y-6 mb-6">
              <p className="text-base text-enzobay-neutral-600">
                {product.description}
              </p>
            </div>
            
            <div className="border-t border-enzobay-neutral-200 pt-6 mb-6">
              {/* Color options */}
              {product.options?.colors && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-enzobay-neutral-900 mb-3">Color</h3>
                  <div className="flex items-center space-x-3">
                    {product.options.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className="relative -m-0.5 flex items-center justify-center rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-enzobay-blue"
                      >
                        <span
                          className="h-8 w-8 rounded-full border border-black border-opacity-10"
                          style={{ backgroundColor: color }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size options */}
              {product.options?.sizes && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-enzobay-neutral-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                      Size guide
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {product.options.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        className="border border-enzobay-neutral-300 rounded-md py-2 text-sm font-medium text-enzobay-neutral-700 hover:border-enzobay-blue hover:bg-enzobay-blue/5 focus:outline-none focus:ring-2 focus:ring-enzobay-blue"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity and Add to Cart */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-enzobay-neutral-900 mb-3">
                  Quantity
                </label>
                <div className="flex">
                  <div className="flex items-center border border-enzobay-neutral-300 rounded-md overflow-hidden mr-4">
                    <button
                      type="button"
                      className="p-2 text-enzobay-neutral-600 hover:text-enzobay-neutral-900 hover:bg-enzobay-neutral-100"
                      onClick={decrementQuantity}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 border-0 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      className="p-2 text-enzobay-neutral-600 hover:text-enzobay-neutral-900 hover:bg-enzobay-neutral-100"
                      onClick={incrementQuantity}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {product.inStock && (
                    <span className="inline-flex items-center text-sm text-green-600">
                      <Check className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      In stock and ready to ship
                    </span>
                  )}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium shadow-sm focus:outline-none ${
                    product.inStock
                      ? 'bg-enzobay-blue text-white hover:bg-enzobay-blue-dark'
                      : 'bg-enzobay-neutral-200 text-enzobay-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  type="button"
                  onClick={toggleWishlist}
                  className={`flex items-center justify-center rounded-md border px-8 py-3 text-base font-medium ${
                    isInWishlist(product.id)
                      ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
                      : 'border-enzobay-neutral-300 text-enzobay-neutral-700 hover:bg-enzobay-neutral-100'
                  }`}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
                  {isInWishlist(product.id) ? 'Saved' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
            
            {/* Product highlights */}
            <div className="border border-enzobay-neutral-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-enzobay-neutral-900 mb-3">Product Highlights</h3>
              <ul className="space-y-2 text-sm text-enzobay-neutral-600">
                <li className="flex items-start">
                  <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-enzobay-blue mr-2" />
                  <span>{product.brand || 'Premium brand'} quality assurance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-enzobay-blue mr-2" />
                  <span>{product.material ? `Made from ${product.material}` : 'High-quality materials'}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-enzobay-blue mr-2" />
                  <span>Free shipping on orders over KSh 5,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-enzobay-blue mr-2" />
                  <span>30-day money-back guarantee</span>
                </li>
              </ul>
            </div>
            
            {/* Delivery information */}
            <div className="border-t border-enzobay-neutral-200 pt-6">
              <div className="flex items-start">
                <Truck className="h-6 w-6 text-enzobay-blue flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-enzobay-neutral-900">
                    Delivery Information
                  </h3>
                  <p className="mt-1 text-sm text-enzobay-neutral-600">
                    {product.inStock
                      ? "1-3 business days (Nairobi), 3-7 business days (Rest of Kenya)"
                      : "Currently out of stock. Please check back later."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-16 border-t border-enzobay-neutral-200 pt-10">
          <div className="flex space-x-8 border-b border-enzobay-neutral-200 overflow-x-auto scrollbar-none">
            {["details", "specifications", "shipping", "reviews"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium tracking-wide ${
                  activeTab === tab
                    ? 'border-enzobay-blue text-enzobay-blue'
                    : 'border-transparent text-enzobay-neutral-600 hover:border-enzobay-neutral-300 hover:text-enzobay-neutral-800'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === "reviews" && ` (${product.reviews})`}
              </button>
            ))}
          </div>
          
          <div className="mt-8 flow-root">
            {activeTab === 'details' && (
              <div className="prose prose-enzobay max-w-none">
                <p>{product.description}</p>
                <ul>
                  <li>Premium quality materials and craftsmanship</li>
                  <li>Made with attention to detail</li>
                  <li>Perfect for daily use or special occasions</li>
                  <li>Elegant design that stands the test of time</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-4">Technical Specifications</h3>
                  <dl className="divide-y divide-enzobay-neutral-200">
                    {product.brand && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Brand</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.brand}</dd>
                      </div>
                    )}
                    {product.model && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Model</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.model}</dd>
                      </div>
                    )}
                    {product.material && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Material</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.material}</dd>
                      </div>
                    )}
                    {product.dimensions && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Dimensions</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.dimensions}</dd>
                      </div>
                    )}
                    {product.weight && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Weight</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.weight}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-4">Package Contents</h3>
                  <ul className="space-y-3 text-sm text-enzobay-neutral-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                      <span className="ml-3">{product.name}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                      <span className="ml-3">User Manual</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                      <span className="ml-3">Warranty Card</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                      <span className="ml-3">Care Instructions</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Shipping Information</h3>
                  <p className="text-enzobay-neutral-600 mb-4">
                    We offer several shipping options to meet your needs:
                  </p>
                  <ul className="space-y-3 text-sm text-enzobay-neutral-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Standard Shipping:</span> 3-7 business days (KSH 300-500)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Express Shipping:</span> 1-3 business days (KSH 500-800)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Free Shipping:</span> On orders above KSH 5,000 (Standard delivery)
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Return Policy</h3>
                  <p className="text-enzobay-neutral-600 mb-4">
                    We want you to be completely satisfied with your purchase:
                  </p>
                  <ul className="space-y-3 text-sm text-enzobay-neutral-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">30-Day Returns:</span> Return most items within 30 days of delivery for a full refund.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Condition:</span> Items must be unworn, unwashed, and in original packaging with tags attached.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Process:</span> Initiate your return through your account or contact our customer service.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-enzobay-brown">Customer Reviews</h3>
                  <button className="rounded-md bg-enzobay-blue px-4 py-2 text-sm font-medium text-white hover:bg-enzobay-blue-dark">
                    Write a Review
                  </button>
                </div>
                
                <div className="mb-8 flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-enzobay-brown">{product.rating.toFixed(1)}</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-enzobay-orange fill-enzobay-orange"
                              : "text-enzobay-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="mt-1 text-sm text-enzobay-neutral-500">
                      Based on {product.reviews} reviews
                    </div>
                  </div>
                  
                  <div className="flex-1 ml-6">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center mt-1">
                        <span className="text-sm text-enzobay-neutral-600 w-9">{star} star</span>
                        <div className="flex-1 h-2 mx-2 bg-enzobay-neutral-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-enzobay-orange rounded-full" 
                            style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sample reviews */}
                <div className="border-t border-enzobay-neutral-200 pt-6 space-y-8">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border-b border-enzobay-neutral-200 pb-8 last:border-0">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="text-base font-medium text-enzobay-brown">John Doe</h4>
                          <div className="text-xs text-enzobay-neutral-500">Verified Purchase</div>
                        </div>
                        <div className="text-xs text-enzobay-neutral-500">3 months ago</div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < 4 + Math.floor(Math.random() * 2)
                                ? "text-enzobay-orange fill-enzobay-orange"
                                : "text-enzobay-neutral-200"
                            }`}
                          />
                        ))}
                      </div>
                      <h5 className="text-sm font-medium text-enzobay-brown mb-2">Excellent quality and fast delivery!</h5>
                      <p className="text-sm text-enzobay-neutral-600">
                        I'm extremely satisfied with this purchase. The quality is outstanding and it looks even better in person. The delivery was fast and the packaging was secure. Would definitely recommend!
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Similar Products Section */}
      <SimilarProducts product={product} />
      
      {/* Recently Viewed Section */}
      <RecentlyViewed />
      
      {/* Image Modal for fullscreen view */}
      <ImageModal 
        images={product.images}
        initialIndex={selectedImage}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  );
}

// Helper icon component since we don't have this specific icon from lucide-react
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="currentColor" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
