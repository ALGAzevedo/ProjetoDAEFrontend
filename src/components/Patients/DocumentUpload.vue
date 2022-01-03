<template>

  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>Exam or document Upload
        <input class="form-control" type="file" id="file" ref="file" v-on:change="handleFileUpload($event)"/>
      </label>
      <button type="button"
              class="btn btn-primary px-5" v-on:click="upload">Submit</button>
    </div>
  </div>


</template>
<script>
export default {
  name: "DocumentUpload",
  data() {
    return {
      username: this.$store.state.user.username,
      file: ''
    }
  },
  computed: {
    hasFile () {
      return this.file != null
    },
    formData () {
      let formData = new FormData()
      formData.append('username', this.username)
      if (this.file) {
        formData.append('file', this.file)
      }
      return formData
    }
  },
  methods: {

    upload() {
      if(!this.file ||this.file.length == 0)
        return

      if (!this.hasFile) {
        return
      }
      let fd = new FormData();
      fd.append('username', this.username)
      fd.append('file',this.file)

      let promisse = this.$axios.post('documents/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      promisse.then(() => {
        this.$toast.success('File uploaded!')
      })
      promisse.catch(() => {
        this.$toast.error('Sorry, could no upload file!')
      })
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    }
  }
}
</script>