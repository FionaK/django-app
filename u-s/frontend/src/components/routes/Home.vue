<template>
  <div id="home" class="container">
      <v-server-table url="/meta-analyses" :columns="columns" :options="options">
        <div slot="screen" slot-scope="props" class="has-text-centered">
          <router-link class="button badge" :data-badge="props.row.num_articles_need_screening" :to="{ name: 'Screening', params: { id: props.row.id }}">
            <span class="icon">
              <i class="fas fa-eye"></i>
            </span>
          </router-link>
        </div>
        <div slot="extraction" slot-scope="props" class="has-text-centered">
          <router-link class="button badge" :data-badge="props.row.num_articles_need_extraction" :to="{ name: 'PaperOverview', params: { id: props.row.id }}">
            <span class="icon">
              <i class="fas fa-eye-dropper"></i>
            </span>
          </router-link>
        </div>
        <div slot="analysis" slot-scope="props" class="has-text-centered">
          <router-link class="button" :to="{ name: 'Analysis', params: { id: props.row.id }}">
            <span class="icon">
              <i class="fas fa-chart-line"></i>
            </span>
          </router-link>
        </div>
      </v-server-table>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        columns: ['id', 'title', 'screen', 'extraction', 'analysis'],
        options: {
          headings: {
            id: 'ID',
            title: 'Title',
            screen: 'Articles to screen',
            extraction: 'Articles to extract',
            analysis: 'Analysis'
          },
          requestFunction: function (data) {
            return window.Axios.get("/meta-analyses", {
              params: data
            }).catch(function (e) {
              this.dispatch('error', e);
            }.bind(this));
          },
          responseAdapter(resp) {
            return {
              data: resp.data.data,
              count: resp.data.count
            }
          },
        }
      }
    },

    mounted() {},

    methods: {}
  }
</script>
