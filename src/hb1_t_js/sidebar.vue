<script>
    import sz16 from "@/hb1_t_js/sidebar_zoom16.vue";
    import sz12 from "@/hb1_t_js/sidebar_zoom12.vue";
    import sz8 from "@/hb1_t_js/sidebar_zoom8.vue";
    export default {
      name: 'DynamicDataTable',
      components: {
        sz16,
        sz12,
        sz8
      },
      data() {
        return {};
      }
    };
</script>
<template>
  <sz16></sz16>
</template>


