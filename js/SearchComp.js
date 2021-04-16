/*export*/ const search_form = {
    data: {
        userSearch: '',
    },
    template: `
            <form class="header__form" action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <div class="header__block">
                    <button class="header__browse">Browse</button>
                </div>
                <div class="header__block_cearch">
                    <input class="header__input" type="text" placeholder="Search for Item..." v-model="userSearch">
                    <button type="submit" class="header__cearch"><span class="loupe"></span></button>
                </div>
            </form>
    `
});
