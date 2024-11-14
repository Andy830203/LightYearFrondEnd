<template>
    <div class="modal-overlay" @click.self="$emit('cancel')">
      <div class="modal-content">
        <h2>刪除商品</h2>
        <p class="modal-message">確定要刪除此商品嗎？此操作無法還原。</p>
        <div class="button-group">
          <button @click="confirmDelete" class="confirm-btn">確認刪除</button>
          <button @click="$emit('cancel')" class="cancel-btn">取消</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  const BASE_URL = import.meta.env.VITE_API_BASEURL;
  export default {
    props: {
    productId: {
      type: Number,
      required: true,
    },
  },
    methods: {
      async confirmDelete() {
      try {
        const response = await fetch(`${BASE_URL}/products/Offshelf/${this.productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          // Emit an event to inform the parent component about the deletion
          this.$emit('deleted', this.productId);
          alert('商品已成功刪除');
        } else {
          alert('刪除商品失敗');
        }
      } catch (error) {
        console.error('刪除商品時發生錯誤:', error);
        alert('刪除商品時發生錯誤');
      }
    },    
    }
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
    width: 320px;
    max-width: 90%;
    text-align: center;
    animation: slideIn 0.3s ease;
  }
  
  h2 {
    font-size: 20px;
    color: #d32f2f;
    margin-bottom: 15px;
  }
  
  .modal-message {
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
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
    background-color: #d32f2f;
  }
  
  .confirm-btn:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px #b71c1c;
  }
  
  .cancel-btn {
    background-color: #9e9e9e;
  }
  
  .cancel-btn:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px #757575;
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
  