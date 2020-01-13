<template>
    <div class="user">
      user
    </div>
</template>

<script>
    export default {
        name: "user",
        mounted() {
            this.Get('/api/utility/user/me', {})
                .then(response => {
                    console.log(response)
                    // window.location.href = "login.html";
                })
                // .catch((error) => {
                //     console.log(error);
                //     return false
                //     // window.location.href = "login.html";
                // })
        }
    }
</script>

<style scoped>

</style>
