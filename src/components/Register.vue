<template>
  <div class="form d-flex justify-content-center align-items-center vh-100">
    <div class="p-4 shadow form-container">
      <div class="title text-center">註冊新帳號</div>
      <form @submit.prevent="register" class="form-vertical">
        <!-- 姓名 -->
        <input
          v-model="name"
          id="name"
          type="text"
          class="input mb-3"
          placeholder="請輸入姓名"
          required
        />
        <!-- 帳號 -->
        <input
          v-model="username"
          id="username"
          type="text"
          class="input mb-3"
          placeholder="請輸入帳號"
          required
        />
        <!-- 生日 -->
        <input
          v-model="birthday"
          id="birthday"
          type="date"
          class="input mb-3"
          required
        />
        <!-- 電話 -->
        <input
          v-model="phone"
          id="phone"
          type="tel"
          class="input mb-3"
          placeholder="請輸入電話號碼"
          required
        />
        <!-- 住址 -->
        <input
          v-model="address"
          id="address"
          type="text"
          class="input mb-3"
          placeholder="請輸入住址"
          required
        />
        <!-- 性別 -->
        <select
          v-model="gender"
          id="gender"
          class="input mb-3"
          required
        >
          <option value="">請選擇性別</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
        <!-- Email -->
        <input
          v-model="email"
          id="email"
          type="email"
          class="input mb-3"
          placeholder="請輸入Email"
          required
        />
        <!-- 密碼 -->
        <input
          v-model="password"
          id="password"
          type="password"
          class="input mb-3"
          placeholder="請輸入密碼"
          required
        />
        <!-- 確認密碼 -->
        <input
          v-model="confirmPassword"
          id="confirmPassword"
          type="password"
          class="input mb-3"
          placeholder="再次輸入密碼"
          required
        />
        <!-- 註冊按鈕 -->
        <button type="submit" class="button-confirm mt-3">註冊</button>
      </form>
      <hr class="my-4">
      <div class="text-center">
        <p class="mb-0" style="color: aliceblue;">已經有帳號？<router-link to="/login" class="text-decoration-none">立即登入</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { ref } from 'vue';
import axios from 'axios';

// 定義 reactive 資料
const formData = reactive({
  name: '',
  username: '',
  birthday: '',
  phone: '',
  address: '',
  gender: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 註冊函數
const register = async () => {
  if (formData.password !== formData.confirmPassword) {
    alert('密碼不一致');
    return;
  }

  try {
    const response = await axios.post('/api/register', {
      name: formData.name,
      username: formData.username,
      birthday: formData.birthday,
      phone: formData.phone,
      address: formData.address,
      gender: formData.gender,
      email: formData.email,
      password: formData.password
    });
    alert('註冊成功');
  } catch (error) {
    alert('註冊失敗');
  }
};
</script>


<style scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 確保整個視窗的高度 */
}

.form-container {
  --input-focus: #ffcc00; /* 金色 */
  --font-color: #ffffff; /* 白色 */
  --font-color-sub: #dddddd; /* 淺灰色 */
  --bg-color: #1f1f1f; /* 深色背景 */
  --main-color: #ff6f00; /* 橘色 */
  padding: 20px;
  background: linear-gradient(135deg, #3a3a3a, #1f1f1f); /* 漸變背景 */
  border-radius: 15px; /* 調整邊角 */
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.5); /* 更深的陰影 */
  width: 400px; /* 增加寬度到 400px */
}

.title {
  color: var(--font-color);
  font-weight: 900;
  font-size: 24px;
  margin-bottom: 25px;
}

.form-vertical {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input {
  width: 100%; /* 全寬 */
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.input:focus {
  border: 2px solid var(--input-focus);
}

.button-confirm {
  margin: 20px auto 0 auto;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
}

.text-decoration-none {
  color: var(--font-color-sub);
  text-decoration: none;
}

.text-decoration-none:hover {
  color: var(--input-focus);
}

/* 確保文字在容器內置中 */
.text-center {
  text-align: center;
}

.mb-0 {
  margin-bottom: 0; /* 確保沒有額外的下邊距 */
}
</style>
