<template>
<f7-view main :push-state="true">
  <f7-page>
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Add User</f7-nav-title>
      <f7-nav-right>
        <a href @click="logout" class="link">
          <span>Logout</span>
          <i class="icon material-icons md-only">last_page</i>
        </a>
      </f7-nav-right>
    </f7-navbar>
    <f7-list no-hairlines-md>
      <f7-list-input
        outline
        label="Name"
        floating-label
        type="text"
        name="name"
        placeholder="Your Name"
        :value="name"
        @input="name = $event.target.value"
        required
        validate
        clear-button
      >
        <f7-icon f7="person_crop_rectangle" size="36px" slot="media"></f7-icon>
      </f7-list-input>
      <f7-list-input
        outline
        label="Phone"
        floating-label
        type="tel"
        name="phone"
        placeholder="Your Phone Number"
        :value="phone"
        @input="phone = $event.target.value"
        required
        validate
        clear-button
      >
        <f7-icon f7="person_crop_rectangle" size="36px" slot="media"></f7-icon>
      </f7-list-input>
      <f7-list-input
        outline
        label="E-mail"
        floating-label
        type="email"
        name="username"
        placeholder="Your E-mail"
        :value="username"
        @input="username = $event.target.value"
        required
        validate
        clear-button
      >
        <f7-icon f7="person_crop_rectangle" size="36px" slot="media"></f7-icon>
      </f7-list-input>
      <f7-list-input
        outline
        label="Password"
        floating-label
        type="password"
        name="password"
        placeholder="Your Password"
        :value="password"
        @input="password = $event.target.value"
        @keyup.enter.native="addUser"
        required
        validate
        clear-button
      >
        <f7-icon f7="person_crop_rectangle" size="36px" slot="media"></f7-icon>
      </f7-list-input>
      <f7-list-input
        outline
        label="Confirm Password"
        floating-label
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        :value="confirm"
        @input="confirm = $event.target.value"
        @keyup.enter.native="addUser"
        required
        validate
        clear-button
      >
        <f7-icon f7="person_crop_rectangle" size="36px" slot="media"></f7-icon>
      </f7-list-input>
      <div class="list">
        <ul>
          <li>
            <f7-button @click="addUser">Create User</f7-button>
          </li>
        </ul>
      </div>
    </f7-list>
  </f7-page>
</f7-view>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      confirm: "",
      name: "",
      phone: "",
      token: sessionStorage.getItem("loginpage")
    };
  },
  methods: {
    logout() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Logout?", function() {
        app.dialog.alert("Successfully Logged Out!");
        sessionStorage.removeItem("loginpage");
        router.navigate("/main/");
      });
    },
    async addUser() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      if (
        this.name.length == 0 ||
        this.phone.length == 0 ||
        this.username.length == 0 ||
        this.password.length == 0 ||
        this.confirm.length == 0
      ) {
        app.dialog.alert("One of the required fields is empty", "Error");
      } else if (this.password != this.confirm) {
        app.dialog.alert("Password does not match", "Error");
      } else {
        try {
          const response = await axios.post(
            `https://b2b2c.herokuapp.com/api/v1/user/register`,
            {
              email: this.username,
              name: this.name,
              phone: this.phone,
              password: this.password,
              confirm: this.confirm
            }
          );
          if (response.data.status == "ok") {
            app.dialog.alert("Successfully Created User", "Success!");
            router.navigate("/manageuser/");
          }
          if (response.data.status == "error") {
            app.dialog.alert(response.data.message);
            this.username = "";
            this.name = "";
            this.phone = "";
            this.password = "";
            this.confirm = "";
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    }
  }
};
</script>