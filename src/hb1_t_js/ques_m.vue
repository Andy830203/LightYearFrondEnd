<script setup>
import '@/hb1_t_js/ques_m.css'//網站引導樣式
//16大地圖、12區、8細項
import { sideb_8, sideb_12,sideb_16 } from '@/hb1_t_js/GM_c.js';
import { triggerques_display_close } from'@/hb1_t_js/ques_m.js'
</script>

<template>
    <div v-if="sideb_8" class="ques_over_8"><!--大地圖-->
        <div class="ques_over_8_1" @click.self="triggerques_display_close">
            <div class="moving-text_8_1">
            點擊列表內可跳轉至指定縣市
            <i class="bi bi-arrow-right-circle-fill"></i>
            </div>
        </div>
        <div class="ques_over_8_2"  @click.self="triggerques_display_close">
            <div class="moving-text_8_2">
            點擊可進入指定縣市
            <i class="bi bi-arrow-right-circle-fill"></i>
            </div>
        </div>
    </div>
    <div v-else-if="sideb_12" class="ques_over_12" ><!--區-->
        <div class="ques_over_12_1" @click.self="triggerques_display_close">
            <div class="moving-text_12_1">
            點擊列表內可跳轉至指定區域
            <i class="bi bi-arrow-right-circle-fill"></i>
            </div>
        </div>
        <div class="ques_over_12_2"  @click.self="triggerques_display_close">
            <div class="moving-text_12_2">
            點擊可進入指定區域
            <i class="bi bi-arrow-right-circle-fill"></i>
            </div>
        </div>
    </div>
    <div v-else-if="sideb_16" class="ques_over_16"><!--細項-->
        <div class="ques_over_16_1" @click.self="triggerques_display_close">
            <div class="moving-text_16_1">
            點擊列表內可跳轉至指定活動
            <i class="bi bi-arrow-right-circle-fill"></i>
            </div>
        </div>
        <div class="ques_over_16_2"  @click.self="triggerques_display_close">
            <div class="moving-text_16_2">
            點擊可直接報名
            <i class="bi bi-arrow-right-circle-fill"></i>
            </div>
        </div>
        <div class="ques_over_16_3"  @click.self="triggerques_display_close">
            <div class="moving-text_16_3">
            圖示類別
            <i class="bi bi-arrow-right-circle-fill"></i>
            </div>
        </div>
        <div class="ques_over_16_4"  @click.self="triggerques_display_close">
            <div class="moving-text_16_4">
                點擊可直接新增地點
            <i class="bi bi-arrow-right-circle-fill"></i>
            </div>
        </div>
    </div>
</template>
