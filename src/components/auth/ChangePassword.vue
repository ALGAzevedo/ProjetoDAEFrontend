<template>
  <form
      class="row g-3 needs-validation"
      novalidate
      @submit.prevent="changePassword"
  >
    <h3 class="mt-5 mb-3">Change Password</h3>
    <hr>
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputCurrentPassword" class="form-label">Current Password</label>
        <input type="password" class="form-control" id="inputCurrentPassword"
               required v-model="passwords.current_password">
        <field-error-message :errors="errors" fieldName="current_password"></field-error-message>
      </div>
    </div>
    <div class="row">
      <div class="mb-3 col-6">
        <label for="inputPassword" class="form-label">New Password</label>
        <input type="password" class="form-control" id="inputPassword"
               required v-model="passwords.password">
        <field-error-message :errors="errors" fieldName="password"></field-error-message>

      </div>
      <div class="mb-3 col-6">
        <label for="inputPasswordConfirm" class="form-label">Password Confirmation</label>
        <input type="password" class="form-control" id="inputPasswordConfirm"
               required v-model="passwords.password_confirm">
        <field-error-message :errors="errors" fieldName="password_confirm"></field-error-message>
      </div>
    </div>
    <div class="row" v-show="isVcard">
      <div class="mb-3 col-6">
        <label for="inputVCodeCP" class="form-label">New Confirmation Code</label>
        <input type="password" class="form-control" id="inputVCodeCP"
               required v-model="passwords.confirmation_code">
        <field-error-message :errors="errors" fieldName="confirmation_code"></field-error-message>
      </div>
      <div class="mb-3 col-6">
        <label for="inputVCodeConfirm" class="form-label">Confirmation Code Confirmation</label>
        <input type="password" class="form-control" id="inputVCodeConfirm"
               required v-model="passwords.confirmation_code_confirm">
        <field-error-message :errors="errors" fieldName="confirmation_code_confirm"></field-error-message>
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <button type="button" class="btn btn-primary px-5" @click="changePassword">Change Password</button>
      <button type="button" class="ms-2 btn btn-primary px-5" @click="changeValidationCode"
              v-show="isVcard">Change Validation Code
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      passwords: {
        current_password: '',
        password: '',
        password_confirm: '',
        confirmation_code: '',
        confirmation_code_confirm: '',
      },
      errors: null,
    }
  },
  emits: [
    'changedPassword',
  ],
  computed: {
    isVcard() {
      return this.$store.state.user.type == 'V';
    },
  },
  methods: {
    changePassword() {
      this.errors = null
      this.$axios.patch('users/' + this.$store.state.user.id + '/password', this.passwords)
          .then(() => {
            this.$toast.success('Password was updated successfully.')
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error('Password was not updated due to validation errors!')
              this.errors = error.response.data.errors
            } else {
              console.log(error)
              this.$toast.error('Password was not updated due to unknown server error!')
            }
          })
    },
    changeValidationCode() {
      this.errors = null
      console.log(this.$store.state.vcard.phone_number)
      this.$axios.patch('vcards/' + this.$store.state.vcard.phone_number + '/validationCode', this.passwords)
          .then(() => {
            this.$toast.success('Validation code was updated successfully.')
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error('Validation code was not updated due to validation errors!')
              this.errors = error.response.data.errors
            } else {
              console.log(error)
              this.$toast.error('Validation code was not updated due to unknown server error!')
            }
          })
    },
  }
}
</script>

<style scoped>
</style>
