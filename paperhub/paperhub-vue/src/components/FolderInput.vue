<template>
  <div class="d-flex row pa-1">
    <div id="icon" class="grow-shrink-0 ma-2 d-flex align-center">
      <slot name="icon"></slot>
    </div>
    <div class="flex-grow-1">
      <v-text-field :label="label" @click.native="onFocus" v-model="folder" readonly>
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'folder',
    event: 'input'
  },
  props:{
    label:{
      type:String,
      default: 'Folder Select'
    }
  },
  name: "FolderInput",
  data() {
    return {
      folder: null
    }
  },
  methods: {
    onFocus() {
      this.openFolderDialog()
    },
    openFolderDialog() {
      window.ipcRenderer.send("toMain@openFolderDialog", "Select Folder")
      window.ipcRenderer.once("fromMain@openFolderDialog-reply", (event, folder) => {
        this.folder = folder
        this.$emit("input", folder)
      })
    }
  }
}
</script>

<style scoped>

</style>