<template>
  <form @submit.prevent="submit">
      <label>Elige el producto en promoción</label>
      <multi-select
        v-model="promotion.product"
        :options="products"
        track-by="id"
        label="name"
        placeholder="Productos"
        select-label=""
        deselect-label=""
        class="select"
      />
      <div class="error" v-if="!$v.promotion.product.required">Se requiere seleccionar un producto</div>
      <label>Descuento a aplicar en el producto</label>
      <input class="form-input" placeholder="Ejemplo: 1.55" type="text" v-model.number="promotion.discount" />
      <div class="error" v-if="!$v.promotion.discount.required">Se requiere un monto de descuento</div>
      <div class="error" v-if="!$v.promotion.discount.between">El monto de descuento debe estar entre 0.05 y 99.95</div>
      <div class="error" v-if="!$v.promotion.discount.multipleOfFiveCents">El monto de descuento debe ser multiplo de 0.05</div>
      <label>Fecha de inicio de la promoción</label>
      <v-date-picker
        :masks="{ title: 'MMM YYYY' }"
        locale="es"
        v-model="promotion.date_init"
        :model-config="{
          type: 'string',
          mask: 'YYYY-MM-DD 00:00:00',
        }"
      >
        <template v-slot="{ inputValue, togglePopover }">
          <input
            class="form-input"
            :value="inputValue"
            placeholder="Ejemplo: 22/05/2022"
            readonly
            @focus="togglePopover"
            @blur="togglePopover"
          />
          <div class="error" v-if="!$v.promotion.date_init.required">Se requiere seleccionar una fecha de inicio</div>
          <div class="error" v-if="!$v.promotion.date_init.fifteenDaysFromNow">La fecha de inicio debe ser 15 días mayor de la fecha actual</div>
        </template>
      </v-date-picker>
      <label>Fecha de fin de la promoción</label>
      <v-date-picker
        locale="es"
        v-model="promotion.date_end"
        :model-config="{
          type: 'string',
          mask: 'YYYY-MM-DD 23:59:59',
        }"
      >
        <template v-slot="{ inputValue, togglePopover }">
          <input
            class="form-input"
            placeholder="Ejemplo: 22/05/2022"
            :value="inputValue"
            readonly
            @focus="togglePopover"
            @blur="togglePopover"
          />
          <div class="error" v-if="!$v.promotion.date_init.required">Se requiere seleccionar una fecha de finalización</div>
        </template>
      </v-date-picker>
      <button type="submit" :disabled="submitStatus === 'PENDING'">Crear promoción</button>
      <p class="typo__p" v-if="submitStatus === 'OK'">La promoción ha sido agregada correctamente</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Por favor rellene el formulario correctamente</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Enviando...</p>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, between } from 'vuelidate/lib/validators'
import moment from 'moment'

const fifteenDaysFromNow = (date) => {
  const day = moment(date, 'YYYY-MM-DD')
  return day.diff(moment([]), 'days') >= 15
}

// eslint-disable-next-line eqeqeq
const multipleOfFiveCents = (value) => (value % 0.05).toFixed(2) == 0 || (value % 0.05).toFixed(2) == 0.05
export default {
  data () {
    return {
      submitStatus: null,
      promotion: {
        date_init: null,
        date_end: null,
        product: null,
        discount: null,
        rating: 0 // Left rating set to default value for new promotions.
      }
    }
  },
  validations: {
    promotion: {
      date_init: {
        required,
        fifteenDaysFromNow
      },
      date_end: {
        required
      },
      product: {
        required
      },
      discount: {
        required,
        between: between(0.05, 99.95),
        multipleOfFiveCents
      },
      rating: {
        required
      }
    }
  },
  computed: {
    ...mapState('promotions', ['products'])
  },
  methods: {
    ...mapActions('promotions', ['fetchProducts']),
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style lang="scss" scoped>
form {
  width: 400px;
}
button[type="submit"]{
  margin-top: 30px;
}
.form-input{
  border: 1px solid #d9d9d9;
  border-radius: 0;
  width: 360px;
  box-sizing: border-box;
  height: 50px;
}
.error {
  color: #f57f6c;
}
</style>
