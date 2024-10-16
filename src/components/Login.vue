<template>
    <div>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="Email" type="email" />
        <input v-model="password" placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        const response = await this.$http.post('/api/login', {
          email: this.email,
          password: this.password
        });
        // 根據 response 處理邏輯
      }
    }
  };
  </script>
  