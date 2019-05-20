<style type="text/css">
  #list-of-papers {
    height: calc(100vh - 154px);
    overflow-y: scroll;
    border: 0 solid #dcdfe3;
    border-top-width: 1px;
  }

  button.reject {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .multiselect__tags {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .multiselect__single {
    padding-left: 0;
    padding-right: 0;
    font-size: 1em;
  }

  .multiselect__input {
    padding-left: 0;
  }

  .multiselect__content-wrapper {
    width: 350px;
  }

  .multiselect {
    font-size: 12px;
  }

  div.screening {
    padding-top: 24px;
    padding-left: 96px;
    padding-right: 96px;
  }

  div.reject {
    width: 168px;
  }

  div.excluded {
    background-color: hsl(348, 100%, 61%); /* Red/Danger */
    color: white;
  }

  div.included {
    background-color: hsl(141, 71%, 48%); /* Green/Success */
    color: white;
  }

  div.selected {
    background-color: hsl(0, 0%, 86%); /* Grey lighter */
    color: white;
  }

</style>

<template>
  <div class="columns" style="width: 100%">
    <div class="column is-one-third">
      <div id="list-of-papers">
        <transition-group name="cardslide" tag="div">
          <div class="card" v-for="(article, index) in articles" v-if="article.show" :key="article.id">
            <div @click="setCurrentSelectedIndex(index)">
              <div class="card-content"
                   v-bind:class="{
                      selected: (index === currentArticleIndex && article.screening_state === 'NS'),
                      excluded: (article.screening_state === 'DC'),
                      included: (article.screening_state === 'AP')
                     }"
                   style="padding: 12px"
              >
                <p class="is-size-7 has-text-weight-bold" style="margin-bottom: 0.5rem">{{article.title}}</p>
                <p class="content is-size-7">{{article.authors}}</p>
              </div>
            </div>
          </div>
        </transition-group>

      </div>
    </div>

    <div class="column screening">
      <steps></steps>
      <transition name="slide" mode="out-in" appear>
        <div>
          <div class="card">
            <div class="card-content" style="margin-bottom: 24px;">
              <a class="button is-pulled-right">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <p class="has-text-weight-bold" style="font-size: 16px;">{{ articles[currentArticleIndex].title }}</p>
              <p style="font-size: 10px; margin-top: 6px; margin-bottom: 6px;"> {{ articles[currentArticleIndex].authors
                }} </p>
              <p class="content is-small" style="height: 18vh; overflow-y: scroll;"> {{ articles[currentArticleIndex].abstract }} </p>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-narrow">
              <button class="button is-large is-success"
                      title="approve (a)"
                      v-shortkey="['ctrl', 'a']"
                      @shortkey="approveArticle()"
                      @click="approveArticle"
                      style="font-size: 4em">
            <span class="icon">
            <i class="fas fa-check"></i>
        </span>
              </button>
            </div>
            <div class="column is-narrow reject">
              <button class="button is-large is-danger reject"
                      :disabled="(value === null)"
                      title="discard (x)"
                      v-shortkey="['ctrl', 'x']"
                      @shortkey="discardArticle()"
                      @click="discardArticle"
                      style="font-size: 4em">
            <span class="icon">
            <i class="fas fa-times"></i>
        </span>
              </button>
              <multiselect v-model="value"
                           @tag="addTag"
                           :options="options"
                           :taggable="true"
                           :show-labels="false"
                           tag-placeholder=""
                           placeholder=""
                           label="title"
              >
              </multiselect>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-6">
              <div class="field">
                <div class="control">
                  <textarea class="textarea is-small" rows="2" placeholder="Add comment for decision"
                            v-model="articles[currentArticleIndex].articleComments"></textarea>
                </div>
              </div>

            </div>
          </div>
          <div class="columns">
            <div class="column">
              <progress class="progress"
                        :value="numberOfArticlesScreened"
                        :max="totalNumberOfArticles"></progress>
              <p style="text-align: center">{{numberOfArticlesScreened}} of {{totalNumberOfArticles}} screened</p>
            </div>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'Screening',

    data() {
      return {
        currentArticleIndex: 0,
        articles: [],
        value: null,
        options: [],
        ma_id: null
      }
    },

    beforeMount: function () {
      this.ma_id = parseInt(this.$route.params.id);
      this.loadArticles();
      this.loadExclusionCriterias();
    },
    mounted: function () {


    },

    computed: {

      numberOfArticlesScreened: function () {
        let count = 0;

        for (let i = this.articles.length - 1; i >= 0; i--) {
          if (this.articles[i].screening_state !== 'NS') {
            count++;
          }
        }
        return count
      },

      totalNumberOfArticles: function () {
        return this.articles.length;
      }
    },

    methods: {
      addTag(newTag) {
        window.Axios.post('/meta-analyses/' + this.ma_id + "/exclusion-criterias", {'title':newTag})
          .then(response => {
            this.options.push(response.data);
            this.value = response.data;
          })
          .catch(error => {
            if (error.response.status === 404) {
              alert("404");
            } else {
              alert(error);
            }
          });
      },

      discardArticle: function () {
        let a = this.articles[this.currentArticleIndex];
        a.screening_state = "DC";
        let data = {
          'exclusion_crit_id': this.value.id,
          'comment': a.articleComment,
          'screening_state': "DC"
        };
        window.Axios.post('/articles/' + a.id, data)
          .then(response => {
            if (this.numberOfArticlesScreened < this.totalNumberOfArticles) {
              this.currentArticleIndex++;
              this.value = null;
            }
            a.show = false;
          });
      },

      approveArticle: function () {
        let a = this.articles[this.currentArticleIndex];
        a.screening_state = "AP";

        let data = {
          'comment': a.articleComment,
          'screening_state': "AP"
        };

        window.Axios.post('/articles/' + a.id, data)
          .then(response => {
            if (this.numberOfArticlesScreened < this.totalNumberOfArticles) {
              this.currentArticleIndex++;
              this.value = null;
            }
            a.show = false;
          });

      },

      setCurrentSelectedIndex: function (index) {
        this.currentArticleIndex = index;
        this.value = null;
      },

      loadExclusionCriterias: function () {
        window.Axios.get('/meta-analyses/' + this.ma_id + '/exclusion-criterias')
          .then(result => {
            this.options = result.data.data;
          }, e => {
            console.log(e);
          });
      },

      loadArticles: function () {
        window.Axios.get('/meta-analyses/' + this.ma_id + '/articles')
          .then(result => {
            this.articles = result.data;
            for (let a in this.articles) {
              if (this.articles[a]['screening_state'] !== 'NS') {
                this.articles[a]["show"] = false;
              } else {
                this.articles[a]["show"] = true;
              }

            }
          }, e => {
            console.log(e);
          });
        let a = 1 + 1;
      }

    }
  }

</script>
