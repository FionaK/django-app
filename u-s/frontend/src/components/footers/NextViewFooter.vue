<template>
  <div>
    <a
      class="button is-primary is-fullwidth is-large"
      href="#" @click="emitSave">
      {{ nextStepText }}
    </a>
  </div>

</template>

<script>
  export default {
    name: 'NextViewFooter',
    props: ['nextStepText'],
    computed: {
      maId: function () {
        return parseInt(this.$route.params.id);
      }
    },
    methods: {
      emitSave() {
        window.Event.$emit('save')
      }
    }
  }
</script>
