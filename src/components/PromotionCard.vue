<template>
  <div class="card">
    <div class="card-images-container">
      <img class="product-image" :src="promotion.product.image" />
      <img class="discount-image" :src="dicountImgSrc"/>
    </div>
    <div class="card-info-container">
      <h3>{{promotion.product.name}}</h3>
      <div>{{promotion.product.description}}</div>
      <div>Valoración: {{promotion.rating}}</div>
        <img :src="fullStar"/>
        <img :src="emptyStar"/>
      <div>Vigencia: {{promotion.date_end}} | {{promotion.date_init}}</div>
    </div>
  </div>
</template>

<script>
import fullStar from '@/assets/icons/full-star.png'
import emptyStar from '@/assets/icons/empty-star.png'
export default {
  data () {
    return {
      fullStar,
      emptyStar
    }
  },
  props: {
    promotion: {
      type: Object,
      required: true
    }
  },
  computed: {
    dicountImgSrc () {
      let discountCode
      const discountStr = this.promotion.discount.toFixed(2).replace('.', '')
      if (this.promotion.discount < 10) {
        discountCode = `0${discountStr}`
      } else {
        discountCode = `${discountStr}`
      }
      return `https://public-storage-cdn-farmapremium.imgix.net/discount-icons/disc_gen_es_${discountCode}.png?w=110`
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  border-radius: 6px;
  margin-bottom: 10px;
  max-width: 360px;
}

.card-images-container{
  background-color: #fafafa;
  border: 0.5px solid #E2E2E2;
  border-radius: 6px 6px 0 0;
  height: 300px;
  position: relative;
}

.product-image{
  width: 100%;
  margin-top: 36px;
}

.discount-image{
  position: absolute;
  left: 22px;
  top: 29px;
}

.card-info-container{
  border: 1px solid rgba(197, 199, 205, 0.3);
  border-radius: 0 0 6px 6px;
}
</style>
