<template>
<div class="loginForm">
<form>
  <fieldset>
    <label>
      Username
      <input
        type="text"
        name="username"
        placeholder="Username"
      />
    </label>
    <label>
      Password
      <input
        type="text"
        name="password"
        placeholder="Password"
      />
    </label>
  </fieldset>

  <input
    type="submit"
    value="Log in"
  />
</form>
</div>
</template>

<style scoped>

.loginForm { min-height: 100vh;
  display: flex;
  align-items: center;}

  form {
  width: 50%;
  margin: 0 auto;
}

input[type="submit"] {background-color:#FA6F0E;
border:none;}
</style>