/*export*/ const cart = {
    data(){
      return {
          imgCart: 'img/products.jpg',
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false,
      }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
        
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
<div>
            <button class="btn-cart" type="button" @click="showCart = !showCart">
                <svg width="32px" height="29px" fill="#000000" viewBox="0 0 32.000000 29.000000">
                    <g transform="translate(0,29) scale(0.1,-0.1)">
                         <path d="M0 281 c0 -6 11 -11 23 -11 22 0 26 -9 48 -92 l25 -93 81 -3 81 -3
                        25 55 c47 103 51 96 -52 96 -49 0 -93 -4 -96 -10 -4 -6 23 -10 74 -10 45 0 81
                        -2 81 -5 0 -2 -10 -25 -22 -50 l-22 -45 -67 0 -67 0 -23 88 c-24 85 -25 87
                        -57 90 -18 2 -32 -1 -32 -7z" />
                         <path d="M74 35 c-4 -9 -2 -21 4 -27 15 -15 44 -1 40 19 -4 23 -36 29 -44 8z" />
                         <path d="M242 28 c4 -30 43 -33 43 -3 0 13 -8 21 -23 23 -20 3 -23 0 -20 -20z" />
                    </g>
                </svg>
            </button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @remove="remove">
                </cart-item>
            </div>
</div>`
});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$ {{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});
