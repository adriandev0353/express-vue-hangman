<template>
    <div class="Profile">
        <h1>{{ user }}</h1>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user: localStorage['user']
        }
    }
}
</script>