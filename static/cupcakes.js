const BASE_URL = "http://127.0.0.1:5000/api";


// generates html from cupcake data
function makeCupecakeHTML(cupcake){
    return `
    <div data-cupcake-id=${cupcake.id}>
    <img class="Cupcake-img" 
          style="max-width: 200px; max-height: 200px"
          src="${cupcake.image}"
          alt="(no image provided)">
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-button">X</button>
      </li>
    </div>
    `;
}



// populate cupcake index
async function displayCupcakeIndex(){
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcake of response.data.cupcakes){
        let newCupcake = $(makeCupecakeHTML(cupcake))
        $('#cupcakes-index').append(newCupcake);
    }
}


// handles form for adding new cupcake
$('#add-cupcake-form').on('submit', async function (evt) {
    evt.preventDefault();

    let flavor = $('#form-flavor').val()
    let rating = $('#form-rating').val()
    let size = $('#form-size').val()
    let image = $('#form-image').val()

    const resp = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake  = $(makeCupecakeHTML(resp.data.cupcake));
    $("#cupcakes-index").append(newCupcake);
    $("#add-cupcake-form").trigger("reset");
})


// handles cupcake deletion
$("#cupcakes-index").on("click", ".delete-button", async function (evt) {
    evt.preventDefault();

    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
  
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
  });


$(displayCupcakeIndex);

