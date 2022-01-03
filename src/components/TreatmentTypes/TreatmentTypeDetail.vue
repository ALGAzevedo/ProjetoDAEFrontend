<template>
  <div class="row my-5 px-5">
    <div class="col-12 col-lg-12">
      <!--        <h3 class="mt-5 mb-3">{{ userTitle }}</h3>-->
      <form class="row g-3 needs-validation" @submit.prevent="save">

        <div class="row py-2">
          <div class="col w-100">
            <div class="form-group col-12 col-md-12">
              <label for="prcName" class="form-label fs-5 fw-bold">Name</label>
              <input type="text" class="form-control" name="name" id="prcName" placeholder="Name"
                     required v-model="editingTreatment.name">
              <field-error-message :errors="errors" fieldName="name"></field-error-message>
            </div>
          </div>
          <div class="col w-100" v-if="showDropDown">
            <div class="dropdown">
              <button
                  class="btn btn-primary dropdown-toggle"
                  type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                Treatment Types: {{value}}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                <li v-for="option in possibleValues" :key="option">
                  <a class="dropdown-item" @click="value = option" href="javascript:void(0)">{{option}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row py-2">
          <div class="col w-100">
            <div class="form-group col-12 col-md-12">
              <label for="inputStartDate" class="form-label fs-5 fw-bold">Start Date</label>
              <input type="Date" class="form-control" id="inputStartDate" placeholder=""
                     required v-model="editingTreatment.startDate">
              <field-error-message :errors="errors" fieldName="startDate"></field-error-message>
            </div>
          </div>
          <div class="col w-100">
            <div class="form-group col-12 col-md-12">
              <label for="inputEndDate" class="form-label fs-5 fw-bold">End Date</label>
              <input type="Date" class="form-control" id="inputEndDate" placeholder=""
                     required v-model="editingTreatment.endDate">
              <field-error-message :errors="errors" fieldName="endDate"></field-error-message>
            </div>
          </div>
        </div>
<!--        <div class="row py-2">-->
<!--          <div class="form-group col-12 col-md-12">-->
<!--            <label for="healthcareProfessionalUsername" class="form-label fs-5 fw-bold">Healthcare Professional</label>-->
<!--            <input type="text" class="form-control" name="name" id="healthcareProfessionalUsername" placeholder="Healthcare Professional Username"-->
<!--                   required v-model="editingTreatment.healthcareProfessionalUsername">-->
<!--            <field-error-message :errors="errors" fieldName="healthcareProfessionalUsername"></field-error-message>-->
<!--          </div>-->
<!--        </div>-->

        <div class="row py-2">
          <div class="form-group col-12 col-md-12">
            <label for="description" class="form-label fs-5 fw-bold">Description</label>
            <textarea type="text" class="form-control" name="description" id="description" rows="3"
                      v-model="editingTreatment.description"></textarea>
            <field-error-message :errors="errors" fieldName="description"></field-error-message>
          </div>
        </div>

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
  name: "TreatmentTypeDetail",
  components: {},
  props: {
    treatmentTypeCode: {
      type: Number,
      required: true,
      default: -1
    },
    treatmentTypeType: {
      type: String,
      default: ''
    },
    prcCode: {
      type: Number,
      required: true,
      default: -1
    },
    possibleValues: {
      type: Array,
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
  },
  emits: [
    'save',
    'cancel',
  ],
  data() {
    return {
      editingTreatment: this.newTreatmentType(),
      value: null
    }
  },
  // watch: {
  //   user(newUser) {
  //     this.editingUser = newUser
  //   }
  // },
  computed: {
    treatmentTypeName() {
      if (!this.editingTreatment) {
        return ''
      }
      return this.operationType == 'insert' ? 'New Treatment' : 'Treatment #' + this.editingTreatment.code
    },
    showDropDown(){
      return this.operationType === 'insert' ? true : false
    },
    showHealthcareProfessional(){
      return this.operationType === 'insert' ? false : true

    }
  },
  methods: {
    newTreatmentType() {
      return {
        name: ''
      }
    },
    loadTreatmentType (code) {
      console.log(this.treatmentTypeType)
      if (!code) {
        this.editingTreatment = this.newTreatmentType()
      } else {
        this.$axios.get(this.treatmentTypeType + '/'+ code)
            .then((response) => {
              //we need to take type of dto of admin data
              this.editingTreatment = response.data
              this.editingTreatment.healthcareProfessionalUsername = this.editingTreatment.healthcareProfessional.username
            })
            .catch((error) => {
              console.log(error)
            })
      }
    },
    save() {
      // console.log(this.$store.state.user.username)
      this.editingTreatment.treatmentType = this.value
      this.editingTreatment.prcCode = this.prcCode
      this.editingTreatment.healthcareProfessionalUsername = this.$store.state.user.username;
      this.$emit('save', this.editingTreatment)
    },
    cancel() {
      this.$emit('cancel', this.editingTreatment)
    }
  },
  mounted() {
    if (this.operationType === 'update'){
      this.loadTreatmentType(this.treatmentTypeCode)
    }
  }
}
</script>

<style scoped>

</style>