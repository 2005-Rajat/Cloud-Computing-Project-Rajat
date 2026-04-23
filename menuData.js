const menuItems = [
  // Pakoras
  { id: 1, name: "Gobhi Pakora", weight: "250g", price: 75, img: "images/gobhi.png", tag: "Must Try", category: "Pakoras", desc: "Crispy cauliflower fritters in our secret spiced gram flour batter, fried golden.", veg: true },
  { id: 2, name: "Gobhi Pakora", weight: "1 Kg", price: 280, img: "images/gobhi.png", tag: "Family Pack", category: "Pakoras", desc: "The same legendary gobhi pakoras, perfect for family gatherings and celebrations.", veg: true },
  { id: 3, name: "Paneer Pakora", weight: "1 Piece", price: 30, img: "images/bread.png", tag: "Popular", category: "Pakoras", desc: "Soft cottage cheese encased in a spiced batter and deep-fried to perfection.", veg: true },
  { id: 4, name: "Bread Pakora", weight: "1 Piece", price: 35, img: "images/bread.png", tag: "Hot", category: "Pakoras", desc: "Potato-stuffed bread dipped in besan batter, a Ludhiana street favourite.", veg: true },
  { id: 5, name: "Pyaaz Pakora", weight: "250g", price: 60, img: "images/gobhi.png", tag: "Crunchy", category: "Pakoras", desc: "Thinly sliced onions coated in spiced chickpea batter, crispy and light.", veg: true },

  // Tikkis & Samosa
  { id: 6, name: "Methi Tikki", weight: "1 Piece", price: 20, img: "images/tikki.png", tag: "Special", category: "Tikkis & Samosa", desc: "Potato tikki enriched with fresh fenugreek leaves and aromatic spices.", veg: true },
  { id: 7, name: "Aloo Tikki", weight: "1 Piece", price: 20, img: "images/tikki.png", tag: "Classic", category: "Tikkis & Samosa", desc: "Golden potato patty served with tangy chutneys — a timeless street snack.", veg: true },
  { id: 8, name: "Samosa", weight: "1 Piece", price: 20, img: "images/samosa.png", tag: "Best Seller", category: "Tikkis & Samosa", desc: "Flaky pastry stuffed with spiced potatoes and peas, fried to a perfect crunch.", veg: true },
  { id: 9, name: "Samosa (Platter of 6)", weight: "6 Pieces", price: 110, img: "images/samosa.png", tag: "Value Pack", category: "Tikkis & Samosa", desc: "Six of our signature samosas — perfect for sharing with friends and family.", veg: true },

  // Beverages
  { id: 10, name: "Masala Chai", weight: "1 Cup", price: 15, img: "images/chai.png", tag: "Beverage", category: "Beverages", desc: "Aromatic tea brewed with ginger, cardamom and hand-ground spices.", veg: true },
  { id: 11, name: "Sweet Lassi", weight: "1 Glass", price: 40, img: "images/chai.png", tag: "Refreshing", category: "Beverages", desc: "Thick creamy yogurt blended with sugar, rose water and crushed ice.", veg: true },
  { id: 12, name: "Nimbu Pani", weight: "1 Glass", price: 25, img: "images/chai.png", tag: "Cool", category: "Beverages", desc: "Fresh lemon squeezed with black salt, cumin and chilled water.", veg: true },
];

const categories = ["All", "Pakoras", "Tikkis & Samosa", "Beverages"];

const reviews = [
  { name: "Harpreet S.", stars: 5, text: "The gobhi pakoras here are legendary! Been coming since I was a kid. No one does it better in all of Ludhiana.", date: "2 weeks ago" },
  { name: "Ravi K.", stars: 5, text: "Excellent taste, gobi pakore good taste. Best pakora shop in the city — must visit!", date: "1 month ago" },
  { name: "Simran M.", stars: 5, text: "Every thing is good! Food is very tasty. Only vegetarian food, very clean and hygienic.", date: "3 weeks ago" },
  { name: "Amit B.", stars: 5, text: "This is very famous pakora shop in Ludhiana. The bread pakora and samosa are outstanding.", date: "1 month ago" },
];