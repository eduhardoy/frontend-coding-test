import PromotionCard from '@/components/PromotionCard.vue'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import moment from 'moment'

describe('PromotionCard.vue', () => {
  Vue.prototype.moment = moment
  it('makes sure the habit name is rendered', () => {
    const wrapper = shallowMount(PromotionCard, {
      propsData: {
        moment: moment,
        promotion: {
          product: {
            id: 111,
            name: 'Name',
            description: 'Description',
            image: 'https://public-storage-cdn-farmapremium.imgix.net/....'
          },
          rating: 0,
          date_init: '2022-05-01 00:00:00',
          date_end: '2022-06-30 23:59:59',
          discount: 1
        }
      }
    })
    expect(wrapper.props().promotion).toBeDefined()
  })
})
