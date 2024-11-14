<script>
    import sz16 from "@/hb1_t_js/sidebar_zoom16.vue";
    import sz12 from "@/hb1_t_js/sidebar_zoom12.vue";
    import sz8 from "@/hb1_t_js/sidebar_zoom8.vue";
    import { sideb_8, sideb_12,sideb_16 } from '@/hb1_t_js/GM_c.js';
    export default {
      name: 'DynamicDataTable',
      components: {
        sz16,
        sz12,
        sz8
      },
      data() {
        return {
          sideb_8,
          sideb_12,
          sideb_16
        };
      }
    };
</script>
<template>
  <sz16 v-if="sideb_16"></sz16>
  <sz12 v-if="sideb_12"></sz12>
  <sz8 v-if="sideb_8"></sz8>
</template>


