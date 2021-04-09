<script>
<%_ if (options.useCompositionAPI) { _%>
import {} from '@vue/composition-api'
<%_ } _%>

export default {
  name: '{{ pascalCase name }}'<%_ if (options.useCompositionAPI) { _%>,
  setup (props, context) {
  }
  <%_ } _%>
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
