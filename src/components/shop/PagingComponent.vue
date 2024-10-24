<script setup>
    const props = defineProps({
        totalPages: Number,
        thePage: Number
    })
    const emit = defineEmits(['goPaging'])

    const clickHandler = page=>{
        //alert('click' + page)
        //觸發父組件的事件，並傳遞資料給它
        emit('goPaging', page)
    }

    const pageNumbers = computed(() => {
        const pages = [];
        const maxPages = 3; // 顯示當前頁前後最多的頁數
        const firstPage = 1;
        const lastPage = props.totalPages;

        if (props.totalPages <= 1) {
            return pages // 不顯示分頁按鈕
        }

        // 顯示 "上一頁" 按鈕
        if (props.thePage > 1) {
            pages.push({
                text: '上一頁',
                page: props.thePage - 1
            })
        }

        // 顯示第一頁和省略號
        if (props.thePage > maxPages) {
            pages.push({ text: '1', page: firstPage })
            if (props.thePage > maxPages + 1) {
                pages.push({ text: '...' })
            }
        }

        // 顯示當前頁的前後頁碼
        for (let i = Math.max(firstPage, props.thePage - maxPages); i <= Math.min(lastPage, props.thePage + maxPages); i++) {
            pages.push({
                text: `${i}`,
                page: i
            })
        }

        // 顯示最後一頁和省略號
        if (props.thePage < lastPage - maxPages) {
            if (props.thePage < lastPage - maxPages - 1) {
                pages.push({ text: '...' })
            }
            pages.push({ text: `${lastPage}`, page: lastPage })
        }

        // 顯示 "下一頁" 按鈕
        if (props.thePage < lastPage) {
            pages.push({
                text: '下一頁',
                page: props.thePage + 1
            })
        }

        return pages
})
</script>

<template>

    <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm">
            <li v-for="(page, idx) in pageNumbers" :key="idx" class="page-item" :class="{ 'disabled': page.text === '...' }">
                <a class="page-link" href="#" @click.prevent="clickHandler(page.page)" v-if="page.text !== '...'">
                {{ page.text }}
                </a>
                <span class="page-link" v-else>...</span>
            </li>
        </ul>
    </nav>
</template>

<style lang="css" scoped>
    .pagination {
        justify-content: center;
    }
    .page-link {
        cursor: pointer;
    }
</style>