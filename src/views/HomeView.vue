
<template>
  <div class="home bg-light">
    <img alt="Vue logo" src="">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  <footer class="bg-success mt-5">
    <img src="../assets/unc.png" alt="unclogo">
  </footer>
  </div>
</template>
<style>
.unclogo{
  max-width: 120px;
}
</style>












<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style>
#body{
    margin: 0;
    background-color: rgb(242, 242, 242);
    font-family: 'public sans';
    padding: 0;
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
}

.container{
    position: absolute;
    left: 10em;
    top: 5em;
    background: rgb(245, 245, 245);
    box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 0;
}

.title{
    color: #2C5F66;
    text-align: center;
}

#container1{
    position: absolute;
    left: 20em;
}

input{
border: none;
outline: none;
background: rgb(245, 245, 245);
}

label{
    position: relative;
    left: 10em;
}
#unc{
 
    width: 30em;
    position: absolute;
    left: 40em;
    z-index: -1;
    margin: 1em 0 0 0;
   
}

#button1{
    border: none;
    background-color: #2C5F66;
    color: white;
}

#button2{
    border: none;
    background-color: #DDC77A;
    color: #2C5F66;
}
button:hover{
    box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.5);
}

#footer{
    position: relative;
    top:35em;
    background-color: #2C5F66;
    margin: 0;
    height: 4em;
    z-index: 1;
}

#unc2{
    position: relative;
    width: 12em;
    z-index: 10;
}
</style>
