#!/bin/bash

# Update PRODUCTS imports
find src -type f -name "*.tsx" -exec sed -i 's/import { PRODUCTS/import { Product/g' {} +
find src -type f -name "*.tsx" -exec sed -i 's/from "..\/lib\/types";/from "..\/lib\/types";\nimport { PRODUCTS } from "..\/lib\/data";/g' {} +

# Update CATEGORIES imports
find src -type f -name "*.tsx" -exec sed -i 's/import { CATEGORIES/import { Category/g' {} +
find src -type f -name "*.tsx" -exec sed -i 's/from "..\/lib\/types";/from "..\/lib\/types";\nimport { CATEGORIES } from "..\/lib\/data";/g' {} +

# Fix double imports
find src -type f -name "*.tsx" -exec sed -i 's/import { Product } from "..\/lib\/types";\nimport { Product } from "..\/lib\/types";/import { Product } from "..\/lib\/types";/g' {} +
find src -type f -name "*.tsx" -exec sed -i 's/import { Category } from "..\/lib\/types";\nimport { Category } from "..\/lib\/types";/import { Category } from "..\/lib\/types";/g' {} +