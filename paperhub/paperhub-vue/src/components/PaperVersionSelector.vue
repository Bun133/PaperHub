<template>
  <div>
    <v-autocomplete :items="paperVersionsRevered"
                    :loading="isPaperVersionLoading"
                    label="Paper Version"
                    v-model="selectedPaperVersion"
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
  model:{
    prop: "selectedPaperVersion",
    event: "onVersionSelect"
  },
  props: {
    minecraftVersion: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedPaperVersion: null,
      isPaperVersionLoading: false,
      paperVersions: []
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
  watch:{
    minecraftVersion(newVal) {
      this.getPaperDownloadDetails(newVal);
    }
  },
  methods:{
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
          })
          .catch(err => {
            // This can be caused by the version not supported by paper.
            // In this case, we will just return an empty object.
            console.log(err)
            this.isPaperVersionLoading = false;
            this.paperVersions = [];
          });
    },
    emitEvent() {
      if (this.selectedPaperVersion) {
        this.$emit('onVersionSelect', this.selectedPaperVersion);
      }
    }
  }
}
</script>

<style scoped>

</style>