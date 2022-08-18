import PromotionCard from '@/components/PromotionCard.vue'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import moment from 'moment'

const mockedData = {
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

describe('PromotionCard.vue', () => {
  Vue.prototype.moment = moment
  it('makes sure promotion is defined', () => {
    const wrapper = shallowMount(PromotionCard, {
      propsData: mockedData
    })
    expect(wrapper.props().promotion).toBeDefined()
  })
  it('makes sure the promotion name is rendered', () => {
    const wrapper = shallowMount(PromotionCard, {
      propsData: mockedData
    })
    expect(wrapper.props().promotion.product.name).toBe('Name')
    expect(wrapper.text()).toContain('Name')
  })
  it('makes sure the promotion description is rendered', () => {
    const wrapper = shallowMount(PromotionCard, {
      propsData: mockedData
    })
    expect(wrapper.props().promotion.product.description).toBe('Description')
    expect(wrapper.text()).toContain('Description')
  })
  it('makes sure the date_init and the date_end are rendered and date format is changed', () => {
    const wrapper = shallowMount(PromotionCard, {
      propsData: mockedData
    })
    expect(wrapper.props().promotion.date_init).toBe('2022-05-01 00:00:00')
    expect(wrapper.props().promotion.date_end).toBe('2022-06-30 23:59:59')
    expect(wrapper.text()).toContain('Validez: 05/2022 - 30/06/2022')
  })
})
