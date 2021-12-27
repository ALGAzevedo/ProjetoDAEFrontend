<template>
  <form class="row g-3 needs-validation" @submit.prevent="save">
    <hr>
    <h3 class="mt-5 mb-3">{{ userTitle }}</h3>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="inputAddress">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="John Doe"
               required v-model="editingUser.name">
      </div>
      <field-error-message :errors="errors" fieldName="name"></field-error-message>
      <div class="form-group col-md-2">
        <label for="inputAddress">Birthdate</label>
        <input type="Date" class="form-control" id="inputBirthday" placeholder=""
               required v-model="editingUser.birthdate">
        <field-error-message :errors="errors" fieldName="birthdate"></field-error-message>
      </div>

      <div class="form-group col-md-2">
        <label for="inputGender">Gender</label>
        <select id="inputGender" class="form-control" v-model="editingUser.gender">
          <option v-for="gender in genders" :value="gender" v-bind:key="gender">{{gender}} </option>
        </select>
      </div>
      <field-error-message :errors="errors" fieldName="gender"></field-error-message>
      <div class="form-group col-md-2">
        <label for="inputMaritalStatus">Marital Status</label>
        <select id="inputMaritalStatus" class="form-control" v-model="editingUser.maritalStatus">
          <option v-for="status in maritalStatus" :value="status" v-bind:key="status">{{status}} </option>
        </select>
      </div>
      <field-error-message :errors="errors" fieldName="maritalStatus"></field-error-message>
    </div>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="inputEmail4">Email</label>
        <input type="email" class="form-control" id="inputEmail4" placeholder="Email"
               required v-model="editingUser.email">
      </div>
      <field-error-message :errors="errors" fieldName="email"></field-error-message>
        <div class="form-group col-md-2">
          <label for="inputUsername">Username</label>
          <input type="email" class="form-control" id="inputUsername" placeholder="Username"
                 required v-model="editingUser.username">
        </div>
        <field-error-message :errors="errors" fieldName="email"></field-error-message>
      <div class="form-group col-md-4">
        <label for="inputPassword4">Password</label>
        <input type="password" class="form-control" id="inputPassword4"
               placeholder="Password"
               required v-model="editingUser.password">
      </div>
      <field-error-message :errors="errors" fieldName="password"></field-error-message>
    </div>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="inputAddress">Address</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"
               required v-model="editingUser.address">
      </div>
      <field-error-message :errors="errors" fieldName="adress"></field-error-message>
      <div class="form-group col-md-1">
        <label for="inputAddress">Zip code</label>
        <input type="text" class="form-control" id="inputZipCode" placeholder="2420-200"
               required v-model="editingUser.postalCode">
      </div>
      <field-error-message :errors="errors" fieldName="postalCode"></field-error-message>
      <div class="form-group col-md-2">
        <label for="inputAddress">City</label>
        <input type="text" class="form-control" id="inputCity" placeholder="Leiria"
               required v-model="editingUser.city">
      </div>
      <field-error-message :errors="errors" fieldName="city"></field-error-message>
      <div class="form-group col-md-3">
        <label for="inputAddress">Country</label>
        <select id="inputCountry" class="form-control" v-model="editingUser.country">
          <option v-for="country in countries" :value="country" v-bind:key="country">{{country}} </option>
        </select>

      </div>
      <field-error-message :errors="errors" fieldName="country"></field-error-message>
    </div>
    <div class="form-row">
      <div class="form-group col-md-3">
        <label for="inputEmergencyPhoneNumber">Emergency Phone Number</label>
        <input type="text"  class="form-control" id="inputEmergencyPhone" placeholder=""
               required v-model="editingUser.emergencyPhoneNumber">
      </div>
      <field-error-message :errors="errors" fieldName="emergencyPhoneNumber"></field-error-message>
      <div class="form-group col-md-3">
        <label for="inputAddress">Phone Number</label>
        <input type="text" class="form-control" id="inputPhoneNumber" placeholder=""
               required v-model="editingUser.phoneNumber">
      </div>
      <field-error-message :errors="errors" fieldName="phoneNumber"></field-error-message>
      <div class="form-group col-md-3">
        <label for="inputAddress">Social Security Number</label>
        <input type="text" class="form-control" id="inputsocialSecurityNumber" placeholder=""
               required v-model="editingUser.socialSecurityNumber">
      </div>
      <field-error-message :errors="errors" fieldName="socialSecurityNumber"></field-error-message>
    </div>
    <hr>
    <div class="form-row" v-if="showInstitutionalEmail">
      <div class="form-group col-md-3">
        <label for="inputInstitutionalPhoneNumber">Institutional Phone Number</label>
        <input type="text"  class="form-control" id="inputIntitutionalPhone" placeholder=""
               required v-model="editingUser.institutionalPhone">
      </div>
      <field-error-message :errors="errors" fieldName="institutionalPhone"></field-error-message>
      <div class="form-group col-md-3">
        <label for="inputInstEmail">Institutonal Email</label>
        <input type="text" class="form-control" id="inputInstitutionalEmail" placeholder=""
               required v-model="editingUser.institutionalEmail">
      </div>
      <field-error-message :errors="errors" fieldName="institutionalEmail"></field-error-message>
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
  name: 'UsersDetail',
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
      type: Array,
      default: () => [],
    },
    countries: {
      type: Array,
      default: () => [],
    },
    maritalStatus: {
      type: Array,
      default: () => [],
    },genders: {
      type: Array,
      default: () => [],
    },
    showInstitutionalPhoneNumber: {
      type: Boolean,
      default: true,
    },
    showInstitutionalEmail: {
      type: Boolean,
      default: true,
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
      return this.operationType == 'insert' ? 'New User' : 'User #' + this.editingUser.username
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
