<template>
  <div class="container" :style="{'backgroundImage':'url('+imagUrl+')','backgroundSize':'cover', 'backgroundRepeat': 'no-repeat'}">
    <div>欢迎来到宠物相亲网</div>
  </div>
</template>

<script>
export default {
  name:'home',
  data(){
    return{
      timer:null,
      imagUrl:require('../assets/animal/1.jpg'),
    }
  },
  mounted(){
    this.setTimer()
  },
  destroyed(){
    this.clear()
  },
  methods:{
    clear(){
      clearInterval(this.timer)
      this.timer=null
    },
    setTimer(){
      let index=1;
      this.timer = setInterval(()=>{
        index = index<3?index+1:1
        console.log("定时器开始"+index);
        this.imagUrl=require(`../assets/animal/${index}.jpg`)
      },3000)
    }
  }

}
</script>

<style scoped>
.container{
  text-align: center;
  font-size: 40px;
  color: #00BFFF;
  margin-top: 10px;
  width: 100%;
  height: 620px;
}
</style>