<template>
    <div class="row">
      <div class="col-12 col-lg-12">
<!--        <h3 class="mt-5 mb-3">{{ userTitle }}</h3>-->
        <form class="row g-3 needs-validation" @submit.prevent="save">

          <div class="form-group col-12 col-md-6">
            <label for="prcName" class="form-label">Name</label>
            <input type="text" class="form-control" name="name" id="prcName" placeholder="Name"
                   required v-model="prc.name">
            <field-error-message :errors="errors" fieldName="name"></field-error-message>
          </div>

          <div class="form-group col-12 col-md-6">
            <label for="inputStartDate" class="form-label">Start Date</label>
            <input type="Date" class="form-control" id="inputStartDate" placeholder=""
                   required v-model="prc.startDate">
            <field-error-message :errors="errors" fieldName="startDate"></field-error-message>
          </div>

          <div class="form-group col-12 col-md-6">
            <label for="inputEndDate" class="form-label">End Date</label>
            <input type="Date" class="form-control" id="inputEndDate" placeholder=""
                   required v-model="prc.endDate">
            <field-error-message :errors="errors" fieldName="endDate"></field-error-message>
          </div>

<!--          <div class="form-group  col-12 col-md-6">-->
<!--            <label for="inputGender" class="form-label">Gender</label>-->
<!--            <select id="inputGender" class="form-control" v-model="editingUser.gender">-->
<!--              <option v-for="gender in genders" :value="gender" v-bind:key="gender">{{gender}} </option>-->
<!--            </select>-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="gender"></field-error-message>-->
<!--          <div class="form-group  col-12 col-md-6">-->
<!--            <label for="inputMaritalStatus" class="form-label">Marital Status</label>-->
<!--            <select id="inputMaritalStatus" class="form-control" v-model="editingUser.maritalStatus">-->
<!--              <option v-for="status in maritalStatus" :value="status" v-bind:key="status">{{status}} </option>-->
<!--            </select>-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="maritalStatus"></field-error-message>-->

<!--          <div class="form-group col-12 col-md-6">-->
<!--            <label for="inputEmail4" class="form-label">Email</label>-->
<!--            <input type="email" class="form-control" id="inputEmail4" placeholder="Email"-->
<!--                   required v-model="editingUser.email">-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="email"></field-error-message>-->
<!--          <div class="form-group col-12 col-md-6">-->
<!--            <label for="inputUsername" class="form-label">Username</label>-->
<!--            <input type="email" class="form-control" id="inputUsername" placeholder="Username"-->
<!--                   required v-model="editingUser.username">-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="email"></field-error-message>-->
<!--          <div class="form-group col-12 col-md-6">-->
<!--            <label for="inputPassword4" class="form-label">Password</label>-->
<!--            <input type="password" class="form-control" id="inputPassword4"-->
<!--                   placeholder="Password"-->
<!--                   required v-model="editingUser.password">-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="password"></field-error-message>-->


<!--          <div class="form-group col-12 col-md-6">-->
<!--            <label for="inputAddress" class="form-label">Address</label>-->
<!--            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"-->
<!--                   required v-model="editingUser.address">-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="adress"></field-error-message>-->
<!--          <div class="form-group col-12 col-md-2">-->
<!--            <label for="inputAddress" class="form-label">Zip code</label>-->
<!--            <input type="text" class="form-control" id="inputZipCode" placeholder="2420-200"-->
<!--                   required v-model="editingUser.postalCode">-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="postalCode"></field-error-message>-->
<!--          <div class="form-group col-12 col-md-4">-->
<!--            <label for="inputAddress" class="form-label">City</label>-->
<!--            <input type="text" class="form-control" id="inputCity" placeholder="Leiria"-->
<!--                   required v-model="editingUser.city">-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="city"></field-error-message>-->
<!--          <div class="form-group col-12 col-md-6">-->
<!--            <label for="inputAddress" class="form-label">Country</label>-->
<!--            <select id="inputCountry" class="form-control" v-model="editingUser.country">-->
<!--              <option v-for="country in countries" :value="country" v-bind:key="country">{{country}} </option>-->
<!--            </select>-->

<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="country"></field-error-message>-->


<!--          <div class="form-group col-12 col-md-4">-->
<!--            <label for="inputEmergencyPhoneNumber" class="form-label">Emergency Phone Number</label>-->
<!--            <input type="text"  class="form-control" id="inputEmergencyPhone" placeholder=""-->
<!--                   required v-model="editingUser.emergencyPhoneNumber">-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="emergencyPhoneNumber"></field-error-message>-->
<!--          <div class="form-group col-12 col-md-4">-->
<!--            <label for="inputAddress" class="form-label">Phone Number</label>-->
<!--            <input type="text" class="form-control" id="inputPhoneNumber" placeholder=""-->
<!--                   required v-model="editingUser.phoneNumber">-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="phoneNumber"></field-error-message>-->
<!--          <div class="form-group col-12 col-md-4">-->
<!--            <label for="inputAddress" class="form-label">Social Security Number</label>-->
<!--            <input type="text" class="form-control" id="inputsocialSecurityNumber" placeholder=""-->
<!--                   required v-model="editingUser.socialSecurityNumber">-->
<!--          </div>-->
<!--          <field-error-message :errors="errors" fieldName="socialSecurityNumber"></field-error-message>-->


<!--          <div class="row px-0 mx-0" v-if="showInstitutionalEmail">-->
<!--            <div class="form-group col-12 col-md-6">-->
<!--              <label for="inputInstitutionalPhoneNumber" class="form-label">Institutional Phone Number</label>-->
<!--              <input type="text"  class="form-control" id="inputIntitutionalPhone" placeholder=""-->
<!--                     required v-model="editingUser.institutionalPhone">-->
<!--            </div>-->
<!--            <field-error-message :errors="errors" fieldName="institutionalPhone"></field-error-message>-->
<!--            <div class="form-group col-12 col-md-6 mt-3 mt-md-0">-->
<!--              <label for="inputInstEmail" class="form-label">Institutonal Email</label>-->
<!--              <input type="text" class="form-control" id="inputInstitutionalEmail" placeholder=""-->
<!--                     required v-model="editingUser.institutionalEmail">-->
<!--            </div>-->
<!--            <field-error-message :errors="errors" fieldName="institutionalEmail"></field-error-message>-->
<!--          </div>-->

<!--          <div class="col-12"><hr></div>-->

          <div class="d-flex mt-3 flex-wrap">
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
      </div>
    </div>
</template>

<script>
export default {
  name: "PrcDetail",
  components: {},
  props: {
    prcCode: {
      type: Number,
      required: true
    },
    operationType: {
      type: String,
      default: 'edit'  // insert / update
    },
  },
  emits: [
    'save',
    'cancel',
  ],
  data() {
    return {
      prc: null,
      newPrc: {
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        patientUsername: ''
      },
      errors: null,
    }
  },
  watch: {
    user(newUser) {
      this.editingUser = newUser
    }
  },
  computed: {
    userTitle() {
      if (!this.usernameIn) {
        return ''
      }
      return this.operationType == 'insert' ? 'New User' : 'User #' + this.usernameIn
    },
  },
  methods: {
    loadPrc (prcCode) {
      this.errors = null
      // if (!prcCode) {
        // this.admin = this.newAdmin()
        // this.originalValueStr = this.dataAsString()
      // } else {
      console.log(prcCode)
        this.$axios.get('prcs/' + prcCode)
            .then((response) => {
              //we need to take type of dto of admin data
              this.prc = response.data
              console.log(this.prc)
            })
            .catch((error) => {
              console.log(error)
            })
      // }
    },
    // save() {
    //   this.newPrc.patientUsername = this.usernameIn
    //
    //   this.$emit('save', this.newPrc)
    // },
    // cancel() {
    //   this.$emit('cancel', this.editingUser)
    // },
  },
  mounted() {
    this.loadPrc(this.prcCode)
  },
}
</script>

  <style scoped>

  </style>