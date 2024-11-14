<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>上架商品</h2>
        <form @submit.prevent="submitUpload">
          <label>商品名稱:
            <input type="text" v-model="productName" class="input-field" />
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
          <label>商品圖片:
            <input type="file" multiple @change="onFileChange" class="file-input" />
          </label>
          <div class="button-group">
            <button type="submit" class="confirm-btn">確認上架</button>
            <button type="button" @click="$emit('close')" class="cancel-btn">取消</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        productName: "",
        productPrice: 0,
        productStock: 0,
        productDescription: "", // 商品描述
        productImages: [],
      };
    },
    methods: {
      onFileChange(event) {
        this.productImages = Array.from(event.target.files); // 保存多張圖片
      },
      submitUpload() {
        alert("上架商品");
        // 上傳邏輯可以在此處實現
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
    width: 350px;
    max-width: 90%;
    animation: slideIn 0.3s ease;
    text-align: center;
  }
  
  h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .input-field, .file-input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .file-input {
    padding: 8px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  .confirm-btn,
  .cancel-btn {
    border: none;
    outline: none;
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
  
  /* 動畫效果 */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  </style>
  