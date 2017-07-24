<template>
<div>
  <div class="column is-full">
    <pre>{{list2String}}</pre>
  </div>
  <div class="columns is-multiline field">
    <div class="column is-full">
      <div class="field">
        <div class = "control">
          <label><input type="checkbox" class="checkbox" v-model="editable">Enable drag and drop</label>
        </div>
        <button type="button" class="button" @click="orderList">Sort by original order</button>
      </div>
    </div>

    <div class="column is-three-quarters">
      <draggable class="list-group columns is-multiline" element="ul" v-model="schema2.fields" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <li class="list-group-item column is-12" v-for="element in schema2.fields" :key="element.id">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <a class="delete is-small"></a>
                  {{element.type}}
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <i class="fa fa-gears"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
               <vue-form-generator :schema="{fields:[element]}" :model="model" :options="formOptions"></vue-form-generator>
              </div>
            </div>
            <div class="card-content card-settings ">
              <div class="content">
                {{ m = getAttrModel(element) }}
                <vue-form-generator :schema="getAttrSchema(element, m)" :model="m" :options="formOptions"></vue-form-generator>
              </div>
            </div>
            <footer class="card-footer toggle">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
        </li>

      </draggable>

    </div>

    <div class="column is-one-quarter">
      <draggable class="list-group" element="span" v-model="schema.fields" :options="dragOptions2" :move="onMove">
        <li class="list-group-item card" v-for="element in schema.fields" :key="element.id">
            <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
            {{element.type}}
        </li>
      </draggable>
    </div>

  </div>
</div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import draggable from 'vuedraggable'
const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sorbs' ]
export default {
  name: 'hello',
  components: {
    draggable,
    "vue-form-generator": VueFormGenerator.component
  },
  created() {
    console.log("INITIAL", this.model);
  },
  data() {
    return {
      newId: 1,
      model: {
        id: this.newId,
        status: true,
        name: "josh"
      },
      schema: {
        fields: [{
          type: "checkbox",
          label: "Status",
          model: "status",
          default: true,
          validator: VueFormGenerator.validators.required,
          get: function(model){ return model; },
          set: function(model){ return model; }
        },{
          type: "checklist",
          label: "Roles",
          model: "roles",
          listBox: true,
          values: [
            {value: "admin", name: "Administrator"},
            {value: "moderator", name: "Moderator"},
            {value: "user", name: "Registered User"},
            {value: "visitor", name: "Visitor"}
          ],
          validator: VueFormGenerator.validators.required,
          get: function(model){ return model; },
          set: function(model){ return model; }
        },{
          type: "radios",
          label: "Choose you product color",
          model: "color",
          values: [
            {name: "Deep Pink", value:"#FF1493"},
            {name: "Peach Puff", value:"#FFDAB9"},
            {name: "Dark Orange", value:"#FF8C00"},
            {name: "Light Green", value:"#90EE90"}
          ],
          validator: VueFormGenerator.validators.required,
          get: function(model){ return model; },
          set: function(model){ return model; }
        },{
          type: "select",
          label: "Language",
          model: "lang",
          required: true,
          values: function() {
            return [
              { id: "en-GB", name: "English (GB)" },
              { id: "en-US", name: "English (US)" },
              { id: "de", name: "German" },
              { id: "it", name: "Italic" },
              { id: "fr", name: "French" }
            ]
          },
          default: "en-US",
          validator: VueFormGenerator.validators.required,
          get: function(model){ return model; },
          set: function(model){ return model; }
        },{

          // value: "",
          // type: "input",
          // inputType: "text",
          // autocomplete: false,
          // label: "Name",
          // model: "name",
          // maxlength: 50,
          // required: true,
          // pattern: "",
          // placeholder: "User's full name",
          // readonly: false,
          // size: 20,
          // validator: this.getValidators("input", "text"),
          // options: {"inputType": ["hidden", "search", "url", "telephone", "email", "password", "number"]},
          // buttons: this.getButtons(),
          // get: function(model){ return model; },
          // set: function(model){ return model; }
          type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					inputName: "name",
					readonly: false,
					featured: true,
					required: true,
					disabled: false,
					placeholder: "User's name",
        },{
          type: "label",
          label: "Created",
          model: "created",
          get: function(model){ return model; },
          set: function(model){ return model; }
        },{
          type: "textArea",
          label: "Biography",
          model: "bio",
          hint: "Max 500 characters",
          max: 500,
          placeholder: "User's biography",
          rows: 4,
          validator: VueFormGenerator.validators.string
        }]
      },
      schema2: {
         fields: [{
          type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					inputName: "name",
					readonly: false,
					featured: true,
					required: true,
					disabled: false,
					placeholder: "User's name",
         },
        //  {
        //   id: "submit",
				// 	type: "submit",
				// 	label: "",
				// 	buttonText: "Submit",
				// 	validateBeforeSubmit: true
				// }
        ]
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: false
      },
      list2:[],
      editable:true,
      isDragging: false,
      delayedDragging:false
    }
  },
  methods:{
    orderList () {
      this.schema = this.schema.sort((one,two) =>{return one.order-two.order; })
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    getId(){
      if(typeof this.newId !== 'undefined'){
        this.newId = this.newId + 1;
        return this.newId
      }
      ;
    },
    getAttrModel(attr){
      //console.log(attr);
      return ({
          id: 0,
          status: true,
          submit: "asdf",
          name: "john"
      })
    },
    getAttrSchema(attr, model){
      //console.log(attr);
      let schema = {fields:[]};
      console.log("MODEL", model)
      // for (var [mk, mv] of Object.entries(attr)) {
      //   console.log("MODEL KEY Value")
      //   console.log(mk + ' ' + mv); // "a 5", "b 7", "c 9"
      // }
      for (var [key, value] of Object.entries(attr)) {
        // console.log("ATTR KEY Value")
        // console.log(key + ' ' + value); // "a 5", "b 7", "c 9"
        schema.fields.push(
          {
            type: "input",
            inputType: "text",
            label: key,
            model: "name",
            maxlength: 50,
            required: true,
            placeholder: "User's full name",
          }
        );
      }
      return schema;
    },
    getButtons(){
      return (
        [
          {
            classes: "btn-location",
            label: "Current location",
            onclick: function(model) {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                  model.address.geo = {
                    lat: pos.coords.latitude.toFixed(5),
                    lng: pos.coords.longitude.toFixed(5)
                  };
                });
              } else {
                alert("Geolocation is not supported by this browser.");
              }
            }
          },
          {
            classes: "btn-clear",
            label: "Clear",
            onclick: function(model, field) {
              model.address.geo = {
                lat: 0,
                lng: 0
              };
            }
          }
        ]
      )
    },
    getValidators(field, fieldType=null){
      console.log(field, ":", fieldType);
      switch(field){
        case "input":
          return VueFormGenerator.validators.string
        default:
          return
      }
    },
    getAttributes(option){
      console.log(option);
      switch(option){
        case "search":
          return {
            //"accept":"file_extension|audio/*|video/*|image/*|media_type"
            "dirname":"string",
            "list":[]
          }
        default:
          return {}
      }
    }
  },
  computed: {
    // id: function () {
    //   return this.id
    // },
    dragOptions () {
      return  {
        animation: 0,
        group: {
          name: 'description',
          pull: true,
          put: true
        },
        disabled: !this.editable,
        ghostClass: 'ghost'
      };
    },
    dragOptions2 () {
      return  {
        animation: 0,
        group: {
          name: 'description',
          pull: 'clone',
          put: false
        },
        disabled: !this.editable,
        ghostClass: 'ghost'
      };
    },
    listString(){
      return JSON.stringify(this.schema, null, 2);
    },
    list2String(){
      return JSON.stringify(this.schema2, null, 2);
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue){
        this.delayedDragging= true
        return
      }
      this.$nextTick( () =>{
           this.delayedDragging =false
      })
    }
  }
}
</script>


<style lang="sass">
.toggle
  display: none;

li.card
  list-style: none;
  padding: 5px;
  margin-bottom: 5px;
</style>