<template>

<ul class="navbar" >
  <li class="subnav">
    <button class="subnavbtn">  <a :href="'/transactions'" style="color: white;">Transactions</a></button>

  </li> 
  <li class="subnav">
    <button class="subnavbtn"><a>Transactions summary</a></button>
    <div class="subnav-content">
      <router-link
            :to="{ path: '/transactions', query: { report: 'true' }}"class="subnav-link" @click="$emit('summary')">Overall summary</router-link>
            <router-link
            :to="{ path: '/transactions/ATM', query: { report: 'true' }}"class="subnav-link" @click="$emit('summary')">ATM</router-link>
            <router-link
            :to="{ path: '/transactions/byCustomers', query: { report: 'true' }}"class="subnav-link" @click="$emit('summary')">By customers</router-link>
            <router-link
            :to="{ path: '/transactions/byEmployees', query: { report: 'true' }}"class="subnav-link" @click="$emit('summary')">By employees</router-link>
            <router-link
            :to="{ path: '/transactions/online', query: { report: 'true' }}"class="subnav-link" @click="$emit('summary')">Online</router-link>
    </div>
  </li> 
  </ul>
</template>

<style scoped>
.navbar {
  background-color: green; 
  width:95%;
  margin-top:2.5vh;
  z-index:2;
  position:fixed;
  
}



 .navbar a {
  font-size: 16px;
  color: white;
  text-align: center;
  text-decoration: none;
}

.subnav {
  overflow: hidden;
  margin:0px;
}

.subnav .subnavbtn {
  font-size: 16px;  
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;

}


.subnav-content {
  display: none;
  position: absolute;
  background-color: rgb(0, 79, 135);
  min-width: 100vw;
  z-index: 3;
  padding: 5px;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top:2.5vh;
}

.subnav-content a {
  float: left;
  color: white;
  text-decoration: none;
  padding-right: 25px;
}

.subnav-content a:hover{text-decoration: underline;}

.subnav:hover .subnav-content {
  display: block;
} 

.subnav-link {  text-emphasis: none;
  text-decoration: none;
  background-color: transparent;}

ul li{display:inline;}
ul {margin:0;
padding:0;}



/*mobile*/

@media only screen and (max-width:768px) {


.navbar {
  width:70%;
}
.navbar a {font-size:12px;}
}

@media only screen and (min-width:768px) and (max-width:1280px) {


.navbar {
  width:70%;
}
.navbar a {font-size:16px;}
}

@media only screen and (min-width:1280px) {

.navbar {
  width:80%;
}
.navbar a {font-size:16px;}
}

</style>
