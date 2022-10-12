// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/main.js":[function(require,module,exports) {
var inputValue;
var openMNB = document.querySelector(".btn_open-nav");
var closeMNB = document.querySelector(".btn_close-nav");
var navList = document.querySelector(".sidebar");
var outside = document.querySelector(".navigation-lists");
openMNB.addEventListener("click", function (e) {
  e.preventDefault();
  navList.classList.add("mobile_navigation");
  closeMNB.classList.remove("hidden");
  openMNB.classList.add("hidden");
}); // outside.addEventListener("click", function (e) {
//   e.preventDefault();
//   navList.classList.remove("mobile_navigation");
//   openMNB.classList.remove("hidden");
//   closeMNB.classList.add("hidden");
// });

closeMNB.addEventListener("click", function (e) {
  e.preventDefault();
  navList.classList.remove("mobile_navigation");
  openMNB.classList.remove("hidden");
  closeMNB.classList.add("hidden");
});
var blasts = document.querySelectorAll(".blast");
var blastsHome = [];
var blastsAbout = [];
var blastsContact = [];
var blastsMySkills = [];
var blastsWork = []; ///////smoooth scrolling
////////////////////

var links = document.querySelectorAll(".lists_link");
links.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    var id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth"
    });
  });
}); //
/////

blasts.forEach(function (blast) {
  if (blast.closest(".section-home")) {
    return blastsHome.push(blast);
  }

  if (blast.closest(".section-contact")) {
    return blastsContact.push(blast);
  }

  if (blast.closest(".section-my-skills")) return blastsMySkills.push(blast);
  if (blast.closest(".section-work")) return blastsWork.push(blast);else return blastsAbout.push(blast);
});

var addAnimationClassList = function addAnimationClassList(blast) {
  blast.classList.add("animation");
  blast.addEventListener("animationend", function () {
    blast.classList.remove("animation");
  });
};

var animationFunc = function animationFunc(ob) {
  ob.forEach(function (blast, i) {
    var timeaut = setTimeout(function () {
      addAnimationClassList(blast);
    }, i * 130);
  });
};

blasts.forEach(function (blast) {
  blast.addEventListener("mouseover", function () {
    addAnimationClassList(blast);
  });
});
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("section-home")) {
        entry.target.classList.add("animation-observer");
        animationFunc(blastsHome);
        observer.unobserve(entry.target);
      }

      if (entry.target.classList.contains("blast-child-about")) {
        entry.target.classList.add("animation-blast-child-about");
        animationFunc(blastsAbout);
        observer.unobserve(entry.target);
      }

      if (entry.target.classList.contains("section-my-skills")) {
        animationFunc(blastsMySkills);
        entry.target.classList.add("animation-observer-2-rows");
        observer.unobserve(entry.target);
      }

      if (entry.target.classList.contains("blast-child-work")) {
        entry.target.classList.add("animation-blast-child-about");
        animationFunc(blastsWork);
        observer.unobserve(entry.target);
      }

      if (entry.target.classList.contains("blast-child-contact")) {
        animationFunc(blastsContact);
        entry.target.classList.add("animation-blast-child-contact");
        observer.unobserve(entry.target);
      }
    }
  });
});
observer.observe(document.querySelector(".section-home"));
observer.observe(document.querySelector(".blast-child-about"));
observer.observe(document.querySelector(".section-my-skills"));
observer.observe(document.querySelector(".blast-child-work"));
observer.observe(document.querySelector(".blast-child-contact")); /////////////////////////////////
///////border botom animation

var animationHelper = document.querySelectorAll(".animation_helper");
var inputField = document.querySelectorAll(".input__field");

var isEmpty = function isEmpty(str) {
  return !str.trim().length;
};

var clearAnimation = function clearAnimation() {
  animationHelper.forEach(function (el) {
    el.classList.remove("border__bottom-animation");
  });
};

var clearAllAnimation = function clearAllAnimation() {
  animationHelper.forEach(function (el) {
    el.classList.remove("border__bottom-animation");
    el.classList.remove("border__bottom-animation-red");
  });
};

var data;
inputField.forEach(function (el) {
  inputValue;
  el.addEventListener("focus", function (e) {
    e.preventDefault();
    clearAnimation();
    data = e.path[1].children[1];
    inputValue = e.path[0];
    data.classList.remove("border__bottom-animation-red");
    data.classList.add("border__bottom-animation");
  });
  el.addEventListener("blur", function (e) {
    e.preventDefault();
    inputValue = e.path[0];
    checkInputField(inputValue);
  });
}); ///////////////////////////////////
//////send message

var checkInputField = function checkInputField() {
  var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (inputValue.getAttribute("type") === "email" && !inputValue.value.match(mailFormat)) {
    {
      inputValue.nextElementSibling.classList.add("border__bottom-animation-red");
      return false;
    }
  }

  if (isEmpty(inputValue.value) === true) {
    inputValue.nextElementSibling.classList.add("border__bottom-animation-red");
    return false;
  }
};

var checkBeforeSend = function checkBeforeSend() {
  var dataErr = [];
  inputField.forEach(function (el) {
    inputValue = el;
    checkInputField(inputValue);

    if (checkInputField() === false) {
      dataErr.push(false);
    }
  });
  if (dataErr.length === 0) sendEmail();
};

var send = document.querySelector(".btn__send-msg");
send.addEventListener("click", function (e) {
  e.preventDefault();
  checkBeforeSend();
});

var sendEmail = function sendEmail() {
  Email.send({
    SecureToken: "1953283e-c992-44d1-a1a4-19d8c53b1bda",
    To: "djolek91@gmail.com",
    From: "djolek91@gmail.com",
    Subject: document.getElementsByName("subject")[0].value,
    Body: "Name" + document.getElementsByName("name")[0].value + "<br> Email: " + document.getElementsByName("email")[0].value + "<br> Message: " + document.getElementsByName("msg")[0].value
  }).then(function () {
    alert("Message Sent Succesfully");
    document.querySelector(".contact-form").reset();
    clearAllAnimation();
  });
};

var map = L.map("map").setView([50.11116033059521, 8.621453205796017], 12);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); // var myIcon = new L.icon({
//   iconUrl: "/logo.png",
//   iconSize: [38, 95],
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76],
//    shadowUrl: "/src/img/logo.png",
//   shadowSize: [68, 95],
//   shadowAnchor: [22, 94],
// });

L.marker([44.8571126, 17.5214822]).addTo(map); //L.marker([44.8571126, 17.5214822]).addTo(map).bindPopup("dsajdj").openPopup;
//L.marker([44.8571126, 17.5214822], { icon: myIcon }).addTo(map);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60920" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/main.js"], null)
//# sourceMappingURL=/main.c48f6146.js.map