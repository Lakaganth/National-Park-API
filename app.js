const clearResult = () => {
  $(".card").remove();
};

const renderResult = parks => {
  parks.map(park => {
    return $(".search-result").append(`
    <div class ="col">
<div class="card mt-2 " >  
  <div class="card-body">
    <h5 class="card-title">${park.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${park.designation}</h6>
    <p class="card-text">${park.description}</p>
    <a  target="_blank" href="${
      park.url
    }" class="btn btn-info mx-auto">Visit Website</a>
  </div>
</div>
</div>
`);
  });
};

const apiCall = (state, limit) => {
  fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${limit}&api_key=GFY9D3wMFcG31eEdgJop3uKrJBb9tXhWK24SfPWH`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data.data);

      renderResult(data.data);
    });
};

const userInput = () => {
  $(".search").on("submit", e => {
    e.preventDefault();

    const state = $("#state")
      .val()
      .toLowerCase();
    let limit;
    if ($("#max-results").val() !== "") {
      limit = $("#max-results").val();
    } else limit = 10;
    console.log(state, limit);

    apiCall(state, limit);
    clearResult();
  });
};

$(function() {
  console.log("Waiting for user input");
  userInput();
});
