userTitle
<template>
  <form class="row g-3 needs-validation" @submit.prevent="save">
    <h3 class="mt-5 mb-3">{{ userTitle }}</h3>
    <hr>
    <div class="d-flex flex-wrap justify-content-between">
      <div class="w-100 pe-4">
        <div class="mb-3">
          <label for="inputName" class="form-label">Name</label>
          <input type="text" class="form-control" id="inputName" placeholder="User Name"
                 required v-model="editingUser.name">
          <field-error-message :errors="errors" fieldName="name"></field-error-message>
        </div>
        <div class="mb-3 px-1">
          <label for="inputEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="inputEmail" placeholder="Email"
                 required v-model="editingUser.email">
          <field-error-message :errors="errors" fieldName="email"></field-error-message>
        </div>
        <div class="row" v-show="operationType=='insert'">
          <div class="col-6">
            <div class="mb-3">
              <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword"
                       placeholder="Password"
                       required v-model="editingUser.password">
              </div>
              <field-error-message :errors="errors" fieldName="password"></field-error-message>
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <div class="mb-3">
                <label for="inputPasswordConfirm" class="form-label">Password Confirmation</label>
                <input type="password" class="form-control" id="inputPasswordConfirm"
                       placeholder="Password Confirmation"
                       required v-model="editingUser.password_confirm">
              </div>
            </div>
            <field-error-message :errors="errors" fieldName="password_confirm"></field-error-message>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-3">
      <div class="p-2">
        <button
            type="button"
            class="btn btn-primary px-5"
            @click="save"
        >Save
        </button>
      </div>
      <div class="p-2">
        <button
            type="button"
            class="btn btn-light px-5"
            @click="cancel"
        >Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UserDetail',
  components: {},
  props: {
    user: {
      type: Object,
      required: true
    },
    operationType: {
      type: String,
      default: 'edit'  // insert / update
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: [
    'save',
    'cancel',
  ],
  data() {
    return {
      editingUser: this.user
    }
  },
  watch: {
    user(newUser) {
      this.editingUser = newUser
    }
  },
  computed: {
    userTitle() {
      if (!this.editingUser) {
        return ''
      }
      return this.operationType == 'insert' ? 'New Admin' : 'Admin #' + this.editingUser.id
    },
  },
  methods: {
    save() {
      this.$emit('save', this.editingUser)
    },
    cancel() {
      this.$emit('cancel', this.editingUser)
    }
  }
}
</script>

<style scoped>

</style>
