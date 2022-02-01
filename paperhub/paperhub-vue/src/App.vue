<template>
  <v-app>
    <HangBar/>

    <v-main>
      <v-container>
        <div id="upper_bar" class="d-flex justify-end">
          <v-btn color="secondary" class="ma-2" to="/import">
            <v-icon class="mr-1">mdi-import</v-icon>
            Import
          </v-btn>
          <v-btn color="secondary" class="ma-2" to="/download">
            <v-icon class="mr-1">mdi-download</v-icon>
            Download
          </v-btn>
        </div>
        <div v-if="isConfigLoaded">
          <PaperList :papers="this.config"/>
        </div>
        <div v-else class="d-flex justify-center align-center mt-5">
          <v-progress-circular indeterminate color="primary" size="150" class="mb-5" width="6"/>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import PaperList from "@/components/PaperList";
import HangBar from "@/components/HangBar";

export default {
  name: 'App',
  components: {HangBar, PaperList},

  data: () => ({
    //
    config: {},
    isConfigLoaded: false,
  }),

  methods: {
    loadConfig() {
      console.log("loadConfig");
      this.isConfigLoaded = false;
      window.ipcRenderer.send("toMain@loadConfig");
      window.ipcRenderer.once("fromMain@loadConfig-reply", (event, data) => {
        if (data !== undefined) {
          console.log("load data:", data);
          this.isConfigLoaded = true;
          this.config = data;
        } else {
          console.log("Config is empty");
          this.isConfigLoaded = false;
          this.config = {};
        }
      });
    }
  },

  mounted() {
    // window.ipcRenderer.send("toMain@AddServer", {
    //       title: "Paper 1.18.2",
    //       folderPath: "",
    //       executablePath: "",
    //       minecraftVersion: "1.18.2",
    //       paperVersion: "75",
    //       executeArguments: ""
    //     }
    // );

    this.loadConfig()
  },
};
</script>
