<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>上架商品</h2>
      <form @submit.prevent="submitUpload" class="form-grid">
        
        <!-- 左邊欄位：商品詳細資訊 -->
        <div class="main-details">
          <label>商品名稱:
            <input type="text" v-model="productName" class="input-field" />
          </label>
          <label>商品類別:
            <select v-model="selectedCategory" class="input-field">
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </label>
          <label>價格:
            <input type="number" v-model="productPrice" class="input-field" />
          </label>
          <label>庫存量:
            <input type="number" v-model="productStock" class="input-field" />
          </label>
          <label>商品描述:
            <textarea v-model="productDescription" class="input-field" rows="4"></textarea>
          </label>
        </div>

        <!-- 右邊欄位：圖片上傳區 -->
        <div class="image-section">
          <label>新增圖片:
            <input type="file" multiple @change="handleImagePreview" accept="image/*" />
          </label>

          <!-- 新增圖片預覽 -->
          <div v-if="newImagePreviews.length > 0">
            <h3>圖片預覽</h3>
            <div v-for="(image, index) in newImagePreviews" :key="index" class="img-preview">
              <img :src="image" alt="New Image Preview" class="img-thumbnail" />
            </div>
          </div>
        </div>

        <!-- 按鈕區 -->
        <div class="button-group">
          <button type="submit" class="confirm-btn">確認上架</button>
          <button type="button" class="cancel-btn" @click="$emit('close')">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const BASE_URL = import.meta.env.VITE_API_BASEURL;

export default {
  data() {
    return {
      productName: "",
      productPrice: 0,
      productStock: 0,
      productDescription: "",
      selectedCategory: null,
      categories: [],
      newImageFiles: [],
      newImagePreviews: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch(`${BASE_URL}/ProductCategories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        if (!response.ok) throw new Error("無法取得類別資料");
        this.categories = await response.json();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    handleImagePreview(event) {
      this.newImageFiles = Array.from(event.target.files);
      this.newImagePreviews = this.newImageFiles.map(file => URL.createObjectURL(file));
    },
    async submitUpload() {
      try {
        const formData = new FormData();
        formData.append("Name", this.productName);
        formData.append("Price", this.productPrice);
        formData.append("Instock", this.productStock);
        formData.append("Description", this.productDescription);
        formData.append("CategoryId", this.selectedCategory);

        // 新增圖片文件
        this.newImageFiles.forEach(file => formData.append("images", file));
        const memberData = JSON.parse(localStorage.getItem('member'));
        const userID = memberData ? memberData.id : null;
        const response = await fetch(`${BASE_URL}/Products/${userID}`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("無法上架商品");
        alert("商品已成功上架！");
        this.$emit("uploaded");
        this.$emit("close");
      } catch (error) {
        console.error("Error uploading product:", error);
        alert("上架商品失敗！");
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 700px;
  max-width: 90%;
  animation: slideIn 0.3s ease;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.main-details,
.image-section {
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.img-preview {
  display: inline-block;
  margin: 5px;
}

.img-thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.button-group {
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.confirm-btn,
.cancel-btn {
  border: none;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 700;
  color: white;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #3C3C3C;
}

.confirm-btn {
  background-color: #4caf50;
}

.confirm-btn:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #45a049;
}

.cancel-btn {
  background-color: #f44336;
}

.cancel-btn:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #d32f2f;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>

  