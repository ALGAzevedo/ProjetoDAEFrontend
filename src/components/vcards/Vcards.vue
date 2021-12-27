<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete VCard"
      :msg="`Do you really want to delete the VCard: ${ vCardToDeleteName }?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">VCards</h3>
    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalVCards }}</h5>
    </div>
  </div>
  <hr>
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectPhoneNumber" class="form-label">Filter by phone number:</label>
      <input type="text" id="selectPhoneNumber" class="form-control" placeholder="Enter phone number to search"
             v-model="filterByPhone">
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectEmail" class="form-label">Filter by email:</label>
      <input type="text" id="selectEmail" class="form-control" placeholder="Enter email to search"
             v-model="filterByMail">
    </div>
    <div class="mx-2 mt-2 filter-div">
      <label for="selectStatus" class="form-label">Filter by status:</label>
      <select class="form-select" id="selectStatus"
              v-model="filterByStatus">
        <option value="-1">All</option>
        <option value="0">Unblocked</option>
        <option value="1">Locked</option>
      </select>
    </div>
    <div class="mx-2 mt-2">
      <button type="button" class="btn btn-warning px-4 btn-applyFilter" @click="updateHandler">
        <i class="bi bi-xs bi-search"></i>&nbsp; Apply Filter
      </button>
    </div>
  </div>
  <p class="mt-3"></p>
  <vcard-table
      :vcards="vcards"
      @lock="lockVCard"
      @unlock="unlockVCard"
      @edit="editVCard"
      @credit="creditVCard"
      @delete="deleteVCard"
  ></vcard-table>
  <div class="row mb-4 mt-3">
    <div class="d-flex justify-content-center">
      <v-pagination
          v-model="page"
          :pages="pages"
          :range-size="1"
          active-color="#0275d8"
          @update:modelValue="paginatorHandler"
      />
    </div>
  </div>
</template>

<script>

import VcardTable from "./VcardTable"
import VPagination from "@hennge/vue3-pagination";

export default {
  name: 'VCards',
  components: {
    VcardTable,
    VPagination
  },
  data() {
    return {
      vcards: [],
      filterByStatus: -1,
      filterByPhone: '',
      filterByMail: '',
      page: 1,
      pages: 1,
      totalVCards: 0,
      vCardToDelete: null,
    }
  },
  computed: {
    vCardToDeleteName() {
      return this.vCardToDelete
          ? `${this.vCardToDelete.phone_number} - (${this.vCardToDelete.name})` : ''
    },
  },
  methods: {
    updateHandler() {
      this.page = 1;
      this.paginatorHandler();
    },
    paginatorHandler() {
      let phoneFilter = this.filterByPhone;
      let emailFilter = this.filterByMail;
      let blockFilter = this.filterByStatus;
      this.$axios.get('admin/vcards?page=' + this.page + '&phone=' + phoneFilter + '&email=' + emailFilter + '&blocked=' + blockFilter)
          .then((response) => {
            this.vcards = response.data.data
            this.page = response.data.meta['current_page']
            this.pages = response.data.meta['last_page']
            this.totalVCards = response.data.meta['total']
          })
          .catch((error) => {
            console.log(error)
          })
    },
    loadVCards() {
      this.$axios.get('admin/vcards')
          .then((response) => {
            this.vcards = response.data.data
            this.page = response.data.meta['current_page']
            this.pages = response.data.meta['last_page']
            this.totalVCards = response.data.meta['total']
          })
          .catch((error) => {
            console.log(error)
          })
    },
    lockVCard(vcard) {
      this.$axios.patch('admin/vcards/' + vcard.phone_number, {blocked: 1})
          .then((response) => {
            this.$toast.success('Vcard #' + response.data.data.phone_number + ' was locked successfully.')
            this.paginatorHandler()
            let jsonToSend = {}
            jsonToSend.id = vcard.phone_number
            jsonToSend.type = "block"
            jsonToSend.value = 1
            this.$socket.emit('editVcard', jsonToSend)
          })
          .catch((error) => {
            console.log(error)
          })
    },
    unlockVCard(vcard) {
      this.$axios.patch('admin/vcards/' + vcard.phone_number, {blocked: 0})
          .then((response) => {
            this.$toast.success('Vcard #' + response.data.data.phone_number + ' was unlocked successfully.')
            this.paginatorHandler()
            let jsonToSend = {}
            jsonToSend.id = vcard.phone_number
            jsonToSend.type = "block"
            jsonToSend.value = 0
            this.$socket.emit('editVcard', jsonToSend)
          })
          .catch((error) => {
            console.log(error)
          })
    },
    editVCard(vcard) {
      this.$router.push({name: 'vcard', params: {vcard: vcard.phone_number}})
    },
    deleteConfirmed() {
      this.$axios.delete('admin/vcards/' + this.vCardToDelete.phone_number, this.vcard)
          .then(() => {
            this.$toast.success('Vcard #' + this.vCardToDelete.phone_number + ' was deleted successfully.')
            this.$socket.emit('deleteVcard', this.vCardToDelete)
            this.loadVCards();
          })
          .catch((error) => {
            this.$toast.success('There was an issue deleting this Vcard')
            if (error.response.status == 405) {
              this.$toast.error(error.response.data.message)
            }
          })
    },
    deleteVCard(vcard) {
      this.vCardToDelete = vcard
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    },
    creditVCard(vcard) {
      //route to another page
      //console.log("vcard number  clicked -> "+vcard.phone_number)
      this.$router.push({name: 'NewAdminTransaction', params: {vcard: vcard.phone_number}})
      //this.$router.push({name: 'Task', params: { id: task.id } })
      //router.push({ name: 'user', params: { userId: '123' } })
      //return vcard
    }
  },
  mounted() {
    this.loadVCards()
    //load payment types
    this.$store.dispatch('loadPaymentTypes')
  }
}
</script>

<style scoped>

.filter-div {
  min-width: 12rem;
}

.total-records {
  margin-top: 0.35rem;
}

.btn-applyFilter {
  margin-top: 1.85rem;
}

</style>
