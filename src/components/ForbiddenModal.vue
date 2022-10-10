<template>
  <div class="top-0 left-0 right-0 bottom-0 bg-slate-400/[0.7] z-10 fixed">
        <div
            class="card w-96 h-[50%] bg-base-100 shadow-xl border-2 my-3 fixed z-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
            <div class="card-body justify-between">
                <div class="flex justify-center text-3xl">Forbidden</div>
                <button class="btn bg-red-300 hover:bg-slate-300 hover:text-black duration-300 text-white" @click="$emit('closeModal')">X</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>