<template>
  <div class="row my-5 px-5">
    <div class="col-12 col-lg-12">
      <!--        <h3 class="mt-5 mb-3">{{ userTitle }}</h3>-->
      <form class="row g-3 needs-validation" @submit.prevent="save">

        <div class="row py-2">
          <div class="form-group col-12 col-md-12">
            <label for="prcName" class="form-label fs-5 fw-bold">Name</label>
            <input type="text" class="form-control" name="name" id="prcName" placeholder="Name"
                   required v-model="prc.name">
            <field-error-message :errors="errors" fieldName="name"></field-error-message>
          </div>
        </div>
        <div class="row py-2">
          <div class="col w-100">
            <div class="form-group col-12 col-md-12">
              <label for="inputStartDate" class="form-label fs-5 fw-bold">Start Date</label>
              <input type="Date" class="form-control" id="inputStartDate" placeholder=""
                     required v-model="prc.startDate">
              <field-error-message :errors="errors" fieldName="startDate"></field-error-message>
            </div>
          </div>
          <div class="col w-100">
            <div class="form-group col-12 col-md-12">
              <label for="inputEndDate" class="form-label fs-5 fw-bold">End Date</label>
              <input type="Date" class="form-control" id="inputEndDate" placeholder=""
                     required v-model="prc.endDate">
              <field-error-message :errors="errors" fieldName="endDate"></field-error-message>
            </div>
          </div>
        </div>
        <div class="row py-2">
          <div class="form-group col-12 col-md-12">
            <label for="patientUsername" class="form-label fs-5 fw-bold">Patient Username</label>
            <input type="text" class="form-control" name="name" id="patientUsername" placeholder="Patient Username"
                   required readonly v-model="patientUsername">
            <field-error-message :errors="errors" fieldName="patientUsername"></field-error-message>
          </div>
        </div>

        <div class="row py-2">
          <div class="form-group col-12 col-md-12">
            <label for="description" class="form-label fs-5 fw-bold">Description</label>
            <textarea type="text" class="form-control" name="description" id="description" rows="3" v-model="prc.description"></textarea>
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

    <PrcTreatmentTypes :prcCode="prcCode" v-if="showTreatments"></PrcTreatmentTypes>

  </div>
</template>

<script>

import PrcTreatmentTypes from "../TreatmentTypes/PrcTreatmentTypes";

export default {
  name: "PrcDetail",
  components: {
    PrcTreatmentTypes
  },
  props: {
    username: {
      type: String,
      required: false,
      default: ''
    },
    prcCode: {
      type: Number,
      required: false,
      default: -1
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
      prc: {
        code: '',
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        patientUsername: ''
      },
      errors: null,
      showTreatments: false,
    }
  },
  watch: {
    user(newUser) {
      this.editingUser = newUser
    }
  },
  computed: {
    operation() {
      return (this.prcCode === -1) ? 'insert' : 'edit'
    },
    patientUsername() {
      return this.username;
    }
  },
  methods: {
    loadPrc(prcCode) {
      this.errors = null
      this.$axios.get('prcs/' + prcCode)
          .then((response) => {
            //we need to take type of dto of admin data
            this.prc = response.data
            // console.log(this.prc)
          })
          .catch((error) => {
            console.log(error)
          })
      // }
    },
    save() {
      this.errors = null
      if (this.operation == 'insert') {

        this.$axios.post('prcs', this.prc)
            .then((response) => {
              this.prc = response.data
              this.$router.back()
            })
            .catch((error) => {
              console.log(error.response)
              if (error.response.status == 400) {
                this.$toast.error('PRC was not created due to validation errors!')
                this.splitErrormessage(error.response.data)
                //this.errors = error.response.data
              } else {
                this.$toast.error('PRC was not created due to unknown server error!')
              }
            })
      } else {
        this.prc.patientUsername = this.username;
        this.$axios.put('prcs/' + this.prc.code, this.prc)
            .then((response) => {
              this.$toast.success('PRC "' + response.data.name + '" was updated successfully.')
              this.prc = response.data
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 400) {
                this.$toast.error('PRC ' + this.prc.name + ' was not updated due to validation errors!')
                this.errors = error.response.data
              } else {
                this.$toast.error('PRC ' + this.prc.name + ' was not updated due to unknown server error!')
              }
            })
      }
    },
    cancel() {
      this.$emit('cancel', this.prc)
    },
  },
  mounted() {
    if (this.operation === 'edit') {
      this.showTreatments = true;
      this.loadPrc(this.prcCode)
    }
    console.log(this.username)
    this.prc.patientUsername = this.username
  },
}
</script>

<style scoped>

</style>