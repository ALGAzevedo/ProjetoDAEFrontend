<template>
  <div class="row">
    <div class="col-12 col-lg-3 mx-auto">
      <h3 class="mt-5 mb-3">Login to Cardiacos</h3>
  <form
      class="row g-3 needs-validation"
      novalidate
      @submit.prevent="login"
  >
    <div class="form-group col-12 ">
      <label
          for="inputUsername"
          class="form-label fs-5"
      >Username <span class="text-danger">*</span></label>
      <input
          type="text"
          class="form-control form-control-lg"
          id="inputUsername"
          placeholder="Your username"
          required
          v-model.trim="v$.credentials.username.$model"
          :class="{ 'is-invalid': v$.credentials.username.$errors.length }"
      >
      <div class="invalid-input" v-for="(error, index) of v$.credentials.username.$errors" :key="index">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>

    <div class="form-group col-12 ">
        <label
            for="inputPassword"
            class="form-label fs-5"
        >Password <span class="text-danger">*</span></label>
        <input
            type="password"
            class="form-control form-control-lg"
            id="inputPassword"
            placeholder="Password"
            required
            v-model.trim="v$.credentials.password.$model"
            :class="{ 'is-invalid': v$.credentials.password.$errors.length }"
        >
      <div class="invalid-input" v-for="(error, index) of v$.credentials.password.$errors" :key="index">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
      </div>
    <div class="form-group col-12 mt-4">
      <button
          type="button"
          class="btn btn-lg btn-primary px-5 btn-block w-100"
          :disabled="v$.credentials.$invalid"
          @click="login"
      >Login
      </button>
    </div>
  </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers} from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  name: 'Login',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  validations () {
    return {
      credentials: {
        username: {
          required: helpers.withMessage('This field cannot be empty', required),
        },
        password: {
          required: helpers.withMessage('This field cannot be empty', required),
          minLength: minLength(3)
        }
      }
    }
  },
  emits: [
    'login',
  ],
  methods: {
    login() {
      this.$store.dispatch('login', this.credentials)
          .then(() => {
            this.$toast.success('User ' + this.$store.state.user.name + ' has entered the application.')
            this.$emit('login')
            this.$router.push({name: 'Home'})
          })
          .catch(() => {
            this.credentials.password = ''
            this.$toast.error('User credentials are invalid!')
          })
    },
  }
}
</script>

<style scoped>
</style>
