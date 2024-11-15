// addressService.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_GM_API;
export async function getAddress(longitude, latitude) {
    try {
        // 確保經緯度是數字，並正確組合
        const lat = Number(latitude);
        const lng = Number(longitude);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
        const response = await axios.get(url);

        // 檢查 API 回傳的狀態和結果
        if (response.data.status === 'OK') {
            const address = response.data.results[0].formatted_address;
            return address;
        } else {
            console.error('Geocoding API Error:', response.data.status);
            throw new Error(`無法取得地址，API 回傳狀態: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching address:', error.message);
        throw error;
    }
}
