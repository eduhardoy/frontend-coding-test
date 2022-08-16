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
        v-for="promotion in paginatedPromotions"
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
      page: 0,
      perpage: PROMO_PER_PAGE
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
      this.page = selectedPage - 1
    }
  },
  computed: {
    numePages () {
      return Math.ceil(this.promotions.length / PROMO_PER_PAGE)
    },
    paginatedPromotions () {
      const start = this.page * this.perpage
      const end = start + this.perpage
      return this.promotions.slice(start, end)
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

.cards-container {
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

@media only screen and (max-width: 1375px) {
.cards-container {
  justify-content: center;
}
}
</style>
