/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@floating-ui/react/dist/floating-ui.react.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@floating-ui/react/dist/floating-ui.react.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Composite: () => (/* binding */ Composite),
/* harmony export */   CompositeItem: () => (/* binding */ CompositeItem),
/* harmony export */   FloatingArrow: () => (/* binding */ FloatingArrow),
/* harmony export */   FloatingDelayGroup: () => (/* binding */ FloatingDelayGroup),
/* harmony export */   FloatingFocusManager: () => (/* binding */ FloatingFocusManager),
/* harmony export */   FloatingList: () => (/* binding */ FloatingList),
/* harmony export */   FloatingNode: () => (/* binding */ FloatingNode),
/* harmony export */   FloatingOverlay: () => (/* binding */ FloatingOverlay),
/* harmony export */   FloatingPortal: () => (/* binding */ FloatingPortal),
/* harmony export */   FloatingTree: () => (/* binding */ FloatingTree),
/* harmony export */   arrow: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.arrow),
/* harmony export */   autoPlacement: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.autoPlacement),
/* harmony export */   autoUpdate: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_3__.autoUpdate),
/* harmony export */   computePosition: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_3__.computePosition),
/* harmony export */   detectOverflow: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_3__.detectOverflow),
/* harmony export */   flip: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.flip),
/* harmony export */   getOverflowAncestors: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getOverflowAncestors),
/* harmony export */   hide: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.hide),
/* harmony export */   inline: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.inline),
/* harmony export */   inner: () => (/* binding */ inner),
/* harmony export */   limitShift: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.limitShift),
/* harmony export */   offset: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.offset),
/* harmony export */   platform: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_3__.platform),
/* harmony export */   safePolygon: () => (/* binding */ safePolygon),
/* harmony export */   shift: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.shift),
/* harmony export */   size: () => (/* reexport safe */ _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.size),
/* harmony export */   useClick: () => (/* binding */ useClick),
/* harmony export */   useClientPoint: () => (/* binding */ useClientPoint),
/* harmony export */   useDelayGroup: () => (/* binding */ useDelayGroup),
/* harmony export */   useDelayGroupContext: () => (/* binding */ useDelayGroupContext),
/* harmony export */   useDismiss: () => (/* binding */ useDismiss),
/* harmony export */   useFloating: () => (/* binding */ useFloating),
/* harmony export */   useFloatingNodeId: () => (/* binding */ useFloatingNodeId),
/* harmony export */   useFloatingParentNodeId: () => (/* binding */ useFloatingParentNodeId),
/* harmony export */   useFloatingPortalNode: () => (/* binding */ useFloatingPortalNode),
/* harmony export */   useFloatingRootContext: () => (/* binding */ useFloatingRootContext),
/* harmony export */   useFloatingTree: () => (/* binding */ useFloatingTree),
/* harmony export */   useFocus: () => (/* binding */ useFocus),
/* harmony export */   useHover: () => (/* binding */ useHover),
/* harmony export */   useId: () => (/* binding */ useId),
/* harmony export */   useInnerOffset: () => (/* binding */ useInnerOffset),
/* harmony export */   useInteractions: () => (/* binding */ useInteractions),
/* harmony export */   useListItem: () => (/* binding */ useListItem),
/* harmony export */   useListNavigation: () => (/* binding */ useListNavigation),
/* harmony export */   useMergeRefs: () => (/* binding */ useMergeRefs),
/* harmony export */   useRole: () => (/* binding */ useRole),
/* harmony export */   useTransitionStatus: () => (/* binding */ useTransitionStatus),
/* harmony export */   useTransitionStyles: () => (/* binding */ useTransitionStyles),
/* harmony export */   useTypeahead: () => (/* binding */ useTypeahead)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @floating-ui/react/utils */ "./node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs");
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @floating-ui/utils */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs");
/* harmony import */ var _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @floating-ui/react-dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");
/* harmony import */ var tabbable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tabbable */ "./node_modules/tabbable/dist/index.esm.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @floating-ui/react-dom */ "./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs");
/* harmony import */ var _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @floating-ui/react-dom */ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");










/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 * @see https://floating-ui.com/docs/react-utils#usemergerefs
 */
function useMergeRefs(refs) {
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null;
    }
    return value => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

// https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
const SafeReact = {
  ...react__WEBPACK_IMPORTED_MODULE_0__
};

const useInsertionEffect = SafeReact.useInsertionEffect;
const useSafeInsertionEffect = useInsertionEffect || (fn => fn());
function useEffectEvent(callback) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(() => {
    if (true) {
      throw new Error('Cannot call an event handler while rendering.');
    }
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
function isDifferentRow(index, cols, prevRow) {
  return Math.floor(index / cols) !== prevRow;
}
function isIndexOutOfBounds(listRef, index) {
  return index < 0 || index >= listRef.current.length;
}
function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices
  });
}
function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  let index = startingIndex;
  do {
    index += decrement ? -amount : amount;
  } while (index >= 0 && index <= list.length - 1 && isDisabled(list, index, disabledIndices));
  return index;
}
function getGridNavigatedIndex(elementsRef, _ref) {
  let {
    event,
    orientation,
    loop,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  } = _ref;
  let nextIndex = prevIndex;
  if (event.key === ARROW_UP) {
    stop && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
    if (prevIndex === -1) {
      nextIndex = maxIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: nextIndex,
        amount: cols,
        decrement: true,
        disabledIndices
      });
      if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
        const col = prevIndex % cols;
        const maxCol = maxIndex % cols;
        const offset = maxIndex - (maxCol - col);
        if (maxCol === col) {
          nextIndex = maxIndex;
        } else {
          nextIndex = maxCol > col ? offset : offset - cols;
        }
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (event.key === ARROW_DOWN) {
    stop && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
    if (prevIndex === -1) {
      nextIndex = minIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: prevIndex,
        amount: cols,
        disabledIndices
      });
      if (loop && prevIndex + cols > maxIndex) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex % cols - cols,
          amount: cols,
          disabledIndices
        });
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }

  // Remains on the same row/column.
  if (orientation === 'both') {
    const prevRow = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_6__.floor)(prevIndex / cols);
    if (event.key === ARROW_RIGHT) {
      stop && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === ARROW_LEFT) {
      stop && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex + (cols - prevIndex % cols),
          decrement: true,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_6__.floor)(maxIndex / cols) === prevRow;
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      if (loop && lastRow) {
        nextIndex = event.key === ARROW_LEFT ? maxIndex : findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}

/** For each cell index, gets the item index that occupies that cell */
function buildCellMap(sizes, cols, dense) {
  const cellMap = [];
  let startIndex = 0;
  sizes.forEach((_ref2, index) => {
    let {
      width,
      height
    } = _ref2;
    if (width > cols) {
      if (true) {
        throw new Error("[Floating UI]: Invalid grid - item width at index " + index + " is greater than grid columns");
      }
    }
    let itemPlaced = false;
    if (dense) {
      startIndex = 0;
    }
    while (!itemPlaced) {
      const targetCells = [];
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          targetCells.push(startIndex + i + j * cols);
        }
      }
      if (startIndex % cols + width <= cols && targetCells.every(cell => cellMap[cell] == null)) {
        targetCells.forEach(cell => {
          cellMap[cell] = index;
        });
        itemPlaced = true;
      } else {
        startIndex++;
      }
    }
  });

  // convert into a non-sparse array
  return [...cellMap];
}

/** Gets cell index of an item's corner or -1 when index is -1. */
function getCellIndexOfCorner(index, sizes, cellMap, cols, corner) {
  if (index === -1) return -1;
  const firstCellIndex = cellMap.indexOf(index);
  const sizeItem = sizes[index];
  switch (corner) {
    case 'tl':
      return firstCellIndex;
    case 'tr':
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + sizeItem.width - 1;
    case 'bl':
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + (sizeItem.height - 1) * cols;
    case 'br':
      return cellMap.lastIndexOf(index);
  }
}

/** Gets all cell indices that correspond to the specified indices */
function getCellIndices(indices, cellMap) {
  return cellMap.flatMap((index, cellIndex) => indices.includes(index) ? [cellIndex] : []);
}
function isDisabled(list, index, disabledIndices) {
  if (disabledIndices) {
    return disabledIndices.includes(index);
  }
  const element = list[index];
  return element == null || element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
}

let rafId = 0;
function enqueueFocus(el, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    preventScroll = false,
    cancelPrevious = true,
    sync = false
  } = options;
  cancelPrevious && cancelAnimationFrame(rafId);
  const exec = () => el == null ? void 0 : el.focus({
    preventScroll
  });
  if (sync) {
    exec();
  } else {
    rafId = requestAnimationFrame(exec);
  }
}

var index = typeof document !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

function sortByDocumentPosition(a, b) {
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1;
  }
  if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1;
  }
  return 0;
}
function areMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (const [key, value] of map1.entries()) {
    if (value !== map2.get(key)) {
      return false;
    }
  }
  return true;
}
const FloatingListContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  register: () => {},
  unregister: () => {},
  map: /*#__PURE__*/new Map(),
  elementsRef: {
    current: []
  }
});
/**
 * Provides context for a list of items within the floating element.
 * @see https://floating-ui.com/docs/FloatingList
 */
function FloatingList(props) {
  const {
    children,
    elementsRef,
    labelsRef
  } = props;
  const [map, setMap] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => new Map());
  const register = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(node => {
    setMap(prevMap => new Map(prevMap).set(node, null));
  }, []);
  const unregister = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(node => {
    setMap(prevMap => {
      const map = new Map(prevMap);
      map.delete(node);
      return map;
    });
  }, []);
  index(() => {
    const newMap = new Map(map);
    const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition);
    nodes.forEach((node, index) => {
      newMap.set(node, index);
    });
    if (!areMapsEqual(map, newMap)) {
      setMap(newMap);
    }
  }, [map]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FloatingListContext.Provider, {
    value: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
      register,
      unregister,
      map,
      elementsRef,
      labelsRef
    }), [register, unregister, map, elementsRef, labelsRef])
  }, children);
}
/**
 * Used to register a list item and its index (DOM position) in the
 * `FloatingList`.
 * @see https://floating-ui.com/docs/FloatingList#uselistitem
 */
function useListItem(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    label
  } = props;
  const {
    register,
    unregister,
    map,
    elementsRef,
    labelsRef
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FloatingListContext);
  const [index$1, setIndex] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const componentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(node => {
    componentRef.current = node;
    if (index$1 !== null) {
      elementsRef.current[index$1] = node;
      if (labelsRef) {
        var _node$textContent;
        const isLabelDefined = label !== undefined;
        labelsRef.current[index$1] = isLabelDefined ? label : (_node$textContent = node == null ? void 0 : node.textContent) != null ? _node$textContent : null;
      }
    }
  }, [index$1, elementsRef, labelsRef, label]);
  index(() => {
    const node = componentRef.current;
    if (node) {
      register(node);
      return () => {
        unregister(node);
      };
    }
  }, [register, unregister]);
  index(() => {
    const index = componentRef.current ? map.get(componentRef.current) : null;
    if (index != null) {
      setIndex(index);
    }
  }, [map]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    ref,
    index: index$1 == null ? -1 : index$1
  }), [index$1, ref]);
}

function renderJsx(render, computedProps) {
  if (typeof render === 'function') {
    return render(computedProps);
  }
  if (render) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(render, computedProps);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", computedProps);
}
const CompositeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  activeIndex: 0,
  onNavigate: () => {}
});
const horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
const verticalKeys = [ARROW_UP, ARROW_DOWN];
const allKeys = [...horizontalKeys, ...verticalKeys];

/**
 * Creates a single tab stop whose items are navigated by arrow keys, which
 * provides list navigation outside of floating element contexts.
 *
 * This is useful to enable navigation of a list of items that aren’t part of a
 * floating element. A menubar is an example of a composite, with each reference
 * element being an item.
 * @see https://floating-ui.com/docs/Composite
 */
const Composite = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Composite(props, forwardedRef) {
  const {
    render,
    orientation = 'both',
    loop = true,
    cols = 1,
    disabledIndices,
    activeIndex: externalActiveIndex,
    onNavigate: externalSetActiveIndex,
    itemSizes,
    dense = false,
    ...domProps
  } = props;
  const [internalActiveIndex, internalSetActiveIndex] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
  const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
  const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
  const elementsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([]);
  const renderElementProps = render && typeof render !== 'function' ? render.props : {};
  const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    activeIndex,
    onNavigate
  }), [activeIndex, onNavigate]);
  const isGrid = cols > 1;
  function handleKeyDown(event) {
    if (!allKeys.includes(event.key)) return;
    let nextIndex = activeIndex;
    const minIndex = getMinIndex(elementsRef, disabledIndices);
    const maxIndex = getMaxIndex(elementsRef, disabledIndices);
    if (isGrid) {
      const sizes = itemSizes || Array.from({
        length: elementsRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      // To calculate movements on the grid, we use hypothetical cell indices
      // as if every item was 1x1, then convert back to real indices.
      const cellMap = buildCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex(index => index != null && !isDisabled(elementsRef.current, index, disabledIndices));
      // last enabled index
      const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex) => index != null && !isDisabled(elementsRef.current, index, disabledIndices) ? cellIndex : foundIndex, -1);
      nextIndex = cellMap[getGridNavigatedIndex({
        current: cellMap.map(itemIndex => itemIndex ? elementsRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getCellIndices([...(disabledIndices || elementsRef.current.map((_, index) => isDisabled(elementsRef.current, index) ? index : undefined)), undefined], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getCellIndexOfCorner(activeIndex > maxIndex ? minIndex : activeIndex, sizes, cellMap, cols,
        // use a corner matching the edge closest to the direction we're
        // moving in so we don't end up in the same item. Prefer
        // top/left over bottom/right.
        event.key === ARROW_DOWN ? 'bl' : event.key === ARROW_RIGHT ? 'tr' : 'tl')
      })]; // navigated cell will never be nullish
    }
    const toEndKeys = {
      horizontal: [ARROW_RIGHT],
      vertical: [ARROW_DOWN],
      both: [ARROW_RIGHT, ARROW_DOWN]
    }[orientation];
    const toStartKeys = {
      horizontal: [ARROW_LEFT],
      vertical: [ARROW_UP],
      both: [ARROW_LEFT, ARROW_UP]
    }[orientation];
    const preventedKeys = isGrid ? allKeys : {
      horizontal: horizontalKeys,
      vertical: verticalKeys,
      both: allKeys
    }[orientation];
    if (nextIndex === activeIndex && [...toEndKeys, ...toStartKeys].includes(event.key)) {
      if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) {
        nextIndex = minIndex;
      } else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) {
        nextIndex = maxIndex;
      } else {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: nextIndex,
          decrement: toStartKeys.includes(event.key),
          disabledIndices
        });
      }
    }
    if (nextIndex !== activeIndex && !isIndexOutOfBounds(elementsRef, nextIndex)) {
      event.stopPropagation();
      if (preventedKeys.includes(event.key)) {
        event.preventDefault();
      }
      onNavigate(nextIndex);

      // Wait for FocusManager `returnFocus` to execute.
      queueMicrotask(() => {
        enqueueFocus(elementsRef.current[nextIndex]);
      });
    }
  }
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: forwardedRef,
    'aria-orientation': orientation === 'both' ? undefined : orientation,
    onKeyDown(e) {
      domProps.onKeyDown == null || domProps.onKeyDown(e);
      renderElementProps.onKeyDown == null || renderElementProps.onKeyDown(e);
      handleKeyDown(e);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CompositeContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FloatingList, {
    elementsRef: elementsRef
  }, renderJsx(render, computedProps)));
});
/**
 * @see https://floating-ui.com/docs/Composite
 */
const CompositeItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function CompositeItem(props, forwardedRef) {
  const {
    render,
    ...domProps
  } = props;
  const renderElementProps = render && typeof render !== 'function' ? render.props : {};
  const {
    activeIndex,
    onNavigate
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(CompositeContext);
  const {
    ref,
    index
  } = useListItem();
  const mergedRef = useMergeRefs([ref, forwardedRef, renderElementProps.ref]);
  const isActive = activeIndex === index;
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: mergedRef,
    tabIndex: isActive ? 0 : -1,
    'data-active': isActive ? '' : undefined,
    onFocus(e) {
      domProps.onFocus == null || domProps.onFocus(e);
      renderElementProps.onFocus == null || renderElementProps.onFocus(e);
      onNavigate(index);
    }
  };
  return renderJsx(render, computedProps);
});

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

let serverHandoffComplete = false;
let count = 0;
const genId = () => // Ensure the id is unique with multiple independent versions of Floating UI
// on <React 18
"floating-ui-" + Math.random().toString(36).slice(2, 6) + count++;
function useFloatingId() {
  const [id, setId] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => serverHandoffComplete ? genId() : undefined);
  index(() => {
    if (id == null) {
      setId(genId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
const useReactId = SafeReact.useId;

/**
 * Uses React 18's built-in `useId()` when available, or falls back to a
 * slightly less performant (requiring a double render) implementation for
 * earlier React versions.
 * @see https://floating-ui.com/docs/react-utils#useid
 */
const useId = useReactId || useFloatingId;

let devMessageSet;
if (true) {
  devMessageSet = /*#__PURE__*/new Set();
}
function warn() {
  var _devMessageSet;
  for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }
  const message = "Floating UI: " + messages.join(' ');
  if (!((_devMessageSet = devMessageSet) != null && _devMessageSet.has(message))) {
    var _devMessageSet2;
    (_devMessageSet2 = devMessageSet) == null || _devMessageSet2.add(message);
    console.warn(message);
  }
}
function error() {
  var _devMessageSet3;
  for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    messages[_key2] = arguments[_key2];
  }
  const message = "Floating UI: " + messages.join(' ');
  if (!((_devMessageSet3 = devMessageSet) != null && _devMessageSet3.has(message))) {
    var _devMessageSet4;
    (_devMessageSet4 = devMessageSet) == null || _devMessageSet4.add(message);
    console.error(message);
  }
}

/**
 * Renders a pointing arrow triangle.
 * @see https://floating-ui.com/docs/FloatingArrow
 */
const FloatingArrow = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function FloatingArrow(props, ref) {
  const {
    context: {
      placement,
      elements: {
        floating
      },
      middlewareData: {
        arrow
      }
    },
    width = 14,
    height = 7,
    tipRadius = 0,
    strokeWidth = 0,
    staticOffset,
    stroke,
    d,
    style: {
      transform,
      ...restStyle
    } = {},
    ...rest
  } = props;
  if (true) {
    if (!ref) {
      warn('The `ref` prop is required for `FloatingArrow`.');
    }
  }
  const clipPathId = useId();
  const [isRTL, setIsRTL] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);

  // https://github.com/floating-ui/floating-ui/issues/2932
  index(() => {
    if (!floating) return;
    const isRTL = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getComputedStyle)(floating).direction === 'rtl';
    if (isRTL) {
      setIsRTL(true);
    }
  }, [floating]);
  if (!floating) {
    return null;
  }

  // Strokes must be double the border width, this ensures the stroke's width
  // works as you'd expect.
  const computedStrokeWidth = strokeWidth * 2;
  const halfStrokeWidth = computedStrokeWidth / 2;
  const svgX = width / 2 * (tipRadius / -8 + 1);
  const svgY = height / 2 * tipRadius / 4;
  const [side, alignment] = placement.split('-');
  const isCustomShape = !!d;
  const isVerticalSide = side === 'top' || side === 'bottom';
  const yOffsetProp = staticOffset && alignment === 'end' ? 'bottom' : 'top';
  let xOffsetProp = staticOffset && alignment === 'end' ? 'right' : 'left';
  if (staticOffset && isRTL) {
    xOffsetProp = alignment === 'end' ? 'left' : 'right';
  }
  const arrowX = (arrow == null ? void 0 : arrow.x) != null ? staticOffset || arrow.x : '';
  const arrowY = (arrow == null ? void 0 : arrow.y) != null ? staticOffset || arrow.y : '';
  const dValue = d || 'M0,0' + (" H" + width) + (" L" + (width - svgX) + "," + (height - svgY)) + (" Q" + width / 2 + "," + height + " " + svgX + "," + (height - svgY)) + ' Z';
  const rotation = {
    top: isCustomShape ? 'rotate(180deg)' : '',
    left: isCustomShape ? 'rotate(90deg)' : 'rotate(-90deg)',
    bottom: isCustomShape ? '' : 'rotate(180deg)',
    right: isCustomShape ? 'rotate(-90deg)' : 'rotate(90deg)'
  }[side];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({}, rest, {
    "aria-hidden": true,
    ref: ref,
    width: isCustomShape ? width : width + computedStrokeWidth,
    height: width,
    viewBox: "0 0 " + width + " " + (height > width ? height : width),
    style: {
      position: 'absolute',
      pointerEvents: 'none',
      [xOffsetProp]: arrowX,
      [yOffsetProp]: arrowY,
      [side]: isVerticalSide || isCustomShape ? '100%' : "calc(100% - " + computedStrokeWidth / 2 + "px)",
      transform: "" + rotation + (transform != null ? transform : ''),
      ...restStyle
    }
  }), computedStrokeWidth > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    clipPath: "url(#" + clipPathId + ")",
    fill: "none",
    stroke: stroke
    // Account for the stroke on the fill path rendered below.
    ,
    strokeWidth: computedStrokeWidth + (d ? 0 : 1),
    d: dValue
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: computedStrokeWidth && !d ? rest.fill : 'none',
    d: dValue
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: clipPathId
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    x: -halfStrokeWidth,
    y: halfStrokeWidth * (isCustomShape ? -1 : 1),
    width: width + computedStrokeWidth,
    height: width
  })));
});

function createPubSub() {
  const map = new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null || _map$get.forEach(handler => handler(data));
    },
    on(event, listener) {
      map.set(event, [...(map.get(event) || []), listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter(l => l !== listener)) || []);
    }
  };
}

const FloatingNodeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
const FloatingTreeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

/**
 * Returns the parent node id for nested floating elements, if available.
 * Returns `null` for top-level floating elements.
 */
const useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};

/**
 * Returns the nearest floating tree context, if available.
 */
const useFloatingTree = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(FloatingTreeContext);

/**
 * Registers a node into the `FloatingTree`, returning its id.
 * @see https://floating-ui.com/docs/FloatingTree
 */
function useFloatingNodeId(customParentId) {
  const id = useId();
  const tree = useFloatingTree();
  const reactParentId = useFloatingParentNodeId();
  const parentId = customParentId || reactParentId;
  index(() => {
    const node = {
      id,
      parentId
    };
    tree == null || tree.addNode(node);
    return () => {
      tree == null || tree.removeNode(node);
    };
  }, [tree, id, parentId]);
  return id;
}
/**
 * Provides parent node context for nested floating elements.
 * @see https://floating-ui.com/docs/FloatingTree
 */
function FloatingNode(props) {
  const {
    children,
    id
  } = props;
  const parentId = useFloatingParentNodeId();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FloatingNodeContext.Provider, {
    value: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
      id,
      parentId
    }), [id, parentId])
  }, children);
}
/**
 * Provides context for nested floating elements when they are not children of
 * each other on the DOM.
 * This is not necessary in all cases, except when there must be explicit communication between parent and child floating elements. It is necessary for:
 * - The `bubbles` option in the `useDismiss()` Hook
 * - Nested virtual list navigation
 * - Nested floating elements that each open on hover
 * - Custom communication between parent and child floating elements
 * @see https://floating-ui.com/docs/FloatingTree
 */
function FloatingTree(props) {
  const {
    children
  } = props;
  const nodesRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([]);
  const addNode = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(node => {
    nodesRef.current = [...nodesRef.current, node];
  }, []);
  const removeNode = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(node => {
    nodesRef.current = nodesRef.current.filter(n => n !== node);
  }, []);
  const events = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => createPubSub())[0];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FloatingTreeContext.Provider, {
    value: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
      nodesRef,
      addNode,
      removeNode,
      events
    }), [addNode, removeNode, events])
  }, children);
}

function createAttribute(name) {
  return "data-floating-ui-" + name;
}

function useLatestRef(value) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}

const safePolygonIdentifier = /*#__PURE__*/createAttribute('safe-polygon');
function getDelay(value, prop, pointerType) {
  if (pointerType && !(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isMouseLikePointerType)(pointerType)) {
    return 0;
  }
  if (typeof value === 'number') {
    return value;
  }
  return value == null ? void 0 : value[prop];
}
/**
 * Opens the floating element while hovering over the reference element, like
 * CSS `:hover`.
 * @see https://floating-ui.com/docs/useHover
 */
function useHover(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    elements
  } = context;
  const {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true
  } = props;
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const handleCloseRef = useLatestRef(handleClose);
  const delayRef = useLatestRef(delay);
  const openRef = useLatestRef(open);
  const pointerTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  const timeoutRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(-1);
  const handlerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  const restTimeoutRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(-1);
  const blockMouseMoveRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
  const performedPointerEventsMutationRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const unbindMouseMoveRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(() => {});
  const isHoverOpen = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    var _dataRef$current$open;
    const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
    return (type == null ? void 0 : type.includes('mouse')) && type !== 'mousedown';
  }, [dataRef]);

  // When closing before opening, clear the delay timeouts to cancel it
  // from showing.
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!enabled) return;
    function onOpenChange(_ref) {
      let {
        open
      } = _ref;
      if (!open) {
        clearTimeout(timeoutRef.current);
        clearTimeout(restTimeoutRef.current);
        blockMouseMoveRef.current = true;
      }
    }
    events.on('openchange', onOpenChange);
    return () => {
      events.off('openchange', onOpenChange);
    };
  }, [enabled, events]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!enabled) return;
    if (!handleCloseRef.current) return;
    if (!open) return;
    function onLeave(event) {
      if (isHoverOpen()) {
        onOpenChange(false, event, 'hover');
      }
    }
    const html = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(elements.floating).documentElement;
    html.addEventListener('mouseleave', onLeave);
    return () => {
      html.removeEventListener('mouseleave', onLeave);
    };
  }, [elements.floating, open, onOpenChange, enabled, handleCloseRef, isHoverOpen]);
  const closeWithDelay = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (event, runElseBranch, reason) {
    if (runElseBranch === void 0) {
      runElseBranch = true;
    }
    if (reason === void 0) {
      reason = 'hover';
    }
    const closeDelay = getDelay(delayRef.current, 'close', pointerTypeRef.current);
    if (closeDelay && !handlerRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => onOpenChange(false, event, reason), closeDelay);
    } else if (runElseBranch) {
      clearTimeout(timeoutRef.current);
      onOpenChange(false, event, reason);
    }
  }, [delayRef, onOpenChange]);
  const cleanupMouseMoveHandler = useEffectEvent(() => {
    unbindMouseMoveRef.current();
    handlerRef.current = undefined;
  });
  const clearPointerEvents = useEffectEvent(() => {
    if (performedPointerEventsMutationRef.current) {
      const body = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(elements.floating).body;
      body.style.pointerEvents = '';
      body.removeAttribute(safePolygonIdentifier);
      performedPointerEventsMutationRef.current = false;
    }
  });

  // Registering the mouse events on the reference directly to bypass React's
  // delegation system. If the cursor was on a disabled element and then entered
  // the reference (no gap), `mouseenter` doesn't fire in the delegation system.
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!enabled) return;
    function isClickLikeOpenEvent() {
      return dataRef.current.openEvent ? ['click', 'mousedown'].includes(dataRef.current.openEvent.type) : false;
    }
    function onMouseEnter(event) {
      clearTimeout(timeoutRef.current);
      blockMouseMoveRef.current = false;
      if (mouseOnly && !(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isMouseLikePointerType)(pointerTypeRef.current) || restMs > 0 && !getDelay(delayRef.current, 'open')) {
        return;
      }
      const openDelay = getDelay(delayRef.current, 'open', pointerTypeRef.current);
      if (openDelay) {
        timeoutRef.current = window.setTimeout(() => {
          if (!openRef.current) {
            onOpenChange(true, event, 'hover');
          }
        }, openDelay);
      } else {
        onOpenChange(true, event, 'hover');
      }
    }
    function onMouseLeave(event) {
      if (isClickLikeOpenEvent()) return;
      unbindMouseMoveRef.current();
      const doc = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(elements.floating);
      clearTimeout(restTimeoutRef.current);
      if (handleCloseRef.current && dataRef.current.floatingContext) {
        // Prevent clearing `onScrollMouseLeave` timeout.
        if (!open) {
          clearTimeout(timeoutRef.current);
        }
        handlerRef.current = handleCloseRef.current({
          ...dataRef.current.floatingContext,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            closeWithDelay(event, true, 'safe-polygon');
          }
        });
        const handler = handlerRef.current;
        doc.addEventListener('mousemove', handler);
        unbindMouseMoveRef.current = () => {
          doc.removeEventListener('mousemove', handler);
        };
        return;
      }

      // Allow interactivity without `safePolygon` on touch devices. With a
      // pointer, a short close delay is an alternative, so it should work
      // consistently.
      const shouldClose = pointerTypeRef.current === 'touch' ? !(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(elements.floating, event.relatedTarget) : true;
      if (shouldClose) {
        closeWithDelay(event);
      }
    }

    // Ensure the floating element closes after scrolling even if the pointer
    // did not move.
    // https://github.com/floating-ui/floating-ui/discussions/1692
    function onScrollMouseLeave(event) {
      if (isClickLikeOpenEvent()) return;
      if (!dataRef.current.floatingContext) return;
      handleCloseRef.current == null || handleCloseRef.current({
        ...dataRef.current.floatingContext,
        tree,
        x: event.clientX,
        y: event.clientY,
        onClose() {
          clearPointerEvents();
          cleanupMouseMoveHandler();
          closeWithDelay(event);
        }
      })(event);
    }
    if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(elements.domReference)) {
      var _elements$floating;
      const ref = elements.domReference;
      open && ref.addEventListener('mouseleave', onScrollMouseLeave);
      (_elements$floating = elements.floating) == null || _elements$floating.addEventListener('mouseleave', onScrollMouseLeave);
      move && ref.addEventListener('mousemove', onMouseEnter, {
        once: true
      });
      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      return () => {
        var _elements$floating2;
        open && ref.removeEventListener('mouseleave', onScrollMouseLeave);
        (_elements$floating2 = elements.floating) == null || _elements$floating2.removeEventListener('mouseleave', onScrollMouseLeave);
        move && ref.removeEventListener('mousemove', onMouseEnter);
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [elements, enabled, context, mouseOnly, restMs, move, closeWithDelay, cleanupMouseMoveHandler, clearPointerEvents, onOpenChange, open, openRef, tree, delayRef, handleCloseRef, dataRef]);

  // Block pointer-events of every element other than the reference and floating
  // while the floating element is open and has a `handleClose` handler. Also
  // handles nested floating elements.
  // https://github.com/floating-ui/floating-ui/issues/1722
  index(() => {
    var _handleCloseRef$curre;
    if (!enabled) return;
    if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && _handleCloseRef$curre.__options.blockPointerEvents && isHoverOpen()) {
      const body = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(elements.floating).body;
      body.setAttribute(safePolygonIdentifier, '');
      body.style.pointerEvents = 'none';
      performedPointerEventsMutationRef.current = true;
      const floatingEl = elements.floating;
      if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(elements.domReference) && floatingEl) {
        var _tree$nodesRef$curren;
        const ref = elements.domReference;
        const parentFloating = tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find(node => node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren.elements.floating;
        if (parentFloating) {
          parentFloating.style.pointerEvents = '';
        }
        ref.style.pointerEvents = 'auto';
        floatingEl.style.pointerEvents = 'auto';
        return () => {
          ref.style.pointerEvents = '';
          floatingEl.style.pointerEvents = '';
        };
      }
    }
  }, [enabled, open, parentId, elements, tree, handleCloseRef, isHoverOpen]);
  index(() => {
    if (!open) {
      pointerTypeRef.current = undefined;
      cleanupMouseMoveHandler();
      clearPointerEvents();
    }
  }, [open, cleanupMouseMoveHandler, clearPointerEvents]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    return () => {
      cleanupMouseMoveHandler();
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      clearPointerEvents();
    };
  }, [enabled, elements.domReference, cleanupMouseMoveHandler, clearPointerEvents]);
  const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    function setPointerRef(event) {
      pointerTypeRef.current = event.pointerType;
    }
    return {
      onPointerDown: setPointerRef,
      onPointerEnter: setPointerRef,
      onMouseMove(event) {
        const {
          nativeEvent
        } = event;
        function handleMouseMove() {
          if (!blockMouseMoveRef.current && !openRef.current) {
            onOpenChange(true, nativeEvent, 'hover');
          }
        }
        if (mouseOnly && !(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isMouseLikePointerType)(pointerTypeRef.current)) {
          return;
        }
        if (open || restMs === 0) {
          return;
        }
        clearTimeout(restTimeoutRef.current);
        if (pointerTypeRef.current === 'touch') {
          handleMouseMove();
        } else {
          restTimeoutRef.current = window.setTimeout(handleMouseMove, restMs);
        }
      }
    };
  }, [mouseOnly, onOpenChange, open, openRef, restMs]);
  const floating = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    onMouseEnter() {
      clearTimeout(timeoutRef.current);
    },
    onMouseLeave(event) {
      closeWithDelay(event.nativeEvent, false);
    }
  }), [closeWithDelay]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}

const NOOP = () => {};
const FloatingDelayGroupContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: NOOP,
  setState: NOOP,
  isInstantPhase: false
});

/**
 * @deprecated
 * Use the return value of `useDelayGroup()` instead.
 */
const useDelayGroupContext = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(FloatingDelayGroupContext);
/**
 * Provides context for a group of floating elements that should share a
 * `delay`.
 * @see https://floating-ui.com/docs/FloatingDelayGroup
 */
function FloatingDelayGroup(props) {
  const {
    children,
    delay,
    timeoutMs = 0
  } = props;
  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useReducer((prev, next) => ({
    ...prev,
    ...next
  }), {
    delay,
    timeoutMs,
    initialDelay: delay,
    currentId: null,
    isInstantPhase: false
  });
  const initialCurrentIdRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const setCurrentId = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(currentId => {
    setState({
      currentId
    });
  }, []);
  index(() => {
    if (state.currentId) {
      if (initialCurrentIdRef.current === null) {
        initialCurrentIdRef.current = state.currentId;
      } else if (!state.isInstantPhase) {
        setState({
          isInstantPhase: true
        });
      }
    } else {
      if (state.isInstantPhase) {
        setState({
          isInstantPhase: false
        });
      }
      initialCurrentIdRef.current = null;
    }
  }, [state.currentId, state.isInstantPhase]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FloatingDelayGroupContext.Provider, {
    value: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
      ...state,
      setState,
      setCurrentId
    }), [state, setCurrentId])
  }, children);
}
/**
 * Enables grouping when called inside a component that's a child of a
 * `FloatingDelayGroup`.
 * @see https://floating-ui.com/docs/FloatingDelayGroup
 */
function useDelayGroup(context, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    open,
    onOpenChange,
    floatingId
  } = context;
  const {
    id: optionId
  } = options;
  const id = optionId != null ? optionId : floatingId;
  const groupContext = useDelayGroupContext();
  const {
    currentId,
    setCurrentId,
    initialDelay,
    setState,
    timeoutMs
  } = groupContext;
  index(() => {
    if (!currentId) return;
    setState({
      delay: {
        open: 1,
        close: getDelay(initialDelay, 'close')
      }
    });
    if (currentId !== id) {
      onOpenChange(false);
    }
  }, [id, onOpenChange, setState, currentId, initialDelay]);
  index(() => {
    function unset() {
      onOpenChange(false);
      setState({
        delay: initialDelay,
        currentId: null
      });
    }
    if (!currentId) return;
    if (!open && currentId === id) {
      if (timeoutMs) {
        const timeout = window.setTimeout(unset, timeoutMs);
        return () => {
          clearTimeout(timeout);
        };
      }
      unset();
    }
  }, [open, setState, currentId, id, onOpenChange, initialDelay, timeoutMs]);
  index(() => {
    if (setCurrentId === NOOP || !open) return;
    setCurrentId(id);
  }, [open, setCurrentId, id]);
  return groupContext;
}

function getAncestors(nodes, id) {
  var _nodes$find;
  let allAncestors = [];
  let currentParentId = (_nodes$find = nodes.find(node => node.id === id)) == null ? void 0 : _nodes$find.parentId;
  while (currentParentId) {
    const currentNode = nodes.find(node => node.id === currentParentId);
    currentParentId = currentNode == null ? void 0 : currentNode.parentId;
    if (currentNode) {
      allAncestors = allAncestors.concat(currentNode);
    }
  }
  return allAncestors;
}

function getChildren(nodes, id) {
  let allChildren = nodes.filter(node => {
    var _node$context;
    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  });
  let currentChildren = allChildren;
  while (currentChildren.length) {
    currentChildren = nodes.filter(node => {
      var _currentChildren;
      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some(n => {
        var _node$context2;
        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    });
    allChildren = allChildren.concat(currentChildren);
  }
  return allChildren;
}
function getDeepestNode(nodes, id) {
  let deepestNodeId;
  let maxDepth = -1;
  function findDeepest(nodeId, depth) {
    if (depth > maxDepth) {
      deepestNodeId = nodeId;
      maxDepth = depth;
    }
    const children = getChildren(nodes, nodeId);
    children.forEach(child => {
      findDeepest(child.id, depth + 1);
    });
  }
  findDeepest(id, 0);
  return nodes.find(node => node.id === deepestNodeId);
}

// Modified to add conditional `aria-hidden` support:
// https://github.com/theKashey/aria-hidden/blob/9220c8f4a4fd35f63bee5510a9f41a37264382d4/src/index.ts
let counterMap = /*#__PURE__*/new WeakMap();
let uncontrolledElementsSet = /*#__PURE__*/new WeakSet();
let markerMap = {};
let lockCount = 0;
const supportsInert = () => typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype;
const unwrapHost = node => node && (node.host || unwrapHost(node.parentNode));
const correctElements = (parent, targets) => targets.map(target => {
  if (parent.contains(target)) {
    return target;
  }
  const correctedTarget = unwrapHost(target);
  if (parent.contains(correctedTarget)) {
    return correctedTarget;
  }
  return null;
}).filter(x => x != null);
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
  const markerName = 'data-floating-ui-inert';
  const controlAttribute = inert ? 'inert' : ariaHidden ? 'aria-hidden' : null;
  const avoidElements = correctElements(body, uncorrectedAvoidElements);
  const elementsToKeep = new Set();
  const elementsToStop = new Set(avoidElements);
  const hiddenElements = [];
  if (!markerMap[markerName]) {
    markerMap[markerName] = new WeakMap();
  }
  const markerCounter = markerMap[markerName];
  avoidElements.forEach(keep);
  deep(body);
  elementsToKeep.clear();
  function keep(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    el.parentNode && keep(el.parentNode);
  }
  function deep(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    [].forEach.call(parent.children, node => {
      if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getNodeName)(node) === 'script') return;
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        const attr = controlAttribute ? node.getAttribute(controlAttribute) : null;
        const alreadyHidden = attr !== null && attr !== 'false';
        const counterValue = (counterMap.get(node) || 0) + 1;
        const markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenElements.push(node);
        if (counterValue === 1 && alreadyHidden) {
          uncontrolledElementsSet.add(node);
        }
        if (markerValue === 1) {
          node.setAttribute(markerName, '');
        }
        if (!alreadyHidden && controlAttribute) {
          node.setAttribute(controlAttribute, 'true');
        }
      }
    });
  }
  lockCount++;
  return () => {
    hiddenElements.forEach(element => {
      const counterValue = (counterMap.get(element) || 0) - 1;
      const markerValue = (markerCounter.get(element) || 0) - 1;
      counterMap.set(element, counterValue);
      markerCounter.set(element, markerValue);
      if (!counterValue) {
        if (!uncontrolledElementsSet.has(element) && controlAttribute) {
          element.removeAttribute(controlAttribute);
        }
        uncontrolledElementsSet.delete(element);
      }
      if (!markerValue) {
        element.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = new WeakMap();
      counterMap = new WeakMap();
      uncontrolledElementsSet = new WeakSet();
      markerMap = {};
    }
  };
}
function markOthers(avoidElements, ariaHidden, inert) {
  if (ariaHidden === void 0) {
    ariaHidden = false;
  }
  if (inert === void 0) {
    inert = false;
  }
  const body = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(avoidElements[0]).body;
  return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll('[aria-live]'))), body, ariaHidden, inert);
}

const getTabbableOptions = () => ({
  getShadowRoot: true,
  displayCheck:
  // JSDOM does not support the `tabbable` library. To solve this we can
  // check if `ResizeObserver` is a real function (not polyfilled), which
  // determines if the current environment is JSDOM-like.
  typeof ResizeObserver === 'function' && ResizeObserver.toString().includes('[native code]') ? 'full' : 'none'
});
function getTabbableIn(container, direction) {
  const allTabbable = (0,tabbable__WEBPACK_IMPORTED_MODULE_7__.tabbable)(container, getTabbableOptions());
  if (direction === 'prev') {
    allTabbable.reverse();
  }
  const activeIndex = allTabbable.indexOf((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(container)));
  const nextTabbableElements = allTabbable.slice(activeIndex + 1);
  return nextTabbableElements[0];
}
function getNextTabbable() {
  return getTabbableIn(document.body, 'next');
}
function getPreviousTabbable() {
  return getTabbableIn(document.body, 'prev');
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(containerElement, relatedTarget);
}
function disableFocusInside(container) {
  const tabbableElements = (0,tabbable__WEBPACK_IMPORTED_MODULE_7__.tabbable)(container, getTabbableOptions());
  tabbableElements.forEach(element => {
    element.dataset.tabindex = element.getAttribute('tabindex') || '';
    element.setAttribute('tabindex', '-1');
  });
}
function enableFocusInside(container) {
  const elements = container.querySelectorAll('[data-tabindex]');
  elements.forEach(element => {
    const tabindex = element.dataset.tabindex;
    delete element.dataset.tabindex;
    if (tabindex) {
      element.setAttribute('tabindex', tabindex);
    } else {
      element.removeAttribute('tabindex');
    }
  });
}
function getClosestTabbableElement(tabbableElements, element, floating) {
  const elementIndex = tabbableElements.indexOf(element);
  function traverseTabbableElements(next) {
    const attr = createAttribute('focus-guard');
    let index = elementIndex + (next ? 1 : 0);
    let currentElement = tabbableElements[index];
    while (currentElement && (!currentElement.isConnected || currentElement.hasAttribute(attr) || (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(floating, currentElement))) {
      if (next) {
        index++;
      } else {
        index--;
      }
      currentElement = tabbableElements[index];
    }
    return currentElement;
  }

  // First, try to find the next tabbable element
  const next = traverseTabbableElements(true);
  if (next) {
    return next;
  }

  // If we can't find a next tabbable element, try to find the previous one
  return traverseTabbableElements(false);
}

// See Diego Haz's Sandbox for making this logic work well on Safari/iOS:
// https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/FocusTrap.tsx

const HIDDEN_STYLES = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'fixed',
  whiteSpace: 'nowrap',
  width: '1px',
  top: 0,
  left: 0
};
let timeoutId;
function setActiveElementOnTab(event) {
  if (event.key === 'Tab') {
    event.target;
    clearTimeout(timeoutId);
  }
}
const FocusGuard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function FocusGuard(props, ref) {
  const [role, setRole] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  index(() => {
    if ((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isSafari)()) {
      // Unlike other screen readers such as NVDA and JAWS, the virtual cursor
      // on VoiceOver does trigger the onFocus event, so we can use the focus
      // trap element. On Safari, only buttons trigger the onFocus event.
      // NB: "group" role in the Sandbox no longer appears to work, must be a
      // button role.
      setRole('button');
    }
    document.addEventListener('keydown', setActiveElementOnTab);
    return () => {
      document.removeEventListener('keydown', setActiveElementOnTab);
    };
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    'aria-hidden': role ? undefined : true,
    [createAttribute('focus-guard')]: '',
    style: HIDDEN_STYLES
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", _extends({}, props, restProps));
});

const PortalContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
const attr = /*#__PURE__*/createAttribute('portal');
/**
 * @see https://floating-ui.com/docs/FloatingPortal#usefloatingportalnode
 */
function useFloatingPortalNode(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    id,
    root
  } = props;
  const uniqueId = useId();
  const portalContext = usePortalContext();
  const [portalNode, setPortalNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const portalNodeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  index(() => {
    return () => {
      portalNode == null || portalNode.remove();
      // Allow the subsequent layout effects to create a new node on updates.
      // The portal node will still be cleaned up on unmount.
      // https://github.com/floating-ui/floating-ui/issues/2454
      queueMicrotask(() => {
        portalNodeRef.current = null;
      });
    };
  }, [portalNode]);
  index(() => {
    // Wait for the uniqueId to be generated before creating the portal node in
    // React <18 (using `useFloatingId` instead of the native `useId`).
    // https://github.com/floating-ui/floating-ui/issues/2778
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    const existingIdRoot = id ? document.getElementById(id) : null;
    if (!existingIdRoot) return;
    const subRoot = document.createElement('div');
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, '');
    existingIdRoot.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, uniqueId]);
  index(() => {
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    let container = root || (portalContext == null ? void 0 : portalContext.portalNode);
    if (container && !(0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(container)) container = container.current;
    container = container || document.body;
    let idWrapper = null;
    if (id) {
      idWrapper = document.createElement('div');
      idWrapper.id = id;
      container.appendChild(idWrapper);
    }
    const subRoot = document.createElement('div');
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, '');
    container = idWrapper || container;
    container.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, root, uniqueId, portalContext]);
  return portalNode;
}
/**
 * Portals the floating element into a given container element — by default,
 * outside of the app root and into the body.
 * This is necessary to ensure the floating element can appear outside any
 * potential parent containers that cause clipping (such as `overflow: hidden`),
 * while retaining its location in the React tree.
 * @see https://floating-ui.com/docs/FloatingPortal
 */
function FloatingPortal(props) {
  const {
    children,
    id,
    root = null,
    preserveTabOrder = true
  } = props;
  const portalNode = useFloatingPortalNode({
    id,
    root
  });
  const [focusManagerState, setFocusManagerState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const beforeOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const afterOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const beforeInsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const afterInsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const shouldRenderGuards =
  // The FocusManager and therefore floating element are currently open/
  // rendered.
  !!focusManagerState &&
  // Guards are only for non-modal focus management.
  !focusManagerState.modal &&
  // Don't render if unmount is transitioning.
  focusManagerState.open && preserveTabOrder && !!(root || portalNode);

  // https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/TabbablePortal.tsx
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!portalNode || !preserveTabOrder || focusManagerState != null && focusManagerState.modal) {
      return;
    }

    // Make sure elements inside the portal element are tabbable only when the
    // portal has already been focused, either by tabbing into a focus trap
    // element outside or using the mouse.
    function onFocus(event) {
      if (portalNode && isOutsideEvent(event)) {
        const focusing = event.type === 'focusin';
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(portalNode);
      }
    }
    // Listen to the event on the capture phase so they run before the focus
    // trap elements onFocus prop is called.
    portalNode.addEventListener('focusin', onFocus, true);
    portalNode.addEventListener('focusout', onFocus, true);
    return () => {
      portalNode.removeEventListener('focusin', onFocus, true);
      portalNode.removeEventListener('focusout', onFocus, true);
    };
  }, [portalNode, preserveTabOrder, focusManagerState == null ? void 0 : focusManagerState.modal]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(PortalContext.Provider, {
    value: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
      preserveTabOrder,
      beforeOutsideRef,
      afterOutsideRef,
      beforeInsideRef,
      afterInsideRef,
      portalNode,
      setFocusManagerState
    }), [preserveTabOrder, portalNode])
  }, shouldRenderGuards && portalNode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FocusGuard, {
    "data-type": "outside",
    ref: beforeOutsideRef,
    onFocus: event => {
      if (isOutsideEvent(event, portalNode)) {
        var _beforeInsideRef$curr;
        (_beforeInsideRef$curr = beforeInsideRef.current) == null || _beforeInsideRef$curr.focus();
      } else {
        const prevTabbable = getPreviousTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
        prevTabbable == null || prevTabbable.focus();
      }
    }
  }), shouldRenderGuards && portalNode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    "aria-owns": portalNode.id,
    style: HIDDEN_STYLES
  }), portalNode && /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(children, portalNode), shouldRenderGuards && portalNode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FocusGuard, {
    "data-type": "outside",
    ref: afterOutsideRef,
    onFocus: event => {
      if (isOutsideEvent(event, portalNode)) {
        var _afterInsideRef$curre;
        (_afterInsideRef$curre = afterInsideRef.current) == null || _afterInsideRef$curre.focus();
      } else {
        const nextTabbable = getNextTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
        nextTabbable == null || nextTabbable.focus();
        (focusManagerState == null ? void 0 : focusManagerState.closeOnFocusOut) && (focusManagerState == null ? void 0 : focusManagerState.onOpenChange(false, event.nativeEvent));
      }
    }
  }));
}
const usePortalContext = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(PortalContext);

const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function addPreviouslyFocusedElement(element) {
  previouslyFocusedElements = previouslyFocusedElements.filter(el => el.isConnected);
  let tabbableEl = element;
  if (!tabbableEl || (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getNodeName)(tabbableEl) === 'body') return;
  if (!(0,tabbable__WEBPACK_IMPORTED_MODULE_7__.isTabbable)(tabbableEl, getTabbableOptions())) {
    const tabbableChild = (0,tabbable__WEBPACK_IMPORTED_MODULE_7__.tabbable)(tabbableEl, getTabbableOptions())[0];
    if (tabbableChild) {
      tabbableEl = tabbableChild;
    }
  }
  previouslyFocusedElements.push(tabbableEl);
  if (previouslyFocusedElements.length > LIST_LIMIT) {
    previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
  }
}
function getPreviouslyFocusedElement() {
  return previouslyFocusedElements.slice().reverse().find(el => el.isConnected);
}
const VisuallyHiddenDismiss = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function VisuallyHiddenDismiss(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", _extends({}, props, {
    type: "button",
    ref: ref,
    tabIndex: -1,
    style: HIDDEN_STYLES
  }));
});
/**
 * Provides focus management for the floating element.
 * @see https://floating-ui.com/docs/FloatingFocusManager
 */
function FloatingFocusManager(props) {
  const {
    context,
    children,
    disabled = false,
    order = ['content'],
    guards: _guards = true,
    initialFocus = 0,
    returnFocus = true,
    restoreFocus = false,
    modal = true,
    visuallyHiddenDismiss = false,
    closeOnFocusOut = true
  } = props;
  const {
    open,
    refs,
    nodeId,
    onOpenChange,
    events,
    dataRef,
    floatingId,
    elements: {
      domReference,
      floating
    }
  } = context;
  const ignoreInitialFocus = typeof initialFocus === 'number' && initialFocus < 0;
  // If the reference is a combobox and is typeable (e.g. input/textarea),
  // there are different focus semantics. The guards should not be rendered, but
  // aria-hidden should be applied to all nodes still. Further, the visually
  // hidden dismiss button should only appear at the end of the list, not the
  // start.
  const isUntrappedTypeableCombobox = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isTypeableCombobox)(domReference) && ignoreInitialFocus;

  // Force the guards to be rendered if the `inert` attribute is not supported.
  const guards = supportsInert() ? _guards : true;
  const orderRef = useLatestRef(order);
  const initialFocusRef = useLatestRef(initialFocus);
  const returnFocusRef = useLatestRef(returnFocus);
  const tree = useFloatingTree();
  const portalContext = usePortalContext();
  const startDismissButtonRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const endDismissButtonRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const preventReturnFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const isPointerDownRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const tabbableIndexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(-1);
  const isInsidePortal = portalContext != null;
  const firstElementChild = floating == null ? void 0 : floating.firstElementChild;
  // If the floating element is acting as a positioning wrapper rather than the
  // element that receives aria props, use it as the focus root instead.
  const floatingFocusNode = (firstElementChild == null ? void 0 : firstElementChild.id) === floatingId ? firstElementChild : floating;
  const getTabbableContent = useEffectEvent(function (container) {
    if (container === void 0) {
      container = floatingFocusNode;
    }
    return container ? (0,tabbable__WEBPACK_IMPORTED_MODULE_7__.tabbable)(container, getTabbableOptions()) : [];
  });
  const getTabbableElements = useEffectEvent(container => {
    const content = getTabbableContent(container);
    return orderRef.current.map(type => {
      if (domReference && type === 'reference') {
        return domReference;
      }
      if (floatingFocusNode && type === 'floating') {
        return floatingFocusNode;
      }
      return content;
    }).filter(Boolean).flat();
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (disabled) return;
    if (!modal) return;
    function onKeyDown(event) {
      if (event.key === 'Tab') {
        // The focus guards have nothing to focus, so we need to stop the event.
        if ((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(floatingFocusNode, (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(floatingFocusNode))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
          (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
        }
        const els = getTabbableElements();
        const target = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event);
        if (orderRef.current[0] === 'reference' && target === domReference) {
          (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
          if (event.shiftKey) {
            enqueueFocus(els[els.length - 1]);
          } else {
            enqueueFocus(els[1]);
          }
        }
        if (orderRef.current[1] === 'floating' && target === floatingFocusNode && event.shiftKey) {
          (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
          enqueueFocus(els[0]);
        }
      }
    }
    const doc = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(floatingFocusNode);
    doc.addEventListener('keydown', onKeyDown);
    return () => {
      doc.removeEventListener('keydown', onKeyDown);
    };
  }, [disabled, domReference, floatingFocusNode, modal, orderRef, isUntrappedTypeableCombobox, getTabbableContent, getTabbableElements]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (disabled) return;
    if (!floating) return;
    function handleFocusIn(event) {
      const target = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event);
      const tabbableContent = getTabbableContent();
      const tabbableIndex = tabbableContent.indexOf(target);
      if (tabbableIndex !== -1) {
        tabbableIndexRef.current = tabbableIndex;
      }
    }
    floating.addEventListener('focusin', handleFocusIn);
    return () => {
      floating.removeEventListener('focusin', handleFocusIn);
    };
  }, [disabled, floating, getTabbableContent]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (disabled) return;
    if (!closeOnFocusOut) return;

    // In Safari, buttons lose focus when pressing them.
    function handlePointerDown() {
      isPointerDownRef.current = true;
      setTimeout(() => {
        isPointerDownRef.current = false;
      });
    }
    function handleFocusOutside(event) {
      const relatedTarget = event.relatedTarget;
      queueMicrotask(() => {
        const movedToUnrelatedNode = !((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(domReference, relatedTarget) || (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(floating, relatedTarget) || (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(relatedTarget, floating) || (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(portalContext == null ? void 0 : portalContext.portalNode, relatedTarget) || relatedTarget != null && relatedTarget.hasAttribute(createAttribute('focus-guard')) || tree && (getChildren(tree.nodesRef.current, nodeId).find(node => {
          var _node$context, _node$context2;
          return (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)((_node$context = node.context) == null ? void 0 : _node$context.elements.floating, relatedTarget) || (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)((_node$context2 = node.context) == null ? void 0 : _node$context2.elements.domReference, relatedTarget);
        }) || getAncestors(tree.nodesRef.current, nodeId).find(node => {
          var _node$context3, _node$context4;
          return ((_node$context3 = node.context) == null ? void 0 : _node$context3.elements.floating) === relatedTarget || ((_node$context4 = node.context) == null ? void 0 : _node$context4.elements.domReference) === relatedTarget;
        })));

        // Restore focus to the previous tabbable element index to prevent
        // focus from being lost outside the floating tree.
        if (restoreFocus && movedToUnrelatedNode && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(floatingFocusNode)) === (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(floatingFocusNode).body) {
          // Let `FloatingPortal` effect knows that focus is still inside the
          // floating tree.
          if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(floatingFocusNode)) {
            floatingFocusNode == null || floatingFocusNode.focus();
          }
          const prevTabbableIndex = tabbableIndexRef.current;
          const tabbableContent = getTabbableContent();
          const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusNode;
          if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(nodeToFocus)) {
            nodeToFocus.focus();
          }
        }

        // Focus did not move inside the floating tree, and there are no tabbable
        // portal guards to handle closing.
        if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current &&
        // Fix React 18 Strict Mode returnFocus due to double rendering.
        relatedTarget !== getPreviouslyFocusedElement()) {
          preventReturnFocusRef.current = true;
          onOpenChange(false, event);
        }
      });
    }
    if (floating && (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(domReference)) {
      domReference.addEventListener('focusout', handleFocusOutside);
      domReference.addEventListener('pointerdown', handlePointerDown);
      floating.addEventListener('focusout', handleFocusOutside);
      return () => {
        domReference.removeEventListener('focusout', handleFocusOutside);
        domReference.removeEventListener('pointerdown', handlePointerDown);
        floating.removeEventListener('focusout', handleFocusOutside);
      };
    }
  }, [disabled, domReference, floating, floatingFocusNode, modal, nodeId, tree, portalContext, onOpenChange, closeOnFocusOut, restoreFocus, getTabbableContent, isUntrappedTypeableCombobox]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    var _portalContext$portal;
    if (disabled) return;

    // Don't hide portals nested within the parent portal.
    const portalNodes = Array.from((portalContext == null || (_portalContext$portal = portalContext.portalNode) == null ? void 0 : _portalContext$portal.querySelectorAll("[" + createAttribute('portal') + "]")) || []);
    if (floating) {
      const insideElements = [floating, ...portalNodes, startDismissButtonRef.current, endDismissButtonRef.current, orderRef.current.includes('reference') || isUntrappedTypeableCombobox ? domReference : null].filter(x => x != null);
      const cleanup = modal || isUntrappedTypeableCombobox ? markOthers(insideElements, guards, !guards) : markOthers(insideElements);
      return () => {
        cleanup();
      };
    }
  }, [disabled, domReference, floating, modal, orderRef, portalContext, isUntrappedTypeableCombobox, guards]);
  index(() => {
    if (disabled || !(0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(floatingFocusNode)) return;
    const doc = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(floatingFocusNode);
    const previouslyFocusedElement = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)(doc);

    // Wait for any layout effect state setters to execute to set `tabIndex`.
    queueMicrotask(() => {
      const focusableElements = getTabbableElements(floatingFocusNode);
      const initialFocusValue = initialFocusRef.current;
      const elToFocus = (typeof initialFocusValue === 'number' ? focusableElements[initialFocusValue] : initialFocusValue.current) || floatingFocusNode;
      const focusAlreadyInsideFloatingEl = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(floatingFocusNode, previouslyFocusedElement);
      if (!ignoreInitialFocus && !focusAlreadyInsideFloatingEl && open) {
        enqueueFocus(elToFocus, {
          preventScroll: elToFocus === floatingFocusNode
        });
      }
    });
  }, [disabled, open, floatingFocusNode, ignoreInitialFocus, getTabbableElements, initialFocusRef]);
  index(() => {
    if (disabled || !floatingFocusNode) return;
    let preventReturnFocusScroll = false;
    const doc = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(floatingFocusNode);
    const previouslyFocusedElement = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)(doc);
    const contextData = dataRef.current;
    let openEvent = contextData.openEvent;
    const domReference = refs.domReference.current;
    addPreviouslyFocusedElement(previouslyFocusedElement);

    // Dismissing via outside press should always ignore `returnFocus` to
    // prevent unwanted scrolling.
    function onOpenChange(_ref) {
      let {
        open,
        reason,
        event,
        nested
      } = _ref;
      if (open) {
        openEvent = event;
      }
      if (reason === 'escape-key' && refs.domReference.current) {
        addPreviouslyFocusedElement(refs.domReference.current);
      }
      if (reason === 'hover' && event.type === 'mouseleave') {
        preventReturnFocusRef.current = true;
      }
      if (reason !== 'outside-press') return;
      if (nested) {
        preventReturnFocusRef.current = false;
        preventReturnFocusScroll = true;
      } else {
        preventReturnFocusRef.current = !((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isVirtualClick)(event) || (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isVirtualPointerEvent)(event));
      }
    }
    events.on('openchange', onOpenChange);
    return () => {
      events.off('openchange', onOpenChange);
      const activeEl = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)(doc);
      const isFocusInsideFloatingTree = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(floating, activeEl) || tree && getChildren(tree.nodesRef.current, nodeId).some(node => {
        var _node$context5;
        return (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)((_node$context5 = node.context) == null ? void 0 : _node$context5.elements.floating, activeEl);
      });
      const shouldFocusReference = isFocusInsideFloatingTree || openEvent && ['click', 'mousedown'].includes(openEvent.type);
      if (shouldFocusReference && refs.domReference.current) {
        addPreviouslyFocusedElement(refs.domReference.current);
      }
      const returnContextElement = domReference || previouslyFocusedElement;
      const tabbableElements = (0,tabbable__WEBPACK_IMPORTED_MODULE_7__.tabbable)((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(returnContextElement).body, getTabbableOptions());

      // Wait for the return element to get potentially disconnected before
      // checking.
      queueMicrotask(() => {
        let returnElement = getPreviouslyFocusedElement();
        if (!returnElement && (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(returnContextElement) && floating) {
          returnElement = getClosestTabbableElement(tabbableElements, returnContextElement, floating);
        }
        if (
        // eslint-disable-next-line react-hooks/exhaustive-deps
        returnFocusRef.current && !preventReturnFocusRef.current && (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(returnElement) && (
        // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        returnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) {
          returnElement.focus({
            preventScroll: preventReturnFocusScroll
          });
        }
      });
    };
  }, [disabled, floating, floatingFocusNode, returnFocusRef, dataRef, refs, events, tree, nodeId]);

  // Synchronize the `context` & `modal` value to the FloatingPortal context.
  // It will decide whether or not it needs to render its own guards.
  index(() => {
    if (disabled) return;
    if (!portalContext) return;
    portalContext.setFocusManagerState({
      modal,
      closeOnFocusOut,
      open,
      onOpenChange,
      refs
    });
    return () => {
      portalContext.setFocusManagerState(null);
    };
  }, [disabled, portalContext, modal, open, onOpenChange, refs, closeOnFocusOut]);
  index(() => {
    if (disabled) return;
    if (!floatingFocusNode) return;
    if (typeof MutationObserver !== 'function') return;
    if (ignoreInitialFocus) return;
    const handleMutation = () => {
      const tabIndex = floatingFocusNode.getAttribute('tabindex');
      const tabbableContent = getTabbableContent();
      const activeEl = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(floating));
      const tabbableIndex = tabbableContent.indexOf(activeEl);
      if (tabbableIndex !== -1) {
        tabbableIndexRef.current = tabbableIndex;
      }
      if (orderRef.current.includes('floating') || activeEl !== refs.domReference.current && tabbableContent.length === 0) {
        if (tabIndex !== '0') {
          floatingFocusNode.setAttribute('tabindex', '0');
        }
      } else if (tabIndex !== '-1') {
        floatingFocusNode.setAttribute('tabindex', '-1');
      }
    };
    handleMutation();
    const observer = new MutationObserver(handleMutation);
    observer.observe(floatingFocusNode, {
      childList: true,
      subtree: true,
      attributes: true
    });
    return () => {
      observer.disconnect();
    };
  }, [disabled, floating, floatingFocusNode, refs, orderRef, getTabbableContent, ignoreInitialFocus]);
  function renderDismissButton(location) {
    if (disabled || !visuallyHiddenDismiss || !modal) {
      return null;
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(VisuallyHiddenDismiss, {
      ref: location === 'start' ? startDismissButtonRef : endDismissButtonRef,
      onClick: event => onOpenChange(false, event.nativeEvent)
    }, typeof visuallyHiddenDismiss === 'string' ? visuallyHiddenDismiss : 'Dismiss');
  }
  const shouldRenderGuards = !disabled && guards && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, shouldRenderGuards && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FocusGuard, {
    "data-type": "inside",
    ref: portalContext == null ? void 0 : portalContext.beforeInsideRef,
    onFocus: event => {
      if (modal) {
        const els = getTabbableElements();
        enqueueFocus(order[0] === 'reference' ? els[0] : els[els.length - 1]);
      } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
        preventReturnFocusRef.current = false;
        if (isOutsideEvent(event, portalContext.portalNode)) {
          const nextTabbable = getNextTabbable() || domReference;
          nextTabbable == null || nextTabbable.focus();
        } else {
          var _portalContext$before;
          (_portalContext$before = portalContext.beforeOutsideRef.current) == null || _portalContext$before.focus();
        }
      }
    }
  }), !isUntrappedTypeableCombobox && renderDismissButton('start'), children, renderDismissButton('end'), shouldRenderGuards && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FocusGuard, {
    "data-type": "inside",
    ref: portalContext == null ? void 0 : portalContext.afterInsideRef,
    onFocus: event => {
      if (modal) {
        enqueueFocus(getTabbableElements()[0]);
      } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
        if (closeOnFocusOut) {
          preventReturnFocusRef.current = true;
        }
        if (isOutsideEvent(event, portalContext.portalNode)) {
          const prevTabbable = getPreviousTabbable() || domReference;
          prevTabbable == null || prevTabbable.focus();
        } else {
          var _portalContext$afterO;
          (_portalContext$afterO = portalContext.afterOutsideRef.current) == null || _portalContext$afterO.focus();
        }
      }
    }
  }));
}

const activeLocks = /*#__PURE__*/new Set();
/**
 * Provides base styling for a fixed overlay element to dim content or block
 * pointer events behind a floating element.
 * It's a regular `<div>`, so it can be styled via any CSS solution you prefer.
 * @see https://floating-ui.com/docs/FloatingOverlay
 */
const FloatingOverlay = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function FloatingOverlay(props, ref) {
  const {
    lockScroll = false,
    ...rest
  } = props;
  const lockId = useId();
  index(() => {
    if (!lockScroll) return;
    activeLocks.add(lockId);
    const isIOS = /iP(hone|ad|od)|iOS/.test((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getPlatform)());
    const bodyStyle = document.body.style;
    // RTL <body> scrollbar
    const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? 'paddingLeft' : 'paddingRight';
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.scrollX;
    const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.scrollY;
    bodyStyle.overflow = 'hidden';
    if (scrollbarWidth) {
      bodyStyle[paddingProp] = scrollbarWidth + "px";
    }

    // Only iOS doesn't respect `overflow: hidden` on document.body, and this
    // technique has fewer side effects.
    if (isIOS) {
      var _window$visualViewpor, _window$visualViewpor2;
      // iOS 12 does not support `visualViewport`.
      const offsetLeft = ((_window$visualViewpor = window.visualViewport) == null ? void 0 : _window$visualViewpor.offsetLeft) || 0;
      const offsetTop = ((_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetTop) || 0;
      Object.assign(bodyStyle, {
        position: 'fixed',
        top: -(scrollY - Math.floor(offsetTop)) + "px",
        left: -(scrollX - Math.floor(offsetLeft)) + "px",
        right: '0'
      });
    }
    return () => {
      activeLocks.delete(lockId);
      if (activeLocks.size === 0) {
        Object.assign(bodyStyle, {
          overflow: '',
          [paddingProp]: ''
        });
        if (isIOS) {
          Object.assign(bodyStyle, {
            position: '',
            top: '',
            left: '',
            right: ''
          });
          window.scrollTo(scrollX, scrollY);
        }
      }
    };
  }, [lockId, lockScroll]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", _extends({
    ref: ref
  }, rest, {
    style: {
      position: 'fixed',
      overflow: 'auto',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...rest.style
    }
  }));
});

function isButtonTarget(event) {
  return (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(event.target) && event.target.tagName === 'BUTTON';
}
function isSpaceIgnored(element) {
  return (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isTypeableElement)(element);
}
/**
 * Opens or closes the floating element when clicking the reference element.
 * @see https://floating-ui.com/docs/useClick
 */
function useClick(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    elements: {
      domReference
    }
  } = context;
  const {
    enabled = true,
    event: eventOption = 'click',
    toggle = true,
    ignoreMouse = false,
    keyboardHandlers = true
  } = props;
  const pointerTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  const didKeyDownRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onMouseDown(event) {
      const pointerType = pointerTypeRef.current;

      // Ignore all buttons except for the "main" button.
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
      if (event.button !== 0) return;
      if (eventOption === 'click') return;
      if ((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isMouseLikePointerType)(pointerType, true) && ignoreMouse) return;
      if (open && toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === 'mousedown' : true)) {
        onOpenChange(false, event.nativeEvent, 'click');
      } else {
        // Prevent stealing focus from the floating element
        event.preventDefault();
        onOpenChange(true, event.nativeEvent, 'click');
      }
    },
    onClick(event) {
      const pointerType = pointerTypeRef.current;
      if (eventOption === 'mousedown' && pointerTypeRef.current) {
        pointerTypeRef.current = undefined;
        return;
      }
      if ((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isMouseLikePointerType)(pointerType, true) && ignoreMouse) return;
      if (open && toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === 'click' : true)) {
        onOpenChange(false, event.nativeEvent, 'click');
      } else {
        onOpenChange(true, event.nativeEvent, 'click');
      }
    },
    onKeyDown(event) {
      pointerTypeRef.current = undefined;
      if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event)) {
        return;
      }
      if (event.key === ' ' && !isSpaceIgnored(domReference)) {
        // Prevent scrolling
        event.preventDefault();
        didKeyDownRef.current = true;
      }
      if (event.key === 'Enter') {
        if (open && toggle) {
          onOpenChange(false, event.nativeEvent, 'click');
        } else {
          onOpenChange(true, event.nativeEvent, 'click');
        }
      }
    },
    onKeyUp(event) {
      if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event) || isSpaceIgnored(domReference)) {
        return;
      }
      if (event.key === ' ' && didKeyDownRef.current) {
        didKeyDownRef.current = false;
        if (open && toggle) {
          onOpenChange(false, event.nativeEvent, 'click');
        } else {
          onOpenChange(true, event.nativeEvent, 'click');
        }
      }
    }
  }), [dataRef, domReference, eventOption, ignoreMouse, keyboardHandlers, onOpenChange, open, toggle]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}

function createVirtualElement(domElement, data) {
  let offsetX = null;
  let offsetY = null;
  let isAutoUpdateEvent = false;
  return {
    contextElement: domElement || undefined,
    getBoundingClientRect() {
      var _data$dataRef$current;
      const domRect = (domElement == null ? void 0 : domElement.getBoundingClientRect()) || {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      };
      const isXAxis = data.axis === 'x' || data.axis === 'both';
      const isYAxis = data.axis === 'y' || data.axis === 'both';
      const canTrackCursorOnAutoUpdate = ['mouseenter', 'mousemove'].includes(((_data$dataRef$current = data.dataRef.current.openEvent) == null ? void 0 : _data$dataRef$current.type) || '') && data.pointerType !== 'touch';
      let width = domRect.width;
      let height = domRect.height;
      let x = domRect.x;
      let y = domRect.y;
      if (offsetX == null && data.x && isXAxis) {
        offsetX = domRect.x - data.x;
      }
      if (offsetY == null && data.y && isYAxis) {
        offsetY = domRect.y - data.y;
      }
      x -= offsetX || 0;
      y -= offsetY || 0;
      width = 0;
      height = 0;
      if (!isAutoUpdateEvent || canTrackCursorOnAutoUpdate) {
        width = data.axis === 'y' ? domRect.width : 0;
        height = data.axis === 'x' ? domRect.height : 0;
        x = isXAxis && data.x != null ? data.x : x;
        y = isYAxis && data.y != null ? data.y : y;
      } else if (isAutoUpdateEvent && !canTrackCursorOnAutoUpdate) {
        height = data.axis === 'x' ? domRect.height : height;
        width = data.axis === 'y' ? domRect.width : width;
      }
      isAutoUpdateEvent = true;
      return {
        width,
        height,
        x,
        y,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x
      };
    }
  };
}
function isMouseBasedEvent(event) {
  return event != null && event.clientX != null;
}
/**
 * Positions the floating element relative to a client point (in the viewport),
 * such as the mouse position. By default, it follows the mouse cursor.
 * @see https://floating-ui.com/docs/useClientPoint
 */
function useClientPoint(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    dataRef,
    elements: {
      floating,
      domReference
    },
    refs
  } = context;
  const {
    enabled = true,
    axis = 'both',
    x = null,
    y = null
  } = props;
  const initialRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const cleanupListenerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const [pointerType, setPointerType] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const [reactive, setReactive] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);
  const setReference = useEffectEvent((x, y) => {
    if (initialRef.current) return;

    // Prevent setting if the open event was not a mouse-like one
    // (e.g. focus to open, then hover over the reference element).
    // Only apply if the event exists.
    if (dataRef.current.openEvent && !isMouseBasedEvent(dataRef.current.openEvent)) {
      return;
    }
    refs.setPositionReference(createVirtualElement(domReference, {
      x,
      y,
      axis,
      dataRef,
      pointerType
    }));
  });
  const handleReferenceEnterOrMove = useEffectEvent(event => {
    if (x != null || y != null) return;
    if (!open) {
      setReference(event.clientX, event.clientY);
    } else if (!cleanupListenerRef.current) {
      // If there's no cleanup, there's no listener, but we want to ensure
      // we add the listener if the cursor landed on the floating element and
      // then back on the reference (i.e. it's interactive).
      setReactive([]);
    }
  });

  // If the pointer is a mouse-like pointer, we want to continue following the
  // mouse even if the floating element is transitioning out. On touch
  // devices, this is undesirable because the floating element will move to
  // the dismissal touch point.
  const openCheck = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isMouseLikePointerType)(pointerType) ? floating : open;
  const addListener = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    // Explicitly specified `x`/`y` coordinates shouldn't add a listener.
    if (!openCheck || !enabled || x != null || y != null) return;
    const win = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getWindow)(floating);
    function handleMouseMove(event) {
      const target = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event);
      if (!(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(floating, target)) {
        setReference(event.clientX, event.clientY);
      } else {
        win.removeEventListener('mousemove', handleMouseMove);
        cleanupListenerRef.current = null;
      }
    }
    if (!dataRef.current.openEvent || isMouseBasedEvent(dataRef.current.openEvent)) {
      win.addEventListener('mousemove', handleMouseMove);
      const cleanup = () => {
        win.removeEventListener('mousemove', handleMouseMove);
        cleanupListenerRef.current = null;
      };
      cleanupListenerRef.current = cleanup;
      return cleanup;
    }
    refs.setPositionReference(domReference);
  }, [openCheck, enabled, x, y, floating, dataRef, refs, domReference, setReference]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    return addListener();
  }, [addListener, reactive]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (enabled && !floating) {
      initialRef.current = false;
    }
  }, [enabled, floating]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!enabled && open) {
      initialRef.current = true;
    }
  }, [enabled, open]);
  index(() => {
    if (enabled && (x != null || y != null)) {
      initialRef.current = false;
      setReference(x, y);
    }
  }, [enabled, x, y, setReference]);
  const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    function setPointerTypeRef(_ref) {
      let {
        pointerType
      } = _ref;
      setPointerType(pointerType);
    }
    return {
      onPointerDown: setPointerTypeRef,
      onPointerEnter: setPointerTypeRef,
      onMouseMove: handleReferenceEnterOrMove,
      onMouseEnter: handleReferenceEnterOrMove
    };
  }, [handleReferenceEnterOrMove]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}

const bubbleHandlerKeys = {
  pointerdown: 'onPointerDown',
  mousedown: 'onMouseDown',
  click: 'onClick'
};
const captureHandlerKeys = {
  pointerdown: 'onPointerDownCapture',
  mousedown: 'onMouseDownCapture',
  click: 'onClickCapture'
};
const normalizeProp = normalizable => {
  var _normalizable$escapeK, _normalizable$outside;
  return {
    escapeKey: typeof normalizable === 'boolean' ? normalizable : (_normalizable$escapeK = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _normalizable$escapeK : false,
    outsidePress: typeof normalizable === 'boolean' ? normalizable : (_normalizable$outside = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _normalizable$outside : true
  };
};
/**
 * Closes the floating element when a dismissal is requested — by default, when
 * the user presses the `escape` key or outside of the floating element.
 * @see https://floating-ui.com/docs/useDismiss
 */
function useDismiss(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    elements,
    dataRef
  } = context;
  const {
    enabled = true,
    escapeKey = true,
    outsidePress: unstable_outsidePress = true,
    outsidePressEvent = 'pointerdown',
    referencePress = false,
    referencePressEvent = 'pointerdown',
    ancestorScroll = false,
    bubbles,
    capture
  } = props;
  const tree = useFloatingTree();
  const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === 'function' ? unstable_outsidePress : () => false);
  const outsidePress = typeof unstable_outsidePress === 'function' ? outsidePressFn : unstable_outsidePress;
  const insideReactTreeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const endedOrStartedInsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const {
    escapeKey: escapeKeyBubbles,
    outsidePress: outsidePressBubbles
  } = normalizeProp(bubbles);
  const {
    escapeKey: escapeKeyCapture,
    outsidePress: outsidePressCapture
  } = normalizeProp(capture);
  const closeOnEscapeKeyDown = useEffectEvent(event => {
    var _dataRef$current$floa;
    if (!open || !enabled || !escapeKey || event.key !== 'Escape') {
      return;
    }
    const nodeId = (_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.nodeId;
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (!escapeKeyBubbles) {
      event.stopPropagation();
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach(child => {
          var _child$context;
          if ((_child$context = child.context) != null && _child$context.open && !child.context.dataRef.current.__escapeKeyBubbles) {
            shouldDismiss = false;
            return;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
    }
    onOpenChange(false, (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isReactEvent)(event) ? event.nativeEvent : event, 'escape-key');
  });
  const closeOnEscapeKeyDownCapture = useEffectEvent(event => {
    var _getTarget2;
    const callback = () => {
      var _getTarget;
      closeOnEscapeKeyDown(event);
      (_getTarget = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event)) == null || _getTarget.removeEventListener('keydown', callback);
    };
    (_getTarget2 = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event)) == null || _getTarget2.addEventListener('keydown', callback);
  });
  const closeOnPressOutside = useEffectEvent(event => {
    var _dataRef$current$floa2;
    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    const insideReactTree = insideReactTreeRef.current;
    insideReactTreeRef.current = false;

    // When click outside is lazy (`click` event), handle dragging.
    // Don't close if:
    // - The click started inside the floating element.
    // - The click ended inside the floating element.
    const endedOrStartedInside = endedOrStartedInsideRef.current;
    endedOrStartedInsideRef.current = false;
    if (outsidePressEvent === 'click' && endedOrStartedInside) {
      return;
    }
    if (insideReactTree) {
      return;
    }
    if (typeof outsidePress === 'function' && !outsidePress(event)) {
      return;
    }
    const target = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event);
    const inertSelector = "[" + createAttribute('inert') + "]";
    const markers = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(elements.floating).querySelectorAll(inertSelector);
    let targetRootAncestor = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(target) ? target : null;
    while (targetRootAncestor && !(0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isLastTraversableNode)(targetRootAncestor)) {
      const nextParent = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getParentNode)(targetRootAncestor);
      if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isLastTraversableNode)(nextParent) || !(0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(nextParent)) {
        break;
      }
      targetRootAncestor = nextParent;
    }

    // Check if the click occurred on a third-party element injected after the
    // floating element rendered.
    if (markers.length && (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(target) && !(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isRootElement)(target) &&
    // Clicked on a direct ancestor (e.g. FloatingOverlay).
    !(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(target, elements.floating) &&
    // If the target root element contains none of the markers, then the
    // element was injected after the floating element rendered.
    Array.from(markers).every(marker => !(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(targetRootAncestor, marker))) {
      return;
    }

    // Check if the click occurred on the scrollbar
    if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(target) && floating) {
      // In Firefox, `target.scrollWidth > target.clientWidth` for inline
      // elements.
      const canScrollX = target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
      const canScrollY = target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
      let xCond = canScrollY && event.offsetX > target.clientWidth;

      // In some browsers it is possible to change the <body> (or window)
      // scrollbar to the left side, but is very rare and is difficult to
      // check for. Plus, for modal dialogs with backdrops, it is more
      // important that the backdrop is checked but not so much the window.
      if (canScrollY) {
        const isRTL = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getComputedStyle)(target).direction === 'rtl';
        if (isRTL) {
          xCond = event.offsetX <= target.offsetWidth - target.clientWidth;
        }
      }
      if (xCond || canScrollX && event.offsetY > target.clientHeight) {
        return;
      }
    }
    const nodeId = (_dataRef$current$floa2 = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa2.nodeId;
    const targetIsInsideChildren = tree && getChildren(tree.nodesRef.current, nodeId).some(node => {
      var _node$context;
      return (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isEventTargetWithin)(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
    });
    if ((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isEventTargetWithin)(event, elements.floating) || (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isEventTargetWithin)(event, elements.domReference) || targetIsInsideChildren) {
      return;
    }
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (children.length > 0) {
      let shouldDismiss = true;
      children.forEach(child => {
        var _child$context2;
        if ((_child$context2 = child.context) != null && _child$context2.open && !child.context.dataRef.current.__outsidePressBubbles) {
          shouldDismiss = false;
          return;
        }
      });
      if (!shouldDismiss) {
        return;
      }
    }
    onOpenChange(false, event, 'outside-press');
  });
  const closeOnPressOutsideCapture = useEffectEvent(event => {
    var _getTarget4;
    const callback = () => {
      var _getTarget3;
      closeOnPressOutside(event);
      (_getTarget3 = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event)) == null || _getTarget3.removeEventListener(outsidePressEvent, callback);
    };
    (_getTarget4 = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event)) == null || _getTarget4.addEventListener(outsidePressEvent, callback);
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!open || !enabled) {
      return;
    }
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
    dataRef.current.__outsidePressBubbles = outsidePressBubbles;
    function onScroll(event) {
      onOpenChange(false, event, 'ancestor-scroll');
    }
    const doc = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(elements.floating);
    escapeKey && doc.addEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
    outsidePress && doc.addEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
    let ancestors = [];
    if (ancestorScroll) {
      if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(elements.domReference)) {
        ancestors = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getOverflowAncestors)(elements.domReference);
      }
      if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(elements.floating)) {
        ancestors = ancestors.concat((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getOverflowAncestors)(elements.floating));
      }
      if (!(0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(elements.reference) && elements.reference && elements.reference.contextElement) {
        ancestors = ancestors.concat((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getOverflowAncestors)(elements.reference.contextElement));
      }
    }

    // Ignore the visual viewport for scrolling dismissal (allow pinch-zoom)
    ancestors = ancestors.filter(ancestor => {
      var _doc$defaultView;
      return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
    });
    ancestors.forEach(ancestor => {
      ancestor.addEventListener('scroll', onScroll, {
        passive: true
      });
    });
    return () => {
      escapeKey && doc.removeEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
      outsidePress && doc.removeEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
      ancestors.forEach(ancestor => {
        ancestor.removeEventListener('scroll', onScroll);
      });
    };
  }, [dataRef, elements, escapeKey, outsidePress, outsidePressEvent, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, escapeKeyCapture, closeOnEscapeKeyDownCapture, closeOnPressOutside, outsidePressCapture, closeOnPressOutsideCapture]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    insideReactTreeRef.current = false;
  }, [outsidePress, outsidePressEvent]);
  const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    [bubbleHandlerKeys[referencePressEvent]]: event => {
      if (referencePress) {
        onOpenChange(false, event.nativeEvent, 'reference-press');
      }
    }
  }), [closeOnEscapeKeyDown, onOpenChange, referencePress, referencePressEvent]);
  const floating = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    onMouseDown() {
      endedOrStartedInsideRef.current = true;
    },
    onMouseUp() {
      endedOrStartedInsideRef.current = true;
    },
    [captureHandlerKeys[outsidePressEvent]]: () => {
      insideReactTreeRef.current = true;
    }
  }), [closeOnEscapeKeyDown, outsidePressEvent]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}

function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = useId();
  const dataRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef({});
  const [events] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => createPubSub());
  const nested = useFloatingParentNodeId() != null;
  if (true) {
    const optionDomReference = elementsProp.reference;
    if (optionDomReference && !(0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(optionDomReference)) {
      error('Cannot pass a virtual element to the `elements.reference` option,', 'as it must be a real DOM element. Use `refs.setPositionReference()`', 'instead.');
    }
  }
  const [positionReference, setPositionReference] = react__WEBPACK_IMPORTED_MODULE_0__.useState(elementsProp.reference);
  const onOpenChange = useEffectEvent((open, event, reason) => {
    dataRef.current.openEvent = open ? event : undefined;
    events.emit('openchange', {
      open,
      event,
      reason,
      nested
    });
    onOpenChangeProp == null || onOpenChangeProp(open, event, reason);
  });
  const refs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}

/**
 * Provides data to position a floating element and context to add interactions.
 * @see https://floating-ui.com/docs/useFloating
 */
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    nodeId
  } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements
    }
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const [positionReference, _setPositionReference] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const optionDomReference = computedElements == null ? void 0 : computedElements.reference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const tree = useFloatingTree();
  index(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.useFloating)({
    ...options,
    elements: {
      ...computedElements,
      ...(positionReference && {
        reference: positionReference
      })
    }
  });
  const setPositionReference = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(node => {
    const computedPositionReference = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    // Store the positionReference in state if the DOM reference is specified externally via the
    // `elements.reference` option. This ensures that it won't be overridden on future renders.
    _setPositionReference(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const setReference = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(node => {
    if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }

    // Backwards-compatibility for passing a virtual element to `reference`
    // after it has set the DOM reference.
    if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(position.refs.reference.current) || position.refs.reference.current === null ||
    // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !(0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    ...position.elements,
    domReference: domReference
  }), [position.elements, domReference]);
  const context = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    ...position,
    ...rootContext,
    refs,
    elements,
    nodeId
  }), [position, refs, elements, nodeId, rootContext]);
  index(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find(node => node.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}

/**
 * Opens the floating element while the reference element has focus, like CSS
 * `:focus`.
 * @see https://floating-ui.com/docs/useFocus
 */
function useFocus(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    events,
    dataRef,
    elements
  } = context;
  const {
    enabled = true,
    visibleOnly = true
  } = props;
  const blockFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const timeoutRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  const keyboardModalityRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!enabled) return;
    const win = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.getWindow)(elements.domReference);

    // If the reference was focused and the user left the tab/window, and the
    // floating element was not open, the focus should be blocked when they
    // return to the tab/window.
    function onBlur() {
      if (!open && (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(elements.domReference) && elements.domReference === (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(elements.domReference))) {
        blockFocusRef.current = true;
      }
    }
    function onKeyDown() {
      keyboardModalityRef.current = true;
    }
    win.addEventListener('blur', onBlur);
    win.addEventListener('keydown', onKeyDown, true);
    return () => {
      win.removeEventListener('blur', onBlur);
      win.removeEventListener('keydown', onKeyDown, true);
    };
  }, [elements.domReference, open, enabled]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!enabled) return;
    function onOpenChange(_ref) {
      let {
        reason
      } = _ref;
      if (reason === 'reference-press' || reason === 'escape-key') {
        blockFocusRef.current = true;
      }
    }
    events.on('openchange', onOpenChange);
    return () => {
      events.off('openchange', onOpenChange);
    };
  }, [events, enabled]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    onPointerDown(event) {
      if ((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isVirtualPointerEvent)(event.nativeEvent)) return;
      keyboardModalityRef.current = false;
    },
    onMouseLeave() {
      blockFocusRef.current = false;
    },
    onFocus(event) {
      if (blockFocusRef.current) return;
      const target = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event.nativeEvent);
      if (visibleOnly && (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(target)) {
        try {
          // Mac Safari unreliably matches `:focus-visible` on the reference
          // if focus was outside the page initially - use the fallback
          // instead.
          if ((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isSafari)() && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isMac)()) throw Error();
          if (!target.matches(':focus-visible')) return;
        } catch (e) {
          // Old browsers will throw an error when using `:focus-visible`.
          if (!keyboardModalityRef.current && !(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isTypeableElement)(target)) {
            return;
          }
        }
      }
      onOpenChange(true, event.nativeEvent, 'focus');
    },
    onBlur(event) {
      blockFocusRef.current = false;
      const relatedTarget = event.relatedTarget;
      const nativeEvent = event.nativeEvent;

      // Hit the non-modal focus management portal guard. Focus will be
      // moved into the floating element immediately after.
      const movedToFocusGuard = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(relatedTarget) && relatedTarget.hasAttribute(createAttribute('focus-guard')) && relatedTarget.getAttribute('data-type') === 'outside';

      // Wait for the window blur listener to fire.
      timeoutRef.current = window.setTimeout(() => {
        var _dataRef$current$floa;
        const activeEl = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)(elements.domReference ? elements.domReference.ownerDocument : document);

        // Focus left the page, keep it open.
        if (!relatedTarget && activeEl === elements.domReference) return;

        // When focusing the reference element (e.g. regular click), then
        // clicking into the floating element, prevent it from hiding.
        // Note: it must be focusable, e.g. `tabindex="-1"`.
        // We can not rely on relatedTarget to point to the correct element
        // as it will only point to the shadow host of the newly focused element
        // and not the element that actually has received focus if it is located
        // inside a shadow root.
        if ((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)((_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.refs.floating.current, activeEl) || (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(elements.domReference, activeEl) || movedToFocusGuard) {
          return;
        }
        onOpenChange(false, nativeEvent, 'focus');
      });
    }
  }), [dataRef, elements.domReference, onOpenChange, visibleOnly]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}

const ACTIVE_KEY = 'active';
const SELECTED_KEY = 'selected';
function mergeProps(userProps, propsList, elementKey) {
  const map = new Map();
  const isItem = elementKey === 'item';
  let domUserProps = userProps;
  if (isItem && userProps) {
    const {
      [ACTIVE_KEY]: _,
      [SELECTED_KEY]: __,
      ...validProps
    } = userProps;
    domUserProps = validProps;
  }
  return {
    ...(elementKey === 'floating' && {
      tabIndex: -1
    }),
    ...domUserProps,
    ...propsList.map(value => {
      const propsOrGetProps = value ? value[elementKey] : null;
      if (typeof propsOrGetProps === 'function') {
        return userProps ? propsOrGetProps(userProps) : null;
      }
      return propsOrGetProps;
    }).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach(_ref => {
        let [key, value] = _ref;
        if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
          return;
        }
        if (key.indexOf('on') === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === 'function') {
            var _map$get;
            (_map$get = map.get(key)) == null || _map$get.push(value);
            acc[key] = function () {
              var _map$get2;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map(fn => fn(...args)).find(val => val !== undefined);
            };
          }
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}
/**
 * Merges an array of interaction hooks' props into prop getters, allowing
 * event handler functions to be composed together without overwriting one
 * another.
 * @see https://floating-ui.com/docs/useInteractions
 */
function useInteractions(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  const referenceDeps = propsList.map(key => key == null ? void 0 : key.reference);
  const floatingDeps = propsList.map(key => key == null ? void 0 : key.floating);
  const itemDeps = propsList.map(key => key == null ? void 0 : key.item);
  const getReferenceProps = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(userProps => mergeProps(userProps, propsList, 'reference'),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  referenceDeps);
  const getFloatingProps = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(userProps => mergeProps(userProps, propsList, 'floating'),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  floatingDeps);
  const getItemProps = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(userProps => mergeProps(userProps, propsList, 'item'),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  itemDeps);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps
  }), [getReferenceProps, getFloatingProps, getItemProps]);
}

let isPreventScrollSupported = false;
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case 'vertical':
      return vertical;
    case 'horizontal':
      return horizontal;
    default:
      return vertical || horizontal;
  }
}
function isMainOrientationKey(key, orientation) {
  const vertical = key === ARROW_UP || key === ARROW_DOWN;
  const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  const vertical = key === ARROW_DOWN;
  const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal) || key === 'Enter' || key === ' ' || key === '';
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  const horizontal = key === ARROW_DOWN;
  return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
  const horizontal = key === ARROW_UP;
  return doSwitch(orientation, vertical, horizontal);
}
/**
 * Adds arrow key-based navigation of a list of items, either using real DOM
 * focus or virtual focus.
 * @see https://floating-ui.com/docs/useListNavigation
 */
function useListNavigation(context, props) {
  const {
    open,
    onOpenChange,
    elements
  } = context;
  const {
    listRef,
    activeIndex,
    onNavigate: unstable_onNavigate = () => {},
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loop = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = 'auto',
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = undefined,
    orientation = 'vertical',
    cols = 1,
    scrollItemIntoView = true,
    virtualItemRef,
    itemSizes,
    dense = false
  } = props;
  if (true) {
    if (allowEscape) {
      if (!loop) {
        warn('`useListNavigation` looping must be enabled to allow escaping.');
      }
      if (!virtual) {
        warn('`useListNavigation` must be virtual to allow escaping.');
      }
    }
    if (orientation === 'vertical' && cols > 1) {
      warn('In grid list navigation mode (`cols` > 1), the `orientation` should', 'be either "horizontal" or "both".');
    }
  }
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();
  const onNavigate = useEffectEvent(unstable_onNavigate);
  const focusItemOnOpenRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(focusItemOnOpen);
  const indexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(selectedIndex != null ? selectedIndex : -1);
  const keyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const isPointerModalityRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
  const previousOnNavigateRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(onNavigate);
  const previousMountedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(!!elements.floating);
  const previousOpenRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(open);
  const forceSyncFocus = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const forceScrollIntoViewRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const disabledIndicesRef = useLatestRef(disabledIndices);
  const latestOpenRef = useLatestRef(open);
  const scrollItemIntoViewRef = useLatestRef(scrollItemIntoView);
  const floatingRef = useLatestRef(elements.floating);
  const selectedIndexRef = useLatestRef(selectedIndex);
  const [activeId, setActiveId] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const [virtualId, setVirtualId] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const focusItem = useEffectEvent(function (listRef, indexRef, forceScrollIntoView) {
    if (forceScrollIntoView === void 0) {
      forceScrollIntoView = false;
    }
    function runFocus(item) {
      if (virtual) {
        setActiveId(item.id);
        tree == null || tree.events.emit('virtualfocus', item);
        if (virtualItemRef) {
          virtualItemRef.current = item;
        }
      } else {
        enqueueFocus(item, {
          preventScroll: true,
          // Mac Safari does not move the virtual cursor unless the focus call
          // is sync. However, for the very first focus call, we need to wait
          // for the position to be ready in order to prevent unwanted
          // scrolling. This means the virtual cursor will not move to the first
          // item when first opening the floating element, but will on
          // subsequent calls. `preventScroll` is supported in modern Safari,
          // so we can use that instead.
          // iOS Safari must be async or the first item will not be focused.
          sync: (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isMac)() && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isSafari)() ? isPreventScrollSupported || forceSyncFocus.current : false
        });
      }
    }
    const initialItem = listRef.current[indexRef.current];
    if (initialItem) {
      runFocus(initialItem);
    }
    requestAnimationFrame(() => {
      const waitedItem = listRef.current[indexRef.current] || initialItem;
      if (!waitedItem) return;
      if (!initialItem) {
        runFocus(waitedItem);
      }
      const scrollIntoViewOptions = scrollItemIntoViewRef.current;
      const shouldScrollIntoView = scrollIntoViewOptions && item && (forceScrollIntoView || !isPointerModalityRef.current);
      if (shouldScrollIntoView) {
        // JSDOM doesn't support `.scrollIntoView()` but it's widely supported
        // by all browsers.
        waitedItem.scrollIntoView == null || waitedItem.scrollIntoView(typeof scrollIntoViewOptions === 'boolean' ? {
          block: 'nearest',
          inline: 'nearest'
        } : scrollIntoViewOptions);
      }
    });
  });
  index(() => {
    document.createElement('div').focus({
      get preventScroll() {
        isPreventScrollSupported = true;
        return false;
      }
    });
  }, []);

  // Sync `selectedIndex` to be the `activeIndex` upon opening the floating
  // element. Also, reset `activeIndex` upon closing the floating element.
  index(() => {
    if (!enabled) return;
    if (open && elements.floating) {
      if (focusItemOnOpenRef.current && selectedIndex != null) {
        // Regardless of the pointer modality, we want to ensure the selected
        // item comes into view when the floating element is opened.
        forceScrollIntoViewRef.current = true;
        indexRef.current = selectedIndex;
        onNavigate(selectedIndex);
      }
    } else if (previousMountedRef.current) {
      // Since the user can specify `onNavigate` conditionally
      // (onNavigate: open ? setActiveIndex : setSelectedIndex),
      // we store and call the previous function.
      indexRef.current = -1;
      previousOnNavigateRef.current(null);
    }
  }, [enabled, open, elements.floating, selectedIndex, onNavigate]);

  // Sync `activeIndex` to be the focused item while the floating element is
  // open.
  index(() => {
    if (!enabled) return;
    if (open && elements.floating) {
      if (activeIndex == null) {
        forceSyncFocus.current = false;
        if (selectedIndexRef.current != null) {
          return;
        }

        // Reset while the floating element was open (e.g. the list changed).
        if (previousMountedRef.current) {
          indexRef.current = -1;
          focusItem(listRef, indexRef);
        }

        // Initial sync.
        if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
          let runs = 0;
          const waitForListPopulated = () => {
            if (listRef.current[0] == null) {
              // Avoid letting the browser paint if possible on the first try,
              // otherwise use rAF. Don't try more than twice, since something
              // is wrong otherwise.
              if (runs < 2) {
                const scheduler = runs ? requestAnimationFrame : queueMicrotask;
                scheduler(waitForListPopulated);
              }
              runs++;
            } else {
              indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinIndex(listRef, disabledIndicesRef.current) : getMaxIndex(listRef, disabledIndicesRef.current);
              keyRef.current = null;
              onNavigate(indexRef.current);
            }
          };
          waitForListPopulated();
        }
      } else if (!isIndexOutOfBounds(listRef, activeIndex)) {
        indexRef.current = activeIndex;
        focusItem(listRef, indexRef, forceScrollIntoViewRef.current);
        forceScrollIntoViewRef.current = false;
      }
    }
  }, [enabled, open, elements.floating, activeIndex, selectedIndexRef, nested, listRef, orientation, rtl, onNavigate, focusItem, disabledIndicesRef]);

  // Ensure the parent floating element has focus when a nested child closes
  // to allow arrow key navigation to work after the pointer leaves the child.
  index(() => {
    var _nodes$find;
    if (!enabled || elements.floating || !tree || virtual || !previousMountedRef.current) {
      return;
    }
    const nodes = tree.nodesRef.current;
    const parent = (_nodes$find = nodes.find(node => node.id === parentId)) == null || (_nodes$find = _nodes$find.context) == null ? void 0 : _nodes$find.elements.floating;
    const activeEl = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getDocument)(elements.floating));
    const treeContainsActiveEl = nodes.some(node => node.context && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(node.context.elements.floating, activeEl));
    if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
      parent.focus({
        preventScroll: true
      });
    }
  }, [enabled, elements.floating, tree, parentId, virtual]);
  index(() => {
    if (!enabled) return;
    if (!tree) return;
    if (!virtual) return;
    if (parentId) return;
    function handleVirtualFocus(item) {
      setVirtualId(item.id);
      if (virtualItemRef) {
        virtualItemRef.current = item;
      }
    }
    tree.events.on('virtualfocus', handleVirtualFocus);
    return () => {
      tree.events.off('virtualfocus', handleVirtualFocus);
    };
  }, [enabled, tree, virtual, parentId, virtualItemRef]);
  index(() => {
    previousOnNavigateRef.current = onNavigate;
    previousMountedRef.current = !!elements.floating;
  });
  index(() => {
    if (!open) {
      keyRef.current = null;
    }
  }, [open]);
  index(() => {
    previousOpenRef.current = open;
  }, [open]);
  const hasActiveIndex = activeIndex != null;
  const item = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    function syncCurrentTarget(currentTarget) {
      if (!open) return;
      const index = listRef.current.indexOf(currentTarget);
      if (index !== -1) {
        onNavigate(index);
      }
    }
    const props = {
      onFocus(_ref) {
        let {
          currentTarget
        } = _ref;
        syncCurrentTarget(currentTarget);
      },
      onClick: _ref2 => {
        let {
          currentTarget
        } = _ref2;
        return currentTarget.focus({
          preventScroll: true
        });
      },
      // Safari
      ...(focusItemOnHover && {
        onMouseMove(_ref3) {
          let {
            currentTarget
          } = _ref3;
          syncCurrentTarget(currentTarget);
        },
        onPointerLeave(_ref4) {
          let {
            pointerType
          } = _ref4;
          if (!isPointerModalityRef.current || pointerType === 'touch') {
            return;
          }
          indexRef.current = -1;
          focusItem(listRef, indexRef);
          onNavigate(null);
          if (!virtual) {
            enqueueFocus(floatingRef.current, {
              preventScroll: true
            });
          }
        }
      })
    };
    return props;
  }, [open, floatingRef, focusItem, focusItemOnHover, listRef, onNavigate, virtual]);
  const commonOnKeyDown = useEffectEvent(event => {
    isPointerModalityRef.current = false;
    forceSyncFocus.current = true;

    // If the floating element is animating out, ignore navigation. Otherwise,
    // the `activeIndex` gets set to 0 despite not being open so the next time
    // the user ArrowDowns, the first item won't be focused.
    if (!latestOpenRef.current && event.currentTarget === floatingRef.current) {
      return;
    }
    if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl)) {
      (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
      onOpenChange(false, event.nativeEvent, 'list-navigation');
      if ((0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(elements.domReference) && !virtual) {
        elements.domReference.focus();
      }
      return;
    }
    const currentIndex = indexRef.current;
    const minIndex = getMinIndex(listRef, disabledIndices);
    const maxIndex = getMaxIndex(listRef, disabledIndices);
    if (event.key === 'Home') {
      (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
      indexRef.current = minIndex;
      onNavigate(indexRef.current);
    }
    if (event.key === 'End') {
      (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
      indexRef.current = maxIndex;
      onNavigate(indexRef.current);
    }

    // Grid navigation.
    if (cols > 1) {
      const sizes = itemSizes || Array.from({
        length: listRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      // To calculate movements on the grid, we use hypothetical cell indices
      // as if every item was 1x1, then convert back to real indices.
      const cellMap = buildCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex(index => index != null && !isDisabled(listRef.current, index, disabledIndices));
      // last enabled index
      const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex) => index != null && !isDisabled(listRef.current, index, disabledIndices) ? cellIndex : foundIndex, -1);
      indexRef.current = cellMap[getGridNavigatedIndex({
        current: cellMap.map(itemIndex => itemIndex != null ? listRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getCellIndices([...(disabledIndices || listRef.current.map((_, index) => isDisabled(listRef.current, index) ? index : undefined)), undefined], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getCellIndexOfCorner(indexRef.current > maxIndex ? minIndex : indexRef.current, sizes, cellMap, cols,
        // use a corner matching the edge closest to the direction
        // we're moving in so we don't end up in the same item. Prefer
        // top/left over bottom/right.
        event.key === ARROW_DOWN ? 'bl' : event.key === ARROW_RIGHT ? 'tr' : 'tl'),
        stopEvent: true
      })]; // navigated cell will never be nullish

      onNavigate(indexRef.current);
      if (orientation === 'both') {
        return;
      }
    }
    if (isMainOrientationKey(event.key, orientation)) {
      (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);

      // Reset the index if no item is focused.
      if (open && !virtual && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.activeElement)(event.currentTarget.ownerDocument) === event.currentTarget) {
        indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
        onNavigate(indexRef.current);
        return;
      }
      if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
        if (loop) {
          indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          });
        } else {
          indexRef.current = Math.min(maxIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          }));
        }
      } else {
        if (loop) {
          indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          });
        } else {
          indexRef.current = Math.max(minIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          }));
        }
      }
      if (isIndexOutOfBounds(listRef, indexRef.current)) {
        onNavigate(null);
      } else {
        onNavigate(indexRef.current);
      }
    }
  });
  const ariaActiveDescendantProp = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return virtual && open && hasActiveIndex && {
      'aria-activedescendant': virtualId || activeId
    };
  }, [virtual, open, hasActiveIndex, virtualId, activeId]);
  const floating = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      'aria-orientation': orientation === 'both' ? undefined : orientation,
      ...(!(0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isTypeableCombobox)(elements.domReference) && ariaActiveDescendantProp),
      onKeyDown: commonOnKeyDown,
      onPointerMove() {
        isPointerModalityRef.current = true;
      }
    };
  }, [ariaActiveDescendantProp, commonOnKeyDown, elements.domReference, orientation]);
  const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    function checkVirtualMouse(event) {
      if (focusItemOnOpen === 'auto' && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isVirtualClick)(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    function checkVirtualPointer(event) {
      // `pointerdown` fires first, reset the state then perform the checks.
      focusItemOnOpenRef.current = focusItemOnOpen;
      if (focusItemOnOpen === 'auto' && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.isVirtualPointerEvent)(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    return {
      ...ariaActiveDescendantProp,
      onKeyDown(event) {
        isPointerModalityRef.current = false;
        const isArrowKey = event.key.indexOf('Arrow') === 0;
        const isCrossOpenKey = isCrossOrientationOpenKey(event.key, orientation, rtl);
        const isCrossCloseKey = isCrossOrientationCloseKey(event.key, orientation, rtl);
        const isMainKey = isMainOrientationKey(event.key, orientation);
        const isNavigationKey = (nested ? isCrossOpenKey : isMainKey) || event.key === 'Enter' || event.key.trim() === '';
        if (virtual && open) {
          const rootNode = tree == null ? void 0 : tree.nodesRef.current.find(node => node.parentId == null);
          const deepestNode = tree && rootNode ? getDeepestNode(tree.nodesRef.current, rootNode.id) : null;
          if (isArrowKey && deepestNode && virtualItemRef) {
            const eventObject = new KeyboardEvent('keydown', {
              key: event.key,
              bubbles: true
            });
            if (isCrossOpenKey || isCrossCloseKey) {
              var _deepestNode$context, _deepestNode$context2;
              const isCurrentTarget = ((_deepestNode$context = deepestNode.context) == null ? void 0 : _deepestNode$context.elements.domReference) === event.currentTarget;
              const dispatchItem = isCrossCloseKey && !isCurrentTarget ? (_deepestNode$context2 = deepestNode.context) == null ? void 0 : _deepestNode$context2.elements.domReference : isCrossOpenKey ? listRef.current.find(item => (item == null ? void 0 : item.id) === activeId) : null;
              if (dispatchItem) {
                (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
                dispatchItem.dispatchEvent(eventObject);
                setVirtualId(undefined);
              }
            }
            if (isMainKey && deepestNode.context) {
              if (deepestNode.context.open && deepestNode.parentId && event.currentTarget !== deepestNode.context.elements.domReference) {
                var _deepestNode$context$;
                (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
                (_deepestNode$context$ = deepestNode.context.elements.domReference) == null || _deepestNode$context$.dispatchEvent(eventObject);
                return;
              }
            }
          }
          return commonOnKeyDown(event);
        }

        // If a floating element should not open on arrow key down, avoid
        // setting `activeIndex` while it's closed.
        if (!open && !openOnArrowKeyDown && isArrowKey) {
          return;
        }
        if (isNavigationKey) {
          keyRef.current = nested && isMainKey ? null : event.key;
        }
        if (nested) {
          if (isCrossOpenKey) {
            (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
            if (open) {
              indexRef.current = getMinIndex(listRef, disabledIndicesRef.current);
              onNavigate(indexRef.current);
            } else {
              onOpenChange(true, event.nativeEvent, 'list-navigation');
            }
          }
          return;
        }
        if (isMainKey) {
          if (selectedIndex != null) {
            indexRef.current = selectedIndex;
          }
          (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
          if (!open && openOnArrowKeyDown) {
            onOpenChange(true, event.nativeEvent, 'list-navigation');
          } else {
            commonOnKeyDown(event);
          }
          if (open) {
            onNavigate(indexRef.current);
          }
        }
      },
      onFocus() {
        if (open && !virtual) {
          onNavigate(null);
        }
      },
      onPointerDown: checkVirtualPointer,
      onMouseDown: checkVirtualMouse,
      onClick: checkVirtualMouse
    };
  }, [activeId, ariaActiveDescendantProp, commonOnKeyDown, disabledIndicesRef, focusItemOnOpen, listRef, nested, onNavigate, onOpenChange, open, openOnArrowKeyDown, orientation, rtl, selectedIndex, tree, virtual, virtualItemRef]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}

const componentRoleToAriaRoleMap = /*#__PURE__*/new Map([['select', 'listbox'], ['combobox', 'listbox'], ['label', false]]);

/**
 * Adds base screen reader props to the reference and floating elements for a
 * given floating element `role`.
 * @see https://floating-ui.com/docs/useRole
 */
function useRole(context, props) {
  var _componentRoleToAriaR;
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    floatingId
  } = context;
  const {
    enabled = true,
    role = 'dialog'
  } = props;
  const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
  const referenceId = useId();
  const parentId = useFloatingParentNodeId();
  const isNested = parentId != null;
  const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (ariaRole === 'tooltip' || role === 'label') {
      return {
        ["aria-" + (role === 'label' ? 'labelledby' : 'describedby')]: open ? floatingId : undefined
      };
    }
    return {
      'aria-expanded': open ? 'true' : 'false',
      'aria-haspopup': ariaRole === 'alertdialog' ? 'dialog' : ariaRole,
      'aria-controls': open ? floatingId : undefined,
      ...(ariaRole === 'listbox' && {
        role: 'combobox'
      }),
      ...(ariaRole === 'menu' && {
        id: referenceId
      }),
      ...(ariaRole === 'menu' && isNested && {
        role: 'menuitem'
      }),
      ...(role === 'select' && {
        'aria-autocomplete': 'none'
      }),
      ...(role === 'combobox' && {
        'aria-autocomplete': 'list'
      })
    };
  }, [ariaRole, floatingId, isNested, open, referenceId, role]);
  const floating = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const floatingProps = {
      id: floatingId,
      ...(ariaRole && {
        role: ariaRole
      })
    };
    if (ariaRole === 'tooltip' || role === 'label') {
      return floatingProps;
    }
    return {
      ...floatingProps,
      ...(ariaRole === 'menu' && {
        'aria-labelledby': referenceId
      })
    };
  }, [ariaRole, floatingId, referenceId, role]);
  const item = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(_ref => {
    let {
      active,
      selected
    } = _ref;
    const commonProps = {
      role: 'option',
      ...(active && {
        id: floatingId + "-option"
      })
    };

    // For `menu`, we are unable to tell if the item is a `menuitemradio`
    // or `menuitemcheckbox`. For backwards-compatibility reasons, also
    // avoid defaulting to `menuitem` as it may overwrite custom role props.
    switch (role) {
      case 'select':
        return {
          ...commonProps,
          'aria-selected': active && selected
        };
      case 'combobox':
        {
          return {
            ...commonProps,
            ...(active && {
              'aria-selected': true
            })
          };
        }
    }
    return {};
  }, [floatingId, role]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}

// Converts a JS style key like `backgroundColor` to a CSS transition-property
// like `background-color`.
const camelCaseToKebabCase = str => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());
function execWithArgsOrReturn(valueOrFn, args) {
  return typeof valueOrFn === 'function' ? valueOrFn(args) : valueOrFn;
}
function useDelayUnmount(open, durationMs) {
  const [isMounted, setIsMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(open);
  if (open && !isMounted) {
    setIsMounted(true);
  }
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!open && isMounted) {
      const timeout = setTimeout(() => setIsMounted(false), durationMs);
      return () => clearTimeout(timeout);
    }
  }, [open, isMounted, durationMs]);
  return isMounted;
}
/**
 * Provides a status string to apply CSS transitions to a floating element,
 * correctly handling placement-aware transitions.
 * @see https://floating-ui.com/docs/useTransition#usetransitionstatus
 */
function useTransitionStatus(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    elements: {
      floating
    }
  } = context;
  const {
    duration = 250
  } = props;
  const isNumberDuration = typeof duration === 'number';
  const closeDuration = (isNumberDuration ? duration : duration.close) || 0;
  const [status, setStatus] = react__WEBPACK_IMPORTED_MODULE_0__.useState('unmounted');
  const isMounted = useDelayUnmount(open, closeDuration);
  if (!isMounted && status === 'close') {
    setStatus('unmounted');
  }
  index(() => {
    if (!floating) return;
    if (open) {
      setStatus('initial');
      const frame = requestAnimationFrame(() => {
        setStatus('open');
      });
      return () => {
        cancelAnimationFrame(frame);
      };
    }
    setStatus('close');
  }, [open, floating]);
  return {
    isMounted,
    status
  };
}
/**
 * Provides styles to apply CSS transitions to a floating element, correctly
 * handling placement-aware transitions. Wrapper around `useTransitionStatus`.
 * @see https://floating-ui.com/docs/useTransition#usetransitionstyles
 */
function useTransitionStyles(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    initial: unstable_initial = {
      opacity: 0
    },
    open: unstable_open,
    close: unstable_close,
    common: unstable_common,
    duration = 250
  } = props;
  const placement = context.placement;
  const side = placement.split('-')[0];
  const fnArgs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    side,
    placement
  }), [side, placement]);
  const isNumberDuration = typeof duration === 'number';
  const openDuration = (isNumberDuration ? duration : duration.open) || 0;
  const closeDuration = (isNumberDuration ? duration : duration.close) || 0;
  const [styles, setStyles] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => ({
    ...execWithArgsOrReturn(unstable_common, fnArgs),
    ...execWithArgsOrReturn(unstable_initial, fnArgs)
  }));
  const {
    isMounted,
    status
  } = useTransitionStatus(context, {
    duration
  });
  const initialRef = useLatestRef(unstable_initial);
  const openRef = useLatestRef(unstable_open);
  const closeRef = useLatestRef(unstable_close);
  const commonRef = useLatestRef(unstable_common);
  index(() => {
    const initialStyles = execWithArgsOrReturn(initialRef.current, fnArgs);
    const closeStyles = execWithArgsOrReturn(closeRef.current, fnArgs);
    const commonStyles = execWithArgsOrReturn(commonRef.current, fnArgs);
    const openStyles = execWithArgsOrReturn(openRef.current, fnArgs) || Object.keys(initialStyles).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    if (status === 'initial') {
      setStyles(styles => ({
        transitionProperty: styles.transitionProperty,
        ...commonStyles,
        ...initialStyles
      }));
    }
    if (status === 'open') {
      setStyles({
        transitionProperty: Object.keys(openStyles).map(camelCaseToKebabCase).join(','),
        transitionDuration: openDuration + "ms",
        ...commonStyles,
        ...openStyles
      });
    }
    if (status === 'close') {
      const styles = closeStyles || initialStyles;
      setStyles({
        transitionProperty: Object.keys(styles).map(camelCaseToKebabCase).join(','),
        transitionDuration: closeDuration + "ms",
        ...commonStyles,
        ...styles
      });
    }
  }, [closeDuration, closeRef, initialRef, openRef, commonRef, openDuration, status, fnArgs]);
  return {
    isMounted,
    styles
  };
}

/**
 * Provides a matching callback that can be used to focus an item as the user
 * types, often used in tandem with `useListNavigation()`.
 * @see https://floating-ui.com/docs/useTypeahead
 */
function useTypeahead(context, props) {
  var _ref;
  const {
    open,
    dataRef
  } = context;
  const {
    listRef,
    activeIndex,
    onMatch: unstable_onMatch,
    onTypingChange: unstable_onTypingChange,
    enabled = true,
    findMatch = null,
    resetMs = 750,
    ignoreKeys = [],
    selectedIndex = null
  } = props;
  const timeoutIdRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  const stringRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef('');
  const prevIndexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef((_ref = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref : -1);
  const matchIndexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const onMatch = useEffectEvent(unstable_onMatch);
  const onTypingChange = useEffectEvent(unstable_onTypingChange);
  const findMatchRef = useLatestRef(findMatch);
  const ignoreKeysRef = useLatestRef(ignoreKeys);
  index(() => {
    if (open) {
      clearTimeout(timeoutIdRef.current);
      matchIndexRef.current = null;
      stringRef.current = '';
    }
  }, [open]);
  index(() => {
    // Sync arrow key navigation but not typeahead navigation.
    if (open && stringRef.current === '') {
      var _ref2;
      prevIndexRef.current = (_ref2 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref2 : -1;
    }
  }, [open, selectedIndex, activeIndex]);
  const setTypingChange = useEffectEvent(value => {
    if (value) {
      if (!dataRef.current.typing) {
        dataRef.current.typing = value;
        onTypingChange(value);
      }
    } else {
      if (dataRef.current.typing) {
        dataRef.current.typing = value;
        onTypingChange(value);
      }
    }
  });
  const onKeyDown = useEffectEvent(event => {
    function getMatchingIndex(list, orderedList, string) {
      const str = findMatchRef.current ? findMatchRef.current(orderedList, string) : orderedList.find(text => (text == null ? void 0 : text.toLocaleLowerCase().indexOf(string.toLocaleLowerCase())) === 0);
      return str ? list.indexOf(str) : -1;
    }
    const listContent = listRef.current;
    if (stringRef.current.length > 0 && stringRef.current[0] !== ' ') {
      if (getMatchingIndex(listContent, listContent, stringRef.current) === -1) {
        setTypingChange(false);
      } else if (event.key === ' ') {
        (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
      }
    }
    if (listContent == null || ignoreKeysRef.current.includes(event.key) ||
    // Character key.
    event.key.length !== 1 ||
    // Modifier key.
    event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    if (open && event.key !== ' ') {
      (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.stopEvent)(event);
      setTypingChange(true);
    }

    // Bail out if the list contains a word like "llama" or "aaron". TODO:
    // allow it in this case, too.
    const allowRapidSuccessionOfFirstLetter = listContent.every(text => {
      var _text$, _text$2;
      return text ? ((_text$ = text[0]) == null ? void 0 : _text$.toLocaleLowerCase()) !== ((_text$2 = text[1]) == null ? void 0 : _text$2.toLocaleLowerCase()) : true;
    });

    // Allows the user to cycle through items that start with the same letter
    // in rapid succession.
    if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
      stringRef.current = '';
      prevIndexRef.current = matchIndexRef.current;
    }
    stringRef.current += event.key;
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      stringRef.current = '';
      prevIndexRef.current = matchIndexRef.current;
      setTypingChange(false);
    }, resetMs);
    const prevIndex = prevIndexRef.current;
    const index = getMatchingIndex(listContent, [...listContent.slice((prevIndex || 0) + 1), ...listContent.slice(0, (prevIndex || 0) + 1)], stringRef.current);
    if (index !== -1) {
      onMatch(index);
      matchIndexRef.current = index;
    } else if (event.key !== ' ') {
      stringRef.current = '';
      setTypingChange(false);
    }
  });
  const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    onKeyDown
  }), [onKeyDown]);
  const floating = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      onKeyDown,
      onKeyUp(event) {
        if (event.key === ' ') {
          setTypingChange(false);
        }
      }
    };
  }, [onKeyDown, setTypingChange]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}

function getArgsWithCustomFloatingHeight(state, height) {
  return {
    ...state,
    rects: {
      ...state.rects,
      floating: {
        ...state.rects.floating,
        height
      }
    }
  };
}
/**
 * Positions the floating element such that an inner element inside of it is
 * anchored to the reference element.
 * @see https://floating-ui.com/docs/inner
 */
const inner = props => ({
  name: 'inner',
  options: props,
  async fn(state) {
    const {
      listRef,
      overflowRef,
      onFallbackChange,
      offset: innerOffset = 0,
      index = 0,
      minItemsVisible = 4,
      referenceOverflowThreshold = 0,
      scrollRef,
      ...detectOverflowOptions
    } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_6__.evaluate)(props, state);
    const {
      rects,
      elements: {
        floating
      }
    } = state;
    const item = listRef.current[index];
    if (true) {
      if (!state.placement.startsWith('bottom')) {
        warn('`placement` side must be "bottom" when using the `inner`', 'middleware.');
      }
    }
    if (!item) {
      return {};
    }
    const nextArgs = {
      ...state,
      ...(await (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__.offset)(-item.offsetTop - floating.clientTop - rects.reference.height / 2 - item.offsetHeight / 2 - innerOffset).fn(state))
    };
    const el = (scrollRef == null ? void 0 : scrollRef.current) || floating;
    const overflow = await (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_3__.detectOverflow)(getArgsWithCustomFloatingHeight(nextArgs, el.scrollHeight), detectOverflowOptions);
    const refOverflow = await (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_3__.detectOverflow)(nextArgs, {
      ...detectOverflowOptions,
      elementContext: 'reference'
    });
    const diffY = Math.max(0, overflow.top);
    const nextY = nextArgs.y + diffY;
    const maxHeight = Math.max(0, el.scrollHeight - diffY - Math.max(0, overflow.bottom));
    el.style.maxHeight = maxHeight + "px";
    el.scrollTop = diffY;

    // There is not enough space, fallback to standard anchored positioning
    if (onFallbackChange) {
      if (el.offsetHeight < item.offsetHeight * Math.min(minItemsVisible, listRef.current.length - 1) - 1 || refOverflow.top >= -referenceOverflowThreshold || refOverflow.bottom >= -referenceOverflowThreshold) {
        react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(() => onFallbackChange(true));
      } else {
        react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(() => onFallbackChange(false));
      }
    }
    if (overflowRef) {
      overflowRef.current = await (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_3__.detectOverflow)(getArgsWithCustomFloatingHeight({
        ...nextArgs,
        y: nextY
      }, el.offsetHeight), detectOverflowOptions);
    }
    return {
      y: nextY
    };
  }
});
/**
 * Changes the `inner` middleware's `offset` upon a `wheel` event to
 * expand the floating element's height, revealing more list items.
 * @see https://floating-ui.com/docs/inner
 */
function useInnerOffset(context, props) {
  const {
    open,
    elements
  } = context;
  const {
    enabled = true,
    overflowRef,
    scrollRef,
    onChange: unstable_onChange
  } = props;
  const onChange = useEffectEvent(unstable_onChange);
  const controlledScrollingRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const prevScrollTopRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const initialOverflowRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!enabled) return;
    function onWheel(e) {
      if (e.ctrlKey || !el || overflowRef.current == null) {
        return;
      }
      const dY = e.deltaY;
      const isAtTop = overflowRef.current.top >= -0.5;
      const isAtBottom = overflowRef.current.bottom >= -0.5;
      const remainingScroll = el.scrollHeight - el.clientHeight;
      const sign = dY < 0 ? -1 : 1;
      const method = dY < 0 ? 'max' : 'min';
      if (el.scrollHeight <= el.clientHeight) {
        return;
      }
      if (!isAtTop && dY > 0 || !isAtBottom && dY < 0) {
        e.preventDefault();
        react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(() => {
          onChange(d => d + Math[method](dY, remainingScroll * sign));
        });
      } else if (/firefox/i.test((0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getUserAgent)())) {
        // Needed to propagate scrolling during momentum scrolling phase once
        // it gets limited by the boundary. UX improvement, not critical.
        el.scrollTop += dY;
      }
    }
    const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
    if (open && el) {
      el.addEventListener('wheel', onWheel);

      // Wait for the position to be ready.
      requestAnimationFrame(() => {
        prevScrollTopRef.current = el.scrollTop;
        if (overflowRef.current != null) {
          initialOverflowRef.current = {
            ...overflowRef.current
          };
        }
      });
      return () => {
        prevScrollTopRef.current = null;
        initialOverflowRef.current = null;
        el.removeEventListener('wheel', onWheel);
      };
    }
  }, [enabled, open, elements.floating, overflowRef, scrollRef, onChange]);
  const floating = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    onKeyDown() {
      controlledScrollingRef.current = true;
    },
    onWheel() {
      controlledScrollingRef.current = false;
    },
    onPointerMove() {
      controlledScrollingRef.current = false;
    },
    onScroll() {
      const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
      if (!overflowRef.current || !el || !controlledScrollingRef.current) {
        return;
      }
      if (prevScrollTopRef.current !== null) {
        const scrollDiff = el.scrollTop - prevScrollTopRef.current;
        if (overflowRef.current.bottom < -0.5 && scrollDiff < -1 || overflowRef.current.top < -0.5 && scrollDiff > 1) {
          react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(() => onChange(d => d + scrollDiff));
        }
      }

      // [Firefox] Wait for the height change to have been applied.
      requestAnimationFrame(() => {
        prevScrollTopRef.current = el.scrollTop;
      });
    }
  }), [elements.floating, onChange, overflowRef, scrollRef]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => enabled ? {
    floating
  } : {}, [enabled, floating]);
}

function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let isInside = false;
  const length = polygon.length;
  for (let i = 0, j = length - 1; i < length; j = i++) {
    const [xi, yi] = polygon[i] || [0, 0];
    const [xj, yj] = polygon[j] || [0, 0];
    const intersect = yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      isInside = !isInside;
    }
  }
  return isInside;
}
function isInside(point, rect) {
  return point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height;
}
/**
 * Generates a safe polygon area that the user can traverse without closing the
 * floating element once leaving the reference element.
 * @see https://floating-ui.com/docs/useHover#safepolygon
 */
function safePolygon(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    buffer = 0.5,
    blockPointerEvents = false,
    requireIntent = true
  } = options;
  let timeoutId;
  let hasLanded = false;
  let lastX = null;
  let lastY = null;
  let lastCursorTime = performance.now();
  function getCursorSpeed(x, y) {
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastCursorTime;
    if (lastX === null || lastY === null || elapsedTime === 0) {
      lastX = x;
      lastY = y;
      lastCursorTime = currentTime;
      return null;
    }
    const deltaX = x - lastX;
    const deltaY = y - lastY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const speed = distance / elapsedTime; // px / ms

    lastX = x;
    lastY = y;
    lastCursorTime = currentTime;
    return speed;
  }
  const fn = _ref => {
    let {
      x,
      y,
      placement,
      elements,
      onClose,
      nodeId,
      tree
    } = _ref;
    return function onMouseMove(event) {
      function close() {
        clearTimeout(timeoutId);
        onClose();
      }
      clearTimeout(timeoutId);
      if (!elements.domReference || !elements.floating || placement == null || x == null || y == null) {
        return;
      }
      const {
        clientX,
        clientY
      } = event;
      const clientPoint = [clientX, clientY];
      const target = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(event);
      const isLeave = event.type === 'mouseleave';
      const isOverFloatingEl = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(elements.floating, target);
      const isOverReferenceEl = (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(elements.domReference, target);
      const refRect = elements.domReference.getBoundingClientRect();
      const rect = elements.floating.getBoundingClientRect();
      const side = placement.split('-')[0];
      const cursorLeaveFromRight = x > rect.right - rect.width / 2;
      const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
      const isOverReferenceRect = isInside(clientPoint, refRect);
      const isFloatingWider = rect.width > refRect.width;
      const isFloatingTaller = rect.height > refRect.height;
      const left = (isFloatingWider ? refRect : rect).left;
      const right = (isFloatingWider ? refRect : rect).right;
      const top = (isFloatingTaller ? refRect : rect).top;
      const bottom = (isFloatingTaller ? refRect : rect).bottom;
      if (isOverFloatingEl) {
        hasLanded = true;
        if (!isLeave) {
          return;
        }
      }
      if (isOverReferenceEl) {
        hasLanded = false;
      }
      if (isOverReferenceEl && !isLeave) {
        hasLanded = true;
        return;
      }

      // Prevent overlapping floating element from being stuck in an open-close
      // loop: https://github.com/floating-ui/floating-ui/issues/1910
      if (isLeave && (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(event.relatedTarget) && (0,_floating_ui_react_utils__WEBPACK_IMPORTED_MODULE_5__.contains)(elements.floating, event.relatedTarget)) {
        return;
      }

      // If any nested child is open, abort.
      if (tree && getChildren(tree.nodesRef.current, nodeId).some(_ref2 => {
        let {
          context
        } = _ref2;
        return context == null ? void 0 : context.open;
      })) {
        return;
      }

      // If the pointer is leaving from the opposite side, the "buffer" logic
      // creates a point where the floating element remains open, but should be
      // ignored.
      // A constant of 1 handles floating point rounding errors.
      if (side === 'top' && y >= refRect.bottom - 1 || side === 'bottom' && y <= refRect.top + 1 || side === 'left' && x >= refRect.right - 1 || side === 'right' && x <= refRect.left + 1) {
        return close();
      }

      // Ignore when the cursor is within the rectangular trough between the
      // two elements. Since the triangle is created from the cursor point,
      // which can start beyond the ref element's edge, traversing back and
      // forth from the ref to the floating element can cause it to close. This
      // ensures it always remains open in that case.
      let rectPoly = [];
      switch (side) {
        case 'top':
          rectPoly = [[left, refRect.top + 1], [left, rect.bottom - 1], [right, rect.bottom - 1], [right, refRect.top + 1]];
          break;
        case 'bottom':
          rectPoly = [[left, rect.top + 1], [left, refRect.bottom - 1], [right, refRect.bottom - 1], [right, rect.top + 1]];
          break;
        case 'left':
          rectPoly = [[rect.right - 1, bottom], [rect.right - 1, top], [refRect.left + 1, top], [refRect.left + 1, bottom]];
          break;
        case 'right':
          rectPoly = [[refRect.right - 1, bottom], [refRect.right - 1, top], [rect.left + 1, top], [rect.left + 1, bottom]];
          break;
      }
      function getPolygon(_ref3) {
        let [x, y] = _ref3;
        switch (side) {
          case 'top':
            {
              const cursorPointOne = [isFloatingWider ? x + buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y + buffer + 1];
              const cursorPointTwo = [isFloatingWider ? x - buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y + buffer + 1];
              const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer]];
              return [cursorPointOne, cursorPointTwo, ...commonPoints];
            }
          case 'bottom':
            {
              const cursorPointOne = [isFloatingWider ? x + buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y - buffer];
              const cursorPointTwo = [isFloatingWider ? x - buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y - buffer];
              const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer]];
              return [cursorPointOne, cursorPointTwo, ...commonPoints];
            }
          case 'left':
            {
              const cursorPointOne = [x + buffer + 1, isFloatingTaller ? y + buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
              const cursorPointTwo = [x + buffer + 1, isFloatingTaller ? y - buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
              const commonPoints = [[cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer, rect.bottom]];
              return [...commonPoints, cursorPointOne, cursorPointTwo];
            }
          case 'right':
            {
              const cursorPointOne = [x - buffer, isFloatingTaller ? y + buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
              const cursorPointTwo = [x - buffer, isFloatingTaller ? y - buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
              const commonPoints = [[cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer, rect.bottom]];
              return [cursorPointOne, cursorPointTwo, ...commonPoints];
            }
        }
      }
      if (isPointInPolygon([clientX, clientY], rectPoly)) {
        return;
      }
      if (hasLanded && !isOverReferenceRect) {
        return close();
      }
      if (!isLeave && requireIntent) {
        const cursorSpeed = getCursorSpeed(event.clientX, event.clientY);
        const cursorSpeedThreshold = 0.1;
        if (cursorSpeed !== null && cursorSpeed < cursorSpeedThreshold) {
          return close();
        }
      }
      if (!isPointInPolygon([clientX, clientY], getPolygon([x, y]))) {
        close();
      } else if (!hasLanded && requireIntent) {
        timeoutId = window.setTimeout(close, 40);
      }
    };
  };
  fn.__options = {
    blockPointerEvents
  };
  return fn;
}




/***/ }),

/***/ "./src/components/Icons.js":
/*!*********************************!*\
  !*** ./src/components/Icons.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CancelIcon: () => (/* binding */ CancelIcon),
/* harmony export */   EyeIcon: () => (/* binding */ EyeIcon),
/* harmony export */   InvoiceIcon: () => (/* binding */ InvoiceIcon),
/* harmony export */   PayIcon: () => (/* binding */ PayIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const InvoiceIcon = ({
  className
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "14",
  height: "17",
  viewBox: "0 0 17 17",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: className
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M5.66602 14.875C5.27643 14.875 4.94293 14.7363 4.66549 14.4589C4.38806 14.1814 4.24935 13.8479 4.24935 13.4583V12.0417H2.83268C2.4431 12.0417 2.10959 11.903 1.83216 11.6255C1.55473 11.3481 1.41602 11.0146 1.41602 10.625V7.79167C1.41602 7.18958 1.62261 6.6849 2.03581 6.2776C2.449 5.87031 2.95074 5.66667 3.54102 5.66667H13.4577C14.0598 5.66667 14.5645 5.87031 14.9717 6.2776C15.379 6.6849 15.5827 7.18958 15.5827 7.79167V10.625C15.5827 11.0146 15.444 11.3481 15.1665 11.6255C14.8891 11.903 14.5556 12.0417 14.166 12.0417H12.7493V13.4583C12.7493 13.8479 12.6106 14.1814 12.3332 14.4589C12.0558 14.7363 11.7223 14.875 11.3327 14.875H5.66602ZM2.83268 10.625H4.24935C4.24935 10.2354 4.38806 9.90191 4.66549 9.62448C4.94293 9.34705 5.27643 9.20833 5.66602 9.20833H11.3327C11.7223 9.20833 12.0558 9.34705 12.3332 9.62448C12.6106 9.90191 12.7493 10.2354 12.7493 10.625H14.166V7.79167C14.166 7.59097 14.0981 7.42274 13.9624 7.28698C13.8266 7.15122 13.6584 7.08333 13.4577 7.08333H3.54102C3.34032 7.08333 3.17209 7.15122 3.03633 7.28698C2.90056 7.42274 2.83268 7.59097 2.83268 7.79167V10.625ZM11.3327 5.66667V3.54167H5.66602V5.66667H4.24935V3.54167C4.24935 3.15208 4.38806 2.81858 4.66549 2.54115C4.94293 2.26372 5.27643 2.125 5.66602 2.125H11.3327C11.7223 2.125 12.0558 2.26372 12.3332 2.54115C12.6106 2.81858 12.7493 3.15208 12.7493 3.54167V5.66667H11.3327ZM12.7493 8.85417C12.95 8.85417 13.1183 8.78628 13.254 8.65052C13.3898 8.51476 13.4577 8.34653 13.4577 8.14583C13.4577 7.94514 13.3898 7.77691 13.254 7.64115C13.1183 7.50538 12.95 7.4375 12.7493 7.4375C12.5487 7.4375 12.3804 7.50538 12.2447 7.64115C12.1089 7.77691 12.041 7.94514 12.041 8.14583C12.041 8.34653 12.1089 8.51476 12.2447 8.65052C12.3804 8.78628 12.5487 8.85417 12.7493 8.85417ZM11.3327 13.4583V10.625H5.66602V13.4583H11.3327Z",
  fill: "currentColor"
}));
const CancelIcon = ({
  className
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  className: className
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}));
const PayIcon = ({
  className
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: 1.5,
  stroke: "currentColor",
  className: className
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
}));
const EyeIcon = ({
  className
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 14 10",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: className
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M7 8C7.79545 8 8.47159 7.70833 9.02841 7.125C9.58523 6.54167 9.86364 5.83333 9.86364 5C9.86364 4.16667 9.58523 3.45833 9.02841 2.875C8.47159 2.29167 7.79545 2 7 2C6.20455 2 5.52841 2.29167 4.97159 2.875C4.41477 3.45833 4.13636 4.16667 4.13636 5C4.13636 5.83333 4.41477 6.54167 4.97159 7.125C5.52841 7.70833 6.20455 8 7 8ZM7 6.8C6.52273 6.8 6.11705 6.625 5.78295 6.275C5.44886 5.925 5.28182 5.5 5.28182 5C5.28182 4.5 5.44886 4.075 5.78295 3.725C6.11705 3.375 6.52273 3.2 7 3.2C7.47727 3.2 7.88295 3.375 8.21705 3.725C8.55114 4.075 8.71818 4.5 8.71818 5C8.71818 5.5 8.55114 5.925 8.21705 6.275C7.88295 6.625 7.47727 6.8 7 6.8ZM7 10C5.45152 10 4.04091 9.54722 2.76818 8.64167C1.49545 7.73611 0.572727 6.52222 0 5C0.572727 3.47778 1.49545 2.26389 2.76818 1.35833C4.04091 0.452778 5.45152 0 7 0C8.54848 0 9.95909 0.452778 11.2318 1.35833C12.5045 2.26389 13.4273 3.47778 14 5C13.4273 6.52222 12.5045 7.73611 11.2318 8.64167C9.95909 9.54722 8.54848 10 7 10ZM7 8.66667C8.19848 8.66667 9.29886 8.33611 10.3011 7.675C11.3034 7.01389 12.0697 6.12222 12.6 5C12.0697 3.87778 11.3034 2.98611 10.3011 2.325C9.29886 1.66389 8.19848 1.33333 7 1.33333C5.80152 1.33333 4.70114 1.66389 3.69886 2.325C2.69659 2.98611 1.9303 3.87778 1.4 5C1.9303 6.12222 2.69659 7.01389 3.69886 7.675C4.70114 8.33611 5.80152 8.66667 7 8.66667Z",
  fill: "currentColor"
}));

/***/ }),

/***/ "./src/components/OrderTable.js":
/*!**************************************!*\
  !*** ./src/components/OrderTable.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderTable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icons */ "./src/components/Icons.js");



function OrderTable({
  orders,
  orderTotalSort,
  setOrderTotalSort,
  sortTotal,
  dueDateSort,
  setDueDateSort,
  sortDueDate
}) {
  const toggleSortTotal = () => {
    if (orderTotalSort === 'none') {
      setOrderTotalSort('asc');
      sortTotal('asc');
    } else if (orderTotalSort === 'asc') {
      setOrderTotalSort('desc');
      sortTotal('desc');
    } else {
      setOrderTotalSort('none');
      sortTotal('none');
    }
  };
  const toggleSortDueDate = () => {
    if (dueDateSort === 'none') {
      setDueDateSort('asc');
      sortDueDate('asc');
    } else if (dueDateSort === 'asc') {
      setDueDateSort('desc');
      sortDueDate('desc');
    } else {
      setDueDateSort('none');
      sortDueDate('none');
    }
  };
  const printInvoice = url => {
    fetch(url).then(response => response.blob()).then(blob => {
      const fileURL = URL.createObjectURL(blob);
      const printWindow = window.open(fileURL);
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }).catch(error => console.error('Error fetching the file:', error));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "table-responsive overflow-x-auto"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "shop_table border-collapse w-full min-w-[800px]"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase"
  }, "Order"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase"
  }, "Date"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase"
  }, "Status"), NovaOrders.has_payment_types && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase cursor-pointer",
    onClick: toggleSortDueDate
  }, "Due Date ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `sort-by ${dueDateSort}`
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase cursor-pointer",
    onClick: toggleSortTotal
  }, "Total ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `sort-by ${orderTotalSort}`
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", {
    className: "text-sm"
  }, orders.map(order => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: order.id,
    className: `hover:bg-gray-100 ${order.status}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "py-4 px-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: order.order_url,
    className: "text-nova-primary"
  }, "#", order.order_number)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "py-4 px-4"
  }, order.date), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: `py-4 px-4 capitalize order-actions ${order.status} ${order.is_overdue ? 'text-red-500 flex items-center' : ''}`
  }, order.is_overdue ? 'Overdue' : `${order.status.replace('-', ' ')} ${order.status === 'pending' ? ' Payment' : ''}`, order.is_overdue && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "red",
    className: "size-5"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    clipRule: "evenodd"
  }))), NovaOrders.has_payment_types && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "py-4 px-4"
  }, order.due_date), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    dangerouslySetInnerHTML: {
      __html: order.total
    },
    className: "py-4 px-4 font-title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "py-4 px-4 text-xs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-x-4 justify-end uppercase"
  }, Object.entries(order.actions).map(([actionKey, actionValue]) => {
    let content, title;
    switch (actionValue.name.toLowerCase()) {
      case 'invoice':
        content = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icons__WEBPACK_IMPORTED_MODULE_1__.InvoiceIcon, {
          className: "mr-1 hover:text-nova-primary"
        });
        title = 'Print Invoice';
        break;
      case 'cancel':
        content = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icons__WEBPACK_IMPORTED_MODULE_1__.CancelIcon, {
          className: "size-[14px] mr-1 hover:text-nova-primary"
        });
        title = 'Cancel Order';
        break;
      case 'pay':
        content = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icons__WEBPACK_IMPORTED_MODULE_1__.PayIcon, {
          className: "size-[14px] mr-1 hover:text-nova-primary"
        });
        title = 'Pay Order';
        break;
      default:
        content = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icons__WEBPACK_IMPORTED_MODULE_1__.EyeIcon, {
          className: "mr-1 hover:text-nova-primary"
        });
        title = 'View Order';
        break;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: `text-black uppercase flex items-center hover:text-nova-primary print-link ${actionKey}`,
      key: actionKey,
      href: actionValue.url,
      title: title,
      onClick: actionKey === 'invoice' ? e => {
        e.preventDefault();
        printInvoice(actionValue.url);
      } : undefined
    }, content);
  }))))))));
}

/***/ }),

/***/ "./src/components/Orders.js":
/*!**********************************!*\
  !*** ./src/components/Orders.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _OrderTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderTable */ "./src/components/OrderTable.js");
/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pagination */ "./src/components/Pagination.js");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Search */ "./src/components/Search.js");





function Orders() {
  const [orders, setOrders] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(NovaOrders.orders);
  const [orderTotalSort, setOrderTotalSort] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('none');
  const [dueDateSort, setDueDateSort] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('none');
  const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = pageNum => {
    setCurrentPage(pageNum);
  };
  const handleFilter = filters => {
    const {
      searchTerm,
      searchStatus,
      startDate,
      endDate,
      orderTotal,
      totalSort
    } = filters;
    let filteredOrders = NovaOrders.orders;
    setDueDateSort('none');

    // Filter by search term
    if (searchTerm.length > 0) {
      filteredOrders = filteredOrders.filter(order => order.order_number.includes(searchTerm));
    }

    // Filter by status
    if (searchStatus !== 'all') {
      // if overdue
      if (searchStatus === 'overdue') {
        filteredOrders = filteredOrders.filter(order => order.is_overdue === true);
      }
      // if not overdue
      else {
        filteredOrders = filteredOrders.filter(order => order.status === searchStatus);
      }
    }

    // Filter by date range
    if (startDate || endDate) {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.date);
        let isValid = true; // Start assuming the order is valid

        if (startDate) {
          const start = new Date(startDate);
          if (orderDate < start) {
            isValid = false; // If the order date is before the start date, it's not valid
          }
        }
        if (endDate) {
          const end = new Date(endDate);
          if (orderDate > end) {
            isValid = false; // If the order date is after the end date, it's not valid
          }
        }
        return isValid;
      });
    }

    // Filter by order total
    if (parseFloat(orderTotal) > 0) {
      switch (totalSort) {
        case 'equals':
          filteredOrders = filteredOrders.filter(order => parseFloat(order.order_total) === parseFloat(orderTotal));
          break;
        case 'less':
          filteredOrders = filteredOrders.filter(order => parseFloat(order.order_total) <= parseFloat(orderTotal));
          break;
        case 'greater':
          filteredOrders = filteredOrders.filter(order => parseFloat(order.order_total) >= parseFloat(orderTotal));
          break;
        default:
          break;
      }
    }
    if (orderTotalSort === 'asc') {
      filteredOrders = filteredOrders.sort((a, b) => a.order_total - b.order_total);
    }
    if (orderTotalSort === 'desc') {
      filteredOrders = filteredOrders.sort((a, b) => b.order_total - a.order_total);
    }
    if (dueDateSort === 'asc') {
      filteredOrders = filteredOrders.filter(order => order.due_date).sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    }
    if (dueDateSort === 'desc') {
      filteredOrders = filteredOrders.filter(order => order.due_date).sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    }
    setOrders(filteredOrders);
    setCurrentPage(1);
  };
  const handleReset = reset => {
    if (reset) {
      setOrders(NovaOrders.orders);
      setCurrentPage(1);
    }
  };
  const sortTotal = sort => {
    setDueDateSort('none');
    if (sort === 'asc') {
      setOrders(prev => [...prev].sort((a, b) => parseFloat(a.order_total) - parseFloat(b.order_total)));
    }
    if (sort === 'desc') {
      setOrders(prev => [...prev].sort((a, b) => parseFloat(b.order_total) - parseFloat(a.order_total)));
    }
    if (sort === 'none') {
      setOrders(prev => [...prev].sort((a, b) => parseFloat(b.id) - parseFloat(a.id)));
    }
  };
  const sortDueDate = sort => {
    setOrderTotalSort('none');
    setOrders(prev => {
      let sortedOrders = [...prev];

      // First, bring orders with due_date and status 'pending' to the front
      sortedOrders.sort((a, b) => {
        if (a.due_date && a.status === 'pending' && !(b.due_date && b.status === 'pending')) return -1;
        if (!(a.due_date && a.status === 'pending') && b.due_date && b.status === 'pending') return 1;
        return 0;
      });

      // Then sort them by due_date if both orders have due_date and status 'pending'
      if (sort === 'asc') {
        sortedOrders.sort((a, b) => {
          if (a.due_date && b.due_date && a.status === 'pending' && b.status === 'pending') {
            return new Date(a.due_date) - new Date(b.due_date);
          }
          return 0;
        });
      } else if (sort === 'desc') {
        sortedOrders.sort((a, b) => {
          if (a.due_date && b.due_date && a.status === 'pending' && b.status === 'pending') {
            return new Date(b.due_date) - new Date(a.due_date);
          }
          return 0;
        });
      }

      // Default sorting when 'none' is selected
      if (sort === 'none') {
        sortedOrders.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
      }
      return sortedOrders;
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Search__WEBPACK_IMPORTED_MODULE_3__["default"], {
    filters: handleFilter,
    reset: handleReset,
    setOrderTotalSort: setOrderTotalSort,
    setDueDateSort: setDueDateSort
  }), orders.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_OrderTable__WEBPACK_IMPORTED_MODULE_1__["default"], {
    orders: currentOrders,
    orderTotalSort: orderTotalSort,
    setOrderTotalSort: setOrderTotalSort,
    dueDateSort: dueDateSort,
    setDueDateSort: setDueDateSort,
    sortTotal: sortTotal,
    sortDueDate: sortDueDate
  }), totalPages > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Pagination__WEBPACK_IMPORTED_MODULE_2__["default"], {
    currentPage: currentPage,
    totalPages: totalPages,
    onPageChange: handlePageChange
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
    role: "alert"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    class: "block sm:inline text-sm"
  }, "No orders found for the given search criteria.")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Orders);

/***/ }),

/***/ "./src/components/Pagination.js":
/*!**************************************!*\
  !*** ./src/components/Pagination.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function Pagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(currentPage);
  const handlePageClick = pageNum => {
    onPageChange(pageNum);
    setInputValue(pageNum);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      setInputValue(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      setInputValue(currentPage - 1);
    }
  };
  const handleInputChange = event => {
    const value = event.target.value;
    if (value === '' || Number(value) >= 1 && Number(value) <= totalPages) {
      setInputValue(value);
    }
  };
  const handleInputSubmit = event => {
    if (event.key === 'Enter' && inputValue) {
      const pageNum = Number(inputValue);
      onPageChange(pageNum);
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (currentPage > 3) {
      pageNumbers.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        key: 1,
        onClick: () => handlePageClick(1)
      }, "1"));
      pageNumbers.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        key: "dots1"
      }, "..."));
    }
    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        key: i,
        className: `text-xs ${i === currentPage ? 'active' : ''} text-xs`,
        onClick: () => handlePageClick(i)
      }, i));
    }
    if (currentPage < totalPages - 2) {
      pageNumbers.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        key: "dots2"
      }, "..."));
      pageNumbers.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        className: "text-xs",
        key: totalPages,
        onClick: () => handlePageClick(totalPages)
      }, totalPages));
    }
    return pageNumbers;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pagination flex gap-x-4 justify-between text-xs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Page ", currentPage, " of ", totalPages), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-x-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "text-xs",
    onClick: handlePrevPage,
    disabled: currentPage === 1
  }, "Prev"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    value: inputValue,
    onChange: handleInputChange,
    onKeyDown: handleInputSubmit,
    min: "1",
    max: totalPages,
    className: "page-input text-xs"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "text-xs",
    onClick: handleNextPage,
    disabled: currentPage === totalPages
  }, "Next")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);

/***/ }),

/***/ "./src/components/Search.js":
/*!**********************************!*\
  !*** ./src/components/Search.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Search)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SearchDates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchDates */ "./src/components/SearchDates.js");
/* harmony import */ var _SearchInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchInput */ "./src/components/SearchInput.js");
/* harmony import */ var _SearchSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchSelect */ "./src/components/SearchSelect.js");
/* harmony import */ var _SearchTotal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SearchTotal */ "./src/components/SearchTotal.js");






function Search({
  filters,
  reset,
  setOrderTotalSort,
  setDueDateSort
}) {
  const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [searchStatus, setSearchStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all');
  const [startDate, setStartDate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [endDate, setEndDate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [orderTotal, setOrderTotal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [totalSort, setTotalSort] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('equals');
  const handleOnSubmit = event => {
    event.preventDefault();
    filters({
      searchTerm,
      searchStatus,
      startDate,
      endDate,
      orderTotal,
      totalSort
    });
  };
  const handleClearFields = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setOrderTotal(0);
    setTotalSort('equals');
    setSearchStatus('all');
    setOrderTotalSort('none');
    setDueDateSort('none');
    reset(true);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "searchform-order p-4 rounded-sm mb-8 text-sm"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "font-title text-black mb-4"
  }, "SEARCH ORDERS"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleOnSubmit,
    className: "form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-4 gap-x-4 mb-8"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SearchInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
    term: searchTerm,
    setTerm: setSearchTerm
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SearchSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: searchStatus,
    set: setSearchStatus,
    id: "search-status",
    label: "Status"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SearchDates__WEBPACK_IMPORTED_MODULE_1__["default"], {
    startDate: startDate,
    setStartDate: setStartDate,
    endDate: endDate,
    setEndDate: setEndDate
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SearchTotal__WEBPACK_IMPORTED_MODULE_4__["default"], {
    orderTotal: orderTotal,
    setOrderTotal: setOrderTotal,
    totalSort: totalSort,
    setTotalSort: setTotalSort
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col sm:flex-row gap-x-4 gap-y-2 justify-end font-title text-xs mb-8"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    onClick: handleClearFields,
    className: "text-white bg-slate-400 w-full sm:w-auto sm:min-w-[180px]"
  }, "CLEAR FIELDS"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    className: "text-white bg-nova-primary w-full  sm:w-auto sm:min-w-[180px]"
  }, "Search"))));
}

/***/ }),

/***/ "./src/components/SearchDates.js":
/*!***************************************!*\
  !*** ./src/components/SearchDates.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchDates)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/dist/react-datepicker.min.js");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-datepicker/dist/react-datepicker.css */ "./node_modules/react-datepicker/dist/react-datepicker.css");




function SearchDates({
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) {
  const StartDateInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
    value,
    onClick
  }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: "FROM",
    onClick: onClick,
    ref: ref,
    value: value,
    className: "w-full border-none rounded-sm p-2 placeholder:text-slate-400 placeholder:font-title text-sm"
  }));
  const EndDateInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
    value,
    onClick
  }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: "TO",
    onClick: onClick,
    ref: ref,
    value: value,
    className: "w-full border-none rounded-sm p-2 placeholder:text-slate-400 placeholder:font-title text-sm"
  }));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "block text-sm text-[#5E5E5E] font-title mb-2"
  }, "DATE RANGE"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 gap-x-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react_datepicker__WEBPACK_IMPORTED_MODULE_2___default()), {
    selected: startDate,
    onChange: date => setStartDate(date),
    selectsStart: true,
    startDate: startDate,
    endDate: endDate,
    maxDate: endDate,
    dateFormat: "MMM dd, yyyy",
    customInput: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(StartDateInput, null)
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react_datepicker__WEBPACK_IMPORTED_MODULE_2___default()), {
    selected: endDate,
    onChange: date => setEndDate(date),
    selectsEnd: true,
    startDate: startDate,
    endDate: endDate,
    minDate: startDate,
    dateFormat: "MMM dd, yyyy",
    customInput: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(EndDateInput, null)
  }))));
}

/***/ }),

/***/ "./src/components/SearchInput.js":
/*!***************************************!*\
  !*** ./src/components/SearchInput.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchInput)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function SearchInput({
  term,
  setTerm
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "search-order-number",
    className: "block text-sm text-[#5E5E5E] font-title mb-2"
  }, "Order Number"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "search-order-number",
    type: "text",
    placeholder: "=",
    className: "w-full border-none rounded-sm p-2 text-black text-sm",
    value: term,
    onChange: event => {
      setTerm(event.target.value);
    }
  }));
}

/***/ }),

/***/ "./src/components/SearchSelect.js":
/*!****************************************!*\
  !*** ./src/components/SearchSelect.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchSelect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function SearchSelect({
  id,
  label,
  value,
  set
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: "block text-sm text-[#5E5E5E] font-title mb-2"
  }, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    onChange: event => set(event.target.value),
    className: "w-full p-2 text-sm"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "all",
    selected: value === 'all'
  }, "Select ", label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "pending",
    selected: value === 'pending'
  }, "Pending Payment"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "on-hold",
    selected: value === 'on-hold'
  }, "On Hold"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "cancelled",
    selected: value === 'cancelled'
  }, "Cancelled"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "processing",
    selected: value === 'processing'
  }, "Processing"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "completed",
    selected: value === 'completed'
  }, "Completed"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "overdue",
    selected: value === 'overdue'
  }, "Overdue")));
}

/***/ }),

/***/ "./src/components/SearchTotal.js":
/*!***************************************!*\
  !*** ./src/components/SearchTotal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchTotal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function SearchTotal({
  orderTotal,
  setOrderTotal,
  totalSort,
  setTotalSort
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: `block text-sm text-[#5E5E5E] font-title mb-2`
  }, "ORDER TOTAL"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-2 gap-x-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    onChange: event => {
      return setTotalSort(event.target.value);
    },
    className: `w-full p-2 text-sm`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "equals",
    selected: totalSort === 'equals'
  }, "="), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "less",
    selected: totalSort === 'less'
  }, "LESS"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "greater",
    selected: totalSort === 'greater'
  }, "GREATER")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: "$",
    value: orderTotal > 0 ? orderTotal : '',
    onChange: event => {
      const value = event.target.value;
      return setOrderTotal(value);
    },
    className: "w-full border-none rounded-sm p-2 placeholder:text-slate-400 placeholder:font-title text-sm"
  })));
}

/***/ }),

/***/ "./node_modules/clsx/dist/clsx.js":
/*!****************************************!*\
  !*** ./node_modules/clsx/dist/clsx.js ***!
  \****************************************/
/***/ ((module) => {

function r(e){var o,t,f="";if("string"==typeof e||"number"==typeof e)f+=e;else if("object"==typeof e)if(Array.isArray(e)){var n=e.length;for(o=0;o<n;o++)e[o]&&(t=r(e[o]))&&(f&&(f+=" "),f+=t)}else for(t in e)e[t]&&(f&&(f+=" "),f+=t);return f}function e(){for(var e,o,t=0,f="",n=arguments.length;t<n;t++)(e=arguments[t])&&(o=r(e))&&(f&&(f+=" "),f+=o);return f}module.exports=e,module.exports.clsx=e;

/***/ }),

/***/ "./node_modules/date-fns/_lib/addLeadingZeros.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/addLeadingZeros.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.addLeadingZeros = addLeadingZeros;
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultLocale.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultLocale.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "defaultLocale", ({
  enumerable: true,
  get: function () {
    return _index.enUS;
  },
}));
var _index = __webpack_require__(/*! ../locale/en-US.js */ "./node_modules/date-fns/locale/en-US.js");


/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultOptions.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.getDefaultOptions = getDefaultOptions;
exports.setDefaultOptions = setDefaultOptions;

let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/format/formatters.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/formatters.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatters = void 0;
var _index = __webpack_require__(/*! ../../getDayOfYear.js */ "./node_modules/date-fns/getDayOfYear.js");
var _index2 = __webpack_require__(/*! ../../getISOWeek.js */ "./node_modules/date-fns/getISOWeek.js");
var _index3 = __webpack_require__(/*! ../../getISOWeekYear.js */ "./node_modules/date-fns/getISOWeekYear.js");
var _index4 = __webpack_require__(/*! ../../getWeek.js */ "./node_modules/date-fns/getWeek.js");
var _index5 = __webpack_require__(/*! ../../getWeekYear.js */ "./node_modules/date-fns/getWeekYear.js");

var _index6 = __webpack_require__(/*! ../addLeadingZeros.js */ "./node_modules/date-fns/_lib/addLeadingZeros.js");
var _index7 = __webpack_require__(/*! ./lightFormatters.js */ "./node_modules/date-fns/_lib/format/lightFormatters.js");

const dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

const formatters = (exports.formatters = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },

  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === "yo") {
      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }

    return _index7.lightFormatters.y(date, token);
  },

  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = (0, _index5.getWeekYear)(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return (0, _index6.addLeadingZeros)(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }

    // Padding
    return (0, _index6.addLeadingZeros)(weekYear, token.length);
  },

  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = (0, _index3.getISOWeekYear)(date);

    // Padding
    return (0, _index6.addLeadingZeros)(isoWeekYear, token.length);
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear();
    return (0, _index6.addLeadingZeros)(year, token.length);
  },

  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return (0, _index6.addLeadingZeros)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return (0, _index6.addLeadingZeros)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // Month
  M: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return _index7.lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting",
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },

  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return (0, _index6.addLeadingZeros)(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone",
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },

  // Local week of year
  w: function (date, token, localize, options) {
    const week = (0, _index4.getWeek)(date, options);

    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }

    return (0, _index6.addLeadingZeros)(week, token.length);
  },

  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = (0, _index2.getISOWeek)(date);

    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }

    return (0, _index6.addLeadingZeros)(isoWeek, token.length);
  },

  // Day of the month
  d: function (date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }

    return _index7.lightFormatters.d(date, token);
  },

  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = (0, _index.getDayOfYear)(date);

    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }

    return (0, _index6.addLeadingZeros)(dayOfYear, token.length);
  },

  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return (0, _index6.addLeadingZeros)(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return (0, _index6.addLeadingZeros)(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone",
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone",
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return (0, _index6.addLeadingZeros)(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "aaa":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }

    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "bbb":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return _index7.lightFormatters.h(date, token);
  },

  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }

    return _index7.lightFormatters.H(date, token);
  },

  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12;

    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0, _index6.addLeadingZeros)(hours, token.length);
  },

  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;

    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0, _index6.addLeadingZeros)(hours, token.length);
  },

  // Minute
  m: function (date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }

    return _index7.lightFormatters.m(date, token);
  },

  // Second
  s: function (date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }

    return _index7.lightFormatters.s(date, token);
  },

  // Fraction of second
  S: function (date, token) {
    return _index7.lightFormatters.S(date, token);
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return "Z";
    }

    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1000);
    return (0, _index6.addLeadingZeros)(timestamp, token.length);
  },

  // Milliseconds timestamp
  T: function (date, token, _localize) {
    const timestamp = date.getTime();
    return (0, _index6.addLeadingZeros)(timestamp, token.length);
  },
});

function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return (
    sign + String(hours) + delimiter + (0, _index6.addLeadingZeros)(minutes, 2)
  );
}

function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + (0, _index6.addLeadingZeros)(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}

function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = (0, _index6.addLeadingZeros)(Math.trunc(absOffset / 60), 2);
  const minutes = (0, _index6.addLeadingZeros)(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/format/lightFormatters.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/lightFormatters.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lightFormatters = void 0;
var _index = __webpack_require__(/*! ../addLeadingZeros.js */ "./node_modules/date-fns/_lib/addLeadingZeros.js");

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

const lightFormatters = (exports.lightFormatters = {
  // Year
  y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0, _index.addLeadingZeros)(
      token === "yy" ? year % 100 : year,
      token.length,
    );
  },

  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M"
      ? String(month + 1)
      : (0, _index.addLeadingZeros)(month + 1, 2);
  },

  // Day of the month
  d(date, token) {
    return (0, _index.addLeadingZeros)(date.getDate(), token.length);
  },

  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },

  // Hour [1-12]
  h(date, token) {
    return (0, _index.addLeadingZeros)(
      date.getHours() % 12 || 12,
      token.length,
    );
  },

  // Hour [0-23]
  H(date, token) {
    return (0, _index.addLeadingZeros)(date.getHours(), token.length);
  },

  // Minute
  m(date, token) {
    return (0, _index.addLeadingZeros)(date.getMinutes(), token.length);
  },

  // Second
  s(date, token) {
    return (0, _index.addLeadingZeros)(date.getSeconds(), token.length);
  },

  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3),
    );
    return (0, _index.addLeadingZeros)(fractionalSeconds, token.length);
  },
});


/***/ }),

/***/ "./node_modules/date-fns/_lib/format/longFormatters.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/longFormatters.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.longFormatters = void 0;

const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};

const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};

const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  let dateTimeFormat;

  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }

  return dateTimeFormat
    .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
    .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};

const longFormatters = (exports.longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
});


/***/ }),

/***/ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getTimezoneOffsetInMilliseconds = getTimezoneOffsetInMilliseconds;
var _index = __webpack_require__(/*! ../toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = (0, _index.toDate)(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/protectedTokens.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/protectedTokens.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.isProtectedDayOfYearToken = isProtectedDayOfYearToken;
exports.isProtectedWeekYearToken = isProtectedWeekYearToken;
exports.warnOrThrowProtectedError = warnOrThrowProtectedError;
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;

const throwTokens = ["D", "DD", "YY", "YYYY"];

function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}

function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}

function warnOrThrowProtectedError(token, format, input) {
  const _message = message(token, format, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}

function message(token, format, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}


/***/ }),

/***/ "./node_modules/date-fns/addDays.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/addDays.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addDays = addDays;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");
var _index2 = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(date, amount) {
  const _date = (0, _index.toDate)(date);
  if (isNaN(amount)) return (0, _index2.constructFrom)(date, NaN);
  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/addHours.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/addHours.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addHours = addHours;
var _index = __webpack_require__(/*! ./addMilliseconds.js */ "./node_modules/date-fns/addMilliseconds.js");
var _index2 = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");

/**
 * @name addHours
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of hours to be added.
 *
 * @returns The new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
function addHours(date, amount) {
  return (0, _index.addMilliseconds)(date, amount * _index2.millisecondsInHour);
}


/***/ }),

/***/ "./node_modules/date-fns/addMilliseconds.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/addMilliseconds.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addMilliseconds = addMilliseconds;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");
var _index2 = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be added.
 *
 * @returns The new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(date, amount) {
  const timestamp = +(0, _index.toDate)(date);
  return (0, _index2.constructFrom)(date, timestamp + amount);
}


/***/ }),

/***/ "./node_modules/date-fns/addMinutes.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/addMinutes.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addMinutes = addMinutes;
var _index = __webpack_require__(/*! ./addMilliseconds.js */ "./node_modules/date-fns/addMilliseconds.js");
var _index2 = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");

/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of minutes to be added.
 *
 * @returns The new date with the minutes added
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes(date, amount) {
  return (0, _index.addMilliseconds)(
    date,
    amount * _index2.millisecondsInMinute,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/addMonths.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/addMonths.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addMonths = addMonths;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");
var _index2 = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be added.
 *
 * @returns The new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 *
 * // Add one month to 30 January 2023:
 * const result = addMonths(new Date(2023, 0, 30), 1)
 * //=> Tue Feb 28 2023 00:00:00
 */
function addMonths(date, amount) {
  const _date = (0, _index.toDate)(date);
  if (isNaN(amount)) return (0, _index2.constructFrom)(date, NaN);
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  const dayOfMonth = _date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  const endOfDesiredMonth = (0, _index2.constructFrom)(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth,
    );
    return _date;
  }
}


/***/ }),

/***/ "./node_modules/date-fns/addQuarters.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/addQuarters.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addQuarters = addQuarters;
var _index = __webpack_require__(/*! ./addMonths.js */ "./node_modules/date-fns/addMonths.js");

/**
 * @name addQuarters
 * @category Quarter Helpers
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be added.
 *
 * @returns The new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * const result = addQuarters(new Date(2014, 8, 1), 1)
 * //=> Mon Dec 01 2014 00:00:00
 */
function addQuarters(date, amount) {
  const months = amount * 3;
  return (0, _index.addMonths)(date, months);
}


/***/ }),

/***/ "./node_modules/date-fns/addSeconds.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/addSeconds.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addSeconds = addSeconds;
var _index = __webpack_require__(/*! ./addMilliseconds.js */ "./node_modules/date-fns/addMilliseconds.js");

/**
 * @name addSeconds
 * @category Second Helpers
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of seconds to be added.
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
function addSeconds(date, amount) {
  return (0, _index.addMilliseconds)(date, amount * 1000);
}


/***/ }),

/***/ "./node_modules/date-fns/addWeeks.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/addWeeks.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addWeeks = addWeeks;
var _index = __webpack_require__(/*! ./addDays.js */ "./node_modules/date-fns/addDays.js");

/**
 * @name addWeeks
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of weeks to be added.
 *
 * @returns The new date with the weeks added
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * const result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks(date, amount) {
  const days = amount * 7;
  return (0, _index.addDays)(date, days);
}


/***/ }),

/***/ "./node_modules/date-fns/addYears.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/addYears.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addYears = addYears;
var _index = __webpack_require__(/*! ./addMonths.js */ "./node_modules/date-fns/addMonths.js");

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be added.
 *
 * @returns The new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * const result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears(date, amount) {
  return (0, _index.addMonths)(date, amount * 12);
}


/***/ }),

/***/ "./node_modules/date-fns/constants.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/constants.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.secondsInYear =
  exports.secondsInWeek =
  exports.secondsInQuarter =
  exports.secondsInMonth =
  exports.secondsInMinute =
  exports.secondsInHour =
  exports.secondsInDay =
  exports.quartersInYear =
  exports.monthsInYear =
  exports.monthsInQuarter =
  exports.minutesInYear =
  exports.minutesInMonth =
  exports.minutesInHour =
  exports.minutesInDay =
  exports.minTime =
  exports.millisecondsInWeek =
  exports.millisecondsInSecond =
  exports.millisecondsInMinute =
  exports.millisecondsInHour =
  exports.millisecondsInDay =
  exports.maxTime =
  exports.daysInYear =
  exports.daysInWeek =
    void 0; /**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = (exports.daysInWeek = 7);

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = (exports.daysInYear = 365.2425);

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = (exports.maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000);

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = (exports.minTime = -maxTime);

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = (exports.millisecondsInWeek = 604800000);

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = (exports.millisecondsInDay = 86400000);

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = (exports.millisecondsInMinute = 60000);

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = (exports.millisecondsInHour = 3600000);

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = (exports.millisecondsInSecond = 1000);

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = (exports.minutesInYear = 525600);

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = (exports.minutesInMonth = 43200);

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = (exports.minutesInDay = 1440);

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = (exports.minutesInHour = 60);

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = (exports.monthsInQuarter = 3);

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = (exports.monthsInYear = 12);

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = (exports.quartersInYear = 4);

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = (exports.secondsInHour = 3600);

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = (exports.secondsInMinute = 60);

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = (exports.secondsInDay = secondsInHour * 24);

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = (exports.secondsInWeek = secondsInDay * 7);

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = (exports.secondsInYear = secondsInDay * daysInYear);

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = (exports.secondsInMonth = secondsInYear / 12);

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = (exports.secondsInQuarter = secondsInMonth * 3);


/***/ }),

/***/ "./node_modules/date-fns/constructFrom.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/constructFrom.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.constructFrom = constructFrom;

/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from 'date-fns'
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use contrustor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   )
 * }
 */
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarDays.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarDays.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarDays = differenceInCalendarDays;
var _index = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");
var _index2 = __webpack_require__(/*! ./startOfDay.js */ "./node_modules/date-fns/startOfDay.js");
var _index3 = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.js */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js");

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = (0, _index2.startOfDay)(dateLeft);
  const startOfDayRight = (0, _index2.startOfDay)(dateRight);

  const timestampLeft =
    +startOfDayLeft -
    (0, _index3.getTimezoneOffsetInMilliseconds)(startOfDayLeft);
  const timestampRight =
    +startOfDayRight -
    (0, _index3.getTimezoneOffsetInMilliseconds)(startOfDayRight);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(
    (timestampLeft - timestampRight) / _index.millisecondsInDay,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarMonths.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarMonths.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarMonths = differenceInCalendarMonths;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(dateLeft, dateRight) {
  const _dateLeft = (0, _index.toDate)(dateLeft);
  const _dateRight = (0, _index.toDate)(dateRight);

  const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
  const monthDiff = _dateLeft.getMonth() - _dateRight.getMonth();

  return yearDiff * 12 + monthDiff;
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarQuarters.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarQuarters.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarQuarters = differenceInCalendarQuarters;
var _index = __webpack_require__(/*! ./getQuarter.js */ "./node_modules/date-fns/getQuarter.js");
var _index2 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name differenceInCalendarQuarters
 * @category Quarter Helpers
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date

 * @returns The number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
function differenceInCalendarQuarters(dateLeft, dateRight) {
  const _dateLeft = (0, _index2.toDate)(dateLeft);
  const _dateRight = (0, _index2.toDate)(dateRight);

  const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
  const quarterDiff =
    (0, _index.getQuarter)(_dateLeft) - (0, _index.getQuarter)(_dateRight);

  return yearDiff * 4 + quarterDiff;
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarYears.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarYears.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarYears = differenceInCalendarYears;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date

 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * )
 * //=> 2
 */
function differenceInCalendarYears(dateLeft, dateRight) {
  const _dateLeft = (0, _index.toDate)(dateLeft);
  const _dateRight = (0, _index.toDate)(dateRight);

  return _dateLeft.getFullYear() - _dateRight.getFullYear();
}


/***/ }),

/***/ "./node_modules/date-fns/endOfDay.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/endOfDay.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfDay = endOfDay;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(date) {
  const _date = (0, _index.toDate)(date);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfMonth.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/endOfMonth.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfMonth = endOfMonth;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(date) {
  const _date = (0, _index.toDate)(date);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfWeek.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/endOfWeek.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfWeek = endOfWeek;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

var _index2 = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");

/**
 * The {@link endOfWeek} function options.
 */

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(date, options) {
  const defaultOptions = (0, _index2.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0, _index.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfYear.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/endOfYear.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfYear = endOfYear;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
function endOfYear(date) {
  const _date = (0, _index.toDate)(date);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/format.js":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/format.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.format = exports.formatDate = format;
Object.defineProperty(exports, "formatters", ({
  enumerable: true,
  get: function () {
    return _index3.formatters;
  },
}));
Object.defineProperty(exports, "longFormatters", ({
  enumerable: true,
  get: function () {
    return _index4.longFormatters;
  },
}));
var _index = __webpack_require__(/*! ./_lib/defaultLocale.js */ "./node_modules/date-fns/_lib/defaultLocale.js");
var _index2 = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");
var _index3 = __webpack_require__(/*! ./_lib/format/formatters.js */ "./node_modules/date-fns/_lib/format/formatters.js");
var _index4 = __webpack_require__(/*! ./_lib/format/longFormatters.js */ "./node_modules/date-fns/_lib/format/longFormatters.js");
var _index5 = __webpack_require__(/*! ./_lib/protectedTokens.js */ "./node_modules/date-fns/_lib/protectedTokens.js");

var _index6 = __webpack_require__(/*! ./isValid.js */ "./node_modules/date-fns/isValid.js");
var _index7 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * The {@link format} function options.
 */

/**
 * @name format
 * @alias formatDate
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
 *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param format - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(date, formatStr, options) {
  const defaultOptions = (0, _index2.getDefaultOptions)();
  const locale =
    options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const originalDate = (0, _index7.toDate)(date);

  if (!(0, _index6.isValid)(originalDate)) {
    throw new RangeError("Invalid time value");
  }

  let parts = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = _index4.longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp)
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString(substring) };
      }

      if (_index3.formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return { isToken: false, value: substring };
    });

  // invoke localize preprocessor (only for french locales at the moment)
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }

  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  return parts
    .map((part) => {
      if (!part.isToken) return part.value;

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens &&
          (0, _index5.isProtectedWeekYearToken)(token)) ||
        (!options?.useAdditionalDayOfYearTokens &&
          (0, _index5.isProtectedDayOfYearToken)(token))
      ) {
        (0, _index5.warnOrThrowProtectedError)(token, formatStr, String(date));
      }

      const formatter = _index3.formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    })
    .join("");
}

function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp, "'");
}


/***/ }),

/***/ "./node_modules/date-fns/getDate.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/getDate.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDate = getDate;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getDate
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * const result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate(date) {
  const _date = (0, _index.toDate)(date);
  const dayOfMonth = _date.getDate();
  return dayOfMonth;
}


/***/ }),

/***/ "./node_modules/date-fns/getDay.js":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/getDay.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDay = getDay;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay(date) {
  const _date = (0, _index.toDate)(date);
  const day = _date.getDay();
  return day;
}


/***/ }),

/***/ "./node_modules/date-fns/getDayOfYear.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/getDayOfYear.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDayOfYear = getDayOfYear;
var _index = __webpack_require__(/*! ./differenceInCalendarDays.js */ "./node_modules/date-fns/differenceInCalendarDays.js");
var _index2 = __webpack_require__(/*! ./startOfYear.js */ "./node_modules/date-fns/startOfYear.js");
var _index3 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date) {
  const _date = (0, _index3.toDate)(date);
  const diff = (0, _index.differenceInCalendarDays)(
    _date,
    (0, _index2.startOfYear)(_date),
  );
  const dayOfYear = diff + 1;
  return dayOfYear;
}


/***/ }),

/***/ "./node_modules/date-fns/getDaysInMonth.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/getDaysInMonth.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDaysInMonth = getDaysInMonth;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");
var _index2 = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth(date) {
  const _date = (0, _index.toDate)(date);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth = (0, _index2.constructFrom)(date, 0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}


/***/ }),

/***/ "./node_modules/date-fns/getDefaultOptions.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/getDefaultOptions.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDefaultOptions = getDefaultOptions;

var _index = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");

/**
 * @name getDefaultOptions
 * @category Common Helpers
 * @summary Get default options.
 * @pure false
 *
 * @description
 * Returns an object that contains defaults for
 * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
 * arguments for all functions.
 *
 * You can change these with [setDefaultOptions](https://date-fns.org/docs/setDefaultOptions).
 *
 * @returns The default options
 *
 * @example
 * const result = getDefaultOptions()
 * //=> {}
 *
 * @example
 * setDefaultOptions({ weekStarsOn: 1, firstWeekContainsDate: 4 })
 * const result = getDefaultOptions()
 * //=> { weekStarsOn: 1, firstWeekContainsDate: 4 }
 */
function getDefaultOptions() {
  return Object.assign({}, (0, _index.getDefaultOptions)());
}


/***/ }),

/***/ "./node_modules/date-fns/getHours.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/getHours.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getHours = getHours;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getHours
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The hours
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * const result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
function getHours(date) {
  const _date = (0, _index.toDate)(date);
  const hours = _date.getHours();
  return hours;
}


/***/ }),

/***/ "./node_modules/date-fns/getISODay.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/getISODay.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getISODay = getISODay;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getISODay
 * @category Weekday Helpers
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date,
 * which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The day of ISO week
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * const result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
function getISODay(date) {
  const _date = (0, _index.toDate)(date);
  let day = _date.getDay();

  if (day === 0) {
    day = 7;
  }

  return day;
}


/***/ }),

/***/ "./node_modules/date-fns/getISOWeek.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/getISOWeek.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getISOWeek = getISOWeek;
var _index = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");
var _index2 = __webpack_require__(/*! ./startOfISOWeek.js */ "./node_modules/date-fns/startOfISOWeek.js");
var _index3 = __webpack_require__(/*! ./startOfISOWeekYear.js */ "./node_modules/date-fns/startOfISOWeekYear.js");
var _index4 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(date) {
  const _date = (0, _index4.toDate)(date);
  const diff =
    +(0, _index2.startOfISOWeek)(_date) -
    +(0, _index3.startOfISOWeekYear)(_date);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _index.millisecondsInWeek) + 1;
}


/***/ }),

/***/ "./node_modules/date-fns/getISOWeekYear.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/getISOWeekYear.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getISOWeekYear = getISOWeekYear;
var _index = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _index2 = __webpack_require__(/*! ./startOfISOWeek.js */ "./node_modules/date-fns/startOfISOWeek.js");
var _index3 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(date) {
  const _date = (0, _index3.toDate)(date);
  const year = _date.getFullYear();

  const fourthOfJanuaryOfNextYear = (0, _index.constructFrom)(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0, _index2.startOfISOWeek)(
    fourthOfJanuaryOfNextYear,
  );

  const fourthOfJanuaryOfThisYear = (0, _index.constructFrom)(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0, _index2.startOfISOWeek)(
    fourthOfJanuaryOfThisYear,
  );

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}


/***/ }),

/***/ "./node_modules/date-fns/getMinutes.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/getMinutes.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getMinutes = getMinutes;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getMinutes
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The minutes
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
function getMinutes(date) {
  const _date = (0, _index.toDate)(date);
  const minutes = _date.getMinutes();
  return minutes;
}


/***/ }),

/***/ "./node_modules/date-fns/getMonth.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/getMonth.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getMonth = getMonth;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getMonth
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The month index (0-11)
 *
 * @example
 * // Which month is 29 February 2012?
 * const result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth(date) {
  const _date = (0, _index.toDate)(date);
  const month = _date.getMonth();
  return month;
}


/***/ }),

/***/ "./node_modules/date-fns/getQuarter.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/getQuarter.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getQuarter = getQuarter;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getQuarter
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The quarter
 *
 * @example
 * // Which quarter is 2 July 2014?
 * const result = getQuarter(new Date(2014, 6, 2))
 * //=> 3
 */
function getQuarter(date) {
  const _date = (0, _index.toDate)(date);
  const quarter = Math.trunc(_date.getMonth() / 3) + 1;
  return quarter;
}


/***/ }),

/***/ "./node_modules/date-fns/getSeconds.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/getSeconds.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getSeconds = getSeconds;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getSeconds
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The seconds
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
function getSeconds(date) {
  const _date = (0, _index.toDate)(date);
  const seconds = _date.getSeconds();
  return seconds;
}


/***/ }),

/***/ "./node_modules/date-fns/getTime.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/getTime.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getTime = getTime;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getTime
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
function getTime(date) {
  const _date = (0, _index.toDate)(date);
  const timestamp = _date.getTime();
  return timestamp;
}


/***/ }),

/***/ "./node_modules/date-fns/getWeek.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/getWeek.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getWeek = getWeek;
var _index = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");
var _index2 = __webpack_require__(/*! ./startOfWeek.js */ "./node_modules/date-fns/startOfWeek.js");
var _index3 = __webpack_require__(/*! ./startOfWeekYear.js */ "./node_modules/date-fns/startOfWeekYear.js");
var _index4 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * The {@link getWeek} function options.
 */

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */

function getWeek(date, options) {
  const _date = (0, _index4.toDate)(date);
  const diff =
    +(0, _index2.startOfWeek)(_date, options) -
    +(0, _index3.startOfWeekYear)(_date, options);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _index.millisecondsInWeek) + 1;
}


/***/ }),

/***/ "./node_modules/date-fns/getWeekYear.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/getWeekYear.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getWeekYear = getWeekYear;
var _index = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _index2 = __webpack_require__(/*! ./startOfWeek.js */ "./node_modules/date-fns/startOfWeek.js");
var _index3 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

var _index4 = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");

/**
 * The {@link getWeekYear} function options.
 */

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(date, options) {
  const _date = (0, _index3.toDate)(date);
  const year = _date.getFullYear();

  const defaultOptions = (0, _index4.getDefaultOptions)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const firstWeekOfNextYear = (0, _index.constructFrom)(date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0, _index2.startOfWeek)(
    firstWeekOfNextYear,
    options,
  );

  const firstWeekOfThisYear = (0, _index.constructFrom)(date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0, _index2.startOfWeek)(
    firstWeekOfThisYear,
    options,
  );

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}


/***/ }),

/***/ "./node_modules/date-fns/getYear.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/getYear.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getYear = getYear;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name getYear
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The year
 *
 * @example
 * // Which year is 2 July 2014?
 * const result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear(date) {
  return (0, _index.toDate)(date).getFullYear();
}


/***/ }),

/***/ "./node_modules/date-fns/isAfter.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/isAfter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isAfter = isAfter;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date that should be after the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter(date, dateToCompare) {
  const _date = (0, _index.toDate)(date);
  const _dateToCompare = (0, _index.toDate)(dateToCompare);
  return _date.getTime() > _dateToCompare.getTime();
}


/***/ }),

/***/ "./node_modules/date-fns/isBefore.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isBefore.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isBefore = isBefore;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date that should be before the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore(date, dateToCompare) {
  const _date = (0, _index.toDate)(date);
  const _dateToCompare = (0, _index.toDate)(dateToCompare);
  return +_date < +_dateToCompare;
}


/***/ }),

/***/ "./node_modules/date-fns/isDate.js":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/isDate.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.isDate = isDate; /**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isEqual.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/isEqual.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isEqual = isEqual;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual(leftDate, rightDate) {
  const _dateLeft = (0, _index.toDate)(leftDate);
  const _dateRight = (0, _index.toDate)(rightDate);
  return +_dateLeft === +_dateRight;
}


/***/ }),

/***/ "./node_modules/date-fns/isSameDay.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/isSameDay.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameDay = isSameDay;
var _index = __webpack_require__(/*! ./startOfDay.js */ "./node_modules/date-fns/startOfDay.js");

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check

 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dateLeft, dateRight) {
  const dateLeftStartOfDay = (0, _index.startOfDay)(dateLeft);
  const dateRightStartOfDay = (0, _index.startOfDay)(dateRight);

  return +dateLeftStartOfDay === +dateRightStartOfDay;
}


/***/ }),

/***/ "./node_modules/date-fns/isSameMonth.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isSameMonth.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameMonth = isSameMonth;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name isSameMonth
 * @category Month Helpers
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check
 *
 * @returns The dates are in the same month (and year)
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */
function isSameMonth(dateLeft, dateRight) {
  const _dateLeft = (0, _index.toDate)(dateLeft);
  const _dateRight = (0, _index.toDate)(dateRight);
  return (
    _dateLeft.getFullYear() === _dateRight.getFullYear() &&
    _dateLeft.getMonth() === _dateRight.getMonth()
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isSameQuarter.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/isSameQuarter.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameQuarter = isSameQuarter;
var _index = __webpack_require__(/*! ./startOfQuarter.js */ "./node_modules/date-fns/startOfQuarter.js");

/**
 * @name isSameQuarter
 * @category Quarter Helpers
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check

 * @returns The dates are in the same quarter (and year)
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameQuarter(dateLeft, dateRight) {
  const dateLeftStartOfQuarter = (0, _index.startOfQuarter)(dateLeft);
  const dateRightStartOfQuarter = (0, _index.startOfQuarter)(dateRight);

  return +dateLeftStartOfQuarter === +dateRightStartOfQuarter;
}


/***/ }),

/***/ "./node_modules/date-fns/isSameYear.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isSameYear.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameYear = isSameYear;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name isSameYear
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check
 *
 * @returns The dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
function isSameYear(dateLeft, dateRight) {
  const _dateLeft = (0, _index.toDate)(dateLeft);
  const _dateRight = (0, _index.toDate)(dateRight);
  return _dateLeft.getFullYear() === _dateRight.getFullYear();
}


/***/ }),

/***/ "./node_modules/date-fns/isValid.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/isValid.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isValid = isValid;
var _index = __webpack_require__(/*! ./isDate.js */ "./node_modules/date-fns/isDate.js");
var _index2 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(date) {
  if (!(0, _index.isDate)(date) && typeof date !== "number") {
    return false;
  }
  const _date = (0, _index2.toDate)(date);
  return !isNaN(Number(_date));
}


/***/ }),

/***/ "./node_modules/date-fns/isWithinInterval.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/isWithinInterval.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isWithinInterval = isWithinInterval;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 * @param interval - The interval to check
 *
 * @returns The date is within the interval
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> false
 *
 * @example
 * // For date equal to interval start:
 * isWithinInterval(date, { start, end: date })
 * // => true
 *
 * @example
 * // For date equal to interval end:
 * isWithinInterval(date, { start: date, end })
 * // => true
 */
function isWithinInterval(date, interval) {
  const time = +(0, _index.toDate)(date);
  const [startTime, endTime] = [
    +(0, _index.toDate)(interval.start),
    +(0, _index.toDate)(interval.end),
  ].sort((a, b) => a - b);

  return time >= startTime && time <= endTime;
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildFormatLongFn.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildFormatLongFn.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.buildFormatLongFn = buildFormatLongFn;

function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildLocalizeFn.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildLocalizeFn.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.buildLocalizeFn = buildLocalizeFn; /* eslint-disable no-unused-vars */

/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchFn.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchFn.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.buildMatchFn = buildMatchFn;

function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn.js":
/*!******************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchPatternFn.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.buildMatchPatternFn = buildMatchPatternFn;

function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/locale/en-US.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.enUS = void 0;
var _index = __webpack_require__(/*! ./en-US/_lib/formatDistance.js */ "./node_modules/date-fns/locale/en-US/_lib/formatDistance.js");
var _index2 = __webpack_require__(/*! ./en-US/_lib/formatLong.js */ "./node_modules/date-fns/locale/en-US/_lib/formatLong.js");
var _index3 = __webpack_require__(/*! ./en-US/_lib/formatRelative.js */ "./node_modules/date-fns/locale/en-US/_lib/formatRelative.js");
var _index4 = __webpack_require__(/*! ./en-US/_lib/localize.js */ "./node_modules/date-fns/locale/en-US/_lib/localize.js");
var _index5 = __webpack_require__(/*! ./en-US/_lib/match.js */ "./node_modules/date-fns/locale/en-US/_lib/match.js");

/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = (exports.enUS = {
  code: "en-US",
  formatDistance: _index.formatDistance,
  formatLong: _index2.formatLong,
  formatRelative: _index3.formatRelative,
  localize: _index4.localize,
  match: _index5.match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
});


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatDistance.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatDistance.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.formatDistance = void 0;

const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};
exports.formatDistance = formatDistance;


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatLong.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatLong.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatLong = void 0;
var _index = __webpack_require__(/*! ../../_lib/buildFormatLongFn.js */ "./node_modules/date-fns/locale/_lib/buildFormatLongFn.js");

const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = (exports.formatLong = {
  date: (0, _index.buildFormatLongFn)({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: (0, _index.buildFormatLongFn)({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: (0, _index.buildFormatLongFn)({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
});


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatRelative.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatRelative.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.formatRelative = void 0;

const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];
exports.formatRelative = formatRelative;


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/localize.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/localize.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.localize = void 0;
var _index = __webpack_require__(/*! ../../_lib/buildLocalizeFn.js */ "./node_modules/date-fns/locale/_lib/buildLocalizeFn.js");

const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = (exports.localize = {
  ordinalNumber,

  era: (0, _index.buildLocalizeFn)({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: (0, _index.buildLocalizeFn)({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: (0, _index.buildLocalizeFn)({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: (0, _index.buildLocalizeFn)({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: (0, _index.buildLocalizeFn)({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
});


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/match.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/match.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.match = void 0;

var _index = __webpack_require__(/*! ../../_lib/buildMatchFn.js */ "./node_modules/date-fns/locale/_lib/buildMatchFn.js");
var _index2 = __webpack_require__(/*! ../../_lib/buildMatchPatternFn.js */ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn.js");

const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = (exports.match = {
  ordinalNumber: (0, _index2.buildMatchPatternFn)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: (0, _index.buildMatchFn)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: (0, _index.buildMatchFn)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: (0, _index.buildMatchFn)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: (0, _index.buildMatchFn)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: (0, _index.buildMatchFn)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
});


/***/ }),

/***/ "./node_modules/date-fns/max.js":
/*!**************************************!*\
  !*** ./node_modules/date-fns/max.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.max = max;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name max
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dates - The dates to compare
 *
 * @returns The latest of the dates
 *
 * @example
 * // Which of these dates is the latest?
 * const result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
function max(dates) {
  let result;
  dates.forEach(function (dirtyDate) {
    const currentDate = (0, _index.toDate)(dirtyDate);

    if (
      result === undefined ||
      result < currentDate ||
      isNaN(Number(currentDate))
    ) {
      result = currentDate;
    }
  });

  return result || new Date(NaN);
}


/***/ }),

/***/ "./node_modules/date-fns/min.js":
/*!**************************************!*\
  !*** ./node_modules/date-fns/min.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.min = min;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name min
 * @category Common Helpers
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dates - The dates to compare
 *
 * @returns The earliest of the dates
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
function min(dates) {
  let result;

  dates.forEach((dirtyDate) => {
    const date = (0, _index.toDate)(dirtyDate);
    if (!result || result > date || isNaN(+date)) {
      result = date;
    }
  });

  return result || new Date(NaN);
}


/***/ }),

/***/ "./node_modules/date-fns/parse.js":
/*!****************************************!*\
  !*** ./node_modules/date-fns/parse.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "longFormatters", ({
  enumerable: true,
  get: function () {
    return _index5.longFormatters;
  },
}));
exports.parse = parse;
Object.defineProperty(exports, "parsers", ({
  enumerable: true,
  get: function () {
    return _index7.parsers;
  },
}));
var _index = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _index2 = __webpack_require__(/*! ./getDefaultOptions.js */ "./node_modules/date-fns/getDefaultOptions.js");
var _index3 = __webpack_require__(/*! ./_lib/defaultLocale.js */ "./node_modules/date-fns/_lib/defaultLocale.js");
var _index4 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

var _index5 = __webpack_require__(/*! ./_lib/format/longFormatters.js */ "./node_modules/date-fns/_lib/format/longFormatters.js");
var _index6 = __webpack_require__(/*! ./_lib/protectedTokens.js */ "./node_modules/date-fns/_lib/protectedTokens.js");

var _index7 = __webpack_require__(/*! ./parse/_lib/parsers.js */ "./node_modules/date-fns/parse/_lib/parsers.js");

var _Setter = __webpack_require__(/*! ./parse/_lib/Setter.js */ "./node_modules/date-fns/parse/_lib/Setter.js");

// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

/**
 * The {@link parse} function options.
 */

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;

const notWhitespaceRegExp = /\S/;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * parse('23 AM', 'HH a', new Date())
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 001, ..., 999                |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `parse` will try to match both formatting and stand-alone units interchangably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
 *
 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
 *
 *    while `uu` will just assign the year as is:
 *
 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
 *
 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear](https://date-fns.org/docs/setISOWeekYear)
 *    and [setWeekYear](https://date-fns.org/docs/setWeekYear)).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be assigned to the date in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
 *
 * `referenceDate` must be passed for correct work of the function.
 * If you're not sure which `referenceDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - defines values missing from the parsed dateString
 * @param options - An object with options.
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @returns The parsed date
 *
 * @throws `options.locale` must contain `match` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
 *   locale: eo
 * })
 * //=> Sun Feb 28 2010 00:00:00
 */
function parse(dateStr, formatStr, referenceDate, options) {
  const defaultOptions = (0, _index2.getDefaultOptions)();
  const locale =
    options?.locale ?? defaultOptions.locale ?? _index3.defaultLocale;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  if (formatStr === "") {
    if (dateStr === "") {
      return (0, _index4.toDate)(referenceDate);
    } else {
      return (0, _index.constructFrom)(referenceDate, NaN);
    }
  }

  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  // If timezone isn't specified, it will be set to the system timezone
  const setters = [new _Setter.DateToSystemTimezoneSetter()];

  const tokens = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter in _index5.longFormatters) {
        const longFormatter = _index5.longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp);

  const usedTokens = [];

  for (let token of tokens) {
    if (
      !options?.useAdditionalWeekYearTokens &&
      (0, _index6.isProtectedWeekYearToken)(token)
    ) {
      (0, _index6.warnOrThrowProtectedError)(token, formatStr, dateStr);
    }
    if (
      !options?.useAdditionalDayOfYearTokens &&
      (0, _index6.isProtectedDayOfYearToken)(token)
    ) {
      (0, _index6.warnOrThrowProtectedError)(token, formatStr, dateStr);
    }

    const firstCharacter = token[0];
    const parser = _index7.parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) =>
            incompatibleTokens.includes(usedToken.token) ||
            usedToken.token === firstCharacter,
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`,
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`,
        );
      }

      usedTokens.push({ token: firstCharacter, fullToken: token });

      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions,
      );

      if (!parseResult) {
        return (0, _index.constructFrom)(referenceDate, NaN);
      }

      setters.push(parseResult.setter);

      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      // Replace two single quote characters with one single quote character
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString(token);
      }

      // Cut token from string, or, if string doesn't match the token, return Invalid Date
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return (0, _index.constructFrom)(referenceDate, NaN);
      }
    }
  }

  // Check if the remaining input contains something other than whitespace
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return (0, _index.constructFrom)(referenceDate, NaN);
  }

  const uniquePrioritySetters = setters
    .map((setter) => setter.priority)
    .sort((a, b) => b - a)
    .filter((priority, index, array) => array.indexOf(priority) === index)
    .map((priority) =>
      setters
        .filter((setter) => setter.priority === priority)
        .sort((a, b) => b.subPriority - a.subPriority),
    )
    .map((setterArray) => setterArray[0]);

  let date = (0, _index4.toDate)(referenceDate);

  if (isNaN(date.getTime())) {
    return (0, _index.constructFrom)(referenceDate, NaN);
  }

  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return (0, _index.constructFrom)(referenceDate, NaN);
    }

    const result = setter.set(date, flags, subFnOptions);
    // Result is tuple (date, flags)
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
      // Result is date
    } else {
      date = result;
    }
  }

  return (0, _index.constructFrom)(referenceDate, date);
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}


/***/ }),

/***/ "./node_modules/date-fns/parseISO.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/parseISO.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.parseISO = parseISO;
var _index = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");

/**
 * The {@link parseISO} function options.
 */

/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
function parseISO(argument, options) {
  const additionalDigits = options?.additionalDigits ?? 2;
  const dateStrings = splitDateString(argument);

  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  const timestamp = date.getTime();
  let time = 0;
  let offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    const dirtyDate = new Date(timestamp + time);
    // JS parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.
    const result = new Date(0);
    result.setFullYear(
      dirtyDate.getUTCFullYear(),
      dirtyDate.getUTCMonth(),
      dirtyDate.getUTCDate(),
    );
    result.setHours(
      dirtyDate.getUTCHours(),
      dirtyDate.getUTCMinutes(),
      dirtyDate.getUTCSeconds(),
      dirtyDate.getUTCMilliseconds(),
    );
    return result;
  }

  return new Date(timestamp + time + offset);
}

const patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/,
};

const dateRegex =
  /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
const timeRegex =
  /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;

  // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].
  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length,
      );
    }
  }

  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" +
      (4 + additionalDigits) +
      "})|(\\d{2}|[+-]\\d{" +
      (2 + additionalDigits) +
      "})$)",
  );

  const captures = dateString.match(regex);
  // Invalid ISO-formatted year
  if (!captures) return { year: NaN, restDateString: "" };

  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;

  // either year or century is null, not both
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length),
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);

  const captures = dateString.match(dateRegex);
  // Invalid ISO-formatted string
  if (!captures) return new Date(NaN);

  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = new Date(0);
    if (
      !validateDate(year, month, day) ||
      !validateDayOfYearDate(year, dayOfYear)
    ) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return (
    hours * _index.millisecondsInHour +
    minutes * _index.millisecondsInMinute +
    seconds * 1000
  );
}

function parseTimeUnit(value) {
  return (value && parseFloat(value.replace(",", "."))) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === "Z") return 0;

  const captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;

  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = (captures[3] && parseInt(captures[3])) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return (
    sign *
    (hours * _index.millisecondsInHour + minutes * _index.millisecondsInMinute)
  );
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// Validation functions

// February is null to handle the leap year (using ||)
const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function validateDate(year, month, date) {
  return (
    month >= 0 &&
    month <= 11 &&
    date >= 1 &&
    date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28))
  );
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return (
    seconds >= 0 &&
    seconds < 60 &&
    minutes >= 0 &&
    minutes < 60 &&
    hours >= 0 &&
    hours < 25
  );
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/Parser.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/Parser.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Parser = void 0;
var _Setter = __webpack_require__(/*! ./Setter.js */ "./node_modules/date-fns/parse/_lib/Setter.js");

class Parser {
  run(dateString, token, match, options) {
    const result = this.parse(dateString, token, match, options);
    if (!result) {
      return null;
    }

    return {
      setter: new _Setter.ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority,
      ),
      rest: result.rest,
    };
  }

  validate(_utcDate, _value, _options) {
    return true;
  }
}
exports.Parser = Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/Setter.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/Setter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ValueSetter =
  exports.Setter =
  exports.DateToSystemTimezoneSetter =
    void 0;
var _index = __webpack_require__(/*! ../../transpose.js */ "./node_modules/date-fns/transpose.js");
var _index2 = __webpack_require__(/*! ../../constructFrom.js */ "./node_modules/date-fns/constructFrom.js");

const TIMEZONE_UNIT_PRIORITY = 10;

class Setter {
  subPriority = 0;

  validate(_utcDate, _options) {
    return true;
  }
}
exports.Setter = Setter;

class ValueSetter extends Setter {
  constructor(
    value,

    validateValue,

    setValue,

    priority,
    subPriority,
  ) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }

  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }

  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
}
exports.ValueSetter = ValueSetter;

class DateToSystemTimezoneSetter extends Setter {
  priority = TIMEZONE_UNIT_PRIORITY;
  subPriority = -1;
  set(date, flags) {
    if (flags.timestampIsSet) return date;
    return (0, _index2.constructFrom)(date, (0, _index.transpose)(date, Date));
  }
}
exports.DateToSystemTimezoneSetter = DateToSystemTimezoneSetter;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/constants.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/constants.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.timezonePatterns = exports.numericPatterns = void 0;
const numericPatterns = (exports.numericPatterns = {
  month: /^(1[0-2]|0?\d)/, // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/, // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/, // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/, // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/, // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/, // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/, // 0 to 12
  minute: /^[0-5]?\d/, // 0 to 59
  second: /^[0-5]?\d/, // 0 to 59

  singleDigit: /^\d/, // 0 to 9
  twoDigits: /^\d{1,2}/, // 0 to 99
  threeDigits: /^\d{1,3}/, // 0 to 999
  fourDigits: /^\d{1,4}/, // 0 to 9999

  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/, // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/, // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/, // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/, // 0 to 9999, -0 to -9999
});

const timezonePatterns = (exports.timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
});


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.parsers = void 0;
var _EraParser = __webpack_require__(/*! ./parsers/EraParser.js */ "./node_modules/date-fns/parse/_lib/parsers/EraParser.js");
var _YearParser = __webpack_require__(/*! ./parsers/YearParser.js */ "./node_modules/date-fns/parse/_lib/parsers/YearParser.js");
var _LocalWeekYearParser = __webpack_require__(/*! ./parsers/LocalWeekYearParser.js */ "./node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.js");
var _ISOWeekYearParser = __webpack_require__(/*! ./parsers/ISOWeekYearParser.js */ "./node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.js");
var _ExtendedYearParser = __webpack_require__(/*! ./parsers/ExtendedYearParser.js */ "./node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.js");
var _QuarterParser = __webpack_require__(/*! ./parsers/QuarterParser.js */ "./node_modules/date-fns/parse/_lib/parsers/QuarterParser.js");
var _StandAloneQuarterParser = __webpack_require__(/*! ./parsers/StandAloneQuarterParser.js */ "./node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.js");
var _MonthParser = __webpack_require__(/*! ./parsers/MonthParser.js */ "./node_modules/date-fns/parse/_lib/parsers/MonthParser.js");
var _StandAloneMonthParser = __webpack_require__(/*! ./parsers/StandAloneMonthParser.js */ "./node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.js");
var _LocalWeekParser = __webpack_require__(/*! ./parsers/LocalWeekParser.js */ "./node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.js");
var _ISOWeekParser = __webpack_require__(/*! ./parsers/ISOWeekParser.js */ "./node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.js");
var _DateParser = __webpack_require__(/*! ./parsers/DateParser.js */ "./node_modules/date-fns/parse/_lib/parsers/DateParser.js");
var _DayOfYearParser = __webpack_require__(/*! ./parsers/DayOfYearParser.js */ "./node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.js");
var _DayParser = __webpack_require__(/*! ./parsers/DayParser.js */ "./node_modules/date-fns/parse/_lib/parsers/DayParser.js");
var _LocalDayParser = __webpack_require__(/*! ./parsers/LocalDayParser.js */ "./node_modules/date-fns/parse/_lib/parsers/LocalDayParser.js");
var _StandAloneLocalDayParser = __webpack_require__(/*! ./parsers/StandAloneLocalDayParser.js */ "./node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.js");
var _ISODayParser = __webpack_require__(/*! ./parsers/ISODayParser.js */ "./node_modules/date-fns/parse/_lib/parsers/ISODayParser.js");
var _AMPMParser = __webpack_require__(/*! ./parsers/AMPMParser.js */ "./node_modules/date-fns/parse/_lib/parsers/AMPMParser.js");
var _AMPMMidnightParser = __webpack_require__(/*! ./parsers/AMPMMidnightParser.js */ "./node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.js");
var _DayPeriodParser = __webpack_require__(/*! ./parsers/DayPeriodParser.js */ "./node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.js");
var _Hour1to12Parser = __webpack_require__(/*! ./parsers/Hour1to12Parser.js */ "./node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.js");
var _Hour0to23Parser = __webpack_require__(/*! ./parsers/Hour0to23Parser.js */ "./node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.js");
var _Hour0To11Parser = __webpack_require__(/*! ./parsers/Hour0To11Parser.js */ "./node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.js");
var _Hour1To24Parser = __webpack_require__(/*! ./parsers/Hour1To24Parser.js */ "./node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.js");
var _MinuteParser = __webpack_require__(/*! ./parsers/MinuteParser.js */ "./node_modules/date-fns/parse/_lib/parsers/MinuteParser.js");
var _SecondParser = __webpack_require__(/*! ./parsers/SecondParser.js */ "./node_modules/date-fns/parse/_lib/parsers/SecondParser.js");
var _FractionOfSecondParser = __webpack_require__(/*! ./parsers/FractionOfSecondParser.js */ "./node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.js");
var _ISOTimezoneWithZParser = __webpack_require__(/*! ./parsers/ISOTimezoneWithZParser.js */ "./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.js");
var _ISOTimezoneParser = __webpack_require__(/*! ./parsers/ISOTimezoneParser.js */ "./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.js");
var _TimestampSecondsParser = __webpack_require__(/*! ./parsers/TimestampSecondsParser.js */ "./node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.js");
var _TimestampMillisecondsParser = __webpack_require__(/*! ./parsers/TimestampMillisecondsParser.js */ "./node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.js");

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
 * |  p  |                                |  P  |                                |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- It's ok, we want any here
const parsers = (exports.parsers = {
  G: new _EraParser.EraParser(),
  y: new _YearParser.YearParser(),
  Y: new _LocalWeekYearParser.LocalWeekYearParser(),
  R: new _ISOWeekYearParser.ISOWeekYearParser(),
  u: new _ExtendedYearParser.ExtendedYearParser(),
  Q: new _QuarterParser.QuarterParser(),
  q: new _StandAloneQuarterParser.StandAloneQuarterParser(),
  M: new _MonthParser.MonthParser(),
  L: new _StandAloneMonthParser.StandAloneMonthParser(),
  w: new _LocalWeekParser.LocalWeekParser(),
  I: new _ISOWeekParser.ISOWeekParser(),
  d: new _DateParser.DateParser(),
  D: new _DayOfYearParser.DayOfYearParser(),
  E: new _DayParser.DayParser(),
  e: new _LocalDayParser.LocalDayParser(),
  c: new _StandAloneLocalDayParser.StandAloneLocalDayParser(),
  i: new _ISODayParser.ISODayParser(),
  a: new _AMPMParser.AMPMParser(),
  b: new _AMPMMidnightParser.AMPMMidnightParser(),
  B: new _DayPeriodParser.DayPeriodParser(),
  h: new _Hour1to12Parser.Hour1to12Parser(),
  H: new _Hour0to23Parser.Hour0to23Parser(),
  K: new _Hour0To11Parser.Hour0To11Parser(),
  k: new _Hour1To24Parser.Hour1To24Parser(),
  m: new _MinuteParser.MinuteParser(),
  s: new _SecondParser.SecondParser(),
  S: new _FractionOfSecondParser.FractionOfSecondParser(),
  X: new _ISOTimezoneWithZParser.ISOTimezoneWithZParser(),
  x: new _ISOTimezoneParser.ISOTimezoneParser(),
  t: new _TimestampSecondsParser.TimestampSecondsParser(),
  T: new _TimestampMillisecondsParser.TimestampMillisecondsParser(),
});


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.AMPMMidnightParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class AMPMMidnightParser extends _Parser.Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "b":
      case "bb":
      case "bbb":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "bbbbb":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "B", "H", "k", "t", "T"];
}
exports.AMPMMidnightParser = AMPMMidnightParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/AMPMParser.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/AMPMParser.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.AMPMParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class AMPMParser extends _Parser.Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "a":
      case "aa":
      case "aaa":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "aaaaa":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["b", "B", "H", "k", "t", "T"];
}
exports.AMPMParser = AMPMParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/DateParser.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/DateParser.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.DateParser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_LEAP_YEAR = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

// Day of the month
class DateParser extends _Parser.Parser {
  priority = 90;
  subPriority = 1;

  parse(dateString, token, match) {
    switch (token) {
      case "d":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.date,
          dateString,
        );
      case "do":
        return match.ordinalNumber(dateString, { unit: "date" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = (0, _utils.isLeapYearIndex)(year);
    const month = date.getMonth();
    if (isLeapYear) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }

  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.DateParser = DateParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.DayOfYearParser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class DayOfYearParser extends _Parser.Parser {
  priority = 90;

  subpriority = 1;

  parse(dateString, token, match) {
    switch (token) {
      case "D":
      case "DD":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.dayOfYear,
          dateString,
        );
      case "Do":
        return match.ordinalNumber(dateString, { unit: "date" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = (0, _utils.isLeapYearIndex)(year);
    if (isLeapYear) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }

  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "E",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.DayOfYearParser = DayOfYearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/DayParser.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/DayParser.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.DayParser = void 0;
var _index = __webpack_require__(/*! ../../../setDay.js */ "./node_modules/date-fns/setDay.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

// Day of week
class DayParser extends _Parser.Parser {
  priority = 90;

  parse(dateString, token, match) {
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // T
      case "EEEEE":
        return match.day(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return (
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // Tuesday
      case "EEEE":
      default:
        return (
          match.day(dateString, { width: "wide", context: "formatting" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = (0, _index.setDay)(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["D", "i", "e", "c", "t", "T"];
}
exports.DayParser = DayParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.DayPeriodParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// in the morning, in the afternoon, in the evening, at night
class DayPeriodParser extends _Parser.Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "BBBBB":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "t", "T"];
}
exports.DayPeriodParser = DayPeriodParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/EraParser.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/EraParser.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.EraParser = void 0;

var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

class EraParser extends _Parser.Parser {
  priority = 140;

  parse(dateString, token, match) {
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return (
          match.era(dateString, { width: "abbreviated" }) ||
          match.era(dateString, { width: "narrow" })
        );

      // A, B
      case "GGGGG":
        return match.era(dateString, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return (
          match.era(dateString, { width: "wide" }) ||
          match.era(dateString, { width: "abbreviated" }) ||
          match.era(dateString, { width: "narrow" })
        );
    }
  }

  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["R", "u", "t", "T"];
}
exports.EraParser = EraParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ExtendedYearParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class ExtendedYearParser extends _Parser.Parser {
  priority = 130;

  parse(dateString, token) {
    if (token === "u") {
      return (0, _utils.parseNDigitsSigned)(4, dateString);
    }

    return (0, _utils.parseNDigitsSigned)(token.length, dateString);
  }

  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"];
}
exports.ExtendedYearParser = ExtendedYearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.FractionOfSecondParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class FractionOfSecondParser extends _Parser.Parser {
  priority = 30;

  parse(dateString, token) {
    const valueCallback = (value) =>
      Math.trunc(value * Math.pow(10, -token.length + 3));
    return (0, _utils.mapValue)(
      (0, _utils.parseNDigits)(token.length, dateString),
      valueCallback,
    );
  }

  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}
exports.FractionOfSecondParser = FractionOfSecondParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Hour0To11Parser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class Hour0To11Parser extends _Parser.Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "K":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.hour11h,
          dateString,
        );
      case "Ko":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }

  incompatibleTokens = ["h", "H", "k", "t", "T"];
}
exports.Hour0To11Parser = Hour0To11Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Hour0to23Parser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class Hour0to23Parser extends _Parser.Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "H":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.hour23h,
          dateString,
        );
      case "Ho":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 23;
  }

  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "h", "K", "k", "t", "T"];
}
exports.Hour0to23Parser = Hour0to23Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Hour1To24Parser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class Hour1To24Parser extends _Parser.Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "k":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.hour24h,
          dateString,
        );
      case "ko":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 24;
  }

  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "h", "H", "K", "t", "T"];
}
exports.Hour1To24Parser = Hour1To24Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Hour1to12Parser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class Hour1to12Parser extends _Parser.Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "h":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.hour12h,
          dateString,
        );
      case "ho":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 12;
  }

  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }

  incompatibleTokens = ["H", "K", "k", "t", "T"];
}
exports.Hour1to12Parser = Hour1to12Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISODayParser.js":
/*!******************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISODayParser.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISODayParser = void 0;
var _index = __webpack_require__(/*! ../../../setISODay.js */ "./node_modules/date-fns/setISODay.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// ISO day of week
class ISODayParser extends _Parser.Parser {
  priority = 90;

  parse(dateString, token, match) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7;
      }
      return value;
    };

    switch (token) {
      // 2
      case "i":
      case "ii": // 02
        return (0, _utils.parseNDigits)(token.length, dateString);
      // 2nd
      case "io":
        return match.ordinalNumber(dateString, { unit: "day" });
      // Tue
      case "iii":
        return (0, _utils.mapValue)(
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "short",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
      // T
      case "iiiii":
        return (0, _utils.mapValue)(
          match.day(dateString, {
            width: "narrow",
            context: "formatting",
          }),
          valueCallback,
        );
      // Tu
      case "iiiiii":
        return (0, _utils.mapValue)(
          match.day(dateString, {
            width: "short",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
      // Tuesday
      case "iiii":
      default:
        return (0, _utils.mapValue)(
          match.day(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "abbreviated",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "short",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 7;
  }

  set(date, _flags, value) {
    date = (0, _index.setISODay)(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "E",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.ISODayParser = ISODayParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISOTimezoneParser = void 0;
var _index = __webpack_require__(/*! ../../../constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _index2 = __webpack_require__(/*! ../../../_lib/getTimezoneOffsetInMilliseconds.js */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js");
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// Timezone (ISO-8601)
class ISOTimezoneParser extends _Parser.Parser {
  priority = 10;

  parse(dateString, token) {
    switch (token) {
      case "x":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basicOptionalMinutes,
          dateString,
        );
      case "xx":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basic,
          dateString,
        );
      case "xxxx":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basicOptionalSeconds,
          dateString,
        );
      case "xxxxx":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.extendedOptionalSeconds,
          dateString,
        );
      case "xxx":
      default:
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.extended,
          dateString,
        );
    }
  }

  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return (0, _index.constructFrom)(
      date,
      date.getTime() -
        (0, _index2.getTimezoneOffsetInMilliseconds)(date) -
        value,
    );
  }

  incompatibleTokens = ["t", "T", "X"];
}
exports.ISOTimezoneParser = ISOTimezoneParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISOTimezoneWithZParser = void 0;
var _index = __webpack_require__(/*! ../../../constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _index2 = __webpack_require__(/*! ../../../_lib/getTimezoneOffsetInMilliseconds.js */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js");
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// Timezone (ISO-8601. +00:00 is `'Z'`)
class ISOTimezoneWithZParser extends _Parser.Parser {
  priority = 10;

  parse(dateString, token) {
    switch (token) {
      case "X":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basicOptionalMinutes,
          dateString,
        );
      case "XX":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basic,
          dateString,
        );
      case "XXXX":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basicOptionalSeconds,
          dateString,
        );
      case "XXXXX":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.extendedOptionalSeconds,
          dateString,
        );
      case "XXX":
      default:
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.extended,
          dateString,
        );
    }
  }

  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return (0, _index.constructFrom)(
      date,
      date.getTime() -
        (0, _index2.getTimezoneOffsetInMilliseconds)(date) -
        value,
    );
  }

  incompatibleTokens = ["t", "T", "x"];
}
exports.ISOTimezoneWithZParser = ISOTimezoneWithZParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISOWeekParser = void 0;
var _index = __webpack_require__(/*! ../../../setISOWeek.js */ "./node_modules/date-fns/setISOWeek.js");
var _index2 = __webpack_require__(/*! ../../../startOfISOWeek.js */ "./node_modules/date-fns/startOfISOWeek.js");
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// ISO week of year
class ISOWeekParser extends _Parser.Parser {
  priority = 100;

  parse(dateString, token, match) {
    switch (token) {
      case "I":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.week,
          dateString,
        );
      case "Io":
        return match.ordinalNumber(dateString, { unit: "week" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 53;
  }

  set(date, _flags, value) {
    return (0, _index2.startOfISOWeek)((0, _index.setISOWeek)(date, value));
  }

  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.ISOWeekParser = ISOWeekParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISOWeekYearParser = void 0;
var _index = __webpack_require__(/*! ../../../startOfISOWeek.js */ "./node_modules/date-fns/startOfISOWeek.js");
var _index2 = __webpack_require__(/*! ../../../constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// ISO week-numbering year
class ISOWeekYearParser extends _Parser.Parser {
  priority = 130;

  parse(dateString, token) {
    if (token === "R") {
      return (0, _utils.parseNDigitsSigned)(4, dateString);
    }

    return (0, _utils.parseNDigitsSigned)(token.length, dateString);
  }

  set(date, _flags, value) {
    const firstWeekOfYear = (0, _index2.constructFrom)(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return (0, _index.startOfISOWeek)(firstWeekOfYear);
  }

  incompatibleTokens = [
    "G",
    "y",
    "Y",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.ISOWeekYearParser = ISOWeekYearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/LocalDayParser.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/LocalDayParser.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.LocalDayParser = void 0;
var _index = __webpack_require__(/*! ../../../setDay.js */ "./node_modules/date-fns/setDay.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// Local day of week
class LocalDayParser extends _Parser.Parser {
  priority = 90;
  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
    };

    switch (token) {
      // 3
      case "e":
      case "ee": // 03
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(token.length, dateString),
          valueCallback,
        );
      // 3rd
      case "eo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "day",
          }),
          valueCallback,
        );
      // Tue
      case "eee":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // T
      case "eeeee":
        return match.day(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return (
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // Tuesday
      case "eeee":
      default:
        return (
          match.day(dateString, { width: "wide", context: "formatting" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = (0, _index.setDay)(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "c",
    "t",
    "T",
  ];
}
exports.LocalDayParser = LocalDayParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.LocalWeekParser = void 0;
var _index = __webpack_require__(/*! ../../../setWeek.js */ "./node_modules/date-fns/setWeek.js");
var _index2 = __webpack_require__(/*! ../../../startOfWeek.js */ "./node_modules/date-fns/startOfWeek.js");
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// Local week of year
class LocalWeekParser extends _Parser.Parser {
  priority = 100;

  parse(dateString, token, match) {
    switch (token) {
      case "w":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.week,
          dateString,
        );
      case "wo":
        return match.ordinalNumber(dateString, { unit: "week" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 53;
  }

  set(date, _flags, value, options) {
    return (0, _index2.startOfWeek)(
      (0, _index.setWeek)(date, value, options),
      options,
    );
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T",
  ];
}
exports.LocalWeekParser = LocalWeekParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.LocalWeekYearParser = void 0;
var _index = __webpack_require__(/*! ../../../getWeekYear.js */ "./node_modules/date-fns/getWeekYear.js");

var _index2 = __webpack_require__(/*! ../../../startOfWeek.js */ "./node_modules/date-fns/startOfWeek.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// Local week-numbering year
class LocalWeekYearParser extends _Parser.Parser {
  priority = 130;

  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY",
    });

    switch (token) {
      case "Y":
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(4, dateString),
          valueCallback,
        );
      case "Yo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "year",
          }),
          valueCallback,
        );
      default:
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(token.length, dateString),
          valueCallback,
        );
    }
  }

  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }

  set(date, flags, value, options) {
    const currentYear = (0, _index.getWeekYear)(date, options);

    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = (0, _utils.normalizeTwoDigitYear)(
        value.year,
        currentYear,
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate,
      );
      date.setHours(0, 0, 0, 0);
      return (0, _index2.startOfWeek)(date, options);
    }

    const year =
      !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return (0, _index2.startOfWeek)(date, options);
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T",
  ];
}
exports.LocalWeekYearParser = LocalWeekYearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/MinuteParser.js":
/*!******************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/MinuteParser.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.MinuteParser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class MinuteParser extends _Parser.Parser {
  priority = 60;

  parse(dateString, token, match) {
    switch (token) {
      case "m":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.minute,
          dateString,
        );
      case "mo":
        return match.ordinalNumber(dateString, { unit: "minute" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 59;
  }

  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}
exports.MinuteParser = MinuteParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/MonthParser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/MonthParser.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.MonthParser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class MonthParser extends _Parser.Parser {
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "L",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];

  priority = 110;

  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1;

    switch (token) {
      // 1, 2, ..., 12
      case "M":
        return (0, _utils.mapValue)(
          (0, _utils.parseNumericPattern)(
            _constants.numericPatterns.month,
            dateString,
          ),
          valueCallback,
        );
      // 01, 02, ..., 12
      case "MM":
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(2, dateString),
          valueCallback,
        );
      // 1st, 2nd, ..., 12th
      case "Mo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "month",
          }),
          valueCallback,
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return (
          match.month(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.month(dateString, { width: "narrow", context: "formatting" })
        );

      // J, F, ..., D
      case "MMMMM":
        return match.month(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return (
          match.month(dateString, { width: "wide", context: "formatting" }) ||
          match.month(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.month(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
exports.MonthParser = MonthParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/QuarterParser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/QuarterParser.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.QuarterParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class QuarterParser extends _Parser.Parser {
  priority = 120;

  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ": // 01, 02, 03, 04
        return (0, _utils.parseNDigits)(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return match.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return (
          match.quarter(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return match.quarter(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return (
          match.quarter(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 4;
  }

  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.QuarterParser = QuarterParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/SecondParser.js":
/*!******************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/SecondParser.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.SecondParser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class SecondParser extends _Parser.Parser {
  priority = 50;

  parse(dateString, token, match) {
    switch (token) {
      case "s":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.second,
          dateString,
        );
      case "so":
        return match.ordinalNumber(dateString, { unit: "second" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 59;
  }

  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}
exports.SecondParser = SecondParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.js":
/*!******************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.StandAloneLocalDayParser = void 0;
var _index = __webpack_require__(/*! ../../../setDay.js */ "./node_modules/date-fns/setDay.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// Stand-alone local day of week
class StandAloneLocalDayParser extends _Parser.Parser {
  priority = 90;

  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
    };

    switch (token) {
      // 3
      case "c":
      case "cc": // 03
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(token.length, dateString),
          valueCallback,
        );
      // 3rd
      case "co":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "day",
          }),
          valueCallback,
        );
      // Tue
      case "ccc":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );

      // T
      case "ccccc":
        return match.day(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return (
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );

      // Tuesday
      case "cccc":
      default:
        return (
          match.day(dateString, { width: "wide", context: "standalone" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = (0, _index.setDay)(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "e",
    "t",
    "T",
  ];
}
exports.StandAloneLocalDayParser = StandAloneLocalDayParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.js":
/*!***************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.StandAloneMonthParser = void 0;
var _constants = __webpack_require__(/*! ../constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class StandAloneMonthParser extends _Parser.Parser {
  priority = 110;

  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1;

    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return (0, _utils.mapValue)(
          (0, _utils.parseNumericPattern)(
            _constants.numericPatterns.month,
            dateString,
          ),
          valueCallback,
        );
      // 01, 02, ..., 12
      case "LL":
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(2, dateString),
          valueCallback,
        );
      // 1st, 2nd, ..., 12th
      case "Lo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "month",
          }),
          valueCallback,
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return (
          match.month(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.month(dateString, { width: "narrow", context: "standalone" })
        );

      // J, F, ..., D
      case "LLLLL":
        return match.month(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return (
          match.month(dateString, { width: "wide", context: "standalone" }) ||
          match.month(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.month(dateString, { width: "narrow", context: "standalone" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.StandAloneMonthParser = StandAloneMonthParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.StandAloneQuarterParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class StandAloneQuarterParser extends _Parser.Parser {
  priority = 120;

  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case "q":
      case "qq": // 01, 02, 03, 04
        return (0, _utils.parseNDigits)(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return match.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return (
          match.quarter(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "standalone",
          })
        );

      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return match.quarter(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return (
          match.quarter(dateString, {
            width: "wide",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "standalone",
          })
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 4;
  }

  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.StandAloneQuarterParser = StandAloneQuarterParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.TimestampMillisecondsParser = void 0;
var _index = __webpack_require__(/*! ../../../constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class TimestampMillisecondsParser extends _Parser.Parser {
  priority = 20;

  parse(dateString) {
    return (0, _utils.parseAnyDigitsSigned)(dateString);
  }

  set(date, _flags, value) {
    return [(0, _index.constructFrom)(date, value), { timestampIsSet: true }];
  }

  incompatibleTokens = "*";
}
exports.TimestampMillisecondsParser = TimestampMillisecondsParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.TimestampSecondsParser = void 0;
var _index = __webpack_require__(/*! ../../../constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

class TimestampSecondsParser extends _Parser.Parser {
  priority = 40;

  parse(dateString) {
    return (0, _utils.parseAnyDigitsSigned)(dateString);
  }

  set(date, _flags, value) {
    return [
      (0, _index.constructFrom)(date, value * 1000),
      { timestampIsSet: true },
    ];
  }

  incompatibleTokens = "*";
}
exports.TimestampSecondsParser = TimestampSecondsParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/YearParser.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/YearParser.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.YearParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.js */ "./node_modules/date-fns/parse/_lib/Parser.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/date-fns/parse/_lib/utils.js");

// From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
// | Year     |     y | yy |   yyy |  yyyy | yyyyy |
// |----------|-------|----|-------|-------|-------|
// | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
// | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
// | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
// | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
// | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
class YearParser extends _Parser.Parser {
  priority = 130;
  incompatibleTokens = ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"];

  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy",
    });

    switch (token) {
      case "y":
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(4, dateString),
          valueCallback,
        );
      case "yo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "year",
          }),
          valueCallback,
        );
      default:
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(token.length, dateString),
          valueCallback,
        );
    }
  }

  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }

  set(date, flags, value) {
    const currentYear = date.getFullYear();

    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = (0, _utils.normalizeTwoDigitYear)(
        value.year,
        currentYear,
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    const year =
      !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
exports.YearParser = YearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/utils.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.dayPeriodEnumToHours = dayPeriodEnumToHours;
exports.isLeapYearIndex = isLeapYearIndex;
exports.mapValue = mapValue;
exports.normalizeTwoDigitYear = normalizeTwoDigitYear;
exports.parseAnyDigitsSigned = parseAnyDigitsSigned;
exports.parseNDigits = parseNDigits;
exports.parseNDigitsSigned = parseNDigitsSigned;
exports.parseNumericPattern = parseNumericPattern;
exports.parseTimezonePattern = parseTimezonePattern;
var _index = __webpack_require__(/*! ../../constants.js */ "./node_modules/date-fns/constants.js");

var _constants = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/parse/_lib/constants.js");

function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }

  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest,
  };
}

function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);

  if (!matchResult) {
    return null;
  }

  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length),
  };
}

function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);

  if (!matchResult) {
    return null;
  }

  // Input is 'Z'
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1),
    };
  }

  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;

  return {
    value:
      sign *
      (hours * _index.millisecondsInHour +
        minutes * _index.millisecondsInMinute +
        seconds * _index.millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length),
  };
}

function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(
    _constants.numericPatterns.anyDigitsSigned,
    dateString,
  );
}

function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(
        _constants.numericPatterns.singleDigit,
        dateString,
      );
    case 2:
      return parseNumericPattern(
        _constants.numericPatterns.twoDigits,
        dateString,
      );
    case 3:
      return parseNumericPattern(
        _constants.numericPatterns.threeDigits,
        dateString,
      );
    case 4:
      return parseNumericPattern(
        _constants.numericPatterns.fourDigits,
        dateString,
      );
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}

function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(
        _constants.numericPatterns.singleDigitSigned,
        dateString,
      );
    case 2:
      return parseNumericPattern(
        _constants.numericPatterns.twoDigitsSigned,
        dateString,
      );
    case 3:
      return parseNumericPattern(
        _constants.numericPatterns.threeDigitsSigned,
        dateString,
      );
    case 4:
      return parseNumericPattern(
        _constants.numericPatterns.fourDigitsSigned,
        dateString,
      );
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}

function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}

function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0;
  // Absolute number of the current year:
  // 1 -> 1 AC
  // 0 -> 1 BC
  // -1 -> 2 BC
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;

  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }

  return isCommonEra ? result : 1 - result;
}

function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}


/***/ }),

/***/ "./node_modules/date-fns/set.js":
/*!**************************************!*\
  !*** ./node_modules/date-fns/set.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.set = set;
var _index = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _index2 = __webpack_require__(/*! ./setMonth.js */ "./node_modules/date-fns/setMonth.js");
var _index3 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name set
 * @category Common Helpers
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets time values to date from object `values`.
 * A value is not set if it is undefined or null or doesn't exist in `values`.
 *
 * Note about bundle size: `set` does not internally use `setX` functions from date-fns but instead opts
 * to use native `Date#setX` methods. If you use this function, you may not want to include the
 * other `setX` functions that date-fns provides if you are concerned about the bundle size.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param values - The date values to be set
 *
 * @returns The new date with options set
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */

function set(date, values) {
  let _date = (0, _index3.toDate)(date);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(+_date)) {
    return (0, _index.constructFrom)(date, NaN);
  }

  if (values.year != null) {
    _date.setFullYear(values.year);
  }

  if (values.month != null) {
    _date = (0, _index2.setMonth)(_date, values.month);
  }

  if (values.date != null) {
    _date.setDate(values.date);
  }

  if (values.hours != null) {
    _date.setHours(values.hours);
  }

  if (values.minutes != null) {
    _date.setMinutes(values.minutes);
  }

  if (values.seconds != null) {
    _date.setSeconds(values.seconds);
  }

  if (values.milliseconds != null) {
    _date.setMilliseconds(values.milliseconds);
  }

  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setDay.js":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/setDay.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setDay = setDay;
var _index = __webpack_require__(/*! ./addDays.js */ "./node_modules/date-fns/addDays.js");
var _index2 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

var _index3 = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");

/**
 * The {@link setDay} function options.
 */

/**
 * @name setDay
 * @category Weekday Helpers
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param day - The day of the week of the new date
 * @param options - An object with options.
 *
 * @returns The new date with the day of the week set
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * const result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
function setDay(date, day, options) {
  const defaultOptions = (0, _index3.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0, _index2.toDate)(date);
  const currentDay = _date.getDay();

  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;

  const delta = 7 - weekStartsOn;
  const diff =
    day < 0 || day > 6
      ? day - ((currentDay + delta) % 7)
      : ((dayIndex + delta) % 7) - ((currentDay + delta) % 7);
  return (0, _index.addDays)(_date, diff);
}


/***/ }),

/***/ "./node_modules/date-fns/setHours.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/setHours.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setHours = setHours;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name setHours
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param hours - The hours of the new date
 *
 * @returns The new date with the hours set
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
function setHours(date, hours) {
  const _date = (0, _index.toDate)(date);
  _date.setHours(hours);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setISODay.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/setISODay.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setISODay = setISODay;
var _index = __webpack_require__(/*! ./addDays.js */ "./node_modules/date-fns/addDays.js");
var _index2 = __webpack_require__(/*! ./getISODay.js */ "./node_modules/date-fns/getISODay.js");
var _index3 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name setISODay
 * @category Weekday Helpers
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday etc.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param day - The day of the ISO week of the new date
 *
 * @returns The new date with the day of the ISO week set
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * const result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
function setISODay(date, day) {
  const _date = (0, _index3.toDate)(date);
  const currentDay = (0, _index2.getISODay)(_date);
  const diff = day - currentDay;
  return (0, _index.addDays)(_date, diff);
}


/***/ }),

/***/ "./node_modules/date-fns/setISOWeek.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/setISOWeek.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setISOWeek = setISOWeek;
var _index = __webpack_require__(/*! ./getISOWeek.js */ "./node_modules/date-fns/getISOWeek.js");
var _index2 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name setISOWeek
 * @category ISO Week Helpers
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param week - The ISO week of the new date
 *
 * @returns The new date with the ISO week set
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * const result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
function setISOWeek(date, week) {
  const _date = (0, _index2.toDate)(date);
  const diff = (0, _index.getISOWeek)(_date) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setMinutes.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/setMinutes.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setMinutes = setMinutes;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name setMinutes
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param minutes - The minutes of the new date
 *
 * @returns The new date with the minutes set
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
function setMinutes(date, minutes) {
  const _date = (0, _index.toDate)(date);
  _date.setMinutes(minutes);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setMonth.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/setMonth.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setMonth = setMonth;
var _index = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _index2 = __webpack_require__(/*! ./getDaysInMonth.js */ "./node_modules/date-fns/getDaysInMonth.js");
var _index3 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param month - The month index to set (0-11)
 *
 * @returns The new date with the month set
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth(date, month) {
  const _date = (0, _index3.toDate)(date);
  const year = _date.getFullYear();
  const day = _date.getDate();

  const dateWithDesiredMonth = (0, _index.constructFrom)(date, 0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  const daysInMonth = (0, _index2.getDaysInMonth)(dateWithDesiredMonth);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setQuarter.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/setQuarter.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setQuarter = setQuarter;
var _index = __webpack_require__(/*! ./setMonth.js */ "./node_modules/date-fns/setMonth.js");
var _index2 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name setQuarter
 * @category Quarter Helpers
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param quarter - The quarter of the new date
 *
 * @returns The new date with the quarter set
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * const result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
function setQuarter(date, quarter) {
  const _date = (0, _index2.toDate)(date);
  const oldQuarter = Math.trunc(_date.getMonth() / 3) + 1;
  const diff = quarter - oldQuarter;
  return (0, _index.setMonth)(_date, _date.getMonth() + diff * 3);
}


/***/ }),

/***/ "./node_modules/date-fns/setSeconds.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/setSeconds.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setSeconds = setSeconds;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name setSeconds
 * @category Second Helpers
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param seconds - The seconds of the new date
 *
 * @returns The new date with the seconds set
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
function setSeconds(date, seconds) {
  const _date = (0, _index.toDate)(date);
  _date.setSeconds(seconds);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setWeek.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/setWeek.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setWeek = setWeek;
var _index = __webpack_require__(/*! ./getWeek.js */ "./node_modules/date-fns/getWeek.js");
var _index2 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * The {@link setWeek} function options.
 */

/**
 * @name setWeek
 * @category Week Helpers
 * @summary Set the local week to the given date.
 *
 * @description
 * Set the local week to the given date, saving the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param week - The week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week set
 *
 * @example
 * // Set the 1st week to 2 January 2005 with default options:
 * const result = setWeek(new Date(2005, 0, 2), 1)
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // Set the 1st week to 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January:
 * const result = setWeek(new Date(2005, 0, 2), 1, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sun Jan 4 2004 00:00:00
 */
function setWeek(date, week, options) {
  const _date = (0, _index2.toDate)(date);
  const diff = (0, _index.getWeek)(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setYear.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/setYear.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setYear = setYear;
var _index = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _index2 = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param year - The year of the new date
 *
 * @returns The new date with the year set
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear(date, year) {
  const _date = (0, _index2.toDate)(date);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(+_date)) {
    return (0, _index.constructFrom)(date, NaN);
  }

  _date.setFullYear(year);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfDay.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfDay = startOfDay;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date) {
  const _date = (0, _index.toDate)(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfISOWeek.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/startOfISOWeek.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfISOWeek = startOfISOWeek;
var _index = __webpack_require__(/*! ./startOfWeek.js */ "./node_modules/date-fns/startOfWeek.js");

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(date) {
  return (0, _index.startOfWeek)(date, { weekStartsOn: 1 });
}


/***/ }),

/***/ "./node_modules/date-fns/startOfISOWeekYear.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/startOfISOWeekYear.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfISOWeekYear = startOfISOWeekYear;
var _index = __webpack_require__(/*! ./getISOWeekYear.js */ "./node_modules/date-fns/getISOWeekYear.js");
var _index2 = __webpack_require__(/*! ./startOfISOWeek.js */ "./node_modules/date-fns/startOfISOWeek.js");
var _index3 = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(date) {
  const year = (0, _index.getISOWeekYear)(date);
  const fourthOfJanuary = (0, _index3.constructFrom)(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return (0, _index2.startOfISOWeek)(fourthOfJanuary);
}


/***/ }),

/***/ "./node_modules/date-fns/startOfMonth.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfMonth.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfMonth = startOfMonth;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(date) {
  const _date = (0, _index.toDate)(date);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfQuarter.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/startOfQuarter.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfQuarter = startOfQuarter;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

/**
 * @name startOfQuarter
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
function startOfQuarter(date) {
  const _date = (0, _index.toDate)(date);
  const currentMonth = _date.getMonth();
  const month = currentMonth - (currentMonth % 3);
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfWeek.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfWeek = startOfWeek;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");

var _index2 = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");

/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0, _index2.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0, _index.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfWeekYear.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/startOfWeekYear.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfWeekYear = startOfWeekYear;
var _index = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
var _index2 = __webpack_require__(/*! ./getWeekYear.js */ "./node_modules/date-fns/getWeekYear.js");
var _index3 = __webpack_require__(/*! ./startOfWeek.js */ "./node_modules/date-fns/startOfWeek.js");

var _index4 = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");

/**
 * The {@link startOfWeekYear} function options.
 */

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(date, options) {
  const defaultOptions = (0, _index4.getDefaultOptions)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const year = (0, _index2.getWeekYear)(date, options);
  const firstWeek = (0, _index.constructFrom)(date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = (0, _index3.startOfWeek)(firstWeek, options);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfYear.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfYear.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfYear = startOfYear;
var _index = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");
var _index2 = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(date) {
  const cleanDate = (0, _index.toDate)(date);
  const _date = (0, _index2.constructFrom)(date, 0);
  _date.setFullYear(cleanDate.getFullYear(), 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/subDays.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/subDays.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subDays = subDays;
var _index = __webpack_require__(/*! ./addDays.js */ "./node_modules/date-fns/addDays.js");

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 *
 * @returns The new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(date, amount) {
  return (0, _index.addDays)(date, -amount);
}


/***/ }),

/***/ "./node_modules/date-fns/subMonths.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/subMonths.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subMonths = subMonths;
var _index = __webpack_require__(/*! ./addMonths.js */ "./node_modules/date-fns/addMonths.js");

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be subtracted.
 *
 * @returns The new date with the months subtracted
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths(date, amount) {
  return (0, _index.addMonths)(date, -amount);
}


/***/ }),

/***/ "./node_modules/date-fns/subQuarters.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/subQuarters.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subQuarters = subQuarters;
var _index = __webpack_require__(/*! ./addQuarters.js */ "./node_modules/date-fns/addQuarters.js");

/**
 * @name subQuarters
 * @category Quarter Helpers
 * @summary Subtract the specified number of year quarters from the given date.
 *
 * @description
 * Subtract the specified number of year quarters from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be subtracted.
 *
 * @returns The new date with the quarters subtracted
 *
 * @example
 * // Subtract 3 quarters from 1 September 2014:
 * const result = subQuarters(new Date(2014, 8, 1), 3)
 * //=> Sun Dec 01 2013 00:00:00
 */
function subQuarters(date, amount) {
  return (0, _index.addQuarters)(date, -amount);
}


/***/ }),

/***/ "./node_modules/date-fns/subWeeks.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/subWeeks.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subWeeks = subWeeks;
var _index = __webpack_require__(/*! ./addWeeks.js */ "./node_modules/date-fns/addWeeks.js");

/**
 * @name subWeeks
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of weeks to be subtracted.
 *
 * @returns The new date with the weeks subtracted
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * const result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks(date, amount) {
  return (0, _index.addWeeks)(date, -amount);
}


/***/ }),

/***/ "./node_modules/date-fns/subYears.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/subYears.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subYears = subYears;
var _index = __webpack_require__(/*! ./addYears.js */ "./node_modules/date-fns/addYears.js");

/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be subtracted.
 *
 * @returns The new date with the years subtracted
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * const result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears(date, amount) {
  return (0, _index.addYears)(date, -amount);
}


/***/ }),

/***/ "./node_modules/date-fns/toDate.js":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/toDate.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.toDate = toDate;

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === "object" && argStr === "[object Date]")
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new argument.constructor(+argument);
  } else if (
    typeof argument === "number" ||
    argStr === "[object Number]" ||
    typeof argument === "string" ||
    argStr === "[object String]"
  ) {
    // TODO: Can we get rid of as?
    return new Date(argument);
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN);
  }
}


/***/ }),

/***/ "./node_modules/date-fns/transpose.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/transpose.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.transpose = transpose;
var _index = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");

/**
 * @name transpose
 * @category Generic Helpers
 * @summary Transpose the date to the given constructor.
 *
 * @description
 * The function transposes the date to the given constructor. It helps you
 * to transpose the date in the system time zone to say `UTCDate` or any other
 * date extension.
 *
 * @typeParam DateInputType - The input `Date` type derived from the passed argument.
 * @typeParam DateOutputType - The output `Date` type derived from the passed constructor.
 *
 * @param fromDate - The date to use values from
 * @param constructor - The date constructor to use
 *
 * @returns Date transposed to the given constructor
 *
 * @example
 * // Create July 10, 2022 00:00 in locale time zone
 * const date = new Date(2022, 6, 10)
 * //=> 'Sun Jul 10 2022 00:00:00 GMT+0800 (Singapore Standard Time)'
 *
 * @example
 * // Transpose the date to July 10, 2022 00:00 in UTC
 * transpose(date, UTCDate)
 * //=> 'Sun Jul 10 2022 00:00:00 GMT+0000 (Coordinated Universal Time)'
 */
function transpose(fromDate, constructor) {
  const date =
    constructor instanceof Date
      ? (0, _index.constructFrom)(constructor, 0)
      : new constructor(0);
  date.setFullYear(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate(),
  );
  date.setHours(
    fromDate.getHours(),
    fromDate.getMinutes(),
    fromDate.getSeconds(),
    fromDate.getMilliseconds(),
  );
  return date;
}


/***/ }),

/***/ "./node_modules/react-datepicker/dist/react-datepicker.css":
/*!*****************************************************************!*\
  !*** ./node_modules/react-datepicker/dist/react-datepicker.css ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/react-datepicker/dist/react-datepicker.min.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-datepicker/dist/react-datepicker.min.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*!
  react-datepicker v7.3.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
!function(e,t){ true?t(exports,__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.js"),__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-onclickoutside */ "./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js"),__webpack_require__(/*! date-fns/addDays */ "./node_modules/date-fns/addDays.js"),__webpack_require__(/*! date-fns/addHours */ "./node_modules/date-fns/addHours.js"),__webpack_require__(/*! date-fns/addMinutes */ "./node_modules/date-fns/addMinutes.js"),__webpack_require__(/*! date-fns/addMonths */ "./node_modules/date-fns/addMonths.js"),__webpack_require__(/*! date-fns/addQuarters */ "./node_modules/date-fns/addQuarters.js"),__webpack_require__(/*! date-fns/addSeconds */ "./node_modules/date-fns/addSeconds.js"),__webpack_require__(/*! date-fns/addWeeks */ "./node_modules/date-fns/addWeeks.js"),__webpack_require__(/*! date-fns/addYears */ "./node_modules/date-fns/addYears.js"),__webpack_require__(/*! date-fns/differenceInCalendarDays */ "./node_modules/date-fns/differenceInCalendarDays.js"),__webpack_require__(/*! date-fns/differenceInCalendarMonths */ "./node_modules/date-fns/differenceInCalendarMonths.js"),__webpack_require__(/*! date-fns/differenceInCalendarQuarters */ "./node_modules/date-fns/differenceInCalendarQuarters.js"),__webpack_require__(/*! date-fns/differenceInCalendarYears */ "./node_modules/date-fns/differenceInCalendarYears.js"),__webpack_require__(/*! date-fns/endOfDay */ "./node_modules/date-fns/endOfDay.js"),__webpack_require__(/*! date-fns/endOfMonth */ "./node_modules/date-fns/endOfMonth.js"),__webpack_require__(/*! date-fns/endOfWeek */ "./node_modules/date-fns/endOfWeek.js"),__webpack_require__(/*! date-fns/endOfYear */ "./node_modules/date-fns/endOfYear.js"),__webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format.js"),__webpack_require__(/*! date-fns/getDate */ "./node_modules/date-fns/getDate.js"),__webpack_require__(/*! date-fns/getDay */ "./node_modules/date-fns/getDay.js"),__webpack_require__(/*! date-fns/getHours */ "./node_modules/date-fns/getHours.js"),__webpack_require__(/*! date-fns/getISOWeek */ "./node_modules/date-fns/getISOWeek.js"),__webpack_require__(/*! date-fns/getMinutes */ "./node_modules/date-fns/getMinutes.js"),__webpack_require__(/*! date-fns/getMonth */ "./node_modules/date-fns/getMonth.js"),__webpack_require__(/*! date-fns/getQuarter */ "./node_modules/date-fns/getQuarter.js"),__webpack_require__(/*! date-fns/getSeconds */ "./node_modules/date-fns/getSeconds.js"),__webpack_require__(/*! date-fns/getTime */ "./node_modules/date-fns/getTime.js"),__webpack_require__(/*! date-fns/getYear */ "./node_modules/date-fns/getYear.js"),__webpack_require__(/*! date-fns/isAfter */ "./node_modules/date-fns/isAfter.js"),__webpack_require__(/*! date-fns/isBefore */ "./node_modules/date-fns/isBefore.js"),__webpack_require__(/*! date-fns/isDate */ "./node_modules/date-fns/isDate.js"),__webpack_require__(/*! date-fns/isEqual */ "./node_modules/date-fns/isEqual.js"),__webpack_require__(/*! date-fns/isSameDay */ "./node_modules/date-fns/isSameDay.js"),__webpack_require__(/*! date-fns/isSameMonth */ "./node_modules/date-fns/isSameMonth.js"),__webpack_require__(/*! date-fns/isSameQuarter */ "./node_modules/date-fns/isSameQuarter.js"),__webpack_require__(/*! date-fns/isSameYear */ "./node_modules/date-fns/isSameYear.js"),__webpack_require__(/*! date-fns/isValid */ "./node_modules/date-fns/isValid.js"),__webpack_require__(/*! date-fns/isWithinInterval */ "./node_modules/date-fns/isWithinInterval.js"),__webpack_require__(/*! date-fns/max */ "./node_modules/date-fns/max.js"),__webpack_require__(/*! date-fns/min */ "./node_modules/date-fns/min.js"),__webpack_require__(/*! date-fns/parse */ "./node_modules/date-fns/parse.js"),__webpack_require__(/*! date-fns/parseISO */ "./node_modules/date-fns/parseISO.js"),__webpack_require__(/*! date-fns/set */ "./node_modules/date-fns/set.js"),__webpack_require__(/*! date-fns/setHours */ "./node_modules/date-fns/setHours.js"),__webpack_require__(/*! date-fns/setMinutes */ "./node_modules/date-fns/setMinutes.js"),__webpack_require__(/*! date-fns/setMonth */ "./node_modules/date-fns/setMonth.js"),__webpack_require__(/*! date-fns/setQuarter */ "./node_modules/date-fns/setQuarter.js"),__webpack_require__(/*! date-fns/setSeconds */ "./node_modules/date-fns/setSeconds.js"),__webpack_require__(/*! date-fns/setYear */ "./node_modules/date-fns/setYear.js"),__webpack_require__(/*! date-fns/startOfDay */ "./node_modules/date-fns/startOfDay.js"),__webpack_require__(/*! date-fns/startOfMonth */ "./node_modules/date-fns/startOfMonth.js"),__webpack_require__(/*! date-fns/startOfQuarter */ "./node_modules/date-fns/startOfQuarter.js"),__webpack_require__(/*! date-fns/startOfWeek */ "./node_modules/date-fns/startOfWeek.js"),__webpack_require__(/*! date-fns/startOfYear */ "./node_modules/date-fns/startOfYear.js"),__webpack_require__(/*! date-fns/subDays */ "./node_modules/date-fns/subDays.js"),__webpack_require__(/*! date-fns/subMonths */ "./node_modules/date-fns/subMonths.js"),__webpack_require__(/*! date-fns/subQuarters */ "./node_modules/date-fns/subQuarters.js"),__webpack_require__(/*! date-fns/subWeeks */ "./node_modules/date-fns/subWeeks.js"),__webpack_require__(/*! date-fns/subYears */ "./node_modules/date-fns/subYears.js"),__webpack_require__(/*! date-fns/toDate */ "./node_modules/date-fns/toDate.js"),__webpack_require__(/*! @floating-ui/react */ "./node_modules/@floating-ui/react/dist/floating-ui.react.esm.js"),__webpack_require__(/*! react-dom */ "react-dom")):0}(this,(function(e,t,r,n,a,o,s,i,l,c,p,d,u,f,h,m,v,g,D,y,k,w,S,b,M,C,_,E,P,Y,x,N,O,I,T,R,L,A,F,H,W,Q,q,K,B,V,j,U,$,z,X,G,J,Z,ee,te,re,ne,ae,oe,se,ie,le,ce,pe){"use strict";function de(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var ue=de(r),fe=de(n),he=de(pe),me=function(e,t){return me=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},me(e,t)};function ve(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}me(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var ge=function(){return ge=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},ge.apply(this,arguments)};function De(e,t,r){if(r||2===arguments.length)for(var n,a=0,o=t.length;a<o;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError;var ye,ke=function(e){var t=e.showTimeSelectOnly,r=void 0!==t&&t,n=e.showTime,a=void 0!==n&&n,o=e.className,s=e.children,i=r?"Choose Time":"Choose Date".concat(a?" and Time":"");return ue.default.createElement("div",{className:o,role:"dialog","aria-label":i,"aria-modal":"true"},s)};function we(){return"undefined"!=typeof window?window:globalThis}!function(e){e.ArrowUp="ArrowUp",e.ArrowDown="ArrowDown",e.ArrowLeft="ArrowLeft",e.ArrowRight="ArrowRight",e.PageUp="PageUp",e.PageDown="PageDown",e.Home="Home",e.End="End",e.Enter="Enter",e.Space=" ",e.Tab="Tab",e.Escape="Escape",e.Backspace="Backspace",e.X="x"}(ye||(ye={}));var Se=12,be=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;function Me(e){if(null==e)return new Date;var t="string"==typeof e?B.parseISO(e):le.toDate(e);return Ce(t)?t:new Date}function Ce(e,t){return H.isValid(e)&&!O.isBefore(e,null!=t?t:new Date("1/1/1800"))}function _e(e,t,r){if("en"===r)return k.format(e,t,{useAdditionalWeekYearTokens:!0,useAdditionalDayOfYearTokens:!0});var n=r?Ke(r):void 0;return r&&!n&&console.warn('A locale object was not found for the provided string ["'.concat(r,'"].')),!n&&qe()&&Ke(qe())&&(n=Ke(qe())),k.format(e,t,{locale:n,useAdditionalWeekYearTokens:!0,useAdditionalDayOfYearTokens:!0})}function Ee(e,t){var r=t.dateFormat,n=t.locale,a=Array.isArray(r)&&r.length>0?r[0]:r;return e&&_e(e,a,n)||""}function Pe(e,t){var r=t.hour,n=void 0===r?0:r,a=t.minute,o=void 0===a?0:a,s=t.second,i=void 0===s?0:s;return j.setHours(U.setMinutes(X.setSeconds(e,i),o),n)}function Ye(e){return J.startOfDay(e)}function xe(e,t,r){var n=Ke(t||qe());return te.startOfWeek(e,{locale:n,weekStartsOn:r})}function Ne(e){return Z.startOfMonth(e)}function Oe(e){return re.startOfYear(e)}function Ie(e){return ee.startOfQuarter(e)}function Te(){return J.startOfDay(Me())}function Re(e){return v.endOfDay(e)}function Le(e,t){return e&&t?F.isSameYear(e,t):!e&&!t}function Ae(e,t){return e&&t?L.isSameMonth(e,t):!e&&!t}function Fe(e,t){return e&&t?A.isSameQuarter(e,t):!e&&!t}function He(e,t){return e&&t?R.isSameDay(e,t):!e&&!t}function We(e,t){return e&&t?T.isEqual(e,t):!e&&!t}function Qe(e,t,r){var n,a=J.startOfDay(t),o=v.endOfDay(r);try{n=W.isWithinInterval(e,{start:a,end:o})}catch(e){n=!1}return n}function qe(){return we().__localeId__}function Ke(e){if("string"==typeof e){var t=we();return t.__localeData__?t.__localeData__[e]:void 0}return e}function Be(e,t){return _e($.setMonth(Me(),e),"LLLL",t)}function Ve(e,t){return _e($.setMonth(Me(),e),"LLL",t)}function je(e,t){var r=void 0===t?{}:t,n=r.minDate,a=r.maxDate,o=r.excludeDates,s=r.excludeDateIntervals,i=r.includeDates,l=r.includeDateIntervals,c=r.filterDate;return tt(e,{minDate:n,maxDate:a})||o&&o.some((function(t){var r;return t instanceof Date?He(e,t):He(e,null!==(r=t.date)&&void 0!==r?r:new Date)}))||s&&s.some((function(t){var r=t.start,n=t.end;return W.isWithinInterval(e,{start:r,end:n})}))||i&&!i.some((function(t){return He(e,t)}))||l&&!l.some((function(t){var r=t.start,n=t.end;return W.isWithinInterval(e,{start:r,end:n})}))||c&&!c(Me(e))||!1}function Ue(e,t){var r=void 0===t?{}:t,n=r.excludeDates,a=r.excludeDateIntervals;return a&&a.length>0?a.some((function(t){var r=t.start,n=t.end;return W.isWithinInterval(e,{start:r,end:n})})):n&&n.some((function(t){var r;return t instanceof Date?He(e,t):He(e,null!==(r=t.date)&&void 0!==r?r:new Date)}))||!1}function $e(e,t){var r=void 0===t?{}:t,n=r.minDate,a=r.maxDate,o=r.excludeDates,s=r.includeDates,i=r.filterDate;return tt(e,{minDate:n?Z.startOfMonth(n):void 0,maxDate:a?g.endOfMonth(a):void 0})||(null==o?void 0:o.some((function(t){return Ae(e,t instanceof Date?t:t.date)})))||s&&!s.some((function(t){return Ae(e,t)}))||i&&!i(Me(e))||!1}function ze(e,t,r,n){var a=x.getYear(e),o=_.getMonth(e),s=x.getYear(t),i=_.getMonth(t),l=x.getYear(n);return a===s&&a===l?o<=r&&r<=i:a<s&&(l===a&&o<=r||l===s&&i>=r||l<s&&l>a)}function Xe(e,t){var r=void 0===t?{}:t,n=r.minDate,a=r.maxDate,o=r.excludeDates,s=r.includeDates;return tt(e,{minDate:n,maxDate:a})||o&&o.some((function(t){return Ae(t instanceof Date?t:t.date,e)}))||s&&!s.some((function(t){return Ae(t,e)}))||!1}function Ge(e,t){var r=void 0===t?{}:t,n=r.minDate,a=r.maxDate,o=r.excludeDates,s=r.includeDates,i=r.filterDate;return tt(e,{minDate:n,maxDate:a})||(null==o?void 0:o.some((function(t){return Fe(e,t instanceof Date?t:t.date)})))||s&&!s.some((function(t){return Fe(e,t)}))||i&&!i(Me(e))||!1}function Je(e,t,r){if(!t||!r)return!1;if(!H.isValid(t)||!H.isValid(r))return!1;var n=x.getYear(t),a=x.getYear(r);return n<=e&&a>=e}function Ze(e,t){var r=void 0===t?{}:t,n=r.minDate,a=r.maxDate,o=r.excludeDates,s=r.includeDates,i=r.filterDate,l=new Date(e,0,1);return tt(l,{minDate:n?re.startOfYear(n):void 0,maxDate:a?y.endOfYear(a):void 0})||(null==o?void 0:o.some((function(e){return Le(l,e instanceof Date?e:e.date)})))||s&&!s.some((function(e){return Le(l,e)}))||i&&!i(Me(l))||!1}function et(e,t,r,n){var a=x.getYear(e),o=E.getQuarter(e),s=x.getYear(t),i=E.getQuarter(t),l=x.getYear(n);return a===s&&a===l?o<=r&&r<=i:a<s&&(l===a&&o<=r||l===s&&i>=r||l<s&&l>a)}function tt(e,t){var r,n=void 0===t?{}:t,a=n.minDate,o=n.maxDate;return null!==(r=a&&u.differenceInCalendarDays(e,a)<0||o&&u.differenceInCalendarDays(e,o)>0)&&void 0!==r&&r}function rt(e,t){return t.some((function(t){return b.getHours(t)===b.getHours(e)&&C.getMinutes(t)===C.getMinutes(e)&&P.getSeconds(t)===P.getSeconds(e)}))}function nt(e,t){var r=void 0===t?{}:t,n=r.excludeTimes,a=r.includeTimes,o=r.filterTime;return n&&rt(e,n)||a&&!rt(e,a)||o&&!o(e)||!1}function at(e,t){var r=t.minTime,n=t.maxTime;if(!r||!n)throw new Error("Both minTime and maxTime props required");var a=Me();a=j.setHours(a,b.getHours(e)),a=U.setMinutes(a,C.getMinutes(e)),a=X.setSeconds(a,P.getSeconds(e));var o=Me();o=j.setHours(o,b.getHours(r)),o=U.setMinutes(o,C.getMinutes(r)),o=X.setSeconds(o,P.getSeconds(r));var s,i=Me();i=j.setHours(i,b.getHours(n)),i=U.setMinutes(i,C.getMinutes(n)),i=X.setSeconds(i,P.getSeconds(n));try{s=!W.isWithinInterval(a,{start:o,end:i})}catch(e){s=!1}return s}function ot(e,t){var r=void 0===t?{}:t,n=r.minDate,a=r.includeDates,o=ae.subMonths(e,1);return n&&f.differenceInCalendarMonths(n,o)>0||a&&a.every((function(e){return f.differenceInCalendarMonths(e,o)>0}))||!1}function st(e,t){var r=void 0===t?{}:t,n=r.maxDate,a=r.includeDates,o=i.addMonths(e,1);return n&&f.differenceInCalendarMonths(o,n)>0||a&&a.every((function(e){return f.differenceInCalendarMonths(o,e)>0}))||!1}function it(e,t){var r=void 0===t?{}:t,n=r.minDate,a=r.includeDates,o=ie.subYears(e,1);return n&&m.differenceInCalendarYears(n,o)>0||a&&a.every((function(e){return m.differenceInCalendarYears(e,o)>0}))||!1}function lt(e,t){var r=void 0===t?{}:t,n=r.maxDate,a=r.includeDates,o=d.addYears(e,1);return n&&m.differenceInCalendarYears(o,n)>0||a&&a.every((function(e){return m.differenceInCalendarYears(o,e)>0}))||!1}function ct(e){var t=e.minDate,r=e.includeDates;if(r&&t){var n=r.filter((function(e){return u.differenceInCalendarDays(e,t)>=0}));return q.min(n)}return r?q.min(r):t}function pt(e){var t=e.maxDate,r=e.includeDates;if(r&&t){var n=r.filter((function(e){return u.differenceInCalendarDays(e,t)<=0}));return Q.max(n)}return r?Q.max(r):t}function dt(e,t){var r;void 0===e&&(e=[]),void 0===t&&(t="react-datepicker__day--highlighted");for(var n=new Map,a=0,o=e.length;a<o;a++){var s=e[a];if(I.isDate(s)){var i=_e(s,"MM.dd.yyyy");(f=n.get(i)||[]).includes(t)||(f.push(t),n.set(i,f))}else if("object"==typeof s){var l=null!==(r=Object.keys(s)[0])&&void 0!==r?r:"",c=s[l];if("string"==typeof l&&Array.isArray(c))for(var p=0,d=c.length;p<d;p++){var u=c[p];if(u){var f;i=_e(u,"MM.dd.yyyy");(f=n.get(i)||[]).includes(l)||(f.push(l),n.set(i,f))}}}}return n}function ut(e,t){void 0===e&&(e=[]),void 0===t&&(t="react-datepicker__day--holidays");var r=new Map;return e.forEach((function(e){var n=e.date,a=e.holidayName;if(I.isDate(n)){var o=_e(n,"MM.dd.yyyy"),s=r.get(o)||{className:"",holidayNames:[]};if(!("className"in s)||s.className!==t||(i=s.holidayNames,l=[a],i.length!==l.length||!i.every((function(e,t){return e===l[t]})))){var i,l;s.className=t;var c=s.holidayNames;s.holidayNames=c?De(De([],c,!0),[a],!1):[a],r.set(o,s)}}})),r}function ft(e,t,r,n,a){for(var i=a.length,l=[],p=0;p<i;p++){var d=e,u=a[p];u&&(d=o.addHours(d,b.getHours(u)),d=s.addMinutes(d,C.getMinutes(u)),d=c.addSeconds(d,P.getSeconds(u)));var f=s.addMinutes(e,(r+1)*n);N.isAfter(d,t)&&O.isBefore(d,f)&&null!=u&&l.push(u)}return l}function ht(e){return e<10?"0".concat(e):"".concat(e)}function mt(e,t){void 0===t&&(t=Se);var r=Math.ceil(x.getYear(e)/t)*t;return{startPeriod:r-(t-1),endPeriod:r}}function vt(e){var t=e.getSeconds(),r=e.getMilliseconds();return le.toDate(e.getTime()-1e3*t-r)}function gt(e){if(!I.isDate(e))throw new Error("Invalid date");var t=new Date(e);return t.setHours(0,0,0,0),t}function Dt(e,t){if(!I.isDate(e)||!I.isDate(t))throw new Error("Invalid date received");var r=gt(e),n=gt(t);return O.isBefore(r,n)}function yt(e){return e.key===ye.Space}var kt,wt=function(e){function t(t){var n=e.call(this,t)||this;return n.onTimeChange=function(e){var t,r;n.setState({time:e});var a=n.props.date,o=a instanceof Date&&!isNaN(+a)?a:new Date;if(null==e?void 0:e.includes(":")){var s=e.split(":"),i=s[0],l=s[1];o.setHours(Number(i)),o.setMinutes(Number(l))}null===(r=(t=n.props).onChange)||void 0===r||r.call(t,o)},n.renderTimeInput=function(){var e=n.state.time,t=n.props,a=t.date,o=t.timeString,s=t.customTimeInput;return s?r.cloneElement(s,{date:a,value:e,onChange:n.onTimeChange}):ue.default.createElement("input",{type:"time",className:"react-datepicker-time__input",placeholder:"Time",name:"time-input",required:!0,value:e,onChange:function(e){n.onTimeChange(e.target.value||o)}})},n.state={time:n.props.timeString},n}return ve(t,e),t.getDerivedStateFromProps=function(e,t){return e.timeString!==t.time?{time:e.timeString}:null},t.prototype.render=function(){return ue.default.createElement("div",{className:"react-datepicker__input-time-container"},ue.default.createElement("div",{className:"react-datepicker-time__caption"},this.props.timeInputLabel),ue.default.createElement("div",{className:"react-datepicker-time__input-container"},ue.default.createElement("div",{className:"react-datepicker-time__input"},this.renderTimeInput())))},t}(r.Component),St=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.dayEl=r.createRef(),n.handleClick=function(e){!n.isDisabled()&&n.props.onClick&&n.props.onClick(e)},n.handleMouseEnter=function(e){!n.isDisabled()&&n.props.onMouseEnter&&n.props.onMouseEnter(e)},n.handleOnKeyDown=function(e){var t,r;e.key===ye.Space&&(e.preventDefault(),e.key=ye.Enter),null===(r=(t=n.props).handleOnKeyDown)||void 0===r||r.call(t,e)},n.isSameDay=function(e){return He(n.props.day,e)},n.isKeyboardSelected=function(){var e;if(n.props.disabledKeyboardNavigation)return!1;var t=n.props.selectsMultiple?null===(e=n.props.selectedDates)||void 0===e?void 0:e.some((function(e){return n.isSameDayOrWeek(e)})):n.isSameDayOrWeek(n.props.selected),r=n.props.preSelection&&n.isDisabled(n.props.preSelection);return!t&&n.isSameDayOrWeek(n.props.preSelection)&&!r},n.isDisabled=function(e){return void 0===e&&(e=n.props.day),je(e,{minDate:n.props.minDate,maxDate:n.props.maxDate,excludeDates:n.props.excludeDates,excludeDateIntervals:n.props.excludeDateIntervals,includeDateIntervals:n.props.includeDateIntervals,includeDates:n.props.includeDates,filterDate:n.props.filterDate})},n.isExcluded=function(){return Ue(n.props.day,{excludeDates:n.props.excludeDates,excludeDateIntervals:n.props.excludeDateIntervals})},n.isStartOfWeek=function(){return He(n.props.day,xe(n.props.day,n.props.locale,n.props.calendarStartDay))},n.isSameWeek=function(e){return n.props.showWeekPicker&&He(e,xe(n.props.day,n.props.locale,n.props.calendarStartDay))},n.isSameDayOrWeek=function(e){return n.isSameDay(e)||n.isSameWeek(e)},n.getHighLightedClass=function(){var e=n.props,t=e.day,r=e.highlightDates;if(!r)return!1;var a=_e(t,"MM.dd.yyyy");return r.get(a)},n.getHolidaysClass=function(){var e,t=n.props,r=t.day,a=t.holidays;if(!a)return[void 0];var o=_e(r,"MM.dd.yyyy");return a.has(o)?[null===(e=a.get(o))||void 0===e?void 0:e.className]:[void 0]},n.isInRange=function(){var e=n.props,t=e.day,r=e.startDate,a=e.endDate;return!(!r||!a)&&Qe(t,r,a)},n.isInSelectingRange=function(){var e,t=n.props,r=t.day,a=t.selectsStart,o=t.selectsEnd,s=t.selectsRange,i=t.selectsDisabledDaysInRange,l=t.startDate,c=t.endDate,p=null!==(e=n.props.selectingDate)&&void 0!==e?e:n.props.preSelection;return!(!(a||o||s)||!p||!i&&n.isDisabled())&&(a&&c&&(O.isBefore(p,c)||We(p,c))?Qe(r,p,c):(o&&l&&(N.isAfter(p,l)||We(p,l))||!(!s||!l||c||!N.isAfter(p,l)&&!We(p,l)))&&Qe(r,l,p))},n.isSelectingRangeStart=function(){var e;if(!n.isInSelectingRange())return!1;var t=n.props,r=t.day,a=t.startDate,o=t.selectsStart,s=null!==(e=n.props.selectingDate)&&void 0!==e?e:n.props.preSelection;return He(r,o?s:a)},n.isSelectingRangeEnd=function(){var e;if(!n.isInSelectingRange())return!1;var t=n.props,r=t.day,a=t.endDate,o=t.selectsEnd,s=t.selectsRange,i=null!==(e=n.props.selectingDate)&&void 0!==e?e:n.props.preSelection;return He(r,o||s?i:a)},n.isRangeStart=function(){var e=n.props,t=e.day,r=e.startDate,a=e.endDate;return!(!r||!a)&&He(r,t)},n.isRangeEnd=function(){var e=n.props,t=e.day,r=e.startDate,a=e.endDate;return!(!r||!a)&&He(a,t)},n.isWeekend=function(){var e=S.getDay(n.props.day);return 0===e||6===e},n.isAfterMonth=function(){return void 0!==n.props.month&&(n.props.month+1)%12===_.getMonth(n.props.day)},n.isBeforeMonth=function(){return void 0!==n.props.month&&(_.getMonth(n.props.day)+1)%12===n.props.month},n.isCurrentDay=function(){return n.isSameDay(Me())},n.isSelected=function(){var e;return n.props.selectsMultiple?null===(e=n.props.selectedDates)||void 0===e?void 0:e.some((function(e){return n.isSameDayOrWeek(e)})):n.isSameDayOrWeek(n.props.selected)},n.getClassNames=function(e){var r,a=n.props.dayClassName?n.props.dayClassName(e):void 0;return t.clsx("react-datepicker__day",a,"react-datepicker__day--"+_e(n.props.day,"ddd",r),{"react-datepicker__day--disabled":n.isDisabled(),"react-datepicker__day--excluded":n.isExcluded(),"react-datepicker__day--selected":n.isSelected(),"react-datepicker__day--keyboard-selected":n.isKeyboardSelected(),"react-datepicker__day--range-start":n.isRangeStart(),"react-datepicker__day--range-end":n.isRangeEnd(),"react-datepicker__day--in-range":n.isInRange(),"react-datepicker__day--in-selecting-range":n.isInSelectingRange(),"react-datepicker__day--selecting-range-start":n.isSelectingRangeStart(),"react-datepicker__day--selecting-range-end":n.isSelectingRangeEnd(),"react-datepicker__day--today":n.isCurrentDay(),"react-datepicker__day--weekend":n.isWeekend(),"react-datepicker__day--outside-month":n.isAfterMonth()||n.isBeforeMonth()},n.getHighLightedClass(),n.getHolidaysClass())},n.getAriaLabel=function(){var e=n.props,t=e.day,r=e.ariaLabelPrefixWhenEnabled,a=void 0===r?"Choose":r,o=e.ariaLabelPrefixWhenDisabled,s=void 0===o?"Not available":o,i=n.isDisabled()||n.isExcluded()?s:a;return"".concat(i," ").concat(_e(t,"PPPP",n.props.locale))},n.getTitle=function(){var e=n.props,t=e.day,r=e.holidays,a=void 0===r?new Map:r,o=e.excludeDates,s=_e(t,"MM.dd.yyyy"),i=[];return a.has(s)&&i.push.apply(i,a.get(s).holidayNames),n.isExcluded()&&i.push(null==o?void 0:o.filter((function(e){return e instanceof Date?He(e,t):He(null==e?void 0:e.date,t)})).map((function(e){if(!(e instanceof Date))return null==e?void 0:e.message}))),i.join(", ")},n.getTabIndex=function(){var e=n.props.selected,t=n.props.preSelection;return(!n.props.showWeekPicker||!n.props.showWeekNumber&&n.isStartOfWeek())&&(n.isKeyboardSelected()||n.isSameDay(e)&&He(t,e))?0:-1},n.handleFocusDay=function(){var e;n.shouldFocusDay()&&(null===(e=n.dayEl.current)||void 0===e||e.focus({preventScroll:!0}))},n.renderDayContents=function(){return n.props.monthShowsDuplicateDaysEnd&&n.isAfterMonth()||n.props.monthShowsDuplicateDaysStart&&n.isBeforeMonth()?null:n.props.renderDayContents?n.props.renderDayContents(w.getDate(n.props.day),n.props.day):w.getDate(n.props.day)},n.render=function(){return ue.default.createElement("div",{ref:n.dayEl,className:n.getClassNames(n.props.day),onKeyDown:n.handleOnKeyDown,onClick:n.handleClick,onMouseEnter:n.props.usePointerEvent?void 0:n.handleMouseEnter,onPointerEnter:n.props.usePointerEvent?n.handleMouseEnter:void 0,tabIndex:n.getTabIndex(),"aria-label":n.getAriaLabel(),role:"option",title:n.getTitle(),"aria-disabled":n.isDisabled(),"aria-current":n.isCurrentDay()?"date":void 0,"aria-selected":n.isSelected()||n.isInRange()},n.renderDayContents(),""!==n.getTitle()&&ue.default.createElement("span",{className:"overlay"},n.getTitle()))},n}return ve(n,e),n.prototype.componentDidMount=function(){this.handleFocusDay()},n.prototype.componentDidUpdate=function(){this.handleFocusDay()},n.prototype.shouldFocusDay=function(){var e=!1;return 0===this.getTabIndex()&&this.isSameDay(this.props.preSelection)&&(document.activeElement&&document.activeElement!==document.body||(e=!0),this.props.inline&&!this.props.shouldFocusDayInline&&(e=!1),this.isDayActiveElement()&&(e=!0),this.isDuplicateDay()&&(e=!1)),e},n.prototype.isDayActiveElement=function(){var e,t,r;return(null===(t=null===(e=this.props.containerRef)||void 0===e?void 0:e.current)||void 0===t?void 0:t.contains(document.activeElement))&&(null===(r=document.activeElement)||void 0===r?void 0:r.classList.contains("react-datepicker__day"))},n.prototype.isDuplicateDay=function(){return this.props.monthShowsDuplicateDaysEnd&&this.isAfterMonth()||this.props.monthShowsDuplicateDaysStart&&this.isBeforeMonth()},n}(r.Component),bt=function(e){function n(){var t=null!==e&&e.apply(this,arguments)||this;return t.weekNumberEl=r.createRef(),t.handleClick=function(e){t.props.onClick&&t.props.onClick(e)},t.handleOnKeyDown=function(e){var r,n;e.key===ye.Space&&(e.preventDefault(),e.key=ye.Enter),null===(n=(r=t.props).handleOnKeyDown)||void 0===n||n.call(r,e)},t.isKeyboardSelected=function(){return!t.props.disabledKeyboardNavigation&&!He(t.props.date,t.props.selected)&&He(t.props.date,t.props.preSelection)},t.getTabIndex=function(){return t.props.showWeekPicker&&t.props.showWeekNumber&&(t.isKeyboardSelected()||He(t.props.date,t.props.selected)&&He(t.props.preSelection,t.props.selected))?0:-1},t.handleFocusWeekNumber=function(e){var r=!1;0===t.getTabIndex()&&!(null==e?void 0:e.isInputFocused)&&He(t.props.date,t.props.preSelection)&&(document.activeElement&&document.activeElement!==document.body||(r=!0),t.props.inline&&!t.props.shouldFocusDayInline&&(r=!1),t.props.containerRef&&t.props.containerRef.current&&t.props.containerRef.current.contains(document.activeElement)&&document.activeElement&&document.activeElement.classList.contains("react-datepicker__week-number")&&(r=!0)),r&&t.weekNumberEl.current&&t.weekNumberEl.current.focus({preventScroll:!0})},t}return ve(n,e),Object.defineProperty(n,"defaultProps",{get:function(){return{ariaLabelPrefix:"week "}},enumerable:!1,configurable:!0}),n.prototype.componentDidMount=function(){this.handleFocusWeekNumber()},n.prototype.componentDidUpdate=function(e){this.handleFocusWeekNumber(e)},n.prototype.render=function(){var e=this.props,r=e.weekNumber,a=e.ariaLabelPrefix,o=void 0===a?n.defaultProps.ariaLabelPrefix:a,s=e.onClick,i={"react-datepicker__week-number":!0,"react-datepicker__week-number--clickable":!!s,"react-datepicker__week-number--selected":!!s&&He(this.props.date,this.props.selected),"react-datepicker__week-number--keyboard-selected":this.isKeyboardSelected()};return ue.default.createElement("div",{ref:this.weekNumberEl,className:t.clsx(i),"aria-label":"".concat(o," ").concat(this.props.weekNumber),onClick:this.handleClick,onKeyDown:this.handleOnKeyDown,tabIndex:this.getTabIndex()},r)},n}(r.Component),Mt=function(e){function r(){var t=null!==e&&e.apply(this,arguments)||this;return t.isDisabled=function(e){return je(e,{minDate:t.props.minDate,maxDate:t.props.maxDate,excludeDates:t.props.excludeDates,excludeDateIntervals:t.props.excludeDateIntervals,includeDateIntervals:t.props.includeDateIntervals,includeDates:t.props.includeDates,filterDate:t.props.filterDate})},t.handleDayClick=function(e,r){t.props.onDayClick&&t.props.onDayClick(e,r)},t.handleDayMouseEnter=function(e){t.props.onDayMouseEnter&&t.props.onDayMouseEnter(e)},t.handleWeekClick=function(e,n,a){for(var o,s,i,l=new Date(e),c=0;c<7;c++){var p=new Date(e);if(p.setDate(p.getDate()+c),!t.isDisabled(p)){l=p;break}}"function"==typeof t.props.onWeekSelect&&t.props.onWeekSelect(l,n,a),t.props.showWeekPicker&&t.handleDayClick(l,a),(null!==(o=t.props.shouldCloseOnSelect)&&void 0!==o?o:r.defaultProps.shouldCloseOnSelect)&&(null===(i=(s=t.props).setOpen)||void 0===i||i.call(s,!1))},t.formatWeekNumber=function(e){return t.props.formatWeekNumber?t.props.formatWeekNumber(e):function(e){return M.getISOWeek(e)}(e)},t.renderDays=function(){var e=t.startOfWeek(),n=[],o=t.formatWeekNumber(e);if(t.props.showWeekNumber){var s=t.props.onWeekSelect||t.props.showWeekPicker?t.handleWeekClick.bind(t,e,o):void 0;n.push(ue.default.createElement(bt,ge({key:"W"},r.defaultProps,t.props,{weekNumber:o,date:e,onClick:s})))}return n.concat([0,1,2,3,4,5,6].map((function(n){var o=a.addDays(e,n);return ue.default.createElement(St,ge({},r.defaultProps,t.props,{ariaLabelPrefixWhenEnabled:t.props.chooseDayAriaLabelPrefix,ariaLabelPrefixWhenDisabled:t.props.disabledDayAriaLabelPrefix,key:o.valueOf(),day:o,onClick:t.handleDayClick.bind(t,o),onMouseEnter:t.handleDayMouseEnter.bind(t,o)}))})))},t.startOfWeek=function(){return xe(t.props.day,t.props.locale,t.props.calendarStartDay)},t.isKeyboardSelected=function(){return!t.props.disabledKeyboardNavigation&&!He(t.startOfWeek(),t.props.selected)&&He(t.startOfWeek(),t.props.preSelection)},t}return ve(r,e),Object.defineProperty(r,"defaultProps",{get:function(){return{shouldCloseOnSelect:!0}},enumerable:!1,configurable:!0}),r.prototype.render=function(){var e={"react-datepicker__week":!0,"react-datepicker__week--selected":He(this.startOfWeek(),this.props.selected),"react-datepicker__week--keyboard-selected":this.isKeyboardSelected()};return ue.default.createElement("div",{className:t.clsx(e)},this.renderDays())},r}(r.Component),Ct="two_columns",_t="three_columns",Et="four_columns",Pt=((kt={})[Ct]={grid:[[0,1],[2,3],[4,5],[6,7],[8,9],[10,11]],verticalNavigationOffset:2},kt[_t]={grid:[[0,1,2],[3,4,5],[6,7,8],[9,10,11]],verticalNavigationOffset:3},kt[Et]={grid:[[0,1,2,3],[4,5,6,7],[8,9,10,11]],verticalNavigationOffset:4},kt);function Yt(e,t){return e?Et:t?Ct:_t}var xt=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.MONTH_REFS=De([],Array(12),!0).map((function(){return r.createRef()})),n.QUARTER_REFS=De([],Array(4),!0).map((function(){return r.createRef()})),n.isDisabled=function(e){return je(e,{minDate:n.props.minDate,maxDate:n.props.maxDate,excludeDates:n.props.excludeDates,excludeDateIntervals:n.props.excludeDateIntervals,includeDateIntervals:n.props.includeDateIntervals,includeDates:n.props.includeDates,filterDate:n.props.filterDate})},n.isExcluded=function(e){return Ue(e,{excludeDates:n.props.excludeDates,excludeDateIntervals:n.props.excludeDateIntervals})},n.handleDayClick=function(e,t){var r,a;null===(a=(r=n.props).onDayClick)||void 0===a||a.call(r,e,t,n.props.orderInDisplay)},n.handleDayMouseEnter=function(e){var t,r;null===(r=(t=n.props).onDayMouseEnter)||void 0===r||r.call(t,e)},n.handleMouseLeave=function(){var e,t;null===(t=(e=n.props).onMouseLeave)||void 0===t||t.call(e)},n.isRangeStartMonth=function(e){var t=n.props,r=t.day,a=t.startDate,o=t.endDate;return!(!a||!o)&&Ae($.setMonth(r,e),a)},n.isRangeStartQuarter=function(e){var t=n.props,r=t.day,a=t.startDate,o=t.endDate;return!(!a||!o)&&Fe(z.setQuarter(r,e),a)},n.isRangeEndMonth=function(e){var t=n.props,r=t.day,a=t.startDate,o=t.endDate;return!(!a||!o)&&Ae($.setMonth(r,e),o)},n.isRangeEndQuarter=function(e){var t=n.props,r=t.day,a=t.startDate,o=t.endDate;return!(!a||!o)&&Fe(z.setQuarter(r,e),o)},n.isInSelectingRangeMonth=function(e){var t,r=n.props,a=r.day,o=r.selectsStart,s=r.selectsEnd,i=r.selectsRange,l=r.startDate,c=r.endDate,p=null!==(t=n.props.selectingDate)&&void 0!==t?t:n.props.preSelection;return!(!(o||s||i)||!p)&&(o&&c?ze(p,c,e,a):(s&&l||!(!i||!l||c))&&ze(l,p,e,a))},n.isSelectingMonthRangeStart=function(e){var t;if(!n.isInSelectingRangeMonth(e))return!1;var r=n.props,a=r.day,o=r.startDate,s=r.selectsStart,i=$.setMonth(a,e),l=null!==(t=n.props.selectingDate)&&void 0!==t?t:n.props.preSelection;return Ae(i,s?l:o)},n.isSelectingMonthRangeEnd=function(e){var t;if(!n.isInSelectingRangeMonth(e))return!1;var r=n.props,a=r.day,o=r.endDate,s=r.selectsEnd,i=r.selectsRange,l=$.setMonth(a,e),c=null!==(t=n.props.selectingDate)&&void 0!==t?t:n.props.preSelection;return Ae(l,s||i?c:o)},n.isInSelectingRangeQuarter=function(e){var t,r=n.props,a=r.day,o=r.selectsStart,s=r.selectsEnd,i=r.selectsRange,l=r.startDate,c=r.endDate,p=null!==(t=n.props.selectingDate)&&void 0!==t?t:n.props.preSelection;return!(!(o||s||i)||!p)&&(o&&c?et(p,c,e,a):(s&&l||!(!i||!l||c))&&et(l,p,e,a))},n.isWeekInMonth=function(e){var t=n.props.day,r=a.addDays(e,6);return Ae(e,t)||Ae(r,t)},n.isCurrentMonth=function(e,t){return x.getYear(e)===x.getYear(Me())&&t===_.getMonth(Me())},n.isCurrentQuarter=function(e,t){return x.getYear(e)===x.getYear(Me())&&t===E.getQuarter(Me())},n.isSelectedMonth=function(e,t,r){return _.getMonth(r)===t&&x.getYear(e)===x.getYear(r)},n.isSelectMonthInList=function(e,t,r){return r.some((function(r){return n.isSelectedMonth(e,t,r)}))},n.isSelectedQuarter=function(e,t,r){return E.getQuarter(e)===t&&x.getYear(e)===x.getYear(r)},n.renderWeeks=function(){for(var e=[],t=n.props.fixedHeight,r=0,a=!1,o=xe(Ne(n.props.day),n.props.locale,n.props.calendarStartDay),s=n.props.selected?function(e){return n.props.showWeekPicker?xe(e,n.props.locale,n.props.calendarStartDay):n.props.selected}(n.props.selected):void 0,i=n.props.preSelection?function(e){return n.props.showWeekPicker?xe(e,n.props.locale,n.props.calendarStartDay):n.props.preSelection}(n.props.preSelection):void 0;e.push(ue.default.createElement(Mt,ge({},n.props,{ariaLabelPrefix:n.props.weekAriaLabelPrefix,key:r,day:o,month:_.getMonth(n.props.day),onDayClick:n.handleDayClick,onDayMouseEnter:n.handleDayMouseEnter,selected:s,preSelection:i,showWeekNumber:n.props.showWeekNumbers}))),!a;){r++,o=p.addWeeks(o,1);var l=t&&r>=6,c=!t&&!n.isWeekInMonth(o);if(l||c){if(!n.props.peekNextMonth)break;a=!0}}return e},n.onMonthClick=function(e,t){var r=n.isMonthDisabledForLabelDate(t),a=r.isDisabled,o=r.labelDate;a||n.handleDayClick(Ne(o),e)},n.onMonthMouseEnter=function(e){var t=n.isMonthDisabledForLabelDate(e),r=t.isDisabled,a=t.labelDate;r||n.handleDayMouseEnter(Ne(a))},n.handleMonthNavigation=function(e,t){var r,a,o,s;null===(a=(r=n.props).setPreSelection)||void 0===a||a.call(r,t),null===(s=null===(o=n.MONTH_REFS[e])||void 0===o?void 0:o.current)||void 0===s||s.focus()},n.handleKeyboardNavigation=function(e,t,r){var a,o=n.props,s=o.selected,l=o.preSelection,c=o.setPreSelection,p=o.minDate,d=o.maxDate,u=o.showFourColumnMonthYearPicker,f=o.showTwoColumnMonthYearPicker;if(l){var h=Yt(u,f),m=n.getVerticalOffset(h),v=null===(a=Pt[h])||void 0===a?void 0:a.grid,g=function(e,t,r){var n,a,o=t,s=r;switch(e){case ye.ArrowRight:o=i.addMonths(t,1),s=11===r?0:r+1;break;case ye.ArrowLeft:o=ae.subMonths(t,1),s=0===r?11:r-1;break;case ye.ArrowUp:o=ae.subMonths(t,m),s=(null===(n=null==v?void 0:v[0])||void 0===n?void 0:n.includes(r))?r+12-m:r-m;break;case ye.ArrowDown:o=i.addMonths(t,m),s=(null===(a=null==v?void 0:v[v.length-1])||void 0===a?void 0:a.includes(r))?r-12+m:r+m}return{newCalculatedDate:o,newCalculatedMonth:s}};if(t!==ye.Enter){var D=function(e,t,r){for(var a=e,o=!1,s=0,i=g(a,t,r),l=i.newCalculatedDate,c=i.newCalculatedMonth;!o;){if(s>=40){l=t,c=r;break}var u;if(p&&l<p)a=ye.ArrowRight,l=(u=g(a,l,c)).newCalculatedDate,c=u.newCalculatedMonth;if(d&&l>d)a=ye.ArrowLeft,l=(u=g(a,l,c)).newCalculatedDate,c=u.newCalculatedMonth;if(Xe(l,n.props))l=(u=g(a,l,c)).newCalculatedDate,c=u.newCalculatedMonth;else o=!0;s++}return{newCalculatedDate:l,newCalculatedMonth:c}}(t,l,r),y=D.newCalculatedDate,k=D.newCalculatedMonth;switch(t){case ye.ArrowRight:case ye.ArrowLeft:case ye.ArrowUp:case ye.ArrowDown:n.handleMonthNavigation(k,y)}}else n.isMonthDisabled(r)||(n.onMonthClick(e,r),null==c||c(s))}},n.getVerticalOffset=function(e){var t,r;return null!==(r=null===(t=Pt[e])||void 0===t?void 0:t.verticalNavigationOffset)&&void 0!==r?r:0},n.onMonthKeyDown=function(e,t){var r=n.props,a=r.disabledKeyboardNavigation,o=r.handleOnMonthKeyDown,s=e.key;s!==ye.Tab&&e.preventDefault(),a||n.handleKeyboardNavigation(e,s,t),o&&o(e)},n.onQuarterClick=function(e,t){var r=z.setQuarter(n.props.day,t);Ge(r,n.props)||n.handleDayClick(Ie(r),e)},n.onQuarterMouseEnter=function(e){var t=z.setQuarter(n.props.day,e);Ge(t,n.props)||n.handleDayMouseEnter(Ie(t))},n.handleQuarterNavigation=function(e,t){var r,a,o,s;n.isDisabled(t)||n.isExcluded(t)||(null===(a=(r=n.props).setPreSelection)||void 0===a||a.call(r,t),null===(s=null===(o=n.QUARTER_REFS[e-1])||void 0===o?void 0:o.current)||void 0===s||s.focus())},n.onQuarterKeyDown=function(e,t){var r,a,o=e.key;if(!n.props.disabledKeyboardNavigation)switch(o){case ye.Enter:n.onQuarterClick(e,t),null===(a=(r=n.props).setPreSelection)||void 0===a||a.call(r,n.props.selected);break;case ye.ArrowRight:if(!n.props.preSelection)break;n.handleQuarterNavigation(4===t?1:t+1,l.addQuarters(n.props.preSelection,1));break;case ye.ArrowLeft:if(!n.props.preSelection)break;n.handleQuarterNavigation(1===t?4:t-1,oe.subQuarters(n.props.preSelection,1))}},n.isMonthDisabledForLabelDate=function(e){var t,r=n.props,a=r.day,o=r.minDate,s=r.maxDate,i=r.excludeDates,l=r.includeDates,c=$.setMonth(a,e);return{isDisabled:null!==(t=(o||s||i||l)&&$e(c,n.props))&&void 0!==t&&t,labelDate:c}},n.isMonthDisabled=function(e){return n.isMonthDisabledForLabelDate(e).isDisabled},n.getMonthClassNames=function(e){var r=n.props,a=r.day,o=r.startDate,s=r.endDate,i=r.preSelection,l=r.monthClassName,c=l?l($.setMonth(a,e)):void 0,p=n.getSelection();return t.clsx("react-datepicker__month-text","react-datepicker__month-".concat(e),c,{"react-datepicker__month-text--disabled":n.isMonthDisabled(e),"react-datepicker__month-text--selected":p?n.isSelectMonthInList(a,e,p):void 0,"react-datepicker__month-text--keyboard-selected":!n.props.disabledKeyboardNavigation&&i&&n.isSelectedMonth(a,e,i)&&!n.isMonthDisabled(e),"react-datepicker__month-text--in-selecting-range":n.isInSelectingRangeMonth(e),"react-datepicker__month-text--in-range":o&&s?ze(o,s,e,a):void 0,"react-datepicker__month-text--range-start":n.isRangeStartMonth(e),"react-datepicker__month-text--range-end":n.isRangeEndMonth(e),"react-datepicker__month-text--selecting-range-start":n.isSelectingMonthRangeStart(e),"react-datepicker__month-text--selecting-range-end":n.isSelectingMonthRangeEnd(e),"react-datepicker__month-text--today":n.isCurrentMonth(a,e)})},n.getTabIndex=function(e){if(null==n.props.preSelection)return"-1";var t=_.getMonth(n.props.preSelection);return n.props.disabledKeyboardNavigation||e!==t?"-1":"0"},n.getQuarterTabIndex=function(e){if(null==n.props.preSelection)return"-1";var t=E.getQuarter(n.props.preSelection);return n.props.disabledKeyboardNavigation||e!==t?"-1":"0"},n.getAriaLabel=function(e){var t=n.props,r=t.chooseDayAriaLabelPrefix,a=void 0===r?"Choose":r,o=t.disabledDayAriaLabelPrefix,s=void 0===o?"Not available":o,i=t.day,l=t.locale,c=$.setMonth(i,e),p=n.isDisabled(c)||n.isExcluded(c)?s:a;return"".concat(p," ").concat(_e(c,"MMMM yyyy",l))},n.getQuarterClassNames=function(e){var r=n.props,a=r.day,o=r.startDate,s=r.endDate,i=r.selected,l=r.minDate,c=r.maxDate,p=r.excludeDates,d=r.includeDates,u=r.filterDate,f=r.preSelection,h=r.disabledKeyboardNavigation,m=(l||c||p||d||u)&&Ge(z.setQuarter(a,e),n.props);return t.clsx("react-datepicker__quarter-text","react-datepicker__quarter-".concat(e),{"react-datepicker__quarter-text--disabled":m,"react-datepicker__quarter-text--selected":i?n.isSelectedQuarter(a,e,i):void 0,"react-datepicker__quarter-text--keyboard-selected":!h&&f&&n.isSelectedQuarter(a,e,f)&&!m,"react-datepicker__quarter-text--in-selecting-range":n.isInSelectingRangeQuarter(e),"react-datepicker__quarter-text--in-range":o&&s?et(o,s,e,a):void 0,"react-datepicker__quarter-text--range-start":n.isRangeStartQuarter(e),"react-datepicker__quarter-text--range-end":n.isRangeEndQuarter(e)})},n.getMonthContent=function(e){var t=n.props,r=t.showFullMonthYearPicker,a=t.renderMonthContent,o=t.locale,s=t.day,i=Ve(e,o),l=Be(e,o);return a?a(e,i,l,s):r?l:i},n.getQuarterContent=function(e){var t,r=n.props,a=r.renderQuarterContent,o=function(e,t){return _e(z.setQuarter(Me(),e),"QQQ",t)}(e,r.locale);return null!==(t=null==a?void 0:a(e,o))&&void 0!==t?t:o},n.renderMonths=function(){var e,t=n.props,r=t.showTwoColumnMonthYearPicker,a=t.showFourColumnMonthYearPicker,o=t.day,s=t.selected,i=null===(e=Pt[Yt(a,r)])||void 0===e?void 0:e.grid;return null==i?void 0:i.map((function(e,t){return ue.default.createElement("div",{className:"react-datepicker__month-wrapper",key:t},e.map((function(e,t){return ue.default.createElement("div",{ref:n.MONTH_REFS[e],key:t,onClick:function(t){n.onMonthClick(t,e)},onKeyDown:function(t){yt(t)&&(t.preventDefault(),t.key=ye.Enter),n.onMonthKeyDown(t,e)},onMouseEnter:n.props.usePointerEvent?void 0:function(){return n.onMonthMouseEnter(e)},onPointerEnter:n.props.usePointerEvent?function(){return n.onMonthMouseEnter(e)}:void 0,tabIndex:Number(n.getTabIndex(e)),className:n.getMonthClassNames(e),"aria-disabled":n.isMonthDisabled(e),role:"option","aria-label":n.getAriaLabel(e),"aria-current":n.isCurrentMonth(o,e)?"date":void 0,"aria-selected":s?n.isSelectedMonth(o,e,s):void 0},n.getMonthContent(e))})))}))},n.renderQuarters=function(){var e=n.props,t=e.day,r=e.selected;return ue.default.createElement("div",{className:"react-datepicker__quarter-wrapper"},[1,2,3,4].map((function(e,a){return ue.default.createElement("div",{key:a,ref:n.QUARTER_REFS[a],role:"option",onClick:function(t){n.onQuarterClick(t,e)},onKeyDown:function(t){n.onQuarterKeyDown(t,e)},onMouseEnter:n.props.usePointerEvent?void 0:function(){return n.onQuarterMouseEnter(e)},onPointerEnter:n.props.usePointerEvent?function(){return n.onQuarterMouseEnter(e)}:void 0,className:n.getQuarterClassNames(e),"aria-selected":r?n.isSelectedQuarter(t,e,r):void 0,tabIndex:Number(n.getQuarterTabIndex(e)),"aria-current":n.isCurrentQuarter(t,e)?"date":void 0},n.getQuarterContent(e))})))},n.getClassNames=function(){var e=n.props,r=e.selectingDate,a=e.selectsStart,o=e.selectsEnd,s=e.showMonthYearPicker,i=e.showQuarterYearPicker,l=e.showWeekPicker;return t.clsx("react-datepicker__month",{"react-datepicker__month--selecting-range":r&&(a||o)},{"react-datepicker__monthPicker":s},{"react-datepicker__quarterPicker":i},{"react-datepicker__weekPicker":l})},n}return ve(n,e),n.prototype.getSelection=function(){var e=this.props,t=e.selected,r=e.selectedDates;return e.selectsMultiple?r:t?[t]:void 0},n.prototype.render=function(){var e=this.props,t=e.showMonthYearPicker,r=e.showQuarterYearPicker,n=e.day,a=e.ariaLabelPrefix,o=void 0===a?"Month ":a,s=o?o.trim()+" ":"";return ue.default.createElement("div",{className:this.getClassNames(),onMouseLeave:this.props.usePointerEvent?void 0:this.handleMouseLeave,onPointerLeave:this.props.usePointerEvent?this.handleMouseLeave:void 0,"aria-label":"".concat(s).concat(_e(n,"MMMM, yyyy",this.props.locale)),role:"listbox"},t?this.renderMonths():r?this.renderQuarters():this.renderWeeks())},n}(r.Component),Nt=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.isSelectedMonth=function(e){return t.props.month===e},t.renderOptions=function(){return t.props.monthNames.map((function(e,r){return ue.default.createElement("div",{className:t.isSelectedMonth(r)?"react-datepicker__month-option react-datepicker__month-option--selected_month":"react-datepicker__month-option",key:e,onClick:t.onChange.bind(t,r),"aria-selected":t.isSelectedMonth(r)?"true":void 0},t.isSelectedMonth(r)?ue.default.createElement("span",{className:"react-datepicker__month-option--selected"},"✓"):"",e)}))},t.onChange=function(e){return t.props.onChange(e)},t.handleClickOutside=function(){return t.props.onCancel()},t}return ve(t,e),t.prototype.render=function(){return ue.default.createElement("div",{className:"react-datepicker__month-dropdown"},this.renderOptions())},t}(r.Component),Ot=fe.default(Nt),It=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={dropdownVisible:!1},t.renderSelectOptions=function(e){return e.map((function(e,t){return ue.default.createElement("option",{key:e,value:t},e)}))},t.renderSelectMode=function(e){return ue.default.createElement("select",{value:t.props.month,className:"react-datepicker__month-select",onChange:function(e){return t.onChange(parseInt(e.target.value))}},t.renderSelectOptions(e))},t.renderReadView=function(e,r){return ue.default.createElement("div",{key:"read",style:{visibility:e?"visible":"hidden"},className:"react-datepicker__month-read-view",onClick:t.toggleDropdown},ue.default.createElement("span",{className:"react-datepicker__month-read-view--down-arrow"}),ue.default.createElement("span",{className:"react-datepicker__month-read-view--selected-month"},r[t.props.month]))},t.renderDropdown=function(e){return ue.default.createElement(Ot,ge({key:"dropdown"},t.props,{monthNames:e,onChange:t.onChange,onCancel:t.toggleDropdown}))},t.renderScrollMode=function(e){var r=t.state.dropdownVisible,n=[t.renderReadView(!r,e)];return r&&n.unshift(t.renderDropdown(e)),n},t.onChange=function(e){t.toggleDropdown(),e!==t.props.month&&t.props.onChange(e)},t.toggleDropdown=function(){return t.setState({dropdownVisible:!t.state.dropdownVisible})},t}return ve(t,e),t.prototype.render=function(){var e,t=this,r=[0,1,2,3,4,5,6,7,8,9,10,11].map(this.props.useShortMonthInDropdown?function(e){return Ve(e,t.props.locale)}:function(e){return Be(e,t.props.locale)});switch(this.props.dropdownMode){case"scroll":e=this.renderScrollMode(r);break;case"select":e=this.renderSelectMode(r)}return ue.default.createElement("div",{className:"react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode)},e)},t}(r.Component);function Tt(e,t){for(var r=[],n=Ne(e),a=Ne(t);!N.isAfter(n,a);)r.push(Me(n)),n=i.addMonths(n,1);return r}var Rt=function(e){function r(t){var r=e.call(this,t)||this;return r.renderOptions=function(){return r.state.monthYearsList.map((function(e){var t=Y.getTime(e),n=Le(r.props.date,e)&&Ae(r.props.date,e);return ue.default.createElement("div",{className:n?"react-datepicker__month-year-option--selected_month-year":"react-datepicker__month-year-option",key:t,onClick:r.onChange.bind(r,t),"aria-selected":n?"true":void 0},n?ue.default.createElement("span",{className:"react-datepicker__month-year-option--selected"},"✓"):"",_e(e,r.props.dateFormat,r.props.locale))}))},r.onChange=function(e){return r.props.onChange(e)},r.handleClickOutside=function(){r.props.onCancel()},r.state={monthYearsList:Tt(r.props.minDate,r.props.maxDate)},r}return ve(r,e),r.prototype.render=function(){var e=t.clsx({"react-datepicker__month-year-dropdown":!0,"react-datepicker__month-year-dropdown--scrollable":this.props.scrollableMonthYearDropdown});return ue.default.createElement("div",{className:e},this.renderOptions())},r}(r.Component),Lt=fe.default(Rt),At=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={dropdownVisible:!1},t.renderSelectOptions=function(){for(var e=Ne(t.props.minDate),r=Ne(t.props.maxDate),n=[];!N.isAfter(e,r);){var a=Y.getTime(e);n.push(ue.default.createElement("option",{key:a,value:a},_e(e,t.props.dateFormat,t.props.locale))),e=i.addMonths(e,1)}return n},t.onSelectChange=function(e){t.onChange(parseInt(e.target.value))},t.renderSelectMode=function(){return ue.default.createElement("select",{value:Y.getTime(Ne(t.props.date)),className:"react-datepicker__month-year-select",onChange:t.onSelectChange},t.renderSelectOptions())},t.renderReadView=function(e){var r=_e(t.props.date,t.props.dateFormat,t.props.locale);return ue.default.createElement("div",{key:"read",style:{visibility:e?"visible":"hidden"},className:"react-datepicker__month-year-read-view",onClick:t.toggleDropdown},ue.default.createElement("span",{className:"react-datepicker__month-year-read-view--down-arrow"}),ue.default.createElement("span",{className:"react-datepicker__month-year-read-view--selected-month-year"},r))},t.renderDropdown=function(){return ue.default.createElement(Lt,ge({key:"dropdown"},t.props,{onChange:t.onChange,onCancel:t.toggleDropdown}))},t.renderScrollMode=function(){var e=t.state.dropdownVisible,r=[t.renderReadView(!e)];return e&&r.unshift(t.renderDropdown()),r},t.onChange=function(e){t.toggleDropdown();var r=Me(e);Le(t.props.date,r)&&Ae(t.props.date,r)||t.props.onChange(r)},t.toggleDropdown=function(){return t.setState({dropdownVisible:!t.state.dropdownVisible})},t}return ve(t,e),t.prototype.render=function(){var e;switch(this.props.dropdownMode){case"scroll":e=this.renderScrollMode();break;case"select":e=this.renderSelectMode()}return ue.default.createElement("div",{className:"react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode)},e)},t}(r.Component),Ft=function(e){function t(){var r=null!==e&&e.apply(this,arguments)||this;return r.state={height:null},r.scrollToTheSelectedTime=function(){requestAnimationFrame((function(){var e,n,a;r.list&&(r.list.scrollTop=null!==(a=r.centerLi&&t.calcCenterPosition(r.props.monthRef?r.props.monthRef.clientHeight-(null!==(n=null===(e=r.header)||void 0===e?void 0:e.clientHeight)&&void 0!==n?n:0):r.list.clientHeight,r.centerLi))&&void 0!==a?a:0)}))},r.handleClick=function(e){var t,n;(r.props.minTime||r.props.maxTime)&&at(e,r.props)||(r.props.excludeTimes||r.props.includeTimes||r.props.filterTime)&&nt(e,r.props)||null===(n=(t=r.props).onChange)||void 0===n||n.call(t,e)},r.isSelectedTime=function(e){return r.props.selected&&(t=r.props.selected,n=e,vt(t).getTime()===vt(n).getTime());var t,n},r.isDisabledTime=function(e){return(r.props.minTime||r.props.maxTime)&&at(e,r.props)||(r.props.excludeTimes||r.props.includeTimes||r.props.filterTime)&&nt(e,r.props)},r.liClasses=function(e){var n,a=["react-datepicker__time-list-item",r.props.timeClassName?r.props.timeClassName(e):void 0];return r.isSelectedTime(e)&&a.push("react-datepicker__time-list-item--selected"),r.isDisabledTime(e)&&a.push("react-datepicker__time-list-item--disabled"),r.props.injectTimes&&(3600*b.getHours(e)+60*C.getMinutes(e)+P.getSeconds(e))%(60*(null!==(n=r.props.intervals)&&void 0!==n?n:t.defaultProps.intervals))!=0&&a.push("react-datepicker__time-list-item--injected"),a.join(" ")},r.handleOnKeyDown=function(e,t){var n,a;e.key===ye.Space&&(e.preventDefault(),e.key=ye.Enter),(e.key===ye.ArrowUp||e.key===ye.ArrowLeft)&&e.target instanceof HTMLElement&&e.target.previousSibling&&(e.preventDefault(),e.target.previousSibling instanceof HTMLElement&&e.target.previousSibling.focus()),(e.key===ye.ArrowDown||e.key===ye.ArrowRight)&&e.target instanceof HTMLElement&&e.target.nextSibling&&(e.preventDefault(),e.target.nextSibling instanceof HTMLElement&&e.target.nextSibling.focus()),e.key===ye.Enter&&r.handleClick(t),null===(a=(n=r.props).handleOnKeyDown)||void 0===a||a.call(n,e)},r.renderTimes=function(){for(var e,n=[],a=r.props.format?r.props.format:"p",o=null!==(e=r.props.intervals)&&void 0!==e?e:t.defaultProps.intervals,i=r.props.selected||r.props.openToDate||Me(),l=Ye(i),c=r.props.injectTimes&&r.props.injectTimes.sort((function(e,t){return e.getTime()-t.getTime()})),p=60*function(e){var t=new Date(e.getFullYear(),e.getMonth(),e.getDate()),r=new Date(e.getFullYear(),e.getMonth(),e.getDate(),24);return Math.round((+r-+t)/36e5)}(i),d=p/o,u=0;u<d;u++){var f=s.addMinutes(l,u*o);if(n.push(f),c){var h=ft(l,f,u,o,c);n=n.concat(h)}}var m=n.reduce((function(e,t){return t.getTime()<=i.getTime()?t:e}),n[0]);return n.map((function(e){return ue.default.createElement("li",{key:e.valueOf(),onClick:r.handleClick.bind(r,e),className:r.liClasses(e),ref:function(t){e===m&&(r.centerLi=t)},onKeyDown:function(t){r.handleOnKeyDown(t,e)},tabIndex:e===m?0:-1,role:"option","aria-selected":r.isSelectedTime(e)?"true":void 0,"aria-disabled":r.isDisabledTime(e)?"true":void 0},_e(e,a,r.props.locale))}))},r}return ve(t,e),Object.defineProperty(t,"defaultProps",{get:function(){return{intervals:30,todayButton:null,timeCaption:"Time"}},enumerable:!1,configurable:!0}),t.prototype.componentDidMount=function(){this.scrollToTheSelectedTime(),this.props.monthRef&&this.header&&this.setState({height:this.props.monthRef.clientHeight-this.header.clientHeight})},t.prototype.render=function(){var e,r=this,n=this.state.height;return ue.default.createElement("div",{className:"react-datepicker__time-container ".concat((null!==(e=this.props.todayButton)&&void 0!==e?e:t.defaultProps.todayButton)?"react-datepicker__time-container--with-today-button":"")},ue.default.createElement("div",{className:"react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly?"react-datepicker__header--time--only":""),ref:function(e){r.header=e}},ue.default.createElement("div",{className:"react-datepicker-time__header"},this.props.timeCaption)),ue.default.createElement("div",{className:"react-datepicker__time"},ue.default.createElement("div",{className:"react-datepicker__time-box"},ue.default.createElement("ul",{className:"react-datepicker__time-list",ref:function(e){r.list=e},style:n?{height:n}:{},role:"listbox","aria-label":this.props.timeCaption},this.renderTimes()))))},t.calcCenterPosition=function(e,t){return t.offsetTop-(e/2-t.clientHeight/2)},t}(r.Component),Ht=function(e){function n(n){var a=e.call(this,n)||this;return a.YEAR_REFS=De([],Array(a.props.yearItemNumber),!0).map((function(){return r.createRef()})),a.isDisabled=function(e){return je(e,{minDate:a.props.minDate,maxDate:a.props.maxDate,excludeDates:a.props.excludeDates,includeDates:a.props.includeDates,filterDate:a.props.filterDate})},a.isExcluded=function(e){return Ue(e,{excludeDates:a.props.excludeDates})},a.selectingDate=function(){var e;return null!==(e=a.props.selectingDate)&&void 0!==e?e:a.props.preSelection},a.updateFocusOnPaginate=function(e){window.requestAnimationFrame((function(){var t,r;null===(r=null===(t=a.YEAR_REFS[e])||void 0===t?void 0:t.current)||void 0===r||r.focus()}))},a.handleYearClick=function(e,t){a.props.onDayClick&&a.props.onDayClick(e,t)},a.handleYearNavigation=function(e,t){var r,n,o,s,i=a.props,l=i.date,c=i.yearItemNumber;if(void 0!==l&&void 0!==c){var p=mt(l,c).startPeriod;a.isDisabled(t)||a.isExcluded(t)||(null===(n=(r=a.props).setPreSelection)||void 0===n||n.call(r,t),e-p<0?a.updateFocusOnPaginate(c-(p-e)):e-p>=c?a.updateFocusOnPaginate(Math.abs(c-(e-p))):null===(s=null===(o=a.YEAR_REFS[e-p])||void 0===o?void 0:o.current)||void 0===s||s.focus())}},a.isSameDay=function(e,t){return He(e,t)},a.isCurrentYear=function(e){return e===x.getYear(Me())},a.isRangeStart=function(e){return a.props.startDate&&a.props.endDate&&Le(G.setYear(Me(),e),a.props.startDate)},a.isRangeEnd=function(e){return a.props.startDate&&a.props.endDate&&Le(G.setYear(Me(),e),a.props.endDate)},a.isInRange=function(e){return Je(e,a.props.startDate,a.props.endDate)},a.isInSelectingRange=function(e){var t=a.props,r=t.selectsStart,n=t.selectsEnd,o=t.selectsRange,s=t.startDate,i=t.endDate;return!(!(r||n||o)||!a.selectingDate())&&(r&&i?Je(e,a.selectingDate(),i):(n&&s||!(!o||!s||i))&&Je(e,s,a.selectingDate()))},a.isSelectingRangeStart=function(e){var t;if(!a.isInSelectingRange(e))return!1;var r=a.props,n=r.startDate,o=r.selectsStart,s=G.setYear(Me(),e);return Le(s,o?null!==(t=a.selectingDate())&&void 0!==t?t:null:null!=n?n:null)},a.isSelectingRangeEnd=function(e){var t;if(!a.isInSelectingRange(e))return!1;var r=a.props,n=r.endDate,o=r.selectsEnd,s=r.selectsRange,i=G.setYear(Me(),e);return Le(i,o||s?null!==(t=a.selectingDate())&&void 0!==t?t:null:null!=n?n:null)},a.isKeyboardSelected=function(e){if(void 0!==a.props.date&&null!=a.props.selected&&null!=a.props.preSelection){var t=a.props,r=t.minDate,n=t.maxDate,o=t.excludeDates,s=t.includeDates,i=t.filterDate,l=Oe(G.setYear(a.props.date,e)),c=(r||n||o||s||i)&&Ze(e,a.props);return!a.props.disabledKeyboardNavigation&&!a.props.inline&&!He(l,Oe(a.props.selected))&&He(l,Oe(a.props.preSelection))&&!c}},a.onYearClick=function(e,t){var r=a.props.date;void 0!==r&&a.handleYearClick(Oe(G.setYear(r,t)),e)},a.onYearKeyDown=function(e,t){var r,n,o=e.key,s=a.props,i=s.date,l=s.yearItemNumber,c=s.handleOnKeyDown;if(o!==ye.Tab&&e.preventDefault(),!a.props.disabledKeyboardNavigation)switch(o){case ye.Enter:if(null==a.props.selected)break;a.onYearClick(e,t),null===(n=(r=a.props).setPreSelection)||void 0===n||n.call(r,a.props.selected);break;case ye.ArrowRight:if(null==a.props.preSelection)break;a.handleYearNavigation(t+1,d.addYears(a.props.preSelection,1));break;case ye.ArrowLeft:if(null==a.props.preSelection)break;a.handleYearNavigation(t-1,ie.subYears(a.props.preSelection,1));break;case ye.ArrowUp:if(void 0===i||void 0===l||null==a.props.preSelection)break;var p=mt(i,l).startPeriod;if((h=t-(f=3))<p){var u=l%f;t>=p&&t<p+u?f=u:f+=u,h=t-f}a.handleYearNavigation(h,ie.subYears(a.props.preSelection,f));break;case ye.ArrowDown:if(void 0===i||void 0===l||null==a.props.preSelection)break;var f,h,m=mt(i,l).endPeriod;if((h=t+(f=3))>m){u=l%f;t<=m&&t>m-u?f=u:f+=u,h=t+f}a.handleYearNavigation(h,d.addYears(a.props.preSelection,f))}c&&c(e)},a.getYearClassNames=function(e){var r=a.props,n=r.date,o=r.minDate,s=r.maxDate,i=r.selected,l=r.excludeDates,c=r.includeDates,p=r.filterDate,d=r.yearClassName;return t.clsx("react-datepicker__year-text","react-datepicker__year-".concat(e),n?null==d?void 0:d(G.setYear(n,e)):void 0,{"react-datepicker__year-text--selected":i?e===x.getYear(i):void 0,"react-datepicker__year-text--disabled":(o||s||l||c||p)&&Ze(e,a.props),"react-datepicker__year-text--keyboard-selected":a.isKeyboardSelected(e),"react-datepicker__year-text--range-start":a.isRangeStart(e),"react-datepicker__year-text--range-end":a.isRangeEnd(e),"react-datepicker__year-text--in-range":a.isInRange(e),"react-datepicker__year-text--in-selecting-range":a.isInSelectingRange(e),"react-datepicker__year-text--selecting-range-start":a.isSelectingRangeStart(e),"react-datepicker__year-text--selecting-range-end":a.isSelectingRangeEnd(e),"react-datepicker__year-text--today":a.isCurrentYear(e)})},a.getYearTabIndex=function(e){return a.props.disabledKeyboardNavigation||null==a.props.preSelection?"-1":e===x.getYear(a.props.preSelection)?"0":"-1"},a.getYearContainerClassNames=function(){var e=a.props,r=e.selectingDate,n=e.selectsStart,o=e.selectsEnd,s=e.selectsRange;return t.clsx("react-datepicker__year",{"react-datepicker__year--selecting-range":r&&(n||o||s)})},a.getYearContent=function(e){return a.props.renderYearContent?a.props.renderYearContent(e):e},a}return ve(n,e),n.prototype.render=function(){var e=this,t=[],r=this.props,n=r.date,a=r.yearItemNumber,o=r.onYearMouseEnter,s=r.onYearMouseLeave;if(void 0===n)return null;for(var i=mt(n,a),l=i.startPeriod,c=i.endPeriod,p=function(r){t.push(ue.default.createElement("div",{ref:d.YEAR_REFS[r-l],onClick:function(t){e.onYearClick(t,r)},onKeyDown:function(t){yt(t)&&(t.preventDefault(),t.key=ye.Enter),e.onYearKeyDown(t,r)},tabIndex:Number(d.getYearTabIndex(r)),className:d.getYearClassNames(r),onMouseEnter:d.props.usePointerEvent?void 0:function(e){return o(e,r)},onPointerEnter:d.props.usePointerEvent?function(e){return o(e,r)}:void 0,onMouseLeave:d.props.usePointerEvent?void 0:function(e){return s(e,r)},onPointerLeave:d.props.usePointerEvent?function(e){return s(e,r)}:void 0,key:r,"aria-current":d.isCurrentYear(r)?"date":void 0},d.getYearContent(r)))},d=this,u=l;u<=c;u++)p(u);return ue.default.createElement("div",{className:this.getYearContainerClassNames()},ue.default.createElement("div",{className:"react-datepicker__year-wrapper",onMouseLeave:this.props.usePointerEvent?void 0:this.props.clearSelectingDate,onPointerLeave:this.props.usePointerEvent?this.props.clearSelectingDate:void 0},t))},n}(r.Component);function Wt(e,t,r,n){for(var a=[],o=0;o<2*t+1;o++){var s=e+t-o,i=!0;r&&(i=x.getYear(r)<=s),n&&i&&(i=x.getYear(n)>=s),i&&a.push(s)}return a}var Qt=function(e){function n(t){var n=e.call(this,t)||this;n.renderOptions=function(){var e=n.props.year,t=n.state.yearsList.map((function(t){return ue.default.createElement("div",{className:e===t?"react-datepicker__year-option react-datepicker__year-option--selected_year":"react-datepicker__year-option",key:t,onClick:n.onChange.bind(n,t),"aria-selected":e===t?"true":void 0},e===t?ue.default.createElement("span",{className:"react-datepicker__year-option--selected"},"✓"):"",t)})),r=n.props.minDate?x.getYear(n.props.minDate):null,a=n.props.maxDate?x.getYear(n.props.maxDate):null;return a&&n.state.yearsList.find((function(e){return e===a}))||t.unshift(ue.default.createElement("div",{className:"react-datepicker__year-option",key:"upcoming",onClick:n.incrementYears},ue.default.createElement("a",{className:"react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"}))),r&&n.state.yearsList.find((function(e){return e===r}))||t.push(ue.default.createElement("div",{className:"react-datepicker__year-option",key:"previous",onClick:n.decrementYears},ue.default.createElement("a",{className:"react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"}))),t},n.onChange=function(e){n.props.onChange(e)},n.handleClickOutside=function(){n.props.onCancel()},n.shiftYears=function(e){var t=n.state.yearsList.map((function(t){return t+e}));n.setState({yearsList:t})},n.incrementYears=function(){return n.shiftYears(1)},n.decrementYears=function(){return n.shiftYears(-1)};var a=t.yearDropdownItemNumber,o=t.scrollableYearDropdown,s=a||(o?10:5);return n.state={yearsList:Wt(n.props.year,s,n.props.minDate,n.props.maxDate)},n.dropdownRef=r.createRef(),n}return ve(n,e),n.prototype.componentDidMount=function(){var e=this.dropdownRef.current;if(e){var t=e.children?Array.from(e.children):null,r=t?t.find((function(e){return e.ariaSelected})):null;e.scrollTop=r&&r instanceof HTMLElement?r.offsetTop+(r.clientHeight-e.clientHeight)/2:(e.scrollHeight-e.clientHeight)/2}},n.prototype.render=function(){var e=t.clsx({"react-datepicker__year-dropdown":!0,"react-datepicker__year-dropdown--scrollable":this.props.scrollableYearDropdown});return ue.default.createElement("div",{className:e,ref:this.dropdownRef},this.renderOptions())},n}(r.Component),qt=fe.default(Qt),Kt=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={dropdownVisible:!1},t.renderSelectOptions=function(){for(var e=t.props.minDate?x.getYear(t.props.minDate):1900,r=t.props.maxDate?x.getYear(t.props.maxDate):2100,n=[],a=e;a<=r;a++)n.push(ue.default.createElement("option",{key:a,value:a},a));return n},t.onSelectChange=function(e){t.onChange(parseInt(e.target.value))},t.renderSelectMode=function(){return ue.default.createElement("select",{value:t.props.year,className:"react-datepicker__year-select",onChange:t.onSelectChange},t.renderSelectOptions())},t.renderReadView=function(e){return ue.default.createElement("div",{key:"read",style:{visibility:e?"visible":"hidden"},className:"react-datepicker__year-read-view",onClick:function(e){return t.toggleDropdown(e)}},ue.default.createElement("span",{className:"react-datepicker__year-read-view--down-arrow"}),ue.default.createElement("span",{className:"react-datepicker__year-read-view--selected-year"},t.props.year))},t.renderDropdown=function(){return ue.default.createElement(qt,ge({key:"dropdown"},t.props,{onChange:t.onChange,onCancel:t.toggleDropdown}))},t.renderScrollMode=function(){var e=t.state.dropdownVisible,r=[t.renderReadView(!e)];return e&&r.unshift(t.renderDropdown()),r},t.onChange=function(e){t.toggleDropdown(),e!==t.props.year&&t.props.onChange(e)},t.toggleDropdown=function(e){t.setState({dropdownVisible:!t.state.dropdownVisible},(function(){t.props.adjustDateOnChange&&t.handleYearChange(t.props.date,e)}))},t.handleYearChange=function(e,r){t.onSelect(e,r),t.setOpen()},t.onSelect=function(e,r){t.props.onSelect&&t.props.onSelect(e,r)},t.setOpen=function(){t.props.setOpen&&t.props.setOpen(!0)},t}return ve(t,e),t.prototype.render=function(){var e;switch(this.props.dropdownMode){case"scroll":e=this.renderScrollMode();break;case"select":e=this.renderSelectMode()}return ue.default.createElement("div",{className:"react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode)},e)},t}(r.Component),Bt=["react-datepicker__year-select","react-datepicker__month-select","react-datepicker__month-year-select"],Vt=function(e){function n(o){var s=e.call(this,o)||this;return s.monthContainer=void 0,s.handleClickOutside=function(e){s.props.onClickOutside(e)},s.setClickOutsideRef=function(){return s.containerRef.current},s.handleDropdownFocus=function(e){var t,r,n,a;n=e.target,a=(n.className||"").split(/\s+/),Bt.some((function(e){return a.indexOf(e)>=0}))&&(null===(r=(t=s.props).onDropdownFocus)||void 0===r||r.call(t,e))},s.getDateInView=function(){var e=s.props,t=e.preSelection,r=e.selected,n=e.openToDate,a=ct(s.props),o=pt(s.props),i=Me(),l=n||r||t;return l||(a&&O.isBefore(i,a)?a:o&&N.isAfter(i,o)?o:i)},s.increaseMonth=function(){s.setState((function(e){var t=e.date;return{date:i.addMonths(t,1)}}),(function(){return s.handleMonthChange(s.state.date)}))},s.decreaseMonth=function(){s.setState((function(e){var t=e.date;return{date:ae.subMonths(t,1)}}),(function(){return s.handleMonthChange(s.state.date)}))},s.handleDayClick=function(e,t,r){s.props.onSelect(e,t,r),s.props.setPreSelection&&s.props.setPreSelection(e)},s.handleDayMouseEnter=function(e){s.setState({selectingDate:e}),s.props.onDayMouseEnter&&s.props.onDayMouseEnter(e)},s.handleMonthMouseLeave=function(){s.setState({selectingDate:void 0}),s.props.onMonthMouseLeave&&s.props.onMonthMouseLeave()},s.handleYearMouseEnter=function(e,t){s.setState({selectingDate:G.setYear(Me(),t)}),s.props.onYearMouseEnter&&s.props.onYearMouseEnter(e,t)},s.handleYearMouseLeave=function(e,t){s.props.onYearMouseLeave&&s.props.onYearMouseLeave(e,t)},s.handleYearChange=function(e){s.props.onYearChange&&(s.props.onYearChange(e),s.setState({isRenderAriaLiveMessage:!0})),s.props.adjustDateOnChange&&(s.props.onSelect&&s.props.onSelect(e),s.props.setOpen&&s.props.setOpen(!0)),s.props.setPreSelection&&s.props.setPreSelection(e)},s.handleMonthChange=function(e){s.handleCustomMonthChange(e),s.props.adjustDateOnChange&&(s.props.onSelect&&s.props.onSelect(e),s.props.setOpen&&s.props.setOpen(!0)),s.props.setPreSelection&&s.props.setPreSelection(e)},s.handleCustomMonthChange=function(e){s.props.onMonthChange&&(s.props.onMonthChange(e),s.setState({isRenderAriaLiveMessage:!0}))},s.handleMonthYearChange=function(e){s.handleYearChange(e),s.handleMonthChange(e)},s.changeYear=function(e){s.setState((function(t){var r=t.date;return{date:G.setYear(r,Number(e))}}),(function(){return s.handleYearChange(s.state.date)}))},s.changeMonth=function(e){s.setState((function(t){var r=t.date;return{date:$.setMonth(r,Number(e))}}),(function(){return s.handleMonthChange(s.state.date)}))},s.changeMonthYear=function(e){s.setState((function(t){var r=t.date;return{date:G.setYear($.setMonth(r,_.getMonth(e)),x.getYear(e))}}),(function(){return s.handleMonthYearChange(s.state.date)}))},s.header=function(e){void 0===e&&(e=s.state.date);var r=xe(e,s.props.locale,s.props.calendarStartDay),n=[];return s.props.showWeekNumbers&&n.push(ue.default.createElement("div",{key:"W",className:"react-datepicker__day-name"},s.props.weekLabel||"#")),n.concat([0,1,2,3,4,5,6].map((function(e){var n=a.addDays(r,e),o=s.formatWeekday(n,s.props.locale),i=s.props.weekDayClassName?s.props.weekDayClassName(n):void 0;return ue.default.createElement("div",{key:e,"aria-label":_e(n,"EEEE",s.props.locale),className:t.clsx("react-datepicker__day-name",i)},o)})))},s.formatWeekday=function(e,t){return s.props.formatWeekDay?function(e,t,r){return t(_e(e,"EEEE",r))}(e,s.props.formatWeekDay,t):s.props.useWeekdaysShort?function(e,t){return _e(e,"EEE",t)}(e,t):function(e,t){return _e(e,"EEEEEE",t)}(e,t)},s.decreaseYear=function(){s.setState((function(e){var t,r=e.date;return{date:ie.subYears(r,s.props.showYearPicker?null!==(t=s.props.yearItemNumber)&&void 0!==t?t:n.defaultProps.yearItemNumber:1)}}),(function(){return s.handleYearChange(s.state.date)}))},s.clearSelectingDate=function(){s.setState({selectingDate:void 0})},s.renderPreviousButton=function(){var e;if(!s.props.renderCustomHeader){var t;switch(!0){case s.props.showMonthYearPicker:t=it(s.state.date,s.props);break;case s.props.showYearPicker:t=function(e,t){var r=void 0===t?{}:t,n=r.minDate,a=r.yearItemNumber,o=void 0===a?Se:a,s=mt(Oe(ie.subYears(e,o)),o).endPeriod,i=n&&x.getYear(n);return i&&i>s||!1}(s.state.date,s.props);break;case s.props.showQuarterYearPicker:t=function(e,t){var r=void 0===t?{}:t,n=r.minDate,a=r.includeDates,o=re.startOfYear(e),s=oe.subQuarters(o,1);return n&&h.differenceInCalendarQuarters(n,s)>0||a&&a.every((function(e){return h.differenceInCalendarQuarters(e,s)>0}))||!1}(s.state.date,s.props);break;default:t=ot(s.state.date,s.props)}if(((null!==(e=s.props.forceShowMonthNavigation)&&void 0!==e?e:n.defaultProps.forceShowMonthNavigation)||s.props.showDisabledMonthNavigation||!t)&&!s.props.showTimeSelectOnly){var r=["react-datepicker__navigation","react-datepicker__navigation--previous"],a=s.decreaseMonth;(s.props.showMonthYearPicker||s.props.showQuarterYearPicker||s.props.showYearPicker)&&(a=s.decreaseYear),t&&s.props.showDisabledMonthNavigation&&(r.push("react-datepicker__navigation--previous--disabled"),a=void 0);var o=s.props.showMonthYearPicker||s.props.showQuarterYearPicker||s.props.showYearPicker,i=s.props,l=i.previousMonthButtonLabel,c=void 0===l?n.defaultProps.previousMonthButtonLabel:l,p=i.previousYearButtonLabel,d=void 0===p?n.defaultProps.previousYearButtonLabel:p,u=s.props,f=u.previousMonthAriaLabel,m=void 0===f?"string"==typeof c?c:"Previous Month":f,v=u.previousYearAriaLabel,g=void 0===v?"string"==typeof d?d:"Previous Year":v;return ue.default.createElement("button",{type:"button",className:r.join(" "),onClick:a,onKeyDown:s.props.handleOnKeyDown,"aria-label":o?g:m},ue.default.createElement("span",{className:["react-datepicker__navigation-icon","react-datepicker__navigation-icon--previous"].join(" ")},o?d:c))}}},s.increaseYear=function(){s.setState((function(e){var t,r=e.date;return{date:d.addYears(r,s.props.showYearPicker?null!==(t=s.props.yearItemNumber)&&void 0!==t?t:n.defaultProps.yearItemNumber:1)}}),(function(){return s.handleYearChange(s.state.date)}))},s.renderNextButton=function(){var e;if(!s.props.renderCustomHeader){var t;switch(!0){case s.props.showMonthYearPicker:t=lt(s.state.date,s.props);break;case s.props.showYearPicker:t=function(e,t){var r=void 0===t?{}:t,n=r.maxDate,a=r.yearItemNumber,o=void 0===a?Se:a,s=mt(d.addYears(e,o),o).startPeriod,i=n&&x.getYear(n);return i&&i<s||!1}(s.state.date,s.props);break;case s.props.showQuarterYearPicker:t=function(e,t){var r=void 0===t?{}:t,n=r.maxDate,a=r.includeDates,o=y.endOfYear(e),s=l.addQuarters(o,1);return n&&h.differenceInCalendarQuarters(s,n)>0||a&&a.every((function(e){return h.differenceInCalendarQuarters(s,e)>0}))||!1}(s.state.date,s.props);break;default:t=st(s.state.date,s.props)}if(((null!==(e=s.props.forceShowMonthNavigation)&&void 0!==e?e:n.defaultProps.forceShowMonthNavigation)||s.props.showDisabledMonthNavigation||!t)&&!s.props.showTimeSelectOnly){var r=["react-datepicker__navigation","react-datepicker__navigation--next"];s.props.showTimeSelect&&r.push("react-datepicker__navigation--next--with-time"),s.props.todayButton&&r.push("react-datepicker__navigation--next--with-today-button");var a=s.increaseMonth;(s.props.showMonthYearPicker||s.props.showQuarterYearPicker||s.props.showYearPicker)&&(a=s.increaseYear),t&&s.props.showDisabledMonthNavigation&&(r.push("react-datepicker__navigation--next--disabled"),a=void 0);var o=s.props.showMonthYearPicker||s.props.showQuarterYearPicker||s.props.showYearPicker,i=s.props,c=i.nextMonthButtonLabel,p=void 0===c?n.defaultProps.nextMonthButtonLabel:c,u=i.nextYearButtonLabel,f=void 0===u?n.defaultProps.nextYearButtonLabel:u,m=s.props,v=m.nextMonthAriaLabel,g=void 0===v?"string"==typeof p?p:"Next Month":v,D=m.nextYearAriaLabel,k=void 0===D?"string"==typeof f?f:"Next Year":D;return ue.default.createElement("button",{type:"button",className:r.join(" "),onClick:a,onKeyDown:s.props.handleOnKeyDown,"aria-label":o?k:g},ue.default.createElement("span",{className:["react-datepicker__navigation-icon","react-datepicker__navigation-icon--next"].join(" ")},o?f:p))}}},s.renderCurrentMonth=function(e){void 0===e&&(e=s.state.date);var t=["react-datepicker__current-month"];return s.props.showYearDropdown&&t.push("react-datepicker__current-month--hasYearDropdown"),s.props.showMonthDropdown&&t.push("react-datepicker__current-month--hasMonthDropdown"),s.props.showMonthYearDropdown&&t.push("react-datepicker__current-month--hasMonthYearDropdown"),ue.default.createElement("h2",{className:t.join(" ")},_e(e,s.props.dateFormat,s.props.locale))},s.renderYearDropdown=function(e){if(void 0===e&&(e=!1),s.props.showYearDropdown&&!e)return ue.default.createElement(Kt,ge({},n.defaultProps,s.props,{date:s.state.date,onChange:s.changeYear,year:x.getYear(s.state.date)}))},s.renderMonthDropdown=function(e){if(void 0===e&&(e=!1),s.props.showMonthDropdown&&!e)return ue.default.createElement(It,ge({},n.defaultProps,s.props,{month:_.getMonth(s.state.date),onChange:s.changeMonth}))},s.renderMonthYearDropdown=function(e){if(void 0===e&&(e=!1),s.props.showMonthYearDropdown&&!e)return ue.default.createElement(At,ge({},n.defaultProps,s.props,{date:s.state.date,onChange:s.changeMonthYear}))},s.handleTodayButtonClick=function(e){s.props.onSelect(Te(),e),s.props.setPreSelection&&s.props.setPreSelection(Te())},s.renderTodayButton=function(){if(s.props.todayButton&&!s.props.showTimeSelectOnly)return ue.default.createElement("div",{className:"react-datepicker__today-button",onClick:s.handleTodayButtonClick},s.props.todayButton)},s.renderDefaultHeader=function(e){var t=e.monthDate,r=e.i;return ue.default.createElement("div",{className:"react-datepicker__header ".concat(s.props.showTimeSelect?"react-datepicker__header--has-time-select":"")},s.renderCurrentMonth(t),ue.default.createElement("div",{className:"react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(s.props.dropdownMode),onFocus:s.handleDropdownFocus},s.renderMonthDropdown(0!==r),s.renderMonthYearDropdown(0!==r),s.renderYearDropdown(0!==r)),ue.default.createElement("div",{className:"react-datepicker__day-names"},s.header(t)))},s.renderCustomHeader=function(e){var t,r,n=e.monthDate,a=e.i;if(s.props.showTimeSelect&&!s.state.monthContainer||s.props.showTimeSelectOnly)return null;var o=ot(s.state.date,s.props),i=st(s.state.date,s.props),l=it(s.state.date,s.props),c=lt(s.state.date,s.props),p=!s.props.showMonthYearPicker&&!s.props.showQuarterYearPicker&&!s.props.showYearPicker;return ue.default.createElement("div",{className:"react-datepicker__header react-datepicker__header--custom",onFocus:s.props.onDropdownFocus},null===(r=(t=s.props).renderCustomHeader)||void 0===r?void 0:r.call(t,ge(ge({},s.state),{customHeaderCount:a,monthDate:n,changeMonth:s.changeMonth,changeYear:s.changeYear,decreaseMonth:s.decreaseMonth,increaseMonth:s.increaseMonth,decreaseYear:s.decreaseYear,increaseYear:s.increaseYear,prevMonthButtonDisabled:o,nextMonthButtonDisabled:i,prevYearButtonDisabled:l,nextYearButtonDisabled:c})),p&&ue.default.createElement("div",{className:"react-datepicker__day-names"},s.header(n)))},s.renderYearHeader=function(e){var t=e.monthDate,r=s.props,a=r.showYearPicker,o=r.yearItemNumber,i=mt(t,void 0===o?n.defaultProps.yearItemNumber:o),l=i.startPeriod,c=i.endPeriod;return ue.default.createElement("div",{className:"react-datepicker__header react-datepicker-year-header"},a?"".concat(l," - ").concat(c):x.getYear(t))},s.renderHeader=function(e){var t=e.monthDate,r=e.i,n={monthDate:t,i:void 0===r?0:r};switch(!0){case void 0!==s.props.renderCustomHeader:return s.renderCustomHeader(n);case s.props.showMonthYearPicker||s.props.showQuarterYearPicker||s.props.showYearPicker:return s.renderYearHeader(n);default:return s.renderDefaultHeader(n)}},s.renderMonths=function(){var e,t;if(!s.props.showTimeSelectOnly&&!s.props.showYearPicker){for(var r=[],a=null!==(e=s.props.monthsShown)&&void 0!==e?e:n.defaultProps.monthsShown,o=s.props.showPreviousMonths?a-1:0,l=s.props.showMonthYearPicker||s.props.showQuarterYearPicker?d.addYears(s.state.date,o):ae.subMonths(s.state.date,o),c=null!==(t=s.props.monthSelectedIn)&&void 0!==t?t:o,p=0;p<a;++p){var u=p-c+o,f=s.props.showMonthYearPicker||s.props.showQuarterYearPicker?d.addYears(l,u):i.addMonths(l,u),h="month-".concat(p),m=p<a-1,v=p>0;r.push(ue.default.createElement("div",{key:h,ref:function(e){s.monthContainer=null!=e?e:void 0},className:"react-datepicker__month-container"},s.renderHeader({monthDate:f,i:p}),ue.default.createElement(xt,ge({},n.defaultProps,s.props,{ariaLabelPrefix:s.props.monthAriaLabelPrefix,day:f,onDayClick:s.handleDayClick,handleOnKeyDown:s.props.handleOnDayKeyDown,handleOnMonthKeyDown:s.props.handleOnKeyDown,onDayMouseEnter:s.handleDayMouseEnter,onMouseLeave:s.handleMonthMouseLeave,orderInDisplay:p,selectingDate:s.state.selectingDate,monthShowsDuplicateDaysEnd:m,monthShowsDuplicateDaysStart:v}))))}return r}},s.renderYears=function(){if(!s.props.showTimeSelectOnly)return s.props.showYearPicker?ue.default.createElement("div",{className:"react-datepicker__year--container"},s.renderHeader({monthDate:s.state.date}),ue.default.createElement(Ht,ge({},n.defaultProps,s.props,{selectingDate:s.state.selectingDate,date:s.state.date,onDayClick:s.handleDayClick,clearSelectingDate:s.clearSelectingDate,onYearMouseEnter:s.handleYearMouseEnter,onYearMouseLeave:s.handleYearMouseLeave}))):void 0},s.renderTimeSection=function(){if(s.props.showTimeSelect&&(s.state.monthContainer||s.props.showTimeSelectOnly))return ue.default.createElement(Ft,ge({},n.defaultProps,s.props,{onChange:s.props.onTimeChange,format:s.props.timeFormat,intervals:s.props.timeIntervals,monthRef:s.state.monthContainer}))},s.renderInputTimeSection=function(){var e=s.props.selected?new Date(s.props.selected):void 0,t=e&&Ce(e)&&Boolean(s.props.selected)?"".concat(ht(e.getHours()),":").concat(ht(e.getMinutes())):"";if(s.props.showTimeInput)return ue.default.createElement(wt,ge({},n.defaultProps,s.props,{date:e,timeString:t,onChange:s.props.onTimeChange}))},s.renderAriaLiveRegion=function(){var e,t,r=mt(s.state.date,null!==(e=s.props.yearItemNumber)&&void 0!==e?e:n.defaultProps.yearItemNumber),a=r.startPeriod,o=r.endPeriod;return t=s.props.showYearPicker?"".concat(a," - ").concat(o):s.props.showMonthYearPicker||s.props.showQuarterYearPicker?x.getYear(s.state.date):"".concat(Be(_.getMonth(s.state.date),s.props.locale)," ").concat(x.getYear(s.state.date)),ue.default.createElement("span",{role:"alert","aria-live":"polite",className:"react-datepicker__aria-live"},s.state.isRenderAriaLiveMessage&&t)},s.renderChildren=function(){if(s.props.children)return ue.default.createElement("div",{className:"react-datepicker__children-container"},s.props.children)},s.containerRef=r.createRef(),s.state={date:s.getDateInView(),selectingDate:void 0,monthContainer:void 0,isRenderAriaLiveMessage:!1},s}return ve(n,e),Object.defineProperty(n,"defaultProps",{get:function(){return{monthsShown:1,forceShowMonthNavigation:!1,timeCaption:"Time",previousYearButtonLabel:"Previous Year",nextYearButtonLabel:"Next Year",previousMonthButtonLabel:"Previous Month",nextMonthButtonLabel:"Next Month",yearItemNumber:Se}},enumerable:!1,configurable:!0}),n.prototype.componentDidMount=function(){var e=this;this.props.showTimeSelect&&(this.assignMonthContainer=void e.setState({monthContainer:e.monthContainer}))},n.prototype.componentDidUpdate=function(e){var t=this;if(!this.props.preSelection||He(this.props.preSelection,e.preSelection)&&this.props.monthSelectedIn===e.monthSelectedIn)this.props.openToDate&&!He(this.props.openToDate,e.openToDate)&&this.setState({date:this.props.openToDate});else{var r=!Ae(this.state.date,this.props.preSelection);this.setState({date:this.props.preSelection},(function(){return r&&t.handleCustomMonthChange(t.state.date)}))}},n.prototype.render=function(){var e=this.props.container||ke;return ue.default.createElement("div",{style:{display:"contents"},ref:this.containerRef},ue.default.createElement(e,{className:t.clsx("react-datepicker",this.props.className,{"react-datepicker--time-only":this.props.showTimeSelectOnly}),showTime:this.props.showTimeSelect||this.props.showTimeInput,showTimeSelectOnly:this.props.showTimeSelectOnly},this.renderAriaLiveRegion(),this.renderPreviousButton(),this.renderNextButton(),this.renderMonths(),this.renderYears(),this.renderTodayButton(),this.renderTimeSection(),this.renderInputTimeSection(),this.renderChildren()))},n}(r.Component),jt=function(e){var t=e.icon,r=e.className,n=void 0===r?"":r,a=e.onClick,o="react-datepicker__calendar-icon";return"string"==typeof t?ue.default.createElement("i",{className:"".concat(o," ").concat(t," ").concat(n),"aria-hidden":"true",onClick:a}):ue.default.isValidElement(t)?ue.default.cloneElement(t,{className:"".concat(t.props.className||""," ").concat(o," ").concat(n),onClick:function(e){"function"==typeof t.props.onClick&&t.props.onClick(e),"function"==typeof a&&a(e)}}):ue.default.createElement("svg",{className:"".concat(o," ").concat(n),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",onClick:a},ue.default.createElement("path",{d:"M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"}))},Ut=function(e){function t(t){var r=e.call(this,t)||this;return r.portalRoot=null,r.el=document.createElement("div"),r}return ve(t,e),t.prototype.componentDidMount=function(){this.portalRoot=(this.props.portalHost||document).getElementById(this.props.portalId),this.portalRoot||(this.portalRoot=document.createElement("div"),this.portalRoot.setAttribute("id",this.props.portalId),(this.props.portalHost||document.body).appendChild(this.portalRoot)),this.portalRoot.appendChild(this.el)},t.prototype.componentWillUnmount=function(){this.portalRoot&&this.portalRoot.removeChild(this.el)},t.prototype.render=function(){return he.default.createPortal(this.props.children,this.el)},t}(r.Component),$t=function(e){return(e instanceof HTMLAnchorElement||!e.disabled)&&-1!==e.tabIndex},zt=function(e){function t(t){var n=e.call(this,t)||this;return n.getTabChildren=function(){var e;return Array.prototype.slice.call(null===(e=n.tabLoopRef.current)||void 0===e?void 0:e.querySelectorAll("[tabindex], a, button, input, select, textarea"),1,-1).filter($t)},n.handleFocusStart=function(){var e=n.getTabChildren();e&&e.length>1&&e[e.length-1].focus()},n.handleFocusEnd=function(){var e=n.getTabChildren();e&&e.length>1&&e[0].focus()},n.tabLoopRef=r.createRef(),n}return ve(t,e),t.prototype.render=function(){var e;return(null!==(e=this.props.enableTabLoop)&&void 0!==e?e:t.defaultProps.enableTabLoop)?ue.default.createElement("div",{className:"react-datepicker__tab-loop",ref:this.tabLoopRef},ue.default.createElement("div",{className:"react-datepicker__tab-loop__start",tabIndex:0,onFocus:this.handleFocusStart}),this.props.children,ue.default.createElement("div",{className:"react-datepicker__tab-loop__end",tabIndex:0,onFocus:this.handleFocusEnd})):this.props.children},t.defaultProps={enableTabLoop:!0},t}(r.Component);var Xt,Gt=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return ve(n,e),Object.defineProperty(n,"defaultProps",{get:function(){return{hidePopper:!0}},enumerable:!1,configurable:!0}),n.prototype.render=function(){var e=this.props,a=e.className,o=e.wrapperClassName,s=e.hidePopper,i=void 0===s?n.defaultProps.hidePopper:s,l=e.popperComponent,c=e.targetComponent,p=e.enableTabLoop,d=e.popperOnKeyDown,u=e.portalId,f=e.portalHost,h=e.popperProps,m=e.showArrow,v=void 0;if(!i){var g=t.clsx("react-datepicker-popper",a);v=ue.default.createElement(zt,{enableTabLoop:p},ue.default.createElement("div",{ref:h.refs.setFloating,style:h.floatingStyles,className:g,"data-placement":h.placement,onKeyDown:d},l,m&&ue.default.createElement(ce.FloatingArrow,{ref:h.arrowRef,context:h.context,fill:"currentColor",strokeWidth:1,height:8,width:16,style:{transform:"translateY(-1px)"},className:"react-datepicker__triangle"})))}this.props.popperContainer&&(v=r.createElement(this.props.popperContainer,{},v)),u&&!i&&(v=ue.default.createElement(Ut,{portalId:u,portalHost:f},v));var D=t.clsx("react-datepicker-wrapper",o);return ue.default.createElement(ue.default.Fragment,null,ue.default.createElement("div",{ref:h.refs.setReference,className:D},c),v)},n}(r.Component),Jt=(Xt=Gt,function(e){var t,n="boolean"!=typeof e.hidePopper||e.hidePopper,a=r.useRef(null),o=ce.useFloating(ge({open:!n,whileElementsMounted:ce.autoUpdate,placement:e.popperPlacement,middleware:De([ce.flip({padding:15}),ce.offset(10),ce.arrow({element:a})],null!==(t=e.popperModifiers)&&void 0!==t?t:[],!0)},e.popperProps)),s=ge(ge({},e),{hidePopper:n,popperProps:ge(ge({},o),{arrowRef:a})});return ue.default.createElement(Xt,ge({},s))}),Zt="react-datepicker-ignore-onclickoutside",er=fe.default(Vt);var tr="Date input not valid.",rr=function(e){function n(o){var s=e.call(this,o)||this;return s.calendar=null,s.input=null,s.getPreSelection=function(){return s.props.openToDate?s.props.openToDate:s.props.selectsEnd&&s.props.startDate?s.props.startDate:s.props.selectsStart&&s.props.endDate?s.props.endDate:Me()},s.modifyHolidays=function(){var e;return null===(e=s.props.holidays)||void 0===e?void 0:e.reduce((function(e,t){var r=new Date(t.date);return Ce(r)?De(De([],e,!0),[ge(ge({},t),{date:r})],!1):e}),[])},s.calcInitialState=function(){var e,t=s.getPreSelection(),r=ct(s.props),n=pt(s.props),a=r&&O.isBefore(t,Ye(r))?r:n&&N.isAfter(t,Re(n))?n:t;return{open:s.props.startOpen||!1,preventFocus:!1,inputValue:null,preSelection:null!==(e=s.props.selectsRange?s.props.startDate:s.props.selected)&&void 0!==e?e:a,highlightDates:dt(s.props.highlightDates),focused:!1,shouldFocusDayInline:!1,isRenderAriaLiveMessage:!1,wasHidden:!1}},s.resetHiddenStatus=function(){s.setState(ge(ge({},s.state),{wasHidden:!1}))},s.setHiddenStatus=function(){s.setState(ge(ge({},s.state),{wasHidden:!0}))},s.setHiddenStateOnVisibilityHidden=function(){"hidden"===document.visibilityState&&s.setHiddenStatus()},s.clearPreventFocusTimeout=function(){s.preventFocusTimeout&&clearTimeout(s.preventFocusTimeout)},s.setFocus=function(){s.input&&s.input.focus&&s.input.focus({preventScroll:!0})},s.setBlur=function(){s.input&&s.input.blur&&s.input.blur(),s.cancelFocusInput()},s.setOpen=function(e,t){void 0===t&&(t=!1),s.setState({open:e,preSelection:e&&s.state.open?s.state.preSelection:s.calcInitialState().preSelection,lastPreSelectChange:ar},(function(){e||s.setState((function(e){return{focused:!!t&&e.focused}}),(function(){!t&&s.setBlur(),s.setState({inputValue:null})}))}))},s.inputOk=function(){return I.isDate(s.state.preSelection)},s.isCalendarOpen=function(){return void 0===s.props.open?s.state.open&&!s.props.disabled&&!s.props.readOnly:s.props.open},s.handleFocus=function(e){var t,r,n=s.state.wasHidden,a=!n||s.state.open;n&&s.resetHiddenStatus(),!s.state.preventFocus&&a&&(null===(r=(t=s.props).onFocus)||void 0===r||r.call(t,e),s.props.preventOpenOnFocus||s.props.readOnly||s.setOpen(!0)),s.setState({focused:!0})},s.sendFocusBackToInput=function(){s.preventFocusTimeout&&s.clearPreventFocusTimeout(),s.setState({preventFocus:!0},(function(){s.preventFocusTimeout=setTimeout((function(){s.setFocus(),s.setState({preventFocus:!1})}))}))},s.cancelFocusInput=function(){clearTimeout(s.inputFocusTimeout),s.inputFocusTimeout=void 0},s.deferFocusInput=function(){s.cancelFocusInput(),s.inputFocusTimeout=setTimeout((function(){return s.setFocus()}),1)},s.handleDropdownFocus=function(){s.cancelFocusInput()},s.handleBlur=function(e){var t,r;(!s.state.open||s.props.withPortal||s.props.showTimeInput)&&(null===(r=(t=s.props).onBlur)||void 0===r||r.call(t,e)),s.setState({focused:!1})},s.handleCalendarClickOutside=function(e){var t,r;s.props.inline||s.setOpen(!1),null===(r=(t=s.props).onClickOutside)||void 0===r||r.call(t,e),s.props.withPortal&&e.preventDefault()},s.handleChange=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=e[0];if(!s.props.onChangeRaw||(s.props.onChangeRaw.apply(s,e),r&&"function"==typeof r.isDefaultPrevented&&!r.isDefaultPrevented())){s.setState({inputValue:(null==r?void 0:r.target)instanceof HTMLInputElement?r.target.value:null,lastPreSelectChange:nr});var a=s.props,o=a.dateFormat,i=void 0===o?n.defaultProps.dateFormat:o,l=a.strictParsing,c=void 0===l?n.defaultProps.strictParsing:l,p=function(e,t,r,n,a){var o,s=null,i=Ke(r)||Ke(qe()),l=!0;if(Array.isArray(t))return t.forEach((function(t){var o=K.parse(e,t,new Date,{locale:i,useAdditionalWeekYearTokens:!0,useAdditionalDayOfYearTokens:!0});n&&(l=Ce(o,a)&&e===_e(o,t,r)),Ce(o,a)&&l&&(s=o)})),s;if(s=K.parse(e,t,new Date,{locale:i,useAdditionalWeekYearTokens:!0,useAdditionalDayOfYearTokens:!0}),n)l=Ce(s)&&e===_e(s,t,r);else if(!Ce(s)){var c=(null!==(o=t.match(be))&&void 0!==o?o:[]).map((function(e){var t=e[0];if("p"===t||"P"===t){var r=k.longFormatters[t];return i?r(e,i.formatLong):t}return e})).join("");e.length>0&&(s=K.parse(e,c.slice(0,e.length),new Date,{useAdditionalWeekYearTokens:!0,useAdditionalDayOfYearTokens:!0})),Ce(s)||(s=new Date(e))}return Ce(s)&&l?s:null}((null==r?void 0:r.target)instanceof HTMLInputElement?r.target.value:"",i,s.props.locale,c,s.props.minDate);s.props.showTimeSelectOnly&&s.props.selected&&p&&!He(p,s.props.selected)&&(p=V.set(s.props.selected,{hours:b.getHours(p),minutes:C.getMinutes(p),seconds:P.getSeconds(p)})),!p&&(null==r?void 0:r.target)instanceof HTMLInputElement&&(null==r?void 0:r.target.value)||s.setSelected(p,r,!0)}},s.handleSelect=function(e,t,r){if(s.props.shouldCloseOnSelect&&!s.props.showTimeSelect&&s.sendFocusBackToInput(),s.props.onChangeRaw&&s.props.onChangeRaw(t),s.setSelected(e,t,!1,r),s.props.showDateSelect&&s.setState({isRenderAriaLiveMessage:!0}),!s.props.shouldCloseOnSelect||s.props.showTimeSelect)s.setPreSelection(e);else if(!s.props.inline){s.props.selectsRange||s.setOpen(!1);var n=s.props,a=n.startDate,o=n.endDate;!a||o||!s.props.swapRange&&Dt(e,a)||s.setOpen(!1)}},s.setSelected=function(e,t,r,a){var o,i=e;if(s.props.showYearPicker){if(null!==i&&Ze(x.getYear(i),s.props))return}else if(s.props.showMonthYearPicker){if(null!==i&&$e(i,s.props))return}else if(null!==i&&je(i,s.props))return;var l=s.props,c=l.onChange,p=l.selectsRange,d=l.startDate,u=l.endDate,f=l.selectsMultiple,h=l.selectedDates,m=l.minTime,v=l.swapRange;if(!We(s.props.selected,i)||s.props.allowSameDay||p||f)if(null!==i&&(!s.props.selected||r&&(s.props.showTimeSelect||s.props.showTimeSelectOnly||s.props.showTimeInput)||(i=Pe(i,{hour:b.getHours(s.props.selected),minute:C.getMinutes(s.props.selected),second:P.getSeconds(s.props.selected)})),r||!s.props.showTimeSelect&&!s.props.showTimeSelectOnly||m&&(i=Pe(i,{hour:m.getHours(),minute:m.getMinutes(),second:m.getSeconds()})),s.props.inline||s.setState({preSelection:i}),s.props.focusSelectedMonth||s.setState({monthSelectedIn:a})),p){var g=d&&!u,D=d&&u;!d&&!u?c?c([i,null],t):n.defaultProps.onChange:g&&(null===i?c?c([null,null],t):n.defaultProps.onChange:Dt(i,d)?v?c?c([i,d],t):n.defaultProps.onChange:c?c([i,null],t):n.defaultProps.onChange:c?c([d,i],t):n.defaultProps.onChange),D&&(c?c([i,null],t):n.defaultProps.onChange)}else if(f){if(null!==i)if(null==h?void 0:h.length)if(h.some((function(e){return He(e,i)}))){var y=h.filter((function(e){return!He(e,i)}));c?c(y,t):n.defaultProps.onChange}else c?c(De(De([],h,!0),[i],!1),t):n.defaultProps.onChange;else c?c([i],t):n.defaultProps.onChange}else c?c(i,t):n.defaultProps.onChange;r||((null!==(o=s.props.onSelect)&&void 0!==o?o:n.defaultProps.onSelect)(i,t),s.setState({inputValue:null}))},s.setPreSelection=function(e){var t=I.isDate(s.props.minDate),r=I.isDate(s.props.maxDate),n=!0;if(e){var a=Ye(e);if(t&&r)n=Qe(e,s.props.minDate,s.props.maxDate);else if(t){var o=Ye(s.props.minDate);n=N.isAfter(e,o)||We(a,o)}else if(r){var i=Re(s.props.maxDate);n=O.isBefore(e,i)||We(a,i)}}n&&s.setState({preSelection:e})},s.toggleCalendar=function(){s.setOpen(!s.state.open)},s.handleTimeChange=function(e){var t;if(!s.props.selectsRange&&!s.props.selectsMultiple){var r=s.props.selected?s.props.selected:s.getPreSelection(),a=s.props.selected?e:Pe(r,{hour:b.getHours(e),minute:C.getMinutes(e)});s.setState({preSelection:a}),(null!==(t=s.props.onChange)&&void 0!==t?t:n.defaultProps.onChange)(a),s.props.shouldCloseOnSelect&&!s.props.showTimeInput&&(s.sendFocusBackToInput(),s.setOpen(!1)),s.props.showTimeInput&&s.setOpen(!0),(s.props.showTimeSelectOnly||s.props.showTimeSelect)&&s.setState({isRenderAriaLiveMessage:!0}),s.setState({inputValue:null})}},s.onInputClick=function(){var e,t;s.props.disabled||s.props.readOnly||s.setOpen(!0),null===(t=(e=s.props).onInputClick)||void 0===t||t.call(e)},s.onInputKeyDown=function(e){var t,r,n,a,o;null===(r=(t=s.props).onKeyDown)||void 0===r||r.call(t,e);var i=e.key;if(s.state.open||s.props.inline||s.props.preventOpenOnFocus){if(s.state.open){if(i===ye.ArrowDown||i===ye.ArrowUp){e.preventDefault();var l=s.props.showTimeSelectOnly?".react-datepicker__time-list-item[tabindex='0']":s.props.showWeekPicker&&s.props.showWeekNumbers?'.react-datepicker__week-number[tabindex="0"]':s.props.showFullMonthYearPicker||s.props.showMonthYearPicker?'.react-datepicker__month-text[tabindex="0"]':'.react-datepicker__day[tabindex="0"]',c=(null===(n=s.calendar)||void 0===n?void 0:n.componentNode)instanceof Element&&s.calendar.componentNode.querySelector(l);return void(c instanceof HTMLElement&&c.focus({preventScroll:!0}))}var p=Me(s.state.preSelection);i===ye.Enter?(e.preventDefault(),s.inputOk()&&s.state.lastPreSelectChange===ar?(s.handleSelect(p,e),!s.props.shouldCloseOnSelect&&s.setPreSelection(p)):s.setOpen(!1)):i===ye.Escape?(e.preventDefault(),s.sendFocusBackToInput(),s.setOpen(!1)):i===ye.Tab&&s.setOpen(!1),s.inputOk()||null===(o=(a=s.props).onInputError)||void 0===o||o.call(a,{code:1,msg:tr})}}else i!==ye.ArrowDown&&i!==ye.ArrowUp&&i!==ye.Enter||s.onInputClick()},s.onPortalKeyDown=function(e){e.key===ye.Escape&&(e.preventDefault(),s.setState({preventFocus:!0},(function(){s.setOpen(!1),setTimeout((function(){s.setFocus(),s.setState({preventFocus:!1})}))})))},s.onDayKeyDown=function(e){var t,r,n,o,l=s.props,c=l.minDate,u=l.maxDate,f=l.disabledKeyboardNavigation,h=l.showWeekPicker,m=l.shouldCloseOnSelect,v=l.locale,g=l.calendarStartDay,y=l.adjustDateOnChange,k=l.inline;if(null===(r=(t=s.props).onKeyDown)||void 0===r||r.call(t,e),!f){var w=e.key,S=e.shiftKey,b=Me(s.state.preSelection),M=function(e,t){var r=t;switch(e){case ye.ArrowRight:r=h?p.addWeeks(t,1):a.addDays(t,1);break;case ye.ArrowLeft:r=h?se.subWeeks(t,1):ne.subDays(t,1);break;case ye.ArrowUp:r=se.subWeeks(t,1);break;case ye.ArrowDown:r=p.addWeeks(t,1);break;case ye.PageUp:r=S?ie.subYears(t,1):ae.subMonths(t,1);break;case ye.PageDown:r=S?d.addYears(t,1):i.addMonths(t,1);break;case ye.Home:r=xe(t,v,g);break;case ye.End:r=function(e){return D.endOfWeek(e)}(t)}return r};if(w===ye.Enter)return e.preventDefault(),s.handleSelect(b,e),void(!m&&s.setPreSelection(b));if(w===ye.Escape)return e.preventDefault(),s.setOpen(!1),void(s.inputOk()||null===(o=(n=s.props).onInputError)||void 0===o||o.call(n,{code:1,msg:tr}));var C=null;switch(w){case ye.ArrowLeft:case ye.ArrowRight:case ye.ArrowUp:case ye.ArrowDown:case ye.PageUp:case ye.PageDown:case ye.Home:case ye.End:C=function(e,t){for(var r=e,n=!1,a=0,o=M(e,t);!n;){if(a>=40){o=t;break}c&&o<c&&(r=ye.ArrowRight,o=je(c,s.props)?M(r,o):c),u&&o>u&&(r=ye.ArrowLeft,o=je(u,s.props)?M(r,o):u),je(o,s.props)?(r!==ye.PageUp&&r!==ye.Home||(r=ye.ArrowRight),r!==ye.PageDown&&r!==ye.End||(r=ye.ArrowLeft),o=M(r,o)):n=!0,a++}return o}(w,b)}if(C){if(e.preventDefault(),s.setState({lastPreSelectChange:ar}),y&&s.setSelected(C),s.setPreSelection(C),k){var E=_.getMonth(b),P=_.getMonth(C),Y=x.getYear(b),N=x.getYear(C);E!==P||Y!==N?s.setState({shouldFocusDayInline:!0}):s.setState({shouldFocusDayInline:!1})}}else s.props.onInputError&&s.props.onInputError({code:1,msg:tr})}},s.onPopperKeyDown=function(e){e.key===ye.Escape&&(e.preventDefault(),s.sendFocusBackToInput())},s.onClearClick=function(e){e&&e.preventDefault&&e.preventDefault(),s.sendFocusBackToInput();var t=s.props,r=t.selectsRange,a=t.onChange;r?a?a([null,null],e):n.defaultProps.onChange():a?a(null,e):n.defaultProps.onChange(),s.setState({inputValue:null})},s.clear=function(){s.onClearClick()},s.onScroll=function(e){"boolean"==typeof s.props.closeOnScroll&&s.props.closeOnScroll?e.target!==document&&e.target!==document.documentElement&&e.target!==document.body||s.setOpen(!1):"function"==typeof s.props.closeOnScroll&&s.props.closeOnScroll(e)&&s.setOpen(!1)},s.renderCalendar=function(){var e,t;return s.props.inline||s.isCalendarOpen()?ue.default.createElement(er,ge({ref:function(e){s.calendar=e}},s.props,s.state,{setOpen:s.setOpen,dateFormat:null!==(e=s.props.dateFormatCalendar)&&void 0!==e?e:n.defaultProps.dateFormatCalendar,onSelect:s.handleSelect,onClickOutside:s.handleCalendarClickOutside,holidays:ut(s.modifyHolidays()),outsideClickIgnoreClass:Zt,onDropdownFocus:s.handleDropdownFocus,onTimeChange:s.handleTimeChange,className:s.props.calendarClassName,container:s.props.calendarContainer,handleOnKeyDown:s.props.onKeyDown,handleOnDayKeyDown:s.onDayKeyDown,setPreSelection:s.setPreSelection,dropdownMode:null!==(t=s.props.dropdownMode)&&void 0!==t?t:n.defaultProps.dropdownMode}),s.props.children):null},s.renderAriaLiveRegion=function(){var e,t=s.props,r=t.dateFormat,a=void 0===r?n.defaultProps.dateFormat:r,o=t.locale,i=s.props.showTimeInput||s.props.showTimeSelect?"PPPPp":"PPPP";return e=s.props.selectsRange?"Selected start date: ".concat(Ee(s.props.startDate,{dateFormat:i,locale:o}),". ").concat(s.props.endDate?"End date: "+Ee(s.props.endDate,{dateFormat:i,locale:o}):""):s.props.showTimeSelectOnly?"Selected time: ".concat(Ee(s.props.selected,{dateFormat:a,locale:o})):s.props.showYearPicker?"Selected year: ".concat(Ee(s.props.selected,{dateFormat:"yyyy",locale:o})):s.props.showMonthYearPicker?"Selected month: ".concat(Ee(s.props.selected,{dateFormat:"MMMM yyyy",locale:o})):s.props.showQuarterYearPicker?"Selected quarter: ".concat(Ee(s.props.selected,{dateFormat:"yyyy, QQQ",locale:o})):"Selected date: ".concat(Ee(s.props.selected,{dateFormat:i,locale:o})),ue.default.createElement("span",{role:"alert","aria-live":"polite",className:"react-datepicker__aria-live"},e)},s.renderDateInput=function(){var e,a,o,i=t.clsx(s.props.className,((e={})[Zt]=s.state.open,e)),l=s.props.customInput||ue.default.createElement("input",{type:"text"}),c=s.props.customInputRef||"ref",p=s.props,d=p.dateFormat,u=void 0===d?n.defaultProps.dateFormat:d,f=p.locale,h="string"==typeof s.props.value?s.props.value:"string"==typeof s.state.inputValue?s.state.inputValue:s.props.selectsRange?function(e,t,r){if(!e)return"";var n=Ee(e,r),a=t?Ee(t,r):"";return"".concat(n," - ").concat(a)}(s.props.startDate,s.props.endDate,{dateFormat:u,locale:f}):s.props.selectsMultiple?function(e,t){if(!(null==e?void 0:e.length))return"";var r=e[0]?Ee(e[0],t):"";if(1===e.length)return r;if(2===e.length&&e[1]){var n=Ee(e[1],t);return"".concat(r,", ").concat(n)}var a=e.length-1;return"".concat(r," (+").concat(a,")")}(null!==(o=s.props.selectedDates)&&void 0!==o?o:[],{dateFormat:u,locale:f}):Ee(s.props.selected,{dateFormat:u,locale:f});return r.cloneElement(l,((a={})[c]=function(e){s.input=e},a.value=h,a.onBlur=s.handleBlur,a.onChange=s.handleChange,a.onClick=s.onInputClick,a.onFocus=s.handleFocus,a.onKeyDown=s.onInputKeyDown,a.id=s.props.id,a.name=s.props.name,a.form=s.props.form,a.autoFocus=s.props.autoFocus,a.placeholder=s.props.placeholderText,a.disabled=s.props.disabled,a.autoComplete=s.props.autoComplete,a.className=t.clsx(l.props.className,i),a.title=s.props.title,a.readOnly=s.props.readOnly,a.required=s.props.required,a.tabIndex=s.props.tabIndex,a["aria-describedby"]=s.props.ariaDescribedBy,a["aria-invalid"]=s.props.ariaInvalid,a["aria-labelledby"]=s.props.ariaLabelledBy,a["aria-required"]=s.props.ariaRequired,a))},s.renderClearButton=function(){var e=s.props,r=e.isClearable,n=e.disabled,a=e.selected,o=e.startDate,i=e.endDate,l=e.clearButtonTitle,c=e.clearButtonClassName,p=void 0===c?"":c,d=e.ariaLabelClose,u=void 0===d?"Close":d,f=e.selectedDates;return r&&(null!=a||null!=o||null!=i||(null==f?void 0:f.length))?ue.default.createElement("button",{type:"button",className:t.clsx("react-datepicker__close-icon",p,{"react-datepicker__close-icon--disabled":n}),disabled:n,"aria-label":u,onClick:s.onClearClick,title:l,tabIndex:-1}):null},s.state=s.calcInitialState(),s.preventFocusTimeout=void 0,s}return ve(n,e),Object.defineProperty(n,"defaultProps",{get:function(){return{allowSameDay:!1,dateFormat:"MM/dd/yyyy",dateFormatCalendar:"LLLL yyyy",onChange:function(){},disabled:!1,disabledKeyboardNavigation:!1,dropdownMode:"scroll",onFocus:function(){},onBlur:function(){},onKeyDown:function(){},onInputClick:function(){},onSelect:function(){},onClickOutside:function(){},onMonthChange:function(){},onCalendarOpen:function(){},onCalendarClose:function(){},preventOpenOnFocus:!1,onYearChange:function(){},onInputError:function(){},monthsShown:1,readOnly:!1,withPortal:!1,selectsDisabledDaysInRange:!1,shouldCloseOnSelect:!0,showTimeSelect:!1,showTimeInput:!1,showPreviousMonths:!1,showMonthYearPicker:!1,showFullMonthYearPicker:!1,showTwoColumnMonthYearPicker:!1,showFourColumnMonthYearPicker:!1,showYearPicker:!1,showQuarterYearPicker:!1,showWeekPicker:!1,strictParsing:!1,swapRange:!1,timeIntervals:30,timeCaption:"Time",previousMonthAriaLabel:"Previous Month",previousMonthButtonLabel:"Previous Month",nextMonthAriaLabel:"Next Month",nextMonthButtonLabel:"Next Month",previousYearAriaLabel:"Previous Year",previousYearButtonLabel:"Previous Year",nextYearAriaLabel:"Next Year",nextYearButtonLabel:"Next Year",timeInputLabel:"Time",enableTabLoop:!0,yearItemNumber:Se,focusSelectedMonth:!1,showPopperArrow:!0,excludeScrollbar:!0,customTimeInput:null,calendarStartDay:void 0,toggleCalendarOnIconClick:!1,usePointerEvent:!1}},enumerable:!1,configurable:!0}),n.prototype.componentDidMount=function(){window.addEventListener("scroll",this.onScroll,!0),document.addEventListener("visibilitychange",this.setHiddenStateOnVisibilityHidden)},n.prototype.componentDidUpdate=function(e,t){var r,n,a,o,s,i;e.inline&&(s=e.selected,i=this.props.selected,s&&i?_.getMonth(s)!==_.getMonth(i)||x.getYear(s)!==x.getYear(i):s!==i)&&this.setPreSelection(this.props.selected),void 0!==this.state.monthSelectedIn&&e.monthsShown!==this.props.monthsShown&&this.setState({monthSelectedIn:0}),e.highlightDates!==this.props.highlightDates&&this.setState({highlightDates:dt(this.props.highlightDates)}),t.focused||We(e.selected,this.props.selected)||this.setState({inputValue:null}),t.open!==this.state.open&&(!1===t.open&&!0===this.state.open&&(null===(n=(r=this.props).onCalendarOpen)||void 0===n||n.call(r)),!0===t.open&&!1===this.state.open&&(null===(o=(a=this.props).onCalendarClose)||void 0===o||o.call(a)))},n.prototype.componentWillUnmount=function(){this.clearPreventFocusTimeout(),window.removeEventListener("scroll",this.onScroll,!0),document.removeEventListener("visibilitychange",this.setHiddenStateOnVisibilityHidden)},n.prototype.renderInputContainer=function(){var e=this.props,r=e.showIcon,n=e.icon,a=e.calendarIconClassname,o=e.calendarIconClassName,s=e.toggleCalendarOnIconClick,i=this.state.open;return a&&console.warn("calendarIconClassname props is deprecated. should use calendarIconClassName props."),ue.default.createElement("div",{className:"react-datepicker__input-container".concat(r?" react-datepicker__view-calendar-icon":"")},r&&ue.default.createElement(jt,ge({icon:n,className:t.clsx(o,!o&&a,i&&"react-datepicker-ignore-onclickoutside")},s?{onClick:this.toggleCalendar}:null)),this.state.isRenderAriaLiveMessage&&this.renderAriaLiveRegion(),this.renderDateInput(),this.renderClearButton())},n.prototype.render=function(){var e=this.renderCalendar();if(this.props.inline)return e;if(this.props.withPortal){var t=this.state.open?ue.default.createElement(zt,{enableTabLoop:this.props.enableTabLoop},ue.default.createElement("div",{className:"react-datepicker__portal",tabIndex:-1,onKeyDown:this.onPortalKeyDown},e)):null;return this.state.open&&this.props.portalId&&(t=ue.default.createElement(Ut,ge({portalId:this.props.portalId},this.props),t)),ue.default.createElement("div",null,this.renderInputContainer(),t)}return ue.default.createElement(Jt,ge({},this.props,{className:this.props.popperClassName,hidePopper:!this.isCalendarOpen(),targetComponent:this.renderInputContainer(),popperComponent:e,popperOnKeyDown:this.onPopperKeyDown,showArrow:this.props.showPopperArrow}))},n}(r.Component),nr="input",ar="navigate";e.CalendarContainer=ke,e.default=rr,e.getDefaultLocale=qe,e.registerLocale=function(e,t){var r=we();r.__localeData__||(r.__localeData__={}),r.__localeData__[e]=t},e.setDefaultLocale=function(e){we().__localeId__=e},Object.defineProperty(e,"__esModule",{value:!0})}));


/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IGNORE_CLASS_NAME: () => (/* binding */ IGNORE_CLASS_NAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}/**
 * Check whether some DOM node is our Component's node.
 */
function isNodeFound(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  } // SVG <use/> elements do not technically reside in the rendered DOM, so
  // they do not have classList directly, but they offer a link to their
  // corresponding element, which can have classList. This extra check is for
  // that case.
  // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
  // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17


  if (current.correspondingElement) {
    return current.correspondingElement.classList.contains(ignoreClass);
  }

  return current.classList.contains(ignoreClass);
}
/**
 * Try to find our node in a hierarchy of nodes, returning the document
 * node as highest node if our node is not found in the path up.
 */

function findHighest(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  } // If source=local then this event came from 'somewhere'
  // inside and should be ignored. We could handle this with
  // a layered approach, too, but that requires going back to
  // thinking in terms of Dom node nesting, running counter
  // to React's 'you shouldn't care about the DOM' philosophy.
  // Also cover shadowRoot node by checking current.host


  while (current.parentNode || current.host) {
    // Only check normal node without shadowRoot
    if (current.parentNode && isNodeFound(current, componentNode, ignoreClass)) {
      return true;
    }

    current = current.parentNode || current.host;
  }

  return current;
}
/**
 * Check if the browser scrollbar was clicked
 */

function clickedScrollbar(evt) {
  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
}// ideally will get replaced with external dep
// when rafrex/detect-passive-events#4 and rafrex/detect-passive-events#5 get merged in
var testPassiveEventSupport = function testPassiveEventSupport() {
  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
    return;
  }

  var passive = false;
  var options = Object.defineProperty({}, 'passive', {
    get: function get() {
      passive = true;
    }
  });

  var noop = function noop() {};

  window.addEventListener('testPassiveEventSupport', noop, options);
  window.removeEventListener('testPassiveEventSupport', noop, options);
  return passive;
};function autoInc(seed) {
  if (seed === void 0) {
    seed = 0;
  }

  return function () {
    return ++seed;
  };
}

var uid = autoInc();var passiveEventSupport;
var handlersMap = {};
var enabledInstances = {};
var touchEvents = ['touchstart', 'touchmove'];
var IGNORE_CLASS_NAME = 'ignore-react-onclickoutside';
/**
 * Options for addEventHandler and removeEventHandler
 */

function getEventHandlerOptions(instance, eventName) {
  var handlerOptions = {};
  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;

  if (isTouchEvent && passiveEventSupport) {
    handlerOptions.passive = !instance.props.preventDefault;
  }

  return handlerOptions;
}
/**
 * This function generates the HOC function that you'll use
 * in order to impart onOutsideClick listening to an
 * arbitrary component. It gets called at the end of the
 * bootstrapping code to yield an instance of the
 * onClickOutsideHOC function defined inside setupHOC().
 */


function onClickOutsideHOC(WrappedComponent, config) {
  var _class, _temp;

  var componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  return _temp = _class = /*#__PURE__*/function (_Component) {
    _inheritsLoose(onClickOutside, _Component);

    function onClickOutside(props) {
      var _this;

      _this = _Component.call(this, props) || this;

      _this.__outsideClickHandler = function (event) {
        if (typeof _this.__clickOutsideHandlerProp === 'function') {
          _this.__clickOutsideHandlerProp(event);

          return;
        }

        var instance = _this.getInstance();

        if (typeof instance.props.handleClickOutside === 'function') {
          instance.props.handleClickOutside(event);
          return;
        }

        if (typeof instance.handleClickOutside === 'function') {
          instance.handleClickOutside(event);
          return;
        }

        throw new Error("WrappedComponent: " + componentName + " lacks a handleClickOutside(event) function for processing outside click events.");
      };

      _this.__getComponentNode = function () {
        var instance = _this.getInstance();

        if (config && typeof config.setClickOutsideRef === 'function') {
          return config.setClickOutsideRef()(instance);
        }

        if (typeof instance.setClickOutsideRef === 'function') {
          return instance.setClickOutsideRef();
        }

        return (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.findDOMNode)(instance);
      };

      _this.enableOnClickOutside = function () {
        if (typeof document === 'undefined' || enabledInstances[_this._uid]) {
          return;
        }

        if (typeof passiveEventSupport === 'undefined') {
          passiveEventSupport = testPassiveEventSupport();
        }

        enabledInstances[_this._uid] = true;
        var events = _this.props.eventTypes;

        if (!events.forEach) {
          events = [events];
        }

        handlersMap[_this._uid] = function (event) {
          if (_this.componentNode === null) return;
          if (_this.initTimeStamp > event.timeStamp) return;

          if (_this.props.preventDefault) {
            event.preventDefault();
          }

          if (_this.props.stopPropagation) {
            event.stopPropagation();
          }

          if (_this.props.excludeScrollbar && clickedScrollbar(event)) return;
          var current = event.composed && event.composedPath && event.composedPath().shift() || event.target;

          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {
            return;
          }

          _this.__outsideClickHandler(event);
        };

        events.forEach(function (eventName) {
          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_assertThisInitialized(_this), eventName));
        });
      };

      _this.disableOnClickOutside = function () {
        delete enabledInstances[_this._uid];
        var fn = handlersMap[_this._uid];

        if (fn && typeof document !== 'undefined') {
          var events = _this.props.eventTypes;

          if (!events.forEach) {
            events = [events];
          }

          events.forEach(function (eventName) {
            return document.removeEventListener(eventName, fn, getEventHandlerOptions(_assertThisInitialized(_this), eventName));
          });
          delete handlersMap[_this._uid];
        }
      };

      _this.getRef = function (ref) {
        return _this.instanceRef = ref;
      };

      _this._uid = uid();
      _this.initTimeStamp = performance.now();
      return _this;
    }
    /**
     * Access the WrappedComponent's instance.
     */


    var _proto = onClickOutside.prototype;

    _proto.getInstance = function getInstance() {
      if (WrappedComponent.prototype && !WrappedComponent.prototype.isReactComponent) {
        return this;
      }

      var ref = this.instanceRef;
      return ref.getInstance ? ref.getInstance() : ref;
    };

    /**
     * Add click listeners to the current document,
     * linked to this component's state.
     */
    _proto.componentDidMount = function componentDidMount() {
      // If we are in an environment without a DOM such
      // as shallow rendering or snapshots then we exit
      // early to prevent any unhandled errors being thrown.
      if (typeof document === 'undefined' || !document.createElement) {
        return;
      }

      var instance = this.getInstance();

      if (config && typeof config.handleClickOutside === 'function') {
        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);

        if (typeof this.__clickOutsideHandlerProp !== 'function') {
          throw new Error("WrappedComponent: " + componentName + " lacks a function for processing outside click events specified by the handleClickOutside config option.");
        }
      }

      this.componentNode = this.__getComponentNode(); // return early so we dont initiate onClickOutside

      if (this.props.disableOnClickOutside) return;
      this.enableOnClickOutside();
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      this.componentNode = this.__getComponentNode();
    }
    /**
     * Remove all document's event listeners for this component
     */
    ;

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.disableOnClickOutside();
    }
    /**
     * Can be called to explicitly enable event listening
     * for clicks and touches outside of this element.
     */
    ;

    /**
     * Pass-through render
     */
    _proto.render = function render() {
      // eslint-disable-next-line no-unused-vars
      var _this$props = this.props;
          _this$props.excludeScrollbar;
          var props = _objectWithoutPropertiesLoose(_this$props, ["excludeScrollbar"]);

      if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef;
      } else {
        props.wrappedRef = this.getRef;
      }

      props.disableOnClickOutside = this.disableOnClickOutside;
      props.enableOnClickOutside = this.enableOnClickOutside;
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, props);
    };

    return onClickOutside;
  }(react__WEBPACK_IMPORTED_MODULE_0__.Component), _class.displayName = "OnClickOutside(" + componentName + ")", _class.defaultProps = {
    eventTypes: ['mousedown', 'touchstart'],
    excludeScrollbar: config && config.excludeScrollbar || false,
    outsideClickIgnoreClass: IGNORE_CLASS_NAME,
    preventDefault: false,
    stopPropagation: false
  }, _class.getClass = function () {
    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;
  }, _temp;
}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (onClickOutsideHOC);

/***/ }),

/***/ "./node_modules/tabbable/dist/index.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/tabbable/dist/index.esm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   focusable: () => (/* binding */ focusable),
/* harmony export */   getTabIndex: () => (/* binding */ getTabIndex),
/* harmony export */   isFocusable: () => (/* binding */ isFocusable),
/* harmony export */   isTabbable: () => (/* binding */ isTabbable),
/* harmony export */   tabbable: () => (/* binding */ tabbable)
/* harmony export */ });
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
// NOTE: separate `:not()` selectors has broader browser support than the newer
//  `:not([inert], [inert] *)` (Feb 2023)
// CAREFUL: JSDom does not support `:not([inert] *)` as a selector; using it causes
//  the entire query to fail, resulting in no nodes found, which will break a lot
//  of things... so we have to rely on JS to identify nodes inside an inert container
var candidateSelectors = ['input:not([inert])', 'select:not([inert])', 'textarea:not([inert])', 'a[href]:not([inert])', 'button:not([inert])', '[tabindex]:not(slot):not([inert])', 'audio[controls]:not([inert])', 'video[controls]:not([inert])', '[contenteditable]:not([contenteditable="false"]):not([inert])', 'details>summary:first-of-type:not([inert])', 'details:not([inert])'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function (element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};

/**
 * Determines if a node is inert or in an inert ancestor.
 * @param {Element} [node]
 * @param {boolean} [lookUp] If true and `node` is not inert, looks up at ancestors to
 *  see if any of them are inert. If false, only `node` itself is considered.
 * @returns {boolean} True if inert itself or by way of being in an inert ancestor.
 *  False if `node` is falsy.
 */
var isInert = function isInert(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  // CAREFUL: JSDom does not support inert at all, so we can't use the `HTMLElement.inert`
  //  JS API property; we have to check the attribute, which can either be empty or 'true';
  //  if it's `null` (not specified) or 'false', it's an active element
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'inert');
  var inert = inertAtt === '' || inertAtt === 'true';

  // NOTE: this could also be handled with `node.matches('[inert], :is([inert] *)')`
  //  if it weren't for `matches()` not being a function on shadow roots; the following
  //  code works for any kind of node
  // CAREFUL: JSDom does not appear to support certain selectors like `:not([inert] *)`
  //  so it likely would not support `:is([inert] *)` either...
  var result = inert || lookUp && node && isInert(node.parentNode); // recursive

  return result;
};

/**
 * Determines if a node's content is editable.
 * @param {Element} [node]
 * @returns True if it's content-editable; false if it's not or `node` is falsy.
 */
var isContentEditable = function isContentEditable(node) {
  var _node$getAttribute2;
  // CAREFUL: JSDom does not support the `HTMLElement.isContentEditable` API so we have
  //  to use the attribute directly to check for this, which can either be empty or 'true';
  //  if it's `null` (not specified) or 'false', it's a non-editable element
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, 'contenteditable');
  return attValue === '' || attValue === 'true';
};

/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */
var getCandidates = function getCandidates(el, includeContainer, filter) {
  // even if `includeContainer=false`, we still have to check it for inertness because
  //  if it's inert, all its children are inert
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};

/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */

/**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */

/**
 * @typedef {Object} CandidateScope
 * @property {Element} scopeParent contains inner candidates
 * @property {Element[]} candidates list of candidates found in the scope parent
 */

/**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */

/**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidateScope>}
 */
var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      // no need to look up since we're drilling down
      // anything inside this container will also be inert
      continue;
    }
    if (element.tagName === 'SLOT') {
      // add shadow dom slot scope (slot itself cannot be focusable)
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      // check candidate element
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }

      // iterate over shadow content if possible
      var shadowRoot = element.shadowRoot ||
      // check for an undisclosed shadow
      typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);

      // no inert look up because we're already drilling down and checking for inertness
      //  on the way down, so all containers to this root node should have already been
      //  vetted as non-inert
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
        //  shadow exists, so look at light dom children as fallback BUT create a scope for any
        //  child candidates found because they're likely slotted elements (elements that are
        //  children of the web component element (which has the shadow), in the light dom, but
        //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
        //  _after_ we return from this recursive call
        var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        // there's not shadow so just dig into the element's (light dom) children
        //  __without__ giving the element special scope treatment
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};

/**
 * @private
 * Determines if the node has an explicitly specified `tabindex` attribute.
 * @param {HTMLElement} node
 * @returns {boolean} True if so; false if not.
 */
var hasTabIndex = function hasTabIndex(node) {
  return !isNaN(parseInt(node.getAttribute('tabindex'), 10));
};

/**
 * Determine the tab index of a given node.
 * @param {HTMLElement} node
 * @returns {number} Tab order (negative, 0, or positive number).
 * @throws {Error} If `node` is falsy.
 */
var getTabIndex = function getTabIndex(node) {
  if (!node) {
    throw new Error('No node provided');
  }
  if (node.tabIndex < 0) {
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    // yet they are still part of the regular tab order; in FF, they get a default
    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    // order, consider their tab index to be 0.
    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};

/**
 * Determine the tab index of a given node __for sort order purposes__.
 * @param {HTMLElement} node
 * @param {boolean} [isScope] True for a custom element with shadow root or slot that, by default,
 *  has tabIndex -1, but needs to be sorted by document order in order for its content to be
 *  inserted into the correct sort position.
 * @returns {number} Tab order (negative, 0, or positive number).
 */
var getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};
var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

// determines if a node is ultimately attached to the window's document
var isNodeAttached = function isNodeAttached(node) {
  var _nodeRoot;
  // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
  //  (but NOT _the_ document; see second 'If' comment below for more).
  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
  //  is attached, and the one we need to check if it's in the document or not (because the
  //  shadow, and all nodes it contains, is never considered in the document since shadows
  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
  //  visibility, including all the nodes it contains). The host could be any normal node,
  //  or a custom element (i.e. web component). Either way, that's the one that is considered
  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
  //  tested).
  // To further complicate things, we have to look all the way up until we find a shadow HOST
  //  that is attached (or find none) because the node might be in nested shadows...
  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
  //  document (per the docs) and while it's a Document-type object, that document does not
  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
  //  node is actually detached.
  // NOTE: If `nodeRootHost` or `node` happens to be the `document` itself (which is possible
  //  if a tabbable/focusable node was quickly added to the DOM, focused, and then removed
  //  from the DOM as in https://github.com/focus-trap/focus-trap-react/issues/905), then
  //  `ownerDocument` will be `null`, hence the optional chaining on it.
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;

  // in some cases, a detached node will return itself as the root instead of a document or
  //  shadow root object, in which case, we shouldn't try to look further up the host chain
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
      //  which means we need to get the host's host and check if that parent host is contained
      //  in (i.e. attached to) the document
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
    width = _node$getBoundingClie.width,
    height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
  var displayCheck = _ref.displayCheck,
    getShadowRoot = _ref.getShadowRoot;
  // NOTE: visibility will be `undefined` if node is detached from the document
  //  (see notes about this further down), which means we will consider it visible
  //  (this is legacy behavior from a very long way back)
  // NOTE: we check this regardless of `displayCheck="none"` because this is a
  //  _visibility_ check, not a _display_ check
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }
  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }
  if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
    if (typeof getShadowRoot === 'function') {
      // figure out if we should consider the node to be in an undisclosed shadow and use the
      //  'non-zero-area' fallback
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
        ) {
          // node has an undisclosed shadow which means we can only treat it as a black box, so we
          //  fall back to a non-zero-area test
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          // iterate up slot
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          // cross shadow boundary
          node = rootNode.host;
        } else {
          // iterate up normal dom
          node = parentElement;
        }
      }
      node = originalNode;
    }
    // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
    //  it might be a falsy value, which means shadow DOM support is disabled

    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
    //  now we can just test to see if it would normally be visible or not, provided it's
    //  attached to the main document.
    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.

    if (isNodeAttached(node)) {
      // this works wherever the node is: if there's at least one client rect, it's
      //  somehow displayed; it also covers the CSS 'display: contents' case where the
      //  node itself is hidden in place of its contents; and there's no need to search
      //  up the hierarchy either
      return !node.getClientRects().length;
    }

    // Else, the node isn't attached to the document, which means the `getClientRects()`
    //  API will __always__ return zero rects (this can happen, for example, if React
    //  is used to render nodes onto a detached tree, as confirmed in this thread:
    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
    //
    // It also means that even window.getComputedStyle(node).display will return `undefined`
    //  because styles are only computed for nodes that are in the document.
    //
    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
    //  considering __everything__ to be visible because of the innability to determine styles.
    //
    // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
    //  nodes as visible with the 'none' fallback.__
    if (displayCheck !== 'legacy-full') {
      return true; // hidden
    }
    // else, fallback to 'none' mode and consider the node visible
  } else if (displayCheck === 'non-zero-area') {
    // NOTE: Even though this tests that the node's client rect is non-zero to determine
    //  whether it's displayed, and that a detached node will __always__ have a zero-area
    //  client rect, we don't special-case for whether the node is attached or not. In
    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
    //  times, and that includes attached or not.
    return isZeroArea(node);
  }

  // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
  //  it's visible
  return false;
};

// form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset
var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    // check if `node` is contained in a disabled <fieldset>
    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> among the children of the disabled <fieldset>
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          // when the first <legend> (in document order) is found
          if (child.tagName === 'LEGEND') {
            // if its parent <fieldset> is not nested in another disabled <fieldset>,
            // return whether `node` is a descendant of its first <legend>
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        }
        // the disabled <fieldset> containing `node` has no <legend>
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }

  // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled ||
  // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) ||
  // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  // If a custom element has an explicit negative tabindex,
  // browsers will not allow tab targeting said element's children.
  return false;
};

/**
 * @param {Array.<Element|CandidateScope>} candidates
 * @returns Element[]
 */
var sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function (item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item: item,
        isScope: isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');
var isFocusable = function isFocusable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};


//# sourceMappingURL=index.esm.js.map


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
 * next to a given reference element.
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
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
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
    elements,
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
    const shouldAddOffset = !middlewareData.arrow && (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
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
      const initialSideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(initialPlacement);
      const isBasePlacement = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositePlacement)(initialPlacement)] : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getExpandedPlacements)(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
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
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
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
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
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
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        availableWidth = alignment || noShift ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
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
/* harmony export */   arrow: () => (/* binding */ arrow),
/* harmony export */   autoPlacement: () => (/* binding */ autoPlacement),
/* harmony export */   autoUpdate: () => (/* binding */ autoUpdate),
/* harmony export */   computePosition: () => (/* binding */ computePosition),
/* harmony export */   detectOverflow: () => (/* binding */ detectOverflow),
/* harmony export */   flip: () => (/* binding */ flip),
/* harmony export */   getOverflowAncestors: () => (/* reexport safe */ _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getOverflowAncestors),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   inline: () => (/* binding */ inline),
/* harmony export */   limitShift: () => (/* binding */ limitShift),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   platform: () => (/* binding */ platform),
/* harmony export */   shift: () => (/* binding */ shift),
/* harmony export */   size: () => (/* binding */ size)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @floating-ui/utils */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs");
/* harmony import */ var _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @floating-ui/core */ "./node_modules/@floating-ui/core/dist/floating-ui.core.mjs");
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/utils/dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");





function getCssDimensions(element) {
  const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.round)(width) !== offsetWidth || (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.round)(height) !== offsetHeight;
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
  return !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(domElement)) {
    return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.round)(rect.width) : rect.width) / width;
  let y = ($ ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.round)(rect.height) : rect.height) / height;

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

const noOffsets = /*#__PURE__*/(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
function getVisualOffsets(element) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getWindow)(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isWebKit)() || !win.visualViewport) {
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
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getWindow)(element)) {
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
  let scale = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  if (includeScale) {
    if (offsetParent) {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isElement)(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getWindow)(domElement);
    const offsetWin = offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isElement)(offsetParent) ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getWindow)(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getFrameElement)(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getWindow)(currentIFrame);
      currentIFrame = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getFrameElement)(currentWin);
    }
  }
  return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.rectToClientRect)({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocumentElement)(offsetParent);
  const topLayer = elements ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isTopLayer)(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  const offsets = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getNodeName)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isOverflowElement)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getNodeScroll)(offsetParent);
    }
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(offsetParent)) {
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
  return getBoundingClientRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocumentElement)(element)).left + (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getNodeScroll)(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocumentElement)(element);
  const scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getNodeScroll)(element);
  const body = element.ownerDocument.body;
  const width = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.max)(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.max)(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(body).direction === 'rtl') {
    x += (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.max)(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getWindow)(element);
  const html = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocumentElement)(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isWebKit)();
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
  const scale = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) ? getScale(element) : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
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
    rect = getDocumentRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocumentElement)(element));
  } else if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isElement)(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.rectToClientRect)(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getParentNode)(element);
  if (parentNode === stopNode || !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isElement)(parentNode) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isLastTraversableNode)(parentNode)) {
    return false;
  }
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getOverflowAncestors)(element, [], false).filter(el => (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isElement)(el) && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getNodeName)(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(element).position === 'fixed';
  let currentNode = elementIsFixed ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getParentNode)(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isElement)(currentNode) && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isLastTraversableNode)(currentNode)) {
    const computedStyle = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(currentNode);
    const currentNodeIsContaining = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isContainingBlock)(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isOverflowElement)(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getParentNode)(currentNode);
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
  const elementClippingAncestors = boundary === 'clippingAncestors' ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isTopLayer)(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.max)(rect.top, accRect.top);
    accRect.right = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.max)(rect.left, accRect.left);
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
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(offsetParent);
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocumentElement)(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getNodeName)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isOverflowElement)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getNodeScroll)(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(element).position === 'fixed') {
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
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getWindow)(element);
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isTopLayer)(element)) {
    return win;
  }
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    let svgOffsetParent = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getParentNode)(element);
    while (svgOffsetParent && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isLastTraversableNode)(svgOffsetParent)) {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isElement)(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getParentNode)(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isTableElement)(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isLastTraversableNode)(offsetParent) && isStaticPositioned(offsetParent) && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isContainingBlock)(offsetParent)) {
    return win;
  }
  return offsetParent || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getContainingBlock)(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocumentElement)(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
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
    const insetTop = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.floor)(top);
    const insetRight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.floor)(root.clientWidth - (left + width));
    const insetBottom = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.floor)(root.clientHeight - (top + height));
    const insetLeft = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.floor)(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.max)(0, (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__.min)(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
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
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getOverflowAncestors)(referenceEl) : []), ...(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getOverflowAncestors)(floating)] : [];
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
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
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
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
const detectOverflow = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.detectOverflow;

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.offset;

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.autoPlacement;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.shift;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.flip;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.size;

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.hide;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.arrow;

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.inline;

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.limitShift;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
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
  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_2__.computePosition)(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};




/***/ }),

/***/ "./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrow: () => (/* binding */ arrow),
/* harmony export */   autoPlacement: () => (/* binding */ autoPlacement),
/* harmony export */   autoUpdate: () => (/* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.autoUpdate),
/* harmony export */   computePosition: () => (/* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.computePosition),
/* harmony export */   detectOverflow: () => (/* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.detectOverflow),
/* harmony export */   flip: () => (/* binding */ flip),
/* harmony export */   getOverflowAncestors: () => (/* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_1__.getOverflowAncestors),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   inline: () => (/* binding */ inline),
/* harmony export */   limitShift: () => (/* binding */ limitShift),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   platform: () => (/* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.platform),
/* harmony export */   shift: () => (/* binding */ shift),
/* harmony export */   size: () => (/* binding */ size),
/* harmony export */   useFloating: () => (/* binding */ useFloating)
/* harmony export */ });
/* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/dom */ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");
/* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @floating-ui/dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "react-dom");






var index = typeof document !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_2__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_2__.useEffect;

// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'function' && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0;) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0;) {
      const key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}

function getDPR(element) {
  if (typeof window === 'undefined') {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}

function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}

function useLatestRef(value) {
  const ref = react__WEBPACK_IMPORTED_MODULE_2__.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/useFloating
 */
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = react__WEBPACK_IMPORTED_MODULE_2__.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = react__WEBPACK_IMPORTED_MODULE_2__.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = react__WEBPACK_IMPORTED_MODULE_2__.useState(null);
  const [_floating, _setFloating] = react__WEBPACK_IMPORTED_MODULE_2__.useState(null);
  const setReference = react__WEBPACK_IMPORTED_MODULE_2__.useCallback(node => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = react__WEBPACK_IMPORTED_MODULE_2__.useCallback(node => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = react__WEBPACK_IMPORTED_MODULE_2__.useRef(null);
  const floatingRef = react__WEBPACK_IMPORTED_MODULE_2__.useRef(null);
  const dataRef = react__WEBPACK_IMPORTED_MODULE_2__.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform);
  const update = react__WEBPACK_IMPORTED_MODULE_2__.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.computePosition)(referenceRef.current, floatingRef.current, config).then(data => {
      const fullData = {
        ...data,
        isPositioned: true
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        react_dom__WEBPACK_IMPORTED_MODULE_3__.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData(data => ({
        ...data,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = react__WEBPACK_IMPORTED_MODULE_2__.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...(getDPR(elements.floating) >= 1.5 && {
          willChange: 'transform'
        })
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, 'current');
  }
  return {
    name: 'arrow',
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === 'function' ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.arrow)({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.arrow)({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = (options, deps) => ({
  ...(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.offset)(options),
  options: [options, deps]
});

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = (options, deps) => ({
  ...(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.shift)(options),
  options: [options, deps]
});

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = (options, deps) => ({
  ...(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.limitShift)(options),
  options: [options, deps]
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = (options, deps) => ({
  ...(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.flip)(options),
  options: [options, deps]
});

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = (options, deps) => ({
  ...(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.size)(options),
  options: [options, deps]
});

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = (options, deps) => ({
  ...(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.autoPlacement)(options),
  options: [options, deps]
});

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = (options, deps) => ({
  ...(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.hide)(options),
  options: [options, deps]
});

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = (options, deps) => ({
  ...(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.inline)(options),
  options: [options, deps]
});

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = (options, deps) => ({
  ...arrow$1(options),
  options: [options, deps]
});




/***/ }),

/***/ "./node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TYPEABLE_SELECTOR: () => (/* binding */ TYPEABLE_SELECTOR),
/* harmony export */   activeElement: () => (/* binding */ activeElement),
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   getDocument: () => (/* binding */ getDocument),
/* harmony export */   getPlatform: () => (/* binding */ getPlatform),
/* harmony export */   getTarget: () => (/* binding */ getTarget),
/* harmony export */   getUserAgent: () => (/* binding */ getUserAgent),
/* harmony export */   isAndroid: () => (/* binding */ isAndroid),
/* harmony export */   isEventTargetWithin: () => (/* binding */ isEventTargetWithin),
/* harmony export */   isJSDOM: () => (/* binding */ isJSDOM),
/* harmony export */   isMac: () => (/* binding */ isMac),
/* harmony export */   isMouseLikePointerType: () => (/* binding */ isMouseLikePointerType),
/* harmony export */   isReactEvent: () => (/* binding */ isReactEvent),
/* harmony export */   isRootElement: () => (/* binding */ isRootElement),
/* harmony export */   isSafari: () => (/* binding */ isSafari),
/* harmony export */   isTypeableCombobox: () => (/* binding */ isTypeableCombobox),
/* harmony export */   isTypeableElement: () => (/* binding */ isTypeableElement),
/* harmony export */   isVirtualClick: () => (/* binding */ isVirtualClick),
/* harmony export */   isVirtualPointerEvent: () => (/* binding */ isVirtualPointerEvent),
/* harmony export */   stopEvent: () => (/* binding */ stopEvent)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/utils/dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");


function activeElement(doc) {
  let activeElement = doc.activeElement;
  while (((_activeElement = activeElement) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null) {
    var _activeElement;
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}
function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();

  // First, attempt with faster native method
  if (parent.contains(child)) {
    return true;
  }

  // then fallback to custom implementation with Shadow DOM support
  if (rootNode && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      // @ts-ignore
      next = next.parentNode || next.host;
    }
  }

  // Give up, the result is false
  return false;
}
// Avoid Chrome DevTools blue warning.
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function getUserAgent() {
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map(_ref => {
      let {
        brand,
        version
      } = _ref;
      return brand + "/" + version;
    }).join(' ');
  }
  return navigator.userAgent;
}

// License: https://github.com/adobe/react-spectrum/blob/b35d5c02fe900badccd0cf1a8f23bb593419f238/packages/@react-aria/utils/src/isVirtualEvent.ts
function isVirtualClick(event) {
  // FIXME: Firefox is now emitting a deprecation warning for `mozInputSource`.
  // Try to find a workaround for this. `react-aria` source still has the check.
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true;
  }
  if (isAndroid() && event.pointerType) {
    return event.type === 'click' && event.buttons === 1;
  }
  return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
  if (isJSDOM()) return false;
  return !isAndroid() && event.width === 0 && event.height === 0 || isAndroid() && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'mouse' ||
  // iOS VoiceOver returns 0.333• for width/height.
  event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'touch';
}
function isSafari() {
  // Chrome DevTools does not complain about navigator.vendor
  return /apple/i.test(navigator.vendor);
}
function isAndroid() {
  const re = /android/i;
  return re.test(getPlatform()) || re.test(getUserAgent());
}
function isMac() {
  return getPlatform().toLowerCase().startsWith('mac') && !navigator.maxTouchPoints;
}
function isJSDOM() {
  return getUserAgent().includes('jsdom/');
}
function isMouseLikePointerType(pointerType, strict) {
  // On some Linux machines with Chromium, mouse inputs return a `pointerType`
  // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
  const values = ['mouse', 'pen'];
  if (!strict) {
    values.push('', undefined);
  }
  return values.includes(pointerType);
}
function isReactEvent(event) {
  return 'nativeEvent' in event;
}
function isRootElement(element) {
  return element.matches('html,body');
}
function getDocument(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
}
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }
  if ('composedPath' in event) {
    return event.composedPath().includes(node);
  }

  // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
  const e = event;
  return e.target != null && node.contains(e.target);
}
function getTarget(event) {
  if ('composedPath' in event) {
    return event.composedPath()[0];
  }

  // TS thinks `event` is of type never as it assumes all browsers support
  // `composedPath()`, but browsers without shadow DOM don't.
  return event.target;
}
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function isTypeableElement(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) && element.matches(TYPEABLE_SELECTOR);
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
function isTypeableCombobox(element) {
  if (!element) return false;
  return element.getAttribute('role') === 'combobox' && isTypeableElement(element);
}




/***/ }),

/***/ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComputedStyle: () => (/* binding */ getComputedStyle),
/* harmony export */   getContainingBlock: () => (/* binding */ getContainingBlock),
/* harmony export */   getDocumentElement: () => (/* binding */ getDocumentElement),
/* harmony export */   getFrameElement: () => (/* binding */ getFrameElement),
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
/* harmony export */   isTopLayer: () => (/* binding */ isTopLayer),
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
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
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
function isTopLayer(element) {
  return [':popover-open', ':modal'].some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
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
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
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
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}




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
/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

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
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}




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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_Orders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Orders */ "./src/components/Orders.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");





if (document.querySelector('#orderTable')) {
  const root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.querySelector('#orderTable'));
  root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Orders__WEBPACK_IMPORTED_MODULE_2__["default"], null));
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map