<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Add New Indicator</h3>
    </div>
  </div>
  <hr>
  <div class="row">
    <div class="col-4">
      <table class="table">
        <thead>
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


    <div class="col-8">
      <div class="col-12" v-if="indicator">
        <div v-if="isQualitative" class="col-2">
          <label for="inputVal" class="form-label">Possible Values</label>
          <select id="inputVal" class="form-control" v-model="editingmeasure.value">
            <option v-for="val in indicator.possibleValues" :value="val" v-bind:key="val">{{ val }}</option>
          </select>
          <field-error-message :errors="errors" fieldName="possibleValues"></field-error-message>
        </div>

        <div v-if="!isQualitative" class="col-2">
          <div>
            <label for="fname" class="form-label">Value</label>
            <input type="text" class="form-control" name="name" id="fname" placeholder="Value"
                   required v-model="editingmeasure.value">

          </div>
          <field-error-message :errors="errors" fieldName="value"></field-error-message>

        </div>

        <div class="col-2">
          <div>
            <label for="fdate" class="form-label">Date</label>
            <input type="date" class="form-control" name="name" id="fdate" placeholder="Value"
                   required v-model="editingmeasure.date">

          </div>
          <field-error-message :errors="errors" fieldName="date"></field-error-message>



        </div>
        <div class="col-2">
          <label for="ftime" class="form-label">Time of day</label>
          <input type="time" id="appt" name="appt"
                 min="00:00" max="24:00" required
          v-model="editingmeasure.time">

        </div>


        <div class="col-10">
          <label for="fname" class="form-label">Adicional Info</label>
          <input type="text" class="form-control" name="name" id="fname" placeholder="Description"
                 required v-model="editingmeasure.description">
          <field-error-message :errors="errors" fieldName="description"></field-error-message>

          <div class="my-3 d-flex justify-content-end">
            <button
                type="button"
                class="btn btn-primary px-5"
                @click="save"
            >Save
            </button>
          </div>

        </div>


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
