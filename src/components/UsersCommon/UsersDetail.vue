<template>
  <div class="row">
  <div class="col-xl-10 col-xxl-6">
    <div class="main-card bg-white">
  <h3 class="mt-2 mb-3">{{ userTitle }}</h3>
  <form class="row g-3 needs-validation" @submit.prevent="save">

      <div class="form-group col-12 col-md-6">
        <label for="fUserName" class="form-label">Name</label>
        <input type="text" class="form-control" name="name" id="fUserName" placeholder="Nome"
               required v-model="editingUser.name" :class="{ 'is-invalid': errorsMsg }">
        <field-error-message :errors="errorsMsg" fieldName="name"></field-error-message>
      </div>

    <div class="form-group col-12 col-md-6">
      <label for="inputEmail4" class="form-label">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email"
             required v-model="editingUser.email">
      <field-error-message :errors="errorsMsg" fieldName="email"></field-error-message>
    </div>
    <div class="form-group col-12 col-md-6">
      <label for="inputUsername" class="form-label">Username</label>
      <input type="email" class="form-control" id="inputUsername" placeholder="Username"
             required v-model="editingUser.username">
      <field-error-message :errors="errorsMsg" fieldName="username"></field-error-message>
    </div>


      <div class="form-group col-12 col-md-6">
        <label for="inputAddress" class="form-label">Birthdate</label>
        <input type="Date" class="form-control" id="inputBirthday" placeholder=""
               required v-model="editingUser.birthdate">

        <field-error-message :errors="errorsMsg" fieldName="birthdate"></field-error-message>
      </div>

      <div class="form-group  col-12 col-md-3">
        <label for="inputGender" class="form-label">Gender</label>
        <select id="inputGender" class="form-select" v-model="editingUser.gender">
          <option v-for="gender in genders" :value="gender" v-bind:key="gender">{{gender}} </option>
        </select>
        <field-error-message :errors="errorsMsg" fieldName="gender"></field-error-message>
      </div>

      <div class="form-group  col-12 col-md-3">
        <label for="inputMaritalStatus" class="form-label">Marital Status</label>
        <select id="inputMaritalStatus" class="form-select" v-model="editingUser.maritalStatus">
          <option v-for="status in maritalStatus" :value="status" v-bind:key="status">{{status}} </option>
        </select>
        <field-error-message :errors="errorsMsg" fieldName="maritalStatus"></field-error-message>
      </div>


      <div class="form-group col-12 col-md-4">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4" placeholder="Email"
               required v-model="editingUser.email"
               :disabled="operationType === 'update' ? '' : disabled">
        <field-error-message :errors="errorsMsg" fieldName="email"></field-error-message>
      </div>

        <div class="form-group col-12 col-md-4">
          <label for="inputUsername" class="form-label">Username</label>
          <input type="email" class="form-control" id="inputUsername" placeholder="Username"
                 required v-model="editingUser.username"
          :disabled="operationType === 'update' ? '' : disabled">
          <field-error-message :errors="errorsMsg" fieldName="username"></field-error-message>
        </div>

      <div class="form-group col-12 col-md-4">
        <label for="inputAddress" class="form-label">Address</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"
               required v-model="editingUser.address">
        <field-error-message :errors="errorsMsg" fieldName="address"></field-error-message>
      </div>

      <div class="form-group col-12 col-md-3">
        <label for="inputAddress" class="form-label">Zip code</label>
        <input type="text" class="form-control" id="inputZipCode" placeholder="2420-200"
               required v-model="editingUser.postalCode">
        <field-error-message :errors="errorsMsg" fieldName="postalCode"></field-error-message>
      </div>

      <div class="form-group col-12 col-md-3">
        <label for="inputAddress" class="form-label">City</label>
        <input type="text" class="form-control" id="inputCity" placeholder="Leiria"
               required v-model="editingUser.city">
        <field-error-message :errors="errorsMsg" fieldName="city"></field-error-message>
      </div>

      <div class="form-group col-12 col-md-6">
        <label for="inputAddress" class="form-label">Country</label>
        <select id="inputCountry" class="form-select" v-model="editingUser.country">
          <option v-for="country in countries" :value="country" v-bind:key="country">{{country}} </option>
        </select>
        <field-error-message :errors="errorsMsg" fieldName="country"></field-error-message>
      </div>



      <div class="form-group col-12 col-md-4">
        <label for="inputEmergencyPhone" class="form-label">Emergency Phone Number</label>
        <input type="text"  class="form-control" id="inputEmergencyPhone" placeholder=""
               required v-model="editingUser.emergencyPhoneNumber">
        <field-error-message :errors="errorsMsg" fieldName="emergencyPhoneNumber"></field-error-message>
      </div>

      <div class="form-group col-12 col-md-4">
        <label for="inputAddress" class="form-label">Phone Number</label>
        <input type="text" class="form-control" id="inputPhoneNumber" placeholder=""
               required v-model="editingUser.phoneNumber">
        <field-error-message :errors="errorsMsg" fieldName="phoneNumber"></field-error-message>
      </div>

      <div class="form-group col-12 col-md-4">
        <label for="inputAddress" class="form-label">Social Security Number</label>
        <input type="text" class="form-control" id="inputsocialSecurityNumber" placeholder=""
               required v-model="editingUser.socialSecurityNumber">
        <field-error-message :errors="errorsMsg" fieldName="socialSecurityNumber"></field-error-message>
      </div>

      <div class="form-group col-12 col-md-6" v-if="showInstitutionalPhoneNumber">
        <label for="inputIntitutionalPhone" class="form-label">Institutional Phone Number</label>
        <input type="text"  class="form-control" id="inputIntitutionalPhone" placeholder=""
               required v-model="editingUser.institutionalPhone">
        <field-error-message :errors="errorsMsg" fieldName="institutionalPhone"></field-error-message>
      </div>

      <div class="form-group col-12 col-md-6 " v-if="showInstitutionalEmail">
        <label for="inputInstitutionalEmail" class="form-label">Institutonal Email</label>
        <input type="text" class="form-control" id="inputInstitutionalEmail" placeholder=""
               required v-model="editingUser.institutionalEmail">
        <field-error-message :errors="errorsMsg" fieldName="institutionalEmail"></field-error-message>
      </div>

    <div class="col-12"><hr></div>

    <div class="d-flex mt-3 flex-wrap justify-content-between">
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
            class="btn btn-secondary px-5"
            @click="cancel"
        >Cancel
        </button>
      </div>
    </div>
  </form>
  </div>
  </div>
  </div>
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
      editingUser: this.user,
      errorsMsg : this.errors
    }
  },
  watch: {
    user(newUser) {
      this.editingUser = newUser
    },
    errors(newErr) {
      this.errorsMsg = newErr
    },
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
    verifyForm() {

      let flag = true

      this.errorsMsg = []
      if(this.editingUser.username.trim().length == 0) {
        this.errorsMsg['username']='username cant be null'
        flag = false
      }

      if(!this.editingUser.name || this.editingUser.name.trim().length == 0) {
        this.errorsMsg['name']='name cant be null'
        flag =false
      }

      if(!this.editingUser.email || this.editingUser.email.trim().length == 0)
      {
        this.errorsMsg['email']='email cant be null'
        flag = false
      }

      if(!this.editingUser.gender || this.editingUser.gender.trim().length == 0) {
        this.errorsMsg['gender']='gender cant be null'
        flag = false
      }

      if(!this.editingUser.birthdate || this.editingUser.birthdate.trim().length == 0)
      {
        this.errorsMsg['birthdate']='birthdate cant be null'
        flag = false
      }

      if(!this.editingUser.country || this.editingUser.country.trim().length == 0)
      {
        this.errorsMsg['country']='country cant be null'
        flag = false
      }
      if(!this.editingUser.phoneNumber || this.editingUser.phoneNumber.trim().length == 0) {
        this.errorsMsg['phoneNumber']='phoneNumber cant be null'
        flag = false
      }

      if(!this.editingUser.socialSecurityNumber || this.editingUser.socialSecurityNumber.trim().length == 0) {
        this.errorsMsg['socialSecurityNumber']='socialSecurityNumber cant be null'
        flag = false
      }

      if(this.showInstitutionalEmail && !this.editingUser.showInstitutionalPhone || this.editingUser.showInstitutionalPhone.trim().length == 0)
      {
        this.errorsMsg['institutionalPhone']='InstitutionalPhone cant be null'
        flag = false
      }
      if(this.showInstitutionalPhoneNumber && !this.editingUser.showInstitutionalEmail || this.editingUser.showInstitutionalEmail.trim().length == 0)
      {
        this.errorsMsg['institutionalEmail']='InstitutionalEmail cant be null'
        flag = false
      }
      return flag
    },
    save() {

      if(this.verifyForm())
        this.$emit('save', this.editingUser)

    },
    cancel() {
      this.$emit('cancel', this.editingUser)
    }
  },

}
</script>

<style scoped>

</style>
