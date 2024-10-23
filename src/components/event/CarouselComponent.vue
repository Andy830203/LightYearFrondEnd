<script setup>
import { defineComponent, ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const currentSlide = ref(0)

const slideTo = (val) => {
    currentSlide.value = val
}
</script>

<template>
    <div>
        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
            <Slide v-for="slide in 10" :key="slide">
                <div class="carousel__item">{{ slide }}</div>
            </Slide>
        </Carousel>

        <Carousel id="thumbnails" :items-to-show="4" :wrap-around="true" v-model="currentSlide" ref="carousel">
            <Slide v-for="slide in 10" :key="slide">
                <div class="carousel__item" @click="slideTo(slide - 1)">{{ slide }}</div>
            </Slide>
        </Carousel>
    </div>
</template>

<style lang="css" scoped>
.carousel__item {
    min-height: 200px;
    /* height: 50%; */
    width: 100%;
    /* background-color: var(--vp-c-green); */
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>