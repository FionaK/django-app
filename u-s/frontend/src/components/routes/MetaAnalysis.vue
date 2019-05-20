<template>
  <div id="home" class="container" style="padding-top: 24px;">
    <steps></steps>
    <transition name="slide" mode="out-in" appear>
      <div class="column is-8 is-offset-2">

        <div class="field" style="margin-bottom: 24px">
          <p class="control has-icons-left">
            <input class="input is-large" placeholder="Title" v-model="title">
            <span class="icon is-small is-left"> <i class="fas fa-heading"></i></span>
          </p>
        </div>
        <div class="columns">

          <!-- First column -->
          <div class="column">
            <h4 class="title is-4">Metrics</h4>

            <!-- Input fields -->
            <div class="field is-horizontal" v-for="metric in metrics">
              <div class="field-body">
                <div class="field">
                  <div class="control has-icons-left is-expanded">
                    <input class="input" type="text" placeholder="Define a metric" v-model="metric.title">
                    <span class="icon is-small is-left"> <i class="fas fa-balance-scale"></i> </span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <a class="delete" style="margin-top: 9px; margin-left: 12px" @click="deleteMetric(metric.id)"></a>
                </div>
              </div>
            </div>

            <!-- Add button -->
            <div class="has-text-centered">
              <a class="button is-info is-fullwidth" @click="addMetric" :class="{'is-loading': metricAjax}">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
              </a>
            </div>
          </div>

          <!-- Second column -->
          <div class="column">
            <h4 class="title is-4">Meta properties</h4>

            <!-- Input fields-->
            <div class="field is-horizontal" v-for="m in meta_values">
              <div class="field-body">
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <input class="input" type="text" placeholder="Define property" v-model="m.title">
                  </div>
                  <div class="control">
                  <span class="select">
                    <select v-model="m.is_numeric">
                      <option value="true">Number</option>
                      <option value="false">Text</option>
                    </select>
                  </span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <a class="delete" style="margin-top: 9px; margin-left: 12px" @click="deleteMetric(m.id)"></a>
                </div>
              </div>
            </div>

            <!-- Add button -->
            <div class="has-text-centered">
              <a class="button is-info is-fullwidth" @click="addMeta" :class="{'is-loading': metaAjax}">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'MetaAnalysis',
    data() {
      return {
        maId: null,
        metrics: [],
        meta_values: [],
        title: "",
        metricAjax: false,
        metaAjax: false
      }
    },
    methods: {

      // TODO: The metric and meta can be squissed together as only difference is the 'is_meta' bool
      addMetric() {
        this.metricAjax = true;
        window.Axios.post('/meta-analyses/' + this.maId + "/metrics", {'is_meta':false})
          .then(response => {
            this.metrics.push({
              id: response.data.id,
              is_meta: response.data.is_meta,
              is_numeric: response.data.is_numeric,
              title: response.data.title
            });
            this.metricAjax = false;
          })
          .catch(error => {
            if (error.response.status === 404) {
              alert("404");
            } else {
              alert(error);
            }
          });
      },

      addMeta() {
        this.metaAjax = true;
        window.Axios.post('/meta-analyses/' + this.maId + "/metrics", {'is_meta':true})
          .then(response => {
            this.meta_values.push({
              id: response.data.id,
              is_meta: response.data.is_meta,
              is_numeric: response.data.is_numeric,
              title: response.data.title
            });
            this.metaAjax = false;
          })
          .catch(error => {
            if (error.response.status === 404) {
              alert("404");
            } else {
              alert(error);
            }
          });
      },

      deleteMetric(id) {
        for (let i in this.meta_values) {
          if (this.meta_values[i].id === id) {
            this.meta_values.splice(i, 1);
          }
        }

        for (let i in this.metrics) {
          if (this.metrics[i].id === id) {
            this.metrics.splice(i, 1);
          }
        }
        window.Axios.delete('metrics/' + id);
      },

      loadMetaAnalysis() {
        this.maId = parseInt(this.$route.params.id);

        // Load the meta analysis
        window.Axios.get('/meta-analyses/' + this.maId)
          .then(response => {
            this.title = response.data.title;
            this.metrics = response.data.metrics.filter(function (x) {
              return !x.is_meta;
            });
            this.meta_values = response.data.metrics.filter(function (x) {
              return x.is_meta;
            });
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
      this.loadMetaAnalysis();

      window.Event.$on('save', () => {

        let data = {
          'title': this.title,
          'metrics': this.meta_values.concat(this.metrics)
        };
        window.Axios.put('/meta-analyses/' + this.maId, data)
          .then(response => {
          });
        this.$router.push({ name: 'Screening', params: { id: this.maId }});
      });
    },
  }
</script>
