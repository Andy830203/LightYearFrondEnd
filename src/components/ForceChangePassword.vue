<template>
    <div style="display: flex; justify-content: center;">
      <div style="width: 300px;">
        <div class="text-contanier" style="background-color: orange;">
        <div class="scene1">
        <h1 >更改密碼</h1>
      </div>
    </div>
        <form @submit.prevent="submitPasswordChange" class="form">
          <input
            type="password"
            id="newPassword"
            v-model="form.newPassword"
            class="input"
            placeholder="新密碼"
            required
          />
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="input"
            placeholder="確認新密碼"
            required
          />
          <button type="submit">提交</button>
        </form>
        <p v-if="message" style="color: white; text-align: center; margin-top: 10px;">
          {{ message }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
const BASE_URL = import.meta.env.VITE_API_BASEURL;

export default {
  setup() {
    const form = reactive({
      newPassword: '',
      confirmPassword: ''
    });
    const route = useRoute();

    

    const submitPasswordChange = async () => {
  try {
    // 密碼正則驗證條件（至少 8 個字元，包含至少一個大寫字母和一個數字）
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // 驗證新密碼格式
    if (!passwordPattern.test(form.newPassword)) {
      Swal.fire({
        icon: 'error',
        title: '密碼格式不正確',
        text: '密碼至少要包含 8 個字元，並且包含一個大寫字母和一個數字',
        confirmButtonText: '確認'
      });
      return;
    }

    const memberData = JSON.parse(localStorage.getItem('member'));
    const userID = memberData ? memberData.id : null;

    const response = await fetch(`${BASE_URL}/Members/ForceChangePassword`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Id: userID,
        NewPassword: form.newPassword,
        ConfirmPassword: form.confirmPassword,
      })
    });

    // 嘗試解析為 JSON 格式，若失敗則視為文字
    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    if (!response.ok) {
      throw new Error(result.message || result || '密碼更改失敗，請檢查輸入的資料');
    }

    // 使用 SweetAlert 來顯示成功訊息
    Swal.fire({
      icon: 'success',
      title: '密碼已成功更改',
      text: typeof result === "string" ? result : result.message || '請重新登入以確保安全',
      confirmButtonText: '確認'
    }).then(() => {
      window.location.href = "/MemberInFo";
    });

  } catch (error) {
    // 使用 SweetAlert 來顯示錯誤訊息
    Swal.fire({
      icon: 'error',
      title: '發生錯誤',
      text: error.message || '請稍後再試',
      confirmButtonText: '確認'
    });
  }
};



    return {
      form,
      submitPasswordChange,
    };
  },
};
</script>

  
  <style scoped>
/* 在 CSS 中引入 Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');


  /* From Uiverse.io by Shoh2008 */
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #1e1e1e;
    padding: 20px;
    border: 1px solid #3d3c3c;
    border-radius: 10px;
    color: white;
    text-align: center;
    font-size: 20px;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .form .input {
    height: 35px;
    outline: none;
    border: 2px solid orange;
    background: transparent;
    padding: 20px 10px;
    border-radius: 5px;
    transition: .5s;
    color: white;
    font-size: 20px;
  }
  
  .form .input:focus {
    background: orange;
  }
  
  .form button {
    width: 100%;
    color: white;
    transition: .5s;
    font-size: 20px;
    outline: none;
    border: none;
    height: 45px;
    border-radius: 5px;
    background: orange;
    align-self: flex-end;
  }

  .scene1{
  h1 {
    color: white;
    text-shadow: 0 1px 0 #ccc, 

               0 2px 0 #c9c9c9,

               0 3px 0 #bbb,

               0 4px 0 #b9b9b9,

               0 5px 0 #aaa,

               0 6px 1px rgba(0,0,0,.1),

               0 0 5px rgba(0,0,0,.1),

               0 1px 3px rgba(0,0,0,.3),

               0 3px 5px rgba(0,0,0,.2),

               0 5px 10px rgba(0,0,0,.25),

               0 10px 10px rgba(0,0,0,.2),

               0 20px 20px rgba(0,0,0,.15);

    text-align: center;
  }

  
}
  </style>
  