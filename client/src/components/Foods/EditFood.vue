<template>
  <div>
    <h1>Edit Food</h1>
    <form v-on:submit.prevent="editFood">
      <p>ชิ่ออาหาร: <input type="text" v-model="food.foodname" /></p>
      <p>สูตรอาหาร: <input type="text" v-model="food.receipt" /></p>
      <p>คำอธิบาย: <input type="text" v-model="food.description" /></p>
      <p>ประเภทอาหาร: <input type="text" v-model="food.category" /></p>
      <p>
        <button type="submit">update food</button>
        <button v-on:click="navigateTo('/foods')">กลับ</button>
      </p>
    </form>
  </div>
</template>
<script>
import FoodsService from "@/services/FoodsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";
export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      // uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      food: {
        foodname: "",
        thumbnail: "null",
        pictures: "null",
        content: "null",
        receipt: "",
        description: "",
        category: "",
      },
      config: {
        toolbar: [
          {
            name: "document",
            items: [
              "Source",
              "-",
              "Save",
              "NewPage",
              "Preview",
              "Print",
              "-",
              "Templates"
            ]
          },
          {
            name: "clipboard",
            items: [
              "Cut",
              "Copy",
              "Paste",
              "PasteText",
              "PasteFromWord",
              "-",
              "Undo",
              "Redo"
            ]
          },
          {
            name: "editing",
            items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
          },
          {
            name: "forms",
            items: [
              "Form",
              "Checkbox",
              "Radio",
              "TextField",
              "Textarea",
              "Select",
              "Button",
              "ImageButton",
              "HiddenField"
            ]
          },
          "/",
          {
            name: "basicstyles",
            items: [
              "Bold",
              "Italic",
              "Underline",
              "Strike",
              "Subscript",
              "Superscript",
              "-",
              "CopyFormatting",
              "RemoveFormat"
            ]
          },
          {
            name: "paragraph",
            items: [
              "NumberedList",
              "BulletedList",
              "-",
              "Outdent",
              "Indent",
              "-",
              "Blockquote",
              "CreateDiv",
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock",
              "-",
              "BidiLtr",
              "BidiRtl",
              "Language"
            ]
          },
          { name: "links", items: ["Link", "Unlink", "Anchor"] },
          {
            name: "insert",
            items: [
              "Image",
              "Flash",
              "Table",
              "HorizontalRule",
              "Smiley",
              "SpecialChar",
              "PageBreak",
              "Iframe",
              "InsertPre"
            ]
          },
          "/",
          { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
          { name: "colors", items: ["TextColor", "BGColor"] },
          { name: "tools", items: ["Maximize", "ShowBlocks"] },
          { name: "about", items: ["About"] }
        ],
        height: 300
      }
    };
  },
  methods: {
    async editFood() {
      try {
        await FoodsService.put(this.food);
        this.$router.push({
          name: "foods"
        });
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return x => {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      // reset form to initial state
      // this.currentStatus = STATUS_INITIAL;
      // this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      // upload data to the server
      try {
        // this.currentStatus = STATUS_SAVING;
        // await UploadService.upload(formData);
        // this.currentStatus = STATUS_SUCCESS;

        // update image uploaded display
        let pictureJSON = [];
        this.uploadedFileNames.forEach(uploadFilename => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename
            };
            this.pictures.push(pictureJSON);
          }
        });

        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      // save it
      this.save(formData);
    },
    clearUploadResult: function() {
      setTimeout(() => this.reset(), 5000);
    },
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name
        };
        await UploadService.delete(dataJSON);
        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },
    useThumbnail(filename) {
      console.log(filename);
      this.food.thumbnail = filename;
    }
  },
  async created() {
    this.reset();
    try {
      let foodId = this.$route.params.foodId;
      this.food = (await FoodsService.show(foodId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  components: {
    VueCkeditor
  }
};
</script>
<style scoped>
	
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki; /* when mouse over to the drop zone, change color
    */
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
.thumbnail-pic img {
  width: 200px;
}
</style>
