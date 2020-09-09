<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  import qs from "qs";
  export default {
    name: "App",
    created() {
      if (localStorage.eleToken){
        // localStorage.setItem('eleToken',token)
        this.$store.dispatch('setAuthenticated',!this.isEmpty(localStorage.eleToken))
        this.$store.dispatch('setUser',JSON.parse(localStorage.user))
      }
    },
    methods:{
      isEmpty(value){
        return (
                value ===undefined ||
                value ===null ||
                (typeof value === 'object'&& Object.keys(value).length===0)  ||
                (typeof value === 'string'&& value.trim().length===0)
        );
      }
    },

  }
</script>
<style lang="scss">
  html,
  body,
  #app {
 width: 100%;
    height: 100%;
}


</style>
