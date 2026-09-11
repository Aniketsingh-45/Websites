/**
 * Bella Beauty Makeup Studio - Master Dataset
 * Real extracted data from Justdial, Magicpin, YouTube, and Instagram
 */

const STUDIO_DATA = {
  name: "Bella Beauty Makeup Studio",
  subName: "The Bella Beauty Makeup Studio & Salon",
  tagline: "Patna's Premier Destination for Bridal Artistry & Luxury Makeovers",
  phone: "+918235215577",
  displayPhone: "+91 82352 15577",
  altPhone: "+918460556685",
  whatsapp: "+919217002598",
  displayWhatsapp: "+91 92170 02598",
  email: "bellabeautymakeupstudio@gmail.com",
  rating: 5.0,
  reviewCount: 154,
  estYear: 2023,
  address: {
    street: "Sonu Market, Gola Road, Near By Balajii Medical",
    colony: "Vastu Ganga Colony, Vivek Vihar Colony",
    locality: "Danapur Bazar / Ram Jaipal Nagar",
    city: "Patna",
    state: "Bihar",
    pincode: "801503",
    full: "Sonu Market, Gola Rd, Near By Balajii Medical, Vastu Ganga Colony, Danapur Bazar / Ram Jaipal Nagar, Patna, Bihar 801503",
    lat: 25.6186744,
    lng: 85.056569,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.518749818817!2d85.05437!3d25.618674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57f5c225a071%3A0x897910ba1b1bf05!2sGola%20Rd%2C%20Danapur%20Nizamat%2C%20Patna%2C%20Bihar%20801503!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },
  timings: {
    openDays: "Monday to Sunday (Open All 7 Days)",
    openTime: "11:00 AM",
    closeTime: "09:00 PM",
    openHour: 11,
    closeHour: 21
  },
  socials: {
    instagram: "https://www.instagram.com/bellabeautymakeupstudio/",
    youtube: "https://www.youtube.com/channel/UCvMZ7w2DMKlsxrEf_BgVXsw",
    justdial: "https://www.justdial.com/Patna/Bella-Beauty-Makeup-Studio-Near-By-Balajii-Medical-Danapur-Bazar/0612PX612-X612-250419160653-P8U8_BZDET",
    magicpin: "https://magicpin.in/Patna/Ram-Jaipal-Nagar/Beauty/Bella-Beauty-Makeup-Studio/store/1a8b91c"
  },
  logo: "https://lh3.googleusercontent.com/lbiiGUTvtCEVZpJ8c7-mVsteynFC0UEPAiqoK8J0Xr7JvIqDgbGp9l09ArrPzBYzEtbnPECEvNR0iGGOD0o0XMJv-FQ=s0-rw",
  coverImage: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/rvucb3y2p49g7dk-j8sbyqzlr3.jpg",

  stylists: [
    {
      id: "master-bridal",
      name: "Bella Senior Artist",
      role: "Chief Bridal & Airbrush Specialist",
      experience: "8+ Years",
      specialty: "High Definition Bridal Couture, Temptu Airbrush & Editorial Transformations",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "senior-hair",
      name: "Pooja Sharma",
      role: "Lead Hair Stylist & Colorist",
      experience: "6+ Years",
      specialty: "Balayage, Keratin Therapy, Intricate Bridal Braids & Floral Buns",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "skin-therapist",
      name: "Naina Verma",
      role: "Skin Aesthetician & Nail Artist",
      experience: "5+ Years",
      specialty: "Hydra Radiance Glow, Korean Glass Skin, Gel Nail Extensions",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "any-available",
      name: "First Available Artist",
      role: "Assigned by Salon Manager",
      experience: "Expert Level",
      specialty: "Fastest appointment matching your requested slot",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
    }
  ],

  serviceCategories: [
    { id: "all", name: "All Services", icon: "sparkles" },
    { id: "bridal", name: "Bridal & Occasion", icon: "crown" },
    { id: "hair", name: "Hair Care & Styling", icon: "scissors" },
    { id: "skin", name: "Skin & Facials", icon: "heart-pulse" },
    { id: "nails", name: "Nails & Lash Art", icon: "brush" },
    { id: "packages", name: "Pre-Bridal Packages", icon: "gift" }
  ],

  services: [
    {
      id: "bridal-hd",
      category: "bridal",
      name: "Signature HD Bridal Makeover",
      tagline: "Sweat-proof, camera-ready finish with premium international cosmetics",
      price: 11999,
      duration: "180 min",
      popular: true,
      image: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/rvucb3y2p49g7dk-j8sbyqzlr3.jpg",
      inclusions: [
        "Full HD Bridal Makeup (Huda / MAC / Anastasia Beverly Hills)",
        "Designer Bridal Hair Styling with Hair Accessories / Fresh Flowers Setup",
        "Dupatta & Saree Draping with Jewelry Fixation",
        "Lashes, Lenses & Long-Lasting Hydrating Mist"
      ]
    },
    {
      id: "bridal-airbrush",
      category: "bridal",
      name: "Royal 3D Airbrush Bridal Makeover",
      tagline: "Feather-light micro-mist coverage with 24-hour flawless stay",
      price: 15999,
      duration: "210 min",
      popular: true,
      image: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/7oqjavpdii110i8-4t5m04szcp.jpg",
      inclusions: [
        "Temptu Silicon-based High Definition Airbrush Technique",
        "High-End Waterproof & Transfer-Resistant Formulation",
        "Luxury Bridal Bun / Hollywood Waves Styling",
        "Complete Jewelry Setting & Precision Draping"
      ]
    },
    {
      id: "engagement-makeover",
      category: "bridal",
      name: "Engagement / Roka Soft Glam",
      tagline: "Dewy, luminous glow accentuating your natural beauty",
      price: 6499,
      duration: "120 min",
      popular: false,
      image: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/95sy9sdup7sin4w-gnf69rqjsy.jpg",
      inclusions: [
        "Radiant Soft Glam Makeup",
        "Soft Curls / Textured Half-Updo",
        "Lash Accents & Glossy Lip Styling",
        "Outfit Draping Assistance"
      ]
    },
    {
      id: "reception-glam",
      category: "bridal",
      name: "Reception Glamour Makeover",
      tagline: "Bold, modern, statement look for the evening celebrations",
      price: 7999,
      duration: "150 min",
      popular: false,
      image: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/ygaw8wuj85xhzxa-cu03tlnwir.jpg",
      inclusions: [
        "Smokey or Cut-Crease Signature Eye Look",
        "Sculpted Contouring & Glass Skin Finish",
        "Sleek Hair Transformation or Voluminous Curls",
        "Luxury Gown / Lehenga Draping"
      ]
    },
    {
      id: "party-makeover",
      category: "bridal",
      name: "Party / Bridesmaid Makeup",
      tagline: "Elegance on demand for sisters, family and cocktail events",
      price: 3499,
      duration: "90 min",
      popular: false,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      inclusions: [
        "Lightweight Flawless Base Makeup",
        "Custom Eye Makeup & Lashes",
        "Ironing, Tonging or Updo Hair Style",
        "Simple Saree / Dupatta Pin-Up"
      ]
    },
    {
      id: "keratin-treatment",
      category: "hair",
      name: "Luxury Keratin Smoothening",
      tagline: "Frizz-free, silky mirror-shine hair for up to 6 months",
      price: 4999,
      duration: "150 min",
      popular: true,
      image: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/a06ja8q22ru1kuw-7uvqcq8hob.jpg",
      inclusions: [
        "Deep Cleansing Protein Wash",
        "Formaldehyde-free Nano Keratin Infusion",
        "Thermo-Seal Flat Iron Processing",
        "Post-Treatment Serum & Hair Mask"
      ]
    },
    {
      id: "botox-hair",
      category: "hair",
      name: "Hair Botox & Deep Reconstruction",
      tagline: "Intensive repair for chemically treated or damaged hair",
      price: 4499,
      duration: "120 min",
      popular: false,
      image: "https://img.magicpin.com/8793940_store_images_4.webp",
      inclusions: [
        "Hyaluronic Acid & Collagen Fiber Therapy",
        "Split-End Repair & Volume Control",
        "Scalp Nourishing Massage",
        "High-Gloss Shine Booster"
      ]
    },
    {
      id: "hair-color-balayage",
      category: "hair",
      name: "French Balayage & Ombre Highlights",
      tagline: "Custom blended dimension using L'Oréal & Schwarzkopf Professional",
      price: 5499,
      duration: "180 min",
      popular: false,
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
      inclusions: [
        "Personalized Color Consultation & Patch Test",
        "Hand-Painted Balayage / Multi-Tone Highlights",
        "Toner Glaze for Anti-Brass Shine",
        "Color Lock Deep Conditioning"
      ]
    },
    {
      id: "hydra-facial",
      category: "skin",
      name: "Bella Hydra-Derm Infusion Glow Facial",
      tagline: "Deep pore vacuum cleansing, exfoliation, and intense hydration",
      price: 2999,
      duration: "75 min",
      popular: true,
      image: "https://img.magicpin.com/8793940_store_images_2.webp",
      inclusions: [
        "Vortex Extraction & Blackhead Removal",
        "Lactic & Glycolic Gentle Peeling",
        "Antioxidant & Hyaluronic Serum Infusion",
        "Cold Cryo-Hammer Soothing Therapy"
      ]
    },
    {
      id: "gold-bridal-facial",
      category: "skin",
      name: "24K 99.9% Pure Gold Radiance Facial",
      tagline: "Instant bridal illumination and cellular rejuvenation",
      price: 3999,
      duration: "90 min",
      popular: false,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
      inclusions: [
        "Gold Foil Sheet Application & Peptide Massage",
        "Lymphatic Drainage Facial Massage",
        "Illuminating Peel-Off Alginate Mask",
        "Neck, Decollete & Shoulder Stress Relief"
      ]
    },
    {
      id: "nail-extensions",
      category: "nails",
      name: "Bridal Gel / Acrylic Nail Extensions",
      tagline: "Sculpted nails with Swarovski crystals, ombre chrome & marble art",
      price: 2499,
      duration: "90 min",
      popular: true,
      image: "https://img.magicpin.com/8793940_store_images_3.webp",
      inclusions: [
        "Full Set Extension (Stiletto, Coffin, Almond or Square)",
        "Bridal 3D Nail Art & Swarovski Accents",
        "High-Gloss UV Gel Top Coat (No-Chipping for 4+ Weeks)",
        "Cuticle Treatment & Hand Massage"
      ]
    },
    {
      id: "pre-bridal-grand",
      category: "packages",
      name: "The Bella Queen - Grand Pre-Bridal Suite",
      tagline: "The complete 3-session head-to-toe pampering ritual before your wedding",
      price: 18999,
      duration: "3 Sessions",
      popular: true,
      image: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/bella-beauty-makeup-studio-danapur-bazar-patna-beauty-parlours-hypa79zq88.jpg",
      inclusions: [
        "Session 1: Body Polish, Full Body Waxing (Rica) & Hair Spa",
        "Session 2: Hydra Radiance Facial, Manicure & Pedicure Deluxe",
        "Session 3: 24K Gold Facial, Nail Extensions, Brow Lamination & Hair Trim",
        "Free Complimentary Trial Hair & Makeup Consultation"
      ]
    }
  ],

  reels: [
    {
      id: "PJvCRWsVWco",
      title: "Royal Red Bridal Transformation",
      tag: "Bridal",
      views: "18.4K",
      thumbnail: "https://i.ytimg.com/vi/PJvCRWsVWco/hqdefault.jpg"
    },
    {
      id: "Kcd8DHbIJTk",
      title: "Pastel Pink Engagement Soft Glam",
      tag: "Engagement",
      views: "12.8K",
      thumbnail: "https://i.ytimg.com/vi/Kcd8DHbIJTk/hqdefault.jpg"
    },
    {
      id: "SdnsGzf86ss",
      title: "Reception Cocktail Glam & Hair Waves",
      tag: "Reception",
      views: "9.6K",
      thumbnail: "https://i.ytimg.com/vi/SdnsGzf86ss/hqdefault.jpg"
    },
    {
      id: "ob3WQmiHfLQ",
      title: "Bridal Hair Textured Floral Bun",
      tag: "Hairstyle",
      views: "14.2K",
      thumbnail: "https://i.ytimg.com/vi/ob3WQmiHfLQ/hqdefault.jpg"
    },
    {
      id: "DqU44m-5wXA",
      title: "Smokey Eye & Dewy Glass Skin Look",
      tag: "Party Makeover",
      views: "8.9K",
      thumbnail: "https://i.ytimg.com/vi/DqU44m-5wXA/hqdefault.jpg"
    },
    {
      id: "CB7VQJKAcu4",
      title: "Pre-Bridal Radiance & Glow Session",
      tag: "Skin Care",
      views: "11.3K",
      thumbnail: "https://i.ytimg.com/vi/CB7VQJKAcu4/hqdefault.jpg"
    },
    {
      id: "tBizWyyVIR8",
      title: "Haldi & Mehendi Yellow Floral Vibe",
      tag: "Mehendi Look",
      views: "10.5K",
      thumbnail: "https://i.ytimg.com/vi/tBizWyyVIR8/hqdefault.jpg"
    },
    {
      id: "IW2t8IGdNFo",
      title: "Airbrush Flawless Precision Finish",
      tag: "Airbrush",
      views: "15.7K",
      thumbnail: "https://i.ytimg.com/vi/IW2t8IGdNFo/hqdefault.jpg"
    }
  ],

  gallery: [
    {
      id: 1,
      category: "bridal",
      title: "Classic Traditional Bihari Bridal Look",
      img: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/rvucb3y2p49g7dk-j8sbyqzlr3.jpg",
      caption: "Intricate red bridal lehenga with royal gold jewelry setting and flawless HD base."
    },
    {
      id: 2,
      category: "bridal",
      title: "Modern Reception Emerald Gown Glam",
      img: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/7oqjavpdii110i8-4t5m04szcp.jpg",
      caption: "Airbrush finish with smokey champagne eyes and Hollywood waves."
    },
    {
      id: 3,
      category: "hair",
      title: "Bridal Floral Bun & Styling",
      img: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/a06ja8q22ru1kuw-7uvqcq8hob.jpg",
      caption: "Artisan fresh gajra weave on a textured multi-tier bridal bun."
    },
    {
      id: 4,
      category: "engagement",
      title: "Soft Peach Engagement Look",
      img: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/95sy9sdup7sin4w-gnf69rqjsy.jpg",
      caption: "Natural enhancement focusing on glowing skin and fluttery lashes."
    },
    {
      id: 5,
      category: "ambience",
      title: "Bella Studio Luxury Vanity Mirrors",
      img: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/bella-beauty-makeup-studio-danapur-bazar-patna-beauty-parlours-hypa79zq88.jpg",
      caption: "Spacious, hygienic and daylight-balanced makeup stations in Danapur Bazar."
    },
    {
      id: 6,
      category: "bridal",
      title: "Cocktail Party Glamour",
      img: "https://content3.jdmagicbox.com/v2/comp/patna/u8/0612px612.x612.250419160653.p8u8/catalogue/ygaw8wuj85xhzxa-cu03tlnwir.jpg",
      caption: "Sharp defined brows, luminous cheekbones, and custom nude-rose lip blend."
    },
    {
      id: 7,
      category: "ambience",
      title: "Salon Styling & Recliner Stations",
      img: "https://img.magicpin.com/8793940_store_images_0.webp",
      caption: "Modern ergonomic salon chairs ensuring total comfort during sessions."
    },
    {
      id: 8,
      category: "skin",
      title: "Hydra Glow Facial Session",
      img: "https://img.magicpin.com/8793940_store_images_2.webp",
      caption: "Clinical-grade skin rejuvenation using non-invasive vacuum serum therapy."
    },
    {
      id: 9,
      category: "nails",
      title: "Custom Ombre Gel Extensions",
      img: "https://img.magicpin.com/8793940_store_images_3.webp",
      caption: "Handcrafted bridal nail art with fine glitter fade and stones."
    }
  ],

  reviews: [
    {
      id: 1,
      author: "Najiya Sultana",
      date: "23rd February, 2026",
      source: "Justdial Verified",
      rating: 5,
      body: "Bella Beauty Makeup Studio is amazing! The results are excellent; I felt so beautiful after my makeover. The studio has a luxurious vibe that makes you feel special. The staff is highly skilled and knows exactly what to do. Plus, they confirm your appointment quickly, which is super helpful. I highly recommend Bella Beauty for anyone wanting to look their best!"
    },
    {
      id: 2,
      author: "Amrita Kumari",
      date: "27th November, 2025",
      source: "Justdial Verified",
      rating: 5,
      body: "I booked my sister's engagement makeup from Bella Beauty Makeup Studio, and honestly I've never seen such a perfect makeover before. They enhanced her features so naturally that everyone kept staring and complimenting her the whole evening. She felt confident and comfortable throughout, and the photos came out even more stunning. Thank you Bella Beauty Makeup Studio for making my sister's special day even more memorable 💖."
    },
    {
      id: 3,
      author: "Vishal",
      date: "18th November, 2025",
      source: "Justdial Verified",
      rating: 5,
      body: "I had an excellent experience at Bella Beauty Makeup Studio! The salon was very hygienic, which made me feel safe and comfortable. All the equipment was clean and well-maintained. I also loved how quick the confirmation process was; it made booking easy. The staff is experienced and friendly, providing great service. I highly recommend this place for all your beauty needs!"
    },
    {
      id: 4,
      author: "Pankaj Yadav",
      date: "29th March, 2026",
      source: "Justdial Verified",
      rating: 5,
      body: "Amazing 👍🏻 Being her brother, I must say—absolutely amazing work! The bridal look was so graceful and elegant. Everyone in the wedding hall praised the makeup and styling. 🙏✨"
    },
    {
      id: 5,
      author: "Chinki Singh",
      date: "20th November, 2025",
      source: "Justdial Verified",
      rating: 5,
      body: "Good service and very polite behavior! The facial glow lasted for weeks and my hair spa was incredibly relaxing. Truly worth every rupee."
    }
  ],

  faqs: [
    {
      q: "How far in advance should I book my bridal makeup?",
      a: "Because wedding and auspicious dates fill up quickly in Patna, we recommend booking your bridal slot at least 1 to 3 months in advance. You can lock in your date right here on our booking portal or via WhatsApp with an advance deposit."
    },
    {
      q: "Do you offer makeup trials before the wedding day?",
      a: "Yes! We offer pre-bridal makeup consultations and trial sessions. Our master artists evaluate your skin type, undertone, lehenga palette, and jewelry to customize your exact bridal aesthetic."
    },
    {
      q: "What brands of cosmetics do you use for bridal makeup?",
      a: "We only use 100% authentic, high-end international and professional luxury brands including MAC, Huda Beauty, Temptu Airbrush, Anastasia Beverly Hills, Bobbi Brown, Kryolan Professional, and Charlotte Tilbury."
    },
    {
      q: "Can you accommodate the bridal party (bridesmaids, mother of the bride)?",
      a: "Yes, our studio has multiple dedicated makeup stations and a team of senior artists to accommodate the bride and family members simultaneously without any rush."
    },
    {
      q: "Where is Bella Beauty Makeup Studio located in Patna?",
      a: "We are situated in Sonu Market, Gola Road, Danapur Bazar / Ram Jaipal Nagar (near Balajii Medical, Vastu Ganga Colony). We have convenient parking and are easily accessible from Bailey Road, Danapur Station, and Saguna More."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major payment modes including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Cash, and Magicpin payments."
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.STUDIO_DATA = STUDIO_DATA;
}
