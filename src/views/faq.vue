<script setup>
function printPage() {
  window.print();
}
</script>

<template>
  
  <div class="accordion-container">
    <div>
    <div class="header">
      <h2>常見問題</h2>
      <button class="print-button" @click="printPage"><i class="fa-solid fa-print"></i></button>
    </div>
    <hr>
  </div>
    <div class="accordion accordion-flush custom-accordion" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            問：如何註冊帳戶？
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">答：點擊網頁右上角的「註冊」按鈕，填寫基本資訊後，系統會發送驗證郵件至您的電子郵件地址。完成驗證後，即可成功註冊帳戶。</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            問：忘記密碼該怎麼辦？
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">答：在登入頁面點擊「忘記密碼」，輸入註冊時的電子郵件地址，我們會發送一封密碼重設的郵件給您。按照郵件指示完成密碼重設。</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            問：如何修改個人資料？
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">答：登入後，前往「個人資料」頁面，點擊「編輯」按鈕即可修改個人資訊，修改完成後請記得保存。</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingFour">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
            問：如何聯絡客服？
          </button>
        </h2>
        <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">答：您可以點擊頁面底部的「聯絡我們」連結，填寫聯絡表單，我們的客服團隊會盡快回覆您的問題。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.print-button {
  background-color: #FFDC35;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.print-button:hover {
  background-color: #FFD306;
}

.accordion-container {
  max-width: 50vw; /* 調整此數值以設定寬度 */
  margin: 0 auto; /* 將手風琴置中 */
  padding-top: 1rem;
}

.custom-accordion .accordion-button {
  background: linear-gradient(135deg, #FFDC35, #FFD306);
  color: #000000;
  font-weight: bold;
  font-size: 1.25rem; /* 約等於 h3 的大小 */
  border: none;
  border-radius: 8px;
  transition: background 0.3s, transform 0.3s;
}

.custom-accordion .accordion-button:not(.collapsed) {
  background: linear-gradient(135deg, #FFDC35, #FFD306);
  color: rgb(2, 2, 2);
  transform: scale(1.05);
}

.custom-accordion .accordion-body {
  background-color: #FFF0AC;
  color: #333;
  font-size: 1.125rem; /* 約等於 h4 的大小 */
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.custom-accordion .accordion-button::after {
  filter: brightness(0) invert(1);
}

.custom-accordion .accordion-item {
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.custom-accordion .accordion-button:hover {
  background: linear-gradient(135deg, #FFFF93, #FFFF6F);
}
</style>
