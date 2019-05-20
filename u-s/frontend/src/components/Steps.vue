<template>
  <div style="padding-bottom: 24px">
    <ul class="steps is-medium is-centered has-content-centered is-horizontal">

      <li class="steps-segment has-gaps" v-for="step in steps" :class="{'is-active': step.isActive}">
        <router-link class="has-text-dark" :to="{name: step.routeName, params: {id: maId}}">
          <!--<a href="#" class="has-text-dark">-->
          <span class="steps-marker">
                <span class="icon">
                  <i class="fa" :class="step.icon"></i>
                </span>
              </span>
          <div class="steps-content">
            <p class="heading" :class="{'has-text-weight-bold': step.isActive}">{{step.title}}</p>
          </div>
        </router-link>
      </li>

      <li class="steps-segment">
        <span class="steps-marker is-hollow">
          <span class="icon">
            <i class="fa fa-chart-line"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="heading">Analysis</p>
        </div>
      </li>

    </ul>
  </div>

</template>

<script>
  export default {
    name: 'Steps',

    data() {
      return {
        steps: {
          "SearchStrategy": {
            title: "Search",
            icon: "fa-search",
            isActive: false,
            routeName: "SearchStrategy"
          },
          "Creation": {
            title: "Create",
            icon: "fa-pencil-alt",
            isActive: false,
            routeName: "Creation"
          },
          "Screening": {
            title: "Screen",
            icon: "fa-eye",
            isActive: false,
            routeName: "Screening"
          },
          "Extraction": {
            title: "Extract",
            icon: "fa-eye-dropper",
            isActive: false,
            routeName: "PaperOverview"
          }
        }
      }
    },

    mounted() {
      if (this.$route.name == 'PaperOverview') {
        this.steps['Extraction'].isActive = true;
      } else {
        if (this.$route.name in this.steps){
          this.steps[this.$route.name].isActive = true;
        }
      }
    },

    computed: {
      maId: function () {
        return parseInt(this.$route.params.id);
      }
    }
  }

</script>
