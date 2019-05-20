<style>

</style>

<template>
  <div class="container" style="height: 100vh; margin-top: 24px;">
    <steps></steps>
    <div >
      <h1 class="title">
        Papers
      </h1>
      <h2 class="subtitle">
        Provides an overview of all papers found in the search
      </h2>
      <div class="field">
        <input id="switchRoundedDefault1" type="checkbox" name="switchRoundedDefault" class="switch is-rounded" checked="checked">
        <label for="switchRoundedDefault1">Only show papers with pdf</label>
      </div>
      <div class="field">
        <input id="switchRoundedDefault2" type="checkbox" name="switchRoundedDefault" class="switch is-rounded" checked="checked">
        <label for="switchRoundedDefault2">Show discarded papers</label>
      </div>

      <div class="columns">
        <div class="column">
          <v-client-table :data="tableData" :columns="columns" :options="options">
            <div class="has-text-centered" slot="screening_state" slot-scope="props">
              <div v-if="props.row.screening_state === 'NS'">
                <span class="icon">
                  <i class="fas fa-question"></i>
                </span>
              </div>
              <div v-else-if="props.row.screening_state === 'AP'">
                <span class="icon has-text-success">
                  <i class="fas fa-check"></i>
                </span>
              </div>
              <div v-else-if="props.row.screening_state === 'DC'">
                <span class="icon has-text-danger">
                  <i class="fas fa-times"></i>
                </span>
              </div>
            </div>

            <router-link slot="open" slot-scope="props" class="button" :to="{ name: 'Extraction', params: { id: ma_id, article_id: props.row.id }}">Extract data</router-link>


            <div class="has-text-centered" slot="hasAPdf" slot-scope="props">
              <div class="file" v-if="!props.row.has_pdf">
                <label class="file-label">
                  <input class="file-input" type="file" name="resume" @change="processFile($event, props.row.id)">
                  <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                  </span>
                  </span>
                </label>
              </div>
              <span class="icon has-text-success" v-if="props.row.has_pdf">
                <i class="fas fa-check"></i>
              </span>
            </div>


          </v-client-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PaperOverview",

    data() {
      return {
        ma_id: null,
        columns: ['title', 'authors', 'screening_state', 'dataExtractionState', 'hasAPdf','open'],
        tableData: [],
        options: {
          headings: {
            title: 'Title',
            authors: 'Authors',
            screening_state: 'Screening',
            dataExtractionState: 'Data extracted',
            hasAPdf: 'PDF',
            open: ''
          },
          filterable: ['title', 'authors'],
          perPage: 10,
          texts: {
            count: "Showing {from} to {to} of {count} articles",
            filterPlaceholder: "Search articles...",
            noResults: "No articles in for meta analysis",
            limit: "Articles:"
          },
          perPageValues: []
        },
      }
    },

    methods: {
      processFile(event, ma_id) {
        var formData = new FormData();
        formData.append("pdf", event.target.files[0]);
        window.Axios.post('/articles/'+ma_id+'/pdfs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
            console.log(response);
          })
          .catch(error => {
            if (error.response.status === 404) {
              alert("404");
            } else {
              alert(error);
            }
          });
      }
    },

    mounted() {
      this.options.texts.noResults = "Loading...";
      this.ma_id = this.$route.params.id;
      window.Axios.get(`/meta-analyses/${this.ma_id}/articles`, {timeout: 100000}).then(result => {
        this.tableData = result.data;
        this.options.texts.noResults = "No articles in for meta analysis";
      }, e => {
        this.options.texts.noResults = "Something went wrong when fetching articles contact de videnskabelige assistenter";
        console.log(e);
      });
    },
  }


</script>


