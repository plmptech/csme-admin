<template>
  <f7-view :routes="router">
    <f7-page
      infinite
      :infinite-distance="50"
      :infinite-preloader="showPreloader"
      @infinite="loadMore"
    >
      <f7-navbar :sliding="false">
        <f7-nav-left>
          <f7-link
            icon-ios="f7:menu"
            icon-aurora="f7:menu"
            icon-md="material:menu"
            panel-open="left"
          ></f7-link>
        </f7-nav-left>
        <f7-nav-title>Manage Listing</f7-nav-title>
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
            <f7-list-item v-for="item in listingslist" :key="item.id">
              <f7-list-item-cell class="item-title">{{item.name}}</f7-list-item-cell>
              <f7-list-item-cell class="item-title">{{item.purpose}}</f7-list-item-cell>
              <f7-list-item-cell class="item-title">{{item.industry}}</f7-list-item-cell>
              <f7-list-item-cell class="item-title">{{item.country}}</f7-list-item-cell>
              <f7-list-item-cell class="item-title">{{item.city}}</f7-list-item-cell>
              <f7-list-item-cell class="item-title">{{item.age}}</f7-list-item-cell>
              <f7-list-item-cell class="item-title">{{item.askingPrice}}</f7-list-item-cell>
              <f7-list-item-cell class="item-title">{{item.revenue}}</f7-list-item-cell>
              <f7-list-item-cell class="item-title">{{item.cashFlow}}</f7-list-item-cell>
              <f7-list-item-cell class="item-title">{{item.description}}</f7-list-item-cell>
              <f7-list-item-cell>
                <f7-button
                  @click="getOneUserDetails(item)"
                  popup-open=".listing-edit-popup-push"
                >Edit</f7-button>
                <f7-button @click="deleteListing(item)">Delete</f7-button>
              </f7-list-item-cell>
            </f7-list-item>
          </ul>
        </f7-list>
      </f7-list>

      <!-- Edit Popup -->
      <f7-popup class="listing-edit-popup-push" push>
        <f7-page>
          <f7-block strong>
            <div>Edit Listing</div>
          </f7-block>
          <f7-list form id="listingform">
            <!-- Add Validation -->
            <f7-list-input
              type="text"
              label="Name"
              :value="individualUser.name"
              @input="individualUser.name = $event.target.value"
              required
              validate
              :maxlength="50"
            ></f7-list-input>
            <f7-list-input
              type="text"
              label="Type"
              :value="individualUser.purpose"
              @input="individualUser.purpose = $event.target.value"
              required
              validate
            ></f7-list-input>
            <f7-list-input
              type="select"
              label="Industry"
              :value="individualUser.industry"
              @input="individualUser.industry = $event.target.value"
            >
              <option
                v-for="item in industrieslist"
                :key="item.id"
                :selected="item == individualUser.industry"
              >{{item.name}}</option>
            </f7-list-input>
            <f7-list-input
              type="select"
              label="Country"
              :value="individualUser.country"
              @input="individualUser.country = $event.target.value"
              @change="changeCountry($event)"
            >
              <option
                v-for="item in countrylist"
                :key="item.id"
                :selected="item == individualUser.countrylist"
              >{{item.name}}</option>
              <!-- <option v-for="(value, index) in countrylist" :key="index" :selected="index == individualUser.country">{{index.name}}</option> -->
            </f7-list-input>
            <f7-list-input
              type="text"
              label="City"
              :value="individualUser.city"
              @input="individualUser.city = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="number"
              label="Year(s) in Business"
              :value="individualUser.age"
              @input="individualUser.age = $event.target.value"
              required
              validate
              :min="0"
            ></f7-list-input>
            <f7-list-input
              type="number"
              label="Asking Price"
              :value="individualUser.askingPrice"
              @input="individualUser.askingPrice = $event.target.value"
              required
              validate
              :min="0"
              :max="999999999"
              :maxlength="8"
            ></f7-list-input>
            <f7-list-input
              type="number"
              label="Revenue"
              :value="individualUser.revenue"
              @input="individualUser.revenue = $event.target.value"
              required
              validate
            ></f7-list-input>
            <f7-list-input
              type="number"
              label="Cash Flow"
              :value="individualUser.cashFlow"
              @input="individualUser.cashFlow = $event.target.value"
              required
              validate
            ></f7-list-input>
            <f7-list-input
              type="text"
              label="Description"
              :value="individualUser.description"
              @input="individualUser.description = $event.target.value"
              required
              validate
              :maxlength="500"
            ></f7-list-input>
            <div class="image-preview">
              <img class="preview" v-if="!imageData.length" v-bind:src="individualUser.photo" />
            </div>
            <div class="image-preview" v-if="imageData.length > 0">
              <img class="preview" :src="imageData" />
            </div>
            <div class="file-upload-form">
              <label for="file-upload" class="custom-file-upload">
                <i class="fa fa-cloud-upload"></i> Upload Image
              </label>
              <input
                id="file-upload"
                type="file"
                class="file"
                @change="previewImage"
                accept="image/*"
              />
            </div>
            <f7-button @click="editListing()">Submit</f7-button>
            <f7-button class="link popup-close" @click="closePopUp()" href="#">Cancel</f7-button>
          </f7-list>
        </f7-page>
      </f7-popup>
    </f7-page>
  </f7-view>
</template>
<script>
import WelcomePage from '@/pages/login.vue'
import base64toblob from "base64toblob";
export default {
  data() {
    return {
      router: [
        {
          path: "/",
          component: WelcomePage
        }
      ],
      allowInfinite: true,
      showPreloader: true,
      imageData: "",
      changeCountryValue: [],
      listingslist: [],
      industrieslist: [],
      countrylist: [],
      citylist: [],
      individualUser: {},
      errors: [],
      pageDetails: 0,
      pageNumber: 1,
      token: sessionStorage.getItem("loginpage"),
      headers: [
        "Name",
        "Purpose",
        "Industry",
        "Country",
        "City",
        "Year(s) in Business",
        "Asking Price",
        "Revenue",
        "Cash Flow",
        "Description",
        ""
      ]
    };
  },
  methods: {
    // changeCountry(event) {
    //   this.changeCountryValue = event.target.value;
    //   if (this.countrylist.hasOwnProperty(this.changeCountryValue))
    //     this.citylist = this.countrylist[this.changeCountryValue];
    // },
    logout() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Logout?", () => {
        app.dialog.alert("Successfully Logged Out!");
        sessionStorage.removeItem("loginpage");
        this.$router.push("/");
      });
    },
    async getCountries(item) {
      let countries = "https://b2b2c.herokuapp.com/api/v1/countries";
      let industries = "https://b2b2c.herokuapp.com/api/v1/industries";
      const requestOne = axios.get(countries);
      const requestTwo = axios.get(industries);
      await axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            this.countrylist = responseOne.data.countries;
            this.industrieslist = responseTwo.data.industries;
            //this.citylist = this.countrylist[item.country];
            //console.log("City List: " + this.citylist);
          })
        )
        .catch(e => {
          this.errors.push(e);
        });
    },
    convertImage(item) {
      if (item.data) {
        var bytes = new Uint8Array(item.data);
        var binary = bytes.reduce(
          (data, b) => (data += String.fromCharCode(b)),
          ""
        );
        this.src = "data:image/png;base64," + btoa(binary);
        return this.src;
      } else {
        return item;
      }
    },
    previewImage(event) {
      const self = this;
      const app = self.$f7;
      // Reference to the DOM input element
      var input = event.target;
      const size = (input.files[0].size / 1024 / 1024).toFixed(2);
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        if (size < 10) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader();
          reader.readAsDataURL(input.files[0]);
          // Define a callback function to run, when FileReader finishes its job
          reader.onload = async e => {
            this.imageData = e.currentTarget.result;
            this.imageData = await this.drawImage(e.target.result);
          };
          // Start the reader job - read file as a data url (base64 format)
        } else {
          app.dialog.alert("Image Size exceeds 10MB ", "Error");
        }
      }
    },
    drawImage(imgUrl) {
      return new Promise(async function(resolve, reject) {
        // Recreate Canvas Element
        let img = new Image();
        img.onload = function() {
          let canvas = document.createElement("canvas");
          this.canvas = canvas;
          // Set Canvas Context
          let ctx = this.canvas.getContext("2d");
          // Create New Image
          // Image Size After Scaling
          let scale = 50 / 100;
          let width = 400 * scale;
          let height = 400 * scale;
          // Set Canvas Height And Width According to Image Size And Scale
          this.canvas.setAttribute("width", width);
          this.canvas.setAttribute("height", height);
          ctx.drawImage(img, 0, 0, width, height);
          // Quality Of Image
          // If all files have been proceed
          let base64 = this.canvas.toDataURL("image/jpeg", 0.5);
          resolve(base64);
        };
        img.src = imgUrl;
      });
    },
    async closePopUp() {
      this.imageData = "";
      const file = document.querySelector(".file");
      file.value = "";
      this.listingslist = [];
      const res = await axios.get(
        "https://b2b2c.herokuapp.com/api/v1/listings/search?perPage=5&page=1"
      );
      this.listingslist = res.data.listings;
    },
    async getOneUserDetails(item) {
      this.getCountries(item);
      item.photo = this.convertImage(item.photo);
      this.individualUser = item;
    },
    editListing() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      if (
        this.individualUser.name.length == 0 ||
        this.individualUser.purpose.length == 0 ||
        this.individualUser.age.length == 0 ||
        this.individualUser.askingPrice.length == 0 ||
        this.individualUser.revenue.length == 0 ||
        this.individualUser.cashFlow.length == 0 ||
        this.individualUser.description.length == 0
      ) {
        app.dialog.alert("One of the required fields is empty", "Error");
      } else if (this.individualUser.age < 0) {
        app.dialog.alert("Year(s) in business must more than 0", "Error");
      } else if (
        this.individualUser.askingPrice < 0 ||
        this.individualUser.askingPrice > 99999999
      ) {
        app.dialog.alert("Year(s) in business must be 0 - 99999999", "Error");
      } else {
        const id = this.individualUser._id;
        delete this.individualUser._id;
        this.individualUser.token = this.token;
        this.individualUser.age = parseFloat(this.individualUser.age);
        this.individualUser.askingPrice = parseFloat(
          this.individualUser.askingPrice
        );
        this.individualUser.revenue = parseFloat(this.individualUser.revenue);
        this.individualUser.cashFlow = parseFloat(this.individualUser.cashFlow);
        this.individualUser.photo = this.imageData || this.individualUser.photo;
        axios
          .put(
            "https://b2b2c.herokuapp.com/api/v1/listing/" + id,
            this.individualUser
          )
          .then(response => {
            app.dialog.alert("Successfully Updated The Listing!");
            app.popup.close();
          })
          .catch(e => {
            this.errors.push(e);
          });
      }
    },
    async deleteListing(item) {
      const id = item._id;
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Delete?", async () => {
        const rest = await axios.delete(
          `https://b2b2c.herokuapp.com/api/v1/listing/${id}?token=${this.token}`
        );
        app.dialog.alert("Successfully Delete Listing!", async () => {
          const res = await axios.get(
            "https://b2b2c.herokuapp.com/api/v1/listings/search?perPage=5&page=1"
          );
          this.listingslist = res.data.listings;
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
          `https://b2b2c.herokuapp.com/api/v1/listings/search?perPage=5&page=${this.pageNumber}`
        );
        for (let i of res.data.listings) {
          self.listingslist.push(i);
        }
        self.allowInfinite = true;
      }, 500);
    }
  },
  async created() {
    const res = await axios.get(
      "https://b2b2c.herokuapp.com/api/v1/listings/search?perPage=5&page=1"
    );
    this.listingslist = res.data.listings;
    if (res.data.totalCount == 0 || res.data.totalCount <= 5) {
      this.showPreloader = false;
      this.allowInfinite = false;
    }
    this.pageDetails = res.data.lastPage;
  }
};
</script>
<style>
.file-upload-form,
.image-preview {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 5px 5px;
}
img.preview {
  width: 250;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 5px 5px;
  cursor: pointer;
}
</style>