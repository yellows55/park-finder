"use strict";


$(watchForm);

function getParkList() {
  let parkState = $("input[type='text']").val();
  let limit = $("input[type='number']").val();
  console.log(parkState);
  fetch (`https://developer.nps.gov/api/v1/parks?stateCode=${parkState}&limit=${limit}&fields=addresses&api_key=rQBZgaIu2GpZ2SVbHlwOnoNW0nsFYmLfiKVkDbWZ`)
.then(response => response.json())
.then(responseJson => {
  displayParkList(responseJson);
  console.log(responseJson);
})
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getParkList();
  });
}


//$(getParkList);

/*fetch (`https://developer.nps.gov/api/v1/parks?stateCode=GA&limit=10&fields=addresses&api_key=rQBZgaIu2GpZ2SVbHlwOnoNW0nsFYmLfiKVkDbWZ`)
.then(response => response.json())
.then(responseJson => {
  displayParkList(responseJson);
  console.log(responseJson);
})*/


const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : null),
    nestedObj
  );
};



function displayParkList(parkObj) {
  let genParkList = parkObj.data;
  //console.log(genParkList.length);
  $('.search-results').empty()
  for (let i=0; i < genParkList.length; i++) {
    const name = getNestedObject(parkObj, ['data', i, 'fullName']);
    const descr = getNestedObject(parkObj, ['data', i, 'description']);
    const url = getNestedObject(parkObj, ['data', i, 'url']);
    const addresses = getNestedObject(parkObj, ['data', i, 'addresses']);
    console.log("addressworking");
    console.log(addresses.length);
    $('.search-results').append(
      `<h2>${name}</h2>
      <p>${descr}</p>
      <p><a href="${url}" target="_blank">${url}</a></p>
      <p>${addresses[0].line1}</p>
      <p>${addresses[0].city},${addresses[0].stateCode}</p>
      <p>${addresses[0].postalCode}</p>`);
    console.log("innerworking");
    console.log(getNestedObject(parkObj, ['data', i, 'addresses']));
  };
}


    




