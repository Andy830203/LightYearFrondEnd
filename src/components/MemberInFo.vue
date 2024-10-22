<template>
    <div class="member-info">
      <img :src="member.photoUrl" alt="Member Photo" class="member-photo">
      <h2>{{ member.name }}</h2>
      <div class="info-item">
        <strong>暱稱:</strong> {{ member.nickname }}
      </div>
      <div class="info-item">
        <strong>生日:</strong> {{ member.birthday }}
      </div>
      <div class="info-item">
        <strong>Email:</strong> {{ member.email }}
      </div>
      <div class="info-item">
        <strong>點數:</strong> {{ member.point }} 
      </div>
      <div class="info-item">
        <strong>等級:</strong> {{ member.level }}
      </div>
      <div class="info-item">
        <strong>經驗值:</strong>
        <div class="exp-container">
          <span class="exp-text">{{ member.exp }}%</span> <!-- 把百分比移到進度條前面 -->
          <div class="progress-bar">
            <div class="progress-bar-fill" :style="{ width: member.exp + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { reactive } from 'vue';

// 使用 reactive 定義會員資料物件
const member = reactive({
  name: 'John Doe',
  nickname: '',
  email: 'john.doe@example.com',
  birthday: '1990-01-01', // 替換為會員的生日
  level: 30,
  exp: 25.11, // 假設經驗值為 70%
  point: 250,
  photoUrl: 'src/assets/images/members/初心者.jpg' // 替換為會員的照片URL
});
</script>

  
  <style scoped>
  .member-info {
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    width: 320px;
    margin: 20px auto;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: 'Arial', sans-serif;
  }
  
  .member-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
    border: 2px solid #ddd;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
    text-align: center;
  }
  
  .info-item {
    font-size: 18px;
    margin-bottom: 10px;
    color: #555;
    text-align: left; /* 將資訊部分靠左對齊 */
  }
  
  strong {
    color: #222;
  }
  
  .exp-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .exp-text {
    margin-right: 10px; /* 給經驗值數字和進度條之間留點空間 */
    font-weight: bold;
    color: #333;
  }
  
  .progress-bar {
    background-color: #e0e0e0;
    border-radius: 5px;
    width: 100%;
    height: 20px;
    overflow: hidden;
  }
  
  .progress-bar-fill {
    background-color: #76c7c0;
    height: 100%;
    border-radius: 5px;
    transition: width 0.5s ease-in-out;
  }
  </style>
  