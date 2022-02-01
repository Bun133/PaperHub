<template>
  <v-app>
    <HangBar/>
    <v-main>
      <v-container>
        <h1>Import Server</h1>
        <h2>Server File</h2>
        <v-file-input v-model="file" accept=".jar" @change="autoCompleteFields"></v-file-input>
        <h2>Profile Name</h2>
        <v-text-field v-model="profileName"></v-text-field>
        <h2>Minecraft Version</h2>
        <MinecraftVersionSelector v-model="minecraftVersion"></MinecraftVersionSelector>
        <h2>Paper Version</h2>
        <PaperVersionSelector v-model="paperVersion" :minecraft-version="minecraftVersion"></PaperVersionSelector>
        <h2>Execute Arguments</h2>
        <v-text-field v-model="executeArguments"></v-text-field>
        <v-btn color="primary" @click="importServer(file)" :disabled="!this.isAllFieldsValid">Import Server</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HangBar from "@/components/HangBar";
import MinecraftVersionSelector from "@/components/MinecraftVersionSelector";
import PaperVersionSelector from "@/components/PaperVersionSelector";

const path = require("path");

export default {
  name: "import",
  components: {PaperVersionSelector, MinecraftVersionSelector, HangBar},
  data() {
    return {
      file: "",
      profileName: "",
      minecraftVersion: "",
      paperVersion: "",
      executeArguments: "",
    }
  },
  methods: {
    importServer(file) {
      console.log("importServer", file);
      window.ipcRenderer.send("toMain@AddServer", {
        title: this.profileName,
        folderPath: path.dirname(file.path),
        executablePath: file.path,
        minecraftVersion: this.minecraftVersion,
        paperVersion: this.paperVersion,
        executeArguments: this.executeArguments
      });
    },
    autoCompleteFields() {
      const name = this.file.name;
      // The File Name is this pattern: "paper-<minecraftVersion>-<paperVersion>.jar"
      // So we can auto complete the Minecraft Version and Paper Version
      this.minecraftVersion = name.split("-")[1];
      this.paperVersion = name.split("-")[2].split(".")[0];
      // TODO 表示に反映されない
    }
  },
  computed: {
    isFileValid() {
      return this.file instanceof File;
    },
    isProfileNameValid() {
      return this.profileName.length > 0;
    },
    isMinecraftVersionValid() {
      return this.minecraftVersion.length > 0;
    },
    isPaperVersionValid() {
      return this.paperVersion.toString().length > 0;
    },
    isAllFieldsValid() {
      return this.isFileValid && this.isProfileNameValid && this.isMinecraftVersionValid && this.isPaperVersionValid;
    }
  }
}
</script>

<style scoped>

</style>