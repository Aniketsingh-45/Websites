// ==========================================================================
// CINEMATIC APP LOGIC & INTERACTION ENGINE
// ==========================================================================

const THEMES = [
    { id: "crimson", name: "Crimson Cinema", color: "#e50914" },
    { id: "sapphire", name: "Midnight Sapphire", color: "#00d2ff" },
    { id: "cyberpunk", name: "Cyberpunk Neon", color: "#ff007f" },
    { id: "emerald", name: "Emerald Velvet", color: "#00e676" },
    { id: "gold", name: "Gold Luxe / Noir", color: "#d4af37" }
];

let currentTheme = localStorage.getItem('cinematic_theme') || 'crimson';
let currentPage = 1;
const itemsPerPage = 8;
let currentCategory = "All";
let currentGenre = "All";
let searchQuery = "";
let currentSort = "trending";

// Initialize Everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupHeaderEvents();
    setupModals();
    updateWatchlistBadge();

    // Check if we are on a specific page
    const pageType = document.body.dataset.page;
    if (pageType === "home" || pageType === "movies" || pageType === "series") {
        initCatalogPage();
    } else if (pageType === "details") {
        initDetailsPage();
    } else if (pageType === "genres") {
        initGenresPage();
    }
});

// ==========================================================================
// THEME SWITCHER
// ==========================================================================
function initTheme() {
    setTheme(currentTheme, false);
    
    // Setup Theme Selector in Header
    const themeBtn = document.getElementById('themePickerBtn');
    const themeDropdown = document.getElementById('themeDropdown');
    
    if (themeBtn && themeDropdown) {
        // Render dropdown options
        themeDropdown.innerHTML = THEMES.map(t => `
            <button class="theme-option ${t.id === currentTheme ? 'active' : ''}" onclick="setTheme('${t.id}')">
                <span class="swatch" style="background-color: ${t.color}"></span>
                <span>${t.name}</span>
            </button>
        `).join('');

        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            themeDropdown.classList.remove('show');
        });
    }
}

function setTheme(themeId, notify = true) {
    currentTheme = themeId;
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('cinematic_theme', themeId);

    // Update active state in dropdown
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('onclick').includes(themeId));
    });

    const activeTheme = THEMES.find(t => t.id === themeId);
    const dot = document.querySelector('.theme-color-dot');
    if (dot && activeTheme) {
        dot.style.backgroundColor = activeTheme.color;
    }

    if (notify) {
        showToast(`Theme changed to ${activeTheme ? activeTheme.name : themeId}`);
    }
}

// ==========================================================================
// HEADER & NAVIGATION
// ==========================================================================
function setupHeaderEvents() {
    const searchInput = document.getElementById('globalSearch');
    const searchClear = document.getElementById('searchClear');
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const val = e.target.value;
            if (searchClear) searchClear.style.display = val ? 'block' : 'none';
            debounceTimer = setTimeout(() => {
                searchQuery = val;
                currentPage = 1;
                applyFiltersAndRender();
            }, 250);
        });

        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.style.display = 'none';
                searchQuery = '';
                currentPage = 1;
                applyFiltersAndRender();
            });
        }
    }

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
        });
    }
}

function updateWatchlistBadge() {
    const badge = document.querySelector('.watchlist-badge');
    if (badge) {
        const list = getWatchlist();
        badge.textContent = list.length;
        badge.style.display = list.length > 0 ? 'flex' : 'none';
    }
}

// ==========================================================================
// CATALOG PAGE (HOME, MOVIES, SERIES)
// ==========================================================================
function initCatalogPage() {
    // Setup Sort Select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            applyFiltersAndRender();
        });
    }

    // Setup Category Pills
    const pills = document.querySelectorAll('.pill-btn');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.dataset.category || "All";
            currentPage = 1;
            applyFiltersAndRender();
        });
    });

    applyFiltersAndRender();
}

function applyFiltersAndRender() {
    const pageType = document.body.dataset.page;
    let list = [...MOVIE_DATABASE];

    // Page-level filtering
    if (pageType === "movies") {
        list = list.filter(m => m.category !== "Web Series");
    } else if (pageType === "series") {
        list = list.filter(m => m.category === "Web Series");
    }

    // Category Filter
    if (currentCategory && currentCategory !== "All") {
        list = list.filter(m => m.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Search Query
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        list = list.filter(m => 
            m.title.toLowerCase().includes(q) ||
            m.genres.some(g => g.toLowerCase().includes(q)) ||
            m.category.toLowerCase().includes(q) ||
            m.year.toString().includes(q) ||
            (m.cast && m.cast.some(c => c.toLowerCase().includes(q)))
        );
    }

    // Sorting
    if (currentSort === "rating") {
        list.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === "year") {
        list.sort((a, b) => b.year - a.year);
    } else if (currentSort === "title") {
        list.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Render Grid
    renderGrid(list);
    renderPagination(list);

    // Update Result count
    const countEl = document.getElementById('resultCount');
    if (countEl) {
        countEl.textContent = `Showing ${list.length} ${list.length === 1 ? 'title' : 'titles'}`;
    }
}

function renderGrid(list) {
    const grid = document.getElementById('moviesGrid');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                <h3>No Movies Found</h3>
                <p>We couldn't find any titles matching "${searchQuery || currentCategory}". Try checking your spelling or adjusting filters.</p>
            </div>
        `;
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = list.slice(startIndex, startIndex + itemsPerPage);

    grid.innerHTML = paginatedItems.map(m => {
        const isFav = isWatchlisted(m.id);
        const primaryGenre = m.genres[0] || "Cinema";
        return `
            <article class="movie-card" data-id="${m.id}">
                <div class="card-poster-wrapper">
                    <img src="${m.posterUrl}" alt="${m.title}" class="card-poster" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600'">
                    <div class="card-badges">
                        <span class="card-quality-badge">${m.quality}</span>
                        <div class="card-rating-badge">
                            <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <span>${m.rating}</span>
                        </div>
                    </div>
                    <button class="card-watchlist-btn ${isFav ? 'active' : ''}" onclick="handleWatchlistToggle('${m.id}', event)" title="${isFav ? 'Remove from Watchlist' : 'Add to Watchlist'}">
                        <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                    </button>
                    <div class="card-overlay"></div>
                    <div class="card-quick-actions">
                        <button class="btn-card-trailer" onclick="openTrailerModal('${m.trailerEmbed}', '${m.title}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            Trailer
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div>
                        <div class="card-meta">
                            <span class="card-genre">${primaryGenre}</span>
                            <span>${m.year}</span>
                        </div>
                        <a href="movie-details.html?id=${m.id}" class="card-title" title="${m.title}">${m.title}</a>
                    </div>
                    <button class="btn-download-card" onclick="openDownloadModal('${m.id}')">
                        <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
                        Download
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

function renderPagination(list) {
    const container = document.getElementById('pagination');
    if (!container) return;

    const totalPages = Math.ceil(list.length / itemsPerPage);
    if (totalPages <= 1) {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'flex';

    let html = `
        <button class="page-btn page-nav-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
            &larr; Prev
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }

    html += `
        <button class="page-btn page-nav-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
            Next &rarr;
        </button>
    `;

    container.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    applyFiltersAndRender();
    const target = document.getElementById('catalogTop') || document.getElementById('moviesGrid');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==========================================================================
// WATCHLIST HANDLER
// ==========================================================================
function handleWatchlistToggle(id, e) {
    e.stopPropagation();
    const movie = getMovieById(id);
    const updatedList = toggleWatchlist(id);
    const added = updatedList.includes(id);

    // Update button states across grid
    document.querySelectorAll(`.movie-card[data-id="${id}"] .card-watchlist-btn`).forEach(btn => {
        btn.classList.toggle('active', added);
    });

    updateWatchlistBadge();
    showToast(`${added ? 'Added to' : 'Removed from'} Watchlist: ${movie.title}`);
}

// ==========================================================================
// DETAILS PAGE
// ==========================================================================
function initDetailsPage() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id') || "chhaava-2025";
    const movie = getMovieById(movieId);

    // Set page title
    document.title = `${movie.title} (${movie.year}) - Aniket Ka Movie`;

    // Populate backdrop & details
    const backdrop = document.getElementById('detailBackdrop');
    if (backdrop) backdrop.style.backgroundImage = `url('${movie.backdropUrl}')`;

    const poster = document.getElementById('detailPoster');
    if (poster) {
        poster.src = movie.posterUrl;
        poster.alt = movie.title;
    }

    const titleEl = document.getElementById('detailTitle');
    if (titleEl) titleEl.textContent = `${movie.title} (${movie.year})`;

    const ratingEl = document.getElementById('detailRating');
    if (ratingEl) ratingEl.textContent = movie.rating;

    const durationEl = document.getElementById('detailDuration');
    if (durationEl) durationEl.textContent = movie.duration;

    const qualityEl = document.getElementById('detailQuality');
    if (qualityEl) qualityEl.textContent = movie.quality;

    const synopsisEl = document.getElementById('detailSynopsis');
    if (synopsisEl) synopsisEl.textContent = movie.synopsis;

    const directorEl = document.getElementById('detailDirector');
    if (directorEl) directorEl.textContent = movie.director || "Renowned Director";

    const castEl = document.getElementById('detailCast');
    if (castEl) castEl.textContent = movie.cast ? movie.cast.join(', ') : "Acclaimed Ensemble";

    // Genres pills
    const genresContainer = document.getElementById('detailGenres');
    if (genresContainer && movie.genres) {
        genresContainer.innerHTML = movie.genres.map(g => `<span class="detail-tag">${g}</span>`).join('');
    }

    // Trailer Button
    const trailerBtn = document.getElementById('detailTrailerBtn');
    if (trailerBtn) {
        trailerBtn.addEventListener('click', () => {
            openTrailerModal(movie.trailerEmbed, movie.title);
        });
    }

    // Downloads List
    const downloadsContainer = document.getElementById('detailDownloadsList');
    if (downloadsContainer && movie.downloads) {
        downloadsContainer.innerHTML = movie.downloads.map(dl => `
            <div class="dl-tier-card">
                <div class="dl-tier-left">
                    <span class="dl-res-tag">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                        ${dl.res}
                    </span>
                    <span class="dl-spec-info">${dl.format} &bull; High Speed Mirror</span>
                </div>
                <div class="dl-tier-right">
                    <span class="dl-size">${dl.size}</span>
                    <a href="${dl.link}" target="_blank" class="btn-tier-download" onclick="startSimulatedDownload('${movie.title}', '${dl.res}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
                        Download
                    </a>
                </div>
            </div>
        `).join('');
    }

    // Related Recommendations
    const relatedGrid = document.getElementById('relatedGrid');
    if (relatedGrid) {
        const related = MOVIE_DATABASE.filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))).slice(0, 4);
        relatedGrid.innerHTML = related.map(m => `
            <article class="movie-card">
                <div class="card-poster-wrapper" style="height: 240px;">
                    <img src="${m.posterUrl}" alt="${m.title}" class="card-poster">
                    <div class="card-badges">
                        <span class="card-quality-badge">${m.quality}</span>
                        <div class="card-rating-badge">★ ${m.rating}</div>
                    </div>
                </div>
                <div class="card-body">
                    <a href="movie-details.html?id=${m.id}" class="card-title">${m.title}</a>
                    <button class="btn-download-card" onclick="openDownloadModal('${m.id}')">Download</button>
                </div>
            </article>
        `).join('');
    }
}

// ==========================================================================
// GENRES PAGE
// ==========================================================================
function initGenresPage() {
    const GENRE_CARDS = [
        { name: "Action", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800" },
        { name: "Sci-Fi", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800" },
        { name: "Crime & Thriller", filter: "Thriller", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800" },
        { name: "Comedy", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800" },
        { name: "Historical", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800" },
        { name: "Romance & Drama", filter: "Drama", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800" }
    ];

    const genreGrid = document.getElementById('genreCardsGrid');
    if (genreGrid) {
        genreGrid.innerHTML = GENRE_CARDS.map(g => `
            <div class="genre-card" onclick="selectGenreFilter('${g.filter || g.name}')">
                <div class="genre-card-bg" style="background-image: url('${g.image}')"></div>
                <h3 class="genre-card-title">${g.name}</h3>
            </div>
        `).join('');
    }

    applyFiltersAndRender();
}

function selectGenreFilter(genreName) {
    currentGenre = genreName;
    const filtered = getMoviesByGenre(genreName);
    renderGrid(filtered);
    renderPagination(filtered);
    const countEl = document.getElementById('resultCount');
    if (countEl) countEl.textContent = `Showing ${filtered.length} titles in ${genreName}`;
    const target = document.getElementById('catalogTop');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================================================
// MODALS LOGIC
// ==========================================================================
function setupModals() {
    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeTrailerModal();
                closeDownloadModal();
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTrailerModal();
            closeDownloadModal();
        }
    });
}

function openTrailerModal(embedUrl, title) {
    const modal = document.getElementById('trailerModal');
    const iframe = document.getElementById('trailerIframe');
    const titleEl = document.getElementById('trailerModalTitle');
    if (!modal || !iframe) return;

    iframe.src = `${embedUrl}?autoplay=1`;
    if (titleEl) titleEl.textContent = `${title} - Official Trailer`;
    modal.classList.add('open');
}

function closeTrailerModal() {
    const modal = document.getElementById('trailerModal');
    const iframe = document.getElementById('trailerIframe');
    if (modal) modal.classList.remove('open');
    if (iframe) iframe.src = '';
}

function openDownloadModal(movieId) {
    const movie = getMovieById(movieId);
    const modal = document.getElementById('downloadModal');
    if (!modal) return;

    document.getElementById('dlPoster').src = movie.posterUrl;
    document.getElementById('dlTitle').textContent = movie.title;
    document.getElementById('dlMeta').textContent = `${movie.year} &bull; ${movie.category} &bull; ${movie.genres.join(', ')}`;

    const list = document.getElementById('dlTierList');
    if (list && movie.downloads) {
        list.innerHTML = movie.downloads.map(dl => `
            <div class="dl-tier-card">
                <div class="dl-tier-left">
                    <span class="dl-res-tag">${dl.res}</span>
                    <span class="dl-spec-info">${dl.format} &bull; Server Latency: ~18ms</span>
                </div>
                <div class="dl-tier-right">
                    <span class="dl-size">${dl.size}</span>
                    <a href="${dl.link}" target="_blank" class="btn-tier-download" onclick="startSimulatedDownload('${movie.title}', '${dl.res}')">
                        Download
                    </a>
                </div>
            </div>
        `).join('');
    }

    modal.classList.add('open');
}

function closeDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) modal.classList.remove('open');
}

function startSimulatedDownload(title, res) {
    showToast(`Generating high-speed link for ${title} [${res}]...`);
}

// Toast System
function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}
