<template>
  <f7-page name="loginpage" id="loginpage">
    <div class="page no-navbar no-toolbar no-swipeback">
      <div class="page-content login-screen-content">
        <div class="login-screen-title">Login Page</div>
        <f7-list form>
          <f7-list-input
            type="email"
            name="username"
            placeholder="Your username"
            :value="username"
            @input="username = $event.target.value"
            clear-button
            required
            validate
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Your password"
            :value="password"
            @input="password = $event.target.value"
            @keyup.enter.native="signIn"
            clear-button
            required
          ></f7-list-input>
        </f7-list>
        <div class="list">
          <ul>
            <li>
              <f7-button @click="signIn">Sign In</f7-button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async signIn() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      try {
        const response = await axios.get(
          `https://b2b2c.herokuapp.com/api/v1/user/login`,
          {
            params: { email: this.username, password: this.password }
          }
        );
        if (response.data.status == "ok") {
          sessionStorage.setItem("loginpage", response.data.token);
          router.navigate("/managelisting/");
        }
        if (response.data.status == "error") {
          app.dialog.alert(response.data.message);
          this.username = "";
          this.password = "";
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  },
  // mounted() {
  //   const self = this;
  //   const app = self.$f7;
  //   const router = self.$f7router;
  //   if (sessionStorage.getItem("loginpage")) router.navigate("/managelisting/");
  // }
};
</script>