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
        <PaperList :papers="this.config.papers"/>
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

  mounted() {
    window.ipcRenderer.send("toMain@saveConfig", {
      papers: [{
        title: "Paper 1.16.5",
        minecraft_version: "1.16.5",
        paper_version: "201",
        executePath: ""
      }],
    });

    window.ipcRenderer.send("toMain@loadConfig");
    window.ipcRenderer.receive("fromMain@loadConfig-reply", (event, data) => {
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
  },
};
</script>
