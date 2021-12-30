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
    <div class="col-8" v-if="indicator" >
      <div v-if="isQualitative" class="col-2">
        <label for="inputVal" class="form-label">Possible Values</label>
        <select id="inputVal" class="form-control" v-model="editingmeasure.value">
          <option v-for="val in indicator.possibleValues" :value="val" v-bind:key="val">{{val}} </option>
        </select>
        <field-error-message :errors="errors" fieldName="possibleValues"></field-error-message>
      </div>




      <div v-if="!isQualitative" class="col-2">
        <div>
          <label for="fname" class="form-label">Value</label>
          <input type="text" class="form-control" name="name" id="fname" placeholder="Value"
                 required v-model="editingmeasure.value">
          <field-error-message :errors="errors" fieldName="value"></field-error-message>
        </div>

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
          >Save</button>
        </div>

      </div>


    </div>


  </div>

</template>

<script>
export default {
  name: 'UserNewBiomedicalIndicator',
  components: {},

  data() {
    return {
      indicators: [],
      editingmeasure : Object,
      indicator : undefined,
      isQualitative : Boolean
    }
  },
  methods : {
    loadIndicators() {
      this.$axios.get('biomedicalindicators')
          .then((response) => {
            this.indicators = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    expand(indic) {
      if (this.indicator)
        this.indicator = undefined
      else {
        this.indicator = indic
        this.isQualitative = indic.indicatorType == 'QUALITATIVE'
      }
    },
    save() {
      console.log(this.editingmeasure.description)
    }


  },
  mounted() {
    this.loadIndicators();
  }

}
</script>

<style scoped>


</style>
