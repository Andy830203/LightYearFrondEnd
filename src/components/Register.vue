<template>
    <div>
      <form @submit.prevent="register">
        <input v-model="name" placeholder="Name" type="text" />
        <input v-model="email" placeholder="Email" type="email" />
        <input v-model="password" placeholder="Password" type="password" />
        <input v-model="confirmPassword" placeholder="Confirm Password" type="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
  
        const response = await this.$http.post('/api/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        // 根據 response 處理邏輯
      }
    }
  };
  </script>
  