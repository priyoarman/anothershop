// Product catalog shared by the storefront and the checkout server.
// Products 1-20 come from fakestoreapi.com, the rest from dummyjson.com.
const products = [
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  },
  {
    "id": 3,
    "title": "Mens Cotton Jacket",
    "price": 55.99,
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    "rating": {
      "rate": 4.7,
      "count": 500
    }
  },
  {
    "id": 4,
    "title": "Mens Casual Slim Fit",
    "price": 15.99,
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
    "rating": {
      "rate": 2.1,
      "count": 430
    }
  },
  {
    "id": 5,
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
    "rating": {
      "rate": 4.6,
      "count": 400
    }
  },
  {
    "id": 6,
    "title": "Solid Gold Petite Micropave ",
    "price": 168,
    "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
    "rating": {
      "rate": 3.9,
      "count": 70
    }
  },
  {
    "id": 7,
    "title": "White Gold Plated Princess",
    "price": 9.99,
    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
    "rating": {
      "rate": 3,
      "count": 400
    }
  },
  {
    "id": 8,
    "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "price": 10.99,
    "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
    "rating": {
      "rate": 1.9,
      "count": 100
    }
  },
  {
    "id": 9,
    "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    "price": 64,
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
    "rating": {
      "rate": 3.3,
      "count": 203
    }
  },
  {
    "id": 10,
    "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    "price": 109,
    "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png",
    "rating": {
      "rate": 2.9,
      "count": 470
    }
  },
  {
    "id": 11,
    "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    "price": 109,
    "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
    "rating": {
      "rate": 4.8,
      "count": 319
    }
  },
  {
    "id": 12,
    "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    "price": 114,
    "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
    "rating": {
      "rate": 4.8,
      "count": 400
    }
  },
  {
    "id": 13,
    "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    "price": 599,
    "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png",
    "rating": {
      "rate": 2.9,
      "count": 250
    }
  },
  {
    "id": 14,
    "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    "price": 999.99,
    "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png",
    "rating": {
      "rate": 2.2,
      "count": 140
    }
  },
  {
    "id": 15,
    "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    "price": 56.99,
    "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
    "rating": {
      "rate": 2.6,
      "count": 235
    }
  },
  {
    "id": 16,
    "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    "price": 29.95,
    "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png",
    "rating": {
      "rate": 2.9,
      "count": 340
    }
  },
  {
    "id": 17,
    "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    "price": 39.99,
    "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
    "rating": {
      "rate": 3.8,
      "count": 679
    }
  },
  {
    "id": 18,
    "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    "price": 9.85,
    "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png",
    "rating": {
      "rate": 4.7,
      "count": 130
    }
  },
  {
    "id": 19,
    "title": "Opna Women's Short Sleeve Moisture",
    "price": 7.95,
    "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png",
    "rating": {
      "rate": 4.5,
      "count": 146
    }
  },
  {
    "id": 20,
    "title": "DANVOUY Womens T Shirt Casual Cotton Short",
    "price": 12.99,
    "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
    "rating": {
      "rate": 3.6,
      "count": 145
    }
  },
  {
    "id": 21,
    "title": "Essence Mascara Lash Princess",
    "price": 9.99,
    "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    "rating": {
      "rate": 2.6,
      "count": 3
    }
  },
  {
    "id": 22,
    "title": "Eyeshadow Palette with Mirror",
    "price": 19.99,
    "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 23,
    "title": "Powder Canister",
    "price": 14.99,
    "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
    "rating": {
      "rate": 4.6,
      "count": 3
    }
  },
  {
    "id": 24,
    "title": "Red Lipstick",
    "price": 12.99,
    "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
    "rating": {
      "rate": 4.4,
      "count": 3
    }
  },
  {
    "id": 25,
    "title": "Red Nail Polish",
    "price": 8.99,
    "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
    "rating": {
      "rate": 4.3,
      "count": 3
    }
  },
  {
    "id": 26,
    "title": "Calvin Klein CK One",
    "price": 49.99,
    "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
    "rating": {
      "rate": 4.4,
      "count": 3
    }
  },
  {
    "id": 27,
    "title": "Chanel Coco Noir Eau De",
    "price": 129.99,
    "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
    "rating": {
      "rate": 4.3,
      "count": 3
    }
  },
  {
    "id": 28,
    "title": "Dior J'adore",
    "price": 89.99,
    "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
    "rating": {
      "rate": 3.8,
      "count": 3
    }
  },
  {
    "id": 29,
    "title": "Dolce Shine Eau de",
    "price": 69.99,
    "description": "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp",
    "rating": {
      "rate": 4,
      "count": 3
    }
  },
  {
    "id": 30,
    "title": "Gucci Bloom Eau de",
    "price": 79.99,
    "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
    "rating": {
      "rate": 2.7,
      "count": 3
    }
  },
  {
    "id": 31,
    "title": "Annibale Colombo Bed",
    "price": 1899.99,
    "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
    "rating": {
      "rate": 4.8,
      "count": 3
    }
  },
  {
    "id": 32,
    "title": "Annibale Colombo Sofa",
    "price": 2499.99,
    "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp",
    "rating": {
      "rate": 3.9,
      "count": 3
    }
  },
  {
    "id": 33,
    "title": "Bedside Table African Cherry",
    "price": 299.99,
    "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 34,
    "title": "Knoll Saarinen Executive Conference Chair",
    "price": 499.99,
    "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp",
    "rating": {
      "rate": 4.9,
      "count": 3
    }
  },
  {
    "id": 35,
    "title": "Wooden Bathroom Sink With Mirror",
    "price": 799.99,
    "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp",
    "rating": {
      "rate": 3.6,
      "count": 3
    }
  },
  {
    "id": 36,
    "title": "Apple",
    "price": 1.99,
    "description": "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 37,
    "title": "Beef Steak",
    "price": 12.99,
    "description": "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/beef-steak/1.webp",
    "rating": {
      "rate": 4.5,
      "count": 3
    }
  },
  {
    "id": 38,
    "title": "Cat Food",
    "price": 8.99,
    "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/cat-food/1.webp",
    "rating": {
      "rate": 3.1,
      "count": 3
    }
  },
  {
    "id": 39,
    "title": "Chicken Meat",
    "price": 9.99,
    "description": "Fresh and tender chicken meat, suitable for various culinary preparations.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 40,
    "title": "Cooking Oil",
    "price": 4.99,
    "description": "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/1.webp",
    "rating": {
      "rate": 4.8,
      "count": 3
    }
  },
  {
    "id": 41,
    "title": "Cucumber",
    "price": 1.49,
    "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/cucumber/1.webp",
    "rating": {
      "rate": 4.1,
      "count": 3
    }
  },
  {
    "id": 42,
    "title": "Dog Food",
    "price": 10.99,
    "description": "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/dog-food/1.webp",
    "rating": {
      "rate": 4.6,
      "count": 3
    }
  },
  {
    "id": 43,
    "title": "Eggs",
    "price": 2.99,
    "description": "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/eggs/1.webp",
    "rating": {
      "rate": 2.5,
      "count": 3
    }
  },
  {
    "id": 44,
    "title": "Fish Steak",
    "price": 14.99,
    "description": "Quality fish steak, suitable for grilling, baking, or pan-searing.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/fish-steak/1.webp",
    "rating": {
      "rate": 3.8,
      "count": 3
    }
  },
  {
    "id": 45,
    "title": "Green Bell Pepper",
    "price": 1.29,
    "description": "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/1.webp",
    "rating": {
      "rate": 3.3,
      "count": 3
    }
  },
  {
    "id": 46,
    "title": "Green Chili Pepper",
    "price": 0.99,
    "description": "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/1.webp",
    "rating": {
      "rate": 3.7,
      "count": 3
    }
  },
  {
    "id": 47,
    "title": "Honey Jar",
    "price": 6.99,
    "description": "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp",
    "rating": {
      "rate": 4,
      "count": 3
    }
  },
  {
    "id": 48,
    "title": "Ice Cream",
    "price": 5.49,
    "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp",
    "rating": {
      "rate": 3.4,
      "count": 3
    }
  },
  {
    "id": 49,
    "title": "Juice",
    "price": 3.99,
    "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/juice/1.webp",
    "rating": {
      "rate": 3.9,
      "count": 3
    }
  },
  {
    "id": 50,
    "title": "Kiwi",
    "price": 2.49,
    "description": "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/kiwi/1.webp",
    "rating": {
      "rate": 4.9,
      "count": 3
    }
  },
  {
    "id": 51,
    "title": "Lemon",
    "price": 0.79,
    "description": "Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/lemon/1.webp",
    "rating": {
      "rate": 3.5,
      "count": 3
    }
  },
  {
    "id": 52,
    "title": "Milk",
    "price": 3.49,
    "description": "Fresh and nutritious milk, a staple for various recipes and daily consumption.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/milk/1.webp",
    "rating": {
      "rate": 2.6,
      "count": 3
    }
  },
  {
    "id": 53,
    "title": "Mulberry",
    "price": 4.99,
    "description": "Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/mulberry/1.webp",
    "rating": {
      "rate": 5,
      "count": 3
    }
  },
  {
    "id": 54,
    "title": "Nescafe Coffee",
    "price": 7.99,
    "description": "Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/1.webp",
    "rating": {
      "rate": 4.8,
      "count": 3
    }
  },
  {
    "id": 55,
    "title": "Potatoes",
    "price": 2.29,
    "description": "Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/potatoes/1.webp",
    "rating": {
      "rate": 4.8,
      "count": 3
    }
  },
  {
    "id": 56,
    "title": "Protein Powder",
    "price": 19.99,
    "description": "Nutrient-packed protein powder, ideal for supplementing your diet with essential proteins.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/protein-powder/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 57,
    "title": "Red Onions",
    "price": 1.99,
    "description": "Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/red-onions/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 58,
    "title": "Rice",
    "price": 5.99,
    "description": "High-quality rice, a staple for various cuisines and a versatile base for many dishes.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/rice/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 59,
    "title": "Soft Drinks",
    "price": 1.99,
    "description": "Assorted soft drinks in various flavors, perfect for refreshing beverages.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/1.webp",
    "rating": {
      "rate": 4.8,
      "count": 3
    }
  },
  {
    "id": 60,
    "title": "Strawberry",
    "price": 3.99,
    "description": "Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/strawberry/1.webp",
    "rating": {
      "rate": 3.1,
      "count": 3
    }
  },
  {
    "id": 61,
    "title": "Tissue Paper Box",
    "price": 2.49,
    "description": "Convenient tissue paper box for everyday use, providing soft and absorbent tissues.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/1.webp",
    "rating": {
      "rate": 2.7,
      "count": 3
    }
  },
  {
    "id": 62,
    "title": "Water",
    "price": 0.99,
    "description": "Pure and refreshing bottled water, essential for staying hydrated throughout the day.",
    "category": "groceries",
    "image": "https://cdn.dummyjson.com/product-images/groceries/water/1.webp",
    "rating": {
      "rate": 5,
      "count": 3
    }
  },
  {
    "id": 63,
    "title": "Decoration Swing",
    "price": 59.99,
    "description": "The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 64,
    "title": "Family Tree Photo Frame",
    "price": 29.99,
    "description": "The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp",
    "rating": {
      "rate": 4.5,
      "count": 3
    }
  },
  {
    "id": 65,
    "title": "House Showpiece Plant",
    "price": 39.99,
    "description": "The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/1.webp",
    "rating": {
      "rate": 4.7,
      "count": 3
    }
  },
  {
    "id": 66,
    "title": "Plant Pot",
    "price": 14.99,
    "description": "The Plant Pot is a stylish container for your favorite plants. With a sleek design, it complements your indoor or outdoor garden, adding a modern touch to your plant display.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/1.webp",
    "rating": {
      "rate": 3,
      "count": 3
    }
  },
  {
    "id": 67,
    "title": "Table Lamp",
    "price": 49.99,
    "description": "The Table Lamp is a functional and decorative lighting solution for your living space. With a modern design, it provides both ambient and task lighting, enhancing the atmosphere.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp",
    "rating": {
      "rate": 3.6,
      "count": 3
    }
  },
  {
    "id": 68,
    "title": "Bamboo Spatula",
    "price": 7.99,
    "description": "The Bamboo Spatula is a versatile kitchen tool made from eco-friendly bamboo. Ideal for flipping, stirring, and serving various dishes.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/1.webp",
    "rating": {
      "rate": 3.3,
      "count": 3
    }
  },
  {
    "id": 69,
    "title": "Black Aluminium Cup",
    "price": 5.99,
    "description": "The Black Aluminium Cup is a stylish and durable cup suitable for both hot and cold beverages. Its sleek black design adds a modern touch to your drinkware collection.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp",
    "rating": {
      "rate": 4.5,
      "count": 3
    }
  },
  {
    "id": 70,
    "title": "Black Whisk",
    "price": 9.99,
    "description": "The Black Whisk is a kitchen essential for whisking and beating ingredients. Its ergonomic handle and sleek design make it a practical and stylish tool.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/1.webp",
    "rating": {
      "rate": 3.9,
      "count": 3
    }
  },
  {
    "id": 71,
    "title": "Boxed Blender",
    "price": 39.99,
    "description": "The Boxed Blender is a powerful and compact blender perfect for smoothies, shakes, and more. Its convenient design and multiple functions make it a versatile kitchen appliance.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp",
    "rating": {
      "rate": 4.6,
      "count": 3
    }
  },
  {
    "id": 72,
    "title": "Carbon Steel Wok",
    "price": 29.99,
    "description": "The Carbon Steel Wok is a versatile cooking pan suitable for stir-frying, sautéing, and deep frying. Its sturdy construction ensures even heat distribution for delicious meals.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/1.webp",
    "rating": {
      "rate": 4.1,
      "count": 3
    }
  },
  {
    "id": 73,
    "title": "Chopping Board",
    "price": 12.99,
    "description": "The Chopping Board is an essential kitchen accessory for food preparation. Made from durable material, it provides a safe and hygienic surface for cutting and chopping.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/1.webp",
    "rating": {
      "rate": 3.7,
      "count": 3
    }
  },
  {
    "id": 74,
    "title": "Citrus Squeezer Yellow",
    "price": 8.99,
    "description": "The Citrus Squeezer in Yellow is a handy tool for extracting juice from citrus fruits. Its vibrant color adds a cheerful touch to your kitchen gadgets.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/1.webp",
    "rating": {
      "rate": 4.6,
      "count": 3
    }
  },
  {
    "id": 75,
    "title": "Egg Slicer",
    "price": 6.99,
    "description": "The Egg Slicer is a convenient tool for slicing boiled eggs evenly. It's perfect for salads, sandwiches, and other dishes where sliced eggs are desired.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/1.webp",
    "rating": {
      "rate": 3.1,
      "count": 3
    }
  },
  {
    "id": 76,
    "title": "Electric Stove",
    "price": 49.99,
    "description": "The Electric Stove provides a portable and efficient cooking solution. Ideal for small kitchens or as an additional cooking surface for various culinary needs.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp",
    "rating": {
      "rate": 4.1,
      "count": 3
    }
  },
  {
    "id": 77,
    "title": "Fine Mesh Strainer",
    "price": 9.99,
    "description": "The Fine Mesh Strainer is a versatile tool for straining liquids and sifting dry ingredients. Its fine mesh ensures efficient filtering for smooth cooking and baking.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/1.webp",
    "rating": {
      "rate": 3,
      "count": 3
    }
  },
  {
    "id": 78,
    "title": "Fork",
    "price": 3.99,
    "description": "The Fork is a classic utensil for various dining and serving purposes. Its durable and ergonomic design makes it a reliable choice for everyday use.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/1.webp",
    "rating": {
      "rate": 3.1,
      "count": 3
    }
  },
  {
    "id": 79,
    "title": "Glass",
    "price": 4.99,
    "description": "The Glass is a versatile and elegant drinking vessel suitable for a variety of beverages. Its clear design allows you to enjoy the colors and textures of your drinks.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/1.webp",
    "rating": {
      "rate": 4,
      "count": 3
    }
  },
  {
    "id": 80,
    "title": "Grater Black",
    "price": 10.99,
    "description": "The Grater in Black is a handy kitchen tool for grating cheese, vegetables, and more. Its sleek design and sharp blades make food preparation efficient and easy.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 81,
    "title": "Hand Blender",
    "price": 34.99,
    "description": "The Hand Blender is a versatile kitchen appliance for blending, pureeing, and mixing. Its compact design and powerful motor make it a convenient tool for various recipes.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp",
    "rating": {
      "rate": 3.9,
      "count": 3
    }
  },
  {
    "id": 82,
    "title": "Ice Cube Tray",
    "price": 5.99,
    "description": "The Ice Cube Tray is a practical accessory for making ice cubes in various shapes. Perfect for keeping your drinks cool and adding a fun element to your beverages.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/1.webp",
    "rating": {
      "rate": 4.7,
      "count": 3
    }
  },
  {
    "id": 83,
    "title": "Kitchen Sieve",
    "price": 7.99,
    "description": "The Kitchen Sieve is a versatile tool for sifting and straining dry and wet ingredients. Its fine mesh design ensures smooth results in your cooking and baking.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/1.webp",
    "rating": {
      "rate": 3.1,
      "count": 3
    }
  },
  {
    "id": 84,
    "title": "Knife",
    "price": 14.99,
    "description": "The Knife is an essential kitchen tool for chopping, slicing, and dicing. Its sharp blade and ergonomic handle make it a reliable choice for food preparation.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/1.webp",
    "rating": {
      "rate": 3.3,
      "count": 3
    }
  },
  {
    "id": 85,
    "title": "Lunch Box",
    "price": 12.99,
    "description": "The Lunch Box is a convenient and portable container for packing and carrying your meals. With compartments for different foods, it's perfect for on-the-go dining.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/1.webp",
    "rating": {
      "rate": 4.9,
      "count": 3
    }
  },
  {
    "id": 86,
    "title": "Microwave Oven",
    "price": 89.99,
    "description": "The Microwave Oven is a versatile kitchen appliance for quick and efficient cooking, reheating, and defrosting. Its compact size makes it suitable for various kitchen setups.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/1.webp",
    "rating": {
      "rate": 4.8,
      "count": 3
    }
  },
  {
    "id": 87,
    "title": "Mug Tree Stand",
    "price": 15.99,
    "description": "The Mug Tree Stand is a stylish and space-saving solution for organizing your mugs. Keep your favorite mugs easily accessible and neatly displayed in your kitchen.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/1.webp",
    "rating": {
      "rate": 2.6,
      "count": 3
    }
  },
  {
    "id": 88,
    "title": "Pan",
    "price": 24.99,
    "description": "The Pan is a versatile and essential cookware item for frying, sautéing, and cooking various dishes. Its non-stick coating ensures easy food release and cleanup.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/1.webp",
    "rating": {
      "rate": 2.8,
      "count": 3
    }
  },
  {
    "id": 89,
    "title": "Plate",
    "price": 3.99,
    "description": "The Plate is a classic and essential dishware item for serving meals. Its durable and stylish design makes it suitable for everyday use or special occasions.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/1.webp",
    "rating": {
      "rate": 3.7,
      "count": 3
    }
  },
  {
    "id": 90,
    "title": "Red Tongs",
    "price": 6.99,
    "description": "The Red Tongs are versatile kitchen tongs suitable for various cooking and serving tasks. Their vibrant color adds a pop of excitement to your kitchen utensils.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/1.webp",
    "rating": {
      "rate": 4.4,
      "count": 3
    }
  },
  {
    "id": 91,
    "title": "Silver Pot With Glass Cap",
    "price": 39.99,
    "description": "The Silver Pot with Glass Cap is a stylish and functional cookware item for boiling, simmering, and preparing delicious meals. Its glass cap allows you to monitor cooking progress.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 92,
    "title": "Slotted Turner",
    "price": 8.99,
    "description": "The Slotted Turner is a kitchen utensil designed for flipping and turning food items. Its slotted design allows excess liquid to drain, making it ideal for frying and sautéing.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/1.webp",
    "rating": {
      "rate": 3.4,
      "count": 3
    }
  },
  {
    "id": 93,
    "title": "Spice Rack",
    "price": 19.99,
    "description": "The Spice Rack is a convenient organizer for your spices and seasonings. Keep your kitchen essentials within reach and neatly arranged with this stylish spice rack.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/1.webp",
    "rating": {
      "rate": 4.9,
      "count": 3
    }
  },
  {
    "id": 94,
    "title": "Spoon",
    "price": 4.99,
    "description": "The Spoon is a versatile kitchen utensil for stirring, serving, and tasting. Its ergonomic design and durable construction make it an essential tool for every kitchen.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/1.webp",
    "rating": {
      "rate": 4,
      "count": 3
    }
  },
  {
    "id": 95,
    "title": "Tray",
    "price": 16.99,
    "description": "The Tray is a functional and decorative item for serving snacks, appetizers, or drinks. Its stylish design makes it a versatile accessory for entertaining guests.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/1.webp",
    "rating": {
      "rate": 4.6,
      "count": 3
    }
  },
  {
    "id": 96,
    "title": "Wooden Rolling Pin",
    "price": 11.99,
    "description": "The Wooden Rolling Pin is a classic kitchen tool for rolling out dough for baking. Its smooth surface and sturdy handles make it easy to achieve uniform thickness.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 97,
    "title": "Yellow Peeler",
    "price": 5.99,
    "description": "The Yellow Peeler is a handy tool for peeling fruits and vegetables with ease. Its bright yellow color adds a cheerful touch to your kitchen gadgets.",
    "category": "home & kitchen",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 98,
    "title": "Apple MacBook Pro 14 Inch Space Grey",
    "price": 1999.99,
    "description": "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
    "rating": {
      "rate": 3.7,
      "count": 3
    }
  },
  {
    "id": 99,
    "title": "Asus Zenbook Pro Dual Screen Laptop",
    "price": 1799.99,
    "description": "The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp",
    "rating": {
      "rate": 4,
      "count": 3
    }
  },
  {
    "id": 100,
    "title": "Huawei Matebook X Pro",
    "price": 1399.99,
    "description": "The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp",
    "rating": {
      "rate": 5,
      "count": 3
    }
  },
  {
    "id": 101,
    "title": "Lenovo Yoga 920",
    "price": 1099.99,
    "description": "The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 102,
    "title": "New DELL XPS 13 9300 Laptop",
    "price": 1499.99,
    "description": "The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp",
    "rating": {
      "rate": 2.7,
      "count": 3
    }
  },
  {
    "id": 103,
    "title": "Blue & Black Check Shirt",
    "price": 29.99,
    "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
    "rating": {
      "rate": 3.6,
      "count": 3
    }
  },
  {
    "id": 104,
    "title": "Gigabyte Aorus Men Tshirt",
    "price": 24.99,
    "description": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 105,
    "title": "Man Plaid Shirt",
    "price": 34.99,
    "description": "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
    "rating": {
      "rate": 3.5,
      "count": 3
    }
  },
  {
    "id": 106,
    "title": "Man Short Sleeve Shirt",
    "price": 19.99,
    "description": "The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 107,
    "title": "Men Check Shirt",
    "price": 27.99,
    "description": "The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
    "rating": {
      "rate": 2.7,
      "count": 3
    }
  },
  {
    "id": 108,
    "title": "Nike Air Jordan 1 Red And Black",
    "price": 149.99,
    "description": "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
    "rating": {
      "rate": 4.8,
      "count": 3
    }
  },
  {
    "id": 109,
    "title": "Nike Baseball Cleats",
    "price": 79.99,
    "description": "Nike Baseball Cleats are designed for maximum traction and performance on the baseball field. They provide stability and support for players during games and practices.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp",
    "rating": {
      "rate": 3.9,
      "count": 3
    }
  },
  {
    "id": 110,
    "title": "Puma Future Rider Trainers",
    "price": 89.99,
    "description": "The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp",
    "rating": {
      "rate": 4.9,
      "count": 3
    }
  },
  {
    "id": 111,
    "title": "Sports Sneakers Off White & Red",
    "price": 119.99,
    "description": "The Sports Sneakers in Off White and Red combine style and functionality, making them a fashionable choice for sports enthusiasts. The red and off-white color combination adds a bold and energetic touch.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp",
    "rating": {
      "rate": 4.8,
      "count": 3
    }
  },
  {
    "id": 112,
    "title": "Sports Sneakers Off White Red",
    "price": 109.99,
    "description": "Another variant of the Sports Sneakers in Off White Red, featuring a unique design. These sneakers offer style and comfort for casual occasions.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/1.webp",
    "rating": {
      "rate": 4.7,
      "count": 3
    }
  },
  {
    "id": 113,
    "title": "Brown Leather Belt Watch",
    "price": 89.99,
    "description": "The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 114,
    "title": "Longines Master Collection",
    "price": 1499.99,
    "description": "The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it's a symbol of luxury and sophistication.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
    "rating": {
      "rate": 3.9,
      "count": 3
    }
  },
  {
    "id": 115,
    "title": "Rolex Cellini Date Black Dial",
    "price": 8999.99,
    "description": "The Rolex Cellini Date with Black Dial is a classic and prestigious watch. With a black dial and date complication, it exudes sophistication and is a symbol of Rolex's heritage.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
    "rating": {
      "rate": 5,
      "count": 3
    }
  },
  {
    "id": 116,
    "title": "Rolex Cellini Moonphase",
    "price": 12999.99,
    "description": "The Rolex Cellini Moonphase is a masterpiece of horology, featuring a moon phase complication and exquisite design. It reflects Rolex's commitment to precision and elegance.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
    "rating": {
      "rate": 2.6,
      "count": 3
    }
  },
  {
    "id": 117,
    "title": "Rolex Datejust",
    "price": 10999.99,
    "description": "The Rolex Datejust is an iconic and versatile timepiece with a date window. Known for its timeless design and reliability, it's a symbol of Rolex's watchmaking excellence.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
    "rating": {
      "rate": 3.7,
      "count": 3
    }
  },
  {
    "id": 118,
    "title": "Rolex Submariner Watch",
    "price": 13999.99,
    "description": "The Rolex Submariner is a legendary dive watch with a rich history. Known for its durability and water resistance, it's a symbol of adventure and exploration.",
    "category": "men's clothing",
    "image": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
    "rating": {
      "rate": 2.7,
      "count": 3
    }
  },
  {
    "id": 119,
    "title": "Amazon Echo Plus",
    "price": 99.99,
    "description": "The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp",
    "rating": {
      "rate": 5,
      "count": 3
    }
  },
  {
    "id": 120,
    "title": "Apple Airpods",
    "price": 129.99,
    "description": "The Apple Airpods offer a seamless wireless audio experience. With easy pairing, high-quality sound, and Siri integration, they are perfect for on-the-go listening.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 121,
    "title": "Apple AirPods Max Silver",
    "price": 549.99,
    "description": "The Apple AirPods Max in Silver are premium over-ear headphones with high-fidelity audio, adaptive EQ, and active noise cancellation. Experience immersive sound in style.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp",
    "rating": {
      "rate": 3.5,
      "count": 3
    }
  },
  {
    "id": 122,
    "title": "Apple Airpower Wireless Charger",
    "price": 79.99,
    "description": "The Apple AirPower Wireless Charger provides a convenient way to charge your compatible Apple devices wirelessly. Simply place your devices on the charging mat for effortless charging.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp",
    "rating": {
      "rate": 3.7,
      "count": 3
    }
  },
  {
    "id": 123,
    "title": "Apple HomePod Mini Cosmic Grey",
    "price": 99.99,
    "description": "The Apple HomePod Mini in Cosmic Grey is a compact smart speaker that delivers impressive audio and integrates seamlessly with the Apple ecosystem for a smart home experience.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/1.webp",
    "rating": {
      "rate": 4.6,
      "count": 3
    }
  },
  {
    "id": 124,
    "title": "Apple iPhone Charger",
    "price": 19.99,
    "description": "The Apple iPhone Charger is a high-quality charger designed for fast and efficient charging of your iPhone. Ensure your device stays powered up and ready to go.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 125,
    "title": "Apple MagSafe Battery Pack",
    "price": 99.99,
    "description": "The Apple MagSafe Battery Pack is a portable and convenient way to add extra battery life to your MagSafe-compatible iPhone. Attach it magnetically for a secure connection.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp",
    "rating": {
      "rate": 3.6,
      "count": 3
    }
  },
  {
    "id": 126,
    "title": "Apple Watch Series 4 Gold",
    "price": 349.99,
    "description": "The Apple Watch Series 4 in Gold is a stylish and advanced smartwatch with features like heart rate monitoring, fitness tracking, and a beautiful Retina display.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/1.webp",
    "rating": {
      "rate": 2.7,
      "count": 3
    }
  },
  {
    "id": 127,
    "title": "Beats Flex Wireless Earphones",
    "price": 49.99,
    "description": "The Beats Flex Wireless Earphones offer a comfortable and versatile audio experience. With magnetic earbuds and up to 12 hours of battery life, they are ideal for everyday use.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 128,
    "title": "iPhone 12 Silicone Case with MagSafe Plum",
    "price": 29.99,
    "description": "The iPhone 12 Silicone Case with MagSafe in Plum is a stylish and protective case designed for the iPhone 12. It features MagSafe technology for easy attachment of accessories.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp",
    "rating": {
      "rate": 3.6,
      "count": 3
    }
  },
  {
    "id": 129,
    "title": "Monopod",
    "price": 19.99,
    "description": "The Monopod is a versatile camera accessory for stable and adjustable shooting. Perfect for capturing selfies, group photos, and videos with ease.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/monopod/1.webp",
    "rating": {
      "rate": 4.4,
      "count": 3
    }
  },
  {
    "id": 130,
    "title": "Selfie Lamp with iPhone",
    "price": 14.99,
    "description": "The Selfie Lamp with iPhone is a portable and adjustable LED light designed to enhance your selfies and video calls. Attach it to your iPhone for well-lit photos.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-lamp-with-iphone/1.webp",
    "rating": {
      "rate": 3.6,
      "count": 3
    }
  },
  {
    "id": 131,
    "title": "Selfie Stick Monopod",
    "price": 12.99,
    "description": "The Selfie Stick Monopod is a extendable and foldable device for capturing the perfect selfie or group photo. Compatible with smartphones and cameras.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/1.webp",
    "rating": {
      "rate": 3.9,
      "count": 3
    }
  },
  {
    "id": 132,
    "title": "TV Studio Camera Pedestal",
    "price": 499.99,
    "description": "The TV Studio Camera Pedestal is a professional-grade camera support system for smooth and precise camera movements in a studio setting. Ideal for broadcast and production.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/tv-studio-camera-pedestal/1.webp",
    "rating": {
      "rate": 2.8,
      "count": 3
    }
  },
  {
    "id": 133,
    "title": "Attitude Super Leaves Hand Soap",
    "price": 8.99,
    "description": "Attitude Super Leaves Hand Soap is a natural and nourishing hand soap enriched with the goodness of super leaves. It cleanses and moisturizes your hands, leaving them feeling fresh and soft.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 134,
    "title": "Olay Ultra Moisture Shea Butter Body Wash",
    "price": 12.99,
    "description": "Olay Ultra Moisture Shea Butter Body Wash is a luxurious body wash that hydrates and nourishes your skin with the moisturizing power of shea butter. Enjoy a rich lather and silky-smooth skin.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/1.webp",
    "rating": {
      "rate": 4.5,
      "count": 3
    }
  },
  {
    "id": 135,
    "title": "Vaseline Men Body and Face Lotion",
    "price": 9.99,
    "description": "Vaseline Men Body and Face Lotion is a specially formulated lotion designed to provide long-lasting moisture to men's skin. It absorbs quickly and helps keep the skin hydrated and healthy.",
    "category": "beauty",
    "image": "https://cdn.dummyjson.com/product-images/skin-care/vaseline-men-body-and-face-lotion/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 136,
    "title": "iPhone 5s",
    "price": 199.99,
    "description": "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp",
    "rating": {
      "rate": 2.8,
      "count": 3
    }
  },
  {
    "id": 137,
    "title": "iPhone 6",
    "price": 299.99,
    "description": "The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp",
    "rating": {
      "rate": 3.4,
      "count": 3
    }
  },
  {
    "id": 138,
    "title": "iPhone 13 Pro",
    "price": 1099.99,
    "description": "The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
    "rating": {
      "rate": 4.1,
      "count": 3
    }
  },
  {
    "id": 139,
    "title": "iPhone X",
    "price": 899.99,
    "description": "The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/1.webp",
    "rating": {
      "rate": 2.5,
      "count": 3
    }
  },
  {
    "id": 140,
    "title": "Oppo A57",
    "price": 249.99,
    "description": "The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/1.webp",
    "rating": {
      "rate": 3.9,
      "count": 3
    }
  },
  {
    "id": 141,
    "title": "Oppo F19 Pro Plus",
    "price": 399.99,
    "description": "The Oppo F19 Pro Plus is a feature-rich smartphone with a focus on camera capabilities. It boasts advanced photography features and a powerful performance for a premium user experience.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp",
    "rating": {
      "rate": 3.5,
      "count": 3
    }
  },
  {
    "id": 142,
    "title": "Oppo K1",
    "price": 299.99,
    "description": "The Oppo K1 series offers a range of smartphones with various features and specifications. Known for their stylish design and reliable performance, the Oppo K1 series caters to diverse user preferences.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/1.webp",
    "rating": {
      "rate": 4.3,
      "count": 3
    }
  },
  {
    "id": 143,
    "title": "Realme C35",
    "price": 149.99,
    "description": "The Realme C35 is a budget-friendly smartphone with a focus on providing essential features for everyday use. It offers a reliable performance and user-friendly experience.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 144,
    "title": "Realme X",
    "price": 299.99,
    "description": "The Realme X is a mid-range smartphone known for its sleek design and impressive display. It offers a good balance of performance and camera capabilities for users seeking a quality device.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/realme-x/1.webp",
    "rating": {
      "rate": 3.7,
      "count": 3
    }
  },
  {
    "id": 145,
    "title": "Realme XT",
    "price": 349.99,
    "description": "The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/1.webp",
    "rating": {
      "rate": 4.6,
      "count": 3
    }
  },
  {
    "id": 146,
    "title": "Samsung Galaxy S7",
    "price": 299.99,
    "description": "The Samsung Galaxy S7 is a flagship smartphone known for its sleek design and advanced features. It features a high-resolution display, powerful camera, and robust performance.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/1.webp",
    "rating": {
      "rate": 3.3,
      "count": 3
    }
  },
  {
    "id": 147,
    "title": "Samsung Galaxy S8",
    "price": 499.99,
    "description": "The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp",
    "rating": {
      "rate": 4.4,
      "count": 3
    }
  },
  {
    "id": 148,
    "title": "Samsung Galaxy S10",
    "price": 699.99,
    "description": "The Samsung Galaxy S10 is a flagship device featuring a dynamic AMOLED display, versatile camera system, and powerful performance. It represents innovation and excellence in smartphone technology.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp",
    "rating": {
      "rate": 3.1,
      "count": 3
    }
  },
  {
    "id": 149,
    "title": "Vivo S1",
    "price": 249.99,
    "description": "The Vivo S1 is a stylish and mid-range smartphone offering a blend of design and performance. It features a vibrant display, capable camera system, and reliable functionality.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/1.webp",
    "rating": {
      "rate": 3.5,
      "count": 3
    }
  },
  {
    "id": 150,
    "title": "Vivo V9",
    "price": 299.99,
    "description": "The Vivo V9 is a smartphone known for its sleek design and emphasis on capturing high-quality selfies. It features a notch display, dual-camera setup, and a modern design.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/1.webp",
    "rating": {
      "rate": 3.6,
      "count": 3
    }
  },
  {
    "id": 151,
    "title": "Vivo X21",
    "price": 499.99,
    "description": "The Vivo X21 is a premium smartphone with a focus on cutting-edge technology. It features an in-display fingerprint sensor, a high-resolution display, and advanced camera capabilities.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/1.webp",
    "rating": {
      "rate": 4.3,
      "count": 3
    }
  },
  {
    "id": 152,
    "title": "American Football",
    "price": 19.99,
    "description": "The American Football is a classic ball used in American football games. It is designed for throwing and catching, making it an essential piece of equipment for the sport.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/1.webp",
    "rating": {
      "rate": 4.9,
      "count": 3
    }
  },
  {
    "id": 153,
    "title": "Baseball Ball",
    "price": 8.99,
    "description": "The Baseball Ball is a standard baseball used in baseball games. It features a durable leather cover and is designed for pitching, hitting, and fielding in the game of baseball.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/1.webp",
    "rating": {
      "rate": 2.6,
      "count": 3
    }
  },
  {
    "id": 154,
    "title": "Baseball Glove",
    "price": 24.99,
    "description": "The Baseball Glove is a protective glove worn by baseball players. It is designed to catch and field the baseball, providing players with comfort and control during the game.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/1.webp",
    "rating": {
      "rate": 4,
      "count": 3
    }
  },
  {
    "id": 155,
    "title": "Basketball",
    "price": 14.99,
    "description": "The Basketball is a standard ball used in basketball games. It is designed for dribbling, shooting, and passing in the game of basketball, suitable for both indoor and outdoor play.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/basketball/1.webp",
    "rating": {
      "rate": 4.7,
      "count": 3
    }
  },
  {
    "id": 156,
    "title": "Basketball Rim",
    "price": 39.99,
    "description": "The Basketball Rim is a sturdy hoop and net assembly mounted on a basketball backboard. It provides a target for shooting and scoring in the game of basketball.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/basketball-rim/1.webp",
    "rating": {
      "rate": 4.6,
      "count": 3
    }
  },
  {
    "id": 157,
    "title": "Cricket Ball",
    "price": 12.99,
    "description": "The Cricket Ball is a hard leather ball used in the sport of cricket. It is bowled and batted in the game, and its hardness and seam contribute to the dynamics of cricket play.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-ball/1.webp",
    "rating": {
      "rate": 3.5,
      "count": 3
    }
  },
  {
    "id": 158,
    "title": "Cricket Bat",
    "price": 29.99,
    "description": "The Cricket Bat is an essential piece of cricket equipment used by batsmen to hit the cricket ball. It is made of wood and comes in various sizes and designs.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 159,
    "title": "Cricket Helmet",
    "price": 44.99,
    "description": "The Cricket Helmet is a protective headgear worn by cricket players, especially batsmen and wicketkeepers. It provides protection against fast bowling and bouncers.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/1.webp",
    "rating": {
      "rate": 4.7,
      "count": 3
    }
  },
  {
    "id": 160,
    "title": "Cricket Wicket",
    "price": 29.99,
    "description": "The Cricket Wicket is a set of three stumps and two bails, forming a wicket used in the sport of cricket. Batsmen aim to protect the wicket while scoring runs.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-wicket/1.webp",
    "rating": {
      "rate": 4.7,
      "count": 3
    }
  },
  {
    "id": 161,
    "title": "Feather Shuttlecock",
    "price": 5.99,
    "description": "The Feather Shuttlecock is used in the sport of badminton. It features natural feathers and is designed for high-speed play, providing stability and accuracy during matches.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/feather-shuttlecock/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 162,
    "title": "Football",
    "price": 17.99,
    "description": "The Football, also known as a soccer ball, is the standard ball used in the sport of football (soccer). It is designed for kicking and passing in the game.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/football/1.webp",
    "rating": {
      "rate": 3.3,
      "count": 3
    }
  },
  {
    "id": 163,
    "title": "Golf Ball",
    "price": 9.99,
    "description": "The Golf Ball is a small ball used in the sport of golf. It features dimples on its surface, providing aerodynamic lift and distance when struck by a golf club.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/golf-ball/1.webp",
    "rating": {
      "rate": 4.3,
      "count": 3
    }
  },
  {
    "id": 164,
    "title": "Iron Golf",
    "price": 49.99,
    "description": "The Iron Golf is a type of golf club designed for various golf shots. It features a solid metal head and is used for approach shots, chipping, and other golfing techniques.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/iron-golf/1.webp",
    "rating": {
      "rate": 4.4,
      "count": 3
    }
  },
  {
    "id": 165,
    "title": "Metal Baseball Bat",
    "price": 29.99,
    "description": "The Metal Baseball Bat is a durable and lightweight baseball bat made from metal alloys. It is commonly used in baseball games for hitting and batting practice.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/metal-baseball-bat/1.webp",
    "rating": {
      "rate": 4.7,
      "count": 3
    }
  },
  {
    "id": 166,
    "title": "Tennis Ball",
    "price": 6.99,
    "description": "The Tennis Ball is a standard ball used in the sport of tennis. It is designed for bouncing and hitting with tennis rackets during matches or practice sessions.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-ball/1.webp",
    "rating": {
      "rate": 4.1,
      "count": 3
    }
  },
  {
    "id": 167,
    "title": "Tennis Racket",
    "price": 49.99,
    "description": "The Tennis Racket is an essential piece of equipment used in the sport of tennis. It features a frame with strings and a grip, allowing players to hit the tennis ball.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/1.webp",
    "rating": {
      "rate": 4,
      "count": 3
    }
  },
  {
    "id": 168,
    "title": "Volleyball",
    "price": 11.99,
    "description": "The Volleyball is a standard ball used in the sport of volleyball. It is designed for passing, setting, and spiking over the net during volleyball matches.",
    "category": "sports",
    "image": "https://cdn.dummyjson.com/product-images/sports-accessories/volleyball/1.webp",
    "rating": {
      "rate": 3.8,
      "count": 3
    }
  },
  {
    "id": 169,
    "title": "Black Sun Glasses",
    "price": 29.99,
    "description": "The Black Sun Glasses are a classic and stylish choice, featuring a sleek black frame and tinted lenses. They provide both UV protection and a fashionable look.",
    "category": "accessories",
    "image": "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp",
    "rating": {
      "rate": 4.4,
      "count": 3
    }
  },
  {
    "id": 170,
    "title": "Classic Sun Glasses",
    "price": 24.99,
    "description": "The Classic Sun Glasses offer a timeless design with a neutral frame and UV-protected lenses. These sunglasses are versatile and suitable for various occasions.",
    "category": "accessories",
    "image": "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp",
    "rating": {
      "rate": 3.9,
      "count": 3
    }
  },
  {
    "id": 171,
    "title": "Green and Black Glasses",
    "price": 34.99,
    "description": "The Green and Black Glasses feature a bold combination of green and black colors, adding a touch of vibrancy to your eyewear collection. They are both stylish and eye-catching.",
    "category": "accessories",
    "image": "https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/1.webp",
    "rating": {
      "rate": 4.6,
      "count": 3
    }
  },
  {
    "id": 172,
    "title": "Party Glasses",
    "price": 19.99,
    "description": "The Party Glasses are designed to add flair to your party outfit. With unique shapes or colorful frames, they're perfect for adding a playful touch to your look during celebrations.",
    "category": "accessories",
    "image": "https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/1.webp",
    "rating": {
      "rate": 2.8,
      "count": 3
    }
  },
  {
    "id": 173,
    "title": "Sunglasses",
    "price": 22.99,
    "description": "The Sunglasses offer a classic and simple design with a focus on functionality. These sunglasses provide essential UV protection while maintaining a timeless look.",
    "category": "accessories",
    "image": "https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/1.webp",
    "rating": {
      "rate": 3,
      "count": 3
    }
  },
  {
    "id": 174,
    "title": "iPad Mini 2021 Starlight",
    "price": 499.99,
    "description": "The iPad Mini 2021 in Starlight is a compact and powerful tablet from Apple. Featuring a stunning Retina display, powerful A-series chip, and a sleek design, it offers a premium tablet experience.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 175,
    "title": "Samsung Galaxy Tab S8 Plus Grey",
    "price": 599.99,
    "description": "The Samsung Galaxy Tab S8 Plus in Grey is a high-performance Android tablet by Samsung. With a large AMOLED display, powerful processor, and S Pen support, it's ideal for productivity and entertainment.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp",
    "rating": {
      "rate": 4.7,
      "count": 3
    }
  },
  {
    "id": 176,
    "title": "Samsung Galaxy Tab White",
    "price": 349.99,
    "description": "The Samsung Galaxy Tab in White is a sleek and versatile Android tablet. With a vibrant display, long-lasting battery, and a range of features, it offers a great user experience for various tasks.",
    "category": "electronics",
    "image": "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/1.webp",
    "rating": {
      "rate": 3.7,
      "count": 3
    }
  },
  {
    "id": 177,
    "title": "Blue Frock",
    "price": 29.99,
    "description": "The Blue Frock is a charming and stylish dress for various occasions. With a vibrant blue color and a comfortable design, it adds a touch of elegance to your wardrobe.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 178,
    "title": "Girl Summer Dress",
    "price": 19.99,
    "description": "The Girl Summer Dress is a cute and breezy dress designed for warm weather. With playful patterns and lightweight fabric, it's perfect for keeping cool and stylish during the summer.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/1.webp",
    "rating": {
      "rate": 4.8,
      "count": 3
    }
  },
  {
    "id": 179,
    "title": "Gray Dress",
    "price": 34.99,
    "description": "The Gray Dress is a versatile and chic option for various occasions. With a neutral gray color, it can be dressed up or down, making it a wardrobe staple for any fashion-forward individual.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/tops/gray-dress/1.webp",
    "rating": {
      "rate": 2.7,
      "count": 3
    }
  },
  {
    "id": 180,
    "title": "Short Frock",
    "price": 24.99,
    "description": "The Short Frock is a playful and trendy dress with a shorter length. Ideal for casual outings or special occasions, it combines style and comfort for a fashionable look.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/tops/short-frock/1.webp",
    "rating": {
      "rate": 3.2,
      "count": 3
    }
  },
  {
    "id": 181,
    "title": "Tartan Dress",
    "price": 39.99,
    "description": "The Tartan Dress features a classic tartan pattern, bringing a timeless and sophisticated touch to your wardrobe. Perfect for fall and winter, it adds a hint of traditional charm.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/tops/tartan-dress/1.webp",
    "rating": {
      "rate": 4.1,
      "count": 3
    }
  },
  {
    "id": 182,
    "title": "Blue Women's Handbag",
    "price": 49.99,
    "description": "The Blue Women's Handbag is a stylish and spacious accessory for everyday use. With a vibrant blue color and multiple compartments, it combines fashion and functionality.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 183,
    "title": "Heshe Women's Leather Bag",
    "price": 129.99,
    "description": "The Heshe Women's Leather Bag is a luxurious and high-quality leather bag for the sophisticated woman. With a timeless design and durable craftsmanship, it's a versatile accessory.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/1.webp",
    "rating": {
      "rate": 4.9,
      "count": 3
    }
  },
  {
    "id": 184,
    "title": "Prada Women Bag",
    "price": 599.99,
    "description": "The Prada Women Bag is an iconic designer bag that exudes elegance and luxury. Crafted with precision and featuring the Prada logo, it's a statement piece for fashion enthusiasts.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp",
    "rating": {
      "rate": 2.7,
      "count": 3
    }
  },
  {
    "id": 185,
    "title": "White Faux Leather Backpack",
    "price": 39.99,
    "description": "The White Faux Leather Backpack is a trendy and practical backpack for the modern woman. With a sleek white design and ample storage space, it's perfect for both casual and on-the-go styles.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp",
    "rating": {
      "rate": 3.4,
      "count": 3
    }
  },
  {
    "id": 186,
    "title": "Women Handbag Black",
    "price": 59.99,
    "description": "The Women Handbag in Black is a classic and versatile accessory that complements various outfits. With a timeless black color and functional design, it's a must-have in every woman's wardrobe.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 187,
    "title": "Black Women's Gown",
    "price": 129.99,
    "description": "The Black Women's Gown is an elegant and timeless evening gown. With a sleek black design, it's perfect for formal events and special occasions, exuding sophistication and style.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp",
    "rating": {
      "rate": 3.6,
      "count": 3
    }
  },
  {
    "id": 188,
    "title": "Corset Leather With Skirt",
    "price": 89.99,
    "description": "The Corset Leather With Skirt is a bold and edgy ensemble that combines a stylish corset with a matching skirt. Ideal for fashion-forward individuals, it makes a statement at any event.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/1.webp",
    "rating": {
      "rate": 3.1,
      "count": 3
    }
  },
  {
    "id": 189,
    "title": "Corset With Black Skirt",
    "price": 79.99,
    "description": "The Corset With Black Skirt is a chic and versatile outfit that pairs a fashionable corset with a classic black skirt. It offers a trendy and coordinated look for various occasions.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp",
    "rating": {
      "rate": 4.5,
      "count": 3
    }
  },
  {
    "id": 190,
    "title": "Dress Pea",
    "price": 49.99,
    "description": "The Dress Pea is a stylish and comfortable dress with a pea pattern. Perfect for casual outings, it adds a playful and fun element to your wardrobe, making it a great choice for day-to-day wear.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp",
    "rating": {
      "rate": 4.9,
      "count": 3
    }
  },
  {
    "id": 191,
    "title": "Marni Red & Black Suit",
    "price": 179.99,
    "description": "The Marni Red & Black Suit is a sophisticated and fashion-forward suit ensemble. With a combination of red and black tones, it showcases a modern design for a bold and confident look.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/1.webp",
    "rating": {
      "rate": 4.5,
      "count": 3
    }
  },
  {
    "id": 192,
    "title": "Green Crystal Earring",
    "price": 29.99,
    "description": "The Green Crystal Earring is a dazzling accessory that features a vibrant green crystal. With a classic design, it adds a touch of elegance to your ensemble, perfect for formal or special occasions.",
    "category": "jewelery",
    "image": "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/1.webp",
    "rating": {
      "rate": 4,
      "count": 3
    }
  },
  {
    "id": 193,
    "title": "Green Oval Earring",
    "price": 24.99,
    "description": "The Green Oval Earring is a stylish and versatile accessory with a unique oval shape. Whether for casual or dressy occasions, its green hue and contemporary design make it a standout piece.",
    "category": "jewelery",
    "image": "https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/1.webp",
    "rating": {
      "rate": 3.6,
      "count": 3
    }
  },
  {
    "id": 194,
    "title": "Tropical Earring",
    "price": 19.99,
    "description": "The Tropical Earring is a fun and playful accessory inspired by tropical elements. Featuring vibrant colors and a lively design, it's perfect for adding a touch of summer to your look.",
    "category": "jewelery",
    "image": "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/1.webp",
    "rating": {
      "rate": 4.4,
      "count": 3
    }
  },
  {
    "id": 195,
    "title": "Black & Brown Slipper",
    "price": 19.99,
    "description": "The Black & Brown Slipper is a comfortable and stylish choice for casual wear. Featuring a blend of black and brown colors, it adds a touch of sophistication to your relaxation.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp",
    "rating": {
      "rate": 2.5,
      "count": 3
    }
  },
  {
    "id": 196,
    "title": "Calvin Klein Heel Shoes",
    "price": 79.99,
    "description": "Calvin Klein Heel Shoes are elegant and sophisticated, designed for formal occasions. With a classic design and high-quality materials, they complement your stylish ensemble.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
    "rating": {
      "rate": 4.9,
      "count": 3
    }
  },
  {
    "id": 197,
    "title": "Golden Shoes Woman",
    "price": 49.99,
    "description": "The Golden Shoes for Women are a glamorous choice for special occasions. Featuring a golden hue and stylish design, they add a touch of luxury to your outfit.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/1.webp",
    "rating": {
      "rate": 3.3,
      "count": 3
    }
  },
  {
    "id": 198,
    "title": "Pampi Shoes",
    "price": 29.99,
    "description": "Pampi Shoes offer a blend of comfort and style for everyday use. With a versatile design, they are suitable for various casual occasions, providing a trendy and relaxed look.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-shoes/pampi-shoes/1.webp",
    "rating": {
      "rate": 3.1,
      "count": 3
    }
  },
  {
    "id": 199,
    "title": "Red Shoes",
    "price": 34.99,
    "description": "The Red Shoes make a bold statement with their vibrant red color. Whether for a party or a casual outing, these shoes add a pop of color and style to your wardrobe.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-shoes/red-shoes/1.webp",
    "rating": {
      "rate": 3.3,
      "count": 3
    }
  },
  {
    "id": 200,
    "title": "IWC Ingenieur Automatic Steel",
    "price": 4999.99,
    "description": "The IWC Ingenieur Automatic Steel watch is a durable and sophisticated timepiece. With a stainless steel case and automatic movement, it combines precision and style for watch enthusiasts.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 201,
    "title": "Rolex Cellini Moonphase",
    "price": 15999.99,
    "description": "The Rolex Cellini Moonphase watch is a masterpiece of horology. Featuring a moon phase complication, it showcases the craftsmanship and elegance that Rolex is renowned for.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/1.webp",
    "rating": {
      "rate": 3.8,
      "count": 3
    }
  },
  {
    "id": 202,
    "title": "Rolex Datejust Women",
    "price": 10999.99,
    "description": "The Rolex Datejust Women's watch is an iconic timepiece designed for women. With a timeless design and a date complication, it offers both elegance and functionality.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/1.webp",
    "rating": {
      "rate": 2.9,
      "count": 3
    }
  },
  {
    "id": 203,
    "title": "Watch Gold for Women",
    "price": 799.99,
    "description": "The Gold Women's Watch is a stunning accessory that combines luxury and style. Featuring a gold-plated case and a chic design, it adds a touch of glamour to any outfit.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp",
    "rating": {
      "rate": 4.2,
      "count": 3
    }
  },
  {
    "id": 204,
    "title": "Women's Wrist Watch",
    "price": 129.99,
    "description": "The Women's Wrist Watch is a versatile and fashionable timepiece for everyday wear. With a comfortable strap and a simple yet elegant design, it complements various styles.",
    "category": "women's clothing",
    "image": "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/1.webp",
    "rating": {
      "rate": 3.5,
      "count": 3
    }
  }
];

export default products;
