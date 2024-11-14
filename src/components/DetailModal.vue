<template>
    <div class="modal">
      <div class="modal-content">
        <button @click="closeModal" class="modal-close">&times;</button>
        <h2>{{ event.name }}</h2>
        <div class="modal-details">
          <p><strong>發起人:</strong> {{ event.organizer }}</p>
          <p><strong>報名費:</strong> {{ event.fee }} 元</p>
          <p><strong>時段:</strong> {{ event.timeSlot }}</p>
          <p><strong>地點:</strong> {{ event.location }}</p>
          <p><strong>最大人數:</strong> {{ event.maxParticipants }}</p>
          <p><strong>活動類別:</strong> {{ event.category }}</p>
          <div class="modal-images">
            <h3>活動圖片</h3>
            <div v-for="(img, index) in event.images" :key="index" class="modal-image">
              <img :src="img" alt="活動圖片">
            </div>
          </div>
          <button @click="registerEvent" class="register-button">報名</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    event: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'register']);
  
  function closeModal() {
    emit('close');
  }
  
  function registerEvent() {
    emit('register', props.event);
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  }
  
  .modal-content {
    background: #ffffff;
    padding: 30px;
    border-radius: 15px;
    width: 90%;
    max-width: 600px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.4s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  
  .modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5em;
    color: #999;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .modal-close:hover {
    color: #333;
  }
  
  .modal-details h2 {
    color: #4b79a1;
    font-size: 1.8em;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .modal-details p {
    margin: 8px 0;
    color: #666;
    font-size: 1em;
  }
  
  .modal-images {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    justify-content: center;
  }
  
  .modal-image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
  }
  
  .modal-image img:hover {
    transform: scale(1.1);
  }
  
  .register-button {
    display: block;
    margin: 20px auto 0;
    padding: 10px 24px;
    font-size: 1em;
    font-weight: 600;
    color: #ffffff;
    background: linear-gradient(135deg, #4b79a1, #283e51);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  .register-button:hover {
    background: linear-gradient(135deg, #283e51, #4b79a1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }
  
  .register-button:active {
    transform: translateY(2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  </style>
  