#!/bin/bash

# Create images directory
mkdir -p public/images

# Create placeholder images using data URIs (base64 encoded SVGs)
# These are simple colored rectangles with text labels

# Function to create an SVG placeholder
create_svg() {
  local filename=$1
  local text=$2
  local color=$3
  
  cat > "public/images/$filename" << EOF
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="$color"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">
    $text
  </text>
</svg>
EOF
}

# Hero images
create_svg "buyer-hero.jpg" "Fresh Produce" "#22c55e"
create_svg "seller-hero.jpg" "Local Farmers" "#f59e0b"

# Product images
create_svg "tomatoes.jpg" "Tomatoes" "#ef4444"
create_svg "spinach.jpg" "Spinach" "#10b981"
create_svg "carrots.jpg" "Carrots" "#f97316"
create_svg "apples.jpg" "Apples" "#dc2626"
create_svg "capsicum.jpg" "Capsicum" "#22c55e"
create_svg "bananas.jpg" "Bananas" "#fbbf24"
create_svg "potatoes.jpg" "Potatoes" "#92400e"
create_svg "onions.jpg" "Onions" "#a855f7"

# Category images
create_svg "vegetables.jpg" "Vegetables" "#16a34a"
create_svg "fruits.jpg" "Fruits" "#ea580c"
create_svg "leafy-greens.jpg" "Leafy Greens" "#059669"
create_svg "root-vegetables.jpg" "Root Vegetables" "#b45309"

echo "✅ Placeholder images created successfully!"

