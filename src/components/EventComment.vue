<template>
    <div class="comment-section">
      <h2>{{ activityName }}</h2>
      <div class="user-info">
        <img :src="userAvatar" alt="User Avatar" class="user-avatar" />
        <span class="user-name">{{ userName }}</span>
      </div>
      <div class="rating-stars">
        <span
          v-for="(star, index) in 5"
          :key="index"
          class="star"
          :class="{ active: index < rating }"
          @click="setRating(index + 1)"
        >
          &#9733;
        </span>
      </div>
      <textarea
        v-model="commentContent"
        class="comment-content"
        placeholder="請描述您的經驗..."
      ></textarea>
      <input type="file" ref="fileInput" multiple @change="handleFileUpload" />
      <div class="upload-section">
        <button class="upload-button" @click="submitComment">
          <i class="fas fa-camera"></i> 上傳圖片或影片
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      activityId: {
        type: Number,
        required: true,
      },
      userId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        userName: "",
        userAvatar: "user-avatar.png",
        activityName: "",
        rating: 0,
        commentContent: "",
        uploadedFiles: [],
      };
    },
    methods: {
      setRating(value) {
        this.rating = value;
      },
      handleFileUpload(event) {
        this.uploadedFiles = Array.from(event.target.files);
      },
      async submitComment() {
        const formData = new FormData();
        formData.append("activityId", this.activityId);
        formData.append("userId", this.userId);
        formData.append("rating", this.rating);
        formData.append("commentContent", this.commentContent);
        this.uploadedFiles.forEach((file) => formData.append("images", file));
  
        try {
          const response = await fetch("/api/postComment", {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            alert("評論已成功提交");
            this.resetForm();
          } else {
            alert("提交失敗，請重試");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("提交時發生錯誤");
        }
      },
      resetForm() {
        this.rating = 0;
        this.commentContent = "";
        this.uploadedFiles = [];
        this.$refs.fileInput.value = null;
      },
    },
    async mounted() {
      const activityResponse = await fetch(`/api/getActivity/${this.activityId}`);
      const userResponse = await fetch(`/api/getUser/${this.userId}`);
      const activityData = await activityResponse.json();
      const userData = await userResponse.json();
  
      this.activityName = activityData.name;
      this.userName = userData.name;
      this.userAvatar = userData.avatar || "user-avatar.png";
    },
  };
  </script>
  
  <style scoped>
  .comment-section {
  background-color: #f9c74f; /* 淡黃色背景，與網站主色調一致 */
  color: #333; /* 深灰色文字，讓文字更易閱讀 */
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  font-family: Arial, sans-serif;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 增加陰影讓卡片更突出 */
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-weight: bold;
  color: #333; /* 深灰色文本顏色 */
}

.rating-stars {
  font-size: 1.5em;
  color: #ffb703; /* 使用黃色星星，與網站風格匹配 */
  margin: 10px 0;
}

.star {
  cursor: pointer;
  color: #ffb703;
}

.star.active {
  color: #f8961e; /* 當選中的星星變成橙色，更明顯 */
}

.comment-content {
  width: 100%;
  height: 100px;
  background-color: #fff3d1; /* 使用淺黃色背景框 */
  color: #333; /* 深灰色文字 */
  border: 1px solid #ffb703; /* 框線為黃色，與星星一致 */
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
}

.upload-section {
  text-align: center;
  margin-top: 10px;
}

.upload-button {
  background-color: #333; /* 深色按鈕，更醒目 */
  color: #f9c74f; /* 按鈕文字使用網站主色調 */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.upload-button:hover {
  background-color: #444; /* 按鈕懸停時略深的顏色 */
}

  </style>
  