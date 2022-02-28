<template>
  <div class="list-wrapper">
    <ul>
      <li
        v-for="(cartItem, index) in $store.state.cartItems"
        :key="index"
        class="list-item"
      >
        <img :src="cartItem.imageUrl" :alt="cartItem.name" class="thumbnail" />
        <div class="description">
          <p>{{ cartItem.name }}</p>
          <span>{{ cartItem.price }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { FETCH_CART_ITEMS } from '@/store'

export default {
  // Pages 하위가 아니기 때문에 동작안함
  //   async asyncData({ store }) {
  //     await store.dispatch(FETCH_CART_ITEMS)
  //   },
  /**
   * SSR을 사용시 Pages외 컴포넌트에서 데이터 불러올때 사용
   * 브라우저에서 url 변경시에도 가능
   * 서버에서 호출하고 접근하는지, 바로 접근하는지에 따라 적용을 고려
   * aynscdata는 this가 안되고, fetch는 this가 적용됨
   * 해당 브라우저에 이미 컴포넌트가 생성되어있을경우는 this가 vueComponet가됨
   */
  async fetch() {
    await this.$store.dispatch(FETCH_CART_ITEMS)
  },
}
</script>

<style scoped>
.container {
  margin: 2rem 10rem;
}
.list-title {
  font-weight: 700;
  font-size: 1.4rem;
}
.list-wrapper {
  margin: 0.4rem 0;
}
.list-item {
  display: flex;
}
.thumbnail {
  width: 100px;
  height: 100px;
}
.description {
  padding: 2rem 1rem;
}
.extra-panel {
  text-align: right;
  padding: 0.2rem 0;
}
</style>
