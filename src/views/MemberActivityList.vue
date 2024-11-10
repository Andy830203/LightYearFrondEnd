<template>
    <div class="activity-list">
      <h2>我參加過的活動</h2>
      <div class="activity-card" v-for="activity in activities" :key="activity.activityId">
        <h3>{{ activity.eventName }}</h3>
        <p>{{ activity.eventDescription }}</p>
        <button @click="openCommentBox(activity.eventId, activity.eventName)" class="comment-button">
          撰寫評論
        </button>
      </div>
  
      <!-- 評論框彈窗 -->
      <EventComment
        v-if="showCommentBox"
        :activityId="selectedActivityId"
        :userId="userId"
        :eventName="selectedActivityName"
        @close="closeCommentBox"
        @submitted="handleCommentSubmitted"
      />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import EventComment from '@/components/EventComment.vue';
  
  export default {
    components: {
      EventComment,
    },
    setup() {
      const activities = ref([]);
      const showCommentBox = ref(false);
      const selectedActivityId = ref(null);
      const selectedActivityName = ref("");
  
      const BASE_URL = import.meta.env.VITE_API_BASEURL;
  
      const userId = ref(null);
      const loadUserId = () => {
        const memberData = JSON.parse(localStorage.getItem('member'));
        userId.value = memberData ? memberData.id : null;
  
        if (!userId.value) {
          console.error("無法取得使用者 ID");
        }
      };
  
      const loadActivities = async () => {
        if (!userId.value) return;
  
        try {
          const response = await fetch(`${BASE_URL}/Members/${userId.value}/activities`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
          });
          if (response.ok) {
            activities.value = await response.json();
          } else {
            console.error("無法載入活動清單：", response.statusText);
          }
        } catch (error) {
          console.error("無法載入活動清單：", error);
        }
      };
  
      const openCommentBox = (activityId, eventName) => {
        selectedActivityId.value = activityId;
        selectedActivityName.value = eventName;
        showCommentBox.value = true;
      };
  
      const closeCommentBox = () => {
        showCommentBox.value = false;
      };
  
      const handleCommentSubmitted = () => {
        alert("評論已成功提交！");
        closeCommentBox();
      };
  
      onMounted(() => {
        loadUserId();
        loadActivities();
      });
  
      return {
        activities,
        showCommentBox,
        selectedActivityId,
        selectedActivityName,
        openCommentBox,
        closeCommentBox,
        handleCommentSubmitted,
        userId,
      };
    },
  };
  </script>
  
  <style scoped>
  .activity-list {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h2 {
    font-size: 1.8em;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
    font-weight: bold;
  }
  
  .activity-card {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    padding: 20px;
    margin-bottom: 15px;
    width: 100%;
    max-width: 500px;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .activity-card:hover {
    transform: scale(1.02);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  .activity-card h3 {
    font-size: 1.4em;
    color: #007acc;
    margin-bottom: 10px;
  }
  
  .activity-card p {
    color: #666;
    font-size: 1em;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .comment-button {
    background-color: #007acc;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  
  .comment-button:hover {
    background-color: #005f99;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .comment-button:active {
    background-color: #004a73;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  