<template>
    <div class="contact-container">
      <h2>聯絡我們</h2>
      <form @submit.prevent="submitForm">
        <label for="name">姓名：</label>
        <input type="text" v-model="name" required />
  
        <label for="email">電子郵件：</label>
        <input type="email" v-model="email" required />
  
        <label for="message">問題內容：</label>
        <textarea v-model="message" required></textarea>
  
        <button type="submit">提交</button>
      </form>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  const BASE_URL = import.meta.env.VITE_API_BASEURL;
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        message: "",
      };
    },
    methods: {
      async submitForm() {
        // 透過 API 發送表單內容
        const formData = {
          name: this.name,
          email: this.email,
          message: this.message,
        };
  
        try {
          const response = await fetch(`${BASE_URL}/Mail/SendContactEmail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
  
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "提交成功",
              text: "您的問題已成功提交，我們會盡快回覆您！",
            });
            // 清空表單
            this.name = "";
            this.email = "";
            this.message = "";
          } else {
            const errorText = await response.text();
            Swal.fire({
              icon: "error",
              title: "提交失敗",
              text: `提交失敗：${errorText}`,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "錯誤",
            text: "發生錯誤，請稍後再試。",
          });
        }
      },
    },
  };
  </script>
  
  <style lang="css" scoped>
  .contact-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(135deg, #FFDC35, #FFD306); /* 較柔和的背景色 */
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  h2 {
    text-align: center;
    color: #2d3748;
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    color: #4a5568;
    margin-top: 10px;
  }
  
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    font-size: 1rem;
    background-color: #f7f4ed;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  textarea:focus {
    outline: none;
    border-color: #ebbd35;
    box-shadow: 0 0 8px rgba(235, 132, 23, 0.3);
  }
  
  button {
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    color: #fff;
    background-color: #e58211;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #d48f74;
  }
  
  button:active {
    background-color: #2c5282;
  }
  </style>
  