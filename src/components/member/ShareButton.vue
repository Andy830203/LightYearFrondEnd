<!-- ShareButton.vue -->
<template>
  <button class="btn">
    Share
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20px" width="20px">
      <path
        stroke-linecap="round"
        stroke-width="2"
        stroke="#000000"
        d="M15.2141 7.39294L8.68387 10.6581M8.68387 10.6581C8.19134 9.67492 7.17449 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C7.17449 15 8.19134 14.3251 8.68387 13.3419M8.68387 10.6581C8.88616 11.0619 9 11.5176 9 12C9 12.4824 8.88616 12.9381 8.68387 13.3419M15.2141 16.6071L8.68387 13.3419M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z"
      ></path>
    </svg>

    <ul class="socials">
      <!-- Facebook Icon -->
      <li>
        <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_PAGE_URL" target="_blank" aria-label="Share on Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" height="20px" width="20px">
            <circle fill="url(#paint0_linear_87_7208)" r="14" cy="16" cx="16"></circle>
            <path fill="white" d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z"></path>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" y2="29.917" x2="16" y1="2" x1="16" id="paint0_linear_87_7208">
                <stop stop-color="#18ACFE"></stop>
                <stop stop-color="#0163E0" offset="1"></stop>
              </linearGradient>
            </defs>
          </svg>
        </a>
      </li>

      <!-- Instagram Icon -->
      <li>
        <a href="https://www.instagram.com/" target="_blank" aria-label="Open Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" height="20px" width="20px">
            <rect fill="url(#paint0_radial_87_7153)" rx="6" height="28" width="28" y="2" x="2"></rect>
            <path fill="white" d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"></path>
            <path fill="white" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"></path>
            <defs>
              <radialGradient gradientUnits="userSpaceOnUse" r="1" cy="0" cx="0" id="paint0_radial_87_7153">
                <stop stop-color="#B13589"></stop>
                <stop stop-color="#C62F94" offset="0.79309"></stop>
                <stop stop-color="#8A3AC8" offset="1"></stop>
              </radialGradient>
            </defs>
          </svg>
        </a>
      </li>
    </ul>
  </button>
</template>

<style scoped>
/* From Uiverse.io by boryanakrasteva */
.btn {
  width: 130px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  border: 1px solid black;
}

.btn,
.socials {
  border-radius: 20px;
  background-color: transparent;
  filter: drop-shadow(1px 1px 3px rgba(122, 122, 122, 0.808));
}

.socials {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  list-style: none;
  top: 0;
  left: 0;
  transition: 0.2s linear;
  opacity: 0;
  visibility: hidden;
}

.btn:hover > .socials {
  opacity: 1;
  visibility: visible;
  top: -120%;
}
</style>
