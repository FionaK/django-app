<template>
  <div id="home" style="margin-bottom: 48px">
    <div class="has-text-centered">
      <a class="button is-primary is-large" @click="newMetaAnalysis">New Meta Analysis</a>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      newMetaAnalysis() {
        window.Axios.post('/meta-analyses')
          .then(response => {
            let ma_id = response.data.id;
            this.$router.push('/meta-analysis/' + ma_id + '/search-strategy');
          })
          .catch(error => {
            if (error.response.status === 404) {
              alert("404");
            } else {
              alert(error);
            }
          });

      }
    }
  }
</script>
