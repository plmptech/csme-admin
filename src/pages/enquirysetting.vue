 <template>
  <f7-page name="form">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Enquiry Settings</f7-nav-title>
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
        label="Enquiry Message"
        floating-label
        type="text"
        :value="enquirylist.enquiryMessage"
        @input="enquirylist.enquiryMessage = $event.target.value"
        required
        validate
        :maxlength="50"
        clear-button
      >
        <f7-icon f7="alarm" size="36px" slot="media"></f7-icon>
      </f7-list-input>
    </f7-list>
    <f7-button @click="updateMessage()">Update</f7-button>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      enquirylist: [],
      errors: [],
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
    updateMessage() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Update Enquiry Message?", () => {
        axios
          .post("https://b2b2c.herokuapp.com/api/v1/setting", {
            enquiryMessage: this.enquirylist.enquiryMessage,
            token: this.token
          })
          .then(response => {
            app.dialog.alert("Successfully Updated!");
          });
      });
    }
  },
  async mounted() {
    const res = await axios.get(
      `https://b2b2c.herokuapp.com/api/v1/setting?token=${this.token}`
    );
    this.enquirylist = res.data.s;
  }
};
</script>  