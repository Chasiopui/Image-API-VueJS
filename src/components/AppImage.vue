<template>
<div>
  <div id="product-image">
    <img :src="imageUrl.image">
  </div>
  <div class="row">
      <div class="col-6">
        <div class="product-name">{{imageUrl.name}}</div>
      </div>
      <div class="col-5">
        <button type="submit"  @click="addItems" class="btn btn-primary btn-sm">ADD TO CART</button>
      </div>
    </div>
  <div class="product-price">SGD ${{imageUrl.price}}</div>
</div>
  
</template>

<script>
// import api from '../services/api'

export default {
  props: ['imageUrl'],
  data() {
    return {
      collections: [], 
      clicked: 1
    }
  },
  methods: {
    addItems () {
      // console.log(this.imageUrl.price)
      this.collections.push(this.imageUrl.name, this.imageUrl.image, this.imageUrl.price, this.clicked)
      this.$emit('clicked', this.collections)
    }
  }
}
</script>