<template>
  <div id="container">
    <div id="app">

      <!-- <div v-for="product in productList" :key="product.name" style="list-style: none">
        <app-image :imageUrl="product.image"></app-image>
      </div> -->

      <!-- <app-image :imageUrl="productList[1].image"></app-image> -->

      <table class="table table-borderless">
        <tbody>
          <tr>
            <td>
              <app-image v-on:clicked="onClickAdd" :imageUrl="productList[1]"></app-image>
            </td>
            <td rowspan="2">
              <app-image v-on:clicked="onClickAdd" :imageUrl="productList[0]"></app-image>
            </td>
            <td>
              <app-image v-on:clicked="onClickAdd" :imageUrl="productList[2]"></app-image>
            </td>
          </tr> 
          <tr>
            <td>
              <app-image v-on:clicked="onClickAdd" :imageUrl="productList[3]"></app-image>
            </td>
            <td>
              <app-image v-on:clicked="onClickAdd" :imageUrl="productList[4]"></app-image>
            </td>
          </tr>
        </tbody>
      </table>

      <br /><br />
      <hr class="solid">
      <br /><br />

      <div>
        <div class="cart-header">
          SHOPPING CART - {{this.totalItems}} ITEMS
        </div>
        <div class="table-cart">
          <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col" style="width: 150px;">Image</th>
                <th scope="col" style="width: 300px;">Product</th>
                <th scope="col" style="width: 150px;">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list, index) in this.shoppingCart" v-bind:key="index">
                <td><button type="submit" @click="delRow(index)" class="btn btn-primary btn-sm">X</button></td>
                <td><img :src="list.image"></td>
                <td>{{list.name}}</td>
                <td>SGD ${{list.price}}</td>
                <td>{{list.qty}}</td>
                <td>SGD ${{list.price * list.qty}}</td>
              </tr>
              <tr>
                <td colspan="5">TOTAL :</td>
                <td>SGD ${{this.totalPrice}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
      shoppingCart: [],
      totalItems: 0,
      totalPrice: 0
    }
  },
  methods: {
    onClickAdd (fromChild) {
      //set shopping cart total
      this.totalItems += 1

      //set shopping cart detail item
      if (this.shoppingCart.some(items => items.name === fromChild[0])) {
        //update product qty
        for (let i = 0; i < this.shoppingCart.length; i++) {
          if (this.shoppingCart[i].name === fromChild[0]) {
            this.shoppingCart[i].qty += 1
          }
        }
        // alert('product already exist')
      } else {
        // add product to array
        const cartDetail = {
          name: fromChild[0],
          image: fromChild[1],
          price: fromChild[2],
          qty: fromChild[3]
        }
        this.shoppingCart.push(cartDetail)
      }
      this.countPrice()
    },
    delRow(index) {
      this.shoppingCart.splice(index, 1)
      this.countItems()
      this.countPrice()
    },
    countItems() { 
      this.totalItems = 0
      for (let i = 0; i < this.shoppingCart.length; i++) {
        this.totalItems += this.shoppingCart[i].qty
      }
    },
    countPrice() { 
      this.totalPrice = 0
      for (let i = 0; i < this.shoppingCart.length; i++) {
        this.totalPrice += this.shoppingCart[i].qty * this.shoppingCart[i].price
      }
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
  },
}
</script>
