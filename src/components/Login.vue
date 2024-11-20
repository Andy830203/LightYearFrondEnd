
複製程式碼
<template>
  <div id="auth-container" v-if="!isLoggedIn">
    <div class="main">
      <!-- 隱藏的 checkbox，作為切換註冊和登入表單的觸發器 -->
      <input type="checkbox" id="chk" aria-hidden="true" />
      <input type="checkbox" id="forgot-pwd" aria-hidden="true" />
      <!-- 註冊表單 -->
       <GoogleLogin v-show="googlebug" :callback="handleGoogleLogin" class="mt-1" />
      <div class="signup" >
        <form @submit.prevent="register">
          <label>註冊</label>
          <input type="text" v-model="registerUsername" placeholder="用戶姓名" required />
          <input type="email" v-model="registerEmail" placeholder="電子郵件" required />
          <input type="password" v-model="registerPassword" placeholder="密碼" required />
          <input type="password" v-model="registerConfirmPassword" placeholder="確認密碼" required />
          <button type="submit">註冊</button>
        </form>
      </div>

      <!-- 登入表單 -->
      <div class="login" v-if="!isLoggedIn">
        <form @submit.prevent="login">
          <label for="chk" aria-hidden="true">登入</label>
          <input type="email" v-model="loginEmail" placeholder="電子郵件" required />
          <input type="password" v-model="loginPassword" placeholder="密碼" required />
          <button type="submit">登入</button>
        </form>

        <!-- 第三方登入按鈕 -->
        <div class="third-party-login">
          
          <!-- <button @click="facebookLogin" class="auth-button">
            <i class="fab fa-facebook"></i>
          </button> -->
          <!-- <GoogleLogin :callback="handleGoogleLogin" class="mt-1" /> -->
          <!-- <button @click="googleLogin" class="auth-button">
            <i class="fab fa-google"></i>
          </button> -->
        </div>
        <!-- <label for="forgot-pwd" class="forgot-password">忘記密碼？</label> -->
      </div>
      
      <!-- 忘記密碼表單 -->
      <div class="forgot-password-container" v-if="!isLoggedIn">
        <form @submit.prevent="resetPassword">
          <label for="forgot-pwd" aria-hidden="true">忘記密碼</label>
          <input type="email" v-model="resetEmail" placeholder="輸入註冊電子郵件" required />
          <button type="submit">送出重設請求</button>
        </form>
      </div>

      <!-- 已登入狀態顯示登出按鈕 -->
      <!-- <div v-else>
        <p>已登入，歡迎使用！</p>
        <button @click="logout">登出</button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useMemberStore } from '@/stores/Member';
import { useOAuthStore } from '@/stores/oAuth'; // Google登入
const BASE_URL = import.meta.env.VITE_API_BASEURL;

const loginEmail = ref('');
const loginPassword = ref('');
const registerUsername = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const registerConfirmPassword = ref('');
const resetEmail = ref('');
const oauthStore = useOAuthStore();
const googlebug = ref(null)
// 取得 member store 實例
const memberStore = useMemberStore();
const isLoggedIn = computed(() => memberStore.isLoggedIn); // 判斷是否已登入

// 登入功能
async function login() {
  try {
    const response = await fetch(`${BASE_URL}/Members/Login`, {
      method: 'POST',
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value
      }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });

    // 檢查回應狀態碼，如果不是 200，則拋出錯誤
    if (!response.ok) {
      throw new Error('登入失敗，請檢查帳號密碼');
    }

    

    const result = await response.json();

    // 更新到 member store 並存入 localStorage
    memberStore.member = { id: result.id, name: result.name };
    localStorage.setItem('member', JSON.stringify({ id: result.id }));
    
    // 檢查是否需要重設密碼
    if (result.status === "ForceChangePassword") {
      // 使用 SweetAlert 顯示訊息並重導向到強制更改密碼頁面
      await Swal.fire({
        icon: 'warning',
        title: '需要更改密碼',
        text: '您需要重設您的密碼',
        confirmButtonText: '前往重設密碼'
      });

      // 導向到重設密碼頁面
      window.location.href = result.redirectUrl;
      return; // 結束函式，避免後續的登入成功處理邏輯
    }

    // 如果不需要重設密碼，則繼續進行登入成功的處理
    console.log("登入成功", result);

    
    // 使用 SweetAlert 顯示成功提示
    await Swal.fire({
      icon: 'success',
      title: '登入成功',
      text: '歡迎回來！'
    });

    // 導向到 MemberInFo 頁面
    window.location.href = "/MemberInFo";

  } catch (error) {
    console.error("登入發生錯誤", error);

    // 使用 SweetAlert 顯示錯誤提示
    await Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: error.message
    });
  }
}

// 登出功能
function logout() {
  memberStore.member = null;  // 清除 Pinia 狀態
  localStorage.removeItem('member');  // 清除 localStorage 中的 member
  window.location.reload();  // 重整頁面以更新顯示
}



async function register() {
  
  //確認密碼變數
  const password = registerPassword.value;

  // 密碼正則驗證條件（至少 8 個字元，包含至少一個大寫字母和一個數字）
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;;

// 驗證密碼格式
if (!passwordPattern.test(password)) {
  alert('密碼至少要包含 8 個字元，並且包含字母和數字');
  return;
}

  //
  if(registerPassword.value !== registerConfirmPassword.value) {
    alert('密碼不一致，請再次確認!!')
    return; //停止後請求
  }

  // 註冊邏輯
  try {
    const response = await fetch(`${BASE_URL}/Members/Register`, {
      method: 'POST',
      body: JSON.stringify({
        Name: registerUsername.value,
        Email: registerEmail.value,
        Password: registerPassword.value,
      }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });

    if (response.ok) 
    {
      alert('快速註冊成功，請盡快至設定更新個人資訊喔');
    }
    else
    {
      alert('註冊失敗')
    }   
  } catch (error) 
  {
    console.error("註冊時發生錯誤", error);    
  }
}

async function resetPassword() {
  // 重設密碼邏輯
  try {
    const response = await fetch(`${BASE_URL}/Members/ForgotPassword`, {
      method: 'POST',
      body: JSON.stringify({
        Email: resetEmail.value,
      }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });

    if (response.ok) 
    {
      alert('請求成功');
    }
    else
    {
      alert('失敗')
    }   
  } catch (error) 
  {
    console.error("請求時發生錯誤", error);    
  }
}

function facebookLogin() {
  // Facebook 登入邏輯
  function facebookLogin() {
  FB.login(
    async (response) => {
      if (response.authResponse) {
        try {
          const { accessToken, userID } = response.authResponse;

          // 使用 accessToken 呼叫 Facebook API 獲取使用者資訊
          FB.api('/me', { fields: 'name, email' }, async (userInfo) => {
            console.log('Facebook 使用者資訊:', userInfo);

            // 透過 API 將 Facebook 使用者資訊發送到後端進行登入/註冊
            const res = await fetch(`${BASE_URL}/Members/FacebookLogin`, {
              method: 'POST',
              body: JSON.stringify({
                facebookId: userID,
                name: userInfo.name,
                email: userInfo.email,
                accessToken: accessToken
              }),
              headers: { 'Content-Type': 'application/json' },
              mode: 'cors'
            });

            if (res.ok) {
              const result = await res.json();

              // 更新 member store 並存入 localStorage
              memberStore.member = { id: result.id, name: result.name };
              localStorage.setItem('member', JSON.stringify({ id: result.id }));

              await Swal.fire({
                icon: 'success',
                title: '登入成功',
                text: '歡迎回來！'
              });

              // 導向到 MemberInFo 頁面
              window.location.href = "/MemberInFo";
            } else {
              throw new Error('Facebook 登入失敗');
            }
          });
        } catch (error) {
          console.error('Facebook 登入發生錯誤:', error);
          await Swal.fire({
            icon: 'error',
            title: '錯誤',
            text: '登入失敗，請稍後再試'
          });
        }
      } else {
        console.log('使用者取消了登入');
      }
    },
    { scope: 'public_profile,email' }
  );
}
}

function googleLogin() {
  // Google 登入邏輯
}
// Google oAuth取得 user jwt 回傳 oauth
const handleGoogleLogin = async (response) => {
    oauthStore.callback(response);
};
</script>

<style scoped>
/* 設置背景和基本樣式 */
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  background: linear-gradient(to bottom, #ff7e29, #ffde00);
}

#auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.main {
  width: 380px;
  height: 595px;
  background-color: #ff9f1a;
  border-radius: 10px;
  box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

#chk, #forgot-pwd {
  display: none;
}

/* 註冊表單樣式 */
.signup {
  position: relative;
  width: 100%;
  height: 100%;
}

label {
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}

input {
  width: 60%;
  background: #fff;
  display: flex;
  margin: 20px auto;
  padding: 12px;
  border: none;
  outline: none;
  border-radius: 5px;
}

input:active,
input:focus {
  border: 2px solid #ff7e29;
}

button {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  display: block;
  color: #fff;
  background: #ff7e29;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.1s ease-in;
  cursor: pointer;
}

button:hover {
  background-color: transparent;
  border: 3px solid #ff7e29;
  box-shadow: 0 0 10px #ffde00, 0 10px 15px #ffde00;
}

/* 登入表單樣式 */
.login {
  height: 460px;
  background: #ffcc00;
  border-radius: 60% / 10%;
  transform: translateY(-220px);
  transition: 0.8s ease-in-out;
}

.login label {
  color: #000;
  transform: scale(0.6);
}
/* 控制上下邏輯 st */
#chk:checked ~ .login {/* login往上至可視 */
  transform: translateY(-550px);
}
#chk:checked ~ .forgot-password-container{/* forgot-password-container按鈕往上至可視 */
  transform: translateY(-700px);
}
#forgot-pwd:checked ~ .forgot-password-container {/* forgot-password-container往上至可視 */
  transform: translateY(-1050px);
}
#forgot-pwd:checked ~ .login label {
  transform: scale(0.6);
}

#chk:checked ~ .signup label {
  transform: scale(0.6);
}
/* 控制上下邏輯 end */
/* 忘記密碼連結樣式 */
.forgot-password {
  display: block;
  text-align: center;
  margin-top: 10px; /* 可以增加此處的 margin-top 來增加空間 */
  color: #000;
  cursor: pointer;
  text-decoration: underline;
  position: relative; /* 添加此行 */
  z-index: 1; /* 添加此行，確保它在其他元素之上 */
}

/* 忘記密碼表單樣式 */
.forgot-password-container {
  height: 460px;
  background: #ffde00;
  border-radius: 60% / 10%;
  /* transform: translateY(-60px); */
  transform: translateY(-145%);
  transition: transform .8s ease-in-out;
}
.forgot-password-container label {
  color: #000;
  transform: scale(0.6);
}
/* 第三方登入按鈕 */
.third-party-login {
  display: flex;  
  justify-content: space-around;
  margin-top: 20px;
}

.auth-button {
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.auth-button:hover {
  transform: scale(1.1);
}

.auth-button i {
  font-size: 24px;
  color: #fff;
}
</style>
