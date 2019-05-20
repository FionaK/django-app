<style>
  div.forrestplots{
    overflow-y: scroll;
    height: calc(100vh - 274px);
  }
  div.forrestplot {
    margin: 12px;
  }
</style>
<template>
  <div id="home" class="container" style="padding-top: 24px;">
    <steps></steps>

    <div class="columns" style="padding-left: 24px; padding-right: 24px;">
      <div class="column">
        <h1 class="title is-1">Project Desmopressin</h1>
        <div class="columns">
          <div class="column">
            <p class="has-text-weight-bold">#Articles</p>
            <p>Screened: 14</p>
            <p>Approved: 10</p>
            <p>Extracted: 0</p>
          </div>
          <div class="column">
            <p class="has-text-weight-bold">Metrics</p>
            <p>Time to first void</p>
            <p>Derease in number of nocturnal voids per night</p>
          </div>
        </div>
        <h3 class="title is-3">PRISMA Flow Diagram</h3>
        <div>
          <div class="box column is-half has-text-centered" style="margin-bottom: 12px">n={{numTotalArticles}}</div>
          <div v-for="ex in exclusionCriterias">
            <div class="box column is-half is-offset-half has-text-centered" style="margin-bottom: 12px">{{ex.title}}</div>
            <div class="box column is-half has-text-centered" style="margin-bottom: 12px">n={{ex.resultNumArticles}}</div>
          </div>
          <!--<figure class="image">-->
            <!--<img src="https://openi.nlm.nih.gov/imgs/512/77/4306416/PMC4306416_OGI2015-817849.001.png"/>-->
          <!--</figure>-->
        </div>
      </div>
      <!---->
      <div class="column">
        <div class="has-text-right" style="margin-bottom: 24px;">
          <a class="button is-info" @click="activateModal">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
          </a>
        </div>
        <div class="forrestplots">
          <div v-for="plot in plots" class="box forrestplot">
            <h4 class="title is-4">{{plot.title}}</h4>
            <figure class="image">
              <img :src="plot.image_url">
            </figure>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': modalActive }">true
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="field" style="margin-bottom: 24px">
            <p class="control has-icons-left">
              <input class="input is-large" placeholder="Forrest plot title" v-model="newForrestPlotTitle">
              <span class="icon is-small is-left"> <i class="fas fa-heading"></i></span>
            </p>
          </div>


          <div class="select" style="margin-bottom: 24px">
            <select>
              <option v-for="metric in metrics" :value="metric.id">{{metric.title}}</option>
            </select>
          </div>
          <a class="button is-info is-fullwidth" @click="createPlot">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
          </a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Analysis",
        data() {
          return {
            modalActive: false,
            newForrestPlotTitle: null,
            plots: [
              {
                title: "Plot #1",
                image_url: "http://127.0.0.1:5000/meta-analyses/1/forrest-plots"
              }
            ],
            metrics: [
              {
                id: 1,
                title: 'Metric #1'
              },
              {
                id: 2,
                title: 'Metric #2'
              }
            ],
            numTotalArticles: 14,
            exclusionCriterias: [
              {
                title: "Duplicates",
                excluded: 2,
                resultNumArticles: 12,
              },
              {
                title: "Study contains children",
                excluded: 2,
                resultNumArticles: 10
              }
            ]
          }
        },
      methods: {
        // TODO: The metric and meta can be squissed together as only difference is the 'is_meta' bool
        activateModal() {
          console.log("Yes");
          this.modalActive = true
        },

        closeModal() {
          this.newForrestPlotTitle = null;
          this.modalActive = false;
        },

        createPlot() {
          this.plots.push({
            title: this.newForrestPlotTitle
          });

          this.newForrestPlotTitle = null;
          this.modalActive = false;
        }
      }
    }
</script>

<style scoped>

</style>
