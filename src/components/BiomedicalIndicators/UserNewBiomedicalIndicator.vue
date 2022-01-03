<template>
  <div class="row">
    <div class="col-12 col-lg-4">
      <div class="main-card bg-white">
        <h3 class="mt-2 mb-3">Add New Indicator</h3>

        <table class="table">
          <thead class="visually-hidden">
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="indicator in indicators"
              :key="indicator.id"
          >
            <td>{{ indicator.name }}</td>
            <td class="text-end">
              <div>
                <button
                    class="btn btn-xs btn-light"
                    @click="expand(indicator)"
                ><i class="bi bi-xs bi-arrow-right"></i>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>

    <div class="col-12 col-lg-6">
      <div class="main-card bg-white"  v-if="indicator">
        <form class="row g-3 needs-validation" @submit.prevent="save" >
          <div class="form-group col-12 col-md-4" v-if="isQualitative">
              <label for="inputVal" class="form-label">Possible Values</label>
              <select id="inputVal" class="form-select" v-model="editingmeasure.value">
                <option v-for="val in indicator.possibleValues" :value="val" v-bind:key="val">{{ val }}</option>
              </select>
              <field-error-message :errors="errors" fieldName="possibleValues"></field-error-message>
          </div>

          <div v-if="!isQualitative" class="form-group col-12 col-md-4">
            <label for="fname" class="form-label">Value</label>
            <input type="text" class="form-control" name="name" id="fname" placeholder="Value"
                   required v-model="editingmeasure.value">
            <field-error-message :errors="errors" fieldName="value"></field-error-message>
          </div>

          <div class="form-group col-12 col-md-4">
            <label for="fdate" class="form-label">Date</label>
            <input type="date" class="form-control" name="name" id="fdate" placeholder="Value"
                   required v-model="editingmeasure.date">
            <field-error-message :errors="errors" fieldName="date"></field-error-message>
          </div>

          <div class="form-group col-12 col-md-4">
            <label for="appt" class="form-label">Time of day</label>
            <input type="time" id="appt" name="appt" class="form-control"
                   min="00:00" max="24:00" required
                   v-model="editingmeasure.time">

          </div>

          <div class="form-group col-12 col-md-12">
            <label for="addInfo" class="form-label">Adicional Info</label>
            <input type="text" class="form-control" name="name" id="addInfo" placeholder="Description"
                   required v-model="editingmeasure.description">
            <field-error-message :errors="errors" fieldName="description"></field-error-message>
          </div>

          <div class="form-group ">
            <div class="d-grid gap-2 d-md-block">
              <button class="btn btn-primary px-5" type="button" @click="save">Save</button>
            </div>
          </div>

        </form>

      </div>
    </div>

  </div>



</template>

<script>
export default {
  name: 'UserNewBiomedicalIndicator',
  components: {},

  props: {
    patientUsername: {
      type: String,
      required: true
    },
    operationType: {
      type: String
    },
    indicatorID: {
      type: Number
    }
  },

  data() {
    return {
      indicators: [],
      editingmeasure: {},
      indicator: undefined,
      isQualitative: Boolean,
      separatedDate : [],
      errors : []
    }
  },
  methods: {
    verifyFields() {
      this.errors = []
      let flag = true

      if(!this.editingmeasure.value || this.editingmeasure.value.trim().length == 0) {
        this.errors['value']='value cant be null'
        flag = false
      }

      if(this.editingmeasure.value && this.indicator.indicatorType === 'QUANTITATIVE' && (this.editingmeasure.value < this.indicator.min || this.editingmeasure.value > this.indicator.max)) {
        this.errors['value']='value should be between ' + this.indicator.min + ' and ' + this.indicator.max
        flag = false
      }
      return flag
    },
    loadIndicator() {
      let url = ''
      if (this.editingmeasure.indicatorType === 'QUALITATIVE')
      {
        url = "biomedicalindicators/qualitative"
        this.isQualitative = true
      }
      else
      {
        url = "biomedicalindicators/quantitative"
        this.isQualitative = false
      }

      this.$axios.get(url + "/" + this.editingmeasure.indicatorId)
          .then((response) => {
            this.indicator = response.data
            this.indicators.push(this.indicator)

          })
          .catch((error) => {
            console.log(error)
          })
    },

    loadIndicators() {
      if (this.operationType == 'edit') {
        this.$axios.get('patients/' + this.patientUsername + '/biomedicalRegisters/' + this.indicatorID)
            .then((response) => {

              this.editingmeasure = response.data
              this.editingmeasure.value = response.data.value.value
              let date = response.data.date


              this.editingmeasure.date = response.data.date.split('T')[0]
              this.editingmeasure.time = date.split('T')[1]

              this.loadIndicator()

            })
            .catch((error) => {
              console.log(error)
            })
      } else {
        this.$axios.get('biomedicalindicators')
            .then((response) => {
              this.indicators = response.data
            })
            .catch((error) => {
              console.log(error)
            })
      }

    },
    splitErrormessage(msg) {

      var erros = msg.split(';');

      var errosTransformed = [[], []];
      for (var erro of erros) {
        var temp = erro.split(':');
        if (temp != undefined && temp.length == 2) {
          var key = temp[0].trim()
          var val = temp[1].trim()
          errosTransformed[key] = val
        }

      }
      this.errors = errosTransformed

    },
    expand(indic) {

      if (this.indicator && this.indicator.name == indic.name)
        this.indicator = undefined
      else {
        this.indicator = indic
        this.isQualitative = indic.indicatorType == 'QUALITATIVE'
      }
    },
    save() {
      if(!this.verifyFields())
        return

      this.editingmeasure.date = this.editingmeasure.date + "T" + this.editingmeasure.time
      if(this.operationType == 'edit') {

        this.$axios.put('patients/' + this.patientUsername + '/biomedicalRegisters/' + this.editingmeasure.id, this.editingmeasure)
            .then((response) => {
              this.admin = response.data
              this.$router.back()
            })
            .catch((error) => {
              console.log(error.response)
              if (error.response.status == 400) {
                this.$toast.error('Register was not created due to validation errors!')
                this.splitErrormessage(error.response.data)
              } else {
                this.$toast.error('Register was not created due to unknown server error!')
                this.splitErrormessage(error.response.data)
              }
            })

      }
      else {
        this.editingmeasure.id = this.indicator.id
        this.$axios.post('patients/' + this.patientUsername + '/biomedicalRegisters/' + this.indicator.indicatorType.toLowerCase(), this.editingmeasure)
            .then((response) => {
              this.admin = response.data
              this.$router.back()
            })
            .catch((error) => {
              console.log(error.response)
              if (error.response.status == 400) {
                this.$toast.error('Register was not created due to validation errors!')
                this.splitErrormessage(error.response.data)
              } else {
                this.$toast.error('Register was not created due to unknown server error!')
                this.splitErrormessage(error.response.data)
              }
            })
      }
    },
  },
mounted()
{
  this.loadIndicators();
}

}
</script>

<style scoped>


</style>
