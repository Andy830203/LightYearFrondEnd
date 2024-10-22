<template>
  <div class="form d-flex justify-content-center align-items-center vh-100">
    <div class="p-4 shadow form-container">
      <button class="close-button" @click="closeLogin">&times;</button>
      <div class="title text-center">Welcome,<br><span>sign up to continue</span></div>
      <form @submit.prevent="login" class="form-vertical">
        <input 
          v-model="username" 
          name="username" 
          placeholder="帳號" 
          type="text" 
          class="input mb-3" 
          required
        />
        <input 
          v-model="password" 
          name="password" 
          placeholder="密碼" 
          type="password" 
          class="input mb-3" 
          required
        />
        <button type="submit" class="button-confirm mt-3">Let’s go →</button>
        <div class="text-center mt-3">
          <router-link to="/forgotpassword" class="text-decoration-none">忘記密碼</router-link>
        </div>
        <div class="text-center mt-2">
          <router-link to="/register" class="text-decoration-none">還沒有帳號？註冊</router-link>
        </div>
      </form>
      <hr class="my-4">
      <div class="login-with">
        <div @click="facebookLogin" class="button-log">
          <i class="fa-brands fa-facebook"></i>
        </div>
        <div @click="googleLogin" class="button-log">
          <i class="fa-brands fa-google"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 假設你要使用路由導向

// 定義 reactive 變數
const username = ref(''); // 帳號
const password = ref('');

// 定義方法
const closeLogin = () => {
  emit('close'); // 使用 emit 來通知父組件
};

// 登入方法
const login = async () => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value, // 帳號
        password: password.value
      })
    });

    const result = await response.json();

    if (result.success) {
      alert('登入成功');
    } else {
      alert('登入失敗，請稍後再試');
    }
  } catch (error) {
    console.error('登入失敗', error);
  }
};

// Facebook 登入
const facebookLogin = () => {
  FB.login(response => {
    if (response.authResponse) {
      FB.api('/me', { fields: 'name,email' }, async (userInfo) => {
        try {
          const response = await fetch('/api/login/facebook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userInfo.email,
              name: userInfo.name,
              facebookId: response.authResponse.userID
            })
          });

          const result = await response.json();

          if (result.success) {
            alert('登入成功');
          } else {
            alert('登入失敗，請稍後再試');
          }
        } catch (error) {
          console.error('Facebook 登入失敗', error);
        }
      });
    } else {
      alert('登入被取消');
    }
  }, { scope: 'email' });
};

// Google 登入
const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(async (result) => {
      const user = result.user;
      try {
        const response = await fetch('/api/login/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName,
            googleId: user.uid
          })
        });

        const result = await response.json();

        if (result.success) {
          alert('登入成功');
        } else {
          alert('登入失敗，請稍後再試');
        }
      } catch (error) {
        console.error('Google 登入失敗', error);
      }
    })
    .catch((error) => {
      console.error('Google 登入失敗', error);
    });
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
  width: 350px; /* 調整寬度 */
  position: relative; /* 相對定位以便放置關閉按鈕 */
}

.close-button {
  position: absolute; /* 絕對定位 */
  top: 10px; /* 距上邊距 */
  right: 10px; /* 距右邊距 */
  background: transparent; /* 背景透明 */
  border: none; /* 無邊框 */
  color: var(--font-color); /* 字體顏色 */
  font-size: 20px; /* 字體大小 */
  cursor: pointer; /* 指針效果 */
}

.close-button:hover {
  color: var(--input-focus); /* 滑鼠懸停變色 */
}

.title {
  color: var(--font-color);
  font-weight: 900;
  font-size: 24px;
  margin-bottom: 25px;
}

.title span {
  color: var(--font-color-sub);
  font-weight: 600;
  font-size: 18px;
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

.login-with {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.button-log {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  color: var(--font-color);
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-log:active, .button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
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
</style>
