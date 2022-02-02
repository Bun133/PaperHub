<template>
  <div>
    <v-autocomplete :items="paperVersionsRevered"
                    :loading="isPaperVersionLoading"
                    label="Paper Version"
                    v-model="autoCompletePaperVersion"
                    @change="emitEvent"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            No Paper Version Found on Minecraft Version: {{ minecraftVersion }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: "PaperVersionSelector",
  model: {
    prop: "selectedPaperVersion",
    event: "onVersionSelect"
  },
  props: {
    minecraftVersion: {
      type: String,
      required: true
    },
    selectedPaperVersion: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isPaperVersionLoading: false,
      loadedMinecraftVersion: "",
      paperVersions: [],
      autoCompletePaperVersion: null
    }
  },
  computed: {
    paperVersionsRevered() {
      if (!this.paperVersions || !this.paperVersions['builds']) {
        return [];
      }
      return this.paperVersions['builds'].slice().reverse()
    }
  },
  watch: {
    minecraftVersion(newVal) {
      this.getPaperDownloadDetails(newVal);
    },
    selectedPaperVersion(newVal) {
      this.autoCompletePaperVersion = newVal;
    }
  },
  methods: {
    emitEvent() {
      if (this.autoCompletePaperVersion) {
        this.selectedPaperVersion = this.autoCompletePaperVersion
        this.$emit('onVersionSelect', this.autoCompletePaperVersion);
      }
    },
    getPaperDownloadDetails(versionString) {
      if (!versionString) {
        this.paperVersions = [];
        return;
      }
      this.isPaperVersionLoading = true;
      fetch("https://papermc.io/api/v2/projects/paper/versions/" + versionString)
          .then(res => res.json())
          .then(json => {
            this.paperVersions = json;
            this.isPaperVersionLoading = false;
            this.loadedMinecraftVersion = versionString;
          })
          .catch(err => {
            // This can be caused by the version not supported by paper.
            // In this case, we will just return an empty object.
            console.log(err)
            this.isPaperVersionLoading = false;
            this.paperVersions = [];
          });
    }
  }
}
</script>

<style scoped>

</style>