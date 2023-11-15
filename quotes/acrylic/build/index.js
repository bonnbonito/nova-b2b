/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/Acrylic.js":
/*!********************************!*\
  !*** ./src/scripts/Acrylic.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AcrylicContext: () => (/* binding */ AcrylicContext),
/* harmony export */   "default": () => (/* binding */ Accrylic)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sidebar */ "./src/scripts/Sidebar.js");
/* harmony import */ var _Signage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Signage */ "./src/scripts/Signage.js");
/* harmony import */ var _svg_Icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./svg/Icons */ "./src/scripts/svg/Icons.js");






const AcrylicContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const AcrylicOptions = AcrylicQuote.quote_options;
function Accrylic() {
  const [signage, setSignage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const savedStorage = localStorage.getItem('acrylicStorage');
    if (savedStorage) {
      setSignage(JSON.parse(savedStorage));
    } else {
      setSignage([{
        id: (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])(),
        type: 'letters',
        title: 'LETTERS 1',
        letters: '',
        comments: '',
        font: '',
        mounting: AcrylicOptions.mounting_options[0].mounting_option,
        waterproof: AcrylicOptions.waterproof_options[0].option,
        thickness: AcrylicOptions.acrylic_thickness_options[0],
        color: {
          name: '',
          color: ''
        },
        letterHeight: 1,
        usdPrice: 0,
        cadPrice: 0,
        file: '',
        finishing: AcrylicOptions.finishing_options[0].name
      }]);
    }
  }, []);
  const defaultArgs = {
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])(),
    comments: '',
    mounting: AcrylicOptions.mounting_options[0].mounting_option,
    thickness: AcrylicOptions.acrylic_thickness_options[0],
    waterproof: AcrylicOptions.waterproof_options[0].option,
    finishing: AcrylicOptions.finishing_options[0].name,
    usdPrice: 0,
    cadPrice: 0,
    file: ''
  };
  function addSignage(type) {
    setSignage(prevSignage => {
      // Count how many signages of this type already exist
      const count = prevSignage.filter(sign => sign.type === type).length;
      let args;
      // Create new signage with incremented title number
      if (type === 'letters') {
        args = {
          type: type,
          title: `${type} ${count + 1}`,
          letters: '',
          comments: '',
          font: '',
          mounting: AcrylicOptions.mounting_options[0].mounting_option,
          waterproof: AcrylicOptions.waterproof_options[0].option,
          thickness: AcrylicOptions.acrylic_thickness_options[0],
          thickness_options: AcrylicOptions.acrylic_thickness_options,
          color: {
            name: '',
            color: ''
          },
          letterHeight: 1
        };
      } else {
        args = {
          type: type,
          title: `${type} ${count + 1}`,
          width: 1,
          height: 1
        };
      }
      const newSignage = {
        ...defaultArgs,
        ...args
      };

      // Append the new signage to the array
      return [...prevSignage, newSignage];
    });
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    localStorage.setItem('acrylicStorage', JSON.stringify(signage));
  }, [signage]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AcrylicContext.Provider, {
    value: {
      signage,
      setSignage,
      addSignage
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "md:flex gap-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "md:w-3/4 w-full"
  }, signage.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Signage__WEBPACK_IMPORTED_MODULE_3__["default"], {
    index: index,
    id: item.id,
    item: item
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white",
    onClick: () => addSignage('letters'),
    style: {
      border: '1px solid #d2d2d2d2'
    }
  }, "ADD LETTERS", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_Icons__WEBPACK_IMPORTED_MODULE_4__.PlusIcon, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white",
    onClick: () => addSignage('logo'),
    style: {
      border: '1px solid #d2d2d2d2'
    }
  }, "ADD LOGO", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_Icons__WEBPACK_IMPORTED_MODULE_4__.PlusIcon, null)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sidebar__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
}

/***/ }),

/***/ "./src/scripts/Dropdown.js":
/*!*********************************!*\
  !*** ./src/scripts/Dropdown.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dropdown)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function Dropdown({
  title,
  onChange,
  options,
  value,
  style
}) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "px-[1px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "uppercase font-title text-sm tracking-[1.4px] px-2"
  }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    style: style,
    className: "border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]",
    onChange: onChange,
    value: value || ''
  }, options));
}

/***/ }),

/***/ "./src/scripts/FontsDropdown.js":
/*!**************************************!*\
  !*** ./src/scripts/FontsDropdown.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FontsDropdown)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_ClickOutside__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/ClickOutside */ "./src/scripts/utils/ClickOutside.js");



function FontsDropdown({
  font,
  handleSelectFont
}) {
  const [openFont, setOpenFont] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const fontRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,_utils_ClickOutside__WEBPACK_IMPORTED_MODULE_2__["default"])(fontRef, () => {
    setOpenFont(false);
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "px-[1px] relative",
    ref: fontRef
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "uppercase font-title text-sm tracking-[1.4px] px-2"
  }, "FONT"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer",
    onClick: () => setOpenFont(prev => !prev),
    style: {
      fontFamily: font
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "truncate"
  }, font === '' ? 'SELECT FONT' : font)), openFont && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: ""
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    class: "p-2 pb-0"
  }, "Popular Fonts"), AcrylicQuote.quote_options.fonts.popular_fonts.split(',').map(popularfont => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm ${popularfont === font && 'bg-slate-200'}`,
      style: {
        fontFamily: popularfont
      },
      onClick: () => {
        handleSelectFont(popularfont);
        setOpenFont(false);
      }
    }, "- ", popularfont);
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    class: "p-2 pb-0"
  }, "Fonts"), AcrylicQuote.quote_options.fonts.fonts.split(',').map(regFont => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm ${regFont === font && 'bg-slate-200'}`,
      style: {
        fontFamily: regFont
      },
      onClick: () => {
        handleSelectFont(regFont);
        setOpenFont(false);
      }
    }, "- ", regFont);
  }))));
}

/***/ }),

/***/ "./src/scripts/Letters.js":
/*!********************************!*\
  !*** ./src/scripts/Letters.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Letters)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Acrylic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Acrylic */ "./src/scripts/Acrylic.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Dropdown */ "./src/scripts/Dropdown.js");
/* harmony import */ var _FontsDropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FontsDropdown */ "./src/scripts/FontsDropdown.js");
/* harmony import */ var _UploadFile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UploadFile */ "./src/scripts/UploadFile.js");
/* harmony import */ var _utils_ClickOutside__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/ClickOutside */ "./src/scripts/utils/ClickOutside.js");
/* harmony import */ var _utils_ConvertJson__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/ConvertJson */ "./src/scripts/utils/ConvertJson.js");








const AcrylicOptions = AcrylicQuote.quote_options;
//const AcrylicLetterPricing = JSON.parse(AcrylicOptions.letter_x_logo_pricing);

function Letters({
  item
}) {
  const {
    signage,
    setSignage
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Acrylic__WEBPACK_IMPORTED_MODULE_2__.AcrylicContext);
  const [letters, setLetters] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.letters);
  const [comments, setComments] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.comments);
  const [font, setFont] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.font);
  const [color, setColor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.color);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [openColor, setOpenColor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [waterproof, setWaterproof] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.waterproof);
  const [selectedThickness, setSelectedThickness] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.thickness);
  const thicknessOptions = AcrylicOptions.acrylic_thickness_options;
  const [fileUrl, setFileUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.file);
  const [letterHeightOptions, setLetterHeightOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [selectedFinishing, setSelectedFinishing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.finishing);
  const [selectedLetterHeight, setSelectedLetterHeight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.letterHeight);
  const [usdPrice, setUsdPrice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.usdPrice);
  const [mountingOptions, setMountingOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(AcrylicOptions.mounting_options);
  const [lettersHeight, setLettersHeight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(AcrylicOptions.letters_height);
  const [selectedMounting, setSelectedMounting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.mounting);
  const colorRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const colorOptions = AcrylicOptions.colors;
  const finishingOptions = AcrylicOptions.finishing_options;
  const letterPricing = AcrylicOptions.letter_height_x_logo_pricing.length > 0 ? (0,_utils_ConvertJson__WEBPACK_IMPORTED_MODULE_7__["default"])(AcrylicOptions.letter_height_x_logo_pricing) : [];
  let perLetterPrice = 0;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    console.log('Attempting to preload fonts...');
    async function preloadFonts() {
      try {
        await loadingFonts();
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    preloadFonts();
  }, []);
  const loadingFonts = async () => {
    const loadPromises = AcrylicQuote.fonts.map(font => loadFont(font));
    await Promise.all(loadPromises);
  };
  async function loadFont({
    name,
    src
  }) {
    const fontFace = new FontFace(name, `url(${src})`);
    try {
      await fontFace.load();
      document.fonts.add(fontFace);
    } catch (e) {
      console.error(`Font ${name} failed to load`);
    }
  }
  const headlineRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const adjustFontSize = () => {
    const container = headlineRef.current.parentNode;
    const headline = headlineRef.current;

    // Reset the font-size to the maximum desired font-size
    headline.style.fontSize = '96px';

    // Check if the headline is wider than its container
    while (headline.scrollWidth > container.offsetWidth && parseFloat(window.getComputedStyle(headline).fontSize) > 0) {
      // Reduce the font-size by 1px until it fits
      headline.style.fontSize = `${parseFloat(window.getComputedStyle(headline).fontSize) - 1}px`;
    }
  };
  function updateSignage() {
    const updatedSignage = signage.map(sign => {
      if (sign.id === item.id) {
        return {
          ...sign,
          letters: letters,
          comments: comments,
          font: font,
          thickness: selectedThickness,
          mounting: selectedMounting,
          waterproof: waterproof,
          color: color,
          letterHeight: selectedLetterHeight,
          usdPrice: usdPrice,
          file: fileUrl,
          finishing: selectedFinishing
        };
      } else {
        return sign;
      }
    });
    setSignage(() => updatedSignage);
  }
  const handleOnChangeLetters = e => setLetters(() => e.target.value);
  const handleComments = e => setComments(e.target.value);
  const handleSelectFont = value => setFont(value);
  const handleonChangeMount = e => setSelectedMounting(e.target.value);
  const handleOnChangeWaterproof = e => setWaterproof(e.target.value);
  const handleOnChangeThickness = e => {
    const target = e.target.value;
    const selected = thicknessOptions.filter(option => option.value === target);
    console.log(selected[0]);
    setSelectedThickness(() => selected[0]);
    target > 9 ? setSelectedLetterHeight(2) : setSelectedLetterHeight(1);
  };
  const handleOnChangeLetterHeight = e => {
    setSelectedLetterHeight(e.target.value);
  };
  const handleChangeFinishing = e => {
    setSelectedFinishing(e.target.value);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Log to ensure we're getting the expected value

    let newMountingOptions;
    if (selectedThickness.value === '3') {
      if (selectedMounting === 'Flush stud') {
        setSelectedMounting(() => AcrylicOptions.mounting_options[0].mounting_option);
      }
      newMountingOptions = AcrylicOptions.mounting_options.filter(option => option.mounting_option !== 'Flush stud');
    } else {
      if (selectedMounting === 'Stud with Block') {
        setSelectedMounting(() => AcrylicOptions.mounting_options[0].mounting_option);
      }
      // Exclude 'Stud with Block' option
      newMountingOptions = AcrylicOptions.mounting_options.filter(option => option.mounting_option !== 'Stud with Block');
    }
    if (waterproof === 'Outdoor') {
      if (selectedMounting === 'Double sided tape') {
        setSelectedMounting(() => AcrylicOptions.mounting_options[0].mounting_option);
      }
      newMountingOptions = newMountingOptions.filter(option => option.mounting_option !== 'Double sided tape');
    }

    // Update the state
    setMountingOptions(newMountingOptions);
  }, [selectedThickness, waterproof]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setLetterHeightOptions(() => Array.from({
      length: parseInt(lettersHeight.max) - parseInt(lettersHeight.min) + 1
    }, (_, index) => {
      const val = parseInt(lettersHeight.min) + index;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
        key: index,
        value: val,
        selected: val === selectedLetterHeight
      }, val, "\"");
    }));
  }, [lettersHeight, letterHeightOptions]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    adjustFontSize();
  }, [letters]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    updateSignage();
  }, [letters, comments, font, selectedThickness, selectedMounting, waterproof, color, usdPrice, selectedLetterHeight, fileUrl, selectedFinishing]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const newHeightOptions = letterPricing.filter(item => {
      const value = item[selectedThickness.value];
      return value !== '' && value !== null && value !== undefined && value !== false && !isNaN(value);
    });
    if (newHeightOptions.length > 0) {
      setLettersHeight(() => ({
        min: newHeightOptions[0].Height,
        max: newHeightOptions[newHeightOptions.length - 1].Height
      }));
    }
  }, [selectedThickness]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (letterPricing.length > 0) {
      const pricingDetail = letterPricing[selectedLetterHeight - 1];
      perLetterPrice = pricingDetail[selectedThickness.value];
      const quantity = letters.trim().length;
      const totalLetterPrice = quantity * perLetterPrice * (waterproof === 'Indoor' ? 1 : 1.1);
      setUsdPrice(totalLetterPrice.toFixed(2));
    }
  }, [selectedLetterHeight, selectedThickness, letters, waterproof, lettersHeight]);
  (0,_utils_ClickOutside__WEBPACK_IMPORTED_MODULE_6__["default"])(colorRef, () => {
    setOpenColor(false);
  });
  const handleFileUpload = async file => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nonce', AcrylicQuote.nonce);
    formData.append('action', 'upload_acrylic_file');
    fetch(AcrylicQuote.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Cache-Control': 'no-cache'
      },
      body: formData
    }).then(response => response.json()).then(data => {
      if (data.code == '2' && data.file) {
        console.log(data.file.url);
        setFileUrl(data.file.url);
        setIsLoading(false);
      }
    }).catch(error => console.error('Error:', error));
  };
  const handleRemoveFile = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', fileUrl);
    formData.append('nonce', AcrylicQuote.nonce);
    formData.append('action', 'remove_acrylic_file');
    fetch(AcrylicQuote.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Cache-Control': 'no-cache'
      },
      body: formData
    }).then(response => response.json()).then(data => {
      if (data.code == '2') {
        setFileUrl('');
        setIsLoading(false);
      }
    }).catch(error => console.error('Error:', error));
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4 p-4 border border-gray-200 w-full h-72 flex align-middle justify-center rounded-md"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full self-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "self-center text-center",
    ref: headlineRef,
    style: {
      margin: '0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      fontFamily: font,
      color: color.color,
      textShadow: '0px 0px 1px rgba(0, 0, 0, 1)'
    }
  }, letters))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "py-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "uppercase font-title text-sm tracking-[1.4px] px-2"
  }, "Letters"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "w-full py-4 px-2 color-black border-gray-200 text-sm font-bold rounded-md h-14 placeholder:text-slate-400 ",
    type: "text",
    onChange: handleOnChangeLetters,
    maxLength: 100,
    value: letters,
    placeholder: "YOUR TEXT HERE"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Thickness",
    value: item.thickness.value,
    onChange: handleOnChangeThickness,
    options: thicknessOptions.map(thickness => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: thickness.value,
      selected: thickness === item.thickness
    }, thickness.thickness))
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Letters Height",
    onChange: handleOnChangeLetterHeight,
    options: letterHeightOptions,
    value: item.letterHeight
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "px-[1px] relative",
    ref: colorRef
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "uppercase font-title text-sm tracking-[1.4px] px-2"
  }, "Color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer",
    onClick: () => setOpenColor(prev => !prev)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rounded-full w-[18px] h-[18px] border mr-2",
    style: {
      backgroundColor: color.color
    }
  }), color.name === '' ? 'SELECT COLOR' : color.name), openColor && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto"
  }, colorOptions.map(color => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm",
      onClick: () => {
        setColor(color);
        setOpenColor(false);
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "w-[18px] h-[18px] inline-block rounded-full border",
      style: {
        backgroundColor: color.color
      }
    }), color.name);
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FontsDropdown__WEBPACK_IMPORTED_MODULE_4__["default"], {
    font: item.font,
    fonts: AcrylicOptions.fonts,
    handleSelectFont: handleSelectFont
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Waterproof Option",
    onChange: handleOnChangeWaterproof,
    options: AcrylicOptions.waterproof_options.map(option => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: option.option,
      selected: option.option == item.waterproof
    }, option.option)),
    value: item.waterproof
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Mounting Options",
    onChange: handleonChangeMount,
    options: mountingOptions.map(option => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: option.mounting_option,
      selected: option.mounting_option === selectedMounting
    }, option.mounting_option)),
    value: item.mounting
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Finishing Options",
    onChange: handleChangeFinishing,
    options: finishingOptions.map(finishing => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: finishing.name,
      selected: finishing.name === item.finishing
    }, finishing.name)),
    value: item.finishing
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "px-[1px] col-span-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "uppercase font-title text-sm tracking-[1.4px] px-2"
  }, "COMMENTS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "w-full py-4 px-2 border-gray-200 color-black text-sm font-bold rounded-md h-[40px] placeholder:text-slate-400",
    type: "text",
    value: comments,
    onChange: handleComments,
    placeholder: "ADD COMMENTS"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_UploadFile__WEBPACK_IMPORTED_MODULE_5__["default"], {
    file: item.file,
    isLoading: isLoading,
    handleFileUpload: handleFileUpload,
    handleRemoveFile: handleRemoveFile
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-xs text-[#9F9F9F] pt-4"
  }, "We size the letters in proportion to your chosen font. Some uppercase/lowercase letters may appear shorter or taller than your selected height on the form to maintain visual harmony."));
}

/***/ }),

/***/ "./src/scripts/Logo.js":
/*!*****************************!*\
  !*** ./src/scripts/Logo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Acrylic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Acrylic */ "./src/scripts/Acrylic.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Dropdown */ "./src/scripts/Dropdown.js");
/* harmony import */ var _UploadFile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UploadFile */ "./src/scripts/UploadFile.js");
/* harmony import */ var _utils_ConvertJson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/ConvertJson */ "./src/scripts/utils/ConvertJson.js");






const AcrylicOptions = AcrylicQuote.quote_options;
function Logo({
  item
}) {
  const {
    signage,
    setSignage
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Acrylic__WEBPACK_IMPORTED_MODULE_2__.AcrylicContext);
  const [selectedMounting, setSelectedMounting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.mounting);
  const [selectedThickness, setSelectedThickness] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.thickness);
  const [width, setWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.width);
  const [maxWidthHeight, setMaxWidthHeight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(23);
  const [fileUrl, setFileUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.file);
  const [usdPrice, setUsdPrice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.usdPrice);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [selectedFinishing, setSelectedFinishing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.finishing);
  const finishingOptions = AcrylicOptions.finishing_options;
  const [maxWidthOptions, setMaxWidthOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Array.from({
    length: maxWidthHeight
  }, (_, index) => {
    const val = 1 + index;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      key: index,
      value: val
    }, val, "\"");
  }));
  const [height, setHeight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.height);
  const thicknessOptions = AcrylicOptions.acrylic_thickness_options;
  const [comments, setComments] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [waterproof, setWaterproof] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(item.waterproof);
  const [mountingOptions, setMountingOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(AcrylicOptions.mounting_options);
  const logoPricingObject = AcrylicQuote.quote_options.logo_pricing;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Log to ensure we're getting the expected value

    let newMountingOptions;
    if (selectedThickness.value === '3') {
      if (selectedMounting === 'Flush stud') {
        setSelectedMounting(() => AcrylicOptions.mounting_options[0].mounting_option);
      }
      newMountingOptions = AcrylicOptions.mounting_options.filter(option => option.mounting_option !== 'Flush stud');
    } else {
      if (selectedMounting === 'Stud with Block') {
        setSelectedMounting(() => AcrylicOptions.mounting_options[0].mounting_option);
      }
      // Exclude 'Stud with Block' option
      newMountingOptions = AcrylicOptions.mounting_options.filter(option => option.mounting_option !== 'Stud with Block');
    }
    if (waterproof === 'Outdoor') {
      if (selectedMounting === 'Double sided tape') {
        setSelectedMounting(() => AcrylicOptions.mounting_options[0].mounting_option);
      }
      newMountingOptions = newMountingOptions.filter(option => option.mounting_option !== 'Double sided tape');
    }

    // Update the state
    setMountingOptions(newMountingOptions);
    setMaxWidthOptions(() => Array.from({
      length: parseInt(maxWidthHeight) + 1
    }, (_, index) => {
      const val = 1 + index;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
        key: index,
        value: val
      }, val, "\"");
    }));
  }, [selectedThickness, waterproof, maxWidthHeight]);
  function handleComments(e) {
    setComments(e.target.value);
  }
  const handleOnChangeThickness = e => {
    const target = e.target.value;
    const selected = thicknessOptions.filter(option => option.value === target);
    setSelectedThickness(() => selected[0]);
    target > 3 ? setMaxWidthHeight(42) : setMaxWidthHeight(23);
    if (target == 3) {
      if (height > 25) {
        setHeight(24);
      }
      if (width > 25) {
        setWidth(24);
      }
    }
  };
  const handleChangeFinishing = e => {
    setSelectedFinishing(e.target.value);
  };
  function updateSignage() {
    const updatedSignage = signage.map(sign => {
      if (sign.id === item.id) {
        return {
          ...sign,
          comments: comments,
          thickness: selectedThickness,
          mounting: selectedMounting,
          waterproof: waterproof,
          width: width,
          height: height,
          usdPrice: usdPrice,
          file: fileUrl,
          finishing: selectedFinishing
        };
      } else {
        return sign;
      }
    });
    setSignage(updatedSignage);
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setComments(item.comments);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    updateSignage();
  }, [comments, selectedThickness, selectedMounting, waterproof, width, height, usdPrice, fileUrl, selectedFinishing]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const logoKey = `logo_pricing_${selectedThickness.value}mm`;
    const logoPricingTable = logoPricingObject[logoKey]?.length > 0 ? (0,_utils_ConvertJson__WEBPACK_IMPORTED_MODULE_5__["default"])(logoPricingObject[logoKey]) : [];
    const computed = logoPricingTable.length > 0 ? logoPricingTable[width - 1][height] : 0;
    const total = (computed * (waterproof === 'Indoor' ? 1 : 1.1)).toFixed(2);
    setUsdPrice(total);
  }, [width, height, selectedThickness, waterproof]);
  const handleFileUpload = async file => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nonce', AcrylicQuote.nonce);
    formData.append('action', 'upload_acrylic_file');
    fetch(AcrylicQuote.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Cache-Control': 'no-cache'
      },
      body: formData
    }).then(response => response.json()).then(data => {
      if (data.code == '2' && data.file) {
        console.log(data.file.url);
        setFileUrl(data.file.url);
        setIsLoading(false);
      }
    }).catch(error => console.error('Error:', error));
  };
  const handleRemoveFile = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', fileUrl);
    formData.append('nonce', AcrylicQuote.nonce);
    formData.append('action', 'remove_acrylic_file');
    fetch(AcrylicQuote.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Cache-Control': 'no-cache'
      },
      body: formData
    }).then(response => response.json()).then(data => {
      if (data.code == '2') {
        setFileUrl('');
        setIsLoading(false);
      }
    }).catch(error => console.error('Error:', error));
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Thickness",
    value: item.thickness.value,
    onChange: handleOnChangeThickness,
    options: thicknessOptions.map(thickness => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: thickness.value,
      selected: thickness === item.thickness
    }, thickness.thickness))
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Width",
    value: item.width,
    onChange: e => setWidth(e.target.value),
    options: maxWidthOptions
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Height",
    value: item.height,
    onChange: e => setHeight(e.target.value),
    options: maxWidthOptions
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Waterproof Option",
    onChange: e => setWaterproof(e.target.value),
    options: AcrylicOptions.waterproof_options.map(option => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: option.option,
      selected: option.option == item.waterproof
    }, option.option)),
    value: item.waterproof
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Mounting Options",
    onChange: e => setSelectedMounting(e.target.value),
    options: mountingOptions.map(option => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: option.mounting_option,
      selected: option.mounting_option === selectedMounting
    }, option.mounting_option)),
    value: item.mounting
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Finishing Options",
    onChange: handleChangeFinishing,
    options: finishingOptions.map(finishing => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: finishing.name,
      selected: finishing.name === item.finishing
    }, finishing.name)),
    value: item.finishing
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "px-[1px] col-span-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "uppercase font-title text-sm tracking-[1.4px] px-2"
  }, "COMMENTS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "w-full py-4 px-2 border-gray-200 color-black text-sm font-bold rounded-md h-[40px] placeholder:text-slate-400",
    type: "text",
    value: item.comments,
    onChange: handleComments,
    placeholder: "ADD COMMENTS"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_UploadFile__WEBPACK_IMPORTED_MODULE_4__["default"], {
    file: item.file,
    handleFileUpload: handleFileUpload,
    handleRemoveFile: handleRemoveFile,
    isLoading: isLoading
  })));
}

/***/ }),

/***/ "./src/scripts/Prices.js":
/*!*******************************!*\
  !*** ./src/scripts/Prices.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Sidebar({
  item
}) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-between py-2 font-title uppercase"
  }, item.title, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "$", Number(item.usdPrice).toLocaleString(), " USD")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "THICKNESS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px] uppercase"
  }, item.thickness.thickness)), item.type === 'logo' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "WIDTH"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px] break-words"
  }, item.width, "\"")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "HEIGHT"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px] break-words"
  }, item.height, "\""))), item.type === 'letters' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "LETTER HEIGHT"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px] break-words"
  }, item.letterHeight, "\""))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "MOUNTING"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px]"
  }, item.mounting)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "WATERPROOF"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px]"
  }, item.waterproof)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "COLOR"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px]"
  }, item.color?.name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "FINISHING"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px]"
  }, item.finishing)), item.type === 'letters' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "FONT"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px] break-words"
  }, item.font)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "LINE TEXT"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px] break-words"
  }, item.letters))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "COMMENTS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px] break-words"
  }, item.comments)), item.file && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 py-[2px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-xs font-title"
  }, "FILE"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-left text-[10px] break-words"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.file,
    target: "_blank"
  }, "View File"))));
}

/***/ }),

/***/ "./src/scripts/Sidebar.js":
/*!********************************!*\
  !*** ./src/scripts/Sidebar.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Acrylic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Acrylic */ "./src/scripts/Acrylic.js");
/* harmony import */ var _Prices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Prices */ "./src/scripts/Prices.js");




function Sidebar() {
  const {
    signage
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Acrylic__WEBPACK_IMPORTED_MODULE_2__.AcrylicContext);
  const totalUsdPrice = signage.reduce((acc, item) => acc + parseFloat(item.usdPrice), 0);
  const handleAddToCart = () => {
    console.log(JSON.stringify(signage));
    localStorage.removeItem('acrylicStorage');
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "md:w-1/4 w-full mt-8 md:mt-0"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rounded-md border border-gray-200 p-4 sticky top-8"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full max-h-[calc(100vh-300px)] overflow-y-auto"
  }, signage.map(item => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Prices__WEBPACK_IMPORTED_MODULE_3__["default"], {
    id: item.id,
    item: item
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-between my-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "text-2xl"
  }, "TOTAL:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "text-2xl"
  }, "$", Number(totalUsdPrice.toFixed(2)).toLocaleString(), " USD")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "mb-5 font-title rounded-md text-white w-full text-center bg-[#f22e00] text-sm h-[49px] hover:bg-[#ff5e3d]",
    onClick: handleAddToCart
  }, "ADD TO CART"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "mb-5 font-title rounded-md text-gray-400 border border-gray-400 w-full text-center bg-white text-sm h-[49px] hover:bg-gray-400 hover:text-white",
    style: {
      border: '1px solid'
    }
  }, "SAVE ORDER")));
}

/***/ }),

/***/ "./src/scripts/Signage.js":
/*!********************************!*\
  !*** ./src/scripts/Signage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Signage)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/react-tooltip.min.mjs");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Acrylic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Acrylic */ "./src/scripts/Acrylic.js");
/* harmony import */ var _Letters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Letters */ "./src/scripts/Letters.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Logo */ "./src/scripts/Logo.js");
/* harmony import */ var _svg_Icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./svg/Icons */ "./src/scripts/svg/Icons.js");



 // Make sure to import uuid




function Signage({
  item,
  index
}) {
  const {
    signage,
    setSignage
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Acrylic__WEBPACK_IMPORTED_MODULE_3__.AcrylicContext);
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  function recountSignageTitles(updatedSignage) {
    const count = {}; // Object to keep track of the count of each type
    return updatedSignage.map(sign => {
      const currentCount = (count[sign.type] || 0) + 1;
      count[sign.type] = currentCount;
      return {
        ...sign,
        title: `${sign.type} ${currentCount}`
      };
    });
  }
  function removeSignage(itemToRemove) {
    const updatedSignage = signage.filter(sign => sign.id !== itemToRemove.id);
    setSignage(recountSignageTitles(updatedSignage));
  }
  function duplicateSignage(item, index) {
    const duplicated = {
      ...item,
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_7__["default"])()
    };
    console.log(duplicated);
    setSignage(current => {
      const updated = [...current.slice(0, index + 1), duplicated, ...current.slice(index + 1)];
      return recountSignageTitles(updated);
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rounded-md border border-gray-200 p-4 mb-8"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-between mb-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    class: "signage-title"
  }, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cursor-pointer",
    onClick: () => setOpen(!open),
    "data-tooltip-id": `${item.id}`,
    "data-tooltip-content": open ? 'Collapse' : 'Expand'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_Icons__WEBPACK_IMPORTED_MODULE_6__.CollapseIcon, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cursor-pointer",
    onClick: () => duplicateSignage(item, index),
    "data-tooltip-id": `${item.id}`,
    "data-tooltip-content": "Duplicate"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_Icons__WEBPACK_IMPORTED_MODULE_6__.DuplicateIcon, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cursor-pointer",
    onClick: () => removeSignage(item),
    "data-tooltip-id": item.id,
    "data-tooltip-content": "Delete"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_Icons__WEBPACK_IMPORTED_MODULE_6__.TrashIcon, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
    id: item.id
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `signage-content ${open ? 'open' : ''}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, item.type === 'letters' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Letters__WEBPACK_IMPORTED_MODULE_4__["default"], {
    item: item
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Logo__WEBPACK_IMPORTED_MODULE_5__["default"], {
    item: item
  }))));
}

/***/ }),

/***/ "./src/scripts/UploadFile.js":
/*!***********************************!*\
  !*** ./src/scripts/UploadFile.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UploadFile)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function UploadFile({
  file,
  setFileUrl,
  handleFileUpload,
  handleRemoveFile,
  isLoading
}) {
  const fileRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const handleButtonClick = () => {
    fileRef.current.click();
  };
  const handleChange = event => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file, setFileUrl);
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "px-[1px]"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "uppercase font-title text-sm tracking-[1.4px] px-2"
  }, "UPLOAD PDF/AI FILE"), !file ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "h-[40px] w-full py-2 px-2 text-center text-red rounded-md text-sm uppercase bg-slate-400 hover:bg-slate-600 font-title leading-[1em]",
    onClick: handleButtonClick,
    "aria-label": "Upload design file",
    disabled: isLoading
  }, isLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-center items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    class: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })), "Uploading...") : 'Upload Design') : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "h-[40px] w-full py-2 px-2 text-center text-red rounded-md text-sm uppercase bg-red-600 hover:bg-red-400 font-title leading-[1em]",
    onClick: handleRemoveFile,
    "aria-label": "Remove design file",
    disabled: isLoading
  }, isLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-center items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    class: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })), "Removing...") : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center justify-center"
  }, "Remove design", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18L18 6M6 6l12 12"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "file",
    ref: fileRef,
    class: "hidden",
    onChange: handleChange,
    accept: ".pdf,.ai",
    "aria-label": "File input"
  }));
}

/***/ }),

/***/ "./src/scripts/svg/Icons.js":
/*!**********************************!*\
  !*** ./src/scripts/svg/Icons.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapseIcon: () => (/* binding */ CollapseIcon),
/* harmony export */   DuplicateIcon: () => (/* binding */ DuplicateIcon),
/* harmony export */   PlusIcon: () => (/* binding */ PlusIcon),
/* harmony export */   TrashIcon: () => (/* binding */ TrashIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const CollapseIcon = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "6",
  height: "11",
  viewBox: "0 0 6 11",
  fill: "none"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M0.933333 11L0 10.0375L3 6.94375L6 10.0375L5.06667 11L3 8.86875L0.933333 11ZM3 4.05625L0 0.9625L0.933333 0L3 2.13125L5.06667 0L6 0.9625L3 4.05625Z",
  fill: "black"
}));
const TrashIcon = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "11",
  height: "13",
  viewBox: "0 0 11 13",
  fill: "none"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M0.6875 13V2.16667H0V0.722222H3.4375V0H7.5625V0.722222H11V2.16667H10.3125V13H0.6875ZM2.0625 11.5556H8.9375V2.16667H2.0625V11.5556ZM3.4375 10.1111H4.8125V3.61111H3.4375V10.1111ZM6.1875 10.1111H7.5625V3.61111H6.1875V10.1111Z",
  fill: "black"
}));
const DuplicateIcon = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "14",
  viewBox: "0 0 12 14",
  fill: "none"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2.82353 11.2V0H12V11.2H2.82353ZM4.23529 9.8H10.5882V1.4H4.23529V9.8ZM0 14V2.8H1.41176V12.6H9.17647V14H0Z",
  fill: "black"
}));
const PlusIcon = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "14",
  height: "14",
  viewBox: "0 0 14 14",
  fill: "none"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "7",
  y1: "1",
  x2: "7",
  y2: "13",
  stroke: "black",
  "stroke-width": "2",
  "stroke-linecap": "square",
  stroke: "currentColor"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "13",
  y1: "7",
  x2: "1",
  y2: "7",
  stroke: "black",
  "stroke-width": "2",
  "stroke-linecap": "square",
  stroke: "currentColor"
}));

/***/ }),

/***/ "./src/scripts/utils/ClickOutside.js":
/*!*******************************************!*\
  !*** ./src/scripts/utils/ClickOutside.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useOutsideClick)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Hook
function useOutsideClick(ref, callback) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

/***/ }),

/***/ "./src/scripts/utils/ConvertJson.js":
/*!******************************************!*\
  !*** ./src/scripts/utils/ConvertJson.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert_json)
/* harmony export */ });
function convert_json(tableString) {
  const rows = tableString.trim().split('\n');

  // Use the first row as headers
  const headers = rows[0].trim().split('\t');

  // Map over the remaining rows to create objects
  return rows.slice(1).map(row => {
    const values = row.split('\t');
    let obj = headers.reduce((acc, header, index) => {
      // Convert to the appropriate type; assuming all non-header values are numbers
      acc[header] = values[index] ? parseFloat(values[index]) : null;
      return acc;
    }, {});
    return obj;
  });
}

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/react-tooltip/dist/react-tooltip.min.css":
/*!***************************************************************!*\
  !*** ./node_modules/react-tooltip/dist/react-tooltip.min.css ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "./node_modules/@floating-ui/core/dist/floating-ui.core.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/@floating-ui/core/dist/floating-ui.core.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrow: () => (/* binding */ arrow),
/* harmony export */   autoPlacement: () => (/* binding */ autoPlacement),
/* harmony export */   computePosition: () => (/* binding */ computePosition),
/* harmony export */   detectOverflow: () => (/* binding */ detectOverflow),
/* harmony export */   flip: () => (/* binding */ flip),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   inline: () => (/* binding */ inline),
/* harmony export */   limitShift: () => (/* binding */ limitShift),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   rectToClientRect: () => (/* reexport safe */ _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect),
/* harmony export */   shift: () => (/* binding */ shift),
/* harmony export */   size: () => (/* binding */ size)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/utils */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs");



function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement);
  const alignmentAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentAxis)(placement);
  const alignLength = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAxisLength)(alignmentAxis);
  const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch ((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
  const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getPaddingObject)(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getPaddingObject)(padding);
    const coords = {
      x,
      y
    };
    const axis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentAxis)(placement);
    const length = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAxisLength)(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) === alignment), ...allowedPlacements.filter(placement => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) !== alignment)] : allowedPlacements.filter(placement => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) === alignment || (autoAlignment ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAlignmentPlacement)(placement) !== placement : false);
    }
    return true;
  });
}
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'autoPlacement',
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const placements$1 = alignment !== undefined || allowedPlacements === _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentSides)(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));

      // Make `computeCoords` start from the right place.
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];

      // There are more placements to check.
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map(d => {
        const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(d.placement);
        return [d.placement, alignment && crossAxis ?
        // Check along the mainAxis and main crossAxis side.
        d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
        // Check only the mainAxis.
        d.overflows[0], d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
      // Aligned placements should not check their opposite crossAxis
      // side.
      (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(d[0]) ? 2 : 3).every(v => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
      const isBasePlacement = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositePlacement)(initialPlacement)] : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getExpandedPlacements)(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
        fallbackPlacements.push(...(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAxisPlacements)(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentSides)(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.sides.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

function getBoundingRect(rects) {
  const minX = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(...rects.map(rect => rect.left));
  const minY = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(...rects.map(rect => rect.top));
  const maxX = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(...rects.map(rect => rect.right));
  const maxY = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(...rects.map(rect => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map(rect => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getBoundingRect(rect)));
}
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'inline',
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform,
        strategy
      } = state;
      // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
      // ClientRect's bounds, despite the event listener being triggered. A
      // padding of 2 seems to handle this issue.
      const {
        padding = 2,
        x,
        y
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getBoundingRect(nativeClientRects));
      const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getPaddingObject)(padding);
      function getBoundingClientRect() {
        // There are two rects and they are disjoined.
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          // Find the first rect in which the point is fully inside.
          return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }

        // There are 2 or more connected rects.
        if (clientRects.length >= 2) {
          if ((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement) === 'y') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement) === 'top';
            const top = firstRect.top;
            const bottom = lastRect.bottom;
            const left = isTop ? firstRect.left : lastRect.left;
            const right = isTop ? firstRect.right : lastRect.right;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          const isLeftSide = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement) === 'left';
          const maxRight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(...clientRects.map(rect => rect.right));
          const minLeft = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform.getElementRects({
        reference: {
          getBoundingClientRect
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
  const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement);
  const isVertical = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      const {
        x,
        y
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement));
      const mainAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAxis)(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement);
      const mainAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAxis)(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(offset, state);
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = ['top', 'left'].includes((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
      const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement);
      const isYAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.left, 0);
        const xMax = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.right, 0);
        const yMin = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.top, 0);
        const yMax = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};




/***/ }),

/***/ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrow: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.arrow),
/* harmony export */   autoPlacement: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.autoPlacement),
/* harmony export */   autoUpdate: () => (/* binding */ autoUpdate),
/* harmony export */   computePosition: () => (/* binding */ computePosition),
/* harmony export */   detectOverflow: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.detectOverflow),
/* harmony export */   flip: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.flip),
/* harmony export */   getOverflowAncestors: () => (/* reexport safe */ _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getOverflowAncestors),
/* harmony export */   hide: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.hide),
/* harmony export */   inline: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.inline),
/* harmony export */   limitShift: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.limitShift),
/* harmony export */   offset: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.offset),
/* harmony export */   platform: () => (/* binding */ platform),
/* harmony export */   shift: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.shift),
/* harmony export */   size: () => (/* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.size)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @floating-ui/utils */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs");
/* harmony import */ var _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/core */ "./node_modules/@floating-ui/core/dist/floating-ui.core.mjs");
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @floating-ui/utils/dom */ "./node_modules/@floating-ui/utils/dom/dist/floating-ui.utils.dom.mjs");






function getCssDimensions(element) {
  const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.round)(width) !== offsetWidth || (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.round)(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isElement)(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(domElement)) {
    return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.createCoords)(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.round)(rect.width) : rect.width) / width;
  let y = ($ ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.round)(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.createCoords)(0);
function getVisualOffsets(element) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getWindow)(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isWebKit)() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getWindow)(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.createCoords)(1);
  if (includeScale) {
    if (offsetParent) {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isElement)(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.createCoords)(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getWindow)(domElement);
    const offsetWin = offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isElement)(offsetParent) ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getWindow)(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getWindow)(currentIFrame).frameElement;
    }
  }
  return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.rectToClientRect)({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getDocumentElement)(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.createCoords)(1);
  const offsets = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.createCoords)(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getNodeName)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isOverflowElement)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getNodeScroll)(offsetParent);
    }
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getDocumentElement)(element)).left + (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getNodeScroll)(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getDocumentElement)(element);
  const scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getNodeScroll)(element);
  const body = element.ownerDocument.body;
  const width = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(body).direction === 'rtl') {
    x += (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getWindow)(element);
  const html = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getDocumentElement)(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isWebKit)();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(element) ? getScale(element) : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.createCoords)(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getDocumentElement)(element));
  } else if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isElement)(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.rectToClientRect)(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getParentNode)(element);
  if (parentNode === stopNode || !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isElement)(parentNode) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isLastTraversableNode)(parentNode)) {
    return false;
  }
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getOverflowAncestors)(element, [], false).filter(el => (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isElement)(el) && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getNodeName)(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(element).position === 'fixed';
  let currentNode = elementIsFixed ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getParentNode)(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isElement)(currentNode) && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isLastTraversableNode)(currentNode)) {
    const computedStyle = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(currentNode);
    const currentNodeIsContaining = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isContainingBlock)(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isOverflowElement)(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getParentNode)(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.max)(rect.top, accRect.top);
    accRect.right = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  return getCssDimensions(element);
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getDocumentElement)(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.createCoords)(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getNodeName)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isOverflowElement)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getNodeScroll)(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getTrueOffsetParent(element, polyfill) {
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(element) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const window = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getWindow)(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isTableElement)(offsetParent) && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getNodeName)(offsetParent) === 'html' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getNodeName)(offsetParent) === 'body' && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(offsetParent).position === 'static' && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isContainingBlock)(offsetParent))) {
    return window;
  }
  return offsetParent || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getContainingBlock)(element) || window;
}

const getElementRects = async function (_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...(await getDimensionsFn(floating))
    }
  };
};

function isRTL(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getDocumentElement)(element);
  function cleanup() {
    clearTimeout(timeoutId);
    io && io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.floor)(top);
    const insetRight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.floor)(root.clientWidth - (left + width));
    const insetBottom = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.floor)(root.clientHeight - (top + height));
    const insetLeft = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.floor)(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.max)(0, (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__.min)(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getOverflowAncestors)(referenceEl) : []), ...(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.getOverflowAncestors)(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver && resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.computePosition)(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};




/***/ }),

/***/ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alignments: () => (/* binding */ alignments),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   createCoords: () => (/* binding */ createCoords),
/* harmony export */   evaluate: () => (/* binding */ evaluate),
/* harmony export */   expandPaddingObject: () => (/* binding */ expandPaddingObject),
/* harmony export */   floor: () => (/* binding */ floor),
/* harmony export */   getAlignment: () => (/* binding */ getAlignment),
/* harmony export */   getAlignmentAxis: () => (/* binding */ getAlignmentAxis),
/* harmony export */   getAlignmentSides: () => (/* binding */ getAlignmentSides),
/* harmony export */   getAxisLength: () => (/* binding */ getAxisLength),
/* harmony export */   getExpandedPlacements: () => (/* binding */ getExpandedPlacements),
/* harmony export */   getOppositeAlignmentPlacement: () => (/* binding */ getOppositeAlignmentPlacement),
/* harmony export */   getOppositeAxis: () => (/* binding */ getOppositeAxis),
/* harmony export */   getOppositeAxisPlacements: () => (/* binding */ getOppositeAxisPlacements),
/* harmony export */   getOppositePlacement: () => (/* binding */ getOppositePlacement),
/* harmony export */   getPaddingObject: () => (/* binding */ getPaddingObject),
/* harmony export */   getSide: () => (/* binding */ getSide),
/* harmony export */   getSideAxis: () => (/* binding */ getSideAxis),
/* harmony export */   max: () => (/* binding */ max),
/* harmony export */   min: () => (/* binding */ min),
/* harmony export */   placements: () => (/* binding */ placements),
/* harmony export */   rectToClientRect: () => (/* binding */ rectToClientRect),
/* harmony export */   round: () => (/* binding */ round),
/* harmony export */   sides: () => (/* binding */ sides)
/* harmony export */ });
const sides = ['top', 'right', 'bottom', 'left'];
const alignments = ['start', 'end'];
const placements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}




/***/ }),

/***/ "./node_modules/@floating-ui/utils/dom/dist/floating-ui.utils.dom.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/@floating-ui/utils/dom/dist/floating-ui.utils.dom.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComputedStyle: () => (/* binding */ getComputedStyle),
/* harmony export */   getContainingBlock: () => (/* binding */ getContainingBlock),
/* harmony export */   getDocumentElement: () => (/* binding */ getDocumentElement),
/* harmony export */   getNearestOverflowAncestor: () => (/* binding */ getNearestOverflowAncestor),
/* harmony export */   getNodeName: () => (/* binding */ getNodeName),
/* harmony export */   getNodeScroll: () => (/* binding */ getNodeScroll),
/* harmony export */   getOverflowAncestors: () => (/* binding */ getOverflowAncestors),
/* harmony export */   getParentNode: () => (/* binding */ getParentNode),
/* harmony export */   getWindow: () => (/* binding */ getWindow),
/* harmony export */   isContainingBlock: () => (/* binding */ isContainingBlock),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isHTMLElement: () => (/* binding */ isHTMLElement),
/* harmony export */   isLastTraversableNode: () => (/* binding */ isLastTraversableNode),
/* harmony export */   isNode: () => (/* binding */ isNode),
/* harmony export */   isOverflowElement: () => (/* binding */ isOverflowElement),
/* harmony export */   isShadowRoot: () => (/* binding */ isShadowRoot),
/* harmony export */   isTableElement: () => (/* binding */ isTableElement),
/* harmony export */   isWebKit: () => (/* binding */ isWebKit)
/* harmony export */ });
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}




/***/ }),

/***/ "./node_modules/react-tooltip/dist/react-tooltip.min.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/react-tooltip/dist/react-tooltip.min.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tooltip: () => (/* binding */ B),
/* harmony export */   TooltipProvider: () => (/* binding */ T),
/* harmony export */   TooltipWrapper: () => (/* binding */ k),
/* harmony export */   removeStyle: () => (/* binding */ E)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @floating-ui/dom */ "./node_modules/@floating-ui/core/dist/floating-ui.core.mjs");
/* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @floating-ui/dom */ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/*
* React Tooltip
* {@link https://github.com/ReactTooltip/react-tooltip}
* @copyright ReactTooltip Team
* @license MIT
*/
const y="react-tooltip-core-styles",h="react-tooltip-base-styles",w={core:!1,base:!1};function b({css:e,id:t=h,type:o="base",ref:r}){var l,n;if(!e||"undefined"==typeof document||w[o])return;if("core"===o&&"undefined"!=typeof process&&(null===(l=null===process||void 0===process?void 0:process.env)||void 0===l?void 0:l.REACT_TOOLTIP_DISABLE_CORE_STYLES))return;if("base"!==o&&"undefined"!=typeof process&&(null===(n=null===process||void 0===process?void 0:process.env)||void 0===n?void 0:n.REACT_TOOLTIP_DISABLE_BASE_STYLES))return;"core"===o&&(t=y),r||(r={});const{insertAt:c}=r;if(document.getElementById(t))return void console.warn(`[react-tooltip] Element with id '${t}' already exists. Call \`removeStyle()\` first`);const i=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.id=t,s.type="text/css","top"===c&&i.firstChild?i.insertBefore(s,i.firstChild):i.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e)),w[o]=!0}function E({type:e="base",id:t=h}={}){if(!w[e])return;"core"===e&&(t=y);const o=document.getElementById(t);"style"===(null==o?void 0:o.tagName)?null==o||o.remove():console.warn(`[react-tooltip] Failed to remove 'style' element with id '${t}'. Call \`injectStyle()\` first`),w[e]=!1}const S=(e,t,o)=>{let r=null;return function(...l){const n=()=>{r=null,o||e.apply(this,l)};o&&!r&&(e.apply(this,l),r=setTimeout(n,t)),o||(r&&clearTimeout(r),r=setTimeout(n,t))}},g="DEFAULT_TOOLTIP_ID",_={anchorRefs:new Set,activeAnchor:{current:null},attach:()=>{},detach:()=>{},setActiveAnchor:()=>{}},A=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({getTooltipData:()=>_}),T=({children:t})=>{const[n,c]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({[g]:new Set}),[i,s]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({[g]:{current:null}}),a=(e,...t)=>{c((o=>{var r;const l=null!==(r=o[e])&&void 0!==r?r:new Set;return t.forEach((e=>l.add(e))),{...o,[e]:new Set(l)}}))},u=(e,...t)=>{c((o=>{const r=o[e];return r?(t.forEach((e=>r.delete(e))),{...o}):o}))},d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((e=g)=>{var t,o;return{anchorRefs:null!==(t=n[e])&&void 0!==t?t:new Set,activeAnchor:null!==(o=i[e])&&void 0!==o?o:{current:null},attach:(...t)=>a(e,...t),detach:(...t)=>u(e,...t),setActiveAnchor:t=>((e,t)=>{s((o=>{var r;return(null===(r=o[e])||void 0===r?void 0:r.current)===t.current?o:{...o,[e]:t}}))})(e,t)}}),[n,i,a,u]),p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({getTooltipData:d})),[d]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(A.Provider,{value:p},t)};function O(e=g){return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(A).getTooltipData(e)}const k=({tooltipId:t,children:o,className:r,place:l,content:n,html:s,variant:a,offset:u,wrapper:d,events:p,positionStrategy:v,delayShow:m,delayHide:y})=>{const{attach:h,detach:w}=O(t),b=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>(h(b),()=>{w(b)})),[]),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{ref:b,className:classnames__WEBPACK_IMPORTED_MODULE_1__("react-tooltip-wrapper",r),"data-tooltip-place":l,"data-tooltip-content":n,"data-tooltip-html":s,"data-tooltip-variant":a,"data-tooltip-offset":u,"data-tooltip-wrapper":d,"data-tooltip-events":p,"data-tooltip-position-strategy":v,"data-tooltip-delay-show":m,"data-tooltip-delay-hide":y},o)},L="undefined"!=typeof window?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_0__.useEffect,C=e=>{if(!(e instanceof HTMLElement||e instanceof SVGElement))return!1;const t=getComputedStyle(e);return["overflow","overflow-x","overflow-y"].some((e=>{const o=t.getPropertyValue(e);return"auto"===o||"scroll"===o}))},x=e=>{if(!e)return null;let t=e.parentElement;for(;t;){if(C(t))return t;t=t.parentElement}return document.scrollingElement||document.documentElement},R=async({elementReference:e=null,tooltipReference:t=null,tooltipArrowReference:o=null,place:r="top",offset:l=10,strategy:n="absolute",middlewares:c=[(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.offset)(Number(l)),(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.flip)(),(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.shift)({padding:5})],border:i})=>{if(!e)return{tooltipStyles:{},tooltipArrowStyles:{},place:r};if(null===t)return{tooltipStyles:{},tooltipArrowStyles:{},place:r};const s=c;return o?(s.push((0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.arrow)({element:o,padding:5})),(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.computePosition)(e,t,{placement:r,strategy:n,middleware:s}).then((({x:e,y:t,placement:o,middlewareData:r})=>{var l,n;const c={left:`${e}px`,top:`${t}px`,border:i},{x:s,y:a}=null!==(l=r.arrow)&&void 0!==l?l:{x:0,y:0},u=null!==(n={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]])&&void 0!==n?n:"bottom",d=i&&{borderBottom:i,borderRight:i};let p=0;if(i){const e=`${i}`.match(/(\d+)px/);p=(null==e?void 0:e[1])?Number(e[1]):1}return{tooltipStyles:c,tooltipArrowStyles:{left:null!=s?`${s}px`:"",top:null!=a?`${a}px`:"",right:"",bottom:"",...d,[u]:`-${4+p}px`},place:o}}))):(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.computePosition)(e,t,{placement:"bottom",strategy:n,middleware:s}).then((({x:e,y:t,placement:o})=>({tooltipStyles:{left:`${e}px`,top:`${t}px`},tooltipArrowStyles:{},place:o})))};var N={tooltip:"core-styles-module_tooltip__3vRRp",fixed:"core-styles-module_fixed__pcSol",arrow:"core-styles-module_arrow__cvMwQ",noArrow:"core-styles-module_noArrow__xock6",clickable:"core-styles-module_clickable__ZuTTB",show:"core-styles-module_show__Nt9eE",closing:"core-styles-module_closing__sGnxF"},$={tooltip:"styles-module_tooltip__mnnfp",arrow:"styles-module_arrow__K0L3T",dark:"styles-module_dark__xNqje",light:"styles-module_light__Z6W-X",success:"styles-module_success__A2AKt",warning:"styles-module_warning__SCK0X",error:"styles-module_error__JvumD",info:"styles-module_info__BWdHW"};const I=({id:t,className:l,classNameArrow:n,variant:s="dark",anchorId:a,anchorSelect:u,place:d="top",offset:p=10,events:v=["hover"],openOnClick:y=!1,positionStrategy:h="absolute",middlewares:w,wrapper:b,delayShow:E=0,delayHide:g=0,float:_=!1,hidden:A=!1,noArrow:T=!1,clickable:k=!1,closeOnEsc:C=!1,closeOnScroll:I=!1,closeOnResize:j=!1,openEvents:B,closeEvents:z,globalCloseEvents:D,style:H,position:q,afterShow:M,afterHide:W,content:P,contentWrapperRef:F,isOpen:K,setIsOpen:U,activeAnchor:X,setActiveAnchor:Y,border:G,opacity:V,arrowColor:Z})=>{const J=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),Q=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),ee=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),te=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[oe,re]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(d),[le,ne]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),[ce,ie]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),[se,ae]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[ue,de]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),pe=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),ve=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),{anchorRefs:me,setActiveAnchor:fe}=O(t),ye=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),[he,we]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),be=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),Ee=y||v.includes("click"),Se=Ee||(null==B?void 0:B.click)||(null==B?void 0:B.dblclick)||(null==B?void 0:B.mousedown),ge=B?{...B}:{mouseenter:!0,focus:!0,click:!1,dblclick:!1,mousedown:!1};!B&&Ee&&Object.assign(ge,{mouseenter:!1,focus:!1,click:!0});const _e=z?{...z}:{mouseleave:!0,blur:!0,click:!1};!z&&Ee&&Object.assign(_e,{mouseleave:!1,blur:!1});const Ae=D?{...D}:{escape:C||!1,scroll:I||!1,resize:j||!1,clickOutsideAnchor:Se||!1};L((()=>(be.current=!0,()=>{be.current=!1})),[]);const Te=e=>{be.current&&(e&&de(!0),setTimeout((()=>{be.current&&(null==U||U(e),void 0===K&&ae(e))}),10))};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(void 0===K)return()=>null;K&&de(!0);const e=setTimeout((()=>{ae(K)}),10);return()=>{clearTimeout(e)}}),[K]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{se!==pe.current&&(pe.current=se,se?null==M||M():null==W||W())}),[se]);const Oe=(e=g)=>{te.current&&clearTimeout(te.current),te.current=setTimeout((()=>{ye.current||Te(!1)}),e)},ke=e=>{var t;if(!e)return;const o=null!==(t=e.currentTarget)&&void 0!==t?t:e.target;if(!(null==o?void 0:o.isConnected))return Y(null),void fe({current:null});E?(ee.current&&clearTimeout(ee.current),ee.current=setTimeout((()=>{Te(!0)}),E)):Te(!0),Y(o),fe({current:o}),te.current&&clearTimeout(te.current)},Le=()=>{k?Oe(g||100):g?Oe():Te(!1),ee.current&&clearTimeout(ee.current)},Ce=({x:e,y:t})=>{R({place:d,offset:p,elementReference:{getBoundingClientRect:()=>({x:e,y:t,width:0,height:0,top:t,left:e,right:e,bottom:t})},tooltipReference:J.current,tooltipArrowReference:Q.current,strategy:h,middlewares:w,border:G}).then((e=>{Object.keys(e.tooltipStyles).length&&ne(e.tooltipStyles),Object.keys(e.tooltipArrowStyles).length&&ie(e.tooltipArrowStyles),re(e.place)}))},xe=e=>{if(!e)return;const t=e,o={x:t.clientX,y:t.clientY};Ce(o),ve.current=o},Re=e=>{var t;[document.querySelector(`[id='${a}']`),...he].some((t=>null==t?void 0:t.contains(e.target)))||(null===(t=J.current)||void 0===t?void 0:t.contains(e.target))||(Te(!1),ee.current&&clearTimeout(ee.current))},Ne=S(ke,50,!0),$e=S(Le,50,!0),Ie=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{q?Ce(q):_?ve.current&&Ce(ve.current):(null==X?void 0:X.isConnected)&&R({place:d,offset:p,elementReference:X,tooltipReference:J.current,tooltipArrowReference:Q.current,strategy:h,middlewares:w,border:G}).then((e=>{be.current&&(Object.keys(e.tooltipStyles).length&&ne(e.tooltipStyles),Object.keys(e.tooltipArrowStyles).length&&ie(e.tooltipArrowStyles),re(e.place))}))}),[se,X,P,H,d,p,h,q,_]);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{var e,t;const o=new Set(me);he.forEach((e=>{o.add({current:e})}));const r=document.querySelector(`[id='${a}']`);r&&o.add({current:r});const l=()=>{Te(!1)},n=x(X),c=x(J.current);Ae.scroll&&(window.addEventListener("scroll",l),null==n||n.addEventListener("scroll",l),null==c||c.addEventListener("scroll",l));let i=null;Ae.resize?window.addEventListener("resize",l):X&&J.current&&(i=(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.autoUpdate)(X,J.current,Ie,{ancestorResize:!0,elementResize:!0,layoutShift:!0}));const s=e=>{"Escape"===e.key&&Te(!1)};Ae.escape&&window.addEventListener("keydown",s),Ae.clickOutsideAnchor&&window.addEventListener("click",Re);const u=[],d=e=>{se||ke(e)},p=()=>{se&&Le()},v=["mouseenter","mouseleave","focus","blur"],f=["click","dblclick","mousedown","mouseup"];Object.entries(ge).forEach((([e,t])=>{t&&(v.includes(e)?u.push({event:e,listener:Ne}):f.includes(e)&&u.push({event:e,listener:d}))})),Object.entries(_e).forEach((([e,t])=>{t&&(v.includes(e)?u.push({event:e,listener:$e}):f.includes(e)&&u.push({event:e,listener:p}))})),_&&u.push({event:"mousemove",listener:xe});const y=()=>{ye.current=!0},h=()=>{ye.current=!1,Le()};return k&&!Se&&(null===(e=J.current)||void 0===e||e.addEventListener("mouseenter",y),null===(t=J.current)||void 0===t||t.addEventListener("mouseleave",h)),u.forEach((({event:e,listener:t})=>{o.forEach((o=>{var r;null===(r=o.current)||void 0===r||r.addEventListener(e,t)}))})),()=>{var e,t;Ae.scroll&&(window.removeEventListener("scroll",l),null==n||n.removeEventListener("scroll",l),null==c||c.removeEventListener("scroll",l)),Ae.resize?window.removeEventListener("resize",l):null==i||i(),Ae.clickOutsideAnchor&&window.removeEventListener("click",Re),Ae.escape&&window.removeEventListener("keydown",s),k&&!Se&&(null===(e=J.current)||void 0===e||e.removeEventListener("mouseenter",y),null===(t=J.current)||void 0===t||t.removeEventListener("mouseleave",h)),u.forEach((({event:e,listener:t})=>{o.forEach((o=>{var r;null===(r=o.current)||void 0===r||r.removeEventListener(e,t)}))}))}}),[X,Ie,ue,me,he,B,z,D,Ee]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let e=null!=u?u:"";!e&&t&&(e=`[data-tooltip-id='${t}']`);const o=new MutationObserver((o=>{const r=[],l=[];o.forEach((o=>{if("attributes"===o.type&&"data-tooltip-id"===o.attributeName){o.target.getAttribute("data-tooltip-id")===t&&r.push(o.target)}if("childList"===o.type){if(X){const t=[...o.removedNodes].filter((e=>1===e.nodeType));if(e)try{l.push(...t.filter((t=>t.matches(e)))),l.push(...t.flatMap((t=>[...t.querySelectorAll(e)])))}catch(e){}t.some((e=>{var t;return!!(null===(t=null==e?void 0:e.contains)||void 0===t?void 0:t.call(e,X))&&(de(!1),Te(!1),Y(null),ee.current&&clearTimeout(ee.current),te.current&&clearTimeout(te.current),!0)}))}if(e)try{const t=[...o.addedNodes].filter((e=>1===e.nodeType));r.push(...t.filter((t=>t.matches(e)))),r.push(...t.flatMap((t=>[...t.querySelectorAll(e)])))}catch(e){}}})),(r.length||l.length)&&we((e=>[...e.filter((e=>!l.includes(e))),...r]))}));return o.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-tooltip-id"]}),()=>{o.disconnect()}}),[t,u,X]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{Ie()}),[Ie]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(!(null==F?void 0:F.current))return()=>null;const e=new ResizeObserver((()=>{Ie()}));return e.observe(F.current),()=>{e.disconnect()}}),[P,null==F?void 0:F.current]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{var e;const t=document.querySelector(`[id='${a}']`),o=[...he,t];X&&o.includes(X)||Y(null!==(e=he[0])&&void 0!==e?e:t)}),[a,he,X]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>()=>{ee.current&&clearTimeout(ee.current),te.current&&clearTimeout(te.current)}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let e=u;if(!e&&t&&(e=`[data-tooltip-id='${t}']`),e)try{const t=Array.from(document.querySelectorAll(e));we(t)}catch(e){we([])}}),[t,u]);const je=!A&&P&&se&&Object.keys(le).length>0;return ue?react__WEBPACK_IMPORTED_MODULE_0__.createElement(b,{id:t,role:"tooltip",className:classnames__WEBPACK_IMPORTED_MODULE_1__("react-tooltip",N.tooltip,$.tooltip,$[s],l,`react-tooltip__place-${oe}`,N[je?"show":"closing"],je?"react-tooltip__show":"react-tooltip__closing","fixed"===h&&N.fixed,k&&N.clickable),onTransitionEnd:e=>{se||"opacity"!==e.propertyName||de(!1)},style:{...H,...le,opacity:void 0!==V&&je?V:void 0},ref:J},P,react__WEBPACK_IMPORTED_MODULE_0__.createElement(b,{className:classnames__WEBPACK_IMPORTED_MODULE_1__("react-tooltip-arrow",N.arrow,$.arrow,n,T&&N.noArrow),style:{...ce,background:Z?`linear-gradient(to right bottom, transparent 50%, ${Z} 50%)`:void 0},ref:Q})):null},j=({content:t})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{dangerouslySetInnerHTML:{__html:t}}),B=({id:t,anchorId:r,anchorSelect:l,content:n,html:s,render:a,className:u,classNameArrow:d,variant:p="dark",place:v="top",offset:m=10,wrapper:f="div",children:y=null,events:h=["hover"],openOnClick:w=!1,positionStrategy:b="absolute",middlewares:E,delayShow:S=0,delayHide:g=0,float:_=!1,hidden:A=!1,noArrow:T=!1,clickable:k=!1,closeOnEsc:L=!1,closeOnScroll:C=!1,closeOnResize:x=!1,openEvents:R,closeEvents:N,globalCloseEvents:$,style:B,position:z,isOpen:D,disableStyleInjection:H=!1,border:q,opacity:M,arrowColor:W,setIsOpen:P,afterShow:F,afterHide:K})=>{const[U,X]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(n),[Y,G]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(s),[V,Z]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(v),[J,Q]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(p),[ee,te]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(m),[oe,re]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(S),[le,ne]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(g),[ce,ie]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_),[se,ae]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(A),[ue,de]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(f),[pe,ve]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(h),[me,fe]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(b),[ye,he]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),we=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(H),{anchorRefs:be,activeAnchor:Ee}=O(t),Se=e=>null==e?void 0:e.getAttributeNames().reduce(((t,o)=>{var r;if(o.startsWith("data-tooltip-")){t[o.replace(/^data-tooltip-/,"")]=null!==(r=null==e?void 0:e.getAttribute(o))&&void 0!==r?r:null}return t}),{}),ge=e=>{const t={place:e=>{var t;Z(null!==(t=e)&&void 0!==t?t:v)},content:e=>{X(null!=e?e:n)},html:e=>{G(null!=e?e:s)},variant:e=>{var t;Q(null!==(t=e)&&void 0!==t?t:p)},offset:e=>{te(null===e?m:Number(e))},wrapper:e=>{var t;de(null!==(t=e)&&void 0!==t?t:f)},events:e=>{const t=null==e?void 0:e.split(" ");ve(null!=t?t:h)},"position-strategy":e=>{var t;fe(null!==(t=e)&&void 0!==t?t:b)},"delay-show":e=>{re(null===e?S:Number(e))},"delay-hide":e=>{ne(null===e?g:Number(e))},float:e=>{ie(null===e?_:"true"===e)},hidden:e=>{ae(null===e?A:"true"===e)}};Object.values(t).forEach((e=>e(null))),Object.entries(e).forEach((([e,o])=>{var r;null===(r=t[e])||void 0===r||r.call(t,o)}))};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{X(n)}),[n]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{G(s)}),[s]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{Z(v)}),[v]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{Q(p)}),[p]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{te(m)}),[m]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{re(S)}),[S]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{ne(g)}),[g]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{ie(_)}),[_]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{ae(A)}),[A]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{fe(b)}),[b]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{we.current!==H&&console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.")}),[H]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{"undefined"!=typeof window&&window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles",{detail:{disableCore:"core"===H,disableBase:H}}))}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{var e;const o=new Set(be);let n=l;if(!n&&t&&(n=`[data-tooltip-id='${t}']`),n)try{document.querySelectorAll(n).forEach((e=>{o.add({current:e})}))}catch(e){console.warn(`[react-tooltip] "${n}" is not a valid CSS selector`)}const c=document.querySelector(`[id='${r}']`);if(c&&o.add({current:c}),!o.size)return()=>null;const i=null!==(e=null!=ye?ye:c)&&void 0!==e?e:Ee.current,s=new MutationObserver((e=>{e.forEach((e=>{var t;if(!i||"attributes"!==e.type||!(null===(t=e.attributeName)||void 0===t?void 0:t.startsWith("data-tooltip-")))return;const o=Se(i);ge(o)}))})),a={attributes:!0,childList:!1,subtree:!1};if(i){const e=Se(i);ge(e),s.observe(i,a)}return()=>{s.disconnect()}}),[be,Ee,ye,r,l]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{(null==B?void 0:B.border)&&console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."),q&&!CSS.supports("border",`${q}`)&&console.warn(`[react-tooltip] "${q}" is not a valid \`border\`.`),(null==B?void 0:B.opacity)&&console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."),M&&!CSS.supports("opacity",`${M}`)&&console.warn(`[react-tooltip] "${M}" is not a valid \`opacity\`.`)}),[]);let _e=y;const Ae=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);if(a){const t=a({content:null!=U?U:null,activeAnchor:ye});_e=t?react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{ref:Ae,className:"react-tooltip-content-wrapper"},t):null}else U&&(_e=U);Y&&(_e=react__WEBPACK_IMPORTED_MODULE_0__.createElement(j,{content:Y}));const Te={id:t,anchorId:r,anchorSelect:l,className:u,classNameArrow:d,content:_e,contentWrapperRef:Ae,place:V,variant:J,offset:ee,wrapper:ue,events:pe,openOnClick:w,positionStrategy:me,middlewares:E,delayShow:oe,delayHide:le,float:ce,hidden:se,noArrow:T,clickable:k,closeOnEsc:L,closeOnScroll:C,closeOnResize:x,openEvents:R,closeEvents:N,globalCloseEvents:$,style:B,position:z,isOpen:D,border:q,opacity:M,arrowColor:W,setIsOpen:P,afterShow:F,afterHide:K,activeAnchor:ye,setActiveAnchor:e=>he(e)};return react__WEBPACK_IMPORTED_MODULE_0__.createElement(I,{...Te})};"undefined"!=typeof window&&window.addEventListener("react-tooltip-inject-styles",(e=>{e.detail.disableCore||b({css:`:root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}`,type:"core"}),e.detail.disableBase||b({css:`
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`,type:"base"})}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_tooltip_dist_react_tooltip_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-tooltip/dist/react-tooltip.css */ "./node_modules/react-tooltip/dist/react-tooltip.min.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _scripts_Acrylic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scripts/Acrylic */ "./src/scripts/Acrylic.js");






if (document.querySelector('#accrylicQuote')) {
  react_dom__WEBPACK_IMPORTED_MODULE_2___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_scripts_Acrylic__WEBPACK_IMPORTED_MODULE_5__["default"], null), document.querySelector('#accrylicQuote'));
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map