var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=aQaQFiA2lqAA8ugLxl54JZwg8Pe2Z5rZeSYQzOz6yQU";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
function onClick() {
  corsPromise().then(
    (request) =>
      (request.onload = request.onerror = function () {
        const allData = JSON.parse(request.response).data;
        const even = allData.filter(data => data.common_name.length % 2 == 0);
        const container = document.getElementById("content");
        for (const data of even) {
          const img = document.createElement("img");
          const text = document.createTextNode(data.common_name);
          const spacer1 = document.createElement("br");
          const spacer2 = document.createElement("br");
          const spacer3 = document.createElement("br");

          img.setAttribute("src", data.image_url);

          container.appendChild(img);
          container.appendChild(spacer1);
          container.appendChild(text)
          container.appendChild(spacer2);
          container.appendChild(spacer3);
        }
      })
  );
}
