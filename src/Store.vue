<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <p>test page</p> -->
    <ul v-for="product in productList" :key="product.name" style="list-style: none">
      <li>
        <img :src="product.image" v-bind:alt="product.name">
        <app-image :src="product.image" v-bind:alt="product.name"></app-image>
      </li>
    </ul>
    
  </div>
</template>

<script>
import AppImage from './components/AppImage.vue'
import api from './services/api'

export default {
  name: 'Store',
  components: {
    AppImage
  },
  data() {
    return {
      productList: '',
    }
  },
  async created() {
    const storeApi = api('')
    const storeResult = await storeApi.get()

    this.productList = await Promise.all(
      storeResult.data.map(async (x) => ({
        currency: x.currency,
        image: x.image,
        name: x.name,
        price: x.price
      })),
    );
    // console.log(this.productList)
  },
}
</script>
