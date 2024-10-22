<template>
  <div class="form d-flex justify-content-center align-items-center vh-100">
    <div class="p-4 shadow form-container">
      <div class="title text-center">忘記密碼</div>
      <p class="text-center" style="color: aliceblue;">請輸入您的 Email 地址，我們將發送一個重設密碼的鏈接給您。</p>
      <form @submit.prevent="resetPassword" class="form-vertical text-center">
        <input
          v-model="email"
          id="email"
          type="email"
          class="input mb-3"
          placeholder="請輸入您的Email"
          required
        />
        <button type="submit" class="button-confirm">發送重設鏈接</button>
      </form>
      <hr class="my-4">
      <div class="text-center">
        <router-link to="/login" class="text-decoration-none">返回登入</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定義 reactive 變數
const email = ref('');

// 重設密碼的函式
const resetPassword = async () => {
  try {
    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value
      })
    });

    if (!response.ok) throw new Error('發送失敗');
    
    alert('重設密碼的鏈接已發送到您的Email。');
  } catch (error) {
    alert('發送失敗，請稍後再試。');
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
  width: 200px; /* 按鈕寬度 */
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
</style>
