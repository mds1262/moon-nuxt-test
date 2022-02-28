<template>
  <div class="input-wrapper flex">
    <!-- <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    /> -->
    <input
      type="text"
      class="search-input"
      :value="searchKeyword"
      @input="$emit('search', $event.target.value)"
    />
    <button class="btn" type="button" @click="$emit('search', searchKeyword)">Search</button>
  </div>
</template>

<script>
export default {
    // props: {
    //     value: {
    //         type: String,
    //         default: () => ''
    //     }
    // },
  model: {
    prop: 'searchKeyword',
    event: 'search'
  },
  props: {
    // 다른 목적을 위해 'value' 사용이 가능 합니다
    // value: String,
    // 'value'를 대신하는 사용자 지정 속성으로 'title' 사용 합니다
    searchKeyword: {
      type: String,
      default: () => '',
    }
  },

  methods: {
  }
}
</script>

<style scoped>
.input-wrapper {
  height: 40px;
  margin: 1rem 0;
}
.search-input {
  width: 200px;
  font-size: 1.2rem;
  font-weight: 500;
}
.btn {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
