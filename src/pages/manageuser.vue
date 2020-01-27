<template>
  <f7-page
    infinite
    :infinite-distance="50"
    :infinite-preloader="showPreloader"
    @infinite="loadMore"
  >
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Manage User</f7-nav-title>
      <f7-nav-right>
        <a href @click="logout" class="link">
          <span>Logout</span>
          <i class="icon material-icons md-only">last_page</i>
        </a>
      </f7-nav-right>
    </f7-navbar>

    <f7-searchbar
      search-container=".search-list"
      search-in=".item-title"
      :disable-button="!$theme.aurora"
    ></f7-searchbar>

    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>
    <f7-list class="search-list searchbar-found">
      <f7-list class="table-header">
        <f7-list-item>
          <f7-list-item-cell v-for="(value, index) in headers" :key="index">{{ value }}</f7-list-item-cell>
        </f7-list-item>
      </f7-list>
      <f7-list class="table-body">
        <ul>
          <f7-list-item v-for="item in userlist" :key="item.id">
            <f7-list-item-cell class="item-title">{{item.email}}</f7-list-item-cell>
            <f7-list-item-cell class="item-title">{{item.name}}</f7-list-item-cell>
            <f7-list-item-cell class="item-title">{{item.phone}}</f7-list-item-cell>
            <f7-list-item-cell class="item-title">{{item.status}}</f7-list-item-cell>
            <f7-list-item-cell class="item-title">{{item.type}}</f7-list-item-cell>
            <f7-list-item-cell>
              <f7-button @click="getOneUserDetails(item)" popup-open=".edit-popup-push">Edit</f7-button>
              <f7-button @click="deleteUser(item)">Delete</f7-button>
              <f7-button @click="resetPassword(item)">Reset Password</f7-button>
            </f7-list-item-cell>
          </f7-list-item>
        </ul>
      </f7-list>
    </f7-list>
    <!-- Edit Popup -->
    <f7-popup class="edit-popup-push" push>
      <f7-page>
        <f7-block strong>
          <div>Edit User</div>
        </f7-block>
        <f7-list form>
          <!-- Add Validation -->
          <f7-list-input label="Name" :value="individualUser.name" disabled></f7-list-input>
          <f7-list-input label="Email" :value="individualUser.email" disabled></f7-list-input>
          <f7-list-input
            label="Phone"
            :value="individualUser.phone"
            @input="individualUser.phone = $event.target.value"
            disabled
          ></f7-list-input>
          <f7-list-input
            type="select"
            name="status"
            label="Status"
            :value="individualUser.status"
            @input="individualUser.status = $event.target.value"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </f7-list-input>
          <f7-list-input
            type="select"
            name="type"
            label="User Type"
            :value="individualUser.type"
            @input="individualUser.type = $event.target.value"
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </f7-list-input>
        </f7-list>
        <f7-button @click="editUser()">Submit</f7-button>
        <f7-button class="link popup-close" @click="closePopUp()" href="#">Cancel</f7-button>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      //infinite scroll
      allowInfinite: true,
      showPreloader: true,

      userlist: [],
      individualUser: [],
      errors: [],
      pageDetails: 0,
      pageNumber: 1,
      token: sessionStorage.getItem("loginpage"),
      headers: ["Email", "Name", "Phone", "Status", "Type", ""]
    };
  },
  methods: {
    async closePopUp() {
      this.userlist = [];
      const res = await axios.get(
        "https://b2b2c.herokuapp.com/api/v1/users/search?perPage=5&page=1"
      );
      this.userlist = res.data.users;
    },
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
    getOneUserDetails(item) {
      this.individualUser = item;
      console.log(this.individualUser);
    },
    editUser() {
      console.log(this.individualUser.status);
      console.log(this.individualUser.type);
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      axios
        .put(
          "https://b2b2c.herokuapp.com/api/v1/user/" + this.individualUser._id,
          {
            token: this.token,
            status: this.individualUser.status,
            type: this.individualUser.type
          }
        )
        .then(response => {
          app.dialog.alert("Successfully Updated The User!");
          app.popup.close();
          axios.get(
            "https://b2b2c.herokuapp.com/api/v1/users/search?perPage=5&page=1"
          );
          this.userlist = res.data.users;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    deleteUser(item) {
      this.individualUser = item;
      console.log(this.individualUser.status);
      console.log(this.individualUser.type);
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Delete?", () => {
        axios
          .put(
            "https://b2b2c.herokuapp.com/api/v1/user/" + this.individualUser._id,
            {
              token: this.token,
              status: "inactive",
              type: this.individualUser.type
            }
          )
          .then(response => {
            app.dialog.alert("Successfully Delete User!", async () => {
              const res = await axios.get(
                "https://b2b2c.herokuapp.com/api/v1/users/search?perPage=5&page=1"
              );
              this.userlist = res.data.users;
            });
          });
      });
    },
    resetPassword(item) {
      this.individualUser = item;
      console.log(this.individualUser.status);
      console.log(this.individualUser.type);
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Reset Password?", () => {
        axios
          .put(
            "https://b2b2c.herokuapp.com/api/v1/user/forget/",
            {
            email: this.individualUser.email
            }
          )
          .then(response => {
            app.dialog.alert("Successfully Reset Password!", async () => {
              const res = await axios.get(
                "https://b2b2c.herokuapp.com/api/v1/users/search?perPage=5&page=1"
              );
              this.userlist = res.data.users;
            });
          });
      });
    },
    async loadMore() {
      const self = this;

      if (!self.allowInfinite) return;
      self.allowInfinite = false;

      setTimeout(async () => {
        if (this.pageNumber >= this.pageDetails) {
          self.showPreloader = false;
          return;
        }
        this.pageNumber++;
        const res = await axios.get(
          `https://b2b2c.herokuapp.com/api/v1/users/search?perPage=5&page=${this.pageNumber}`
        );
       
        for (let i of res.data.users) {
          self.userlist.push(i);
        }
        self.allowInfinite = true;
      }, 1000);
    }
  },
  async created() {
    const res = await axios.get(
      "https://b2b2c.herokuapp.com/api/v1/users/search?perPage=5&page=1"
    );
    this.userlist = res.data.users;
    console.log("userlist " + res.data.totalCount);
    if (res.data.totalCount == 0 || res.data.totalCount <= 5)
        {
          console.log("inside this");
          this.showPreloader = false;
          this.allowInfinite = false;
        }
    this.pageDetails = res.data.lastPage;
  }
};
</script>