<template>
  <v-app>
    <HangBar/>
    <v-main>
      <v-container>
        <h1>Import Server</h1>
        <h2>Server File</h2>
        <v-file-input v-model="file" accept=".jar"></v-file-input>
        <h2>Profile Name</h2>
        <v-text-field v-model="profileName"></v-text-field>
        <v-btn color="primary" @click="importServer(file)" :disabled="!this.isAllFieldsValid">Import Server</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HangBar from "@/components/HangBar";

export default {
  name: "import",
  components: {HangBar},
  data() {
    return {
      file: "",
      profileName: "",
    }
  },
  methods: {
    importServer(file) {
      console.log("importServer", file);
      window.ipcRenderer.send("toMain@AddServer", {
        title: "Paper 1.18.2",
        folderPath: "",
        executablePath: "",
        minecraftVersion: "1.18.2",
        paperVersion: "75",
        executeArguments: ""
      });
    }
  },
  computed: {
    isFileValid() {
      return this.file instanceof File;
    },
    isAllFieldsValid() {
      return this.isFileValid;
    }
  }
}
</script>

<style scoped>

</style>