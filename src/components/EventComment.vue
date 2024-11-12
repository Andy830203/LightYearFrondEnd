<template>
  <div class="comment-box">
    <h2>提交評論</h2>
    <div class="rating-stars">
      <span
        v-for="index in 5"
        :key="index"
        class="star"
        :class="{ active: index <= rating }"
        @click="setRating(index)"
      >
        &#9733;
      </span>
    </div>

    <textarea
      v-model="commentContent"
      class="comment-content"
      placeholder="請描述您的經驗..."
    ></textarea>
    <div class="submit-section">
      <button class="submit-button" @click="submitComment">
        提交評論
      </button>
      <button class="cancel-button" @click="$emit('close')">取消</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import Swal from 'sweetalert2';  // 引入 SweetAlert2

const BASE_URL = import.meta.env.VITE_API_BASEURL;

const props = defineProps({
  activityId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['close']); // 使用 defineEmits 來定義事件

const rating = ref(0);
const commentContent = ref("");

const setRating = (value) => {
  rating.value = value;
};

const submitComment = async () => {
  const memberData = JSON.parse(localStorage.getItem("member"));
  const userId = memberData && memberData.id ? memberData.id : props.userId;

  const payload = {
    e_id: props.activityId,
    m_id: userId,
    score: rating.value,
    content: commentContent.value,
  };

  console.log("Payload:", payload); // 確認 payload 格式正確

  try {
    const response = await fetch(`${BASE_URL}/Comments/postComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("BASE_URL:", BASE_URL);

    if (response.ok) {
      // 使用 SweetAlert2 顯示成功訊息
      Swal.fire({
        icon: 'success',
        title: '評論已成功提交',
        showConfirmButton: false,
        timer: 1500
      });
      emit("close"); // 使用 emit 發送 close 事件
    } else {
      const errorDetails = await response.text();
      console.error(`Error: ${response.status}, Details: ${errorDetails}`);
      // 使用 SweetAlert2 顯示錯誤訊息
      Swal.fire({
        icon: 'warning',
        title: '這個活動已評論過了喔!',
        text: errorDetails,
        confirmButtonText: '確認'
      });
    }
  } catch (error) {
    console.error("Error:", error);
    // 使用 SweetAlert2 顯示錯誤訊息
    Swal.fire({
      icon: 'error',
      title: '提交時發生錯誤',
      text: error.message,
      confirmButtonText: '確認'
    });
  }
};
</script>

<style scoped>
.comment-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rating-stars {
  font-size: 1.8em;
  color: #ffb703;
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.star {
  cursor: pointer;
  color: #c8c8c8;
  transition: color 0.3s ease, transform 0.2s ease;
}
.star:hover {
  color: #ffb703;
  transform: scale(1.3);
}
.star.active {
  color: #ffb703;
}

.comment-content {
  width: 100%;
  height: 100px;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
  resize: none;
}

.submit-section {
  display: flex;
  gap: 10px;
}

.submit-button,
.cancel-button {
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.submit-button {
  background-color: #333;
  color: #f9c74f;
}

.cancel-button {
  background-color: #e0e0e0;
  color: #333;
}
</style>
