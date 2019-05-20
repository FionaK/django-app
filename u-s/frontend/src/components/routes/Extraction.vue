<style>
  .wrapper {
    height: 70vh;
  }

  .no-button {
    margin-right: 36px
  }

  div.metric {
    margin: 12px;
  }

  th {
    font-size: 16px;
  }

  label {
    margin: 0;
    font-size: 10px;
    font-weight: bold;
  }

  td {
    padding-top: 14px !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
  }

  td.mean-sd {
    padding-top: 0px !important;
    padding-bottom: 3px !important;
  }


  th.is-button {
    background-color: #209cee;
    background-color: lightblue;
    color: white;
    cursor: pointer;
    padding-right: 10px;
    padding-left: 10px;
    border-style: none;
  }

  th.is-right-button {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  th.is-bottom-button {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  th.assessments {
    padding-top: 0;
    padding-bottom: 0;
    background-color: lightgrey;
  }

  span.is-button {
    color: white;
  }

  .control {
    font-size: 0;
  }

</style>

<template>
  <div style="width: 100%; padding-top: 24px;">
    <steps></steps>
    <div>
      <div class="columns" style="padding-left: 24px; padding-right: 24px;">
        <div class="column">
          <p class="is-size-5 has-text-weight-bold" style="margin-bottom: 6px">{{title}}</p>
          <div class="columns">
            <div class="column">
              <p class="is-size-7 has-text-grey"><span class="has-text-weight-semibold is-uppercase">PMID: </span><a href="https://www.ncbi.nlm.nih.gov/pubmed/">{{pubmed_id}}</a></p>
              <p class="is-size-7 has-text-grey"><span class="has-text-weight-semibold is-uppercase">Authors: </span>{{author}}</p>
              <p class="is-size-7 has-text-grey"><span class="has-text-weight-semibold is-uppercase">Date: </span>{{year}}</p>
            </div>
            <div class="column has-text-right">
              <div class="columns is-gapless">
                <div class="column" style="margin-right: 6px;">
                  <router-link class="button is-large" :to="{name: 'PaperOverview', params: {id: maId}}">
                  <span class="icon">
                    <i class="fas fa-bars"></i>
                  </span>
                  </router-link>
                </div>
                <div class="column is-narrow" style="margin-right: 6px;">
                  <a class="button is-large">
                  <span class="icon">
                    <i class="fas fa-chevron-right"></i>
                  </span>
                  </a>
                </div>
                <div class="column is-narrow">
                  <a class="button is-info is-large">
                  <span class="icon">
                    <i class="fas fa-save"></i>
                  </span>
                  </a>
                </div>
              </div>
              <div class="field">
                <input id="switchRoundedDefault1" type="checkbox" name="switchRoundedDefault" class="switch is-rounded is-rtl is-large">
                <label for="switchRoundedDefault1">Data extracted</label>
              </div>

            </div>
          </div>
          <div v-for="mm in meta_metrics" class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">{{mm.title}}</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input v-model="mm.value" class="input" type="text">
                </p>
              </div>
            </div>
          </div>
          <h4 class="title is-4" style="margin-bottom: 12px">Metrics</h4>
          <div style="overflow-y: scroll; height: calc(100vh - 460px); border-style: solid; border-width: 1px; border-color: hsl(0, 0%, 86%)">
            <div class="box metric" v-for="(metric, m_idx) in metrics">
            <div style="margin-bottom: 12px">
            <!--<p class="has-text-centered is-size-7 has-text-weight-bold">Metric</p>-->
            <h5 class="title is-5" >{{metric.title}}</h5>
            </div>
            <div>
              <table class="table is-bordered">
                <thead>
                <tr>
                  <th colspan="3" style="border-top-width: 0; border-left-width: 0"></th>
                  <th :colspan="metric.assessments.length" class="assessments has-text-centered">Assessments</th>
                </tr>
                <tr>
                  <th><abbr title="Position">Treatment</abbr></th>
                  <th><abbr title="Position">Dosis</abbr></th>
                  <th><abbr title="Position">Patients</abbr></th>
                  <th v-for="assesment in metric.assessments">
                    <div v-if="assesment.value === 0">Baseline</div>
                    <div v-else class="field has-addons ">
                      <p class="control">
                        <input class="input is-small" type="text" style="min-width: 36px;" v-model="assesment.value">
                      </p>
                      <p class="control">
                        <span class="select is-small"> <!-- TODO: Fix select options from-->
                          <select>
                            <option>H</option>
                            <option>D</option>
                            <option>W</option>
                            <option>M</option>
                          </select>
                        </span>
                      </p>
                    </div>
                  </th>
                  <th class="is-button is-right-button" @click="addAssessment(m_idx)">
            <span class="icon" style="color: white">
              <i class="fas fa-plus"></i>
            </span>
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(treatment, t_idx) in metric.treatments">
                  <td style="width: 100%">
                    <input class="input is-small" type="text" placeholder="#" v-model="treatment.title">
                  </td>
                  <td>
                    <input class="input is-small" style="width: 60px;" v-model="treatment.dosis"/>
                  </td>
                  <td>
                    <input class="input is-small" v-model="treatment.patients" type="number"/>
                  </td>


                  <td class="mean-sd" v-for="d in treatment.measurements">
                    <div class="field is-horizontal">
                      <div class="field-body">
                        <div class="field">
                          <div class="control">
                            <label>Mean</label>
                            <input size="4" style="min-width: 40px;" class="input is-small" type="text" v-model="d.mean">
                          </div>
                        </div>

                        <div class="field">
                          <div class="control">
                            <label>SD</label>
                            <input size="4" style="min-width: 40px;" class="input is-small" type="text" v-model="d.sd">
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style="padding: 0 !important; border-style: none;">
                    <a class="delete" style="margin-top: 16px; margin-left: 6px" @click="deleteTreatment(m_idx, t_idx)"></a>
                  </td>
                </tr>
                <tr>
                  <th class="is-button has-text-centered is-bottom-button" @click="addTreatment(m_idx)">
                    <span class="icon" style="color: white">
                      <i class="fas fa-plus"></i>
                    </span>
                  </th>
                  <td style="border-style: none;" colspan="2"></td>
                  <td v-for="assessment in metric.assessments" class="has-text-centered" style="padding: 0 !important; border-style: none;">
                    <a class="delete" style="margin-top: 6px;" @click="deleteAssessment(m_idx, assessment.id)"></a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          </div>

        </div>
        <!-- PDF viewer on the right-->
        <div class="column">
          <object :data="pdfUrl" type="application/pdf" width="100%" height="100%">
            <p><b>Example fallback content</b>: This browser does not support PDFs. Please download the PDF to view it: <a href="/pdf/sample-3pp.pdf">Download PDF</a>.</p>
          </object>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from "vue";
  export default {
    data() {
      return {
        articleId: null,
        maId: null,
        title: null,
        author: null,
        year: null,
        pubmed_id: null,
        metrics: [],
        meta_metrics: []
      }
    },
    computed: {
      pdfUrl: function () {
        return 'http://127.0.0.1:5000/articles/' + this.articleId + '/pdfs'
      }
    },
    methods: {
      loadMeasurements() {
        window.Axios.get('/articles/' + this.articleId)
          .then(response => {
            this.title = response.data.title;
            this.author = response.data.author;
            this.year = response.data.year;
            this.pubmed_id = response.data.pubmed_id;
            this.metrics = response.data.metrics;
            this.meta_metrics = response.data.meta_metrics;
          })
          .catch(error => {
            if (error.response.status === 404) {
              alert("404")
            } else {
              console.log('Error', error.message);
            }
          });
      },

      addAssessment(metric_id) {
        let newId = 'n'+this.metrics[metric_id].assessments.length; // TODO: This creates a bug when a assessment that is not in the end of the list is deleted.
        this.metrics[metric_id].assessments.push({
          'id': newId,
          'value': null,
          'unit': null
        });

        this.metrics[metric_id].treatments.forEach(function(treatment, idx) {
          treatment['measurements'].push({
            'assessment_id': newId,
            'mean': null,
            'sd': null
          })
        });
      },

      addTreatment(m_idx) {
        let dataList = [];
        this.metrics[m_idx].assessments.forEach(function(assessment, idx) { // Fuck this shit -> i miss python
          dataList.push({
            'assessment_id': assessment.id, // TODO: Fix this
            'mean': null,
            'sd': null
          });
        });

        let newTreatment = {
          'title': '',
          'dosis': '',
          'patients': '',
          'measurements': dataList
        };

        this.metrics[m_idx].treatments.push(newTreatment);
      },

      deleteTreatment(m_idx, t_idx) {
        Vue.delete(this.metrics[m_idx].treatments, t_idx);
      },

      deleteAssessment(m_idx, a_id) {
        // Figure out the assessment idx that we need to delete.
        let idxToDelete = null;
        this.metrics[m_idx].assessments.forEach(function(assessment, idx) { // I hate JS
          if (assessment.id === a_id) {
            idxToDelete = idx;
          }
        });
        Vue.delete(this.metrics[m_idx].assessments, idxToDelete);

        // Figure out the measurements idx's we want to delete.
        this.metrics[m_idx].treatments.forEach(function(treatment, t_idx) { // I hate JS
          let measurementIdxToDelete = null;
          treatment.measurements.forEach(function (measurement, measurement_idx) {
            if (measurement.assessment_id === a_id) {
              measurementIdxToDelete = measurement_idx;
            }
          });
          Vue.delete(treatment.measurements, measurementIdxToDelete);
        });

      },
    },
    beforeMount() {
      this.articleId = parseInt(this.$route.params.article_id);
      this.maId = parseInt(this.$route.params.id);
      this.loadMeasurements();
    }
  }

</script>
