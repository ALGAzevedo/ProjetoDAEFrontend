<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete prc"
      :msg="`Do you really want to delete the PRC ${ prcToDelete } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">PRCs</h3>
    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalPrcs }}</h5>
    </div>
  </div>
  <hr>
    <!--    <div class="mx-2 mt-2">-->
    <!--      <button type="button" class="btn btn-success px-4 btn-adduser" @click="addAdmin">-->
    <!--        <i class="bi bi-xs bi-plus-circle"></i> Add Administrator-->
    <!--      </button>-->
    <!--    </div>-->
  <PrcsFilterBody
      @filter="filter"
  ></PrcsFilterBody>

  <hr>
  <prcs-table
      :prcs="prcs"
      :errors="errors"
      :show-delete-button="true"
      :show-edit-button="true"
      :show-prc-button="true"
      @edit="editPrc"
      @delete="deletePrc"
      @cancel="cancel"
  ></prcs-table>

</template>


<script>
import PrcsTable from "./PrcsTable";
import PrcsFilterBody from "./PrcsFilterBody";

export default {
  name: "Prcs",
  components: {
    PrcsTable,
    PrcsFilterBody
  },
  data() {
    return {
      prcs: [],
      prcToDelete: null,
      errors: null,
    }
  },
  computed: {
    prcToDeleteCode() {
      return this.prcs
          ? `"${this.prcs.code}"` : ''
    },

    totalPrcs() {
      return this.prcs.length
    },
  },
  methods: {
    loadPrcs() {
      this.$axios.get('prcs')
          .then((response) => {
            this.prcs = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addPrc() {
      this.$router.push({name: 'NewAdministrator'})
    },
    editPrc(prc) {
      console.log(prc)
      this.$router.push({name: 'EditPrc', params: {prcCode: prc.code, username: prc.patientUsername}})
    },
    parameters(filterBody) {
      if(filterBody == null)
        return ''
      var str = '?'
      Object.entries(filterBody).map(item => {
        if(item[1].trim().length > 0)
          str += item[0]+'='+item[1]+'&'
      })

      return str
    },
    filter(filterBody) {
      const str = this.parameters(filterBody)
      this.$axios.get('prcs'+str)
          .then((response) => {
            this.prcs = response.data
          })
          .catch((error) => {
            this.prcs = []
            console.log(error)
          })
    },
    cancel() {
      this.$router.back()
    },
    deleteConfirmed() {
      this.$axios.delete('prcs/' + this.prcToDelete.code)
          .then(() => {
            this.loadPrcs();
            this.$toast.success(`PRC #${this.prcToDelete.code} (${this.prcToDelete.name}) was deleted successfully.`)
          })
          .catch((error) => {
            this.$toast.error('There was an issue deleting this PRC')
            console.log(error)
          })
    },
    deletePrc(prc) {
      this.prcToDelete = prc
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    }
  },
  mounted() {
    this.loadPrcs()
  }
}
</script>

<style scoped>

.filter-div {
  min-width: 12rem;
}

.btn-adduser {
  margin-top: 1.85rem;
}
</style>