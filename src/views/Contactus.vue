<template>
  <div class="contact-page">
    <div class="address-container">
      <h3>聯絡地址</h3>
      <p>高雄市前金區中正四路211號8樓之1</p>
      <div class="map-container">
        <mp />
      </div>
    </div>

    <div class="contact-container">
      <h2>聯絡我們</h2>
      <form @submit.prevent="submitForm">
        <label for="name">姓名：</label>
        <input type="text" v-model="formData.name" required />

        <label for="email">電子郵件：</label>
        <input type="email" v-model="formData.email" required />

        <label for="message">問題內容：</label>
        <textarea v-model="formData.message" required></textarea>

        <button type="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Swal from "sweetalert2";
import mp from '@/hb1_t_js/map_api_js_c_for_index.vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;

const formData = reactive({
  name: "",
  email: "",
  message: ""
});

const submitForm = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Mail/SendContactEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "提交成功",
        text: "您的問題已成功提交，我們會盡快回覆您！"
      });
      // 清空表單
      formData.name = "";
      formData.email = "";
      formData.message = "";
    } else {
      const errorText = await response.text();
      Swal.fire({
        icon: "error",
        title: "提交失敗",
        text: `提交失敗：${errorText}`
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "錯誤",
      text: "發生錯誤，請稍後再試。"
    });
  }
};
</script>

<style scoped>
.contact-page {
  display: flex;
  flex-wrap: wrap; /* 當螢幕寬度不足時，自動換行 */
  justify-content: center; /* 中心對齊 */
  gap: 20px; /* 區塊之間的間距 */
  margin: 0 auto;
  max-width: 1200px; /* 調整整體寬度 */
}

.address-container,
.contact-container {
  flex: 1 1 45%; /* 每個區塊佔45%的寬度，保持彈性 */
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.address-container {
  background-color: #f7f4ed;
  text-align: center;
}

h3 {
  color: #2d3748;
  margin-bottom: 10px;
}

p {
  color: #4a5568;
  font-size: 1rem;
}

.map-container {
  width: 100%;
  height: 300px; /* 控制地圖高度 */
  margin-top: 15px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-container {
  background: linear-gradient(135deg, #FEC37D, #fcbf74);
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
