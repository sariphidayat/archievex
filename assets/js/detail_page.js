function myApp() {
    const params = new URLSearchParams(window.location.search);

    return {
        page_id         : params.get('id'),
        mobileMenuOpen  : false,
        currentPage     : 1,
        currentTab      : 'chapters',
        searchQuery     : "",
        detail          : {},
        currentComic    : {},
        isBookmarked    : false,
        apiBookmarks    : [],

        async init() {
            await this.loadJSON();
            if (isAuthenticated()) {
                await this.loadApiBookmarks();
            }
            this.checkBookmark();
        },

        async loadJSON() {
            try {
                const response = await fetch('assets/data.json');
                const data     = await response.json();
                const arrData  = data.filter(item => item.id === this.page_id);

                if (arrData.length === 0) {
                    window.location.href = 'index.html';
                    return;
                }

                this.detail    = arrData[0];
                document.title = `ArchieveX - ${this.detail.title}`;

                this.currentComic = {
                    id       : this.detail.id,
                    title    : this.detail.title,
                    subtitle : this.detail.sub_title,
                    image    : this.detail.picture,
                    link     : `detail.html?id=${this.detail.id}`,
                    read_link: this.detail.read_link,
                };
            } catch (error) {
                console.error("Gagal memuat data:", error);
            }
        },

        async loadApiBookmarks() {
            try {
                const res = await fetch(`${API_BASE}/api/bookmarks`, {
                    headers: getAuthHeaders(),
                });
                if (res.ok) {
                    const data = await res.json();
                    this.apiBookmarks = data.bookmarks || [];
                }
            } catch (_) {}
        },

        checkBookmark() {
            if (isAuthenticated()) {
                this.isBookmarked = this.apiBookmarks.some(b => b.comic_id === this.page_id);
            } else {
                const bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
                this.isBookmarked = bookmarks.some(b => b.id === this.page_id);
            }
        },

        async toggleBookmark() {
            if (isAuthenticated()) {
                await this.toggleBookmarkApi();
            } else {
                this.toggleBookmarkLocal();
            }
        },

        async toggleBookmarkApi() {
            const btn = document.getElementById('bookmarkBtn');
            btn.disabled = true;

            try {
                if (this.isBookmarked) {
                    const res = await fetch(`${API_BASE}/api/bookmarks/${this.page_id}`, {
                        method: 'DELETE',
                        headers: getAuthHeaders(),
                    });
                    if (res.ok) {
                        this.isBookmarked = false;
                        this.apiBookmarks = this.apiBookmarks.filter(b => b.comic_id !== this.page_id);
                    }
                } else {
                    const res = await fetch(`${API_BASE}/api/bookmarks`, {
                        method: 'POST',
                        headers: getAuthHeaders(),
                        body: JSON.stringify({ comic_id: this.page_id }),
                    });
                    if (res.ok) {
                        const data = await res.json();
                        this.isBookmarked = true;
                        this.apiBookmarks.push(data);
                    }
                }
            } catch (_) {
                console.error('Gagal mengubah bookmark');
            } finally {
                btn.disabled = false;
            }
        },

        toggleBookmarkLocal() {
            let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];

            if (this.isBookmarked) {
                bookmarks = bookmarks.filter(b => b.id !== this.currentComic.id);
            } else {
                bookmarks.push(this.currentComic);
            }

            localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));
            this.isBookmarked = !this.isBookmarked;
        },

        get chapters() {
            if (!this.detail.chapters) return [];
            const { start, end } = this.detail.chapters;

            let result  = [];
            let page    = 1;
            let counter = 0;

            for (let i = end; i >= start; i--) {
                result.push({
                    number: i,
                    page: page
                });

                counter++;

                if (counter >= 12) {
                    page++;
                    counter = 0;
                }
            }

            return result;
        },

        get totalPages() {
            if (!this.detail.chapters) return 0;
            const { start, end } = this.detail.chapters;
            return Math.ceil((end - start + 1) / 12);
        },
    };
}
