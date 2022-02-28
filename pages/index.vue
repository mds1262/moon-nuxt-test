<template>
  <div class="app">
    <main>
      <!-- <SearchInput
        :search-keyword="searchKeyword"
        @input="updateSearchKeyword"
      /> -->
      <!-- <SearchInput
        v-model="searchKeyword"
      /> -->
      <SearchInput v-model="searchKeyword" @search="searchProducts" />
      <ul>
        <li
          v-for="product in products"
          :key="product.id"
          class="item flex"
          @click="moveToDetailPage(product.id)"
        >
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="product-image"
          />
          <p>{{ product.name }}</p>
          <p>{{ product.price }}</p>
        </li>
      </ul>
      <!-- <ProductList /> -->
      <div class="cart-wrapper">
        <button class="btn" @click="moveToCartPage">장바구니</button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import SearchInput from '@/components/SearchInput.vue'
import { fetchProductByKeyword } from '@/api'
// import ProductList from '~/components/ProductList.vue'

export default {
  components: { SearchInput },
  name: 'Home',
  //   components: { ProductList },
  async asyncData() {
    const response = await axios.get('http://localhost:3000/products')
    // const products = response.data

    const products = response.data.map((item) => {
      return {
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }
    })
    // const products = response.data.map((item) => ({
    //   ...item,
    //   imageUrl: `${item.imageUrl}?random=${Math.random()}`,
    // }))
    return { products }
  },

  data() {
    return {
      searchKeyword: '',
    }
  },

  methods: {
    moveToDetailPage(id) {
      this.$router.push(`detail/${id}`)
    },

    async searchProducts(childeKeyword) {
      console.log('childeKeyword', childeKeyword)
      const res = await fetchProductByKeyword(this.searchKeyword)
      console.log(res)
      this.products = res.data.map((item) => {
        return {
          ...item,
          imageUrl: `${item.imageUrl}?random=${Math.random()}`,
        }
      })
    },

    // updateSearchKeyword(keyword) {
    //   this.searchKeyword = keyword
    // },

    moveToCartPage() {
      this.$router.push('/cart')
    }
  },

  //   data() {
  //     return {
  //       products: [],
  //     }
  //   },

  //   async created() {
  // const response = await axios.get('http://localhost:3000/products')
  // this.products = response.data
  //   },
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}
.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
