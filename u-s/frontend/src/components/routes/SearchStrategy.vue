<style>
</style>

<template>
    <div class="container" style="padding-top: 24px;">
      <steps></steps>
      <transition name="slide" mode="out-in" appear>
        <!-- search column -->
        <div class="column is-8 is-offset-2">
          <h1 class="title">Search strategy</h1>
          <h6 class="subtitle is-6">Define your search strategy by inputing the search string from <a
            href="https://www.ncbi.nlm.nih.gov/pubmed/">PubMed®</a></h6>
          <div class="field">
            <div class="control">
              <textarea class="textarea" placeholder="Write your search string here..." v-model="searchString.text"></textarea>
            </div>
          </div>

          <h4 class="title is-4" style="margin-top: 48px">Additional string (exclusion strings)</h4>
          <h6 class="subtitle is-6">Append strings to the base search string, to exclude</h6>

          <!-- One exclusion search string-->
          <div class="field is-horizontal" style="margin-bottom: 0">
            <div class="field" style="margin-right: 44px; margin-bottom: 0">
            <p>Use</p>
            </div>

            <div class="field-body">
              <div class="field has-addons">
                <div class="control is-expanded">
                </div>
                <div class="control">
                  <p>Exclusion criteria</p>
                </div>
              </div>

              <div style="margin-top: 9px; margin-left: 12px"></div>
            </div>
          </div>


          <div class="field is-horizontal" v-for="ss in searchStrings">
            <div class="field" style="margin-top: 6px; margin-bottom: 0">
              <input :id="ss.id" v-model="ss.is_used" type="checkbox" class="switch is-rounded is-medium">
              <label :for="ss.id"></label>
            </div>

            <div class="field-body">
              <div class="field has-addons">
                <div class="control is-expanded has-icons-left">
                  <input v-model="ss.text" class="input" type="text" placeholder="Define search string">
                  <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
                <div class="control">
                    <multiselect v-model="value" :options="options"></multiselect>
                </div>
              </div>

              <a class="delete" style="margin-top: 9px; margin-left: 12px" @click="deleteSearchString(ss.id)"></a>
            </div>
          </div>

          <div class="has-text-centered">
            <a class="button is-info is-fullwidth" @click="addSearchString" :class="{'is-loading': ajaxLoading}">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
            </a>
          </div>


          <h4 class="title is-4" style="margin-top: 48px">Final search string</h4>
          <h6 class="subtitle is-6"></h6>
          <pre v-html="finalString"></pre>

        </div>
      </transition>
    </div>
</template>

<script>
  import Vue from "vue";

  export default {
    name: 'SearchStrategy',

    data() {
      return {
        ajaxLoading: false,
        maId: null,
        searchString: '',
        searchStrings: [],
        value: null,
        options: ['list', 'of', 'options']
      }
    },

    computed: {
      finalString: function () {
        return this.searchString.text + '<br>' + this.searchStrings.filter(function(x) { return x.is_used; }).map(x => x.text).join('<br>')
      }
    },

    methods: {
      addSearchString() {
        this.ajaxLoading = true;
        window.Axios.post('/meta-analyses/' + this.maId + "/search-strings")
          .then(response => {
            let ss_id = response.data.id;
            this.searchStrings.push({
              id: response.data.id,
              is_used: response.data.is_used,
              is_main: response.data.is_main
            });
            //Vue.set(this.searchStrings, ss_id, );
            this.ajaxLoading = false;
          })
          .catch(error => {
            if (error.response.status === 404) {
              alert("404");
            } else {
              alert(error);
            }
          });
      },

      deleteSearchString(id) {
        for (let i in this.searchStrings) {
          if (this.searchStrings[i].id === id) {
            this.searchStrings.splice(i, 1);
          }
        }
        window.Axios.delete('search-strings/' + id);
      },

      loadSearchStrategy() {
        this.maId = parseInt(this.$route.params.id);

        // Load the meta analysis
        window.Axios.get('/meta-analyses/' + this.maId)
          .then(response => {
            this.searchString = response.data.search_strings.filter(function(x) { return x.is_main; })[0];
            this.searchStrings = response.data.search_strings.filter(function(x) { return !x.is_main; })
          })
          .catch(error => {
            if (error.response.status === 404) {
              alert("404")
            } else {
              console.log('Error', error.message);
            }
          });
      }
    },
    mounted() {
      this.loadSearchStrategy();

      window.Event.$on('save', () => {

        let data = {'search_strings': this.searchStrings.concat([this.searchString])};
        window.Axios.put('/meta-analyses/' + this.maId + "/search-strings", data)
          .then(response => {
            let ss_id = response.data.id;
            this.searchStrings.push({
              id: response.data.id,
              is_used: response.data.is_used,
              is_main: response.data.is_main
            });
            //Vue.set(this.searchStrings, ss_id, );
            this.ajaxLoading = false;
          });
        this.$router.push({ name: 'Creation', params: { id: this.maId }});
      });
    },
  }
</script>
