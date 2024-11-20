<script setup>
const props = defineProps(['Url'])
</script>

<template>
    <div>
        <div class="d-flex justify-content-center">
            <img v-if="props.Url != 'NotFound'" class="responsive-img" :src="props.Url">
            <img v-else src="/images/non-found.jpg" alt="No Found Image">
        </div>
    </div>
</template>

<style lang="css" scoped>
.responsive-img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
}
</style>