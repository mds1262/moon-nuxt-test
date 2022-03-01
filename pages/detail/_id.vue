<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="product.imageUrl"
          :alt="product.name"
        />
      </div>
      <div class="side-panel">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ product.price }}</p>
        <button type="button" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createCartItem, fetchProductById } from '@/api'
export default {
  async asyncData({ params }) {
    const id = params.id
    const response = await fetchProductById(id)
    const product = response.data
    return { product }
  },

  // MetaData 처리
  // 함수로 처리하면 Context의 내용을 가져다가 사용가능
  head() {
    return {
    title: `Shopping Item - ${this.product.name}`,
    meta: [
      {
        hid: 'item-description',
        name: 'description',
        content: `이 상품은 ${this.product.name} 입니다`,
      }
    ],
    // link:[
    //   {
    //     rel: '',
    //     href: '',
    //   }
    // ],      
    }
  },

  // head: {
  //   title: 'Shopping Item',
  //   meta: [
  //     {
  //       hid: 'item-description',
  //       name: 'description',
  //       content: '이 상품은 ~~ 입니다',
  //     }
  //   ],
  //   // link:[
  //   //   {
  //   //     rel: '',
  //   //     href: '',
  //   //   }
  //   // ],
  // },

  methods: {
    async addToCart() {
      const res = await createCartItem(this.product)
      console.log(res)
      this.$store.commit('addCartItem', this.product)
      this.$router.push('/cart')
    },
  },

  //   created() {
  //       const id = this.$route.params.id;
  //       fetchProductById(id);
  //   },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.product-image {
  width: 500px;
  height: 375px;
}
.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}
</style>
