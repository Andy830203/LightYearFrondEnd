<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>修改商品</h2>
      <form @submit.prevent="submitEdit" class="form-grid">
        
        <!-- Left Column for Main Details -->
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

        <!-- Right Column for Images -->
        <div class="image-section">
          <label>新增圖片:
            <input type="file" multiple @change="handleImagePreview" accept="image/*" />
          </label>

          <!-- Display selected image previews -->
          <div v-if="newImagePreviews.length > 0">
            <h3>新增圖片預覽</h3>
            <div v-for="(image, index) in newImagePreviews" :key="index" class="img-preview">
              <img :src="image" alt="New Image Preview" class="img-thumbnail" />
            </div>
          </div>

          <!-- Display existing images with remove option -->
          <div v-if="imgUrls.length > 0">
            <h3>當前圖片</h3>
            <div v-for="(imgUrl, index) in imgUrls" :key="index" class="existing-image">
              <img :src="IMG_URL + imgUrl" alt="Product Image" class="img-thumbnail" />
              <button type="button" @click="removeExistingImage(index)">移除圖片</button>
            </div>
          </div>
        </div>

        <!-- Button Group -->
        <div class="button-group">
          <button type="submit" class="confirm-btn">確認修改</button>
          <button type="button" class="cancel-btn" @click="$emit('close')">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
const BASE_URL = import.meta.env.VITE_API_BASEURL;
const IMG_URL = import.meta.env.VITE_API_IMGURL; // Adjust path as per your server configuration

export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      IMG_URL, // Use IMG_URL directly in the template
      productName: "",
      productPrice: 0,
      productStock: 0,
      productDescription: "",
      selectedCategory: null,
      imgUrls: [], // Existing image URLs
      categories: [],
      newImageFiles: [], // New image files to upload
      newImagePreviews: [], // Preview URLs for new images
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchProductData();
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
        if (!response.ok) throw new Error("Failed to fetch categories.");
        this.categories = await response.json();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchProductData() {
      try {
        const response = await fetch(`${BASE_URL}/Products/${this.productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        if (!response.ok) throw new Error("Failed to fetch product data.");
        const product = await response.json();
        this.productName = product.name;
        this.productPrice = product.price;
        this.productStock = product.instock;
        this.productDescription = product.description;
        this.selectedCategory = product.category;
        this.imgUrls = product.imgUrls;
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },
    handleImagePreview(event) {
      this.newImageFiles = Array.from(event.target.files);
      this.newImagePreviews = this.newImageFiles.map(file => URL.createObjectURL(file));
    },
    removeExistingImage(index) {
      this.imgUrls.splice(index, 1);
    },
    async submitEdit() {
      try {
        const formData = new FormData();
        formData.append("Name", this.productName);
        formData.append("Price", this.productPrice);
        formData.append("Stock", this.productStock);
        formData.append("Description", this.productDescription);
        formData.append("CategoryId", this.selectedCategory);

        // Append new images to FormData
        this.newImageFiles.forEach((file) => formData.append("images", file));

        // Append existingImageUrls as JSON, even if empty
        formData.append("existingImageUrls", JSON.stringify(this.imgUrls || []));

        const response = await fetch(`${BASE_URL}/Products/${this.productId}`, {
          method: "PUT",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to update product.");

        alert("商品已成功更新！");
        this.$emit('updated');
        this.$emit("close");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("更新商品失敗！");
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
  width: 700px; /* Adjust width as needed */
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
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.img-preview,
.existing-image {
  display: inline-block;
  margin: 5px;
}

.img-thumbnail {
  width: 80px; /* Thumbnail size */
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.button-group {
  grid-column: span 2; /* Center button group across both columns */
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
  