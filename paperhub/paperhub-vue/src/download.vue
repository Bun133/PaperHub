<template>
  <v-app>
    <HangBar/>
    <v-main>
      <v-container>
        <div id="upper_bar" class="d-flex justify-start">
          <v-btn color="secondary" class="ma-2" to="/">
            <v-icon class="mr-1">mdi-home</v-icon>
            Home
          </v-btn>
        </div>

        <h1>Download Server File</h1>
        <h2>Output Directory</h2>
        <folder-input v-model="folder" label="Download Location" required>
          <template v-slot:icon>
            <v-icon>mdi-folder-outline</v-icon>
          </template>
        </folder-input>
        <MinecraftVersionSelector v-model="selectedVersion">
        </MinecraftVersionSelector>
        <PaperVersionSelector v-model="selectedPaperVersion"
                              :minecraft-version="selectedVersion">
        </PaperVersionSelector>

        <v-btn color="primary"
               @click="download(getPaperDownloadLink(selectedVersion,selectedPaperVersion),folder)"
               :disabled="!isAllFieldsValid"
        >
          Download!
        </v-btn>

        <progress-snack-bar :is-shown="isDownloading"
                            :is-indeterminate="isDownloadWaiting"
                            :progress="downloadProgress">
          <template v-slot:message>
            <p class="py-1">
              Downloading Paper Server({{ "paper-" + selectedVersion + "-" + selectedPaperVersion + ".jar" }})
            </p>
          </template>
        </progress-snack-bar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HangBar from "@/components/HangBar";
import FolderInput from "@/components/FolderInput";
import ProgressSnackBar from "@/components/ProgressSnackBar";
import MinecraftVersionSelector from "@/components/MinecraftVersionSelector";
import PaperVersionSelector from "@/components/PaperVersionSelector";

export default {
  name: "download",
  components: {PaperVersionSelector, MinecraftVersionSelector, ProgressSnackBar, FolderInput, HangBar},
  data() {
    return {
      // FolderSelect
      folder: "",
      // Minecraft Version
      versions: null,
      selectedVersion: null,
      isVersionLoading: false,
      // Paper Version
      paperVersions: {},
      selectedPaperVersion: null,
      isPaperVersionLoading: false,
      // Download
      isDownloading: false,
      downloadProgress: 0,
      isDownloadWaiting: false,
    };
  },
  created() {
    window.ipcRenderer.receive("fromMain@DownloadFile-complete", (event, data) => {
      console.log("Download complete!:", data);
      this.isDownloading = false;
      this.isDownloadWaiting = false;
    });

    window.ipcRenderer.receive("fromMain@DownloadFile-progress", (event, data) => {
      console.log("Download progress:", data * 100, "%");
      this.isDownloadWaiting = false;
      this.downloadProgress = data * 100;
    });
  },
  methods: {
    getPaperDownloadLink(versionString, buildString) {
      if (!versionString || !buildString) {
        return null;
      }
      return "https://papermc.io/api/v2/projects/paper/versions/" + versionString + "/builds/" + buildString + "/downloads/paper-" + versionString + "-" + buildString + ".jar";
    },
    download(downloadPath, folderPath) {
      if (this.isDownloading) {
        console.log("Already downloading!");
        return
      }
      console.log("Downloading:", downloadPath, " into ", folderPath)
      this.isDownloading = true;
      this.isDownloadWaiting = true;
      window.ipcRenderer.send("toMain@DownloadFile", {
        url: downloadPath,
        directory: folderPath
      });
    }
  },
  computed: {
    folderValid() {
      return this.folder && this.folder.length > 0;
    },
    minecraftVersionValid() {
      return this.selectedVersion && this.selectedVersion.length > 0;
    },
    paperVersionValid() {
      return this.selectedPaperVersion && (this.selectedPaperVersion).toString().length > 0;
    },
    isAllFieldsValid() {
      return this.folderValid && this.minecraftVersionValid && this.paperVersionValid
    }
  }
}
</script>

<style scoped>

</style>