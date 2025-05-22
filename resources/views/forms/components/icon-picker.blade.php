@props([
    'initialIcons' => [],
    'fetchUrl'     => route('icons.fetch'),
])

<div x-data="iconPicker(@json($initialIcons), '{{ $fetchUrl }}')" x-init="loadInitial()" class="space-y-2">
    {{-- Search box --}}
    <div>
        <input
            type="search"
            x-model.debounce.300ms="searchTerm"
            @input="search()"
            placeholder="Search icons…"
            class="w-full px-3 py-2 border rounded"
        />
    </div>

    {{-- Grid of icons --}}
    <div class="grid grid-cols-6 gap-2">
        <template x-for="icon in icons" :key="icon.id">
            <button
                type="button"
                @click="select(icon.id)"
                class="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <x-icon-display
                    x-bind:svg_url="icon.svg_url"
                    x-bind:svg_code="icon.svg_code"
                    class="w-6 h-6"
                />
            </button>
        </template>
    </div>

    {{-- Load more --}}
    <div class="text-center" x-show="page < lastPage">
        <button
            type="button"
            @click="loadMore()"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Load More
        </button>
    </div>
</div>

<script>
    function iconPicker(initial, url) {
        return {
            icons: [],
            page: 1,
            lastPage: 1,
            perPage: 60,
            searchTerm: '',
            fetchUrl: url,

            loadInitial() {
                if (initial.data) {
                    this.icons = initial.data;
                    this.page = initial.current_page;
                    this.lastPage = initial.last_page;
                    this.perPage = initial.per_page;
                }
            },

            async search() {
                this.page = 1;
                await this.fetchIcons();
            },

            async loadMore() {
                if (this.page >= this.lastPage) return;
                this.page++;
                await this.fetchIcons(true);
            },

            async fetchIcons(append = false) {
                const params = new URLSearchParams({
                    page: this.page,
                    per_page: this.perPage,
                    search: this.searchTerm,
                });
                const res = await fetch(`${this.fetchUrl}?${params}`);
                const json = await res.json();

                if (append) {
                    this.icons.push(...json.data);
                } else {
                    this.icons = json.data;
                }
                this.page = json.current_page;
                this.lastPage = json.last_page;
            },

            select(id) {
                this.$dispatch('input', id);
                this.$dispatch('change', id);
            },
        };
    }
</script>
