let interfacesActive = [true, false, false];
let last_selected;
let last_selected_index;
const slider_ids = ["a", "b", "c", "d", "e", "f", "p"];

function setInterface() {
  let eqn;
  for (let i = 1; i <= g.affine_functions.length; i++) {
    eqn_parent = document.querySelector(`#slot${i.toString()}`);
    eqn = document.querySelector(`${"#eqn" + i.toString()}`);

    eqn.textContent = `${g
      .getTransformations()
      [i - 1].toString()
      .replaceAll(",", " ")}`;
  }

  updateInterfaceHighlighting();
}

function updateInterfaceHighlighting() {
  for (let k = 1; k <= interfacesActive.length; k++) {
    eqn_div = document.querySelector(`#slot${k.toString()}`);
    if (interfacesActive[k - 1]) {
      eqn_div.classList.add("active");
      last_selected = eqn_div;
      last_selected_index = k;
    } else {
      eqn_div.classList.remove("active");
    }
  }

  setSliders();
}

function setSliders() {
  for (let l in slider_ids) {
    let slider = document.querySelector(`#${slider_ids[l]}`);
    slider.value = g.getTransformations()[last_selected_index - 1][l];
  }
}

// interface
$(document).ready(function () {
  setInterface();

  $(".eqn_div").click(function () {
    // get id no
    let id_no = +$(this).attr("id").replace("slot", "");
    // if this is not active
    for (let k = 1; k <= interfacesActive.length; k++) {
      interfacesActive[k - 1] = k == id_no ? true : false;
    }
    updateInterfaceHighlighting();
  });
});

// controls
function broadcast() {
  let slider_vals = [];
  for (let l in slider_ids) {
    let slider = document.querySelector(`#${slider_ids[l]}`);
    slider_vals.push(+slider.value);
  }

  document.querySelector(`#eqn${last_selected_index}`).textContent =
    slider_vals.join(" ");
  g.setTransformation(slider_vals, last_selected_index);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  [res, bounds] = g.generate(p);
  fillCanvas(p, bounds);
}
