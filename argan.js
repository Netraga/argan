const ARGAN = (() => {
  // Create reference to the global document & performance object
  const _d = document,
    _p = performance;

  const _paramTypes = {
    string: "string",
    bool: "boolean",
    number: "number",
    object: "object",
    array: "array",
    function: "function",
  };

  const _elTypes = {
    span: "SPAN",
    div: "DIV",
    input: "INPUT",
    button: "BUTTON",
  };

  const _eventTypes = {
    c: "click",
    fb: {
      f: "focus",
      b: "blur",
    },
    m: {
      o: "mouseover",
      l: "mouseleave",
    },
  };

  const _data = {
    meta: {},
    trackers: {},
  };

  // Create track object function
  const _createTrackObject = (elementId, elementType, reference) => {
    return {
      chunk: 1,
      elId: elementId,
      elType: elementType,
      elRef: reference,
      events: {
        focus: [[], []],
        mouse: [[], []],
        clicks: [],
      },
      form: "",
    };
  };

  const _clickListen = (id) => {
    _data.trackers[id].events.clicks.push(_p.now());
  };

  const _focusListen = (id, i) => {
    _data.trackers[id].events.focus[i].push(_p.now());
  };

  const _mouseListen = (id, i) => {
    _data.trackers[id].events.mouse[i].push(_p.now());
  };

  // Add listeners functions
  const _addListeners = (elementId, elementType, reference) => {
    switch (elementType) {
      case _elTypes.button:
        reference.addEventListener(_eventTypes.c, () => {
          _clickListen(elementId);
        });
        Object.keys(_eventTypes.m).forEach((key, i) => {
          reference.addEventListener(_eventTypes.m[key], () => {
            _mouseListen(elementId, i);
          });
        });
        break;

      case _elTypes.span:
        Object.keys(_eventTypes.m).forEach((key, i) => {
          reference.addEventListener(_eventTypes.m[key], () => {
            _mouseListen(elementId, i);
          });
        });
        break;

      case _elTypes.input:
        Object.keys(_eventTypes.m).forEach((key, i) => {
          reference.addEventListener(_eventTypes.m[key], () => {
            _mouseListen(elementId, i);
          });
        });
        Object.keys(_eventTypes.fb).forEach((key, i) => {
          reference.addEventListener(_eventTypes.fb[key], () => {
            _focusListen(elementId, i);
          });
        });
        break;

      default:
        break;
    }
  };

  // Check conditions function
  const _checkConditions = (elementId, elementType) => {
    // Check if the elementId passes the check
    const idPass = typeof elementId === _paramTypes.string;
    const acceptedElement = Object.values(_elTypes).indexOf(elementType) > -1;
    return idPass && acceptedElement;
  };

  // The track function
  const _track = (elementId) => {
    let elementRef = _d.getElementById(elementId);
    let elementType = elementRef.nodeName;

    // Check if the elementId passes the check
    if (_checkConditions(elementId, elementType)) {
      _data.trackers[elementId] = _createTrackObject(
        elementId,
        elementType,
        elementRef
      );
      _addListeners(elementId, elementType, elementRef);
    }
  };

  return {
    track(elementId) {
      _track(elementId);
    },
    results() {
      console.log(_data);
    },
  };
})();
