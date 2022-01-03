<template>
  <div class="row">
    <div class="col-12 col-sm-8 col-md-5 col-xxl-3 mx-auto">
      <div class="card auth-form">
        <div class="card-body">
          <h3 class="mb-3 fw-bold">Set New Password</h3>
  <form
      class="row g-3 needs-validation"
      novalidate
      @submit.prevent="confirm"

  >
    <div class="form-group col-12 ">
      <label
          for="inputPassword"
          class="form-label fs-label"
      >Password</label>
      <input
          type="password"
          class="form-control form-control-lg"
          id="inputPassword"
          placeholder="Password"
          required
          v-model.trim="v$.form.password.$model"
          :class="{ 'is-invalid': v$.form.password.$errors.length }"
      >
      <div class="invalid-input" v-for="(error, index) of v$.form.password.$errors" :key="index">
        <div class="error-msg fs-label">{{ error.$message }}</div>
      </div>

    </div>

    <div class="form-group col-12 ">
        <label
            for="inputConfirmPassword"
            class="form-label fs-label"
        >Confirm Password</label>
        <input
            type="password"
            class="form-control form-control-lg"
            id="inputConfirmPassword"
            placeholder="Password confirmation"
            required
            v-model.trim="v$.form.confirmPassword.$model"
            :class="{ 'is-invalid': v$.form.confirmPassword.$errors.length }"
        >
      <div class="invalid-input" v-for="(error, index) of v$.form.confirmPassword.$errors" :key="index">
        <div class="error-msg fs-label">{{ error.$message }}</div>
      </div>
      </div>
    <div class="form-group col-12 ">
      <button
          :disabled="v$.form.$invalid"
          type="button"
          class="btn btn-lg btn-primary px-5 btn-block w-100"
          @click="confirm"
      >Submit
      </button>
    </div>
  </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  name: 'Confirm',
  data() {
    return {
      form: {
        password: '',
        confirmPassword: '',
        token: ''
      }
    }
  },
  validations () {
    return {
      form: {
        password: {
          required,
          minLength: minLength(3)
        },
        confirmPassword: {
          sameAsPassword: sameAs(this.form.password)
        }
      }
    }
  },
  methods: {
    async confirm() {
      const result = await this.v$.$validate()
      if (!result) {
        this.$toast.error('Unable to submit form, fill all fields: ')
        return
      }
      this.form.token = this.$route.query.token;

      this.$axios.post('auth/confirm', this.form)
          .then(() => {
            this.$toast.success('User has entered the application.')
            this.$router.push({name: 'Login'})
          })
          .catch((error) => {
              this.$toast.error(error.response.data)
          })
    },
  }
}
</script>

<style scoped>
</style>
