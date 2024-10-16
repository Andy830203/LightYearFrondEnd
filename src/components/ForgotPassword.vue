<template>
    <div>
      <form @submit.prevent="resetPassword">
        <input v-model="email" placeholder="Email" type="email" />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      async resetPassword() {
        const response = await this.$http.post('/api/forgot-password', {
          email: this.email
        });
        // 根據 response 提示用戶
      }
    }
  };
  </script>
  