// Curated Movie & Web Series Database with rich metadata and download links
const MOVIE_DATABASE = [
    {
        id: "chhaava-2025",
        title: "Chhaava",
        year: 2025,
        rating: 8.9,
        quality: "4K UHD",
        category: "Bollywood",
        genres: ["Action", "Historical", "Drama"],
        duration: "2h 45m",
        posterUrl: "https://image.tmdb.org/t/p/w500/9F4lPRLjfBjsu0zjWNOZQMa8a4V.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/8b51dJc-N3g",
        synopsis: "An epic biographical historical saga detailing the courageous life, battles, and sacrifice of Chhatrapati Sambhaji Maharaj, son of Chhatrapati Shivaji Maharaj, as he defended the Maratha Empire against Mughal invaders.",
        director: "Laxman Utekar",
        cast: ["Vicky Kaushal", "Rashmika Mandanna", "Akshaye Khanna", "Ashutosh Rana"],
        featured: true,
        downloads: [
            { res: "480p SD", size: "480 MB", format: "x264 MP4", speed: "12 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "720p HD", size: "1.2 GB", format: "x264 AAC", speed: "25 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.8 GB", format: "10-Bit HEVC", speed: "40 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD HDR", size: "8.4 GB", format: "2160p Atmos", speed: "75 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "sardarji-3-2025",
        title: "SardarJi 3",
        year: 2025,
        rating: 7.8,
        quality: "1080p FHD",
        category: "Bollywood",
        genres: ["Comedy", "Fantasy", "Romance"],
        duration: "2h 18m",
        posterUrl: "https://catimages.co/images/2025/07/05/Sardaarji-3-2025-HDHub4u.Ms.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/fh6D1EXu918",
        synopsis: "The famous ghostbuster Sardarji is back with hilarious supernatural adventures, chasing friendly spirits across haunted mansions with pure Punjabi wit.",
        director: "Rohit Jugraj",
        cast: ["Diljit Dosanjh", "Sonam Bajwa", "Neeru Bajwa"],
        featured: false,
        downloads: [
            { res: "480p SD", size: "420 MB", format: "x264 MP4", speed: "15 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "720p HD", size: "1.1 GB", format: "x264 AAC", speed: "28 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.4 GB", format: "x265 5.1", speed: "45 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "raid-2-2025",
        title: "Raid 2",
        year: 2025,
        rating: 8.2,
        quality: "4K UHD",
        category: "Bollywood",
        genres: ["Crime", "Drama", "Thriller"],
        duration: "2h 25m",
        posterUrl: "https://bollyflixcdn.site/wp-content/uploads/2025/06/Raid-2-2025-Hindi-Movie.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/hXz3GQTKQJU",
        synopsis: "Senior IRS Officer Amay Patnaik conducts another high-stakes income tax raid against a powerful political syndicate harboring hundreds of crores of undisclosed wealth.",
        director: "Raj Kumar Gupta",
        cast: ["Ajay Devgn", "Riteish Deshmukh", "Vaani Kapoor"],
        featured: true,
        downloads: [
            { res: "480p SD", size: "450 MB", format: "x264 MP4", speed: "14 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "720p HD", size: "1.3 GB", format: "x264 AAC", speed: "30 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "3.1 GB", format: "10-Bit HEVC", speed: "50 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD HDR", size: "9.2 GB", format: "HDR10 Atmos", speed: "80 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "kesari-2-2025",
        title: "Kesari 2 (The Untold Story)",
        year: 2025,
        rating: 8.5,
        quality: "4K UHD",
        category: "Bollywood",
        genres: ["Historical", "Action", "War"],
        duration: "2h 35m",
        posterUrl: "https://bollyflixcdn.site/wp-content/uploads/2025/06/Kesari-Chapter-2-The-Untold-Story-of-Jallianwala-Bagh-2025-Hindi-Movie.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/JBL_G-C51Dk",
        synopsis: "The untold chapter of heroic defiance leading up to and following the Jallianwala Bagh incident, featuring brave freedom fighters confronting British colonial rule.",
        director: "Anurag Singh",
        cast: ["Akshay Kumar", "Parineeti Chopra", "Edward Sonnenblick"],
        featured: true,
        downloads: [
            { res: "720p HD", size: "1.4 GB", format: "x264 AAC", speed: "25 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "3.0 GB", format: "10-Bit HEVC", speed: "45 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD HDR", size: "8.6 GB", format: "2160p Dolby", speed: "70 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "sitaare-zameen-par-2025",
        title: "Sitaare Zameen Par",
        year: 2025,
        rating: 8.7,
        quality: "1080p FHD",
        category: "Bollywood",
        genres: ["Drama", "Comedy", "Family"],
        duration: "2h 20m",
        posterUrl: "https://bollyflixcdn.site/wp-content/uploads/2025/06/Sitaare-Zameen-Par-2025.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        synopsis: "A heartwarming and thought-provoking tale exploring inclusivity, neurodiversity, and sports coaching with boundless empathy and laugh-out-loud humor.",
        director: "R. S. Prasanna",
        cast: ["Aamir Khan", "Genelia D'Souza"],
        featured: false,
        downloads: [
            { res: "480p SD", size: "400 MB", format: "x264 MP4", speed: "15 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "720p HD", size: "1.1 GB", format: "x264 AAC", speed: "30 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.6 GB", format: "x265 AAC", speed: "50 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "oppenheimer-2023",
        title: "Oppenheimer",
        year: 2023,
        rating: 8.9,
        quality: "IMAX 4K",
        category: "Hollywood",
        genres: ["Biography", "Drama", "History"],
        duration: "3h 00m",
        posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/uYPbbksJxIg",
        synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during the Manhattan Project.",
        director: "Christopher Nolan",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
        featured: true,
        downloads: [
            { res: "720p Dual Audio", size: "1.6 GB", format: "Eng-Hindi AAC", speed: "30 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD IMAX", size: "3.8 GB", format: "10-Bit HEVC DDP", speed: "55 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD HDR Remux", size: "14.2 GB", format: "Dolby Vision Atmos", speed: "90 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "dune-2-2024",
        title: "Dune: Part Two",
        year: 2024,
        rating: 8.8,
        quality: "IMAX 4K",
        category: "Hollywood",
        genres: ["Sci-Fi", "Adventure", "Action"],
        duration: "2h 46m",
        posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/Way9Dexny3w",
        synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family in a desert war of galactic scale.",
        director: "Denis Villeneuve",
        cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"],
        featured: false,
        downloads: [
            { res: "720p HD", size: "1.4 GB", format: "Dual Audio Hindi-Eng", speed: "25 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD IMAX", size: "3.4 GB", format: "HEVC Atmos", speed: "50 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD HDR", size: "11.5 GB", format: "HDR10+ Atmos", speed: "85 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "kalki-2898-ad-2024",
        title: "Kalki 2898 AD",
        year: 2024,
        rating: 8.1,
        quality: "4K UHD",
        category: "South",
        genres: ["Sci-Fi", "Action", "Mythology"],
        duration: "3h 01m",
        posterUrl: "https://image.tmdb.org/t/p/w500/29eecw7q2rKxR0Wf3C2jGqIcf5n.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/kQDd1AhGIHk",
        synopsis: "In a dystopian post-apocalyptic future in Kasi 2898 AD, an ancient protector Ashwatthama rises to safeguard the unborn child carrying the essence of the tenth avatar of Vishnu.",
        director: "Nag Ashwin",
        cast: ["Prabhas", "Amitabh Bachchan", "Deepika Padukone", "Kamal Haasan"],
        featured: true,
        downloads: [
            { res: "720p Multi-Audio", size: "1.5 GB", format: "Hindi-Tel-Tam", speed: "30 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "3.6 GB", format: "10-Bit HEVC 5.1", speed: "50 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD Atmos", size: "9.8 GB", format: "2160p HDR", speed: "80 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "pushpa-2-2024",
        title: "Pushpa 2: The Rule",
        year: 2024,
        rating: 8.3,
        quality: "4K UHD",
        category: "South",
        genres: ["Action", "Crime", "Thriller"],
        duration: "3h 20m",
        posterUrl: "https://image.tmdb.org/t/p/w500/b7k5g3VbV3G9jR8qE8vF4Q9K1jP.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/1kVK0MZlbI4",
        synopsis: "The ferocious clash between Pushpa Raj and SP Bhanwar Singh Shekhawat escalates into an international smuggling empire battle across borders.",
        director: "Sukumar",
        cast: ["Allu Arjun", "Fahadh Faasil", "Rashmika Mandanna"],
        featured: false,
        downloads: [
            { res: "480p SD", size: "550 MB", format: "x264 MP4", speed: "18 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "720p HD", size: "1.6 GB", format: "x264 Hindi Dub", speed: "32 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "3.9 GB", format: "HEVC Atmos", speed: "60 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "mirzapur-s3-2024",
        title: "Mirzapur (Season 3)",
        year: 2024,
        rating: 8.5,
        quality: "4K UHD",
        category: "Web Series",
        genres: ["Crime", "Drama", "Action"],
        duration: "10 Episodes",
        posterUrl: "https://image.tmdb.org/t/p/w500/uU8c3KzK6rU7wT9oQ4X0qE7lZkR.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/x8Dmhq02v9I",
        synopsis: "With Munna Tripathi dead and Akhandanand wounded, Guddu Pandit claims the throne of Purvanchal while enemies conspire from every corner of Uttar Pradesh.",
        director: "Gurmmeet Singh",
        cast: ["Pankaj Tripathi", "Ali Fazal", "Shweta Tripathi", "Vijay Varma"],
        featured: true,
        downloads: [
            { res: "720p HD Zip (Pack)", size: "4.5 GB", format: "Episodes 1-10 x264", speed: "35 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD Pack", size: "9.2 GB", format: "Episodes 1-10 HEVC", speed: "65 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD Complete", size: "22.4 GB", format: "2160p Web-DL Atmos", speed: "95 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "panchayat-s3-2024",
        title: "Panchayat (Season 3)",
        year: 2024,
        rating: 8.9,
        quality: "1080p FHD",
        category: "Web Series",
        genres: ["Comedy", "Drama"],
        duration: "8 Episodes",
        posterUrl: "https://image.tmdb.org/t/p/w500/m0H1h4J4eZ3zR8b7L8h1K9w9Y8p.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/WJ69kZgH8fE",
        synopsis: "Abhishek Tripathi navigates high-stakes Phulera village politics, Vidhayak disputes, and civil service exams with the lovable Gram Panchayat team.",
        director: "Deepak Kumar Mishra",
        cast: ["Jitendra Kumar", "Neena Gupta", "Raghubir Yadav", "Faisal Malik"],
        featured: false,
        downloads: [
            { res: "720p Complete Pack", size: "2.8 GB", format: "E01-E08 x264", speed: "30 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD Pack", size: "6.4 GB", format: "E01-E08 10-Bit HEVC", speed: "55 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "deadpool-wolverine-2024",
        title: "Deadpool & Wolverine",
        year: 2024,
        rating: 8.0,
        quality: "4K UHD",
        category: "Dual Audio",
        genres: ["Action", "Comedy", "Sci-Fi"],
        duration: "2h 08m",
        posterUrl: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/73_1biulkYk",
        synopsis: "A listless Wade Wilson toils in civilian life until the Time Variance Authority pulls him into a mission that pairs him with a reluctant Wolverine to save the universe.",
        director: "Shawn Levy",
        cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin", "Matthew Macfadyen"],
        featured: false,
        downloads: [
            { res: "720p Dual Audio", size: "1.3 GB", format: "Hindi-Eng DDP", speed: "28 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD Dual", size: "3.2 GB", format: "10-Bit HEVC Atmos", speed: "50 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD HDR Remux", size: "12.0 GB", format: "2160p Dolby Vision", speed: "85 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "sabarmati-report-2024",
        title: "The Sabarmati Report",
        year: 2024,
        rating: 7.9,
        quality: "1080p FHD",
        category: "Bollywood",
        genres: ["Drama", "Thriller", "Crime"],
        duration: "2h 06m",
        posterUrl: "https://image.tmdb.org/t/p/w400/eDGm3mrvoB39l0D5kbIi4kL8dZI.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/9G0z_4f5R28",
        synopsis: "An investigative journalist uncovers suppressed realities and political conspiracies surrounding the Godhra train burning incident of 2002.",
        director: "Dheeraj Sarna",
        cast: ["Vikrant Massey", "Raashii Khanna", "Riddhi Dogra"],
        featured: false,
        downloads: [
            { res: "480p SD", size: "410 MB", format: "x264 MP4", speed: "12 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "720p HD", size: "1.1 GB", format: "x264 AAC", speed: "25 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.5 GB", format: "10-Bit HEVC", speed: "45 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "housefull-5-2025",
        title: "Housefull 5",
        year: 2025,
        rating: 6.8,
        quality: "1080p FHD",
        category: "Bollywood",
        genres: ["Comedy"],
        duration: "2h 22m",
        posterUrl: "https://catimages.org/images/2025/07/18/Housefull-5A-2025-HDHub4u.Ms.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        synopsis: "A riotous cruise ship comedy featuring mistaken identities, chaotic romance, and laugh-out-loud misunderstandings across high seas.",
        director: "Tarun Mansukhani",
        cast: ["Akshay Kumar", "Riteish Deshmukh", "Abhishek Bachchan", "Sanjay Dutt"],
        featured: false,
        downloads: [
            { res: "480p SD", size: "430 MB", format: "x264 MP4", speed: "14 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "720p HD", size: "1.2 GB", format: "x264 AAC", speed: "26 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.7 GB", format: "HEVC 5.1", speed: "48 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "jaat-2025",
        title: "Jaat",
        year: 2025,
        rating: 7.7,
        quality: "4K UHD",
        category: "Bollywood",
        genres: ["Action", "Drama"],
        duration: "2h 30m",
        posterUrl: "https://bollyflixcdn.site/wp-content/uploads/2025/06/Jaat-2025.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        synopsis: "A fierce mass action entertainer where Sunny Deol battles corrupt syndicates with unmatched raw power and justice in the heartland.",
        director: "Gopichand Malineni",
        cast: ["Sunny Deol", "Randeep Hooda", "Vineet Kumar Singh"],
        featured: false,
        downloads: [
            { res: "720p HD", size: "1.3 GB", format: "x264 AAC", speed: "28 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.9 GB", format: "10-Bit HEVC", speed: "50 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD", size: "7.8 GB", format: "2160p HDR", speed: "75 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "bhool-chuk-maaf-2025",
        title: "Bhool Chuk Maaf",
        year: 2025,
        rating: 7.5,
        quality: "1080p FHD",
        category: "Bollywood",
        genres: ["Comedy", "Romance"],
        duration: "2h 10m",
        posterUrl: "https://bollyflixcdn.site/wp-content/uploads/2025/05/Bhool-Chuk-Maaf-2025.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        synopsis: "A delightful romantic comedy revolving around humorous family mix-ups, traditional wedding chaos, and young lovers.",
        director: "Karan Sharma",
        cast: ["Kartik Aaryan", "Ananya Panday"],
        featured: false,
        downloads: [
            { res: "480p SD", size: "390 MB", format: "x264 MP4", speed: "15 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "720p HD", size: "1.0 GB", format: "x264 AAC", speed: "30 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.3 GB", format: "HEVC 5.1", speed: "52 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "azaad-2025",
        title: "Azaad",
        year: 2025,
        rating: 7.6,
        quality: "1080p FHD",
        category: "Bollywood",
        genres: ["Adventure", "Drama", "Family"],
        duration: "2h 15m",
        posterUrl: "https://image.tmdb.org/t/p/w500/yWFpiJcUJfXRbm3om48kNJ0MU7A.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        synopsis: "An emotional bond between a young boy, a loyal stallion, and a battle-hardened uncle in pre-independence rural India.",
        director: "Abhishek Kapoor",
        cast: ["Ajay Devgn", "Aaman Devgan", "Rasha Thadani"],
        featured: false,
        downloads: [
            { res: "720p HD", size: "1.1 GB", format: "x264 AAC", speed: "28 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.5 GB", format: "10-Bit HEVC", speed: "48 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "sky-force-2025",
        title: "Sky Force",
        year: 2025,
        rating: 8.0,
        quality: "4K UHD",
        category: "Bollywood",
        genres: ["Action", "War", "Thriller"],
        duration: "2h 28m",
        posterUrl: "https://image.tmdb.org/t/p/w400/ii1Uik577OnQp1i5IAwpfOEpeC7.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        synopsis: "India's first and deadliest airstrike during the 1965 Indo-Pak war told through the eyes of daring Indian Air Force fighter pilots.",
        director: "Sandeep Kewlani",
        cast: ["Akshay Kumar", "Veer Pahariya", "Sara Ali Khan", "Nimrat Kaur"],
        featured: false,
        downloads: [
            { res: "720p HD", size: "1.3 GB", format: "x264 AAC", speed: "30 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "3.0 GB", format: "HEVC Atmos", speed: "55 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD", size: "8.2 GB", format: "2160p HDR", speed: "80 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "do-patti-2024",
        title: "Do Patti",
        year: 2024,
        rating: 7.3,
        quality: "1080p FHD",
        category: "Bollywood",
        genres: ["Mystery", "Thriller", "Drama"],
        duration: "2h 07m",
        posterUrl: "https://image.tmdb.org/t/p/w342/cqStHxRVUtFNaNnJtieHeXIackv.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/qg_nEa51pT8",
        synopsis: "A gripping cat-and-mouse game in the misty hills of Uttarakhand between a relentless police inspector and twin sisters entangled in a domestic crisis.",
        director: "Shashanka Chaturvedi",
        cast: ["Kajol", "Kriti Sanon", "Shaheer Sheikh"],
        featured: false,
        downloads: [
            { res: "720p HD", size: "1.1 GB", format: "x264 AAC", speed: "25 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.4 GB", format: "10-Bit HEVC", speed: "45 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "sarfira-2024",
        title: "Sarfira",
        year: 2024,
        rating: 7.9,
        quality: "1080p FHD",
        category: "Bollywood",
        genres: ["Drama"],
        duration: "2h 35m",
        posterUrl: "https://image.tmdb.org/t/p/w342/5crEOhhGl2ORIQRZPbmZpUBK4rt.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/c8jEcmTjPsw",
        synopsis: "An ambitious visionary from rural India struggles against powerful airline conglomerates to make low-cost flying affordable for everyday citizens.",
        director: "Sudha Kongara",
        cast: ["Akshay Kumar", "Radhika Madan", "Paresh Rawal"],
        featured: false,
        downloads: [
            { res: "720p HD", size: "1.2 GB", format: "x264 AAC", speed: "26 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD", size: "2.7 GB", format: "10-Bit HEVC", speed: "50 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "anand-1971",
        title: "Anand",
        year: 1971,
        rating: 9.2,
        quality: "1080p Remastered",
        category: "Bollywood",
        genres: ["Classics", "Drama"],
        duration: "2h 12m",
        posterUrl: "https://bollyflixcdn.site/wp-content/uploads/2020/04/Anand-1971-Hindi-Movie.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        synopsis: "The immortal masterpiece of Anand, a terminally ill man who wishes to live his remaining life to the fullest, touching every soul around him with joy.",
        director: "Hrishikesh Mukherjee",
        cast: ["Rajesh Khanna", "Amitabh Bachchan", "Sumita Sanyal"],
        featured: false,
        downloads: [
            { res: "720p HD Remastered", size: "950 MB", format: "x264 AAC", speed: "25 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD Restored", size: "2.1 GB", format: "10-Bit HEVC", speed: "40 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    },
    {
        id: "stranger-things-s4",
        title: "Stranger Things (Season 4)",
        year: 2022,
        rating: 8.7,
        quality: "4K UHD",
        category: "Web Series",
        genres: ["Sci-Fi", "Horror", "Drama"],
        duration: "9 Episodes",
        posterUrl: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920&auto=format&fit=crop",
        trailerEmbed: "https://www.youtube.com/embed/yQEondeGvLk",
        synopsis: "Darkness returns to Hawkins as a terrifying psychological threat from the Upside Down emerges, known as Vecna.",
        director: "The Duffer Brothers",
        cast: ["Millie Bobby Brown", "David Harbour", "Winona Ryder", "Finn Wolfhard"],
        featured: false,
        downloads: [
            { res: "720p Dual Audio Pack", size: "4.8 GB", format: "Hindi-Eng", speed: "35 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "1080p FHD Dual", size: "11.2 GB", format: "10-Bit HEVC Atmos", speed: "65 MB/s", link: "https://fastdl.club/dl/6d68c8" },
            { res: "4K UHD Dolby Vision", size: "26.0 GB", format: "2160p Remux", speed: "95 MB/s", link: "https://fastdl.club/dl/6d68c8" }
        ]
    }
];

// Helper Functions
function getMovieById(id) {
    return MOVIE_DATABASE.find(m => m.id === id) || MOVIE_DATABASE[0];
}

function getMoviesByCategory(category) {
    if (!category || category === "All") return MOVIE_DATABASE;
    return MOVIE_DATABASE.filter(m => m.category.toLowerCase() === category.toLowerCase());
}

function getMoviesByGenre(genre) {
    if (!genre || genre === "All") return MOVIE_DATABASE;
    return MOVIE_DATABASE.filter(m => m.genres.some(g => g.toLowerCase() === genre.toLowerCase()));
}

function searchMovies(query) {
    if (!query) return MOVIE_DATABASE;
    const q = query.toLowerCase().trim();
    return MOVIE_DATABASE.filter(m => 
        m.title.toLowerCase().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q)) ||
        m.category.toLowerCase().includes(q) ||
        m.year.toString().includes(q) ||
        (m.cast && m.cast.some(c => c.toLowerCase().includes(q)))
    );
}

// Watchlist Helpers
function getWatchlist() {
    try {
        return JSON.parse(localStorage.getItem('user_watchlist') || '[]');
    } catch(e) {
        return [];
    }
}

function toggleWatchlist(id) {
    const list = getWatchlist();
    const idx = list.indexOf(id);
    if (idx > -1) {
        list.splice(idx, 1);
    } else {
        list.push(id);
    }
    localStorage.setItem('user_watchlist', JSON.stringify(list));
    return list;
}

function isWatchlisted(id) {
    return getWatchlist().includes(id);
}
