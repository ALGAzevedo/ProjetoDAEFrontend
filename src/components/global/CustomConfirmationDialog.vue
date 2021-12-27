<template>
  <!-- Button trigger to Show modal - HIDDEN -->
  <button
      ref="hiddenButtonToShowDialogCustom"
      type="button"
      class="d-none"
      data-bs-toggle="modal"
      data-bs-target="#confirmationModalIdCustom"
  >
  </button>

  <!-- Modal -->
  <div
      class="modal fade"
      id="confirmationModalIdCustom"
      tabindex="-1"
      aria-labelledby="confirmationModalLabel"
      aria-hidden="true"
  >
    <div class="modal-dialog">
      <!-- Button trigger to Hide modal - HIDDEN -->
      <button
          ref="hiddenButtonToHideDialog"
          type="button"
          class="d-none"
          data-bs-dismiss="modal"
      >
      </button>

      <div class="modal-content">
        <div class="modal-header">
          <h5
              class="modal-title"
              id="confirmationModalLabel"
          >{{ title }}</h5>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            {{ msg }}
          </div>
          <div v-if="passwordMsg" class="row">
            <label class="form-label">{{passwordMsg}}</label>
            <input type="password" class="form-control" id="inputPasswordConf" placeholder="Password" required v-model="editingVcardCreds.password">
            <!--<field-error-message :errors="errors" fieldName="password"></field-error-message>-->
            <field-error-message fieldName="password"></field-error-message>
          </div>
          <div v-if="confCodeMsg" class="row">
            <label for="inputVCodeCode" class="form-label">{{confCodeMsg}}</label>
            <input type="password" class="form-control" id="inputVCodeCode" placeholder="Confirmation Code" required v-model="editingVcardCreds.confirmation_code">
            <!--<field-error-message :errors="errors" fieldName="confirmation_code"></field-error-message>-->
            <field-error-message fieldName="confirmation_code"></field-error-message>
          </div>
        </div>
        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
          >{{ cancelBtn }}</button>
          <button
              type="button"
              class="btn btn-primary"
              @click="clickConfirm"
          >{{ confirmationBtn }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomConfirmationDialog',
  props: {
    cancelBtn: {
      type: String,
      default: 'Cancel'
    },
    confirmationBtn: {
      type: String,
      default: 'Confirm'
    },
    title: {
      type: String,
      default: 'Confirmation'
    },
    msg: {
      type: String,
      default: ''
    },
    passwordMsg: {
      type: String,
      default: ''
    },
    confCodeMsg: {
      type: String,
      default: ''
    },
    vcardCreds: {
      type: Object,
      default: null
    }
  },
  emits: [
    'show',
    'hide',
    'confirmed'
  ],
  data(){
    return {
      editingVcardCreds: this.vcardCreds
    }
  },
  methods: {
    show () {
      //Easy way to show the modal:
      let btnToShowModal = this.$refs.hiddenButtonToShowDialogCustom
      btnToShowModal.click()
      this.$emit('show')
    },

    hide () {
      //Easy way to hide the modal:
      let btnToHideModal = this.$refs.hiddenButtonToHideDialog
      btnToHideModal.click()
      this.$emit('hide')
    },
    clickConfirm () {
      this.hide()
      this.$emit('confirmed')
    },
  }
}
</script>