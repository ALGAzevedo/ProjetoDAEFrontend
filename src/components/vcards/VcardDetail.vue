<template>
  <form class="row g-3 needs-validation" @submit.prevent="save">
    <h3 class="mt-5 mb-3">{{ vcardTitle }}</h3>
    <hr>
    <div class="d-flex flex-wrap justify-content-between">
      <div class="w-75 pe-4">
        <div class="w-50 mb-3" v-show="operationType=='insert'">
          <label for="inputPhoneNumber" class="form-label">Phone Number</label>
          <input type="text" class="form-control" id="inputPhoneNumber" placeholder="Phone Number"
                 v-model="editingVCard.phoneNumber">
          <field-error-message :errors="errors" fieldName="phoneNumber"></field-error-message>
        </div>
        <div class="mb-3">
          <label for="inputName" class="form-label">Name</label>
          <input type="text" class="form-control" id="inputName" placeholder="User Name"
                 v-model="editingVCard.name" :disabled="operationType=='update'">
          <field-error-message :errors="errors" fieldName="name"></field-error-message>
        </div>
        <div class="mb-3 px-1">
          <label for="inputEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="inputEmail" placeholder="Email"
                 v-model="editingVCard.email" :disabled="operationType=='update'">
          <field-error-message :errors="errors" fieldName="email"></field-error-message>
        </div>
        <div class="row" v-if="operationType!='insert'">
          <div class="col-6">
            <label for="inputBalance" class="form-label">Balance</label>
            <input type="number" class="form-control" id="inputBalance" placeholder="VCard Balance"
                   v-model="vcardBalance" disabled>
            <field-error-message :errors="errors" fieldName="balance"></field-error-message>
          </div>
          <div class="col-6">
            <label for="inputMaxDebit" class="form-label">Max.Debit</label>
            <input v-if="this.$store.state.user.type == 'A'" type="number" class="form-control" id="inputMaxDebitVcard" placeholder="Max Debit"
                   v-model="editingVCard.max_debit" :disabled="operationType!='update'">
            <input v-if="this.$store.state.user.type == 'V'" type="number" class="form-control" id="inputMaxDebit" placeholder="Max Debit"
                   v-model="vcardMaxDebit" :disabled="operationType!='update'">
            <field-error-message :errors="errors" fieldName="max_debit"></field-error-message>
          </div>
        </div>
        <div class="mb-3 checkBlocked" v-if="operationType=='update'">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="editingVCard.blocked" id="inputBlocked"
                   true-value="1" false-value="0">
            <label class="form-check-label" for="inputBlocked"> VCard is Blocked </label>
            <field-error-message :errors="errors" fieldName="blocked"></field-error-message>
          </div>
        </div>
        <div class="row" v-if="operationType=='insert'">
          <div class="mb-3 col-6">
            <label for="inputPassword" class="form-label">Password</label>
            <input type="password" class="form-control" id="inputPassword" placeholder="Password"
                   required v-model="editingVCard.password">
            <field-error-message :errors="errors" fieldName="password"></field-error-message>

          </div>
          <div class="mb-3 col-6">
            <label for="inputPasswordConfirm" class="form-label">Password Confirmation</label>
            <input type="password" class="form-control" id="inputPasswordConfirm" placeholder="Password Confirm"
                   required v-model="editingVCard.password_confirm">
            <field-error-message :errors="errors" fieldName="password_confirm"></field-error-message>
          </div>
        </div>
        <div class="row" v-if="operationType=='insert'">
          <div class="mb-3 col-6">
            <label for="inputVCodeVD" class="form-label">Confirmation Code</label>
            <input type="password" class="form-control" id="inputVCodeVD" placeholder="Confirmation Code"
                   required v-model="editingVCard.confirmation_code">
            <field-error-message :errors="errors" fieldName="confirmation_code"></field-error-message>
          </div>
          <div class="mb-3 col-6">
            <label for="inputVCodeConfirmVDC" class="form-label">Confirmation Code Confirmation</label>
            <input type="password" class="form-control" id="inputVCodeConfirmVDC" placeholder="Confirmation Code Confirm"
                   required v-model="editingVCard.confirmation_code_confirm">
            <field-error-message :errors="errors" fieldName="confirmation_code_confirm"></field-error-message>
          </div>
        </div>
      </div>
      <div class="w-25">
        <div class="mb-3">
          <label class="form-label">Photo</label>
          <div class="form-control text-center">
            <img :src="photoFullUrl" class="w-100">
          </div>
        </div>
        <div class="mt-3" v-if="operationType=='insert' || operationType=='ownerUpdate'">
          <input type="file" name="image" @change="previewFiles" accept="image/*" class="form-control"
                 id="inputImagemUrl">
          <field-error-message :errors="errors" fieldName="photoUrl"></field-error-message>
        </div>
      </div>
    </div>
    <div class="d-flex mt-3 mb-3">
      <div v-if="operationType=='ownerUpdate'" class="me-auto p-2">
        <button type="button" class="btn btn-danger px-5" @click="deleteVcard">Delete account</button>
      </div>
      <div class="p-2">
        <button type="button" class="btn btn-primary px-5" @click="save">Save</button>
      </div>
      <div class="p-2">
        <button type="button" class="btn btn-light px-5" @click="cancel">Cancel</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UserDetail',
  components: {},
  props: {
    vcard: {
      type: Object,
      required: true
    },
    operationType: {
      type: String,
      default: 'update'  // insert / update
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: [
    'save',
    'cancel',
    'deleteConfirmed'
  ],
  data() {
    return {
      editingVCard: this.vcard,
      staticMaxDebit: this.$store.state.vcard ? this.$store.state.vcard.max_debit : ''
    }
  },
  watch: {
    vcard(newVCard) {
      this.editingVCard = newVCard
    }
  },
  computed: {
    vcardTitle() {
      if (!this.editingVCard) {
        return ''
      }
      return this.operationType == 'insert' ? 'New VCard' : 'VCard #' + this.editingVCard.phone_number
    },
    photoFullUrl() {
      return this.editingVCard.photo_url
          ? this.$serverUrl + "/storage/fotos/" + this.editingVCard.photo_url
          : "img/avatar-none.png"
    },
    vcardBalance(){
      if(this.operationType == 'ownerUpdate'){
        return this.$store.state.vcard.balance;
      }
      return this.editingVCard.balance;
    },
    vcardMaxDebit(){
      return this.staticMaxDebit;
    }
  },
  methods: {
    save() {
      this.$emit('save', this.editingVCard)
    },
    deleteVcard() {
      this.$emit('deleteConfirmed', this.editingVCard)
    },
    cancel() {
      this.$emit('cancel', this.editingVCard)
    },
    previewFiles(event) {
      this.editingVCard.photoFile = event.target.files[0]
      //console.log(event.target.files[0]);
    }
  },
  sockets: {
    editVcard() {
      this.$store.dispatch('refresh').then(() => {
        this.staticMaxDebit = this.$store.state.vcard.max_debit
      });

    }
  },
}
</script>

<style scoped>

.checkBlocked {
  margin-top: 0.4rem;
  min-height: 2.375rem;
}
</style>
