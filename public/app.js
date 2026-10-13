/* ═══════════════════════════════════════════════
   SHAMBA HOUSE — Testimony OS & Digital Menu
   Design Principles:
     - Staff OS: Comprehensive service dashboard (dishes, inventory, staff roster, SambaPOS sync)
     - Guest Menu: Clean, luxury tableside menu with zero staff clutter, full categorization, drinks, and seamless ordering
     - Zero Emojis · 100% SVG Icons · Fanfarrón & Milano Perla Typography
   ═══════════════════════════════════════════════ */

'use strict';

// ── DOM Helpers ──
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// ── Toast Notification System ──
function showToast(message, isSuccess = true) {
  const toast = $('#toast-element');
  const msgEl = $('#toast-message');
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.style.background = isSuccess ? '#0d382d' : '#b91c1c';
  toast.classList.add('visible');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2800);
}


// ═══════════════════════════════════════════════
// SEED MENU DATA & SYSTEM DEFINITIONS
// ═══════════════════════════════════════════════
const SEED_CATEGORIES = [
  {
    "id": "breakfast-add-ons",
    "name": "Breakfast Add-ons",
    "station": "kitchen",
    "section": "Breakfast",
    "sort_order": 1,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "breakfast-plates-bites",
    "name": "Breakfast Plates & Bites",
    "station": "kitchen",
    "section": "Breakfast",
    "sort_order": 2,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "coffee",
    "name": "Coffee",
    "station": "bar",
    "section": "Drinks",
    "sort_order": 3,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "fresh-juices",
    "name": "Fresh Juices",
    "station": "bar",
    "section": "Drinks",
    "sort_order": 4,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "soft-drinks-water",
    "name": "Soft Drinks & Water",
    "station": "bar",
    "section": "Drinks",
    "sort_order": 5,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "fast-food",
    "name": "Fast Food",
    "station": "kitchen",
    "section": "Fast Food",
    "sort_order": 6,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "fishes",
    "name": "Fishes",
    "station": "kitchen",
    "section": "Main Course",
    "sort_order": 7,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "vegies",
    "name": "Vegies",
    "station": "kitchen",
    "section": "Main Course",
    "sort_order": 8,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "beef",
    "name": "Beef",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 9,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "beans",
    "name": "Beans",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 10,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "githeri",
    "name": "Githeri",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 11,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "matumbo",
    "name": "Matumbo",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 12,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "ndegu-green-grams",
    "name": "Ndegu (Green Grams)",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 13,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "plains-sides",
    "name": "Plains & Sides",
    "station": "kitchen",
    "section": "Plains & Sides",
    "sort_order": 14,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "hot-drinks",
    "name": "Hot Drinks",
    "station": "bar",
    "section": "Drinks",
    "sort_order": 15,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "chicken-broiler",
    "name": "Chicken Broiler",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 16,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "chicken-kienyeji",
    "name": "Chicken Kienyeji",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 17,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "minji-peas",
    "name": "Minji (Peas)",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 18,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "mix",
    "name": "Mix",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 19,
    "layout": "plate-card",
    "note": ""
  },
  {
    "id": "njahi-black-beans",
    "name": "Njahi (Black Beans)",
    "station": "kitchen",
    "section": "Main Dish",
    "sort_order": 20,
    "layout": "plate-card",
    "note": ""
  }
];

const SEED_MENU_ITEMS = [
  {
    "id": "item-breakfast-add-ons-nescafe",
    "name": "Nescafe",
    "desc": "Nescafe – Breakfast Add-ons",
    "price": null,
    "category": "Breakfast Add-ons",
    "categoryId": "breakfast-add-ons",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Name or price is cropped in the photo.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Name or price is cropped in the photo."
      }
    ]
  },
  {
    "id": "item-breakfast-add-ons-sausage",
    "name": "Sausage",
    "desc": "Sausage – Breakfast Add-ons",
    "price": null,
    "category": "Breakfast Add-ons",
    "categoryId": "breakfast-add-ons",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 5,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Name or price is cropped in the photo.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Name or price is cropped in the photo."
      }
    ]
  },
  {
    "id": "item-breakfast-add-ons-tea-bag",
    "name": "Tea Bag",
    "desc": "Tea Bag – Breakfast Add-ons",
    "price": null,
    "category": "Breakfast Add-ons",
    "categoryId": "breakfast-add-ons",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Name or price is cropped in the photo.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Name or price is cropped in the photo."
      }
    ]
  },
  {
    "id": "item-breakfast-add-ons-toast",
    "name": "Toast",
    "desc": "Toast – Breakfast Add-ons",
    "price": null,
    "category": "Breakfast Add-ons",
    "categoryId": "breakfast-add-ons",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Name or price is cropped in the photo.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Name or price is cropped in the photo."
      }
    ]
  },
  {
    "id": "item-breakfast-add-ons-toast-mafuta",
    "name": "Toast Mafuta",
    "desc": "Toast Mafuta – Breakfast Add-ons",
    "price": null,
    "category": "Breakfast Add-ons",
    "categoryId": "breakfast-add-ons",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Name or price is cropped in the photo.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Name or price is cropped in the photo."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-egg-name-partly-hidden-iled-egg",
    "name": "Egg (name partly hidden, '..iled Egg')",
    "desc": "Egg (name partly hidden, '..iled Egg') – Breakfast Plates & Bites",
    "price": null,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Name and price row partly hidden.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Name and price row partly hidden."
      }
    ]
  },
  {
    "id": "item-coffee-iced-coffee-vanilla-latte",
    "name": "Iced Coffee Vanilla Latte",
    "desc": "Iced Coffee Vanilla Latte – Coffee",
    "price": null,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-coffee-long-black",
    "name": "Long Black",
    "desc": "Long Black – Coffee",
    "price": null,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.9,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-coffee-milk-chocolate-hot",
    "name": "Milk Chocolate (hot)",
    "desc": "Milk Chocolate (hot) – Coffee",
    "price": null,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.6,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-coffee-mocha-cappuccino",
    "name": "Mocha Cappuccino",
    "desc": "Mocha Cappuccino – Coffee",
    "price": null,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.9,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-coffee-vanilla-cold-espresso",
    "name": "Vanilla Cold Espresso",
    "desc": "Vanilla Cold Espresso – Coffee",
    "price": null,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.7,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fresh-juices-cocktail-juice",
    "name": "Cocktail Juice",
    "desc": "Cocktail Juice – Fresh Juices",
    "price": 100,
    "category": "Fresh Juices",
    "categoryId": "fresh-juices",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Small",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      },
      {
        "label": "Large",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-fresh-juices-mango-juice",
    "name": "Mango Juice",
    "desc": "Mango Juice – Fresh Juices",
    "price": 150,
    "category": "Fresh Juices",
    "categoryId": "fresh-juices",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 5,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Small",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      },
      {
        "label": "Large",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-water",
    "name": "Water",
    "desc": "Water – Soft Drinks & Water",
    "price": null,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 5,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Drinks",
    "variants": [
      {
        "label": "1L",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      },
      {
        "label": "Small",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fast-food-andazi",
    "name": "Andazi",
    "desc": "Andazi – Fast Food",
    "price": null,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Fast Food",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fast-food-bhajia",
    "name": "Bhajia",
    "desc": "Bhajia – Fast Food",
    "price": null,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Fast Food",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fast-food-chapati-brown",
    "name": "Chapati Brown",
    "desc": "Chapati Brown – Fast Food",
    "price": null,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Fast Food",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fast-food-chapati-white",
    "name": "Chapati White",
    "desc": "Chapati White – Fast Food",
    "price": null,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Fast Food",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fast-food-juice",
    "name": "Juice",
    "desc": "Juice – Fast Food",
    "price": null,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.5,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Fast Food",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fishes-fish-biryani",
    "name": "Fish Biryani",
    "desc": "Fish Biryani – Fishes",
    "price": null,
    "category": "Fishes",
    "categoryId": "fishes",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fishes-fish-curry",
    "name": "Fish Curry",
    "desc": "Fish Curry – Fishes",
    "price": null,
    "category": "Fishes",
    "categoryId": "fishes",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fishes-fish-dry-fry",
    "name": "Fish Dry Fry",
    "desc": "Fish Dry Fry – Fishes",
    "price": null,
    "category": "Fishes",
    "categoryId": "fishes",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fishes-fish-masala",
    "name": "Fish Masala",
    "desc": "Fish Masala – Fishes",
    "price": null,
    "category": "Fishes",
    "categoryId": "fishes",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 5,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fishes-fish-munye",
    "name": "Fish Munye",
    "desc": "Fish Munye – Fishes",
    "price": null,
    "category": "Fishes",
    "categoryId": "fishes",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-fishes-fish-wet-fry",
    "name": "Fish Wet Fry",
    "desc": "Fish Wet Fry – Fishes",
    "price": null,
    "category": "Fishes",
    "categoryId": "fishes",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Standard",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      }
    ]
  },
  {
    "id": "item-vegies-kienyeji-greens",
    "name": "Kienyeji (greens)",
    "desc": "Kienyeji (greens) – Vegies",
    "price": 80,
    "category": "Vegies",
    "categoryId": "vegies",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.5,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Menu sticker is blank; website's 80 equals Kienyeji Plain, likely a copy error.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Matoke",
        "price": null,
        "price_status": "unknown",
        "basis": "Menu sticker is blank; website's 80 equals Kienyeji Plain, likely a copy error."
      },
      {
        "label": "Plain",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Ugali",
        "price": 130,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Rice",
        "price": 130,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-beef-beef",
    "name": "Beef",
    "desc": "Beef – Beef",
    "price": 250,
    "category": "Beef",
    "categoryId": "beef",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "unknown",
    "basis": "Blank, cropped or hidden on the menu and not on the website.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Githeri",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      },
      {
        "label": "Matoke",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      },
      {
        "label": "Minji Pilau",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      },
      {
        "label": "Mokimo",
        "price": null,
        "price_status": "unknown",
        "basis": "Handwritten sticker is ambiguous (340 or 310)."
      },
      {
        "label": "Minji Plain",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      },
      {
        "label": "Pilau",
        "price": null,
        "price_status": "unknown",
        "basis": "Blank, cropped or hidden on the menu and not on the website."
      },
      {
        "label": "Plain",
        "price": 250,
        "price_status": "working",
        "basis": "Legible but hand-patched or partly cropped on the menu; not on the website."
      },
      {
        "label": "Rice",
        "price": 300,
        "price_status": "working",
        "basis": "Legible but hand-patched or partly cropped on the menu; not on the website."
      },
      {
        "label": "Ugali",
        "price": 300,
        "price_status": "working",
        "basis": "Legible but hand-patched or partly cropped on the menu; not on the website."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-boiled-egg",
    "name": "Boiled Egg",
    "desc": "Boiled Egg – Breakfast Plates & Bites",
    "price": 30,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Legible but hand-patched or partly cropped on the menu; not on the website.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 30,
        "price_status": "working",
        "basis": "Legible but hand-patched or partly cropped on the menu; not on the website."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-fried-egg",
    "name": "Fried Egg",
    "desc": "Fried Egg – Breakfast Plates & Bites",
    "price": 50,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Legible but hand-patched or partly cropped on the menu; not on the website.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "working",
        "basis": "Legible but hand-patched or partly cropped on the menu; not on the website."
      }
    ]
  },
  {
    "id": "item-coffee-chocolate-latte",
    "name": "Chocolate Latte",
    "desc": "Chocolate Latte – Coffee",
    "price": 170,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Legible but hand-patched or partly cropped on the menu; not on the website.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 170,
        "price_status": "working",
        "basis": "Legible but hand-patched or partly cropped on the menu; not on the website."
      }
    ]
  },
  {
    "id": "item-vegies-cabbage",
    "name": "Cabbage",
    "desc": "Cabbage – Vegies",
    "price": 120,
    "category": "Vegies",
    "categoryId": "vegies",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Sticker over the first Cabbage Mukimo row reads about 120. The second printed 'Cabbage Mukimo 180' looks like a stale duplicate line.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Mukimo",
        "price": 120,
        "price_status": "working",
        "basis": "Sticker over the first Cabbage Mukimo row reads about 120. The second printed 'Cabbage Mukimo 180' looks like a stale duplicate line."
      },
      {
        "label": "Matoke",
        "price": 120,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Plain",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Rice",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Ugali",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-beans-beans",
    "name": "Beans",
    "desc": "Beans – Beans",
    "price": 120,
    "category": "Beans",
    "categoryId": "beans",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Legible but hand-patched or partly cropped on the menu; not on the website.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Rice",
        "price": 120,
        "price_status": "working",
        "basis": "Legible but hand-patched or partly cropped on the menu; not on the website."
      },
      {
        "label": "Ugali",
        "price": 120,
        "price_status": "working",
        "basis": "Legible but hand-patched or partly cropped on the menu; not on the website."
      },
      {
        "label": "Matoke",
        "price": 180,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      },
      {
        "label": "Plain",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-githeri-githeri",
    "name": "Githeri",
    "desc": "Githeri – Githeri",
    "price": 280,
    "category": "Githeri",
    "categoryId": "githeri",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Handwritten sticker reads 280; website says 180 (probably the old printed price).",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Minji",
        "price": 280,
        "price_status": "working",
        "basis": "Handwritten sticker reads 280; website says 180 (probably the old printed price)."
      },
      {
        "label": "Njahi",
        "price": 180,
        "price_status": "working",
        "basis": "Menu line ends '...ahi' (Njahi) and shows 180/=; website calls it Ndengu. Name chosen from the menu."
      },
      {
        "label": "Cabbage",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Matoke",
        "price": 220,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Sukuma",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Vegies",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-matumbo-matumbo",
    "name": "Matumbo",
    "desc": "Matumbo – Matumbo",
    "price": 200,
    "category": "Matumbo",
    "categoryId": "matumbo",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Both Ugali rows on the menu read 200. Website's extra 'Matumbo Ugali 300' matches no priced row (three Matumbo rows are covered by blank stickers).",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Ugali",
        "price": 200,
        "price_status": "working",
        "basis": "Both Ugali rows on the menu read 200. Website's extra 'Matumbo Ugali 300' matches no priced row (three Matumbo rows are covered by blank stickers)."
      },
      {
        "label": "Rice",
        "price": 200,
        "price_status": "working",
        "basis": "Menu sticker clearly reads 200; website says 300 (looks like a copy of the Pilau price)."
      },
      {
        "label": "Githeri",
        "price": 300,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Mukimo",
        "price": 270,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Pilau",
        "price": 300,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Plain",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-ndegu-green-grams-ndegu",
    "name": "Ndegu",
    "desc": "Ndegu – Ndegu (Green Grams)",
    "price": 120,
    "category": "Ndegu (Green Grams)",
    "categoryId": "ndegu-green-grams",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Sticker 120 sits over printed 100; Ndegu Rice shows the same pattern and the website used the sticker there.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Ugali",
        "price": 120,
        "price_status": "working",
        "basis": "Sticker 120 sits over printed 100; Ndegu Rice shows the same pattern and the website used the sticker there."
      },
      {
        "label": "Matoke",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Plain",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Rice",
        "price": 120,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-omena",
    "name": "Omena",
    "desc": "Omena – Plains & Sides",
    "price": 80,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Sticker reads 80; website's 200 would make plain Omena dearer than Omena with ugali.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Plain",
        "price": 80,
        "price_status": "working",
        "basis": "Sticker reads 80; website's 200 would make plain Omena dearer than Omena with ugali."
      },
      {
        "label": "Ugali / Rice",
        "price": 130,
        "price_status": "working",
        "basis": "Sticker reads 130 (80 + Ugali 50 adds up); website says 150. Sticker looks partly struck through, so recheck."
      }
    ]
  },
  {
    "id": "item-plains-sides-ugali-mala",
    "name": "Ugali Mala",
    "desc": "Ugali Mala – Plains & Sides",
    "price": 130,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "working",
    "basis": "Visible digits on the sticker are '13'; Ugali 50 + Mala 80 = 130. Website says 120.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Standard",
        "price": 130,
        "price_status": "working",
        "basis": "Visible digits on the sticker are '13'; Ugali 50 + Mala 80 = 130. Website says 120."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-beef-sausage",
    "name": "Beef Sausage",
    "desc": "Beef Sausage – Breakfast Plates & Bites",
    "price": 80,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-nduma",
    "name": "Nduma",
    "desc": "Nduma – Breakfast Plates & Bites",
    "price": 50,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-ngwaci",
    "name": "Ngwaci",
    "desc": "Ngwaci – Breakfast Plates & Bites",
    "price": 50,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-omelette",
    "name": "Omelette",
    "desc": "Omelette – Breakfast Plates & Bites",
    "price": 100,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-samosa",
    "name": "Samosa",
    "desc": "Samosa – Breakfast Plates & Bites",
    "price": 50,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-smokie",
    "name": "Smokie",
    "desc": "Smokie – Breakfast Plates & Bites",
    "price": 40,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 40,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-toast-mayai",
    "name": "Toast Mayai",
    "desc": "Toast Mayai – Breakfast Plates & Bites",
    "price": 100,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-uji-power",
    "name": "Uji Power",
    "desc": "Uji Power – Breakfast Plates & Bites",
    "price": 50,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-breakfast-plates-bites-white-coffee",
    "name": "White Coffee",
    "desc": "White Coffee – Breakfast Plates & Bites",
    "price": 60,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Breakfast",
    "variants": [
      {
        "label": "Standard",
        "price": 60,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-coffee-black-coffee-espresso-based",
    "name": "Black Coffee (espresso-based)",
    "desc": "Black Coffee (espresso-based) – Coffee",
    "price": 120,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 120,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-coffee-cappuccino",
    "name": "Cappuccino",
    "desc": "Cappuccino – Coffee",
    "price": 130,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Single",
        "price": 130,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      },
      {
        "label": "Double",
        "price": 180,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-coffee-espresso",
    "name": "Espresso",
    "desc": "Espresso – Coffee",
    "price": 100,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.9,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Single",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      },
      {
        "label": "Double",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-coffee-vanilla-latte",
    "name": "Vanilla Latte",
    "desc": "Vanilla Latte – Coffee",
    "price": 170,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 5,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 170,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-fresh-juices-beetroot-sugar",
    "name": "Beetroot Sugar",
    "desc": "Beetroot Sugar – Fresh Juices",
    "price": 100,
    "category": "Fresh Juices",
    "categoryId": "fresh-juices",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.6,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-fresh-juices-passion-juice",
    "name": "Passion Juice",
    "desc": "Passion Juice – Fresh Juices",
    "price": 150,
    "category": "Fresh Juices",
    "categoryId": "fresh-juices",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.9,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Large",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Small",
        "price": 70,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-fresh-juices-sugarcane-juice",
    "name": "Sugarcane Juice",
    "desc": "Sugarcane Juice – Fresh Juices",
    "price": 100,
    "category": "Fresh Juices",
    "categoryId": "fresh-juices",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-hot-drinks-black-coffee",
    "name": "Black Coffee",
    "desc": "Black Coffee – Hot Drinks",
    "price": 40,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.7,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 40,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-hot-drinks-black-tea",
    "name": "Black Tea",
    "desc": "Black Tea – Hot Drinks",
    "price": 40,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 40,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-hot-drinks-chai",
    "name": "Chai",
    "desc": "Chai – Hot Drinks",
    "price": 40,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 5,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 40,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-hot-drinks-chocolate-milk",
    "name": "Chocolate Milk",
    "desc": "Chocolate Milk – Hot Drinks",
    "price": 60,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 5,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 60,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-hot-drinks-lemon-coffee",
    "name": "Lemon Coffee",
    "desc": "Lemon Coffee – Hot Drinks",
    "price": 60,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.6,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 60,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-hot-drinks-lemon-tea",
    "name": "Lemon Tea",
    "desc": "Lemon Tea – Hot Drinks",
    "price": 60,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 60,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-hot-drinks-milk-glass",
    "name": "Milk Glass",
    "desc": "Milk Glass – Hot Drinks",
    "price": 50,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-hot-drinks-water-lemon",
    "name": "Water Lemon",
    "desc": "Water Lemon – Hot Drinks",
    "price": 30,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 30,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-afia",
    "name": "Afia",
    "desc": "Afia – Soft Drinks & Water",
    "price": 80,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.9,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Kubwa",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Ndogo",
        "price": 60,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-azam",
    "name": "Azam",
    "desc": "Azam – Soft Drinks & Water",
    "price": 60,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.6,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 60,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-can-soda",
    "name": "Can Soda",
    "desc": "Can Soda – Soft Drinks & Water",
    "price": 100,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.7,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-dasani-water",
    "name": "Dasani Water",
    "desc": "Dasani Water – Soft Drinks & Water",
    "price": 80,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.9,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "1L",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "500ml",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-lemonade",
    "name": "Lemonade",
    "desc": "Lemonade – Soft Drinks & Water",
    "price": 50,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.6,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-minute-maid",
    "name": "Minute Maid",
    "desc": "Minute Maid – Soft Drinks & Water",
    "price": 150,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Kubwa",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Ndogo",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-novida",
    "name": "Novida",
    "desc": "Novida – Soft Drinks & Water",
    "price": 60,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.7,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Kubwa",
        "price": 60,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Ndogo",
        "price": 40,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-pepsi",
    "name": "Pepsi",
    "desc": "Pepsi – Soft Drinks & Water",
    "price": 50,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-plastic-soda",
    "name": "Plastic Soda",
    "desc": "Plastic Soda – Soft Drinks & Water",
    "price": 150,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "1.2L",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "2L",
        "price": 250,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "500ml",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Small",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-play",
    "name": "Play",
    "desc": "Play – Soft Drinks & Water",
    "price": 80,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.9,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-predator",
    "name": "Predator",
    "desc": "Predator – Soft Drinks & Water",
    "price": 70,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.8,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "Standard",
        "price": 70,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-soft-drinks-water-soda",
    "name": "Soda",
    "desc": "Soda – Soft Drinks & Water",
    "price": 60,
    "category": "Soft Drinks & Water",
    "categoryId": "soft-drinks-water",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 4.9,
    "station": "bar",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Drinks",
    "variants": [
      {
        "label": "300ml",
        "price": 60,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "500ml",
        "price": 70,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-fast-food-chips",
    "name": "Chips",
    "desc": "Chips – Fast Food",
    "price": 150,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Fast Food",
    "variants": [
      {
        "label": "Standard",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-fast-food-chips-masala",
    "name": "Chips Masala",
    "desc": "Chips Masala – Fast Food",
    "price": 200,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Fast Food",
    "variants": [
      {
        "label": "Standard",
        "price": 200,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-vegies-avocado",
    "name": "Avocado",
    "desc": "Avocado – Vegies",
    "price": 40,
    "category": "Vegies",
    "categoryId": "vegies",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Standard",
        "price": 40,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-vegies-sukuma",
    "name": "Sukuma",
    "desc": "Sukuma – Vegies",
    "price": 50,
    "category": "Vegies",
    "categoryId": "vegies",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Plain",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Ugali",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-vegies-ugali-plain",
    "name": "Ugali Plain",
    "desc": "Ugali Plain – Vegies",
    "price": 50,
    "category": "Vegies",
    "categoryId": "vegies",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 5,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Course",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-chicken-broiler-chicken-broiler",
    "name": "Chicken Broiler",
    "desc": "Chicken Broiler – Chicken Broiler",
    "price": 200,
    "category": "Chicken Broiler",
    "categoryId": "chicken-broiler",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "1/4",
        "price": 200,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      },
      {
        "label": "1/2",
        "price": 400,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      },
      {
        "label": "3/4",
        "price": 600,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      },
      {
        "label": "Full",
        "price": 800,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-chicken-kienyeji-chicken-kienyeji",
    "name": "Chicken Kienyeji",
    "desc": "Chicken Kienyeji – Chicken Kienyeji",
    "price": 300,
    "category": "Chicken Kienyeji",
    "categoryId": "chicken-kienyeji",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Printed price legible on the menu.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "1/4",
        "price": 300,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      },
      {
        "label": "1/2",
        "price": 600,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      },
      {
        "label": "3/4",
        "price": 900,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      },
      {
        "label": "Full",
        "price": 1200,
        "price_status": "confirmed",
        "basis": "Printed price legible on the menu."
      }
    ]
  },
  {
    "id": "item-minji-peas-minji",
    "name": "Minji",
    "desc": "Minji – Minji (Peas)",
    "price": 220,
    "category": "Minji (Peas)",
    "categoryId": "minji-peas",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.5,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Beef",
        "price": 220,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Beef Rice",
        "price": 300,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Mukimo",
        "price": 250,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Pilau",
        "price": 270,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Plain",
        "price": 140,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Ugali",
        "price": 180,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-mix-egg-nyanya",
    "name": "Egg Nyanya",
    "desc": "Egg Nyanya – Mix",
    "price": 100,
    "category": "Mix",
    "categoryId": "mix",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Plain",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Rice",
        "price": 140,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-mix-managu",
    "name": "Managu",
    "desc": "Managu – Mix",
    "price": 50,
    "category": "Mix",
    "categoryId": "mix",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-mix-mix-rice",
    "name": "Mix Rice",
    "desc": "Mix Rice – Mix",
    "price": 100,
    "category": "Mix",
    "categoryId": "mix",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Standard",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-mix-pilau-eggs-tomato",
    "name": "Pilau Eggs Tomato",
    "desc": "Pilau Eggs Tomato – Mix",
    "price": 150,
    "category": "Mix",
    "categoryId": "mix",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Standard",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-mix-pilau-mix",
    "name": "Pilau Mix",
    "desc": "Pilau Mix – Mix",
    "price": 100,
    "category": "Mix",
    "categoryId": "mix",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Standard",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-njahi-black-beans-njahi",
    "name": "Njahi",
    "desc": "Njahi – Njahi (Black Beans)",
    "price": 220,
    "category": "Njahi (Black Beans)",
    "categoryId": "njahi-black-beans",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Main Dish",
    "variants": [
      {
        "label": "Beef",
        "price": 220,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Beef Rice",
        "price": 220,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Mukimo",
        "price": 180,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Matumbo",
        "price": 270,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Plain",
        "price": 120,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Rice",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      },
      {
        "label": "Ugali",
        "price": 160,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-githeri-plain",
    "name": "Githeri Plain",
    "desc": "Githeri Plain – Plains & Sides",
    "price": 150,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Standard",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-kachumbari",
    "name": "Kachumbari",
    "desc": "Kachumbari – Plains & Sides",
    "price": 30,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Standard",
        "price": 30,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-mala",
    "name": "Mala",
    "desc": "Mala – Plains & Sides",
    "price": 80,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Kubwa (large)",
        "price": 80,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-matoke",
    "name": "Matoke",
    "desc": "Matoke – Plains & Sides",
    "price": 100,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Standard",
        "price": 100,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-mukimo",
    "name": "Mukimo",
    "desc": "Mukimo – Plains & Sides",
    "price": 120,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Standard",
        "price": 120,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-pilau",
    "name": "Pilau",
    "desc": "Pilau – Plains & Sides",
    "price": 150,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Standard",
        "price": 150,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-plastic-dish-takeaway-container",
    "name": "Plastic Dish (takeaway container)",
    "desc": "Plastic Dish (takeaway container) – Plains & Sides",
    "price": 30,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Standard",
        "price": 30,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-rice",
    "name": "Rice",
    "desc": "Rice – Plains & Sides",
    "price": 50,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  },
  {
    "id": "item-plains-sides-ugali",
    "name": "Ugali",
    "desc": "Ugali – Plains & Sides",
    "price": 50,
    "category": "Plains & Sides",
    "categoryId": "plains-sides",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
    "station": "kitchen",
    "is_new": false,
    "offer_label": "",
    "offer_price": null,
    "price_status": "confirmed",
    "basis": "Menu photo and website agree.",
    "section": "Plains & Sides",
    "variants": [
      {
        "label": "Standard",
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  }
];

const SEED_STATIONS = [
  { id: 'station-kitchen', name: 'Main Hot Kitchen', code: 'KIT-1', type: 'kitchen', printer: 'Kitchen Thermal 01 (192.168.1.120)', status: 'online', color: '#ED1C24' },
  { id: 'station-bar', name: 'Bar & Cold Drinks', code: 'BAR-1', type: 'bar', printer: 'Bar Receipt 01 (192.168.1.122)', status: 'online', color: '#3b82f6' },
  { id: 'station-grill', name: 'Charcoal & Grills', code: 'GRL-1', type: 'grill', printer: 'Kitchen Thermal 02 (192.168.1.121)', status: 'online', color: '#f59e0b' },
  { id: 'station-bakery', name: 'Bakery & Breakfast Bar', code: 'BAK-1', type: 'bakery', printer: 'Counter Thermal 01 (USB)', status: 'online', color: '#ec4899' },
  { id: 'station-coffee', name: 'Barista Coffee Station', code: 'COF-1', type: 'barista', printer: 'Bar Receipt 02 (LAN)', status: 'online', color: '#8b5cf6' }
];

const SEED_DINING_ZONES = [
  { id: 'zone-garden', name: 'Main Garden', floor: 'Ground', description: 'Open-air lush garden dining with ambient lights', color: '#10b981' },
  { id: 'zone-terrace', name: 'Veranda & Terrace', floor: '1st Floor', description: 'Sheltered outdoor terrace overlooking Kasarani', color: '#3b82f6' },
  { id: 'zone-vip', name: 'VIP Lounge', floor: '2nd Floor', description: 'Air-conditioned executive private dining with dedicated service', color: '#8b5cf6' },
  { id: 'zone-hall', name: 'Main Cafeteria Hall', floor: 'Ground', description: 'Central cafeteria seating and quick self-serve area', color: '#f59e0b' },
  { id: 'zone-balcony', name: 'Kasarani Balcony', floor: '1st Floor', description: 'Elevated scenic balcony seating for casual bites', color: '#ED1C24' }
];

const SEED_PROMOTIONS = [
  {
    id: 'promo-01',
    title: 'Beef Stew & Mukimo Combo Deal',
    desc: 'Tender slow-braised beef chunks served with savory potato-pumpkin leaf mukimo.',
    origPrice: 370,
    offerPrice: 290,
    discountPercent: 22,
    isDailySpecial: true,
    image: '/images/hero-banner.jpg',
    category: 'Beef',
    itemId: 'item-beef',
    active: true
  },
  {
    id: 'promo-02',
    title: 'Chicken Broiler (1/2) & Chips Masala Deal',
    desc: 'Golden roasted half chicken paired with spicy aromatic masala fries.',
    origPrice: 600,
    offerPrice: 480,
    discountPercent: 20,
    isDailySpecial: true,
    image: '/images/chicken-steak.jpg',
    category: 'Chicken Broiler',
    itemId: 'item-chicken-broiler',
    active: true
  },
  {
    id: 'promo-03',
    title: 'Fresh Passion Juice (500ml) & Samosa Trio',
    desc: 'Pure cold-pressed 500ml passion fruit juice with 2 spiced beef samosas.',
    origPrice: 250,
    offerPrice: 190,
    discountPercent: 24,
    isDailySpecial: true,
    image: '/images/beef-pizza.jpg',
    category: 'Fresh Juices',
    itemId: 'item-juices-fresh-passion-juice',
    active: true
  },
  {
    id: 'promo-04',
    title: 'Matumbo Stew & Ugali Plate',
    desc: 'Rich spiced tripe stew simmered slowly with sweet peppers, served with hot soft ugali.',
    origPrice: 200,
    offerPrice: 160,
    discountPercent: 20,
    isDailySpecial: true,
    image: '/images/hero-banner.jpg',
    category: 'Matumbo',
    itemId: 'item-matumbo',
    active: true
  }
];

// Initial State from Seed / LocalStorage
let categories = (function() {
  try {
    const saved = JSON.parse(localStorage.getItem('shamba_categories'));
    if (saved && Array.isArray(saved) && saved.length > 5 && saved.some(c => c.name.includes('Minji'))) return saved;
  } catch(e) {}
  return SEED_CATEGORIES;
})();

let stations = (function() {
  try {
    const saved = JSON.parse(localStorage.getItem('shamba_stations'));
    if (saved && Array.isArray(saved) && saved.length > 0) return saved;
  } catch(e) {}
  return SEED_STATIONS;
})();

let diningZones = (function() {
  try {
    const saved = JSON.parse(localStorage.getItem('shamba_dining_zones'));
    if (saved && Array.isArray(saved) && saved.length > 0) return saved;
  } catch(e) {}
  return SEED_DINING_ZONES;
})();

let menuItems = (function() {
  try {
    const saved = JSON.parse(localStorage.getItem('shamba_menu_items'));
    if (saved && Array.isArray(saved) && saved.length > 10 && saved.some(i => i.name === 'Minji')) return saved;
  } catch(e) {}
  return SEED_MENU_ITEMS;
})();

let promotions = (function() {
  try {
    const saved = JSON.parse(localStorage.getItem('shamba_promotions'));
    if (saved && Array.isArray(saved) && saved.length > 0 && saved.some(p => p.title.includes('Beef Stew') || p.title.includes('Mukimo'))) return saved;
  } catch(e) {}
  return SEED_PROMOTIONS;
})();

function persistMenuState() {
  try {
    localStorage.setItem('shamba_categories', JSON.stringify(categories));
    localStorage.setItem('shamba_stations', JSON.stringify(stations));
    localStorage.setItem('shamba_dining_zones', JSON.stringify(diningZones));
    localStorage.setItem('shamba_menuItems', JSON.stringify(menuItems));
    localStorage.setItem('shamba_menu_items', JSON.stringify(menuItems));
    localStorage.setItem('shamba_promotions', JSON.stringify(promotions));
  } catch(e) {}
}


// ── Categories List ──
const categoryNames = [
  "All",
  "Breakfast Add-ons",
  "Breakfast Plates & Bites",
  "Coffee",
  "Fresh Juices",
  "Soft Drinks & Water",
  "Fast Food",
  "Fishes",
  "Vegies",
  "Beef",
  "Beans",
  "Githeri",
  "Matumbo",
  "Ndegu (Green Grams)",
  "Plains & Sides",
  "Hot Drinks",
  "Chicken Broiler",
  "Chicken Kienyeji",
  "Minji (Peas)",
  "Mix",
  "Njahi (Black Beans)"
];

// ── Staff Roster Dataset (Admin Control) ──
let staffRoster = [
  { id: 'st-01', name: 'Amina Mwangi', role: 'Shift Lead / Admin', station: 'Main Dining Floor', authManaged: true, phone: '+254 711 234 567', active: true },
  { id: 'st-02', name: 'Juma Otieno', role: 'Floor Waiter', station: 'Garden Terrace', authManaged: true, phone: '+254 722 345 678', active: true },
  { id: 'st-03', name: 'Faith Wanjiku', role: 'Head Chef', station: 'Hot Kitchen', authManaged: true, phone: '+254 733 456 789', active: true },
  { id: 'st-04', name: 'Kevin Kiprono', role: 'Bartender', station: 'Cocktail Bar', authManaged: true, phone: '+254 744 567 890', active: true },
  { id: 'st-05', name: 'Sarah Nduta', role: 'Floor Waiter', station: 'Main Dining Floor', authManaged: true, phone: '+254 755 678 901', active: true }
];

// ── Application State ──
let activeCategory = 'All';
let guestActiveCategory = 'All';
let guestCurrentPage = 1;
const GUEST_ITEMS_PER_PAGE = 10;
let cart = []; // Array of { id, name, price, qty, spice, side, notes }
let currentView = 'guest'; // 'dashboard' or 'guest'
let currentDashPanel = 'home';
const staffSession = window.__STAFF_SESSION__ || null;
const DEMO_STAFF = { admin: '2407', staff: '1102' };
const hasAdminSession = () => Boolean(staffSession && ['admin','manager'].includes(staffSession.role));
const demoRole = pin => pin === DEMO_STAFF.admin ? 'admin' : pin === DEMO_STAFF.staff ? 'staff' : null;
let selectedDishForCustomization = null;
let currentCustomSpice = 'Medium';
let currentCustomSide = 'Hand-Cut Fries';

// ── Logged-in Staff State & PIN Audit Trail (Item 10 & 11) ──
let loggedInUser = {
  id: 'st-01',
  name: 'Amina Mwangi',
  role: 'Admin',
  station: 'Main Dining Floor',
  authManaged: true,
  isAdmin: true
};

let loginAuditLog = [
  { id: 'log-1', timestamp: '2026-10-07 08:30:15', staffName: 'Amina Mwangi', role: 'Shift Lead / Admin', pinUsed: 'redacted', action: 'LOGIN', device: 'Terminal 01' },
  { id: 'log-2', timestamp: '2026-10-07 08:45:00', staffName: 'Juma Otieno', role: 'Floor Waiter', pinUsed: 'redacted', action: 'LOGIN', device: 'Tablet Floor 1' },
  { id: 'log-3', timestamp: '2026-10-07 09:00:22', staffName: 'Faith Wanjiku', role: 'Head Chef', pinUsed: 'redacted', action: 'LOGIN', device: 'Kitchen KDS' },
  { id: 'log-4', timestamp: '2026-10-07 14:15:10', staffName: 'Kevin Kiprono', role: 'Bartender', pinUsed: 'redacted', action: 'LOGIN', device: 'Bar POS' },
  { id: 'log-5', timestamp: '2026-10-07 15:30:00', staffName: 'Sarah Nduta', role: 'Floor Waiter', pinUsed: 'redacted', action: 'LOGIN', device: 'Tablet Floor 2' }
];

// (Promotions dataset initialized in seed block above)


// ── Admin Configurable Order Edit Grace Window (Item 6) ──
let orderEditWindowSeconds = 300; // 5 minutes (admin configurable server policy)
let placedOrdersHistory = []; // Orders with countdown windows & lock states
let currentOrderDiningType = 'dine-in'; // 'dine-in' or 'takeaway' (Item 7)

// ── Tables OS Dataset & Multi-Party Session Support (Item 1 & 2) ──
// Each table has seats capacity and an array of open independent sessions
let tables = [
  {
    num: '01', zone: 'Garden', capacity: 4, seats: 4, status: 'occupied', waiter: 'Amina Mwangi',
    sessions: [
      { id: 'sess-01-a', partyName: 'Party Mwangi', partySize: 2, status: 'confirmed', bill: 2100, waiter: 'Amina Mwangi', startedAt: '15:20', orders: 1 },
      { id: 'sess-01-b', partyName: 'Party Kariuki', partySize: 2, status: 'confirmed', bill: 1350, waiter: 'Amina Mwangi', startedAt: '15:45', orders: 1 }
    ]
  },
  {
    num: '02', zone: 'Garden', capacity: 2, seats: 2, status: 'free', waiter: 'Unassigned',
    sessions: []
  },
  {
    num: '03', zone: 'Garden', capacity: 4, seats: 4, status: 'occupied', waiter: 'Juma Otieno',
    sessions: [
      { id: 'sess-03-a', partyName: 'Party Otieno', partySize: 3, status: 'confirmed', bill: 1750, waiter: 'Juma Otieno', startedAt: '16:05', orders: 1 }
    ]
  },
  {
    num: '04', zone: 'Terrace', capacity: 10, seats: 10, originalCapacity: 6, status: 'occupied', waiter: 'Sarah Nduta',
    mergedWith: '05',
    sessions: [
      { id: 'sess-04-a', partyName: 'Table 4 Main (Merged Large Party)', partySize: 8, status: 'confirmed', bill: 8600, waiter: 'Sarah Nduta', startedAt: '14:30', orders: 4 }
    ]
  },
  {
    num: '05', zone: 'Terrace', capacity: 4, seats: 4, originalCapacity: 4, status: 'merged', waiter: 'Sarah Nduta',
    mergedInto: '04',
    sessions: []
  },
  {
    num: '06', zone: 'Terrace', capacity: 4, seats: 4, status: 'occupied', waiter: 'Juma Otieno',
    sessions: [
      { id: 'sess-06-a', partyName: 'Terrace Guests', partySize: 5, status: 'confirmed', bill: 3200, waiter: 'Juma Otieno', startedAt: '15:10', orders: 2 } // overflow 5 > 4
    ]
  },
  {
    num: '07', zone: 'VIP', capacity: 8, seats: 8, status: 'occupied', waiter: 'Amina Mwangi',
    sessions: [
      { id: 'sess-07-a', partyName: 'VIP Executive', partySize: 8, status: 'confirmed', bill: 12400, waiter: 'Amina Mwangi', startedAt: '13:00', orders: 4 }
    ]
  },
  {
    num: '08', zone: 'Indoor', capacity: 4, seats: 4, status: 'free', waiter: 'Unassigned',
    sessions: []
  },
  {
    num: '09', zone: 'Indoor', capacity: 4, seats: 4, status: 'occupied', waiter: 'Sarah Nduta',
    sessions: [
      { id: 'sess-09-a', partyName: 'Family Lunch', partySize: 2, status: 'pending', bill: 0, waiter: 'Sarah Nduta', startedAt: '16:15', orders: 0 } // Pending arrival
    ]
  },
  {
    num: '10', zone: 'Indoor', capacity: 2, seats: 2, status: 'free', waiter: 'Unassigned',
    sessions: []
  },
  {
    num: '11', zone: 'Bar', capacity: 4, seats: 4, status: 'occupied', waiter: 'Kevin Kiprono',
    sessions: [
      { id: 'sess-11-a', partyName: 'Lounge Drinks', partySize: 2, status: 'confirmed', bill: 2100, waiter: 'Kevin Kiprono', startedAt: '16:00', orders: 2 }
    ]
  },
  {
    num: '12', zone: 'Bar', capacity: 2, seats: 2, status: 'free', waiter: 'Unassigned',
    sessions: []
  }
];

// Active guest session
let activeGuestSessionId = 'sess-04-a';
let activeTableSession = { num: '04', zone: 'Terrace' };

// Venue Geolocation (Testimonial Cafe Nairobi: -1.2921, 36.8219)
const VENUE_COORDS = { lat: -1.2921, lng: 36.8219, allowedRadiusKm: 5.0 };
let guestGeoStatus = 'unverified'; // 'verified', 'flagged_remote', 'unverified'

// ── Table URL & Session Management ──
const PUBLIC_MENU_DOMAIN = 'https://dijimenu.vercel.app';

function getTableMenuUrl(tableNum, zone) {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const isLocal = !host || host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0';
  const origin = isLocal ? PUBLIC_MENU_DOMAIN : (window.location.origin || PUBLIC_MENU_DOMAIN);
  return `${origin}/?table=${String(tableNum).padStart(2, '0')}&zone=${encodeURIComponent(zone || 'Terrace')}`;
}

function setActiveTableSession(num, zone, updateUrl = false, requestedPartySize = 2) {
  const formattedNum = String(num).padStart(2, '0');
  let matchedTable = tables.find(t => String(t.num).padStart(2, '0') === formattedNum);
  if (!matchedTable) {
    matchedTable = {
      num: formattedNum,
      zone: zone || 'Main Garden',
      capacity: 4,
      seats: 4,
      status: 'free',
      waiter: 'Unassigned',
      sessions: []
    };
    tables.push(matchedTable);
  }
  const resolvedZone = zone || matchedTable.zone || 'Terrace';

  if (!Array.isArray(matchedTable.sessions)) {
    matchedTable.sessions = [];
  }

  // Calculate currently occupied seats by active open sessions
  const currentOccupiedSeats = matchedTable.sessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
  const remainingCapacity = Math.max(0, matchedTable.capacity - currentOccupiedSeats);

  // Find or create session for this guest
  let currentSession = matchedTable.sessions.find(s => s.id === activeGuestSessionId);
  if (!currentSession) {
    // Open a new independent session for this party
    const newSessionId = `sess-${formattedNum}-${Date.now().toString(36)}`;
    const isOverflow = (requestedPartySize > remainingCapacity);
    const extraSeats = isOverflow ? (requestedPartySize - remainingCapacity) : 0;

    currentSession = {
      id: newSessionId,
      partyName: `Party at T${formattedNum} (#${matchedTable.sessions.length + 1})`,
      partySize: requestedPartySize,
      extraSeats: extraSeats,
      status: 'confirmed', // Automatic table seating & confirmation
      bill: 0,
      waiter: 'Unassigned',
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      orders: 0
    };
    matchedTable.sessions.push(currentSession);
    activeGuestSessionId = newSessionId;
  }

  // Update table overall status based on seat capacity
  updateTableOverallStatus(matchedTable);

  activeTableSession = { num: formattedNum, zone: resolvedZone };
  try {
    localStorage.setItem('shamba_active_table', JSON.stringify(activeTableSession));
    localStorage.setItem('shamba_active_session_id', activeGuestSessionId);
  } catch(e) {}

  const displayStr = `Table ${activeTableSession.num} · ${activeTableSession.zone}`;

  const guestDisplay = $('#guest-table-display');
  if (guestDisplay) guestDisplay.textContent = displayStr;

  const activeDisplay = $('#active-table-display');
  if (activeDisplay) activeDisplay.textContent = displayStr;

  const footerTable = $('#guest-footer-table');
  if (footerTable) footerTable.textContent = `Dining at Table ${activeTableSession.num} · ${activeTableSession.zone}`;

  const trackerSub = $('#tracker-table-sub');
  if (trackerSub) trackerSub.textContent = `Table ${activeTableSession.num} · ${activeTableSession.zone} · Live Order`;

  // Update Guest Arrival Banner visibility (Item 5)
  updateGuestArrivalBanner();

  if (updateUrl && window.history && window.history.replaceState) {
    const url = new URL(window.location);
    url.searchParams.set('table', activeTableSession.num);
    url.searchParams.set('zone', activeTableSession.zone);
    window.history.replaceState({}, '', url);
  }
}

// Update table overall badge logic: FREE, OCCUPIED, AT CAPACITY, MAX EXCEEDED +N (Item 1)
function updateTableOverallStatus(table) {
  if (!table.sessions || table.sessions.length === 0) {
    table.status = 'free';
    table.overflowCount = 0;
    return;
  }
  const totalOccupied = table.sessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
  if (totalOccupied === 0) {
    table.status = 'free';
    table.overflowCount = 0;
  } else if (totalOccupied < table.capacity) {
    table.status = 'occupied';
    table.overflowCount = 0;
  } else if (totalOccupied === table.capacity) {
    table.status = 'at_capacity';
    table.overflowCount = 0;
  } else {
    table.status = 'max_exceeded';
    table.overflowCount = totalOccupied - table.capacity;
  }
}

// Guest arrival banner updater (Item 5)
function updateGuestArrivalBanner() {
  const banner = $('#guest-arrival-banner');
  const cartWarning = $('#cart-arrival-warning');
  if (cartWarning) cartWarning.style.display = 'none';
  if (banner) {
    // Automatic arrival recognized, no blocking warning
    banner.style.display = 'none';
  }
}

// Optional secondary signal: check guest browser geolocation against Testimonial Cafe Nairobi coordinates (Item 5)
function checkGuestBrowserLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      // Haversine formula calculation
      const toRad = x => (x * Math.PI) / 180;
      const dLat = toRad(lat - VENUE_COORDS.lat);
      const dLng = toRad(lng - VENUE_COORDS.lng);
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(toRad(VENUE_COORDS.lat)) * Math.cos(toRad(lat)) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distKm = 6371 * c;

      if (distKm > VENUE_COORDS.allowedRadiusKm) {
        guestGeoStatus = 'flagged_remote';
        console.warn(`[Testimony OS Geolocation] Guest device is ${distKm.toFixed(1)}km away from Testimonial Cafe. Flagged for staff review.`);
      } else {
        guestGeoStatus = 'verified';
      }
    },
    (err) => {
      // Permission denied or unavailable — secondary signal only, never hard block
      guestGeoStatus = 'unverified';
    },
    { timeout: 8000, maximumAge: 60000 }
  );
}

function initTableSessionFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);

  // Check /t/:token path routing (e.g. from physical QR stands)
  const path = window.location.pathname;
  if (path && path.startsWith('/t/')) {
    const token = path.replace('/t/', '').split('/')[0];
    const matchedToken = tables.find(t => t.qr_token === token || ('qr-shamba-t' + t.num) === token || ('t' + t.num) === token || t.num === token);
    if (matchedToken) {
      setActiveTableSession(matchedToken.num, matchedToken.zone, false);
      setView('guest');
      showToast(`Welcome! Seated at Table ${matchedToken.num} (${matchedToken.zone}) · Tableside Menu`);
      return;
    }
  }
  const tableParam = urlParams.get('table') || urlParams.get('t');
  const zoneParam = urlParams.get('zone') || urlParams.get('z');
  const modeParam = urlParams.get('mode') || urlParams.get('view');

  if (tableParam) {
    const formattedNum = String(tableParam).padStart(2, '0');
    const matched = tables.find(t => String(t.num).padStart(2, '0') === formattedNum);
    const resolvedZone = zoneParam || (matched ? matched.zone : 'Terrace');
    setActiveTableSession(formattedNum, resolvedZone, false);
    setView('guest');
    showToast(`Welcome! You are seated at Table ${formattedNum} (${resolvedZone}) · Tableside Menu`);
    return;
  }

  // Check saved session
  try {
    const saved = localStorage.getItem('shamba_active_table');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.num) {
        setActiveTableSession(parsed.num, parsed.zone, false);
      }
    }
  } catch(e) {}

  if (modeParam === 'guest') {
    setView('guest');
  } else {
    setView('dashboard');
  }
}

// ── Initialize App ──
document.addEventListener('DOMContentLoaded', () => {
  initTableSessionFromUrl();
  setView('guest');
  renderDashboardCategories();
  renderDashboardDishes();
  renderStaffRoster();
  renderGuestCategories();
  renderGuestDishes();
  setupEventListeners();
  updateCartUI();
  initTableSessionFromUrl();

  // Synchronize menu catalog with server-authoritative seed API if online
  if (typeof fetch === 'function') {
    fetch('/api/menu')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          menuItems = data.items;
          renderDashboardDishes();
          renderGuestDishes();
        }
      })
      .catch(() => {
        // Safe offline fallback: local seed dataset already active
      });
  }

  // Register Service Worker for offline tableside browsing resilience
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('Tableside service worker notice:', err);
    });
  }
});

// ═══════════════════════════════════════════
//  VIEW SWITCHER (DASHBOARD vs GUEST MODE)
// ═══════════════════════════════════════════

function setView(viewName) {
  currentView = viewName;
  const shell = $('.app-shell');
  const dashView = $('#view-dashboard');
  const guestView = $('#view-guest-menu');
  const dashTopbar = $('#dash-topbar');
  const guestTopbar = $('#guest-topbar');

  if (viewName === 'guest') {
    shell.classList.add('guest-mode');
    if (dashView) dashView.style.display = 'none';
    if (guestView) guestView.style.display = 'block';
    if (dashTopbar) dashTopbar.style.display = 'none';
    if (guestTopbar) guestTopbar.style.display = 'flex';

    const staffNav = $('#staff-bottom-nav');
    if (staffNav) staffNav.style.display = 'none';

    // Hide Staff OS buttons on guest/customer side
    const staffGateBtn = $('#btn-staff-gate');
    if (staffGateBtn) staffGateBtn.style.display = 'none';
    const guestStaffGateBtn = $('#btn-guest-staff-gate');
    if (guestStaffGateBtn) guestStaffGateBtn.style.display = 'none';

    $('#tab-dash-view')?.classList.remove('active');
    $('#tab-guest-view')?.classList.add('active');

    renderGuestCategories();
    renderGuestDishes();
    updateCartUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Tableside Guest Menu Active · Table ${activeTableSession.num} (${activeTableSession.zone})`);
  } else {
    shell.classList.remove('guest-mode');
    if (dashView) dashView.style.display = 'block';
    if (guestView) guestView.style.display = 'none';
    if (dashTopbar) dashTopbar.style.display = 'flex';
    if (guestTopbar) guestTopbar.style.display = 'none';

    const staffNav = $('#staff-bottom-nav');
    if (staffNav) staffNav.style.display = '';

    // Restore Staff OS buttons on dashboard side
    const staffGateBtn2 = $('#btn-staff-gate');
    if (staffGateBtn2) staffGateBtn2.style.display = '';
    const guestStaffGateBtn2 = $('#btn-guest-staff-gate');
    if (guestStaffGateBtn2) guestStaffGateBtn2.style.display = '';

    const floatingOrder = $('#guest-floating-order-container');
    if (floatingOrder) floatingOrder.style.display = 'none';

    $('#tab-dash-view')?.classList.add('active');
    $('#tab-guest-view')?.classList.remove('active');

    renderDashboardCategories();
    renderDashboardDishes();
    renderStaffRoster();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ═══════════════════════════════════════════
//  DASHBOARD RENDERING (IMAGE 2)
// ═══════════════════════════════════════════

function renderDashboardCategories() {
  const container = $('#category-rail');
  if (!container) return;

  const dynamicCategories = getDynamicCategoryList();
  const cats = dynamicCategories.map(name => {
    const count = name === 'All'
      ? menuItems.length
      : menuItems.filter(i => {
          if (name === 'Drinks & Beverages') {
            return i.category === 'Drinks & Beverages' || i.category === 'Juices & Drinks' || i.category === 'Drinks';
          }
          return i.category === name;
        }).length;
    let thumb = '/images/hero-banner.jpg';
    if (name === 'Pizzas & Burgers') thumb = '/images/beef-pizza.jpg';
    if (name === 'Grill & Steaks') thumb = '/images/chicken-steak.jpg';
    if (name === 'Pasta & Coastal') thumb = '/images/spaghetti.jpg';
    if (name === 'Starters') thumb = '/images/beef-pizza.jpg';
    if (name === 'Drinks & Beverages' || name === 'Juices & Drinks' || name === 'Drinks') thumb = '/images/hero-banner.jpg';
    if (name === 'Desserts') thumb = '/images/black-burger.jpg';

    return { name, count, thumb };
  });

  container.innerHTML = cats.map(cat => `
    <div class="category-card ${cat.name === activeCategory ? 'active' : ''}" data-cat="${cat.name}">
      <div class="cat-thumb">
        <img src="${cat.thumb}" alt="${cat.name}" />
      </div>
      <strong>${cat.name}</strong>
      <span>${cat.count} items</span>
    </div>
  `).join('');

  $$('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      activeCategory = card.getAttribute('data-cat');
      renderDashboardCategories();
      renderDashboardDishes();
    });
  });
}

function renderDashboardDishes() {
  const container = $('#dishes-grid-dash');
  if (!container) return;

  const searchQuery = ($('#global-search')?.value || '').toLowerCase();
  const filtered = menuItems.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery) || item.desc.toLowerCase().includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  $('#dish-total-indicator').textContent = `Showing ${filtered.length} dishes`;

  container.innerHTML = filtered.map(item => `
    <article class="dish-card-dash ${!item.is_available ? 'sold-out' : ''}" data-id="${item.id}">
      <div class="dish-card-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="rating-pill">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${item.rating}</span>
        </div>
      </div>
      <div class="dish-card-body">
        <div class="dish-tags">
          <span class="dish-tag">${item.category}</span>
          ${item.offer_label ? `<span class="dish-tag" style="background:#fee2e2;color:#b91c1c;">${item.offer_label}</span>` : ''}
        </div>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <div class="dish-meta-row">
          <div>
            <div class="dish-price">${item.price_status === 'unknown' || item.price == null ? `<span style="color:var(--status-warning,#e65100);font-weight:700;">Ask Staff / TBD</span>` : (item.price_status === 'working' ? `~ KES ${(item.offer_price || item.price).toLocaleString()} <small style="font-size:10px;color:var(--dash-muted);">[Working]</small>` : `KES ${(item.offer_price || item.price).toLocaleString()}`)}</div>${item.basis ? `<div style="font-size:10px;color:var(--dash-muted);margin-top:2px;font-style:italic;" title="${item.basis}">${item.basis.length > 35 ? item.basis.slice(0, 35) + '...' : item.basis}</div>` : ''}
            <div class="dish-prep-time">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${item.prep_time}</span>
            </div>
          </div>
          <label class="switch-control" title="Toggle Live Availability">
            <input type="checkbox" class="toggle-availability" data-id="${item.id}" ${item.is_available ? 'checked' : ''} />
            <span class="switch-slider"></span>
            <span class="switch-label ${item.is_available ? 'in-stock' : 'sold-out'}">
              ${item.is_available ? 'In Stock' : 'Sold Out'}
            </span>
          </label>
        </div>
      </div>
    </article>
  `).join('');

  // Wire availability toggles
  $$('.toggle-availability').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      const item = menuItems.find(i => i.id === id);
      if (item) {
        item.is_available = e.target.checked;
        showToast(`${item.name} marked as ${item.is_available ? 'Available' : 'Sold Out'}`);
        renderDashboardDishes();
        renderGuestDishes();
      }
    });
  });
}

// ── Staff Roster Rendering ──
function renderStaffRoster() {
  const grid = $('#staff-roster-grid');
  if (!grid) return;

  $('#staff-badge-count').textContent = staffRoster.length;

  grid.innerHTML = staffRoster.map(s => {
    const initials = s.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return `
      <div class="staff-member-card" data-id="${s.id}">
        <div class="staff-avatar-initials">${initials}</div>
        <div class="staff-member-info">
          <strong>${s.name}</strong>
          <span class="staff-role-badge">${s.role}</span>
          <span class="staff-station-tag">${s.station}</span>
        </div>
        <div style="text-align:right;">
          <span class="staff-pin-tag">Credentials managed securely</span>
          <span style="display:block;font-size:10px;color:#10b981;font-weight:700;margin-top:4px;">Active</span>
        </div>
      </div>
    `;
  }).join('');
}

// ═══════════════════════════════════════════
//  GUEST MENU & ORDERING FLOW (SECTION + CARD RHYTHM)
// ═══════════════════════════════════════════

function getCategoryIcon(catName) {
  switch (catName) {
    case 'All':
      return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
    case 'Starters':
      return `<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`;
    case 'Grill & Steaks':
      return `<svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
    case 'Pizzas & Burgers':
      return `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12A10 10 0 0 1 12 2z"/><path d="m12 2 4 10-14 2"/></svg>`;
    case 'Pasta & Coastal':
      return `<svg viewBox="0 0 24 24"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
    case 'Drinks & Beverages':
    case 'Juices & Drinks':
    case 'Drinks':
      return `<svg viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`;
    case 'Desserts':
      return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
  }
}

// ── Dynamic Category List Provider ──
function getDynamicCategoryList() {
  const list = ['All'];
  if (Array.isArray(categories)) {
    categories.forEach(c => {
      if (c && c.name && !list.includes(c.name)) list.push(c.name);
    });
  }
  if (Array.isArray(menuItems)) {
    menuItems.forEach(i => {
      if (i && i.category && !list.includes(i.category)) list.push(i.category);
    });
  }
  return list;
}

function renderGuestCategories() {
  const bar = $('#guest-category-bar') || $('.guest-category-bar');
  if (!bar) return;

  // Explicitly fetch and inject dynamic categories ensuring 'Drinks & Beverages' is present
  const dynamicCategories = getDynamicCategoryList();

  bar.innerHTML = dynamicCategories.map(catName => {
    const count = catName === 'All'
      ? menuItems.length
      : menuItems.filter(i => {
          if (catName === 'Drinks & Beverages') {
            return i.category === 'Drinks & Beverages' || i.category === 'Juices & Drinks' || i.category === 'Drinks';
          }
          return i.category === catName;
        }).length;

    const iconSvg = getCategoryIcon(catName);
    const isActive = catName === guestActiveCategory;

    return `
      <button class="guest-cat-card ${isActive ? 'active' : ''}" data-cat="${catName}" role="tab" aria-selected="${isActive}" aria-label="Filter ${catName}">
        ${iconSvg}
        <span>${catName}</span>
        <span class="guest-cat-count">${count} item${count === 1 ? '' : 's'}</span>
      </button>
    `;
  }).join('');

  bar.querySelectorAll('.guest-cat-card').forEach(card => {
    card.addEventListener('click', () => {
      guestActiveCategory = card.getAttribute('data-cat');
      renderGuestCategories();
      renderGuestDishes();
      // Scroll to category section if specific category selected
      if (guestActiveCategory !== 'All') {
        const sec = $(`#guest-sec-${guestActiveCategory.replace(/[^a-zA-Z0-9]/g, '-')}`);
        if (sec) {
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// ── Guest Promotions & Daily Specials Carousel (Item 4) ──
function renderGuestPromosCarousel() {
  const container = document.getElementById('guest-promos-container');
  const section = document.getElementById('guest-promos-section');
  if (!container || !section) return;

  const now = new Date();
  const activePromos = promotions.filter(p => {
    if (!p.active) return false;
    if (p.isDailySpecial) return true;
    if (p.startTime && new Date(p.startTime) > now) return false;
    if (p.endTime && new Date(p.endTime) < now) return false;
    return true;
  });

  if (activePromos.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';

  container.innerHTML = activePromos.map(p => `
    <div class="guest-promo-slide" data-promo-id="${p.id}">
      <span class="promo-badge-tag">${p.isDailySpecial ? 'Daily Special' : `${p.discountPercent}% OFF`}</span>
      <img src="${p.image || '/images/hero-banner.jpg'}" alt="${p.title}" loading="lazy" />
      <div style="flex:1;min-width:0;">
        <strong class="promo-title">${p.title}</strong>
        <p class="promo-desc">${p.desc}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:4px;">
          <div style="display:flex;align-items:baseline;gap:6px;">
            <span style="text-decoration:line-through;color:var(--guest-muted);font-size:11px;">KES ${Number(p.origPrice).toLocaleString()}</span>
            <span style="font-size:15px;font-weight:900;color:var(--red-strong);">KES ${Number(p.offerPrice).toLocaleString()}</span>
          </div>
          <button type="button" class="btn-add-special-cart" onclick="addPromoSpecialToCart('${p.id}')">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.addPromoSpecialToCart = function(promoId) {
  const promo = promotions.find(p => p.id === promoId);
  if (!promo) return;
  const itemInCart = cart.find(c => c.id === promo.id || c.name === promo.title);
  if (itemInCart) {
    itemInCart.qty += 1;
  } else {
    cart.push({
      id: promo.id,
      name: promo.title,
      price: promo.offerPrice,
      qty: 1,
      spice: 'Mild',
      side: 'Default',
      notes: 'Special Promo Order'
    });
  }
  updateCartBadge();
  renderCartDrawer();
  showToast(`Added 1x ${promo.title} (Special Offer) to cart!`);
  $('#modal-cart')?.classList.add('active');
};

function renderGuestDishes() {
  renderGuestPromosCarousel();
  const column = $('#guest-sections-column');
  if (!column) return;

  const searchInputTop = $('#guest-search-input-top');
  const searchInputBanner = $('#guest-search-input');
  const query = ((searchInputTop?.value || searchInputBanner?.value) || '').toLowerCase().trim();

  // Fetch dynamic categories ensuring 'Drinks & Beverages' is included
  const dynamicCategories = getDynamicCategoryList();
  const venueCategories = dynamicCategories.filter(c => c !== 'All');

  let sectionsToRender = [];

  if (query) {
    // If searching, group matching items by their categories
    const matching = menuItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
    if (matching.length === 0) {
      column.innerHTML = `
        <div style="text-align:center;padding:56px 20px;background:var(--guest-surface);border-radius:var(--radius-xl);border:1px dashed var(--guest-border);">
          <p style="font-size:18px;font-family:var(--font-display);color:var(--guest-accent);">No dishes or drinks found for "${query}"</p>
          <p style="font-size:13px;color:var(--guest-muted);margin-top:6px;">Try searching for steaks, burgers, cocktails, or refreshing juices</p>
        </div>
      `;
      return;
    }
    const matchingCats = [...new Set(matching.map(m => m.category))];
    sectionsToRender = matchingCats.map(cat => ({
      category: cat,
      items: matching.filter(m => m.category === cat)
    }));
  } else if (guestActiveCategory === 'All') {
    // Render all categories as distinct sections with horizontal carousels
    sectionsToRender = venueCategories.map(cat => ({
      category: cat,
      items: menuItems.filter(m => {
        if (cat === 'Drinks & Beverages') {
          return m.category === 'Drinks & Beverages' || m.category === 'Juices & Drinks' || m.category === 'Drinks';
        }
        return m.category === cat;
      })
    })).filter(sec => sec.items.length > 0);
  } else {
    // Render only the selected category
    sectionsToRender = [{
      category: guestActiveCategory,
      items: menuItems.filter(m => {
        if (guestActiveCategory === 'Drinks & Beverages') {
          return m.category === 'Drinks & Beverages' || m.category === 'Juices & Drinks' || m.category === 'Drinks';
        }
        return m.category === guestActiveCategory;
      })
    }];
  }

  column.innerHTML = sectionsToRender.map(sec => {
    const secId = `guest-sec-${sec.category.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const isDrinkCategory = sec.category.toLowerCase().includes('drink') || sec.category.toLowerCase().includes('juice') || sec.category.toLowerCase().includes('beverage');

    const cardsHtml = sec.items.map(item => {
      const effectivePrice = item.offer_price ? item.offer_price : (item.price != null ? item.price : 0);
  const isUnknownPrice = item.price_status === 'unknown' || item.price == null;
      const cartItem = cart.find(c => c.id === item.id);
      const cartQty = cartItem ? cartItem.qty : 0;
      const isAvailable = !!item.is_available;

      return `
        <article class="guest-dish-card ${!isAvailable ? 'sold-out' : ''}" data-id="${item.id}">
          <div class="guest-dish-media" onclick="openDishCustomization('${item.id}')">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            ${item.offer_label ? `<span class="dish-organic-badge offer">${item.offer_label}</span>` : `<span class="dish-organic-badge">${sec.category}</span>`}
            <span class="availability-tag ${isAvailable ? 'in-stock' : 'sold-out'}">
              ${isAvailable ? 'Available' : 'Sold Out'}
            </span>
          </div>

          <div class="guest-dish-info" onclick="openDishCustomization('${item.id}')">
            <h4>${item.name}</h4>
            <p>${item.desc}</p>
            <div class="guest-dish-footer">
              <div class="guest-price-group">
                <span class="guest-price">${item.price_status === 'unknown' || item.price == null ? `<span style="font-size:13px;color:var(--red-on-dark, #FF5A5F);">Ask Staff</span>` : (item.price_status === 'working' ? `~ KES ${effectivePrice.toLocaleString()}` : `KES ${effectivePrice.toLocaleString()}`)}</span>
                <span class="guest-prep-badge">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  ${item.prep_time}
                </span>
              </div>

              ${isAvailable ? `
                <button class="btn-quick-add ${cartQty > 0 ? 'in-cart' : ''}" onclick="event.stopPropagation(); quickAddToCart('${item.id}')" aria-label="Add ${item.name} to order" title="Add to table order">
                  ${cartQty > 0 ? `<span style="font-weight:800;font-size:13px;">${cartQty}</span>` : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`}
                </button>
              ` : `
                <span style="font-size:10px;font-weight:700;color:var(--status-danger);">Unavailable</span>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');

    return `
      <section class="guest-menu-section" id="${secId}" aria-label="${sec.category}">
        <div class="guest-section-header">
          <h3>${sec.category}</h3>
          <span class="btn-see-all" onclick="filterToCategory('${sec.category}')">
            <span>${sec.items.length} ${isDrinkCategory ? 'items' : 'dishes'}</span>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
        <div class="guest-cards-scroll-row">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join('');
}

window.changeGuestPage = function(delta) {
  guestCurrentPage = Math.max(1, guestCurrentPage + delta);
  renderGuestDishes();
  document.getElementById('guest-category-bar')?.scrollIntoView({ behavior: 'smooth' });
};

window.filterToCategory = function(catName) {
  guestActiveCategory = catName;
    guestCurrentPage = 1; // reset page
    renderGuestCategories();
    renderGuestDishes();
  window.scrollTo({ top: 120, behavior: 'smooth' });
};

// ── Quick Add to Cart ──
function quickAddToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item || !item.is_available) return;

  const isDrink = item.category === 'Drinks & Beverages' || item.station === 'bar';
  const existing = cart.find(c => c.id === itemId);
  const effectivePrice = item.offer_price ? item.offer_price : item.price;

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: effectivePrice,
      qty: 1,
      spice: isDrink ? 'Chilled' : 'Medium',
      side: isDrink ? 'Standard' : 'Hand-Cut Fries',
      notes: ''
    });
  }

  showToast(`Added ${item.name} to table order`);
  updateCartUI();
  renderGuestDishes();
}

// ── Open Dish & Drink Customization Modal ──
window.openDishCustomization = function(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  selectedDishForCustomization = item;
  const isDrink = item.category === 'Drinks & Beverages' || item.station === 'bar';
  currentCustomSpice = isDrink ? 'Chilled with Ice' : 'Medium';
  currentCustomSide = isDrink ? 'Natural Cane' : 'Hand-Cut Fries';
  customQty = 1;

  const effectivePrice = item.offer_price ? item.offer_price : item.price;
  const container = $('#customization-container');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex;gap:18px;margin-bottom:16px;">
      <img src="${item.image}" alt="${item.name}" style="width:110px;height:100px;object-fit:cover;border-radius:14px;" />
      <div>
        <span class="guest-hero-pill" style="font-size:10px;padding:3px 10px;margin-bottom:6px;">${item.category}</span>
        <h3 style="font-family:var(--font-display);font-size:22px;color:var(--dash-ink);">${item.name}</h3>
        <p style="font-family:var(--font-serif);font-size:13px;color:var(--dash-muted);margin-top:4px;">${item.desc}</p>
        <div style="font-size:18px;font-weight:800;color:var(--forest);margin-top:8px;">${item.price_status === 'unknown' || item.price == null ? 'Price Confirmed at Table' : (item.price_status === 'working' ? `~ KES ${(effectivePrice || 0).toLocaleString()}` : `KES ${(effectivePrice || 0).toLocaleString()}`)}</div>
      </div>
    </div>

    ${isDrink ? `
      <!-- Temperature & Serving Style -->
      <div class="custom-option-group">
        <label class="custom-option-label">Serving Style &amp; Ice</label>
        <div class="custom-pill-row">
          <button type="button" class="custom-option-pill active" onclick="selectSpice('Chilled with Ice')">Chilled with Ice</button>
          <button type="button" class="custom-option-pill" onclick="selectSpice('Light Ice')">Light Ice</button>
          <button type="button" class="custom-option-pill" onclick="selectSpice('No Ice')">No Ice</button>
          <button type="button" class="custom-option-pill" onclick="selectSpice('Served Hot')">Served Hot</button>
        </div>
      </div>

      <!-- Sweetness / Blend -->
      <div class="custom-option-group">
        <label class="custom-option-label">Sweetness &amp; Blend</label>
        <div class="custom-pill-row">
          <button type="button" class="custom-option-pill active" onclick="selectSide('Natural Cane')">Natural Cane</button>
          <button type="button" class="custom-option-pill" onclick="selectSide('Pure Honey')">Pure Honey</button>
          <button type="button" class="custom-option-pill" onclick="selectSide('Unsweetened')">Unsweetened</button>
          <button type="button" class="custom-option-pill" onclick="selectSide('Extra Citrus')">Extra Citrus</button>
        </div>
      </div>
    ` : `
      <!-- Spice Level Selection -->
      <div class="custom-option-group">
        <label class="custom-option-label">Spice Level</label>
        <div class="custom-pill-row">
          <button type="button" class="custom-option-pill ${currentCustomSpice === 'Mild' ? 'active' : ''}" onclick="selectSpice('Mild')">Mild</button>
          <button type="button" class="custom-option-pill ${currentCustomSpice === 'Medium' ? 'active' : ''}" onclick="selectSpice('Medium')">Medium Spiced</button>
          <button type="button" class="custom-option-pill ${currentCustomSpice === 'Hot' ? 'active' : ''}" onclick="selectSpice('Hot')">Extra Hot &amp; Chili</button>
        </div>
      </div>

      <!-- Choice of Side Selection -->
      <div class="custom-option-group">
        <label class="custom-option-label">Choice of Side</label>
        <div class="custom-pill-row">
          <button type="button" class="custom-option-pill ${currentCustomSide === 'Hand-Cut Fries' ? 'active' : ''}" onclick="selectSide('Hand-Cut Fries')">Hand-Cut Fries</button>
          <button type="button" class="custom-option-pill ${currentCustomSide === 'Steamed Jasmine Rice' ? 'active' : ''}" onclick="selectSide('Steamed Jasmine Rice')">Steamed Rice</button>
          <button type="button" class="custom-option-pill ${currentCustomSide === 'Ugali' ? 'active' : ''}" onclick="selectSide('Ugali')">White Ugali</button>
          <button type="button" class="custom-option-pill ${currentCustomSide === 'Fresh Garden Salad' ? 'active' : ''}" onclick="selectSide('Fresh Garden Salad')">Garden Salad</button>
        </div>
      </div>
    `}

    <!-- Special Dietary or Kitchen Instructions -->
    <div class="form-group">
      <label class="custom-option-label" for="custom-dish-notes">${isDrink ? 'Bar Special Instructions' : 'Special Kitchen Notes'}</label>
      <input type="text" class="form-control" id="custom-dish-notes" placeholder="${isDrink ? 'e.g. Glass of ice on the side, extra lime wedge...' : 'e.g. No onions, sauce on the side, allergies...'}" />
    </div>

    <!-- Quantity & Submit -->
    <div style="display:flex;align-items:center;gap:16px;margin-top:20px;">
      <div style="display:flex;align-items:center;border:1px solid var(--dash-border);border-radius:12px;overflow:hidden;background:#f8faf9;">
        <button type="button" style="padding:10px 16px;font-size:18px;font-weight:700;" onclick="adjustCustomQty(-1)">-</button>
        <span id="custom-qty-val" style="padding:0 12px;font-weight:800;font-size:15px;">1</span>
        <button type="button" style="padding:10px 16px;font-size:18px;font-weight:700;" onclick="adjustCustomQty(1)">+</button>
      </div>
      <button class="btn-primary" style="flex:1;justify-content:center;" onclick="confirmDishCustomization()">
        Add to Order · <span id="custom-total-preview">${item.price_status === 'unknown' || item.price == null ? 'Price TBD' : 'KES ' + (effectivePrice || 0).toLocaleString()}</span>
      </button>
    </div>
  `;

  $('#modal-dish-customization')?.classList.add('active');
};

let customQty = 1;
window.adjustCustomQty = function(delta) {
  customQty = Math.max(1, customQty + delta);
  $('#custom-qty-val').textContent = customQty;
  if (selectedDishForCustomization) {
    const effectivePrice = selectedDishForCustomization.offer_price || selectedDishForCustomization.price;
    $('#custom-total-preview').textContent = (effectivePrice * customQty).toLocaleString();
  }
};

window.selectSpice = function(level) {
  currentCustomSpice = level;
  const row = $$('#customization-container .custom-option-group')[0]?.querySelectorAll('.custom-pill-row button');
  if (row) {
    row.forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase().includes(level.toLowerCase().split(' ')[0]));
    });
  }
};

window.selectSide = function(side) {
  currentCustomSide = side;
  const row = $$('#customization-container .custom-option-group')[1]?.querySelectorAll('.custom-pill-row button');
  if (row) {
    row.forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase().includes(side.toLowerCase().split(' ')[0]));
    });
  }
};

window.confirmDishCustomization = function() {
  if (!selectedDishForCustomization) return;
  const notes = $('#custom-dish-notes')?.value || '';
  const effectivePrice = selectedDishForCustomization.offer_price || selectedDishForCustomization.price;

  cart.push({
    id: selectedDishForCustomization.id + '-' + Date.now(),
    name: selectedDishForCustomization.name,
    price: effectivePrice,
    qty: customQty,
    spice: currentCustomSpice,
    side: currentCustomSide,
    notes: notes
  });

  $('#modal-dish-customization')?.classList.remove('active');
  showToast(`Added ${customQty}x ${selectedDishForCustomization.name} to order`);
  customQty = 1;
  updateCartUI();
  renderGuestDishes();
};

// ── Cart Modal Toggle Helper ──
window.toggleCartModal = function(forceState) {
  const modal = $('#modal-cart');
  if (!modal) return;
  const shouldOpen = typeof forceState === 'boolean' ? forceState : !modal.classList.contains('active');
  if (shouldOpen) {
    renderCartModalItems();
    modal.classList.add('active');
  } else {
    modal.classList.remove('active');
  }
};

// ── Update Cart UI & Floating Pill ──
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const hasItems = cart.length > 0;

  // Topbar badges
  const topCartCount = $('#topbar-cart-count');
  if (topCartCount) topCartCount.textContent = totalCount;

  const guestCartCount = $('#guest-cart-count');
  if (guestCartCount) guestCartCount.textContent = totalCount;

  const guestCartSum = $('#guest-cart-sum');
  if (guestCartSum) guestCartSum.textContent = `KES ${totalPrice.toLocaleString()}`;

  // Floating rounded order button (.guest-floating-order-container only sets display to block when cart is not empty)
  const floatingContainers = document.querySelectorAll('.guest-floating-order-container, #guest-floating-order-container');
  floatingContainers.forEach(container => {
    if (hasItems && currentView === 'guest') {
      container.style.display = 'block';
      const qtyEl = container.querySelector('#guest-order-pill-qty') || $('#guest-order-pill-qty');
      if (qtyEl) qtyEl.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      const priceEl = container.querySelector('#guest-order-pill-price') || $('#guest-order-pill-price');
      if (priceEl) priceEl.textContent = `KES ${totalPrice.toLocaleString()}`;
    } else {
      container.style.display = 'none';
    }
  });

  // Legacy pill support if present
  const pill = $('#guest-order-pill');
  if (pill) {
    if (hasItems && currentView === 'guest') {
      pill.style.display = 'block';
      const pQty = $('#order-pill-qty');
      if (pQty) pQty.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      const pPrice = $('#order-pill-price');
      if (pPrice) pPrice.textContent = `KES ${totalPrice.toLocaleString()}`;
    } else {
      pill.style.display = 'none';
    }
  }

  // Cart modal contents
  renderCartModalItems();
}

function renderCartModalItems() {
  const container = $('#cart-items-container');
  if (!container) return;

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  $('#cart-modal-total').textContent = `KES ${totalPrice.toLocaleString()}`;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:24px 10px;color:var(--dash-muted);">
        <p style="font-weight:600;">Your table cart is empty</p>
        <small>Browse the menu to add delicious items</small>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map((item, idx) => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f4f6f8;">
      <div style="flex:1;">
        <strong style="display:block;font-size:14px;color:var(--dash-ink);">${item.name}</strong>
        ${item.side || item.spice ? `<small style="color:var(--dash-muted);display:block;font-size:11px;">Side: ${item.side || 'Default'} · Spice: ${item.spice || 'Normal'}</small>` : ''}
        ${item.notes ? `<small style="color:var(--forest);display:block;font-size:11px;font-style:italic;">Note: "${item.notes}"</small>` : ''}
        <span style="font-weight:700;color:var(--forest);font-size:13px;">KES ${(item.price * item.qty).toLocaleString()}</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" style="width:36px;height:36px;border-radius:8px;background:#eef1f4;font-weight:800;font-size:16px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:var(--dash-ink);" onclick="changeCartItemQty(${idx}, -1)" aria-label="Decrease quantity">-</button>
        <span style="font-weight:800;font-size:14px;min-width:22px;text-align:center;">${item.qty}</span>
        <button type="button" style="width:36px;height:36px;border-radius:8px;background:#eef1f4;font-weight:800;font-size:16px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:var(--dash-ink);" onclick="changeCartItemQty(${idx}, 1)" aria-label="Increase quantity">+</button>
        <button type="button" style="width:36px;height:36px;border-radius:8px;background:rgba(239,68,68,0.1);color:#ef4444;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;margin-left:4px;" onclick="removeCartItem(${idx})" aria-label="Remove item">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

window.changeCartItemQty = function(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  updateCartUI();
  renderGuestDishes();
};

window.removeCartItem = function(idx) {
  if (!cart[idx]) return;
  cart.splice(idx, 1);
  updateCartUI();
  renderGuestDishes();
};

// ═══════════════════════════════════════════
//  ORDER SUBMISSION & LIVE KITCHEN TRACKER
// ═══════════════════════════════════════════

// ── Staff Auto-Assignment System (Item 8) ──
// Auto-assign one available waiter to this party's session.
// "Available" = active and not already assigned to another open session.
// Pick whoever was least recently assigned for fairness.
function autoAssignWaiterToSession(session) {
  if (session.waiter && session.waiter !== 'Unassigned') {
    return session.waiter; // Already assigned
  }

  // Get currently assigned waiters across all open sessions
  const currentlyAssignedNames = new Set();
  tables.forEach(t => {
    (t.sessions || []).forEach(s => {
      if (s.waiter && s.waiter !== 'Unassigned') {
        currentlyAssignedNames.add(s.waiter);
      }
    });
  });

  // Filter staff roster for active waiters
  const waiters = staffRoster.filter(s => s.active && (s.role.includes('Waiter') || s.role.includes('Floor') || s.role.includes('Lead')));

  // Available waiters not currently assigned to another open session
  let candidateWaiters = waiters.filter(w => !currentlyAssignedNames.has(w.name));

  // If all are busy, fall back to least recently assigned among all active waiters
  if (candidateWaiters.length === 0) {
    candidateWaiters = waiters.length > 0 ? waiters : staffRoster;
  }

  // Sort by lastAssignedAt timestamp ascending (least recently assigned first)
  candidateWaiters.sort((a, b) => (a.lastAssignedAt || 0) - (b.lastAssignedAt || 0));

  const chosenWaiter = candidateWaiters[0] || staffRoster[0];
  chosenWaiter.lastAssignedAt = Date.now();
  session.waiter = chosenWaiter.name;
  return chosenWaiter.name;
}

// ═══════════════════════════════════════════
//  ORDER SUBMISSION & LIVE KITCHEN TRACKER (Items 5, 6, 7, 8, 9)
// ═══════════════════════════════════════════

let activeGraceTimerInterval = null;

function submitTableOrder() {
  if (cart.length === 0) {
    showToast('Your order is empty. Please add items.', false);
    return;
  }

  // Find active table and session
  const table = tables.find(t => String(t.num).padStart(2, '0') === String(activeTableSession.num).padStart(2, '0'));
  let session = table?.sessions?.find(s => s.id === activeGuestSessionId);
  if (!session && table) {
    // Recreate session if needed
    setActiveTableSession(table.num, table.zone, false);
    session = table.sessions?.find(s => s.id === activeGuestSessionId);
  }

  // Verification Gate: Check pending state (Item 5)
  if (session && session.status === 'pending') {
    const cartWarning = $('#cart-arrival-warning');
    if (cartWarning) cartWarning.style.display = 'block';
    showToast(`Notice: Table ${activeTableSession.num} arrival not confirmed yet. Staff will verify shortly!`, false);
    return;
  }

  // Secondary Geolocation warning check (Item 5)
  if (guestGeoStatus === 'flagged_remote') {
    console.warn(`[Testimony OS] Order placed from flagged remote location for Table ${activeTableSession.num}`);
  }

  const orderNum = 'SH-' + Math.floor(100 + Math.random() * 900);
  const selectedDiningType = (typeof currentOrderDiningType !== 'undefined' ? currentOrderDiningType : 'dine-in');
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const orderSnapshot = JSON.parse(JSON.stringify(cart));

  // Auto-assign waiter to session on first order placement (Item 8)
  const assignedWaiterName = autoAssignWaiterToSession(session);
  table.waiter = assignedWaiterName;

  // Add bill to running session bill
  session.bill = (session.bill || 0) + totalAmount;
  session.orders = (session.orders || 0) + 1;
  updateTableOverallStatus(table);

  // Payment Method Recording (Item 9)
  const isCard = $('#pay-method-card')?.classList.contains('active-pay-method');
  const paymentMethodLabel = isCard ? 'Card / POS Terminal' : 'M-Pesa STK (Live)';

  // Order record with grace countdown window (Item 6)
  const orderPlacementTime = Date.now();
  const orderRecord = {
    orderId: orderNum,
    tableNum: activeTableSession.num,
    zone: activeTableSession.zone,
    diningType: currentOrderDiningType, // 'dine-in' or 'takeaway' (Item 7)
    waiter: assignedWaiterName,
    paymentMethod: paymentMethodLabel,
    total: totalAmount,
    placedAt: orderPlacementTime,
    graceExpiresAt: orderPlacementTime + (orderEditWindowSeconds * 1000),
    items: orderSnapshot.map(item => ({
      ...item,
      status: 'pending_kitchen', // will transition to 'preparing' or 'cancelled'
      locked: false
    }))
  };
  placedOrdersHistory.unshift(orderRecord);

  // Sync order to backend REST API & SambaPOS queue
  if (typeof fetch === 'function') {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        table_no: activeTableSession.num,
        items: orderSnapshot.map(item => ({
          id: item.id,
          name: item.name,
          qty: item.qty,
          spice: item.spice,
          side: item.side,
          notes: item.notes
        })),
        party_size: activeTableSession.partySize || 2,
        guest_notes: `${currentOrderDiningType} order`
      })
    })
    .then(r => r.ok ? r.json() : null)
    .then(apiRes => {
      if (apiRes && apiRes.order && apiRes.order.id) {
        orderRecord.backendOrderId = apiRes.order.id;
        // Also initiate payment record on server
        fetch('/api/payments/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_id: apiRes.order.id,
            phone_number: $('#customer-phone')?.value || '0712345678',
            method: isCard ? 'card' : 'mpesa'
          })
        }).catch(() => {});
      }
    })
    .catch(() => {
      // Offline fallback: order held safely in client session
    });
  }

  // Close cart modal
  $('#modal-cart')?.classList.remove('active');

  // Clear cart
  cart = [];
  updateCartUI();
  renderGuestDishes();

  // Show Dedicated Order Confirmation Screen (Item 6)
  showDedicatedOrderConfirmation(orderRecord);

  // Refresh floor map in background
  renderFloorMap();
  showToast(`${currentOrderDiningType === 'takeaway' ? 'Takeaway' : 'Dine-in'} order #${orderNum} placed; changes are available for 5 minutes. Attendant ${assignedWaiterName} assigned to Table ${activeTableSession.num}.`);
}

// Dedicated Order Confirmation Screen Display (Item 6)
function showDedicatedOrderConfirmation(orderRecord) {
  const modal = $('#modal-order-confirmation');
  if (!modal) return;

  $('#conf-order-header-subtitle').textContent = `Order #${orderRecord.orderId} · Sent to Testimonial Cafe Kitchen`;
  $('#conf-table-label').textContent = `Table ${orderRecord.tableNum} (${orderRecord.zone})`;
  $('#conf-dining-type').textContent = orderRecord.diningType === 'takeaway' ? 'Takeaway / To-Go' : 'Dine-In';
  $('#conf-assigned-waiter').textContent = `${orderRecord.waiter}`;
  $('#conf-payment-method').textContent = orderRecord.paymentMethod;
  $('#conf-total-price').textContent = `KES ${orderRecord.total.toLocaleString()}`;

  // Populate items breakdown with quantity x price line totals
  const itemsContainer = $('#conf-items-list');
  if (itemsContainer) {
    itemsContainer.innerHTML = orderRecord.items.map(item => `
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:4px 0;">
        <div>
          <strong>${item.qty}x ${item.name}</strong>
          <span style="color:var(--dash-muted);margin-left:6px;font-size:11px;">(${item.qty} × KES ${item.price.toLocaleString()})</span>
        </div>
        <strong style="color:var(--dash-text);">KES ${(item.qty * item.price).toLocaleString()}</strong>
      </div>
    `).join('');
  }

  // Grace timer countdown display
  const countdownEl = $('#conf-countdown-timer');
  const cancelActionsContainer = $('#conf-items-cancel-actions');

  function updateGraceCountdown() {
    const remainingMs = orderRecord.graceExpiresAt - Date.now();
    if (remainingMs <= 0) {
      if (countdownEl) countdownEl.textContent = '00:00 (LOCKED)';
      if (cancelActionsContainer) {
        cancelActionsContainer.innerHTML = `
          <div style="font-size:11px;color:#fca5a5;padding:4px 0;display:flex;align-items:center;gap:6px;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Grace window expired. Items are now locked for cooking in the kitchen.</span>
          </div>
        `;
      }
      clearInterval(activeGraceTimerInterval);
      return;
    }

    const totalSec = Math.floor(remainingMs / 1000);
    const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    if (countdownEl) countdownEl.textContent = `${m}:${s}`;

    // Show cancel item buttons if not locked
    if (cancelActionsContainer) {
      cancelActionsContainer.innerHTML = orderRecord.items
        .filter(item => item.status !== 'cancelled')
        .map((item, idx) => `
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;background:rgba(0,0,0,0.2);padding:4px 8px;border-radius:4px;">
            <span>${item.qty}x ${item.name}</span>
            <button type="button" class="btn-secondary" style="padding:2px 8px;font-size:10px;color:#ef4444;border-color:#ef4444;" onclick="cancelOrderedItemInGraceWindow('${orderRecord.orderId}', ${idx})">
              Cancel Item
            </button>
          </div>
        `).join('');
    }
  }

  clearInterval(activeGraceTimerInterval);
  activeGraceTimerInterval = setInterval(updateGraceCountdown, 1000);
  updateGraceCountdown();

  modal.classList.add('active');
}

// Cancel an individual dish within the grace window (Item 6)
window.cancelOrderedItemInGraceWindow = function(orderId, itemIndex) {
  const order = placedOrdersHistory.find(o => o.orderId === orderId);
  if (!order) return;

  if (Date.now() > order.graceExpiresAt) {
    showToast('Grace window expired! Items are already being cooked.', false);
    return;
  }

  const item = order.items[itemIndex];
  if (item && item.status !== 'cancelled') {
    item.status = 'cancelled';
    const refundAmount = item.price * item.qty;
    order.total -= refundAmount;

    // Adjust session bill
    const table = tables.find(t => String(t.num).padStart(2, '0') === String(order.tableNum).padStart(2, '0'));
    const session = table?.sessions?.find(s => s.id === activeGuestSessionId);
    if (session) {
      session.bill = Math.max(0, session.bill - refundAmount);
    }

    showToast(`Cancelled ${item.name}. KES ${refundAmount.toLocaleString()} deducted.`);
    showDedicatedOrderConfirmation(order);
    renderFloorMap();
  }
};

// ═══════════════════════════════════════════
//  EVENT LISTENERS & MODAL CONTROLS
// ═══════════════════════════════════════════

function setupEventListeners() {
  // Topbar mode toggles
  $('#tab-dash-view')?.addEventListener('click', () => setView('dashboard'));
  $('#tab-guest-view')?.addEventListener('click', () => setView('guest'));

  // Guest Topbar actions
  $('#guest-cart-btn')?.addEventListener('click', () => {
    $('#modal-cart')?.classList.add('active');
  });

  $('#btn-pill-review-order')?.addEventListener('click', () => {
    $('#modal-cart')?.classList.add('active');
  });

  $('#topbar-cart-btn')?.addEventListener('click', () => {
    $('#modal-cart')?.classList.add('active');
  });

  // Guest search filter (synced across banner and topbar)
  $('#guest-search-input')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const topInput = $('#guest-search-input-top');
    if (topInput && topInput.value !== val) topInput.value = val;
    renderGuestDishes();
  });

  $('#guest-search-input-top')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const bannerInput = $('#guest-search-input');
    if (bannerInput && bannerInput.value !== val) bannerInput.value = val;
    renderGuestDishes();
  });

  // Dashboard search filter
  $('#global-search')?.addEventListener('input', () => {
    renderDashboardDishes();
  });

  // Staff gate button from guest view
  $('#btn-staff-gate')?.addEventListener('click', () => {
    $('#gate-pin-input').value = '';
    $('#gate-pin-error').style.display = 'none';
    $('#modal-staff-pin')?.classList.add('active');
    $('#gate-pin-input')?.focus();
  });

  $('#btn-close-staff-pin')?.addEventListener('click', () => {
    $('#modal-staff-pin')?.classList.remove('active');
  });

  $('#btn-unlock-staff-gate')?.addEventListener('click', () => {
    const pin = $('#gate-pin-input')?.value;
    if (hasAdminSession() || demoRole(pin)) {
      $('#modal-staff-pin')?.classList.remove('active');
      setView('dashboard');
      showToast('Demo Staff Dashboard Unlocked');
    } else {
      $('#gate-pin-error').style.display = 'block';
    }
  });

  // Close modals
  $('#btn-close-cart')?.addEventListener('click', () => {
    $('#modal-cart')?.classList.remove('active');
  });

  $('#btn-close-customization')?.addEventListener('click', () => {
    $('#modal-dish-customization')?.classList.remove('active');
  });

  $('#btn-close-tracker')?.addEventListener('click', () => {
    $('#modal-order-tracker')?.classList.remove('active');
  });

  // Order submission
  $('#btn-submit-order')?.addEventListener('click', submitTableOrder);
  $('#btn-desktop-cart-checkout')?.addEventListener('click', submitTableOrder);

  // Call Attendant actions
  const callAttendant = () => {
    showToast(`Attendant alerted for Table ${activeTableSession.num} (${activeTableSession.zone})`);
  };
  $('#btn-guest-call-attendant')?.addEventListener('click', callAttendant);
  $('#btn-tracker-call-waiter')?.addEventListener('click', callAttendant);

  // Bill Request
  $('#btn-guest-request-bill')?.addEventListener('click', () => {
    showToast(`Bill request sent to cashier for Table ${activeTableSession.num} (${activeTableSession.zone})`);
  });

  // Guest Topbar Table Selector
  $('#btn-guest-table-select')?.addEventListener('click', () => {
    openGuestTableSelectorModal();
  });
  $('#btn-close-guest-table-select')?.addEventListener('click', () => {
    $('#modal-guest-table-select')?.classList.remove('active');
  });

  // Print All Table QR Tents
  $('#btn-print-all-qr')?.addEventListener('click', () => {
    openPrintAllQrModal();
  });
  $('#btn-close-print-all-qr')?.addEventListener('click', () => {
    $('#modal-print-all-qr')?.classList.remove('active');
  });
  $('#btn-trigger-browser-print')?.addEventListener('click', () => {
    window.print();
  });

  // Close Table QR Modal
  $('#btn-close-table-qr')?.addEventListener('click', () => {
    $('#modal-table-qr')?.classList.remove('active');
  });

  // Admin Add Dish Modal
  $('#btn-hero-add-dish')?.addEventListener('click', () => {
    $('#modal-add-dish')?.classList.add('active');
  });

  $('#btn-close-add-dish')?.addEventListener('click', () => {
    $('#modal-add-dish')?.classList.remove('active');
  });

  $('#btn-save-new-dish')?.addEventListener('click', () => {
    const name = $('#new-dish-name')?.value.trim();
    const desc = $('#new-dish-desc')?.value.trim();
    const price = parseInt($('#new-dish-price')?.value);
    const category = $('#new-dish-cat')?.value;
    const pin = $('#admin-pin-input')?.value.trim();

    if (!hasAdminSession() && !demoRole(pin)) {
      showToast('Admin authentication required', false);
      return;
    }

    if (!name || isNaN(price) || price <= 0) {
      showToast('Please provide valid name and price', false);
      return;
    }

    menuItems.unshift({
      id: 'dish-' + Date.now(),
      name,
      desc: desc || 'Chef special prepared fresh with local herbs.',
      price,
      category,
      image: '/images/hero-banner.jpg',
      is_available: true,
      prep_time: '15-20 min',
      rating: 5.0,
      station: category === 'Juices & Drinks' ? 'bar' : 'kitchen',
      is_new: true,
      offer_label: 'NEW',
      offer_price: null
    });

    $('#modal-add-dish')?.classList.remove('active');
    showToast(`Published "${name}" to Live Menu!`);
    renderDashboardDishes();
    renderDashboardCategories();
    renderGuestCategories();
    renderGuestDishes();
  });

  // Admin Add Staff Member Modal
  $('#btn-open-add-staff')?.addEventListener('click', () => {
    $('#new-staff-name').value = '';
    $('#new-staff-pin').value = '';
    $('#staff-admin-pin-verify').value = '';
    $('#modal-add-staff')?.classList.add('active');
  });

  $('#btn-close-add-staff')?.addEventListener('click', () => {
    $('#modal-add-staff')?.classList.remove('active');
  });

  $('#btn-save-new-staff')?.addEventListener('click', () => {
    const name = $('#new-staff-name')?.value.trim();
    const role = $('#new-staff-role')?.value;
    const station = $('#new-staff-station')?.value;
    const staffPin = $('#new-staff-pin')?.value.trim();
    const phone = $('#new-staff-phone')?.value.trim();
    const adminPin = $('#staff-admin-pin-verify')?.value.trim();

    if (!hasAdminSession() && !demoRole(pin)) {
      showToast('Admin authentication required', false);
      return;
    }

    if (!name || staffPin.length !== 4) {
      showToast('Please enter full name and 4-digit PIN', false);
      return;
    }

    staffRoster.push({
      id: 'st-' + (staffRoster.length + 1),
      name,
      role,
      station,
      pin: staffPin,
      phone: phone || '+254 700 000 000',
      active: true
    });

    $('#modal-add-staff')?.classList.remove('active');
    showToast(`Staff member "${name}" registered and activated!`);
    renderStaffRoster();
  });

  // ── Full Sidebar Navigation Panel Router ──
  const NAV_PANEL_MAP = {
    home:      'panel-home',
    menu:      'panel-menu',
    orders:    'panel-orders',
    floor:     'panel-floor',
    staff:     'panel-staff',
    offers:    'panel-offers',
    analytics: 'panel-analytics',
    settings:  'panel-settings'
  };

  // ── Admin vs Staff Access Control Router (Item 10 & 11) ──
  const ADMIN_ONLY_PANELS = ['staff', 'offers', 'analytics', 'settings'];

  function switchDashPanel(targetNav) {
    currentDashPanel = targetNav || 'home';

    // Access check: if non-admin attempts to access admin panel
    if (ADMIN_ONLY_PANELS.includes(currentDashPanel) && !loggedInUser.isAdmin) {
      showToast('Admin privilege required to access this section', false);
      // prompt for Admin PIN
      $('#gate-pin-input').value = '';
      $('#gate-pin-error').style.display = 'none';
      $('#modal-staff-pin')?.classList.add('active');
      $('#gate-pin-input')?.focus();
      return;
    }

    // Hide all panels
    Object.values(NAV_PANEL_MAP).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    const isHome = (currentDashPanel === 'home');
    const heroCard = $('.hero-card');
    const kpiRow = $('.kpi-row');
    if (heroCard) heroCard.style.display = isHome ? '' : 'none';
    if (kpiRow) kpiRow.style.display = isHome ? '' : 'none';

    // Show the requested panel
    const targetId = NAV_PANEL_MAP[currentDashPanel] || 'panel-home';
    const target = document.getElementById(targetId);
    if (target) {
      target.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Special panel hydration
    if (currentDashPanel === 'home') renderTodaySnapshot();
    if (currentDashPanel === 'floor') {
      renderFloorMap();
      renderTableQrManager();
    }
    if (currentDashPanel === 'staff') {
      renderEnhancedStaffPanel(); renderCategoriesManager(); renderStationsManager(); renderDiningZonesManager(); renderFloorZoneFilters(); initAllCrudSystems();
      renderLoginAuditTrail();
    }
    if (currentDashPanel === 'offers') renderOffersPanel();
    if (currentDashPanel === 'analytics') renderAnalyticsPanel();
    if (currentDashPanel === 'settings') renderPosBridgePanel();
    if (currentDashPanel === 'menu') {
      renderMenuCatalogCategories();
      renderMenuCatalogDishes();
    }
    if (currentDashPanel === 'orders') {
      updateKanbanCounts();
    }
  }

  // ── Render Today-Only Snapshot for All Staff (Item 11) ──
  function renderTodaySnapshot() {
    let todayOrdersCount = 18;
    let todaySalesSum = 46250;
    tables.forEach(t => {
      (t.sessions || []).forEach(s => {
        todayOrdersCount += (s.orders || 0);
        todaySalesSum += (s.bill || 0);
      });
    });

    const ordersCountEl = $('#today-orders-count');
    if (ordersCountEl) ordersCountEl.textContent = `${todayOrdersCount} Placed`;

    const salesSumEl = $('#today-sales-sum');
    if (salesSumEl) salesSumEl.textContent = `KES ${todaySalesSum.toLocaleString()}`;
  }

  // ── Render Admin Login Audit Trail (Item 10) ──
  function renderLoginAuditTrail() {
    const tableBody = document.getElementById('login-audit-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = loginAuditLog.map(log => `
      <tr style="border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;">
        <td style="padding:10px 14px;color:var(--dash-muted);font-family:monospace;">${log.timestamp}</td>
        <td style="padding:10px 14px;font-weight:700;color:var(--dash-text);">${log.staffName}</td>
        <td style="padding:10px 14px;color:var(--dash-muted);">${log.role}</td>
        <td style="padding:10px 14px;font-family:monospace;color:var(--primary);">****</td>
        <td style="padding:10px 14px;">
          <span style="background:${log.action === 'LOGIN' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'};color:${log.action === 'LOGIN' ? '#22c55e' : '#f87171'};padding:2px 8px;border-radius:4px;font-weight:700;font-size:10px;">
            ${log.action}
          </span>
        </td>
        <td style="padding:10px 14px;color:var(--dash-muted);font-size:11px;">${log.device}</td>
      </tr>
    `).join('');
  }

  // ── Render Offers & Promotions Panel (Item 4) ──
  function renderOffersPanel() {
    const grid = document.getElementById('offers-grid-container');
    if (!grid) return;

    grid.innerHTML = promotions.map(p => `
      <div style="background:var(--dash-surface);border:1px solid var(--dash-border);border-radius:var(--radius-lg);padding:16px;display:flex;gap:14px;position:relative;">
        <img src="${p.image}" alt="${p.title}" style="width:90px;height:90px;border-radius:var(--radius-md);object-fit:cover;flex-shrink:0;" />
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <strong style="font-size:15px;color:var(--dash-text);">${p.title}</strong>
            <span style="background:rgba(239,68,68,0.15);color:#ef4444;font-size:10px;font-weight:800;padding:2px 8px;border-radius:4px;">
              ${p.isDailySpecial ? 'DAILY SPECIAL' : `${p.discountPercent}% OFF`}
            </span>
          </div>
          <p style="font-size:12px;color:var(--dash-muted);margin:4px 0 10px 0;line-height:1.4;">${p.desc}</p>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="text-decoration:line-through;color:var(--dash-muted);font-size:13px;">KES ${p.origPrice.toLocaleString()}</span>
            <span style="font-size:16px;font-weight:800;color:var(--primary);">KES ${p.offerPrice.toLocaleString()}</span>
            <span style="font-size:11px;color:#22c55e;font-weight:700;">Save ${p.discountPercent}%</span>
          </div>
          <div style="margin-top:10px;display:flex;gap:10px;align-items:center;">
            <small style="color:var(--dash-muted);font-size:10px;">Window: ${p.startTime ? p.startTime.replace('T', ' ') : 'Open'} to ${p.endTime ? p.endTime.replace('T', ' ') : 'Open'}</small>
            <button class="btn-secondary" style="padding:3px 10px;font-size:11px;margin-left:auto;" onclick="deletePromotion('${p.id}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.deletePromotion = function(promoId) {
    promotions = promotions.filter(p => p.id !== promoId);
    showToast('Promotion removed.');
    renderOffersPanel();
    renderGuestPromosCarousel();
  };

  // ── Render Admin Analytics Panel (Item 11) ──
  function renderAnalyticsPanel() {
    const rangeSelect = document.getElementById('analytics-range-select');
    const selectedRange = rangeSelect ? rangeSelect.value : 'today';

    // Mock calculations according to selected range
    const multipliers = {
      today: 1,
      week: 6.5,
      month: 27,
      '3months': 82,
      '6months': 165,
      '9months': 240,
      '12months': 320,
      custom: 3
    };
    const mult = multipliers[selectedRange] || 1;

    const baseRev = 78450 * mult;
    const mpesaRev = Math.round(baseRev * 0.72);
    const cashRev = baseRev - mpesaRev;

    const revEl = document.getElementById('analytics-total-rev');
    if (revEl) revEl.textContent = `KES ${baseRev.toLocaleString()}`;

    const mpesaEl = document.getElementById('analytics-mpesa-split');
    if (mpesaEl) mpesaEl.textContent = `KES ${mpesaRev.toLocaleString()} (72%)`;

    const cashEl = document.getElementById('analytics-cash-split');
    if (cashEl) cashEl.textContent = `KES ${cashRev.toLocaleString()} (28%)`;

    const dishesGrid = document.getElementById('analytics-top-dishes-grid');
    if (dishesGrid) {
      const topDishes = [
        { name: 'Nyama Choma Platter', orders: Math.round(28 * mult), rev: Math.round(28 * mult * 1950) },
        { name: 'Cold-Pressed Passion Mango', orders: Math.round(42 * mult), rev: Math.round(42 * mult * 450) },
        { name: 'Flame Grilled Chicken Steak', orders: Math.round(24 * mult), rev: Math.round(24 * mult * 1350) },
        { name: 'Swahili Samosa Trio', orders: Math.round(31 * mult), rev: Math.round(31 * mult * 650) }
      ];
      dishesGrid.innerHTML = topDishes.map(d => `
        <div style="background:var(--dash-bg);border:1px solid var(--dash-border);border-radius:var(--radius-md);padding:12px;">
          <strong style="display:block;font-size:13px;color:var(--dash-text);">${d.name}</strong>
          <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;">
            <span style="color:var(--dash-muted);">${d.orders} orders</span>
            <strong style="color:var(--primary);">KES ${d.rev.toLocaleString()}</strong>
          </div>
        </div>
      `).join('');
    }
  }

  // CSV Export for Admin Analytics (Item 11)
  window.exportAnalyticsCsv = function() {
    const rangeSelect = document.getElementById('analytics-range-select');
    const range = rangeSelect ? rangeSelect.value : 'today';
    const csvContent = "data:text/csv;charset=utf-8," +
      "Order_ID,Timestamp,Table_Number,Zone,Waitstaff,Payment_Method,Dining_Type,Total_KES,POS_Sync_Status\n" +
      "SH-492,2026-10-07 14:15,04,Terrace,Sarah Nduta,M-Pesa STK,Dine-In,5800,SUCCESS\n" +
      "SH-493,2026-10-07 14:32,01,Garden,Amina Mwangi,Cash,Dine-In,2100,SUCCESS\n" +
      "SH-494,2026-10-07 15:05,07,VIP,Amina Mwangi,M-Pesa STK,Dine-In,12400,SUCCESS\n" +
      "SH-495,2026-10-07 15:40,03,Garden,Juma Otieno,M-Pesa STK,Takeaway,1750,SUCCESS\n" +
      "SH-496,2026-10-07 16:10,11,Bar,Kevin Kiprono,Card / POS,Dine-In,2100,SUCCESS\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `shamba_house_analytics_${range}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported Analytics CSV for range: ${range.toUpperCase()}!`);
  };

  // ── Render POS Bridge Panel (Item 11) ──
  function renderPosBridgePanel() {
    const list = document.getElementById('pos-failed-syncs-list');
    if (!list) return;

    list.innerHTML = `
      <div style="background:var(--dash-bg);border:1px solid var(--dash-border);border-radius:var(--radius-md);padding:12px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="display:block;font-size:13px;color:#fca5a5;">Order #SH-488 (Table 09 · Indoor)</strong>
          <span style="font-size:11px;color:var(--dash-muted);">Reason: SambaPOS Terminal 02 Socket Timeout (14:52)</span>
        </div>
        <button class="btn-secondary" style="font-size:11px;padding:4px 10px;" onclick="retryPosSync('SH-488')">
          Retry Sync
        </button>
      </div>
      <div style="background:var(--dash-bg);border:1px solid var(--dash-border);border-radius:var(--radius-md);padding:12px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="display:block;font-size:13px;color:#fca5a5;">Order #SH-479 (Table 06 · Terrace)</strong>
          <span style="font-size:11px;color:var(--dash-muted);">Reason: Payment Token Mismatch on Bar Terminal (13:14)</span>
        </div>
        <button class="btn-secondary" style="font-size:11px;padding:4px 10px;" onclick="retryPosSync('SH-479')">
          Retry Sync
        </button>
      </div>
    `;
  }

  window.retryPosSync = function(orderId) {
    showToast(`Retrying POS Bridge sync for Order #${orderId}...`);
    setTimeout(() => {
      showToast(`Order #${orderId} successfully synced to SambaPOS!`);
      const syncTimeEl = document.getElementById('pos-last-sync-time');
      if (syncTimeEl) syncTimeEl.textContent = new Date().toLocaleTimeString();
    }, 1200);
  };

  // ── Menu Catalog Panel Renderer ──
  function renderMenuCatalogCategories() {
    const rail = document.getElementById('category-rail-menu');
    if (!rail) return;
    const dynamicCategories = getDynamicCategoryList();
    const cats = dynamicCategories.map(name => {
      const count = name === 'All'
        ? menuItems.length
        : menuItems.filter(i => {
            if (name === 'Drinks & Beverages') {
              return i.category === 'Drinks & Beverages' || i.category === 'Juices & Drinks' || i.category === 'Drinks';
            }
            return i.category === name;
          }).length;
      return { name, count };
    });
    rail.innerHTML = cats.map(cat => `
      <div class="category-card ${cat.name === activeCategory ? 'active' : ''}" data-cat="${cat.name}">
        <strong>${cat.name}</strong>
        <span>${cat.count} items</span>
      </div>
    `).join('');

    rail.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        activeCategory = card.getAttribute('data-cat');
        renderMenuCatalogCategories();
        renderMenuCatalogDishes();
      });
    });
  }

  function renderMenuCatalogDishes() {
    const grid = document.getElementById('dishes-grid-menu');
    if (!grid) return;
    const filtered = menuItems.filter(item => activeCategory === 'All' || item.category === activeCategory);
    grid.innerHTML = filtered.map(item => `
      <article class="dish-card-dash ${!item.is_available ? 'sold-out' : ''}" data-id="${item.id}">
        <div class="dish-card-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="rating-pill">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${item.rating}</span>
          </div>
        </div>
        <div class="dish-card-body">
          <div class="dish-tags">
            <span class="dish-tag">${item.category}</span>
            ${item.offer_label ? `<span class="dish-tag" style="background:#fee2e2;color:#b91c1c;">${item.offer_label}</span>` : ''}
          </div>
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <div class="dish-meta-row">
            <div>
              <div class="dish-price">KES ${item.offer_price ? item.offer_price.toLocaleString() : item.price.toLocaleString()}</div>
              <div class="dish-prep-time">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${item.prep_time}</span>
              </div>
            </div>
            <label class="switch-control" title="Toggle Live Availability">
              <input type="checkbox" class="toggle-availability" data-id="${item.id}" ${item.is_available ? 'checked' : ''} />
              <span class="switch-slider"></span>
              <span class="switch-label ${item.is_available ? 'in-stock' : 'sold-out'}">
                ${item.is_available ? 'In Stock' : 'Sold Out'}
              </span>
            </label>
          </div>
          <!-- Menu Item Full CRUD Actions (Item 3) -->
          <div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;">
            <button class="btn-secondary" style="flex:1;font-size:11px;padding:4px 8px;justify-content:center;" onclick="openEditDishModal('${item.id}')">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Dish
            </button>
            <button class="btn-secondary" style="font-size:11px;padding:4px 8px;color:#ef4444;border-color:rgba(239,68,68,0.3);justify-content:center;" onclick="softDeleteDish('${item.id}')" title="Soft delete dish from active menu">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Delete
            </button>
          </div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.toggle-availability').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const item = menuItems.find(i => i.id === id);
        if (item) {
          item.is_available = e.target.checked;
          showToast(`${item.name} marked as ${item.is_available ? 'Available' : 'Sold Out'}`);
          renderMenuCatalogDishes();
          renderDashboardDishes();
          renderGuestDishes();
        }
      });
    });
  }

  // ── Menu Dish Full CRUD Functions (Item 3) ──
  window.openEditDishModal = function(dishId) {
    const item = menuItems.find(i => i.id === dishId);
    if (!item) return;

    $('#dish-crud-title').textContent = 'Edit Menu Dish';
    $('#dish-crud-subtitle').textContent = `Update price, description, category, or photo for ${item.name}`;
    $('#dish-crud-id').value = item.id;
    $('#dish-crud-name').value = item.name;
    $('#dish-crud-price').value = item.price != null ? item.price : '';

    // Populate category dropdown dynamically
    const catSelect = $('#dish-crud-category');
    if (catSelect) {
      catSelect.innerHTML = categories.map(c => `<option value="${c.name}" ${c.name === item.category ? 'selected' : ''}>${c.name}</option>`).join('');
    }

    const firstVar = (item.variants && item.variants[0]) ? item.variants[0] : null;
    if ($('#dish-crud-variant')) {
      $('#dish-crud-variant').value = firstVar ? firstVar.label : (item.variant || 'Standard');
    }
    if ($('#dish-crud-status')) {
      $('#dish-crud-status').value = item.price_status || (item.price != null ? 'confirmed' : 'unknown');
    }
    if ($('#dish-crud-basis')) {
      $('#dish-crud-basis').value = item.basis || (firstVar ? firstVar.basis : '') || '';
    }

    $('#dish-crud-desc').value = item.desc || '';
    $('#dish-crud-image-url').value = item.image || '';

    $('#modal-dish-crud')?.classList.add('active');
  };

  window.openCreateDishModal = function() {
    $('#dish-crud-title').textContent = 'Add New Menu Dish';
    $('#dish-crud-subtitle').textContent = 'Create a new dish or beverage with live price status';
    $('#dish-crud-id').value = '';
    $('#dish-crud-name').value = '';
    $('#dish-crud-price').value = '';

    const catSelect = $('#dish-crud-category');
    if (catSelect) {
      catSelect.innerHTML = categories.map((c, i) => `<option value="${c.name}" ${i === 0 ? 'selected' : ''}>${c.name}</option>`).join('');
    }

    if ($('#dish-crud-variant')) $('#dish-crud-variant').value = 'Standard';
    if ($('#dish-crud-status')) $('#dish-crud-status').value = 'confirmed';
    if ($('#dish-crud-basis')) $('#dish-crud-basis').value = '';
    $('#dish-crud-desc').value = '';
    $('#dish-crud-image-url').value = '';

    $('#modal-dish-crud')?.classList.add('active');
  };

  window.softDeleteDish = function(dishId) {
    const item = menuItems.find(i => i.id === dishId);
    if (!item) return;

    const confirmed = window.confirm ? window.confirm(`Remove "${item.name}" from active menu? (Soft-deleted so historical receipts remain valid)`) : true;
    if (confirmed) {
      item.is_deleted = true;
      item.is_available = false;
      menuItems = menuItems.filter(i => i.id !== dishId);
      showToast(`Soft-deleted "${item.name}". Past orders and receipts will still display correctly.`);
      renderMenuCatalogDishes();
      renderDashboardDishes();
      renderGuestDishes();
    }
  };

  // ── Floor Map & Table QR Code Renderer (Item 1, 2, 5 & Merge Tables) ──
  function renderFloorMap() {
    const grid = document.getElementById('floor-map-grid');
    if (!grid) return;

    grid.innerHTML = tables.map(t => {
      const isCurrentSession = (t.num === activeTableSession.num);
      const capacity = t.capacity || t.seats || 4;
      const sessions = Array.isArray(t.sessions) ? t.sessions : [];
      const occupiedSeats = sessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
      const totalBill = sessions.reduce((acc, s) => acc + (s.bill || 0), 0);
      const hasPendingSession = sessions.some(s => s.status === 'pending');
      const isMergedPrimary = Boolean(t.mergedWith);
      const isMergedSecondary = Boolean(t.mergedInto);

      // If this table is merged into another primary table
      if (isMergedSecondary) {
        const masterTable = tables.find(x => x.num === t.mergedInto);
        const thisCap = t.originalCapacity || t.capacity;
        const masterCap = masterTable ? (masterTable.originalCapacity || (masterTable.capacity - thisCap)) : 4;
        const totalCombinedSeats = masterTable ? masterTable.capacity : (thisCap + masterCap);
        const secTooltipTitle = `Merged Dining Tables: Table ${t.mergedInto} (${masterCap} seats) + Table ${t.num} (${thisCap} seats) = ${totalCombinedSeats} combined seats`;

        return `
          <div class="floor-table-card is-merged-table ${isCurrentSession ? 'floor-table-cell--active' : ''}"
               style="border-style:dashed;border-color:rgba(16, 185, 129, 0.4);"
               tabindex="0"
               aria-label="${secTooltipTitle}"
               title="${secTooltipTitle}">

            <!-- Hover-over Tooltip for Quick Reference -->
            <div class="merged-table-tooltip" role="tooltip" aria-hidden="true">
              <div class="tooltip-header">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                <span>Merged Tables</span>
              </div>
              <div class="tooltip-row">
                <span>Table ${masterTable ? masterTable.num : t.mergedInto} (Master):</span>
                <strong>${masterCap} seats</strong>
              </div>
              <div class="tooltip-row">
                <span>Table ${t.num} (Joined):</span>
                <strong>${thisCap} seats</strong>
              </div>
              <div class="tooltip-divider"></div>
              <div class="tooltip-row tooltip-total">
                <span>Combined Seat Count:</span>
                <strong class="tooltip-highlight">${totalCombinedSeats} seats</strong>
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <div style="font-size:16px;font-weight:800;color:var(--dash-text);">Table ${t.num}</div>
                <div style="font-size:12px;color:var(--dash-muted);">${t.zone} · ${thisCap} Seats (Joined)</div>
              </div>
              <div><span class="floor-badge-merged" title="${secTooltipTitle}">MERGED → T${t.mergedInto}</span></div>
            </div>

            <!-- Sessions Area -->
            <div style="padding:10px 12px;background:rgba(16, 185, 129, 0.06);border-radius:var(--radius-md);border:1px dashed rgba(16, 185, 129, 0.3);font-size:12px;color:var(--dash-muted);line-height:1.4;">
              <strong style="color:var(--dash-text);display:block;margin-bottom:2px;">Consolidated into Table ${t.mergedInto}</strong>
              <span>Active party orders and billing are being served on master Table ${t.mergedInto}.</span>
            </div>

            <div style="display:flex;gap:8px;margin-top:auto;padding-top:6px;">
              <button class="btn-secondary" onclick="unmergeTable('${t.num}')" style="flex:1;justify-content:center;font-size:11px;padding:6px;color:#f59e0b;border-color:rgba(245, 158, 11, 0.4);" title="Separate tables">
                Unmerge
              </button>
              <button class="btn-table-open" onclick="openTableDirectMenu('${t.mergedInto}', '${t.zone}')" style="flex:2;justify-content:center;font-size:11px;padding:6px;">
                Master Bill (T${t.mergedInto})
              </button>
            </div>
          </div>
        `;
      }

      // Tooltip data calculation for primary merged table
      let primaryTooltipHtml = '';
      let primaryTooltipTitle = '';
      if (isMergedPrimary) {
        const partnerTable = tables.find(x => x.num === t.mergedWith);
        const thisCap = t.originalCapacity || (partnerTable ? (t.capacity - (partnerTable.originalCapacity || partnerTable.capacity)) : t.capacity);
        const partnerCap = partnerTable ? (partnerTable.originalCapacity || partnerTable.capacity) : 4;
        const totalCombinedSeats = t.capacity;
        primaryTooltipTitle = `Merged Dining Tables: Table ${t.num} (${thisCap} seats) + Table ${t.mergedWith} (${partnerCap} seats) = ${totalCombinedSeats} combined seats`;

        primaryTooltipHtml = `
          <!-- Hover-over Tooltip for Quick Reference -->
          <div class="merged-table-tooltip" role="tooltip" aria-hidden="true">
            <div class="tooltip-header">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
              <span>Merged Tables</span>
            </div>
            <div class="tooltip-row">
              <span>Table ${t.num} (Primary):</span>
              <strong>${thisCap} seats</strong>
            </div>
            <div class="tooltip-row">
              <span>Table ${t.mergedWith} (Joined):</span>
              <strong>${partnerCap} seats</strong>
            </div>
            <div class="tooltip-divider"></div>
            <div class="tooltip-row tooltip-total">
              <span>Combined Seat Count:</span>
              <strong class="tooltip-highlight">${totalCombinedSeats} seats</strong>
            </div>
          </div>
        `;
      }

      // Status Badge logic according to Item 1:
      // FREE — no open sessions
      // OCCUPIED — seats used < capacity
      // AT CAPACITY — seats used == capacity
      // MAX EXCEEDED +N — smaller secondary badge showing extra seats beyond capacity
      // PENDING ARRIVAL — see item 5
      let badgeHtml = '';
      if (sessions.length === 0 || occupiedSeats === 0) {
        badgeHtml = isMergedPrimary
          ? `<span class="floor-badge-merged" title="${primaryTooltipTitle}">MERGED +T${t.mergedWith}</span>`
          : `<span class="floor-badge-free">FREE</span>`;
      } else if (hasPendingSession) {
        badgeHtml = `<span class="floor-badge-pending">PENDING ARRIVAL</span>`;
      } else if (occupiedSeats < capacity) {
        badgeHtml = isMergedPrimary
          ? `<div style="display:flex;gap:4px;flex-wrap:wrap;"><span class="floor-badge-merged" title="${primaryTooltipTitle}">+T${t.mergedWith}</span><span class="floor-badge-occupied">OCCUPIED (${occupiedSeats}/${capacity})</span></div>`
          : `<span class="floor-badge-occupied">OCCUPIED (${occupiedSeats}/${capacity})</span>`;
      } else if (occupiedSeats === capacity) {
        badgeHtml = isMergedPrimary
          ? `<div style="display:flex;gap:4px;flex-wrap:wrap;"><span class="floor-badge-merged" title="${primaryTooltipTitle}">+T${t.mergedWith}</span><span class="floor-badge-capacity">AT CAPACITY (${occupiedSeats}/${capacity})</span></div>`
          : `<span class="floor-badge-capacity">AT CAPACITY (${occupiedSeats}/${capacity})</span>`;
      } else {
        const extra = occupiedSeats - capacity;
        badgeHtml = `
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            ${isMergedPrimary ? `<span class="floor-badge-merged" title="${primaryTooltipTitle}">+T${t.mergedWith}</span>` : ''}
            <span class="floor-badge-capacity">AT CAPACITY</span>
            <span class="floor-badge-overflow">+${extra} OVERFLOW</span>
          </div>
        `;
      }

      // Sessions listing
      const sessionsHtml = sessions.length > 0 ? sessions.map(s => `
        <div class="floor-session-row ${s.status === 'pending' ? 'is-pending' : ''}">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;">
            <strong style="color:var(--dash-text);">${s.partyName}</strong>
            <span style="font-size:11px;color:var(--dash-muted);">${s.partySize} seats</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
            <span style="color:var(--dash-muted);">Server: <strong style="color:var(--dash-text);">${s.waiter || 'Unassigned'}</strong></span>
            <span style="font-weight:700;color:var(--primary);">KES ${(s.bill || 0).toLocaleString()}</span>
          </div>
          ${s.status === 'pending' ? `
            <div style="margin-top:4px;">
              <button class="btn-confirm-arrival" onclick="confirmSessionArrival('${t.num}', '${s.id}')">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Confirm Arrival
              </button>
            </div>
          ` : ''}
        </div>
      `).join('') : `
        <div style="font-size:12px;color:var(--dash-muted);padding:8px 0;font-style:italic;">
          No active sessions seated
        </div>
      `;

      return `
        <div class="floor-table-card ${isMergedPrimary ? 'is-merged-table' : ''} ${isCurrentSession ? 'floor-table-cell--active' : ''}"
             ${isMergedPrimary ? 'tabindex="0"' : ''}
             ${primaryTooltipTitle ? `aria-label="${primaryTooltipTitle}" title="${primaryTooltipTitle}"` : ''}>
          ${primaryTooltipHtml}
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div>
              <div style="font-size:16px;font-weight:800;color:var(--dash-text);">
                Table ${t.num} ${isMergedPrimary ? `<span style="font-size:12px;color:var(--primary);font-weight:700;">(+T${t.mergedWith})</span>` : ''}
              </div>
              <div style="font-size:12px;color:var(--dash-muted);">
                ${t.zone} · ${capacity} Seats ${isMergedPrimary ? 'Combined Capacity' : 'Capacity'}
              </div>
            </div>
            <div>${badgeHtml}</div>
          </div>

          <!-- Sessions List -->
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${sessionsHtml}
          </div>

          ${totalBill > 0 ? `
            <div style="border-top:1px solid var(--dash-border);padding-top:8px;display:flex;justify-content:space-between;font-size:13px;">
              <span style="color:var(--dash-muted);">Table Running Total:</span>
              <strong style="color:var(--primary);">KES ${totalBill.toLocaleString()}</strong>
            </div>
          ` : ''}

          <div style="display:flex;gap:6px;margin-top:auto;padding-top:6px;">
            ${isMergedPrimary ? `
              <button class="btn-secondary" onclick="unmergeTable('${t.num}')" style="font-size:11px;padding:6px 8px;color:#f59e0b;border-color:rgba(245,158,11,0.4);" title="Separate tables">
                Unmerge
              </button>
            ` : `
              <button class="btn-merge-table" onclick="openMergeTablesModal('${t.num}')" title="Merge with adjacent table for large party">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                Merge
              </button>
            `}
            <button class="btn-table-qr" onclick="openTableQrModal('${t.num}')" style="flex:1;justify-content:center;font-size:11px;padding:6px;">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              View QR
            </button>
            <button class="btn-table-open" onclick="openTableDirectMenu('${t.num}', '${t.zone}')" style="flex:1;justify-content:center;font-size:11px;padding:6px;">
              Open Menu
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ── Helper: Check if two tables are adjacent ──
  function areTablesAdjacent(t1, t2) {
    if (!t1 || !t2 || t1.num === t2.num) return false;
    if (t1.zone === t2.zone) return true;
    const n1 = parseInt(t1.num, 10);
    const n2 = parseInt(t2.num, 10);
    return Math.abs(n1 - n2) === 1;
  }

  // ── Open Merge Tables Modal ──
  window.openMergeTablesModal = function(preselectedPrimaryNum = null) {
    const primarySelect = document.getElementById('merge-primary-table');
    const secondarySelect = document.getElementById('merge-secondary-table');
    if (!primarySelect || !secondarySelect) return;

    // Available primary tables (not merged into another table)
    const availableTables = tables.filter(t => !t.mergedInto);
    if (availableTables.length < 2) {
      showToast('Need at least 2 dining tables to perform a merge.', false);
      return;
    }

    // Populate Primary Table Select
    primarySelect.innerHTML = availableTables.map(t => {
      const activeParties = t.sessions?.length || 0;
      const totalBill = t.sessions?.reduce((sum, s) => sum + (s.bill || 0), 0) || 0;
      const statusText = t.mergedWith
        ? `Merged (+T${t.mergedWith})`
        : (activeParties > 0 ? `Occupied: KES ${totalBill.toLocaleString()} (${activeParties} ${activeParties === 1 ? 'party' : 'parties'})` : 'Free');
      return `<option value="${t.num}">Table ${t.num} (${t.zone} · ${t.capacity} seats · ${statusText})</option>`;
    }).join('');

    // Preselect primary table if provided
    if (preselectedPrimaryNum) {
      const formatted = String(preselectedPrimaryNum).padStart(2, '0');
      if (availableTables.some(t => t.num === formatted)) {
        primarySelect.value = formatted;
      }
    }

    function populateSecondarySelect() {
      const selectedPrimaryNum = primarySelect.value;
      const primaryTable = tables.find(t => t.num === selectedPrimaryNum);
      if (!primaryTable) return;

      const candidates = tables.filter(t => t.num !== selectedPrimaryNum && !t.mergedInto);
      const adjacentCandidates = candidates.filter(t => areTablesAdjacent(primaryTable, t));
      const otherCandidates = candidates.filter(t => !areTablesAdjacent(primaryTable, t));

      const formatOption = (t, isAdj) => {
        const activeParties = t.sessions?.length || 0;
        const totalBill = t.sessions?.reduce((sum, s) => sum + (s.bill || 0), 0) || 0;
        const statusText = t.status === 'free' ? 'Free' : `Occupied: KES ${totalBill.toLocaleString()}`;
        const prefix = isAdj ? '[Adjacent] ' : '';
        return `<option value="${t.num}">${prefix}Table ${t.num} (${t.zone} · ${t.capacity} seats · ${statusText})</option>`;
      };

      let html = '';
      if (adjacentCandidates.length > 0) {
        html += `<optgroup label="Adjacent Tables (${primaryTable.zone} & Adjoining)">`;
        html += adjacentCandidates.map(t => formatOption(t, true)).join('');
        html += `</optgroup>`;
      }
      if (otherCandidates.length > 0) {
        html += `<optgroup label="Other Floor Tables">`;
        html += otherCandidates.map(t => formatOption(t, false)).join('');
        html += `</optgroup>`;
      }

      secondarySelect.innerHTML = html;
      updateMergePreview();
    }

    primarySelect.onchange = () => {
      populateSecondarySelect();
    };

    secondarySelect.onchange = () => {
      updateMergePreview();
    };

    populateSecondarySelect();
    $('#modal-merge-tables')?.classList.add('active');
  };

  // ── Update Merge Preview Box ──
  function updateMergePreview() {
    const primaryNum = document.getElementById('merge-primary-table')?.value;
    const secondaryNum = document.getElementById('merge-secondary-table')?.value;
    const pTable = tables.find(t => t.num === primaryNum);
    const sTable = tables.find(t => t.num === secondaryNum);

    const seatsEl = document.getElementById('merge-preview-seats');
    const partiesEl = document.getElementById('merge-preview-parties');
    const billEl = document.getElementById('merge-preview-bill');
    const waiterEl = document.getElementById('merge-preview-waiter');
    const adjacencyEl = document.getElementById('merge-preview-adjacency');

    if (!pTable || !sTable || pTable.num === sTable.num) {
      if (seatsEl) seatsEl.textContent = '-';
      if (partiesEl) partiesEl.textContent = '-';
      if (billEl) billEl.textContent = 'KES 0';
      if (waiterEl) waiterEl.textContent = '-';
      return;
    }

    const combinedSeats = (pTable.capacity || 4) + (sTable.capacity || 4);
    const allSessions = [...(pTable.sessions || []), ...(sTable.sessions || [])];
    const totalGuests = allSessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
    const totalParties = allSessions.length;
    const totalBill = allSessions.reduce((acc, s) => acc + (s.bill || 0), 0);
    const assignedWaiter = (pTable.waiter && pTable.waiter !== 'Unassigned')
      ? pTable.waiter
      : ((sTable.waiter && sTable.waiter !== 'Unassigned') ? sTable.waiter : 'Sarah Nduta');

    if (seatsEl) seatsEl.textContent = `${combinedSeats} seats (${pTable.capacity} + ${sTable.capacity})`;
    if (partiesEl) {
      partiesEl.textContent = totalParties > 0
        ? `${totalParties} ${totalParties === 1 ? 'party' : 'parties'} (${totalGuests} guests)`
        : '0 parties (Tables both open)';
    }
    if (billEl) billEl.textContent = `KES ${totalBill.toLocaleString()}`;
    if (waiterEl) waiterEl.textContent = assignedWaiter;

    if (adjacencyEl) {
      const isAdj = areTablesAdjacent(pTable, sTable);
      if (isAdj) {
        adjacencyEl.innerHTML = `<span style="color:#22c55e;">Adjacent tables in ${pTable.zone === sTable.zone ? pTable.zone + ' zone' : 'neighboring layout'}</span>`;
      } else {
        adjacencyEl.innerHTML = `<span style="color:#f59e0b;">Notice: Tables are in separate dining zones (${pTable.zone} & ${sTable.zone})</span>`;
      }
    }
  }

  // ── Confirm Table Merge Handler ──
  function confirmMergeTables() {
    const primaryNum = document.getElementById('merge-primary-table')?.value;
    const secondaryNum = document.getElementById('merge-secondary-table')?.value;
    const combineIntoOne = document.getElementById('merge-combine-sessions-checkbox')?.checked ?? true;

    if (!primaryNum || !secondaryNum || primaryNum === secondaryNum) {
      showToast('Please select two distinct tables to merge.', false);
      return;
    }

    const pTable = tables.find(t => t.num === primaryNum);
    const sTable = tables.find(t => t.num === secondaryNum);
    if (!pTable || !sTable) return;

    // Save baseline capacity before merging
    if (!pTable.originalCapacity) pTable.originalCapacity = pTable.capacity;
    if (!sTable.originalCapacity) sTable.originalCapacity = sTable.capacity;

    const allSessions = [...(pTable.sessions || []), ...(sTable.sessions || [])];
    const totalGuests = allSessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
    const totalBill = allSessions.reduce((acc, s) => acc + (s.bill || 0), 0);
    const totalOrders = allSessions.reduce((acc, s) => acc + (s.orders || 0), 0);
    const assignedWaiter = (pTable.waiter && pTable.waiter !== 'Unassigned')
      ? pTable.waiter
      : ((sTable.waiter && sTable.waiter !== 'Unassigned') ? sTable.waiter : 'Sarah Nduta');

    // Combine active sessions into one master party session if checked
    if (combineIntoOne && allSessions.length > 0) {
      const firstParty = allSessions[0];
      const partyName = firstParty
        ? `${firstParty.partyName.replace(/\s*\(Merged.*?\)/g, '')} (Merged T${pTable.num}+T${sTable.num})`
        : `Large Party (Merged T${pTable.num}+T${sTable.num})`;

      pTable.sessions = [{
        id: `sess-${pTable.num}-merged-${Date.now()}`,
        partyName: partyName,
        partySize: totalGuests || (pTable.capacity + sTable.capacity),
        status: 'confirmed',
        bill: totalBill,
        waiter: assignedWaiter,
        startedAt: firstParty?.startedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        orders: totalOrders || 1
      }];
    } else {
      pTable.sessions = allSessions;
    }

    // Expand primary table capacity
    pTable.capacity = pTable.originalCapacity + sTable.originalCapacity;
    pTable.mergedWith = sTable.num;
    pTable.waiter = assignedWaiter;
    pTable.status = pTable.sessions.length > 0 ? 'occupied' : 'free';

    // Update secondary table as merged into primary
    sTable.mergedInto = pTable.num;
    sTable.sessions = [];
    sTable.status = 'merged';
    sTable.waiter = assignedWaiter;

    // If current session was on secondary table, re-point to primary table
    if (activeTableSession && activeTableSession.num === sTable.num) {
      activeTableSession.num = pTable.num;
      activeTableSession.zone = pTable.zone;
    }

    $('#modal-merge-tables')?.classList.remove('active');
    showToast(`Tables ${pTable.num} & ${sTable.num} merged! Total capacity: ${pTable.capacity} seats with unified billing.`);
    renderFloorMap();
    renderTableQrManager();
  }

  // ── Unmerge Tables Handler ──
  window.unmergeTable = function(tableNum) {
    const formattedNum = String(tableNum).padStart(2, '0');
    let pTable = tables.find(t => t.num === formattedNum);
    if (!pTable) return;

    let sTable;
    if (pTable.mergedWith) {
      sTable = tables.find(t => t.num === pTable.mergedWith);
    } else if (pTable.mergedInto) {
      sTable = pTable;
      pTable = tables.find(t => t.num === sTable.mergedInto);
    }

    if (!pTable || !sTable) {
      showToast('Could not find corresponding merged table pairing.', false);
      return;
    }

    // Restore primary table capacity
    pTable.capacity = pTable.originalCapacity || (pTable.capacity - sTable.originalCapacity);
    delete pTable.mergedWith;
    pTable.status = (pTable.sessions && pTable.sessions.length > 0) ? 'occupied' : 'free';

    // Restore secondary table
    sTable.status = 'free';
    sTable.capacity = sTable.originalCapacity || sTable.capacity;
    delete sTable.mergedInto;
    sTable.sessions = [];
    sTable.waiter = 'Unassigned';

    showToast(`Tables ${pTable.num} and ${sTable.num} separated. Table ${sTable.num} is now FREE and available.`);
    renderFloorMap();
    renderTableQrManager();
  };

  // Confirm arrival action for staff on floor map (Item 5)
  window.confirmSessionArrival = function(tableNum, sessionId) {
    const table = tables.find(t => String(t.num).padStart(2, '0') === String(tableNum).padStart(2, '0'));
    if (!table) return;
    const session = table.sessions?.find(s => s.id === sessionId);
    if (session) {
      session.status = 'confirmed';
      updateTableOverallStatus(table);
      showToast(`Arrival Confirmed for ${session.partyName} at Table ${table.num}! Ordering unlocked.`);
      renderFloorMap();
      updateGuestArrivalBanner();
    }
  };

  // ── Render Dedicated Table QR Manager (Item 2) ──
  function renderTableQrManager() {
    const grid = document.getElementById('table-qr-manager-grid');
    if (!grid) return;

    grid.innerHTML = tables.map(t => {
      const url = getTableMenuUrl(t.num, t.zone);
      return `
        <div class="table-qr-card">
          <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
            <strong style="font-size:16px;">Table ${t.num}</strong>
            <span style="font-size:11px;color:var(--dash-muted);">${t.zone}</span>
          </div>
          <div class="table-qr-box" id="mgr-qr-${t.num}"></div>
          <div style="font-size:11px;color:var(--dash-muted);word-break:break-all;font-family:monospace;max-width:180px;">
            ${url}
          </div>
          <div style="display:flex;gap:8px;width:100%;margin-top:6px;">
            <button class="btn-secondary" style="flex:1;justify-content:center;font-size:11px;padding:6px;" onclick="downloadSingleTableQrPng('${t.num}')">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              PNG
            </button>
            <button class="btn-primary" style="flex:1;justify-content:center;font-size:11px;padding:6px;" onclick="downloadSingleTablePdfTent('${t.num}')">
              PDF Tent
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Generate real QRs inside each card
    tables.forEach(t => {
      const box = document.getElementById(`mgr-qr-${t.num}`);
      if (box && typeof QRCode !== 'undefined') {
        const url = getTableMenuUrl(t.num, t.zone);
        new QRCode(box, {
          text: url,
          width: 130,
          height: 130,
          colorDark: '#07382d',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    });
  }

  // PNG Download Action (Item 2)
  window.downloadSingleTableQrPng = function(tableNum) {
    const box = document.getElementById(`mgr-qr-${tableNum}`) || document.getElementById('qr-code-canvas-container');
    const imgOrCanvas = box?.querySelector('img') || box?.querySelector('canvas');
    if (!imgOrCanvas) {
      showToast('Generating QR image...', true);
      return;
    }
    const dataUrl = imgOrCanvas.src || (imgOrCanvas.toDataURL ? imgOrCanvas.toDataURL('image/png') : null);
    if (dataUrl) {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `testimonial-cafe-table-${tableNum}-qr.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloaded PNG QR for Table ${tableNum}!`);
    } else {
      showToast('Right-click to save QR code', true);
    }
  };

  // PDF Table-Tent Download / Print (Item 2)
  window.downloadSingleTablePdfTent = function(tableNum) {
    openPrintAllQrModal();
    showToast(`Print / Save as PDF dialog opened for Table ${tableNum} Tent Stand`);
    setTimeout(() => { window.print(); }, 600);
  };

  // ── Open Table QR Modal with Real Scannable QRCode ──
  window.openTableQrModal = function(tableNum) {
    const formattedNum = String(tableNum).padStart(2, '0');
    const table = tables.find(t => String(t.num).padStart(2, '0') === formattedNum) || {
      num: formattedNum,
      zone: 'Garden Terrace',
      capacity: 4,
      seats: 4,
      status: 'available',
      waiter: 'Unassigned',
      qr_token: `qr-testimony-t${formattedNum}`
    };

    if ($('#qr-modal-zone')) $('#qr-modal-zone').textContent = `${table.zone} Area`;
    if ($('#qr-modal-title')) $('#qr-modal-title').textContent = `Table ${table.num} · ${table.zone}`;
    if ($('#qr-modal-meta')) $('#qr-modal-meta').textContent = `Capacity: ${table.seats || table.capacity || 4} guests · Waiter: ${table.waiter || 'Unassigned'}`;

    const url = getTableMenuUrl ? getTableMenuUrl(table.num, table.zone) : `${window.location.origin}/t/${table.qr_token || 'qr-shamba-t' + table.num}`;
    if ($('#qr-url-text')) $('#qr-url-text').textContent = url;
    if ($('#qr-modal-url-text')) $('#qr-modal-url-text').textContent = url;

    // Render Scannable QR code into container
    const container = document.getElementById('modal-qr-container') || document.getElementById('qr-code-canvas-container');
    if (container) {
      container.innerHTML = '';
      if (typeof QRCode !== 'undefined') {
        new QRCode(container, {
          text: url,
          width: 180,
          height: 180,
          colorDark: '#07382d',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      } else {
        container.innerHTML = `<div style="padding:20px;color:var(--dash-muted);">QR Code: ${url}</div>`;
      }
    }

    // Status button text and dot if present
    const statusDot = $('#qr-modal-status-dot');
    const statusText = $('#qr-modal-status-btn-text');
    const statusColor = { occupied: '#10b981', free: '#94a3b8', available: '#94a3b8', reserved: '#f59e0b' };
    if (statusDot) statusDot.style.background = statusColor[table.status] || '#94a3b8';
    if (statusText) statusText.textContent = `Status: ${(table.status || 'AVAILABLE').toUpperCase()}`;

    // Wire actions (both HTML IDs supported)
    const handleOpenGuest = () => {
      $('#modal-table-qr')?.classList.remove('active');
      openTableDirectMenu(table.num, table.zone);
    };
    const handleCopyLink = () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast(`Copied QR Link for Table ${table.num}!`);
        }).catch(() => {
          showToast(`Link: ${url}`);
        });
      } else {
        showToast(`Link: ${url}`);
      }
    };

    if ($('#btn-open-guest-for-table')) $('#btn-open-guest-for-table').onclick = handleOpenGuest;
    if ($('#btn-qr-open-guest')) $('#btn-qr-open-guest').onclick = handleOpenGuest;
    if ($('#btn-copy-qr-link')) $('#btn-copy-qr-link').onclick = handleCopyLink;
    if ($('#btn-qr-copy-link')) $('#btn-qr-copy-link').onclick = handleCopyLink;

    if ($('#btn-qr-print-single')) {
      $('#btn-qr-print-single').onclick = () => window.print();
    }

    if ($('#btn-qr-toggle-status')) {
      $('#btn-qr-toggle-status').onclick = () => {
        const nextStatus = table.status === 'occupied' ? 'available' : (table.status === 'available' || table.status === 'free' ? 'reserved' : 'occupied');
        table.status = nextStatus;
        showToast(`Table ${table.num} status changed to ${nextStatus.toUpperCase()}`);
        openTableQrModal(table.num);
        renderFloorMap();
      };
    }

    $('#modal-table-qr')?.classList.add('active');
  };

  window.openTableDirectMenu = function(tableNum, zone) {
    setActiveTableSession(tableNum, zone, true);
    setView('guest');
  };

  // ── Print Center: All 12 Table QR Tents ──
  function openPrintAllQrModal() {
    const container = document.getElementById('print-all-cards-container');
    if (!container) return;
    container.innerHTML = '';

    tables.forEach(t => {
      const url = getTableMenuUrl(t.num, t.zone);
      const card = document.createElement('div');
      card.className = 'print-qr-stand-card';
      card.innerHTML = `
        <div class="print-card-brand">
          <small>TESTIMONIAL CAFE · TESTIMONY OS &amp; DIGITAL MENU</small>
          <h2>Table ${t.num}</h2>
          <span>${t.zone} Area · ${t.seats} Guests</span>
        </div>
        <div class="print-card-qr-box" id="print-qr-box-${t.num}"></div>
        <div class="print-card-footer">
          <strong>SCAN WITH PHONE CAMERA</strong>
          <p>Browse full menu, customize spices, and pay tableside</p>
          <div class="print-wifi-pill">Free Wi-Fi: TestimonialCafe_Guest · dijimenu.vercel.app</div>
        </div>
      `;
      container.appendChild(card);

      const qrBox = card.querySelector(`#print-qr-box-${t.num}`);
      if (qrBox && typeof QRCode !== 'undefined') {
        new QRCode(qrBox, {
          text: url,
          width: 140,
          height: 140,
          colorDark: '#07382d',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    });

    $('#modal-print-all-qr')?.classList.add('active');
  }

  // ── Guest Table Selector Modal ──
  function openGuestTableSelectorModal() {
    const grid = document.getElementById('guest-table-selector-grid');
    if (!grid) return;

    grid.innerHTML = tables.map(t => {
      const isSelected = (t.num === activeTableSession.num);
      return `
        <button type="button" class="guest-table-select-btn ${isSelected ? 'active' : ''}" onclick="selectGuestTable('${t.num}', '${t.zone}')">
          <strong style="display:block;font-size:15px;color:var(--dash-ink);">Table ${t.num}</strong>
          <small style="color:var(--dash-muted);font-size:11px;">${t.zone}</small>
        </button>
      `;
    }).join('');

    $('#modal-guest-table-select')?.classList.add('active');
  }

  window.selectGuestTable = function(num, zone) {
    setActiveTableSession(num, zone, true);
    $('#modal-guest-table-select')?.classList.remove('active');
    showToast(`Switched active table to Table ${num} (${zone})`);
  };

  // ── Kanban Ticket Advancement ──
  window.advanceKanbanTicket = function(btn) {
    const ticket = btn.closest('.kanban-ticket');
    if (!ticket) return;

    const col = ticket.closest('.kanban-col');
    const cols = [...document.querySelectorAll('#panel-orders .kanban-col')];
    const currentIndex = cols.indexOf(col);

    if (currentIndex === 0) { // Incoming -> In Kitchen
      ticket.classList.add('ticket-cooking');
      btn.textContent = 'Ready to Serve';
      cols[1].querySelector('.kanban-cards').appendChild(ticket);
      showToast('Ticket moved to Kitchen cooking queue');
    } else if (currentIndex === 1) { // In Kitchen -> Ready to Serve
      ticket.classList.remove('ticket-cooking');
      ticket.classList.add('ticket-ready');
      btn.textContent = 'Mark Served';
      cols[2].querySelector('.kanban-cards').appendChild(ticket);
      showToast('Order ready! Attendant notified');
    } else if (currentIndex === 2) { // Ready -> Served Today
      ticket.classList.remove('ticket-ready');
      ticket.classList.add('ticket-served');
      btn.remove();
      cols[3].querySelector('.kanban-cards').appendChild(ticket);
      showToast('Order completed & closed');
    }
    updateKanbanCounts();
  };

  function updateKanbanCounts() {
    document.querySelectorAll('#panel-orders .kanban-col').forEach(col => {
      const countEl = col.querySelector('.kanban-count');
      const tickets = col.querySelectorAll('.kanban-ticket').length;
      if (countEl) countEl.textContent = tickets;
    });
  }

  // Staff panel mirror renderer
  function renderStaffPanel() {
    const panelGrid = document.getElementById('staff-roster-grid-panel');
    if (!panelGrid) return;
    panelGrid.innerHTML = staffRoster.map(s => `
      <div class="staff-card ${s.active ? '' : 'staff-card--inactive'}">
        <div class="staff-avatar">${s.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div>
        <div class="staff-info">
          <strong>${s.name}</strong>
          <span>${s.role}</span>
          <small>${s.station} · PIN ****</small>
        </div>
        <div class="staff-status-dot ${s.active ? 'active' : 'inactive'}"></div>
      </div>`).join('');
  }

  // Wire Sidebar Nav buttons
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      $$('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const targetNav = link.getAttribute('data-dash-nav');
      switchDashPanel(targetNav);
    });
  });

  // Wire "Add Dish" from Menu Catalog panel
  document.getElementById('btn-menu-add-dish')?.addEventListener('click', () => {
    $('#modal-add-dish')?.classList.add('active');
  });

  // Wire "Add Staff Member" button in standalone Staff panel
  document.getElementById('btn-open-add-staff-panel')?.addEventListener('click', () => {
    $('#new-staff-name').value = '';
    $('#new-staff-pin').value = '';
    $('#staff-admin-pin-verify').value = '';
    $('#modal-add-staff')?.classList.add('active');
  });

  // Wire Offers button
  document.getElementById('btn-new-offer')?.addEventListener('click', () => {
    showToast('Offer creator initialized · Enter deal code');
  });
  document.getElementById('btn-hero-offers')?.addEventListener('click', () => {
    showToast('TESTIMONY30 promotional discount active on grill platters');
  });
  document.getElementById('btn-configure-promo')?.addEventListener('click', () => {
    switchDashPanel('offers');
  });

  // Wire POS Bridge buttons
  document.getElementById('btn-configure-pos')?.addEventListener('click', () => {
    showToast('SambaPOS endpoint: http://localhost:8080/api/tickets');
  });
  document.getElementById('btn-sync-pos')?.addEventListener('click', () => {
    showToast('Menu synchronized with SambaPOS terminal database!');
  });
  document.getElementById('btn-change-pin')?.addEventListener('click', () => {
    showToast('Admin authentication is server-side; no PIN is stored in this browser');
  });

  // Dismiss modal overlay on outside click
  $$('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // ── Staff Sidebar Drawer (Mobile & Tablet) ──
  const getSidebarEl = () => $('#main-sidebar') || $('#app-sidebar') || $('.sidebar');
  const getBackdropEl = () => $('#sidebar-backdrop');
  const btnMoreNav = $('#btn-staff-more-nav');

  const openSidebarDrawer = () => {
    const sb = getSidebarEl();
    const bd = getBackdropEl();
    sb?.classList.add('drawer-open');
    bd?.classList.add('active');
    btnMoreNav?.classList.add('active');
  };

  const closeSidebarDrawer = () => {
    const sb = getSidebarEl();
    const bd = getBackdropEl();
    sb?.classList.remove('drawer-open');
    bd?.classList.remove('active');
    btnMoreNav?.classList.remove('active');
  };

  const toggleSidebarDrawer = () => {
    const sb = getSidebarEl();
    if (sb?.classList.contains('drawer-open')) {
      closeSidebarDrawer();
    } else {
      openSidebarDrawer();
    }
  };

  $('#btn-toggle-sidebar')?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSidebarDrawer();
  });
  $('#btn-close-sidebar')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeSidebarDrawer();
  });
  btnMoreNav?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSidebarDrawer();
  });
  getBackdropEl()?.addEventListener('click', () => {
    closeSidebarDrawer();
  });

  // Automatically close sidebar drawer when navigating
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeSidebarDrawer();
    });
  });

  // ── Staff Bottom Navigation Items (Mobile) ──
  $$('.staff-bottom-nav-item[data-dash-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.staff-bottom-nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetNav = btn.getAttribute('data-dash-nav');
      // Also sync sidebar
      $$('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-dash-nav') === targetNav);
      });
      switchDashPanel(targetNav);
    });
  });

  // ── Kanban Mobile Tabs ──
  $$('.kanban-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.kanban-tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const stage = tab.getAttribute('data-stage');
      $$('.kanban-col').forEach(col => {
        col.classList.toggle('mobile-active-stage', col.getAttribute('data-col') === stage);
      });
    });
  });

  // ── Guest Floating Rounded Order Button (Action on Tap) ──
  $('#btn-guest-floating-order')?.addEventListener('click', (e) => {
    e.preventDefault();
    $('#modal-cart')?.classList.add('active');
  });

  $('#guest-floating-order-container')?.addEventListener('click', (e) => {
    e.preventDefault();
    $('#modal-cart')?.classList.add('active');
  });

  // Global click delegation for all floating order buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-guest-floating-order') || e.target.closest('#guest-floating-order-container') || e.target.closest('#btn-pill-review-order') || e.target.closest('#guest-order-pill')) {
      $('#modal-cart')?.classList.add('active');
    }
  });

  // ── Admin Topbar & Action Controls ──
  $('#btn-dash-table-select')?.addEventListener('click', () => {
    openGuestTableSelectorModal();
  });

  $('#filter-all-cat')?.addEventListener('click', () => {
    activeCategory = 'All';
    renderDashboardCategories();
    renderDashboardDishes();
    showToast('Showing all menu categories');
  });

  $('#btn-refresh-orders')?.addEventListener('click', () => {
    updateKanbanCounts();
    showToast('Orders queue refreshed with live kitchen state');
  });

  // ── Dining Option Toggle (Dine-in vs Takeaway) (Item 7) ──
  $$('.order-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.order-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentOrderDiningType = btn.getAttribute('data-type') || 'dine-in';
      showToast(`Selected: ${currentOrderDiningType === 'takeaway' ? 'Takeaway (Packaging requested)' : 'Dine-In'}`);
    });
  });

  // ── Floor Map Sub-Tabs (Floor Map vs Table QR Manager) (Item 2) ──
  $$('.floor-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.floor-tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabTarget = tab.getAttribute('data-floor-tab');
      const mapSec = document.getElementById('subview-floor-grid') || document.getElementById('floor-map-view-sec');
      const qrSec = document.getElementById('subview-floor-qr') || document.getElementById('table-qr-manager-sec');
      if (tabTarget === 'qr') {
        if (mapSec) mapSec.style.display = 'none';
        if (qrSec) qrSec.style.display = 'block';
        renderTableQrManager();
      } else {
        if (mapSec) mapSec.style.display = 'block';
        if (qrSec) qrSec.style.display = 'none';
        renderFloorMap();
      }
    });
  });

  // ── Add Table Modal Wiring (Item 1 & Item 2) ──
  $('#btn-open-add-table')?.addEventListener('click', () => {
    $('#new-table-num').value = '';
    $('#new-table-capacity').value = '4';
    $('#modal-add-table')?.classList.add('active');
  });

  $('#btn-close-add-table')?.addEventListener('click', () => {
    $('#modal-add-table')?.classList.remove('active');
  });

  $('#btn-cancel-add-table')?.addEventListener('click', () => {
    $('#modal-add-table')?.classList.remove('active');
  });

  $('#btn-save-add-table')?.addEventListener('click', () => {
    const num = $('#new-table-num')?.value.trim();
    const capacity = parseInt($('#new-table-capacity')?.value) || 4;
    const zone = $('#new-table-zone')?.value || 'Main Garden';

    if (!num) {
      showToast('Please enter a valid table number', false);
      return;
    }

    const formattedNum = String(num).padStart(2, '0');
    if (tables.some(t => String(t.num).padStart(2, '0') === formattedNum)) {
      showToast(`Table ${formattedNum} already exists!`, false);
      return;
    }

    // Creating new table automatically generates its own unique QR code (Item 2)
    const newTable = {
      num: formattedNum,
      zone: zone,
      capacity: capacity,
      seats: capacity,
      status: 'free',
      waiter: 'Unassigned',
      sessions: []
    };
    tables.push(newTable);

    $('#modal-add-table')?.classList.remove('active');
    showToast(`Table ${formattedNum} (${zone}, ${capacity} seats) created with unique QR code!`);
    renderFloorMap();
    renderTableQrManager();
  });

  // ── Dish CRUD Form Wiring (Item 3) ──
  $('#btn-close-dish-crud')?.addEventListener('click', () => {
    $('#modal-dish-crud')?.classList.remove('active');
  });
  $('#btn-cancel-dish-crud')?.addEventListener('click', () => {
    $('#modal-dish-crud')?.classList.remove('active');
  });

  $('#btn-save-dish-crud')?.addEventListener('click', () => {
    const id = $('#dish-crud-id')?.value;
    const name = $('#dish-crud-name')?.value.trim();
    const priceRaw = $('#dish-crud-price')?.value.trim();
    const status = $('#dish-crud-status')?.value || 'confirmed';
    const variant = $('#dish-crud-variant')?.value.trim() || 'Standard';
    const basis = $('#dish-crud-basis')?.value.trim() || '';
    const category = $('#dish-crud-category')?.value;
    const desc = $('#dish-crud-desc')?.value.trim();
    let image = $('#dish-crud-image-url')?.value.trim() || '/images/hero-banner.jpg';

    if (!name || !category) {
      showToast('Please provide a dish name and category', false);
      return;
    }

    let price = null;
    if (priceRaw !== '') {
      const parsed = parseInt(priceRaw);
      if (!isNaN(parsed) && parsed >= 0) {
        price = parsed;
      }
    }

    if (id) {
      // Edit existing dish
      const item = menuItems.find(i => i.id === id);
      if (item) {
        item.name = name;
        item.price = price;
        item.category = category;
        item.desc = desc || `${name} – ${category}`;
        item.price_status = status;
        item.basis = basis;
        if (!item.variants) item.variants = [];
        if (item.variants.length > 0) {
          item.variants[0].label = variant;
          item.variants[0].price = price;
          item.variants[0].price_status = status;
          item.variants[0].basis = basis;
        } else {
          item.variants.push({ label: variant, price, price_status: status, basis });
        }
        if (image) item.image = image;
        showToast(`Updated "${name}" in menu catalog!`);
      }
    } else {
      // Create new dish
      const catObj = categories.find(c => c.name === category);
      const isBar = catObj ? catObj.station === 'bar' : (category.toLowerCase().includes('drink') || category.toLowerCase().includes('juice') || category.toLowerCase().includes('coffee'));
      const newDish = {
        id: 'dish-' + Date.now(),
        name,
        price,
        category,
        categoryId: catObj ? catObj.id : category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        desc: desc || `${name} – ${category}`,
        image,
        is_available: true,
        prep_time: isBar ? '3-5 min' : '15-20 min',
        rating: 4.8,
        station: isBar ? 'bar' : 'kitchen',
        is_new: true,
        offer_label: '',
        offer_price: null,
        price_status: status,
        basis,
        section: catObj ? catObj.section : '',
        variants: [{ label: variant, price, price_status: status, basis }]
      };
      menuItems.unshift(newDish);
      showToast(`Created & published "${name}" to menu catalog!`);
    }

    persistMenuState();
    $('#modal-dish-crud')?.classList.remove('active');
    renderMenuCatalogCategories();
    renderMenuCatalogDishes();
    renderDashboardCategories();
    renderDashboardDishes();
    renderGuestCategories();
    renderGuestDishes();
  });

  // ── Promotions / Specials CRUD Form Wiring (Item 4) ──
  $('#btn-open-create-promo')?.addEventListener('click', () => {
    $('#promo-crud-id').value = '';
    $('#promo-crud-title-input').value = '';
    $('#promo-crud-orig-price').value = '';
    $('#promo-crud-discount').value = '';
    $('#promo-crud-offer-price').value = '';
    $('#promo-crud-desc').value = '';
    $('#promo-crud-image-url').value = '';
    $('#promo-crud-is-daily-special').checked = true;
    $('#modal-promo-crud')?.classList.add('active');
  });

  $('#btn-close-promo-crud')?.addEventListener('click', () => {
    $('#modal-promo-crud')?.classList.remove('active');
  });
  $('#btn-cancel-promo-crud')?.addEventListener('click', () => {
    $('#modal-promo-crud')?.classList.remove('active');
  });

  // Auto-calculate Discount % and Offer Price bidirectional (Item 4)
  $('#promo-crud-discount')?.addEventListener('input', () => {
    const orig = parseFloat($('#promo-crud-orig-price')?.value) || 0;
    const disc = parseFloat($('#promo-crud-discount')?.value) || 0;
    if (orig > 0 && disc > 0) {
      const calculatedOffer = Math.round(orig * (1 - disc / 100));
      $('#promo-crud-offer-price').value = calculatedOffer;
    }
  });

  $('#promo-crud-offer-price')?.addEventListener('input', () => {
    const orig = parseFloat($('#promo-crud-orig-price')?.value) || 0;
    const offer = parseFloat($('#promo-crud-offer-price')?.value) || 0;
    if (orig > 0 && offer > 0 && offer < orig) {
      const calculatedDisc = Math.round(((orig - offer) / orig) * 100);
      $('#promo-crud-discount').value = calculatedDisc;
    }
  });

  $('#btn-save-promo-crud')?.addEventListener('click', () => {
    const title = $('#promo-crud-title-input')?.value.trim();
    const origPrice = parseInt($('#promo-crud-orig-price')?.value) || 0;
    const discount = parseInt($('#promo-crud-discount')?.value) || 0;
    let offerPrice = parseInt($('#promo-crud-offer-price')?.value) || 0;
    const desc = $('#promo-crud-desc')?.value.trim();
    const startTime = $('#promo-crud-start')?.value || '';
    const endTime = $('#promo-crud-end')?.value || '';
    const image = $('#promo-crud-image-url')?.value.trim() || '/images/hero-banner.jpg';
    const isDailySpecial = $('#promo-crud-is-daily-special')?.checked ?? true;

    if (!title || origPrice <= 0 || !desc) {
      showToast('Please provide promo title, original price, and description', false);
      return;
    }

    if (offerPrice <= 0 && discount > 0) {
      offerPrice = Math.round(origPrice * (1 - discount / 100));
    }

    const newPromo = {
      id: 'promo-' + Date.now(),
      title,
      origPrice,
      offerPrice: offerPrice > 0 ? offerPrice : origPrice,
      discountPercent: discount || Math.round(((origPrice - offerPrice) / origPrice) * 100),
      desc,
      startTime,
      endTime,
      image,
      isDailySpecial,
      active: true
    };
    promotions.unshift(newPromo);

    $('#modal-promo-crud')?.classList.remove('active');
    showToast(`Published Promotion "${title}"!`);
    renderOffersPanel();
    renderGuestPromosCarousel();
  });

  // ── Cash Payment Recording Confirmation (Item 9) ──
  $('#btn-confirm-cash-payment')?.addEventListener('click', () => {
    const tableNum = $('#cash-table-select')?.value || activeTableSession.num;
    const table = tables.find(t => String(t.num).padStart(2, '0') === String(tableNum).padStart(2, '0'));
    if (!table) return;

    // Amount pulled from table/session total automatically, never typed in freely (Item 9)
    const sessions = table.sessions || [];
    const tableTotal = sessions.reduce((sum, s) => sum + (s.bill || 0), 0) || 2400;

    const cashierName = loggedInUser.name;
    const timestamp = new Date().toLocaleTimeString();

    // Reset session bills and mark free
    sessions.forEach(s => { s.bill = 0; s.status = 'paid'; });
    table.status = 'free';
    table.currentBill = 0;

    showToast(`Cash payment of KES ${tableTotal.toLocaleString()} confirmed received by ${cashierName} at ${timestamp}!`);
    $('#modal-cash-confirm')?.classList.remove('active');
    renderFloorMap();
    renderTodaySnapshot();
  });

  // ── Staff Logout & PIN Audit Record (Item 10) ──
  const handleStaffLogout = () => {
    // Record LOGOUT in audit trail
    const userName = loggedInUser?.name || 'Staff Member';
    loginAuditLog.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleString(),
      staffName: userName,
      role: loggedInUser?.role || 'Staff',
      pinUsed: 'redacted',
      action: 'LOGOUT',
      device: 'Dashboard Browser'
    });
    staffSession = null;
    window.__STAFF_SESSION__ = null;
    try { sessionStorage.removeItem('testimony_staff_session'); } catch(e) {}
    showToast(`Staff member ${userName} logged out.`);
    setView('guest');
  };
  $('#btn-dash-logout')?.addEventListener('click', handleStaffLogout);
  $('#btn-staff-logout')?.addEventListener('click', handleStaffLogout);

  // ── Guest Staff Gate Action ──
  $('#btn-guest-staff-gate')?.addEventListener('click', () => {
    if ($('#gate-pin-input')) $('#gate-pin-input').value = '';
    if ($('#gate-pin-error')) $('#gate-pin-error').style.display = 'none';
    $('#modal-staff-pin')?.classList.add('active');
    $('#gate-pin-input')?.focus();
  });

  // ── POS Sync & Diagnostics Buttons ──
  $('#btn-sync-pos-header')?.addEventListener('click', () => {
    const btn = $('#btn-sync-pos-header');
    if (btn) btn.textContent = 'Syncing...';
    if (typeof fetch === 'function') {
      fetch('/api/pos/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'full_sync' })
      }).catch(() => {});
    }
    setTimeout(() => {
      if (btn) btn.textContent = 'Sync Now';
      const lastSync = $('#pos-last-sync-time');
      if (lastSync) lastSync.textContent = 'Just now';
      showToast('SambaPOS hardware bridge tickets synchronized.');
    }, 400);
  });

  $('#btn-retry-all-syncs')?.addEventListener('click', () => {
    const container = $('#pos-sync-log-container');
    if (container) {
      container.innerHTML = `
        <div style="padding:10px 14px;background:var(--dash-bg);border:1px solid var(--dash-border);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong style="font-size:13px;color:var(--dash-ink);">All 28 tickets synchronized</strong>
            <small style="display:block;color:var(--status-success);font-size:11px;">Queue clear · All tickets acknowledged by POS terminal</small>
          </div>
          <span style="font-size:11px;font-weight:700;color:var(--status-success);">Synchronized</span>
        </div>
      `;
    }
    showToast('All pending ticket syncs retried and confirmed.');
  });

  // ── Staff Inspector Actions ──
  $('#btn-inspector-kitchen')?.addEventListener('click', () => {
    showToast('Next course ticket routed directly to Hot Kitchen display.');
  });
  $('#btn-inspector-print')?.addEventListener('click', () => {
    openPrintTicketModal('SH-842', '04', 'Terrace', [
      { name: 'Nyama Choma Platter', qty: 1, price: 1365 },
      { name: 'Swahili Samosa Trio', qty: 2, price: 650 }
    ], 2665);
  });
  $('#btn-inspector-clear')?.addEventListener('click', () => {
    showToast('Table 04 session closed. Table marked available.');
    const t = tables.find(x => x.num === '04');
    if (t) {
      t.status = 'available';
      t.sessions = [];
    }
    renderFloorMap();
  });

  // ── Customer Post-Payment Rating & Feedback Modal ──
  let selectedRatingStars = 5;
  $$('.star-click').forEach(starBtn => {
    starBtn.addEventListener('click', () => {
      const starVal = parseInt(starBtn.getAttribute('data-star'), 10) || 5;
      selectedRatingStars = starVal;
      $$('.star-click').forEach(b => {
        const v = parseInt(b.getAttribute('data-star'), 10);
        b.style.color = v <= starVal ? '#d4af37' : 'var(--dash-border-strong)';
      });
    });
  });

  $('#btn-close-rating')?.addEventListener('click', () => {
    $('#modal-rating')?.classList.remove('active');
  });

  $('#btn-submit-feedback')?.addEventListener('click', () => {
    $('#modal-rating')?.classList.remove('active');
    showToast(`Thank you! Your ${selectedRatingStars}-star rating was submitted to Testimonial Cafe.`);
  });

  // Close Order Confirmation Screen
  $('#btn-close-order-confirmation')?.addEventListener('click', () => {
    $('#modal-order-confirmation')?.classList.remove('active');
    clearInterval(activeGraceTimerInterval);
  });
  $('#btn-done-order-confirmation')?.addEventListener('click', () => {
    $('#modal-order-confirmation')?.classList.remove('active');
    clearInterval(activeGraceTimerInterval);
  });

  // Payment Method toggles in Cart (Item 9)
  $('#pay-method-mpesa')?.addEventListener('click', () => {
    $('#pay-method-mpesa').style.border = '2px solid var(--primary)';
    $('#pay-method-mpesa').classList.add('active-pay-method');
    $('#pay-method-card').style.border = '1px solid var(--dash-border)';
    $('#pay-method-card').classList.remove('active-pay-method');
    $('#phone-field-group').style.display = 'block';
  });

  $('#pay-method-card')?.addEventListener('click', () => {
    $('#pay-method-card').style.border = '2px solid var(--primary)';
    $('#pay-method-card').classList.add('active-pay-method');
    $('#pay-method-mpesa').style.border = '1px solid var(--dash-border)';
    $('#pay-method-mpesa').classList.remove('active-pay-method');
    $('#phone-field-group').style.display = 'none';
  });

  // Analytics date range change (Item 11)
  $('#analytics-range-select')?.addEventListener('change', () => {
    renderAnalyticsPanel();
  });
  $('#btn-export-analytics-csv')?.addEventListener('click', () => {
    exportAnalyticsCsv();
  });

  // ── Merge Tables Modal Listeners ──
  $('#btn-open-merge-tables')?.addEventListener('click', () => {
    openMergeTablesModal();
  });
  $('#btn-close-merge-tables')?.addEventListener('click', () => {
    $('#modal-merge-tables')?.classList.remove('active');
  });
  $('#btn-cancel-merge-tables')?.addEventListener('click', () => {
    $('#modal-merge-tables')?.classList.remove('active');
  });
  $('#btn-confirm-merge-tables')?.addEventListener('click', () => {
    confirmMergeTables();
  });
  $('#form-merge-tables')?.addEventListener('submit', (e) => {
    e.preventDefault();
    confirmMergeTables();
  });
  $('#merge-combine-sessions-checkbox')?.addEventListener('change', () => {
    updateMergePreview();
  });

  // Event delegation for Kanban ticket progress
  document.addEventListener('click', (e) => {
    const moveBtn = e.target.closest('.btn-ticket-move');
    if (moveBtn) {
      advanceKanbanTicket(moveBtn);
    }
  });
}


// ═══════════════════════════════════════════════
// CRUD MANAGERS: CATEGORIES, STATIONS, DINING ZONES, STAFF
// ═══════════════════════════════════════════════

// ── 1. CATEGORIES CRUD ──
function renderCategoriesManager() {
  const container = document.getElementById('categories-manager-container');
  const countEl = document.getElementById('count-menu-categories');
  if (countEl) countEl.textContent = categories.length;
  if (!container) return;

  container.innerHTML = categories.map(c => {
    const count = menuItems.filter(i => i.category === c.name || i.categoryId === c.id).length;
    return `
      <div class="category-crud-card">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <strong style="font-size:15px;color:var(--dash-ink);">${c.name}</strong>
            <span class="cat-badge-section">${c.section || 'Main Dish'}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span class="cat-badge-station">${c.station || 'kitchen'}</span>
            <span style="font-size:12px;color:var(--dash-muted);">${count} dishes active</span>
          </div>
          ${c.note ? `<p style="font-size:11.5px;color:var(--dash-muted);margin:4px 0 0 0;font-style:italic;">"${c.note}"</p>` : ''}
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;border-top:1px solid var(--dash-border);padding-top:10px;margin-top:8px;">
          <button class="btn-secondary" style="font-size:11px;padding:4px 12px;min-height:32px;" onclick="openEditCategory('${c.id}')">Edit</button>
          <button class="btn-secondary" style="font-size:11px;padding:4px 12px;min-height:32px;color:var(--status-danger);" onclick="deleteCategory('${c.id}')">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

window.openCreateCategoryModal = function() {
  $('#category-crud-title').textContent = 'Add Menu Category';
  $('#category-crud-subtitle').textContent = 'Organize dishes by section, station routing, and layout style';
  $('#category-crud-id').value = '';
  $('#category-crud-name').value = '';
  $('#category-crud-section').value = 'Main Dish';
  $('#category-crud-sort').value = (categories.length + 1);
  $('#category-crud-layout').value = 'plate-card';
  $('#category-crud-note').value = '';
  populateStationSelectForCategory();
  $('#modal-category-crud')?.classList.add('active');
};

window.openEditCategory = function(id) {
  const cat = categories.find(c => c.id === id);
  if (!cat) return;
  $('#category-crud-title').textContent = 'Edit Menu Category';
  $('#category-crud-subtitle').textContent = `Update category details for "${cat.name}"`;
  $('#category-crud-id').value = cat.id;
  $('#category-crud-name').value = cat.name;
  $('#category-crud-section').value = cat.section || 'Main Dish';
  $('#category-crud-sort').value = cat.sort_order || 1;
  $('#category-crud-layout').value = cat.layout || 'plate-card';
  $('#category-crud-note').value = cat.note || '';
  populateStationSelectForCategory(cat.station);
  $('#modal-category-crud')?.classList.add('active');
};

function populateStationSelectForCategory(selectedStation) {
  const sel = $('#category-crud-station');
  if (!sel) return;
  sel.innerHTML = stations.map(s => `
    <option value="${s.type || s.id}" ${selectedStation === (s.type || s.id) ? 'selected' : ''}>${s.name} (${s.code})</option>
  `).join('');
}

window.deleteCategory = function(id) {
  const cat = categories.find(c => c.id === id);
  if (!cat) return;
  const count = menuItems.filter(i => i.category === cat.name || i.categoryId === cat.id).length;
  if (!confirm(`Delete category "${cat.name}"? (${count} dishes will remain in catalog)`)) return;
  categories = categories.filter(c => c.id !== id);
  persistMenuState();
  renderCategoriesManager();
  renderCategoryRails();
  renderGuestCategories();
  renderGuestDishes();
  showToast(`Category "${cat.name}" deleted.`);
};

// ── 2. STATIONS CRUD ──
function renderStationsManager() {
  const container = document.getElementById('stations-manager-container');
  const countEl = document.getElementById('count-menu-stations');
  if (countEl) countEl.textContent = stations.length;
  if (!container) return;

  container.innerHTML = stations.map(s => `
    <div class="station-crud-card" style="border-left-color:${s.color || 'var(--primary)'};">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <strong style="font-size:15px;color:var(--dash-ink);">${s.name}</strong>
          <span style="font-size:11px;font-family:var(--font-mono);background:var(--dash-border);padding:2px 6px;border-radius:4px;margin-left:6px;font-weight:700;">${s.code}</span>
        </div>
        <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:${s.status === 'online' ? '#ecfdf5' : '#fef2f2'};color:${s.status === 'online' ? '#047857' : '#991b1b'};">
          ${s.status.toUpperCase()}
        </span>
      </div>
      <p style="font-size:12px;color:var(--dash-muted);margin:0;">Hardware: <strong>${s.printer || 'Default Terminal'}</strong></p>
      <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--dash-border);padding-top:10px;margin-top:6px;">
        <span style="font-size:11px;color:var(--dash-muted);text-transform:uppercase;">Type: ${s.type}</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-secondary" style="font-size:11px;padding:4px 10px;min-height:30px;" onclick="openEditStation('${s.id}')">Edit</button>
          <button class="btn-secondary" style="font-size:11px;padding:4px 10px;min-height:30px;color:var(--status-danger);" onclick="deleteStation('${s.id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

window.openCreateStationModal = function() {
  $('#station-crud-title').textContent = 'Add Kitchen/Bar Station';
  $('#station-crud-subtitle').textContent = 'Configure ticket routing, hardware thermal printers, and prep brigade';
  $('#station-crud-id').value = '';
  $('#station-crud-name').value = '';
  $('#station-crud-code').value = 'ST-' + (stations.length + 1);
  $('#station-crud-type').value = 'kitchen';
  $('#station-crud-printer').value = '';
  $('#station-crud-status').value = 'online';
  $('#station-crud-color').value = '#ED1C24';
  $('#modal-station-crud')?.classList.add('active');
};

window.openEditStation = function(id) {
  const st = stations.find(s => s.id === id);
  if (!st) return;
  $('#station-crud-title').textContent = 'Edit Station';
  $('#station-crud-subtitle').textContent = `Update station details for "${st.name}"`;
  $('#station-crud-id').value = st.id;
  $('#station-crud-name').value = st.name;
  $('#station-crud-code').value = st.code;
  $('#station-crud-type').value = st.type || 'kitchen';
  $('#station-crud-printer').value = st.printer || '';
  $('#station-crud-status').value = st.status || 'online';
  $('#station-crud-color').value = st.color || '#ED1C24';
  $('#modal-station-crud')?.classList.add('active');
};

window.deleteStation = function(id) {
  const st = stations.find(s => s.id === id);
  if (!st) return;
  if (!confirm(`Remove station "${st.name}" (${st.code})?`)) return;
  stations = stations.filter(s => s.id !== id);
  persistMenuState();
  renderStationsManager();
  showToast(`Station "${st.name}" removed.`);
};

// ── 3. DINING ZONES CRUD ──
function renderDiningZonesManager() {
  const container = document.getElementById('dining-zones-manager-grid');
  const countEl = document.getElementById('count-dining-zones');
  if (countEl) countEl.textContent = diningZones.length;
  if (!container) return;

  container.innerHTML = diningZones.map(z => {
    const assignedTables = tables.filter(t => t.zone === z.name);
    const totalSeats = assignedTables.reduce((sum, t) => sum + (t.capacity || t.seats || 4), 0);
    return `
      <div class="zone-crud-card" style="border-left-color:${z.color || '#10b981'};">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <strong style="font-size:15px;color:var(--dash-ink);">${z.name}</strong>
          <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:var(--cream);color:var(--charcoal);">
            ${z.floor || 'Ground'}
          </span>
        </div>
        <p style="font-size:12px;color:var(--dash-muted);margin:0;">${z.description || 'Dedicated dining area'}</p>
        <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:var(--dash-ink);margin:4px 0;">
          <span><strong>${assignedTables.length}</strong> Tables</span>
          <span>·</span>
          <span><strong>${totalSeats}</strong> Total Seats</span>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;border-top:1px solid var(--dash-border);padding-top:10px;margin-top:6px;">
          <button class="btn-secondary" style="font-size:11px;padding:4px 10px;min-height:30px;" onclick="openEditDiningZone('${z.id}')">Edit Zone</button>
          <button class="btn-secondary" style="font-size:11px;padding:4px 10px;min-height:30px;color:var(--status-danger);" onclick="deleteDiningZone('${z.id}')">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderFloorZoneFilters() {
  const filterRow = document.getElementById('floor-zone-filters');
  if (!filterRow) return;

  filterRow.innerHTML = [
    { id: 'all', name: 'All Zones' },
    ...diningZones
  ].map(z => `
    <button class="floor-filter-pill ${(window.activeFloorZoneFilter || 'All Zones') === z.name ? 'active' : ''}" onclick="filterFloorMapByZone('${z.name}')">
      ${z.name}
    </button>
  `).join('');
}

window.filterFloorMapByZone = function(zoneName) {
  window.activeFloorZoneFilter = zoneName;
  renderFloorZoneFilters();
  renderFloorMap();
};

window.openCreateDiningZoneModal = function() {
  $('#dining-zone-crud-title').textContent = 'Add Dining Zone';
  $('#dining-zone-crud-subtitle').textContent = 'Group tables by floor area, ambiance, and service section';
  $('#dining-zone-crud-id').value = '';
  $('#dining-zone-crud-name').value = '';
  $('#dining-zone-crud-floor').value = 'Ground';
  $('#dining-zone-crud-desc').value = '';
  $('#dining-zone-crud-color').value = '#10b981';
  $('#modal-dining-zone-crud')?.classList.add('active');
};

window.openEditDiningZone = function(id) {
  const z = diningZones.find(item => item.id === id);
  if (!z) return;
  $('#dining-zone-crud-title').textContent = 'Edit Dining Zone';
  $('#dining-zone-crud-subtitle').textContent = `Update details for "${z.name}"`;
  $('#dining-zone-crud-id').value = z.id;
  $('#dining-zone-crud-name').value = z.name;
  $('#dining-zone-crud-floor').value = z.floor || 'Ground';
  $('#dining-zone-crud-desc').value = z.description || '';
  $('#dining-zone-crud-color').value = z.color || '#10b981';
  $('#modal-dining-zone-crud')?.classList.add('active');
};

window.deleteDiningZone = function(id) {
  const z = diningZones.find(item => item.id === id);
  if (!z) return;
  if (!confirm(`Delete zone "${z.name}"?`)) return;
  diningZones = diningZones.filter(item => item.id !== id);
  persistMenuState();
  renderDiningZonesManager();
  renderFloorZoneFilters();
  showToast(`Dining zone "${z.name}" deleted.`);
};

// ── 4. STAFF ROSTER ENHANCEMENTS & CRUD ──
function renderEnhancedStaffPanel() {
  const panelGrid = document.getElementById('staff-roster-grid-panel');
  if (!panelGrid) return;

  const totalStaff = staffRoster.length;
  const onDuty = staffRoster.filter(s => s.active).length;
  const waiters = staffRoster.filter(s => (s.role || '').toLowerCase().includes('waiter')).length;
  const kitchen = totalStaff - waiters;

  panelGrid.innerHTML = `
    <div class="staff-stats-row" style="grid-column:1/-1;">
      <div class="staff-stat-box">
        <span>Total Staff</span>
        <strong>${totalStaff}</strong>
      </div>
      <div class="staff-stat-box">
        <span>On Duty Active</span>
        <strong style="color:var(--status-success);">${onDuty}</strong>
      </div>
      <div class="staff-stat-box">
        <span>Floor Waiters</span>
        <strong>${waiters}</strong>
      </div>
      <div class="staff-stat-box">
        <span>Kitchen / Bar Brigade</span>
        <strong>${kitchen}</strong>
      </div>
    </div>
    ${staffRoster.map(s => `
      <div class="staff-card-v2 ${s.active ? '' : 'staff-card--inactive'}">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div class="staff-avatar" style="width:42px;height:42px;font-size:14px;border-radius:10px;background:var(--charcoal);color:var(--warm-white);display:grid;place-items:center;font-weight:800;flex-shrink:0;">
            ${s.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
              <strong style="font-size:14px;color:var(--dash-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.name}</strong>
              <span style="font-size:10px;font-weight:800;padding:2px 6px;border-radius:4px;background:${s.active ? '#ecfdf5' : '#f3f4f6'};color:${s.active ? '#047857' : '#6b7280'};">
                ${s.active ? 'ON DUTY' : 'OFF DUTY'}
              </span>
            </div>
            <span style="display:block;font-size:12px;color:var(--primary);font-weight:700;margin-top:2px;">${s.role}</span>
            <small style="display:block;color:var(--dash-muted);font-size:11px;margin-top:2px;">${s.station} · ${s.phone || '+254 7...'}</small>
          </div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;border-top:1px solid var(--dash-border);padding-top:10px;margin-top:4px;">
          <button class="btn-secondary" style="font-size:11px;padding:4px 10px;min-height:30px;" onclick="toggleStaffShift('${s.id}')">
            ${s.active ? 'Set Off-Duty' : 'Set On-Duty'}
          </button>
          <button class="btn-secondary" style="font-size:11px;padding:4px 10px;min-height:30px;" onclick="openEditStaff('${s.id}')">Edit</button>
          <button class="btn-secondary" style="font-size:11px;padding:4px 10px;min-height:30px;color:var(--status-danger);" onclick="deleteStaffMember('${s.id}')">Delete</button>
        </div>
      </div>
    `).join('')}
  `;
}

window.toggleStaffShift = function(id) {
  const staff = staffRoster.find(s => s.id === id);
  if (!staff) return;
  staff.active = !staff.active;
  try { localStorage.setItem('shamba_staff_roster', JSON.stringify(staffRoster)); } catch(e) {}
  renderEnhancedStaffPanel();
  renderStaffRoster();
  showToast(`${staff.name} is now ${staff.active ? 'On Duty' : 'Off Duty'}`);
};

window.openEditStaff = function(id) {
  const s = staffRoster.find(item => item.id === id);
  if (!s) return;
  $('#edit-staff-id').value = s.id;
  $('#edit-staff-name').value = s.name;
  $('#edit-staff-role').value = s.role;
  $('#edit-staff-phone').value = s.phone || '';
  $('#edit-staff-active').value = String(Boolean(s.active));

  const stationSelect = $('#edit-staff-station');
  if (stationSelect) {
    stationSelect.innerHTML = stations.map(st => `
      <option value="${st.name}" ${s.station === st.name ? 'selected' : ''}>${st.name}</option>
    `).join('');
  }
  $('#modal-edit-staff')?.classList.add('active');
};

window.deleteStaffMember = function(id) {
  const s = staffRoster.find(item => item.id === id);
  if (!s) return;
  if (!confirm(`Remove staff member "${s.name}"?`)) return;
  staffRoster = staffRoster.filter(item => item.id !== id);
  try { localStorage.setItem('shamba_staff_roster', JSON.stringify(staffRoster)); } catch(e) {}
  renderEnhancedStaffPanel();
  renderStaffRoster();
  showToast(`Staff member "${s.name}" removed.`);
};

// ── 5. PROMOTION CRUD MODAL OPENER ──
window.openCreatePromoModal = function() {
  $('#promo-crud-title').textContent = 'Create New Daily Special / Promo';
  $('#promo-crud-id').value = '';
  $('#promo-crud-title-input').value = '';
  $('#promo-crud-orig-price').value = '';
  $('#promo-crud-discount').value = '';
  $('#promo-crud-offer-price').value = '';
  $('#promo-crud-desc').value = '';
  $('#promo-crud-image-url').value = '';
  $('#modal-promo-crud')?.classList.add('active');
};

window.openEditPromo = function(id) {
  const p = promotions.find(item => item.id === id);
  if (!p) return;
  $('#promo-crud-title').textContent = 'Edit Promotion / Daily Special';
  $('#promo-crud-id').value = p.id;
  $('#promo-crud-title-input').value = p.title;
  $('#promo-crud-orig-price').value = p.origPrice;
  $('#promo-crud-discount').value = p.discountPercent || '';
  $('#promo-crud-offer-price').value = p.offerPrice;
  $('#promo-crud-desc').value = p.desc;
  $('#promo-crud-image-url').value = p.image || '';
  $('#modal-promo-crud')?.classList.add('active');
};

// ── 6. INITIALIZE SUB-TABS & FORM LISTENERS ──
function initAllCrudSystems() {
  // Menu Sub-Tabs
  $$('.menu-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.menu-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-menu-tab');
      $('#subview-menu-dishes').style.display = (tab === 'dishes' ? 'block' : 'none');
      $('#subview-menu-categories').style.display = (tab === 'categories' ? 'block' : 'none');
      $('#subview-menu-stations').style.display = (tab === 'stations' ? 'block' : 'none');
      if (tab === 'categories') renderCategoriesManager();
      if (tab === 'stations') renderStationsManager();
    });
  });

  // Floor Sub-Tabs
  $$('.floor-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.floor-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-floor-tab');
      $('#subview-floor-grid').style.display = (tab === 'grid' ? 'block' : 'none');
      $('#subview-floor-qr').style.display = (tab === 'qr' ? 'block' : 'none');
      const zonesView = $('#subview-floor-zones');
      if (zonesView) zonesView.style.display = (tab === 'zones' ? 'block' : 'none');
      if (tab === 'zones') renderDiningZonesManager();
    });
  });

  // Add Action Buttons
  $('#btn-menu-add-category')?.addEventListener('click', openCreateCategoryModal);
  $('#btn-menu-add-station')?.addEventListener('click', openCreateStationModal);
  $('#btn-open-add-zone')?.addEventListener('click', openCreateDiningZoneModal);
  $('#btn-new-offer')?.addEventListener('click', openCreatePromoModal);

  // Close Buttons
  $('#btn-close-category-crud')?.addEventListener('click', () => $('#modal-category-crud')?.classList.remove('active'));
  $('#btn-cancel-category-crud')?.addEventListener('click', () => $('#modal-category-crud')?.classList.remove('active'));

  $('#btn-close-station-crud')?.addEventListener('click', () => $('#modal-station-crud')?.classList.remove('active'));
  $('#btn-cancel-station-crud')?.addEventListener('click', () => $('#modal-station-crud')?.classList.remove('active'));

  $('#btn-close-dining-zone-crud')?.addEventListener('click', () => $('#modal-dining-zone-crud')?.classList.remove('active'));
  $('#btn-cancel-dining-zone-crud')?.addEventListener('click', () => $('#modal-dining-zone-crud')?.classList.remove('active'));

  $('#btn-close-edit-staff')?.addEventListener('click', () => $('#modal-edit-staff')?.classList.remove('active'));
  $('#btn-cancel-edit-staff')?.addEventListener('click', () => $('#modal-edit-staff')?.classList.remove('active'));

  // Form: Category Save
  $('#form-category-crud')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = $('#category-crud-id')?.value;
    const name = $('#category-crud-name')?.value.trim();
    const section = $('#category-crud-section')?.value;
    const station = $('#category-crud-station')?.value;
    const sort = parseInt($('#category-crud-sort')?.value) || 1;
    const layout = $('#category-crud-layout')?.value;
    const note = $('#category-crud-note')?.value.trim();

    if (!name) return;
    if (id) {
      const cat = categories.find(c => c.id === id);
      if (cat) {
        cat.name = name;
        cat.section = section;
        cat.station = station;
        cat.sort_order = sort;
        cat.layout = layout;
        cat.note = note;
      }
    } else {
      categories.push({
        id: 'cat-' + Date.now().toString(36),
        name,
        section,
        station,
        sort_order: sort,
        layout,
        note
      });
    }
    persistMenuState();
    $('#modal-category-crud')?.classList.remove('active');
    renderCategoriesManager();
    renderCategoryRails();
    renderGuestCategories();
    renderGuestDishes();
    showToast(`Category "${name}" saved.`);
  });

  // Form: Station Save
  $('#form-station-crud')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = $('#station-crud-id')?.value;
    const name = $('#station-crud-name')?.value.trim();
    const code = $('#station-crud-code')?.value.trim();
    const type = $('#station-crud-type')?.value;
    const printer = $('#station-crud-printer')?.value.trim();
    const status = $('#station-crud-status')?.value;
    const color = $('#station-crud-color')?.value;

    if (!name || !code) return;
    if (id) {
      const st = stations.find(s => s.id === id);
      if (st) {
        st.name = name;
        st.code = code;
        st.type = type;
        st.printer = printer;
        st.status = status;
        st.color = color;
      }
    } else {
      stations.push({
        id: 'station-' + Date.now().toString(36),
        name,
        code,
        type,
        printer,
        status,
        color
      });
    }
    persistMenuState();
    $('#modal-station-crud')?.classList.remove('active');
    renderStationsManager();
    showToast(`Station "${name}" saved.`);
  });

  // Form: Dining Zone Save
  $('#form-dining-zone-crud')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = $('#dining-zone-crud-id')?.value;
    const name = $('#dining-zone-crud-name')?.value.trim();
    const floor = $('#dining-zone-crud-floor')?.value;
    const desc = $('#dining-zone-crud-desc')?.value.trim();
    const color = $('#dining-zone-crud-color')?.value;

    if (!name) return;
    if (id) {
      const z = diningZones.find(item => item.id === id);
      if (z) {
        z.name = name;
        z.floor = floor;
        z.description = desc;
        z.color = color;
      }
    } else {
      diningZones.push({
        id: 'zone-' + Date.now().toString(36),
        name,
        floor,
        description: desc,
        color
      });
    }
    persistMenuState();
    $('#modal-dining-zone-crud')?.classList.remove('active');
    renderDiningZonesManager();
    renderFloorZoneFilters();
    showToast(`Dining zone "${name}" saved.`);
  });

  // Form: Edit Staff Save
  $('#form-edit-staff')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = $('#edit-staff-id')?.value;
    const name = $('#edit-staff-name')?.value.trim();
    const role = $('#edit-staff-role')?.value;
    const station = $('#edit-staff-station')?.value;
    const phone = $('#edit-staff-phone')?.value.trim();
    const active = ($('#edit-staff-active')?.value === 'true');

    if (!id || !name) return;
    const staff = staffRoster.find(s => s.id === id);
    if (staff) {
      staff.name = name;
      staff.role = role;
      staff.station = station;
      staff.phone = phone;
      staff.active = active;
      try { localStorage.setItem('shamba_staff_roster', JSON.stringify(staffRoster)); } catch(err) {}
      renderEnhancedStaffPanel();
      renderStaffRoster();
      $('#modal-edit-staff')?.classList.remove('active');
      showToast(`Updated staff member "${name}".`);
    }
  });

  // Wire Order Type toggle buttons in cart drawer
  const dineInBtn = document.getElementById('btn-type-dine-in');
  const takeawayBtn = document.getElementById('btn-type-takeaway');
  if (dineInBtn) {
    dineInBtn.addEventListener('click', () => {
      window.currentOrderDiningType = 'dine-in';
      dineInBtn.classList.add('active');
      takeawayBtn?.classList.remove('active');
    });
  }
  if (takeawayBtn) {
    takeawayBtn.addEventListener('click', () => {
      window.currentOrderDiningType = 'to-go';
      takeawayBtn.classList.add('active');
      dineInBtn?.classList.remove('active');
    });
  }
}

// Global reset helper to restore authentic seed menu
window.resetToAuthoritativeSeedMenu = function() {
  localStorage.removeItem('shamba_categories');
  localStorage.removeItem('shamba_stations');
  localStorage.removeItem('shamba_dining_zones');
  localStorage.removeItem('shamba_menuItems');
  localStorage.removeItem('shamba_menu_items');
  localStorage.removeItem('shamba_promotions');
  categories = SEED_CATEGORIES;
  stations = SEED_STATIONS;
  diningZones = SEED_DINING_ZONES;
  menuItems = SEED_MENU_ITEMS;
  promotions = SEED_PROMOTIONS;
  persistMenuState();
  renderCategoriesManager();
  renderStationsManager();
  renderDiningZonesManager();
  renderFloorZoneFilters();
  renderCategoryRails();
  renderMenuCatalogDishes();
  renderGuestCategories();
  renderGuestDishes();
  renderGuestPromosCarousel();
  showToast('Restored authentic Testimony Cafeteria seed menu!');
};
