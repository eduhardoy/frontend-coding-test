<template>
  <div class="card">
    <div class="card-images-container">
      <img class="product-image" :src="promotion.product.image" />
      <img class="discount-image" :src="dicountImgSrc"/>
    </div>
    <div class="card-info-container">
      <div>
        <img v-if="promotion.rating>=1" :src="fullStar"/>
        <img v-else :src="emptyStar"/>
        <img v-if="promotion.rating>=2" :src="fullStar"/>
        <img v-else :src="emptyStar"/>
        <img v-if="promotion.rating>=3" :src="fullStar"/>
        <img v-else :src="emptyStar"/>
        <img v-if="promotion.rating>=4" :src="fullStar"/>
        <img v-else :src="emptyStar"/>
        <img v-if="promotion.rating==5" :src="fullStar"/>
        <img v-else :src="emptyStar"/>
      </div>
      <h3>{{promotion.product.name}}</h3>
      <div class="card-info-description">{{promotion.product.description}}</div>
      <div class="card-info-vigencia">Validez: {{moment(promotion.date_init).format('MM/YYYY')}} - {{moment(promotion.date_end).format('DD/MM/YYYY')}}  </div>
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
@import '@/scss/design_token.scss';
.card{
  border-radius: 6px;
  max-width: 360px;
  margin-bottom: 50px;
  margin-right: 20px;
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
  border-top: none;
  border-radius: 0 0 6px 6px;
  padding: 20px 26px;
}

.card-info-container h3{
  font-size: 18px;
  line-height: 28px;
  margin-top: 14px;
  height: 56px;
}

.card-info-description{
  font-size: 13px;
  line-height: 20px;
  margin-top: 7px;
  height: 85px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.card-info-vigencia{
  font-size: 13px;
  line-height: 20px;
  color: $brand-01;
  margin-top: 9px;
}

@media only screen and (max-width: 650px) {
  .card{
  border-radius: 6px;
  max-width: 335px;
  margin-bottom: 20px;
  margin-right: 0px;
}

.card-images-container{
  height: 280px;
}

.product-image{
  margin-top: 33px;
}
}
</style>
