<template>
    <div class="my-products-page">
      <header class="header">
        <h1 class="page-title">我的商品</h1>
        <button class="custom-button upload-btn" @click="showUploadProduct = true">我要上架商品</button>
      </header>
  
      <!-- 商品列表區域 -->
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-item">
          <img :src="product.image" alt="商品圖片" class="product-image" />
          <div class="product-details">
            <p class="product-name">{{ product.name }}</p>
            <p class="price">價格: {{ product.price }} 元</p>
            <p class="stock">庫存量: {{ product.stock }} 件</p>
            <p class="listing-time">上架時間: {{ product.listingTime }}</p>
          </div>
          <div class="action-buttons">
            <button @click="showEditProduct(product.id)" class="custom-button">修改</button>
            <button @click="showDeleteProduct(product.id)" class="custom-button">下架</button>
          </div>
        </div>
      </div>
  
      <!-- 動態顯示元件 -->
      <EditProduct v-if="currentEditId !== null" :productId="currentEditId" @close="currentEditId = null" />
      <DeleteProduct v-if="currentDeleteId !== null" :productId="currentDeleteId" @cancel="currentDeleteId = null" />
      <UploadProduct v-if="showUploadProduct" @close="showUploadProduct = false" />
    </div>
  </template>
  
  <script>
  import EditProduct from "@/components/EditProduct.vue";
  import DeleteProduct from "@/components/DeleteProduct.vue";
  import UploadProduct from "@/components/UploadProduct.vue";
  
  export default {
    components: {
      EditProduct,
      DeleteProduct,
      UploadProduct,
    },
    data() {
      return {
        products: [
          { id: 1, name: "商品A", image: "path/to/image1.jpg", price: 1000, stock: 20, listingTime: "2024-11-01" },
          { id: 2, name: "商品B", image: "path/to/image2.jpg", price: 1500, stock: 15, listingTime: "2024-11-05" },
        ],
        currentEditId: null,
        currentDeleteId: null,
        showUploadProduct: false,
      };
    },
    methods: {
      showEditProduct(id) {
        this.currentEditId = id;
      },
      showDeleteProduct(id) {
        this.currentDeleteId = id;
      },
    },
  };
  </script>
  
  <style scoped>
  .my-products-page {
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f1f4f8;
    max-width: 1000px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* 標題區域樣式 */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .page-title {
    font-size: 28px;
    font-weight: bold;
    color: #183153;
  }
  
  /* 商品列表區域 */
  .product-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .product-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #e0e4e8;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease-in-out;
  }
  
  .product-item:hover {
    transform: translateY(-5px);
  }
  
  .product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #ddd;
  }
  
  .product-details {
    flex: 1;
    font-size: 14px;
    color: #333;
  }
  
  .product-name {
    font-weight: bold;
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }
  
  .price, .stock, .listing-time {
    margin-bottom: 5px;
    color: #555;
  }
  
  /* 行動按鈕區域 */
  .action-buttons {
    display: flex;
    gap: 10px;
  }
  
  /* 新的自定義按鈕樣式 */
  .custom-button {
    border: none;
    outline: none;
    background-color: 		#844200;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    border-radius: 5px;
    transition: all ease 0.1s;
    box-shadow: 0px 5px 0px 0px #3C3C3C;
    cursor: pointer;
  }
  
  .custom-button:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px #3C3C3C;
  }
  </style>
  