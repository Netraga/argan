const ARGAN = (() => {
  const _data = {};

  /**  Let us calculate how long the user stays focused on the input 
         and also how long they hover over with the mouse **/
  const _trackTextInput = (elementId) => {
    // Create reference to the global document object
    const _d = document;

    // Create a key for each element that we want to track
    _data[elementId] = {};
    _data[elementId].focusBlur = [[], []];
    _data[elementId].mouseOverLeave = [[], []];

    _d.getElementById(elementId).addEventListener("focus", () => {
      _data[elementId].focusBlur[0].push(performance.now());
    });

    _d.getElementById(elementId).addEventListener("blur", () => {
      _data[elementId].focusBlur[1].push(performance.now());
    });

    _d.getElementById(elementId).addEventListener("mouseover", () => {
      _data[elementId].mouseOverLeave[0].push(performance.now());
    });

    _d.getElementById(elementId).addEventListener("mouseleave", () => {
      _data[elementId].mouseOverLeave[1].push(performance.now());
    });
  };

  const _results = () => {
    console.log(_data);
  };

  // Keeps all the code above this line anonymous to the developer console.
  return {
    trackTextInput(elementId) {
      _trackTextInput(elementId);
    },
    results() {
      _results();
    },
  };
})();

// Invoke the ARGAN.trackTextInput() function to track the events
ARGAN.trackTextInput("fname");
ARGAN.trackTextInput("lname");
