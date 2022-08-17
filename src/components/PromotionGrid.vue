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
        v-for="promotion in filterAndPaginatePromotions"
        :key="promotion.id"
        :promotion="promotion"
      ></promtion-card>
      </div>
    </div>
  </div>
</template>

<script>
import PromtionCard from '@/components/PromotionCard'
import _ from 'lodash'
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
    filterAndPaginatePromotions () {
      const start = this.page * this.perpage
      const end = start + this.perpage
      function sortArrays (array, field, value) {
        return _.orderBy(array, field, value)
      }

      if (this.filterValue) {
        const filterObj = JSON.parse(JSON.stringify(this.filterValue))
        const compare = (field, value, type) => {
          return type === '<' ? field < value : field > value
        }
        const filteredPromotions = this.promotions.filter((promotion) => {
          const fieldValue = promotion[filterObj.value.field]
          return compare(fieldValue, filterObj.value.value, filterObj.value.type)
        })
        if (this.sortValue) {
          const sortObj = JSON.parse(JSON.stringify(this.sortValue))
          return sortArrays(filteredPromotions, sortObj.value.field, sortObj.value.value).slice(start, end)
        } else {
          return filteredPromotions.slice(start, end)
        }
      } else {
        return this.promotions.slice(start, end)
      }
    },
    numePages () {
      if (this.filterValue) {
        const filterObj = JSON.parse(JSON.stringify(this.filterValue))
        const compare = (field, value, type) => {
          return type === '<' ? field < value : field > value
        }
        const filteredPromotions = this.promotions.filter((promotion) => {
          const fieldValue = promotion[filterObj.value.field]
          return compare(fieldValue, filterObj.value.value, filterObj.value.type)
        })
        return Math.ceil(filteredPromotions.length / PROMO_PER_PAGE)
      } else {
        return Math.ceil(this.promotions.length / PROMO_PER_PAGE)
      }
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
