import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Load .env configuration ──
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envText = fs.readFileSync(envPath, 'utf8');
  envText.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx + 1).trim();
      process.env[k] = v;
    }
  });
}

const app = express();
const PORT = process.env.PORT || 3002;
const HOST = '0.0.0.0';

// Parse JSON bodies
app.use(express.json());

// ── Supabase Client Initialization ──
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes('your-project'));

let supabase = null;
if (isSupabaseConfigured) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Connected to live Supabase project:', SUPABASE_URL);
  } catch (err) {
    console.warn('Supabase initialization failed, falling back to local authoritative store:', err.message);
  }
}

// ── Authoritative Seed Data (Testimonial Cafe Venue, Actual Dishes & Exact KES Prices) ──
const VENUE = {
  id: '11111111-1111-1111-1111-111111111111',
  name: 'Testimonial Cafe',
  timezone: 'Africa/Nairobi',
  currency: 'KES'
};

const CATEGORIES = [
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

let menuCatalog = [
  {
    "id": "item-breakfast-add-ons-nescafe",
    "name": "Nescafe",
    "desc": "Nescafe – Breakfast Add-ons",
    "price": null,
    "category": "Breakfast Add-ons",
    "categoryId": "breakfast-add-ons",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
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
    "rating": 4.9,
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
    "id": "item-breakfast-add-ons-toast",
    "name": "Toast",
    "desc": "Toast – Breakfast Add-ons",
    "price": null,
    "category": "Breakfast Add-ons",
    "categoryId": "breakfast-add-ons",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
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
    "id": "item-breakfast-plates-bites-egg-name-partly-hidden-iled-egg",
    "name": "Egg (name partly hidden, '..iled Egg')",
    "desc": "Egg (name partly hidden, '..iled Egg') – Breakfast Plates & Bites",
    "price": null,
    "category": "Breakfast Plates & Bites",
    "categoryId": "breakfast-plates-bites",
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
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
    "id": "item-coffee-long-black",
    "name": "Long Black",
    "desc": "Long Black – Coffee",
    "price": null,
    "category": "Coffee",
    "categoryId": "coffee",
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
    "image": "/images/hero-banner.jpg",
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
    "id": "item-coffee-mocha-cappuccino",
    "name": "Mocha Cappuccino",
    "desc": "Mocha Cappuccino – Coffee",
    "price": null,
    "category": "Coffee",
    "categoryId": "coffee",
    "image": "/images/chicken-steak.jpg",
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
    "id": "item-coffee-vanilla-cold-espresso",
    "name": "Vanilla Cold Espresso",
    "desc": "Vanilla Cold Espresso – Coffee",
    "price": null,
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
    "image": "/images/beef-pizza.jpg",
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
    "image": "/images/tilapia-curry.jpg",
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
    "id": "item-fast-food-bhajia",
    "name": "Bhajia",
    "desc": "Bhajia – Fast Food",
    "price": null,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/chicken-steak.jpg",
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
    "id": "item-fast-food-chapati-brown",
    "name": "Chapati Brown",
    "desc": "Chapati Brown – Fast Food",
    "price": null,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 5,
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
    "id": "item-fast-food-juice",
    "name": "Juice",
    "desc": "Juice – Fast Food",
    "price": null,
    "category": "Fast Food",
    "categoryId": "fast-food",
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
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
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
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
    "image": "/images/beef-pizza.jpg",
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
    "id": "item-fishes-fish-munye",
    "name": "Fish Munye",
    "desc": "Fish Munye – Fishes",
    "price": null,
    "category": "Fishes",
    "categoryId": "fishes",
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
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
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
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
    "image": "/images/tilapia-curry.jpg",
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
    "rating": 4.9,
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
    "rating": 4.6,
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
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 5,
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
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
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
    "rating": 4.5,
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
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.9,
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
    "image": "/images/beef-pizza.jpg",
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
    "image": "/images/beef-pizza.jpg",
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
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 5,
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
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 5,
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
    "image": "/images/tilapia-curry.jpg",
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
    "image": "/images/tilapia-curry.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
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
    "image": "/images/beef-pizza.jpg",
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
    "rating": 4.5,
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
    "rating": 5,
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
    "image": "/images/hero-banner.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.8,
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
    "image": "/images/tilapia-curry.jpg",
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
    "image": "/images/tilapia-curry.jpg",
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
    "image": "/images/hero-banner.jpg",
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
    "image": "/images/tilapia-curry.jpg",
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
    "image": "/images/beef-pizza.jpg",
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
    "id": "item-hot-drinks-black-coffee",
    "name": "Black Coffee",
    "desc": "Black Coffee – Hot Drinks",
    "price": 40,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/beef-pizza.jpg",
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
    "image": "/images/tilapia-curry.jpg",
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
    "image": "/images/beef-pizza.jpg",
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
    "image": "/images/beef-pizza.jpg",
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
    "id": "item-hot-drinks-milk-glass",
    "name": "Milk Glass",
    "desc": "Milk Glass – Hot Drinks",
    "price": 50,
    "category": "Hot Drinks",
    "categoryId": "hot-drinks",
    "image": "/images/hero-banner.jpg",
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
    "image": "/images/beef-pizza.jpg",
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
    "image": "/images/tilapia-curry.jpg",
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
    "image": "/images/beef-pizza.jpg",
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
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "3-5 min",
    "rating": 5,
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
    "image": "/images/chicken-steak.jpg",
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
    "rating": 4.5,
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
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
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
    "image": "/images/beef-pizza.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.6,
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
    "image": "/images/chicken-steak.jpg",
    "is_available": true,
    "prep_time": "12-20 min",
    "rating": 4.7,
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
    "image": "/images/chicken-steak.jpg",
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
        "price": 50,
        "price_status": "confirmed",
        "basis": "Menu photo and website agree."
      }
    ]
  }
];

// Tables State
let tables = [
  { num: '01', zone: 'Garden', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t01', sessionId: null },
  { num: '02', zone: 'Garden', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t02', sessionId: null },
  { num: '03', zone: 'Terrace', capacity: 2, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t03', sessionId: null },
  { num: '04', zone: 'Terrace', capacity: 6, status: 'occupied', waiter: 'Faith W.', qr_token: 'qr-shamba-t04', sessionId: 'sess-04' },
  { num: '05', zone: 'Terrace', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t05', sessionId: null },
  { num: '06', zone: 'Main Dining', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t06', sessionId: null },
  { num: '07', zone: 'Main Dining', capacity: 8, status: 'occupied', waiter: 'Juma O.', qr_token: 'qr-shamba-t07', sessionId: 'sess-07' },
  { num: '08', zone: 'VIP Lounge', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t08', sessionId: null },
  { num: '09', zone: 'VIP Lounge', capacity: 2, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t09', sessionId: null },
  { num: '10', zone: 'Outdoor Deck', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t10', sessionId: null },
  { num: '11', zone: 'Bar Counter', capacity: 6, status: 'available', waiter: 'Kevin K.', qr_token: 'qr-shamba-t11', sessionId: null },
  { num: '12', zone: 'Bar Counter', capacity: 4, status: 'available', waiter: 'Kevin K.', qr_token: 'qr-shamba-t12', sessionId: null }
];

// Staff Roster
let staffRoster = [
  { id: 'st-01', name: 'Amina Mwangi', role: 'Shift Lead / Admin', station: 'Main Dining Floor', authManaged: true, phone: '+254 711 234 567', active: true, isAdmin: true },
  { id: 'st-02', name: 'Juma Otieno', role: 'Floor Waiter', station: 'Garden Terrace', authManaged: true, phone: '+254 722 345 678', active: true, isAdmin: false },
  { id: 'st-03', name: 'Faith Wanjiku', role: 'Head Chef', station: 'Hot Kitchen', authManaged: true, phone: '+254 733 456 789', active: true, isAdmin: false },
  { id: 'st-04', name: 'Kevin Kiprono', role: 'Bartender', station: 'Cocktail Bar', authManaged: true, phone: '+254 744 567 890', active: true, isAdmin: false },
  { id: 'st-05', name: 'Sarah Nduta', role: 'Floor Waiter', station: 'Main Dining Floor', authManaged: true, phone: '+254 755 678 901', active: true, isAdmin: false }
];

// Active Orders
let orders = [
  {
    id: 'SH-104',
    tableNo: '04',
    status: 'preparing',
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
    station: 'kitchen',
    items: [
      { name: 'Swahili Samosa Trio', qty: 2, price: 650, spice: 'Medium', side: 'Tamarind Dip' },
      { name: 'Nyama Choma Platter', qty: 1, price: 1950, spice: 'Mild', side: 'Ugali' }
    ],
    totalKes: 3250
  },
  {
    id: 'SH-107',
    tableNo: '07',
    status: 'ordered',
    createdAt: new Date(Date.now() - 4 * 60000).toISOString(),
    station: 'kitchen',
    items: [
      { name: 'Flame Grilled Chicken Steak', qty: 2, price: 1350, spice: 'Hot', side: 'Hand-Cut Fries' },
      { name: 'Coastal Tilapia Coconut Curry', qty: 1, price: 1850, spice: 'Medium', side: 'Jasmine Rice' },
      { name: 'Cold-Pressed Passion Mango', qty: 3, price: 450, spice: null, side: null }
    ],
    totalKes: 5900
  }
];

let payments = [];
let paymentAuditEvents = [];
let posSyncLogs = [];
let staffLoginLogs = [
  { id: 'log-1', timestamp: '2026-10-10 08:30:15', staffName: 'Amina Mwangi', role: 'Shift Lead / Admin', pinUsed: 'redacted', action: 'LOGIN', device: 'Terminal 01' },
  { id: 'log-2', timestamp: '2026-10-10 08:45:00', staffName: 'Juma Otieno', role: 'Floor Waiter', pinUsed: 'redacted', action: 'LOGIN', device: 'Tablet Floor 1' },
  { id: 'log-3', timestamp: '2026-10-10 09:00:22', staffName: 'Faith Wanjiku', role: 'Head Chef', pinUsed: 'redacted', action: 'LOGIN', device: 'Kitchen KDS' }
];

// ═══════════════════════════════════════════════
// REST API ENDPOINTS
// ═══════════════════════════════════════════════

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'Testimonial Cafe Testimony OS & Digital Menu',
    version: '1.4.0',
    venue: VENUE,
    supabaseConfigured: isSupabaseConfigured,
    itemCount: menuCatalog.length,
    tableCount: tables.length,
    timestamp: new Date().toISOString()
  });
});

// Menu Catalog (Categories & Dishes with authoritative pricing)
app.get('/api/menu', (req, res) => {
  res.json({
    success: true,
    venue: VENUE,
    categories: CATEGORIES,
    items: menuCatalog
  });
});

// Update dish availability
app.patch('/api/menu/:id/availability', async (req, res) => {
  const { id } = req.params;
  const { is_available, unavailable_reason } = req.body;

  const item = menuCatalog.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Menu item not found' });
  }

  item.is_available = Boolean(is_available);
  if (unavailable_reason !== undefined) {
    item.unavailable_reason = unavailable_reason;
  }

  // Also sync to Supabase if connected
  if (supabase) {
    try {
      await supabase
        .from('menu_items')
        .update({ is_available: item.is_available, unavailable_reason: item.unavailable_reason })
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase availability sync error:', e.message);
    }
  }

  res.json({ success: true, item });
});

// Admin Add Dish
app.post('/api/menu', (req, res) => {
  const { name, desc, price, category, station, prep_time, image } = req.body;
  if (!process.env.STAFF_AUTH_PROVIDER_URL) {
    return res.status(503).json({ error: 'Admin session authorization is not configured.' });
  }
  return res.status(501).json({ error: 'Admin session provider adapter required before menu mutation.' });
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price, and category are required' });
  }

  const newItem = {
    id: `item-${Date.now()}`,
    name: String(name).trim(),
    desc: String(desc || '').trim(),
    price: Number(price),
    category,
    image: image || '/images/hero-banner.jpg',
    is_available: true,
    prep_time: prep_time || '15 min',
    rating: 5.0,
    station: station || 'kitchen',
    is_new: true,
    offer_label: '',
    offer_price: null
  };

  menuCatalog.unshift(newItem);
  res.status(201).json({ success: true, item: newItem });
});

// Tables Listing
app.get('/api/tables', (req, res) => {
  res.json({
    success: true,
    tables
  });
});

// Table Merge Operation
app.post('/api/tables/merge', (req, res) => {
  const { primaryTable, secondaryTable } = req.body;
  const t1 = tables.find(t => t.num === primaryTable);
  const t2 = tables.find(t => t.num === secondaryTable);

  if (!t1 || !t2) {
    return res.status(404).json({ error: 'One or both tables not found' });
  }

  t1.mergedWith = secondaryTable;
  t1.originalCapacity = t1.capacity;
  t1.capacity = t1.capacity + t2.capacity;

  t2.mergedInto = primaryTable;
  t2.originalCapacity = t2.capacity;
  t2.status = 'occupied';

  res.json({
    success: true,
    message: `Table ${primaryTable} merged with Table ${secondaryTable} (${t1.capacity} total seats)`,
    primaryTable: t1,
    secondaryTable: t2
  });
});

// Table Unmerge Operation
app.post('/api/tables/unmerge', (req, res) => {
  const { tableNo } = req.body;
  const t = tables.find(x => x.num === tableNo);
  if (!t) return res.status(404).json({ error: 'Table not found' });

  let primary = t;
  let secondary = null;

  if (t.mergedInto) {
    primary = tables.find(x => x.num === t.mergedInto);
    secondary = t;
  } else if (t.mergedWith) {
    secondary = tables.find(x => x.num === t.mergedWith);
  }

  if (primary && secondary) {
    primary.capacity = primary.originalCapacity || 4;
    delete primary.mergedWith;
    delete primary.originalCapacity;

    secondary.capacity = secondary.originalCapacity || 4;
    secondary.status = 'available';
    delete secondary.mergedInto;
    delete secondary.originalCapacity;

    return res.json({ success: true, message: 'Tables unmerged successfully' });
  }

  res.status(400).json({ error: 'Table is not part of a merged configuration' });
});

// Open Guest Table Session (via QR token or table selection)
app.post('/api/sessions/open', (req, res) => {
  const { qr_token, table_no, party_size = 2 } = req.body;
  let table = null;

  if (qr_token) {
    table = tables.find(t => t.qr_token === qr_token);
  } else if (table_no) {
    table = tables.find(t => t.num === String(table_no).padStart(2, '0'));
  }

  if (!table) {
    return res.status(404).json({ error: 'Table not found for given QR token or number' });
  }

  if (!table.sessionId) {
    table.sessionId = `sess-${table.num}-${Date.now().toString().slice(-4)}`;
    table.status = 'occupied';
  }

  res.json({
    success: true,
    session: {
      id: table.sessionId,
      table_no: table.num,
      zone: table.zone,
      party_size: Number(party_size),
      status: 'open',
      opened_at: new Date().toISOString()
    },
    table
  });
});

// Close Table Session
app.post('/api/sessions/close', (req, res) => {
  const { table_no } = req.body;
  const table = tables.find(t => t.num === String(table_no).padStart(2, '0'));
  if (!table) return res.status(404).json({ error: 'Table not found' });

  table.status = 'available';
  table.sessionId = null;
  res.json({ success: true, message: `Session closed for Table ${table.num}` });
});

// Get Active Orders
app.get('/api/orders', (req, res) => {
  res.json({ success: true, orders });
});

// Create Order (Authoritative Total Calculated Server-Side)
app.post('/api/orders', (req, res) => {
  const { table_no, items, party_size, guest_notes } = req.body;

  if (!table_no || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'table_no and at least one item are required' });
  }

  // Authoritatively look up each item and compute total
  let serverTotalKes = 0;
  const validatedItems = [];
  let primaryStation = 'kitchen';

  for (const itemReq of items) {
    const catalogItem = menuCatalog.find(m => m.id === itemReq.id || m.name === itemReq.name);
    if (!catalogItem) {
      return res.status(400).json({ error: `Dish "${itemReq.name || itemReq.id}" is not on the active menu.` });
    }
    if (!catalogItem.is_available) {
      return res.status(400).json({ error: `Dish "${catalogItem.name}" is currently sold out.` });
    }

    const qty = Math.max(1, parseInt(itemReq.qty, 10) || 1);
    const effectivePrice = catalogItem.offer_price || catalogItem.price;
    serverTotalKes += effectivePrice * qty;

    if (catalogItem.station === 'bar') {
      primaryStation = 'bar';
    }

    validatedItems.push({
      menuItemId: catalogItem.id,
      name: catalogItem.name,
      qty,
      unitPrice: effectivePrice,
      station: catalogItem.station,
      spice: itemReq.spice || 'Medium',
      side: itemReq.side || 'Default',
      notes: itemReq.notes || ''
    });
  }

  const orderId = `SH-${Math.floor(Math.random() * 900 + 100)}`;
  const newOrder = {
    id: orderId,
    tableNo: String(table_no).padStart(2, '0'),
    status: 'ordered',
    createdAt: new Date().toISOString(),
    station: primaryStation,
    items: validatedItems,
    totalKes: serverTotalKes,
    partySize: party_size || 2,
    guestNotes: guest_notes || ''
  };

  orders.unshift(newOrder);

  // Update table status
  const table = tables.find(t => t.num === newOrder.tableNo);
  if (table) {
    table.status = 'occupied';
  }

  // POS Sync Log entry
  posSyncLogs.unshift({
    id: `pos-${Date.now()}`,
    orderId,
    direction: 'outbound',
    status: 'pending',
    posTicketRef: `POS-${orderId}`,
    createdAt: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    order: newOrder,
    message: `Order #${orderId} confirmed and routed to ${primaryStation} display`
  });
});

// Update Order Status (ordered -> preparing -> ready -> served)
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['ordered', 'preparing', 'ready', 'served', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.status = status;
  res.json({ success: true, order });
});

// Initiate Payment (Server-computed total, masked phone, STK push)
app.post('/api/payments/initiate', (req, res) => {
  const { order_id, phone_number, method = 'mpesa' } = req.body;

  const order = orders.find(o => o.id === order_id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found for payment' });
  }

  // Check existing pending payment
  const existingPending = payments.find(p => p.order_id === order_id && p.status === 'pending');
  if (existingPending) {
    return res.status(409).json({
      error: 'A payment is already pending for this order',
      payment_id: existingPending.id,
      checkout_request_id: existingPending.checkout_request_id
    });
  }

  // Mask phone
  const rawPhone = String(phone_number || '0712345678').trim();
  const maskedPhone = rawPhone.length >= 8
    ? `${rawPhone.slice(0, 4)}***${rawPhone.slice(-3)}`
    : '07XX***000';

  const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 90000 + 10000)}`;
  const idempotencyKey = `PAY-${order.id}-${Date.now()}`;

  const paymentRecord = {
    id: `pay-${Date.now()}`,
    order_id,
    amount: order.totalKes,
    currency: 'KES',
    method,
    status: 'pending',
    idempotency_key: idempotencyKey,
    checkout_request_id: checkoutRequestId,
    phone_masked: maskedPhone,
    created_at: new Date().toISOString()
  };

  payments.unshift(paymentRecord);
  paymentAuditEvents.unshift({
    payment_id: paymentRecord.id,
    event_type: 'PAYMENT_INITIATED',
    status: 'pending',
    source: 'system',
    timestamp: new Date().toISOString()
  });

  res.json({
    success: true,
    payment_id: paymentRecord.id,
    checkout_request_id: checkoutRequestId,
    amount: order.totalKes,
    currency: 'KES',
    phone_masked: maskedPhone,
    message: `STK push sent to ${maskedPhone}. Enter M-Pesa PIN on handset.`
  });
});

// Safaricom M-Pesa Webhook Callback
app.post('/api/payments/callback', (req, res) => {
  const { checkout_request_id, result_code = 0 } = req.body;

  const payment = payments.find(p => p.checkout_request_id === checkout_request_id || p.id === req.body.payment_id);
  if (!payment) {
    return res.status(404).json({ error: 'Matching payment not found' });
  }

  if (payment.status !== 'pending') {
    return res.json({ message: 'Payment already processed' });
  }

  const isSuccess = Number(result_code) === 0;
  payment.status = isSuccess ? 'success' : 'failed';
  payment.mpesa_receipt = isSuccess ? `SHB${Date.now().toString().slice(-7)}` : null;
  payment.verified_at = new Date().toISOString();

  paymentAuditEvents.unshift({
    payment_id: payment.id,
    event_type: isSuccess ? 'MPESA_SUCCESS' : 'MPESA_FAILED',
    status: payment.status,
    source: 'webhook',
    timestamp: new Date().toISOString()
  });

  if (isSuccess && payment.order_id) {
    const ord = orders.find(o => o.id === payment.order_id);
    if (ord) ord.status = 'served';
  }

  res.json({ success: true, payment });
});

// Check payment status
app.get('/api/payments/status/:checkoutRequestId', (req, res) => {
  const { checkoutRequestId } = req.params;
  const payment = payments.find(p => p.checkout_request_id === checkoutRequestId || p.id === checkoutRequestId);
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json({ success: true, payment });
});

// Staff & Admin Password Authentication & Audit Log
app.post('/api/staff/login', (req, res) => {
  const { pin, password, device = 'Browser Client' } = req.body;
  const credential = (password || pin || '').trim();
  const configuredAdmin = process.env.ADMIN_PASSWORD || 'T3st1m0n!@1c@f3';

  if (!credential) {
    return res.status(400).json({ error: 'Password or PIN required.' });
  }

  // Official Admin Credential Check
  if (credential === configuredAdmin) {
    const logEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      staffName: 'Master Admin',
      role: 'admin',
      pinUsed: '****',
      action: 'ADMIN_LOGIN',
      device
    };
    staffLoginLogs.unshift(logEntry);

    return res.json({
      success: true,
      user: {
        id: 'admin-master',
        name: 'Master Admin',
        role: 'admin',
        station: 'management',
        isAdmin: true
      }
    });
  }

  // Check custom staff members if defined
  const staff = (typeof staffRoster !== 'undefined' ? staffRoster : []).find(s => s.pin === credential && s.active);
  if (staff) {
    const logEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      staffName: staff.name,
      role: staff.role || 'staff',
      pinUsed: '****',
      action: 'STAFF_LOGIN',
      device
    };
    staffLoginLogs.unshift(logEntry);

    return res.json({
      success: true,
      user: {
        id: staff.id,
        name: staff.name,
        role: staff.role || 'staff',
        station: staff.station || 'floor',
        isAdmin: staff.role === 'admin'
      }
    });
  }

  return res.status(401).json({ error: 'Invalid password or credentials. Access denied.' });
});

// Audit Logs
app.get('/api/audit/log', (req, res) => {
  res.json({
    success: true,
    logs: staffLoginLogs
  });
});

// ═══════════════════════════════════════════════
// STATIC FILES & CLIENT SERVING
// ═══════════════════════════════════════════════

// Serve root directory static assets (app.js, styles.css, index.html, images, fonts)
app.use(express.static(__dirname));

// Serve public directory static assets
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// Table QR token redirect /t/:token -> /?table=:num
app.get('/t/:token', (req, res) => {
  const { token } = req.params;
  const table = tables.find(t => t.qr_token === token);
  if (table) {
    return res.redirect(`/?table=${table.num}&token=${token}`);
  }
  res.redirect(`/?token=${token}`);
});

// SPA guest routes
app.get(['/guest', '/menu'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler for API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    documentation: 'Testimonial Cafe Testimony OS API v1.4.0'
  });
});

// Single Page Application fallback for all navigation requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Testimonial Cafe Testimony OS running at http://${HOST}:${PORT}`);
});
