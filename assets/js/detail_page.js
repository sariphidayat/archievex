<<<<<<< HEAD
=======

>>>>>>> b84b411 (Reorganisasi lokasi file)
function myApp() {
    const params = new URLSearchParams(window.location.search);

    return {
<<<<<<< HEAD
        page_id         : params.get('id'),
        mobileMenuOpen  : false,
        currentPage     : 1,
        currentTab      : 'chapters',
        searchQuery     : "",
        detail          : {},
        currentComic    : {},
        isBookmarked    : false,

        async init() {
            await this.loadJSON();
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
                    link     : `detail.html?id=${this.detail.id}`
                };
            } catch (error) {
                console.error("Gagal memuat data:", error);
            }
        },

        get chapters() {
            if (!this.detail.chapters) return [];
            const { start, end } = this.detail.chapters;

            let result  = [];
            let page    = 1;
=======
        page_id: params.get('id'),
        mobileMenuOpen: false,
        currentPage: 1,
        currentTab: 'chapters',
        searchQuery: "",
        detail: [], // Data chapter bisa diisi dari API atau statis
        currentComic: {},
        pageRange: "", // Format: "start:end", misal "1:308"
        picture: "",
        genres: [],
        authors: [],
        artists: ["Artist A", "Artist B", "Artist C", "Artist D"],
        format: "",
        status: "",

        async init() {
            await this.loadJSON();
            document.title = `ArchieveX - ${this.detail.length > 0 ? this.detail[0].title : ''}`;


            this.currentComic = {
                id: this.detail.length > 0 ? this.detail[0].id : "",
                title: this.detail.length > 0 ? this.detail[0].title : "",
                subtitle: this.detail.length > 0 ? this.detail[0].sub_title : "",
                image: this.detail.length > 0 ? this.detail[0].picture : "",
                link: this.detail.length > 0 ? `detail.html?id=${this.detail[0].id}` : ""
            };

            this.updateBookmarkButton();

            // TODO: dev only
            // console.log(this.detail[0]);
        },

        async loadJSON() {
            const response = await fetch('assets/data.json');
            const data = await response.json();
            this.detail = data.filter(item => item.id === this.page_id);

            if (this.detail.length === 0) {
                window.location.href = 'index.html';
                return;
            }
            
            this.pageRange = this.detail.length > 0 ? this.detail[0].chapters : "";
            this.picture = this.detail.length > 0 ? this.detail[0].picture : "";

            this.genres = this.detail.length > 0 ? this.detail[0].genres : [];
            this.authors = this.detail.length > 0 ? this.detail[0].authors : [];
            this.artists = this.detail.length > 0 ? this.detail[0].artists : [];
            this.format = this.detail.length > 0 ? this.detail[0].format : "";
            this.status = this.detail.length > 0 ? this.detail[0].status : "";


        },

        get chapters() {
            const [start, end] = [this.pageRange.start, this.pageRange.end];

            let result = [];
            let page = 1;
>>>>>>> b84b411 (Reorganisasi lokasi file)
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
<<<<<<< HEAD
            if (!this.detail.chapters) return 0;
            const { start, end } = this.detail.chapters;
            return Math.ceil((end - start + 1) / 12);
        },

        checkBookmark() {
            const bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
            this.isBookmarked = bookmarks.some(b => b.id === this.page_id);
        },

        toggleBookmark() {
            let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
            
            if (this.isBookmarked) {
                bookmarks = bookmarks.filter(
                    b => b.id !== this.currentComic.id
                );
            } else {
                bookmarks.push(this.currentComic);
            }

            localStorage.setItem(
                'myBookmarks',
                JSON.stringify(bookmarks)
            );

            this.isBookmarked = !this.isBookmarked;
        }
    }
}
=======
            const [start, end] = [this.pageRange.start, this.pageRange.end];
            return Math.ceil((end - start + 1) / 12);
        },

        searchChapter() {
            this.searchQuery = document.getElementById('chapterSearch').value.toLowerCase();
        },

        updateBookmarkButton() {
            const btn = document.getElementById('bookmarkBtn');
            const bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
            const active = bookmarks.some(b => b.id === this.currentComic.id);
            btn.className = `px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition ${active ? 'bg-yellow-400 text-black' : 'bg-[#7c749c]'}`;
            document.getElementById('bookmarkText').innerText = active ? "Bookmarked" : "Bookmark";
        },

        toggleBookmark() {
            let b = JSON.parse(localStorage.getItem('myBookmarks')) || [];
            const idx = b.findIndex(x => x.id === this.currentComic.id);
            idx > -1 ? b.splice(idx, 1) : b.push(this.currentComic);
            localStorage.setItem('myBookmarks', JSON.stringify(b));
            this.updateBookmarkButton();

        }
    }

}
>>>>>>> b84b411 (Reorganisasi lokasi file)
