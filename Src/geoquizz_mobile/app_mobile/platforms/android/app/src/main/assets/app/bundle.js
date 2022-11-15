module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./app.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_rx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./vue-rx/dist/vue-rx.esm.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("nativescript-vue");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nativescript_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./nativescript-camera/camera.js");
/* harmony import */ var _nativescript_camera__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nativescript_camera__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/tns-core-modules/http/http.js");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tns_core_modules_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("tns-core-modules/http");
/* harmony import */ var tns_core_modules_http__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_http__WEBPACK_IMPORTED_MODULE_4__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





const app = __webpack_require__("tns-core-modules/application");

const platform = __webpack_require__("../node_modules/tns-core-modules/platform/platform.js");

const fs = __webpack_require__("../node_modules/tns-core-modules/file-system/file-system.js");

const imagePicker = __webpack_require__("nativescript-imagepicker");

const rxjs = __webpack_require__("rxjs");

const operators = __webpack_require__("rxjs/operators");

const bgHttp = __webpack_require__("nativescript-background-http");

nativescript_vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(_vue_rx__WEBPACK_IMPORTED_MODULE_0__["default"]); // Vue.config.silent = false; // uncomment for debugging purposes;

var options = {
  width: 300,
  height: 300,
  keepAspectRatio: true,
  saveToGallery: true
};


const geolocation = __webpack_require__("nativescript-geolocation");

const _require = __webpack_require__("tns-core-modules/ui/enums"),
      Accuracy = _require.Accuracy;

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      pictureFromCamera: null,
      textTakePicture: "Photographier",
      textSendPicture: "Envoyer la photo",
      lat: "",
      lon: "",
      speed: "",
      addr: "",
      session: bgHttp.session("image-upload"),
      currentFileNameBeingUploaded: "",
      description: "Description..."
    };
  },

  subscriptions() {
    this.event$ = new rxjs.BehaviorSubject({});
    return {
      event: this.event$,
      eventLog: this.event$.pipe(operators.sampleTime(200), operators.concatMap(value => rxjs.of(value)), operators.scan((acc, logEntry) => {
        acc.push(logEntry);
        return acc;
      }, []), // emit only logs for the this.currentFileNameBeingUploaded
      operators.map(allLogs => allLogs.filter(logEntry => !!logEntry && logEntry.eventTitle && logEntry.eventTitle.indexOf(this.currentFileNameBeingUploaded) > 0)))
    };
  },

  methods: {
    takePicture() {
      this.getGeolocalisation(); // See the options at https://github.com/NativeScript/nativescript-camera#using-the-options-to-take-memory-efficient-picture
      // for more information on how to customize the pictures you take.

      _nativescript_camera__WEBPACK_IMPORTED_MODULE_2__["takePicture"](options).then(imageAsset => {
        this.pictureFromCamera = imageAsset;
      }).catch(err => {
        console.log("Error -> " + err.message);
      });
    },

    postRequest() {
      Object(tns_core_modules_http__WEBPACK_IMPORTED_MODULE_4__["request"])({
        url: "http://e28abbe1.ngrok.io/geolocalisation/",
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        content: JSON.stringify({
          latitude: this.lat,
          longitude: this.lon,
          description: this.description
        })
      }).then(response => {
        const result = response.content.toJSON();
      }, e => {});
    },

    getGeolocalisation() {
      geolocation.getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        maximumAge: 5000,
        timeout: 20000
      }).then(res => {
        this.lat = res.latitude;
        this.lon = res.longitude;
        this.speed = res.speed; // get the address (REQUIRES YOUR OWN GOOGLE MAP API KEY!)

        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + res.latitude + "," + res.longitude + "&key=AIzaSyDwxfea8ecYMmGKMO39JF1ko5bhF4UocpM").then(response => response.json()).then(r => {
          this.addr = r.results[0].formatted_address;
        });
      });
    },

    sendPicture() {
      let context = imagePicker.create({
        mode: "single"
      });
      this.startSelection(context);
    },

    startSelection(context) {
      context.authorize().then(() => {
        return context.present();
      }).then(selection => {
        this.showWelcome = false;
        let imageAsset = selection.length > 0 ? selection[0] : null;

        if (imageAsset) {
          this.getImageFilePath(imageAsset).then(path => {
            console.log(`path: ${path}`);
            this.uploadImage(path);
          });
        }
      }).catch(function (e) {
        console.log(e);
      });
    },

    uploadImage(path) {
      let file = fs.File.fromPath(path);
      this.currentFileNameBeingUploaded = file.path.substr(file.path.lastIndexOf("/") + 1);
      let request = this.createNewRequest();
      request.description = "uploading image " + file.path;
      request.headers["File-Name"] = this.currentFileNameBeingUploaded;
      var params = [{
        name: "test",
        value: "value"
      }, {
        name: "fileToUpload",
        filename: file.path,
        mimeType: "image/jpeg"
      }];
      var task = this.session.multipartUpload(params, request);
      task.on("progress", this.onEvent.bind(this));
      task.on("error", this.onEvent.bind(this));
      task.on("responded", this.onEvent.bind(this));
      task.on("complete", this.onEvent.bind(this));
    },

    createNewRequest() {
      let url; // NOTE: using https://httpbin.org/post for testing purposes,
      // you'll need to use your own service in real - world app

      if (platform.isIOS) {
        url = "http://e28abbe1.ngrok.io/photo";
      } else {
        url = "http://e28abbe1.ngrok.io/photo";
      } //"https://httpbin.org/post"
      //"http://www.csm-testcenter.org/test"


      let request = {
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream"
        },
        description: "uploading file...",
        androidAutoDeleteAfterUpload: false,
        androidNotificationTitle: "NativeScript HTTP background"
      };
      return request;
    },

    getImageFilePath(imageAsset) {
      return new Promise(resolve => {
        if (platform.isIOS) {
          const options = PHImageRequestOptions.new();
          options.synchronous = true;
          options.version = PHImageRequestOptionsVersion.Current;
          options.deliveryMode = PHImageRequestOptionsDeliveryMode.HighQualityFormat;
          PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(imageAsset.ios, options, nsData => {
            // create file from image asset and return its path
            const tempFolderPath = fs.knownFolders.temp().getFolder("nsimagepicker").path;
            const tempFilePath = fs.path.join(tempFolderPath, Date.now() + ".jpg");
            nsData.writeToFileAtomically(tempFilePath, true);
            resolve(tempFilePath);
          });
        } else {
          // return imageAsset.android, since it 's the path of the file
          resolve(imageAsset.android);
        }
      });
    },

    onEvent(e) {
      let eventEntry = {
        eventTitle: e.eventName + " " + e.object.description,
        eventData: {
          error: e.error ? e.error.toString() : e.error,
          currentBytes: e.currentBytes,
          totalBytes: e.totalBytes,
          body: e.data // raw: JSON.stringify(e) // uncomment for debugging purposes

        }
      };
      this.getGeolocalisation();

      if (e.eventName == "complete") {
        this.postRequest();
        this.description = "Description...";
        alert("Photo, description, et géolocalisation envoyées. Merci.");
      }

      this.event$.next(eventEntry);
    }

  }
});

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.page[data-v-763db97b] {\n    background: white;\n}\n", ""]);

// exports

    const application = __webpack_require__("tns-core-modules/application");
    __webpack_require__("tns-core-modules/ui/styling/style-scope");

    exports.forEach(cssExport => {
        if (cssExport.length > 1 && cssExport[1]) {
            // applying the second item of the export as it contains the css contents
            application.addCss(cssExport[1]);
        }
    });
    ;
    if (false) {}


/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    { staticClass: "page" },
    [
      _c("ActionBar", {
        staticClass: "action-bar",
        attrs: { title: "GeoQuizz Photographe" }
      }),
      _c(
        "StackLayout",
        [
          _c("Button", {
            staticClass: "btn btn-primary",
            attrs: { text: _vm.textTakePicture, marginTop: "20" },
            on: { tap: _vm.takePicture }
          }),
          _c("Button", {
            staticClass: "btn btn-primary",
            attrs: { text: _vm.textSendPicture, marginTop: "0" },
            on: {
              tap: function($event) {
                _vm.sendPicture($event)
              }
            }
          }),
          _c("TextField", {
            attrs: { text: _vm.description },
            on: {
              textChange: function($event) {
                _vm.description = $event.value
              }
            }
          }),
          _c("Image", { attrs: { src: _vm.pictureFromCamera } })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$";

/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__("../node_modules/css-loader/index.js?!../node_modules/nativescript-theme-core/css/core.dark.css"), "");

// module
exports.push([module.i, "/*\nIn NativeScript, the app.css file is where you place CSS rules that\nyou would like to apply to your entire application. Check out\nhttp://docs.nativescript.org/ui/styling for a full list of the CSS\nselectors and properties you can use to style UI components.\n\n/*\nIn many cases you may want to use the NativeScript core theme instead\nof writing your own CSS rules. For a full list of class names in the theme\nrefer to http://docs.nativescript.org/ui/theme.\nThe imported CSS rules must precede all other types of rules.\n*/\n", ""]);

// exports
;
    if (false) {}


/***/ }),

/***/ "./app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("nativescript-vue");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_HelloWorld__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/HelloWorld.vue");

        let applicationCheckPlatform = __webpack_require__("tns-core-modules/application");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("tns-core-modules/ui/frame");
__webpack_require__("tns-core-modules/ui/frame/activity");
        }

        
            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (false) {}
        
            const context = __webpack_require__("./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$");
            global.registerWebpackModules(context);
            
        __webpack_require__("tns-core-modules/bundle-entry-points");
        
 // Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  render: h => h('frame', [h(_components_HelloWorld__WEBPACK_IMPORTED_MODULE_1__["default"])])
}).$start();
    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/HelloWorld.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&");
/* harmony import */ var _HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/HelloWorld.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _HelloWorld_vue_vue_type_custom_index_0_blockType_Button_text_Button_40tap_onButtonTap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./components/HelloWorld.vue?vue&type=custom&index=0&blockType=Button&text=Button&%40tap=onButtonTap");
/* harmony import */ var _HelloWorld_vue_vue_type_custom_index_0_blockType_Button_text_Button_40tap_onButtonTap__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_HelloWorld_vue_vue_type_custom_index_0_blockType_Button_text_Button_40tap_onButtonTap__WEBPACK_IMPORTED_MODULE_4__);
!(function webpackMissingModule() { var e = new Error("Cannot find module 'https://play.nativescript.org/dist/assets/img/NativeScript_logo.png?vue&type=custom&index=1&blockType=Image&issuerPath=%2Fhome%2Fmichael%2FDocuments%2Fcours%2FIUT%2Fcours_atelier2%2Fgeoquizz%2Fapp_mobile%2Fapp%2Fcomponents%2FHelloWorld.vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "763db97b",
  null
  
)

/* custom blocks */

if (typeof _HelloWorld_vue_vue_type_custom_index_0_blockType_Button_text_Button_40tap_onButtonTap__WEBPACK_IMPORTED_MODULE_4___default.a === 'function') _HelloWorld_vue_vue_type_custom_index_0_blockType_Button_text_Button_40tap_onButtonTap__WEBPACK_IMPORTED_MODULE_4___default()(component)

if (typeof !(function webpackMissingModule() { var e = new Error("Cannot find module 'https://play.nativescript.org/dist/assets/img/NativeScript_logo.png?vue&type=custom&index=1&blockType=Image&issuerPath=%2Fhome%2Fmichael%2FDocuments%2Fcours%2FIUT%2Fcours_atelier2%2Fgeoquizz%2Fapp_mobile%2Fapp%2Fcomponents%2FHelloWorld.vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) === 'function') !(function webpackMissingModule() { var e = new Error("Cannot find module 'https://play.nativescript.org/dist/assets/img/NativeScript_logo.png?vue&type=custom&index=1&blockType=Image&issuerPath=%2Fhome%2Fmichael%2FDocuments%2Fcours%2FIUT%2Fcours_atelier2%2Fgeoquizz%2Fapp_mobile%2Fapp%2Fcomponents%2FHelloWorld.vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/HelloWorld.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=custom&index=0&blockType=Button&text=Button&%40tap=onButtonTap":
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./nativescript-camera/camera.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var applicationModule = __webpack_require__("tns-core-modules/application/application");

var imageAssetModule = __webpack_require__("tns-core-modules/image-asset/image-asset");

var trace = __webpack_require__("tns-core-modules/trace/trace");

var platform = __webpack_require__("tns-core-modules/platform/platform");

var REQUEST_IMAGE_CAPTURE = 3453;
var REQUEST_REQUIRED_PERMISSIONS = 1234;

exports.takePicture = function (options) {
  return new Promise(function (resolve, reject) {
    try {
      if (android.support.v4.content.ContextCompat.checkSelfPermission(applicationModule.android.currentContext, android.Manifest.permission.CAMERA) !== android.content.pm.PackageManager.PERMISSION_GRANTED) {
        reject(new Error("Application does not have permissions to use Camera"));
        return;
      }

      var types = __webpack_require__("tns-core-modules/utils/types");

      var utils = __webpack_require__("tns-core-modules/utils/utils");

      var saveToGallery_1;
      var reqWidth_1;
      var reqHeight_1;
      var shouldKeepAspectRatio_1;
      var density = utils.layout.getDisplayDensity();

      if (options) {
        saveToGallery_1 = options.saveToGallery ? true : false;
        reqWidth_1 = options.width ? options.width * density : 0;
        reqHeight_1 = options.height ? options.height * density : reqWidth_1;
        shouldKeepAspectRatio_1 = types.isNullOrUndefined(options.keepAspectRatio) ? true : options.keepAspectRatio;
      }

      if (android.support.v4.content.ContextCompat.checkSelfPermission(applicationModule.android.currentContext, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) !== android.content.pm.PackageManager.PERMISSION_GRANTED) {
        saveToGallery_1 = false;
      }

      var takePictureIntent = new android.content.Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
      var dateStamp = createDateTimeStamp();
      var picturePath_1;
      var nativeFile = void 0;
      var tempPictureUri = void 0;

      if (saveToGallery_1) {
        picturePath_1 = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DCIM).getAbsolutePath() + "/Camera/" + "NSIMG_" + dateStamp + ".jpg";
        nativeFile = new java.io.File(picturePath_1);
      } else {
        picturePath_1 = utils.ad.getApplicationContext().getExternalFilesDir(null).getAbsolutePath() + "/" + "NSIMG_" + dateStamp + ".jpg";
        nativeFile = new java.io.File(picturePath_1);
      }

      var sdkVersionInt = parseInt(platform.device.sdkVersion);

      if (sdkVersionInt >= 21) {
        tempPictureUri = android.support.v4.content.FileProvider.getUriForFile(applicationModule.android.currentContext, applicationModule.android.nativeApp.getPackageName() + ".provider", nativeFile);
      } else {
        tempPictureUri = android.net.Uri.fromFile(nativeFile);
      }

      takePictureIntent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, tempPictureUri);

      if (options && options.cameraFacing === "front") {
        takePictureIntent.putExtra("android.intent.extras.CAMERA_FACING", android.hardware.Camera.CameraInfo.CAMERA_FACING_FRONT);
      }

      if (takePictureIntent.resolveActivity(utils.ad.getApplicationContext().getPackageManager()) != null) {
        var appModule_1 = __webpack_require__("tns-core-modules/application"); // remove existing listeners if any


        appModule_1.android.off("activityResult");
        appModule_1.android.on("activityResult", function (args) {
          var requestCode = args.requestCode;
          var resultCode = args.resultCode;

          if (requestCode === REQUEST_IMAGE_CAPTURE && resultCode === android.app.Activity.RESULT_OK) {
            if (saveToGallery_1) {
              try {
                var callback = new android.media.MediaScannerConnection.OnScanCompletedListener({
                  onScanCompleted: function onScanCompleted(path, uri) {
                    if (trace.isEnabled()) {
                      trace.write("image from path " + path + " has been successfully scanned!", trace.categories.Debug);
                    }
                  }
                });
                android.media.MediaScannerConnection.scanFile(appModule_1.android.context, [picturePath_1], null, callback);
              } catch (ex) {
                if (trace.isEnabled()) {
                  trace.write("An error occurred while scanning file " + picturePath_1 + ": " + ex.message + "!", trace.categories.Debug);
                }
              }
            }

            var exif = new android.media.ExifInterface(picturePath_1);
            var orientation_1 = exif.getAttributeInt(android.media.ExifInterface.TAG_ORIENTATION, android.media.ExifInterface.ORIENTATION_NORMAL);

            if (orientation_1 === android.media.ExifInterface.ORIENTATION_ROTATE_90) {
              rotateBitmap(picturePath_1, 90);
            } else if (orientation_1 === android.media.ExifInterface.ORIENTATION_ROTATE_180) {
              rotateBitmap(picturePath_1, 180);
            } else if (orientation_1 === android.media.ExifInterface.ORIENTATION_ROTATE_270) {
              rotateBitmap(picturePath_1, 270);
            }

            var asset = new imageAssetModule.ImageAsset(picturePath_1);
            asset.options = {
              width: reqWidth_1,
              height: reqHeight_1,
              keepAspectRatio: shouldKeepAspectRatio_1
            };
            resolve(asset);
          } else if (resultCode === android.app.Activity.RESULT_CANCELED) {
            // User cancelled the image capture
            reject(new Error("cancelled"));
          }
        });
        appModule_1.android.foregroundActivity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
      }
    } catch (e) {
      if (reject) {
        reject(e);
      }
    }
  });
};

exports.isAvailable = function () {
  var utils = __webpack_require__("tns-core-modules/utils/utils");

  return utils.ad.getApplicationContext().getPackageManager().hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA);
};

exports.requestPermissions = function () {
  if (android.support.v4.content.ContextCompat.checkSelfPermission(applicationModule.android.currentContext, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) !== android.content.pm.PackageManager.PERMISSION_GRANTED || android.support.v4.content.ContextCompat.checkSelfPermission(applicationModule.android.currentContext, android.Manifest.permission.CAMERA) !== android.content.pm.PackageManager.PERMISSION_GRANTED) {
    android.support.v4.app.ActivityCompat.requestPermissions(applicationModule.android.currentContext, [android.Manifest.permission.CAMERA, android.Manifest.permission.WRITE_EXTERNAL_STORAGE], REQUEST_REQUIRED_PERMISSIONS);
  }
};

var createDateTimeStamp = function createDateTimeStamp() {
  var result = "";
  var date = new Date();
  result = date.getFullYear().toString() + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + (date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString()) + "_" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
  return result;
};

var rotateBitmap = function rotateBitmap(picturePath, angle) {
  try {
    var matrix = new android.graphics.Matrix();
    matrix.postRotate(angle);
    var bmOptions = new android.graphics.BitmapFactory.Options();
    var oldBitmap = android.graphics.BitmapFactory.decodeFile(picturePath, bmOptions);
    var finalBitmap = android.graphics.Bitmap.createBitmap(oldBitmap, 0, 0, oldBitmap.getWidth(), oldBitmap.getHeight(), matrix, true);
    var out = new java.io.FileOutputStream(picturePath);
    finalBitmap.compress(android.graphics.Bitmap.CompressFormat.JPEG, 100, out);
    out.flush();
    out.close();
  } catch (ex) {
    if (trace.isEnabled()) {
      trace.write("An error occurred while rotating file " + picturePath + " (using the original one): " + ex.message + "!", trace.categories.Debug);
    }
  }
};

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = {"android":{"v8Flags":"--expose_gc","forceLog":true},"main":"app.js","name":"tns-template-vue","version":"3.2.0"};

/***/ }),

/***/ "./vue-rx/dist/vue-rx.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__);


var Vue$1;

var warn = function warn() {}; // NOTE(benlesh): the value of this method seems dubious now, but I'm not sure
// if this is a Vue convention I'm just not familiar with. Perhaps it would
// be better to just import and use Vue directly?


function install(_Vue) {
  Vue$1 = _Vue;
  warn = Vue$1.util.warn || warn;
} // TODO(benlesh): as time passes, this should be updated to use RxJS 6.1's
// `isObservable` method. But wait until you're ready to drop support for Rx 5


function isObservable(ob) {
  return ob && typeof ob.subscribe === 'function';
}

function isObserver(subject) {
  return subject && typeof subject.next === 'function';
}

function defineReactive(vm, key, val) {
  if (key in vm) {
    vm[key] = val;
  } else {
    Vue$1.util.defineReactive(vm, key, val);
  }
}

function getKey(binding) {
  return [binding.arg].concat(Object.keys(binding.modifiers)).join(':');
}

var rxMixin = {
  created: function created() {
    var vm = this;
    var domStreams = vm.$options.domStreams;

    if (domStreams) {
      domStreams.forEach(function (key) {
        vm[key] = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
      });
    }

    var observableMethods = vm.$options.observableMethods;

    if (observableMethods) {
      if (Array.isArray(observableMethods)) {
        observableMethods.forEach(function (methodName) {
          vm[methodName + '$'] = vm.$createObservableMethod(methodName);
        });
      } else {
        Object.keys(observableMethods).forEach(function (methodName) {
          vm[observableMethods[methodName]] = vm.$createObservableMethod(methodName);
        });
      }
    }

    var obs = vm.$options.subscriptions;

    if (typeof obs === 'function') {
      obs = obs.call(vm);
    }

    if (obs) {
      vm.$observables = {};
      vm._subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
      Object.keys(obs).forEach(function (key) {
        defineReactive(vm, key, undefined);
        var ob = vm.$observables[key] = obs[key];

        if (!isObservable(ob)) {
          warn('Invalid Observable found in subscriptions option with key "' + key + '".', vm);
          return;
        }

        vm._subscription.add(obs[key].subscribe(function (value) {
          vm[key] = value;
        }, function (error) {
          throw error;
        }));
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
};
var streamDirective = {
  // Example ./example/counter_dir.html
  bind: function bind(el, binding, vnode) {
    var handle = binding.value;
    var event = binding.arg;
    var streamName = binding.expression;
    var modifiers = binding.modifiers;

    if (isObserver(handle)) {
      handle = {
        subject: handle
      };
    } else if (!handle || !isObserver(handle.subject)) {
      warn('Invalid Subject found in directive with key "' + streamName + '".' + streamName + ' should be an instance of Subject or have the ' + 'type { subject: Subject, data: any }.', vnode.context);
      return;
    }

    var modifiersFuncs = {
      stop: function stop(e) {
        return e.stopPropagation();
      },
      prevent: function prevent(e) {
        return e.preventDefault();
      }
    };
    var modifiersExists = Object.keys(modifiersFuncs).filter(function (key) {
      return modifiers[key];
    });
    var subject = handle.subject;
    var next = (subject.next || subject.onNext).bind(subject);

    if (!modifiers.native && vnode.componentInstance) {
      handle.subscription = vnode.componentInstance.$eventToObservable(event).subscribe(function (e) {
        modifiersExists.forEach(function (mod) {
          return modifiersFuncs[mod](e);
        });
        next({
          event: e,
          data: handle.data
        });
      });
    } else {
      var fromEventArgs = handle.options ? [el, event, handle.options] : [el, event];
      handle.subscription = rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"].apply(void 0, fromEventArgs).subscribe(function (e) {
        modifiersExists.forEach(function (mod) {
          return modifiersFuncs[mod](e);
        });
        next({
          event: e,
          data: handle.data
        });
      }) // store handle on element with a unique key for identifying
      // multiple v-stream directives on the same node
      ;
      (el._rxHandles || (el._rxHandles = {}))[getKey(binding)] = handle;
    }
  },
  update: function update(el, binding) {
    var handle = binding.value;

    var _handle = el._rxHandles && el._rxHandles[getKey(binding)];

    if (_handle && handle && isObserver(handle.subject)) {
      _handle.data = handle.data;
    }
  },
  unbind: function unbind(el, binding) {
    var key = getKey(binding);
    var handle = el._rxHandles && el._rxHandles[key];

    if (handle) {
      if (handle.subscription) {
        handle.subscription.unsubscribe();
      }

      el._rxHandles[key] = null;
    }
  }
};

function watchAsObservable(expOrFn, options) {
  var vm = this;
  var obs$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
    var _unwatch;

    var watch = function watch() {
      _unwatch = vm.$watch(expOrFn, function (newValue, oldValue) {
        observer.next({
          oldValue: oldValue,
          newValue: newValue
        });
      }, options);
    }; // if $watchAsObservable is called inside the subscriptions function,
    // because data hasn't been observed yet, the watcher will not work.
    // in that case, wait until created hook to watch.


    if (vm._data) {
      watch();
    } else {
      vm.$once('hook:created', watch);
    } // Returns function which disconnects the $watch expression


    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"](function () {
      _unwatch && _unwatch();
    });
  });
  return obs$;
}

function fromDOMEvent(selector, event) {
  if (typeof window === 'undefined') {
    // TODO(benlesh): I'm not sure if this is really what you want here,
    // but it's equivalent to what you were doing. You might want EMPTY
    return rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"];
  }

  var vm = this;
  var doc = document.documentElement;
  var obs$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
    function listener(e) {
      if (!vm.$el) {
        return;
      }

      if (selector === null && vm.$el === e.target) {
        return observer.next(e);
      }

      var els = vm.$el.querySelectorAll(selector);
      var el = e.target;

      for (var i = 0, len = els.length; i < len; i++) {
        if (els[i] === el) {
          return observer.next(e);
        }
      }
    }

    doc.addEventListener(event, listener); // Returns function which disconnects the $watch expression

    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"](function () {
      doc.removeEventListener(event, listener);
    });
  });
  return obs$;
}

function subscribeTo(observable, next, error, complete) {
  var subscription = observable.subscribe(next, error, complete);
  (this._subscription || (this._subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]())).add(subscription);
  return subscription;
}
/**
 * @see {@link https://vuejs.org/v2/api/#vm-on}
 * @param {String||Array} evtName Event name
 * @return {Observable} Event stream
 */


function eventToObservable(evtName) {
  var vm = this;
  var evtNames = Array.isArray(evtName) ? evtName : [evtName];
  var obs$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
    var eventPairs = evtNames.map(function (name) {
      var callback = function callback(msg) {
        return observer.next({
          name: name,
          msg: msg
        });
      };

      vm.$on(name, callback);
      return {
        name: name,
        callback: callback
      };
    });
    return function () {
      // Only remove the specific callback
      eventPairs.forEach(function (pair) {
        return vm.$off(pair.name, pair.callback);
      });
    };
  });
  return obs$;
}
/**
 * @name Vue.prototype.$createObservableMethod
 * @description Creates an observable from a given function name.
 * @param {String} methodName Function name
 * @param {Boolean} [passContext] Append the call context at the end of emit data?
 * @return {Observable} Hot stream
 */


function createObservableMethod(methodName, passContext) {
  var vm = this;

  if (vm[methodName] !== undefined) {
    warn('Potential bug: ' + "Method " + methodName + " already defined on vm and has been overwritten by $createObservableMethod." + String(vm[methodName]), vm);
  }

  var creator = function creator(observer) {
    vm[methodName] = function () {
      var args = Array.from(arguments);

      if (passContext) {
        args.push(this);
        observer.next(args);
      } else {
        if (args.length <= 1) {
          observer.next(args[0]);
        } else {
          observer.next(args);
        }
      }
    };

    return function () {
      delete vm[methodName];
    };
  }; // Must be a hot stream otherwise function context may overwrite over and over again


  return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](creator).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
}
/* global Vue */


function VueRx(Vue) {
  install(Vue);
  Vue.mixin(rxMixin);
  Vue.directive('stream', streamDirective);
  Vue.prototype.$watchAsObservable = watchAsObservable;
  Vue.prototype.$fromDOMEvent = fromDOMEvent;
  Vue.prototype.$subscribeTo = subscribeTo;
  Vue.prototype.$eventToObservable = eventToObservable;
  Vue.prototype.$createObservableMethod = createObservableMethod;
} // auto install


if (typeof Vue !== 'undefined') {
  Vue.use(VueRx);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRx);

/***/ }),

/***/ "nativescript-background-http":
/***/ (function(module, exports) {

module.exports = require("nativescript-background-http");

/***/ }),

/***/ "nativescript-geolocation":
/***/ (function(module, exports) {

module.exports = require("nativescript-geolocation");

/***/ }),

/***/ "nativescript-imagepicker":
/***/ (function(module, exports) {

module.exports = require("nativescript-imagepicker");

/***/ }),

/***/ "nativescript-vue":
/***/ (function(module, exports) {

module.exports = require("nativescript-vue");

/***/ }),

/***/ "rxjs":
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "tns-core-modules/application":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/application");

/***/ }),

/***/ "tns-core-modules/application/application":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/application/application");

/***/ }),

/***/ "tns-core-modules/bundle-entry-points":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/bundle-entry-points");

/***/ }),

/***/ "tns-core-modules/debugger/devtools-elements.js":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/debugger/devtools-elements.js");

/***/ }),

/***/ "tns-core-modules/http":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/http");

/***/ }),

/***/ "tns-core-modules/image-asset/image-asset":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/image-asset/image-asset");

/***/ }),

/***/ "tns-core-modules/platform/platform":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/platform/platform");

/***/ }),

/***/ "tns-core-modules/trace/trace":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/trace/trace");

/***/ }),

/***/ "tns-core-modules/ui/enums":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/enums");

/***/ }),

/***/ "tns-core-modules/ui/frame":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame");

/***/ }),

/***/ "tns-core-modules/ui/frame/activity":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame/activity");

/***/ }),

/***/ "tns-core-modules/ui/styling/style-scope":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/styling/style-scope");

/***/ }),

/***/ "tns-core-modules/utils/types":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/utils/types");

/***/ }),

/***/ "tns-core-modules/utils/utils":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/utils/utils");

/***/ })

/******/ });