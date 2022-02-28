import { fetchCartItems } from '~/api'

export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS'

export const state = () => ({
  cartItems: [],
})

export const mutations = {
  addCartItem(state, cartItem) {
    const newCartItem = {
      ...cartItem,
      imageUrl: `${cartItem.imageUrl}?random=${Math.random()}`,
    }
    state.cartItems.push(newCartItem)
  },

  setCartItems(state, cartItems) {
    state.cartItems = cartItems
  },
}

// 대괄호로 변수을 사용하게되면 동적 키 값 적용
// 변수의 값으로 인식
export const actions = {
  async [FETCH_CART_ITEMS]({ commit }) {
    const { data } = await fetchCartItems()
    const items = data.map((item) => ({
      ...item,
      imageUrl: `${item.imageUrl}?random=${Math.random()}`,
    }))
    commit('setCartItems', items)
  },
  /*
   args
   1.storeContext
   2.nuxtContext
   nuxt Life Cycle에서 가장 먼저 실행됨
  */
  // async nuxtServerInit(storeContext, nuxtContext) {
  //   await storeContext.dispatch(FETCH_CART_ITEMS)
  // //   const { data } = await fetchCartItems()
  // //   const items = data.map((item) => ({
  // //     ...item,
  // //     imageUrl: `${item.imageUrl}?random=${Math.random()}`,
  // //   }))
  // //   storeContext.commit('setCartItems', items)
  // },
}
