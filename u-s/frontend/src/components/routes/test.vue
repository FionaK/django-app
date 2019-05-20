<style>
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
    font-size: 0rem;
  }
</style>

<template>

  <div class="container">
  <div class="columns">
    <div class="column is-4" style="background-color: red"></div>
    <div class="column" style="background-color: green"></div>
  </div>
    <div style="overflow-x: scroll">
    <table class="table is-bordered">
      <thead>
      <tr>
        <th colspan="3" style="border-top-width: 0; border-left-width: 0"></th>
        <th :colspan="assesments.length+1" class="assessments has-text-centered">Assessments</th>
      </tr>
      <tr>
        <th><abbr title="Position">Treatment</abbr></th>
        <th><abbr title="Position">Dosis</abbr></th>
        <th><abbr title="Position">Patients</abbr></th>
        <th>Baseline</th>
        <th v-for="assesment in assesments">
          <div class="field has-addons ">
            <p class="control">
              <input class="input is-small" type="text" style="min-width: 36px;">
            </p>
            <p class="control">
                <span class="select is-small">
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
        <th class="is-button is-right-button" @click="addAssessment">
            <span class="icon" style="color: white">
              <i class="fas fa-plus"></i>
            </span>
        </th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="treatment in treatments">
          <td style="width: 100%">
            <input class="input is-small" type="text" placeholder="#" v-model="treatment.title">
          </td>
          <td>
            <input class="input is-small" style="width: 60px;" v-model="treatment.dosis"/>
          </td>
          <td>
            <input class="input is-small" v-model="treatment.patients" type="number"/>
          </td>


          <td class="mean-sd" v-for="d in treatment.data">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label>Mean</label>
                    <input size="4" style="min-width: 36px;" class="input is-small" type="text" v-model="d.mean">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <label>SD</label>
                    <input size="4" style="min-width: 36px;" class="input is-small" type="text" v-model="d.sd">
                  </div>
                </div>
              </div>
            </div>
          </td>

          <td style="padding: 0 !important; border-style: none;">
            <a class="delete" style="margin-top: 16px; margin-left: 6px" @click="deleteMetric(m.id)"></a>
          </td>
        </tr>
        <tr>
          <th class="is-button has-text-centered is-bottom-button" @click="addTreatment">
            <span class="icon" style="color: white">
              <i class="fas fa-plus"></i>
            </span>
          </th>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>


<script>
  import Vue from "vue";

  export default {
    name: 'SearchStrategy',

    data() {
      return {
        assesments: [
          {
            'value': 10,
            'format': 'month'
          },
          {
            'value': 23,
            'format': 'month'
          }
        ],
        treatments: [
          {
            'id': 0,
            'title': 'Desmopressin',
            'dosis': '10µg',
            'patients': 11,
            'data': [
              {
                'mean': 11,
                'sd': 0.2
              },
              {
                'mean': 11,
                'sd': 0.2
              },
              {
                'mean': 32,
                'sd': 0.7
              },
            ]
          },
          {
            'id': 0,
            'title': 'Desmopressin',
            'dosis': '50µg',
            'patients': 198,
            'data': [
              {
                'mean': 11,
                'sd': 0.2
              },
              {
                'mean': 11,
                'sd': 0.2
              },
              {
                'mean': 32,
                'sd': 0.7
              },
            ]
          }
        ]
      }
    },

    methods: {
      addAssessment() {
        this.assesments.push({
            'value': null,
            'format': null
        });

        this.treatments.forEach(function(treatment, idx) {
          treatment['data'].push({
            'mean': 11,
            'sd': 0.2
          })
        });
        // TODO: for each treatment append a data object
      },

      addTreatment() {
        let dataList = []
        for (let i = 0; i < this.assesments.length+1; i++){
          dataList.push({'mean': null, 'sd': null});
        }

        this.treatments.push({
          'id': "a",
          'title': '',
          'dosis': '',
          'patients': '',
          'data': dataList
        });
      },

      deleteTreatment() {

      }
    }
  }
</script>
