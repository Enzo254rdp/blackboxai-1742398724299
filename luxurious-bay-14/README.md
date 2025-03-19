
# EnzoBay E-commerce Platform

## Overview

EnzoBay is a modern e-commerce platform built with React, TypeScript, and Tailwind CSS. The application offers a comprehensive shopping experience with features for customers, sellers, and administrators.

## Live Demo

Visit the live application at: [https://lovable.dev/projects/6ddecaae-6bee-4518-b7e5-681074300f2a](https://lovable.dev/projects/6ddecaae-6bee-4518-b7e5-681074300f2a)

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Core Features](#core-features)
- [User Roles & Permissions](#user-roles--permissions)
- [Current Implementation](#current-implementation)
- [Missing Features & Implementation Plan](#missing-features--implementation-plan)
- [Database Structure](#database-structure)
- [Additional Features to Consider](#additional-features-to-consider)
- [Development Guidelines](#development-guidelines)
- [Technical Stack](#technical-stack)

## Architecture Overview

EnzoBay follows a component-based architecture with the following structure:

- **Pages**: Container components that represent different routes in the application
- **Components**: Reusable UI elements and feature-specific components
- **Hooks**: Custom React hooks for shared functionality
- **Lib**: Utilities, types, stores, and API services
- **UI Components**: Shadcn UI components for consistent design

## Core Features

### Customer Features
- Product browsing and search
- Category navigation
- Product filtering and sorting
- Shopping cart management
- Wishlist functionality
- User account management
- Order placement and tracking
- Recently viewed products

### Seller Features
- Seller dashboard
- Product management (CRUD operations)
- Order management
- Sales analytics
- Inventory management
- Product tag management (New, Featured, etc.)
- Discount management

### Admin Features
- Admin dashboard
- User management
- Seller approval and monitoring
- Banner management
- Flash sale configuration
- Category management
- Product review and moderation
- Platform-wide analytics
- System configuration

## User Roles & Permissions

### Customer
- Browse products
- Place orders
- Manage personal account
- Create wishlists
- Track orders

### Seller
- Manage their product catalog
- Process orders
- Set product prices and discounts
- Tag products (New, Featured, etc.)
- View sales analytics
- Manage inventory

### Admin
- Approve/deny sellers
- Monitor all orders (oversight role)
- Review and moderate products
- Delete substandard products (poor images, inaccurate descriptions)
- Manage system-wide banners
- Configure flash sales
- Manage product categories
- View platform-wide analytics

## Current Implementation

The current implementation includes:

- Complete customer shopping experience
- Basic product catalog display
- Shopping cart functionality
- Wishlist management
- User authentication (simulated)
- Product detail views
- Category navigation
- Recently viewed products
- Responsive design for mobile and desktop
- Basic seller dashboard
- Basic admin dashboard

## Missing Features & Implementation Plan

### Authentication & Authorization (High Priority)
- Implement real authentication with JWT
- Complete role-based access control
- Email verification
- Password reset functionality

### Order Processing (High Priority)
- Complete checkout process
- Payment gateway integration
- Order status management
- Email notifications for orders

### Seller Features (Medium Priority)
- Complete product creation and editing interface
- Order fulfillment workflow
- Sales reports and analytics
- Inventory management system
- Commission and payment tracking

### Admin Features (Medium Priority)
- User management interface
- Seller approval workflow
- Complete banner management system
- Comprehensive analytics dashboard
- System configuration interface

### Customer Features (Medium Priority)
- Account settings page
- Order history view
- Address management
- Review and rating system

### Performance & Technical (Low Priority)
- Image optimization
- Server-side rendering for SEO
- Advanced search functionality
- Performance optimization

## Database Structure

The current implementation uses client-side state management with Zustand. For a production implementation, a proper database would be needed with the following structure:

### Users Table
- id (PK)
- name
- email (unique)
- password_hash
- role (customer, seller, admin)
- created_at
- updated_at
- avatar_url
- status (active, inactive, pending)

### Products Table
- id (PK)
- seller_id (FK to Users)
- name
- description
- price
- currency
- category_id (FK to Categories)
- is_featured (boolean)
- is_new (boolean)
- discount (percentage)
- in_stock (boolean)
- created_at
- updated_at
- status (active, inactive, pending_review)

### Product_Images Table
- id (PK)
- product_id (FK to Products)
- image_url
- position (for ordering)

### Product_Details Table
- id (PK)
- product_id (FK to Products)
- brand
- model
- material
- dimensions
- weight

### Product_Options Table
- id (PK)
- product_id (FK to Products)
- option_type (color, size, etc.)
- option_value

### Categories Table
- id (PK)
- name
- description
- image_url
- parent_category_id (FK to Categories, for nested categories)

### Product_Tags Table
- id (PK)
- product_id (FK to Products)
- tag_name

### Orders Table
- id (PK)
- user_id (FK to Users)
- status
- total_amount
- shipping_address_id (FK to Addresses)
- payment_method
- created_at
- updated_at

### Order_Items Table
- id (PK)
- order_id (FK to Orders)
- product_id (FK to Products)
- quantity
- price_at_time_of_order
- discount_at_time_of_order

### Addresses Table
- id (PK)
- user_id (FK to Users)
- address_line_1
- address_line_2
- city
- state
- postal_code
- country
- is_default (boolean)

### Wishlists Table
- id (PK)
- user_id (FK to Users)
- name
- created_at

### Wishlist_Items Table
- id (PK)
- wishlist_id (FK to Wishlists)
- product_id (FK to Products)
- added_at

### Reviews Table
- id (PK)
- product_id (FK to Products)
- user_id (FK to Users)
- rating
- comment
- created_at
- status (approved, pending, rejected)

### Banners Table
- id (PK)
- title
- subtitle
- description
- cta_text
- cta_link
- image_url
- position
- status
- priority
- start_date
- end_date
- created_at
- updated_at

### Flash_Sales Table
- id (PK)
- name
- description
- start_date
- end_date
- created_by (FK to Users)
- status

### Flash_Sale_Products Table
- id (PK)
- flash_sale_id (FK to Flash_Sales)
- product_id (FK to Products)
- discount_percentage

## Additional Features to Consider

### Customer Experience
- Product recommendations based on browsing history
- Product comparison tool
- Guest checkout
- Advanced filtering options
- Product bundle offers
- Loyalty program
- Product Q&A section
- Live chat support

### Seller Tools
- Bulk product import/export
- Automated inventory alerts
- Marketing tools (promotions, coupons)
- Return management system
- Tax calculation tools
- Shipping integration

### Admin Capabilities
- Content management system for blog/articles
- SEO management tools
- Advanced reporting and business intelligence
- Multi-language support
- Currency conversion
- Affiliate program management

### Technical Enhancements
- Progressive Web App (PWA) capabilities
- API documentation for potential third-party integrations
- Elasticsearch for advanced search
- Redis caching for performance
- Webhooks for event-driven architecture
- GraphQL API

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write unit tests for critical functionality
- Use proper type definitions

### UI/UX Guidelines
- Follow the established color scheme
- Maintain responsive design for all screen sizes
- Ensure accessibility compliance
- Use consistent component styling
- Implement proper loading states and error handling in UI

### State Management
- Use Zustand for global state
- Use React Query for server state
- Keep component state local when possible
- Implement proper caching strategies

## Technical Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand (State Management)
- React Router
- React Query
- Lucide Icons

### Planned Backend (Not Yet Implemented)
- Node.js / Express or Next.js API Routes
- PostgreSQL / MySQL
- Prisma / TypeORM
- JWT Authentication
- RESTful API
- Optional: GraphQL

### DevOps (Future)
- CI/CD Pipeline
- Docker
- Automated Testing
- Performance Monitoring

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Access the application at `http://localhost:5173`
