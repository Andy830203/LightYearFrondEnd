<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 order-2 order-md-1">
        <div class="card shadow">
          <div class="card-header text-center bg-light text-dark">
            <h4>修改會員資料</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProfile" enctype="multipart/form-data">
              <!-- 會員圖片 -->
              <div class="mb-3 text-center">
                <label for="profilePicture" class="form-label">會員圖片</label>
                <div class="mb-3">
                  <!-- 圖片預覽 -->
                  <img :src="imagePreview" alt="會員圖片預覽" class="img-thumbnail mb-2" style="max-width: 150px;" />
                </div>
                <input
                  type="file"
                  id="profilePicture"
                  class="form-control"
                  @change="onImageSelected"
                />
              </div>
              <!-- 暱稱 -->
              <div class="mb-3">
                <label for="nickname" class="form-label">暱稱</label>
                <input
                  v-model="nickname"
                  id="nickname"
                  type="text"
                  class="form-control"
                  placeholder="請輸入暱稱"
                  required
                />
              </div>
              <!-- 姓名 -->
              <div class="mb-3">
                <label for="name" class="form-label">姓名</label>
                <input
                  v-model="name"
                  id="name"
                  type="text"
                  class="form-control"
                  placeholder="請輸入姓名"
                  required
                />
              </div>
              <!-- 帳號 (不可修改) -->
              <div class="mb-3">
                <label for="username" class="form-label">帳號</label>
                <input
                  v-model="username"
                  id="username"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
              <!-- 生日 -->
              <div class="mb-3">
                <label for="birthday" class="form-label">生日</label>
                <input
                  v-model="birthday"
                  id="birthday"
                  type="date"
                  class="form-control"
                  required
                />
              </div>
              <!-- 電話 -->
              <div class="mb-3">
                <label for="phone" class="form-label">電話</label>
                <input
                  v-model="phone"
                  id="phone"
                  type="tel"
                  class="form-control"
                  placeholder="請輸入電話號碼"
                  required
                />
              </div>
              <!-- 住址 -->
              <div class="mb-3">
                <label for="address" class="form-label">住址</label>
                <input
                  v-model="address"
                  id="address"
                  type="text"
                  class="form-control"
                  placeholder="請輸入住址"
                  required
                />
              </div>
              <!-- 性別 -->
              <div class="mb-3">
                <label for="gender" class="form-label">性別</label>
                <select
                  v-model="gender"
                  id="gender"
                  class="form-select"
                  required
                >
                  <option value="">請選擇性別</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  v-model="email"
                  id="email"
                  type="email"
                  class="form-control"
                  placeholder="請輸入Email"
                  required
                />
              </div>
              <!-- 更新按鈕 -->
              <div class="d-grid">
                <button type="submit" class="btn btn-soft-success">更新資料</button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center bg-light">
            <p>如需變更密碼，請前往<a href="/change-password" class="text-decoration-none">變更密碼頁面</a></p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 order-1 order-md-2">
        <MemberInFo></MemberInFo>
      </div>
    </div>
  </div>
</template>

<script setup>
import MemberInFo from '@/components/MemberInFo.vue';
import { ref, onMounted } from 'vue';

// 定義 reactive 變數
const name = ref('');
const username = ref('');
const nickname = ref(''); // 新增暱稱
const birthday = ref('');
const phone = ref('');
const address = ref('');
const gender = ref('');
const email = ref('');
const profilePicture = ref(null); // 儲存選取的圖片檔案
const imagePreview = ref(''); // 預覽圖片的路徑

// 取得會員資料的函式
const getProfileData = async () => {
  try {
    const response = await fetch('/api/member-profile');
    const profile = await response.json();

    name.value = profile.name;
    username.value = profile.username;
    nickname.value = profile.nickname; // 取得暱稱
    birthday.value = profile.birthday;
    phone.value = profile.phone;
    address.value = profile.address;
    gender.value = profile.gender;
    email.value = profile.email;
    imagePreview.value = profile.profilePictureUrl || ''; // 預覽會員的現有圖片
  } catch (error) {
    alert('無法載入會員資料');
  }
};

// 當圖片被選擇時，更新預覽圖和圖片檔案
const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    profilePicture.value = file;
    imagePreview.value = URL.createObjectURL(file); // 生成本地預覽路徑
  }
};

// 更新會員資料的函式
const updateProfile = async () => {
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('nickname', nickname.value); // 新增暱稱到表單
  formData.append('birthday', birthday.value);
  formData.append('phone', phone.value);
  formData.append('address', address.value);
  formData.append('gender', gender.value);
  formData.append('email', email.value);
  if (profilePicture.value) {
    formData.append('profilePicture', profilePicture.value); // 新增圖片檔案到表單資料
  }

  try {
    const response = await fetch('/api/member-profile', {
      method: 'PUT',
      body: formData,
      headers: {
        // 'Content-Type': 'multipart/form-data' 不需要設置，瀏覽器會自動處理
      },
    });
    if (!response.ok) throw new Error('更新失敗');
    alert('資料更新成功');
  } catch (error) {
    alert('資料更新失敗');
  }
};

// 組件掛載後取得會員資料
onMounted(() => {
  getProfileData();
});
</script>

<style scoped>
.container {
  margin-top: 5rem;
  background: url('@/assets/images/members/背景圖片.png'); /*設置背景圖片*/
  /* background-color: #D1E9E9	; */
  background-size: cover; /* 背景圖片覆蓋整個區域 */
  background-position: center; /* 背景圖片居中 */
  padding: 2rem; /* 內邊距 */
  border-radius: 10px; /* 圓角邊框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 陰影效果 */
}

.card {
  border-radius: 10px;
  border: 1px solid #d3d3d3;
  background: rgba(255, 255, 255, 0.9); /* 卡片背景稍微透明 */
}

.card-header {
  background-color: #f0f4f8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-footer {
  background-color: #f0f4f8;
}

.btn-soft-success {
  background-color: #d4edda;
  color: #155724;
  border: none;
}

.btn-soft-success:hover {
  background-color: #c3e6cb;
}

form input,
form select {
  border-radius: 5px;
  padding: 0.75
}

</style>