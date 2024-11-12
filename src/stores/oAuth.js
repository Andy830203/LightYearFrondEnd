// src/stores/oauth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { GoogleLogin } from 'vue3-google-login';
const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
};

export const useOAuthStore = defineStore('oauth', () => {
    const BASE_URL = import.meta.env.VITE_API_BASEURL;
    const oAuthGoogle = ref(null)
    const jwt = ref(null);
    const callback = async (response) => {
        if (response.credential) {
            jwt.value = response.credential;
            const GoAuthGoogleJWT = decodeJWT(jwt.value);
            oAuthGoogle.value = {
                GoogleEmail: GoAuthGoogleJWT.email,
                GoogleName: GoAuthGoogleJWT.name,
            }
            await oAuthGooglelogin();
        }
    };
    const oAuthGooglelogin = async () => {
        try {
            const response = await fetch(`${BASE_URL}/Members/Register`, {
                method: 'POST',
                body: JSON.stringify({
                    Name: oAuthGoogle.value.GoogleName,
                    Email: oAuthGoogle.value.GoogleEmail,
                    Password: oAuthGoogle.value.GoogleEmail,
                }),
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            });

            if (response.ok) {
                alert('快速註冊成功，請盡快至設定更新個人資訊喔');
            }
            else {
                alert('註冊失敗')
            }
        } catch (error) {
            console.error("註冊時發生錯誤", error);
        }
    };
    return {
        callback
    };
});