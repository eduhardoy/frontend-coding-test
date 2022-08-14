<template>
  <div>
    <div class="promotions-grid">
      <div class="pagination">
        <paginate-buttons
          :page-count="numePages"
          :click-handler="onPageClick"
          :prev-text="'<'"
          :next-text="'>'"
          :container-class="'pagination-container'"
        >
        </paginate-buttons>
      </div>
      <div class="cards-container">
      <promtion-card
        v-for="promotion in promotions"
        :key="promotion.id"
        :promotion="promotion"
      ></promtion-card>
      </div>
    </div>
  </div>
</template>

<script>
import PromtionCard from '@/components/PromotionCard'
const PROMO_PER_PAGE = 9
export default {
  components: { PromtionCard },
  data () {
    return {
      page: 1
    }
  },
  props: {
    promotions: {
      type: Array,
      required: true
    },
    sortValue: {
      type: Object,
      default: () => {
        return {}
      }
    },
    filterValue: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    onPageClick (selectedPage) {
      this.page = selectedPage
    }
  },
  computed: {
    numePages () {
      return Math.ceil(this.promotions.length / PROMO_PER_PAGE)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/design_token.scss';
.promotions-grid {
  max-width: 100%;
}
.pagination-container{
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 200px;
}

.pagination-container li a {
  font-weight: 500;
  color: $medium-grey !important;
}

.cards-container {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
