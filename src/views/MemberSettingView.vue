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
                />
              </div>             
              <!-- 生日 -->
              <div class="mb-3">
                <label for="birthday" class="form-label">生日</label>
                <input
                  v-model="birth"
                  id="birth"
                  type="date"
                  class="form-control"
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
                />
              </div>
              <!-- 性別 -->
              <div class="mb-3">
                <label for="gender" class="form-label">性別</label>
                <select
                  v-model="gender"
                  id="gender"
                  class="form-select"
                >
                  <option value="true">男</option>
                  <option value="false">女</option>
                  <!-- <option value="other">其他</option> -->
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
                  disabled
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
      <!-- <div class="col-12 col-md-3 order-1 order-md-2">
        <MemberInFo></MemberInFo>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import MemberInFo from '@/components/MemberInFo.vue';
import { ref, onMounted } from 'vue';
const BASE_URL = import.meta.env.VITE_API_BASEURL;
const IMG_URL = import.meta.env.VITE_API_IMGURL;
// 定義 reactive 變數
const name = ref('');
const nickname = ref(''); // 新增暱稱
const birth = ref('');
const phone = ref('');
const address = ref('');
const gender = ref('');
const email = ref('');
const profilePicture = ref(null); // 儲存選取的圖片檔案
const imagePreview = ref(''); // 預覽圖片的路徑
const ImgName = ref('');

// 取得會員資料的函式
const getProfileData = async () => {
  try {
    const memberData = JSON.parse(localStorage.getItem('member'));
    const userID = memberData ? memberData.id : null;

    if (!userID) {
      console.error("無法取得使用者 ID");
      return;
    }

    const response = await fetch(`${BASE_URL}/Members/GetMemberInFo/${userID}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    });

    if (!response.ok) throw new Error('無法取得會員資料');

    const profile = await response.json();
    name.value = profile.name;
    nickname.value = profile.nickname;
    birth.value = profile.birth ? profile.birth.split('/').join('-') : '';
    phone.value = profile.phone;
    address.value = profile.address;
    gender.value = profile.gender;
    console.log(gender.value);
    email.value = profile.email;
    imagePreview.value = profile.ImgName ? IMG_URL + profile.imgName : '';
    if (profile.birth) {
  // 將日期格式轉換為 yyyy-MM-dd 格式
  // const date = new Date(profile.birth);
  // const formattedDate = date.toISOString().split('T')[0];
  // birth.value = formattedDate;
} else {
  birth.value = '';
}
  } catch (error) {
    console.error('無法載入會員資料', error);
    alert('無法載入會員資料');
  }
};

const updateProfile = async () => {
  const memberData = JSON.parse(localStorage.getItem('member'));
  const userID = memberData ? memberData.id : null;

  if (!userID) {
    alert('無法取得使用者 ID');
    return;
  }

  let imgName = '';

  // 如果選擇了新圖片，先上傳圖片
  if (profilePicture.value) {
    const imageData = new FormData();
    imageData.append("profilePicture", profilePicture.value);

    try {
      const imageResponse = await fetch(`${BASE_URL}/Members/uploadProfilePicture`, {
        method: 'POST',
        body: imageData,
        mode: 'cors',
      });

      if (!imageResponse.ok) throw new Error('圖片上傳失敗');

      const imageResult = await imageResponse.json();
      imgName = imageResult.fileName; // 保存圖片名稱
    } catch (error) {
      console.error('圖片上傳錯誤', error);
      alert('圖片上傳失敗');
      return; // 如果圖片上傳失敗，停止後續操作
    }
  }

  // 準備會員資料更新的表單數據
  const profileData = new FormData();
  profileData.append("id", userID);
  profileData.append("name", name.value);
  profileData.append("nickname", nickname.value);
  profileData.append("birth", birth.value);
  profileData.append("phone", phone.value);
  profileData.append("address", address.value);
  profileData.append("gender", gender.value === "true"); // 將性別轉換為布林值

  // 如果有上傳圖片，傳遞圖片名稱
  if (imgName) {
    profileData.append("ImgName", imgName);
  }


  try {
    const response = await fetch(`${BASE_URL}/Members/${userID}`, {
      method: 'PUT',
      body: profileData,
      mode: 'cors',
    });

    if (!response.ok) throw new Error('更新失敗');
    alert('資料更新成功');
  } catch (error) {
    console.error('更新資料時發生錯誤', error);
    alert('資料更新失敗');
  }
  console.log('更新發送的資料:', profileData);

};

// 處理圖片選擇並更新預覽
const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    profilePicture.value = file; // 儲存選取的圖片檔案
    imagePreview.value = URL.createObjectURL(file); // 更新圖片預覽
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
  /* background: url('@/assets/images/members/背景.png'); 設置背景圖片 */
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