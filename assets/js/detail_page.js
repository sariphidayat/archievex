
function myApp() {
    const params = new URLSearchParams(window.location.search);

    return {
        page_id        : params.get('id'),
        mobileMenuOpen : false,
        currentPage    : 1,
        currentTab     : 'chapters',
        searchQuery    : "",
        detail         : {},
        currentComic   : {},
        isBookmarked   : false,

        async init() {
            await this.loadJSON();
            this.checkBookmark();
        },

        async loadJSON() {
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

        },

        get chapters() {
            const {start, end } = this.detail.chapters || {};

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
            const {start, end } = this.detail.chapters || {};
            return Math.ceil((end - start + 1) / 12);
        },

        checkBookmark() {
            const bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
            this.isBookmarked = bookmarks.some(b => b.id === this.currentComic.id);
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

            // update reactive state
            this.isBookmarked = !this.isBookmarked;

        }
    }

}
