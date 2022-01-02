<template>
  <table class="table">
    <thead>

    <tr>
      <th v-if="showId">#</th>
      <th v-if="showPatient">Patient</th>
      <th v-if="showName">indicator</th>
      <th v-if="showType">Type</th>
      <th v-if="showDate">Date</th>
      <th v-if="showValue">Value</th>
      <th v-if="showDescription">Description</th>
      <th></th>
      <th></th>
    </tr>
    </thead>
    <tbody>


    <tr


        v-for="indicator in indicators"
        :key="indicator.id"
    >
      <td v-if="showId">{{ indicator.id }}</td>
      <th v-if="showPatient">{{indicator.patientName}}</th>
      <td v-if="showName">{{ indicator.indicator }}</td>
      <td v-if="showType">{{ indicator.indicatorType }}</td>
      <td v-if="showDate">{{ indicator.date.replace('T', ' ') }}</td>
      <td v-if="showValue">{{  indicator.value }}</td>
      <td v-if="showDescription">{{  indicator.description }}</td>

      <td
          class="text-end"
          v-if="showEditButton || showDeleteButton"
      >
        <div class="d-flex justify-content-end">
          <button
              class="btn btn-xs btn-light"
              @click="addClick(indicator)"
              v-if="showEditButton"
          ><i class="bi bi-plus-square"></i>
          </button>
          <button
              class="btn btn-xs btn-light"
              @click="editClick(indicator)"
              v-if="showEditButton"
          ><i class="bi bi-xs bi-pencil"></i>
          </button>

          <button
              class="btn btn-xs btn-light"
              @click="deleteClick(indicator)"
              v-if="showDeleteButton"
          ><i class="bi bi-xs bi-x-square-fill"></i>
          </button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {

  name: "IndicatorsHPTable",
  props: {
    indicators: {
      type: Array,
      default: () => [],
    },
    showId: {
      type: Boolean,
      default: true,
    },
    showName: {
      type: Boolean,
      default: true,
    },
    showPatient: {
      type: Boolean,
      default: true,
    },
    showType: {
      type: Boolean,
      default: true,
    },
    showDate: {
      type: Boolean,
      default: true,
    },
    showValue: {
      type: Boolean,
      default: true,
    },
    showDescription: {
      type: Boolean,
      default: true,
    },
    showEditButton: {
      type: Boolean,
      default: true,
    },
    showDeleteButton: {
      type: Boolean,
      default: true,
    }
  },
  emits: [
    'add',
    'edit',
    'delete',
  ],
  methods: {
    addClick(indicator) {
      this.$emit('add', indicator)
    },
    editClick(indicator) {
      this.$emit('edit', indicator)
    },
    deleteClick(indicator) {
      this.$emit('delete', indicator)
    },

  },
  mounted() {
    console.log(this.indicators)
  }
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
