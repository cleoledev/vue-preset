<script>
<%_ if (options.addPlugin.includes('axios')) { _%>
// import axios from '@/plugins/axios'
<%_ } _%>

export default {
  name: 'Index'<%_ if (options.addPlugin.includes('vue-meta')) { _%>,
  metaInfo () {
    return {
      title: 'title'
    }
  }
  <%_ } _%>
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
