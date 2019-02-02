$(document).ready(function(){
    // Materialize initialization for parallax
    $('.parallax').parallax();
// Materialize initialize for drop down selection menu for health options
  $('select').formSelect();
  // Materialize intiialize autocomplete for ingredient input boxes
  $('input.autocomplete').autocomplete({
    data: {
      "Celery": null,
      "Broccoli": null,
      "Bell Pepper": null,
      "Spinach": null,
      "Tomatoes": null,
      "Cucumber": null,
      "Lettuce": null,
      "Eggplant": null,
      "Cabbage": null,
      "Butternut Squash": null,
      "Potatoes": null,
      "Jalapeno": null,
      "Beets": null,
      "Pork": null,
      "Chicken": null,
      "Steak": null,
      "Fish": null,
      "Salmon": null,
      "Celery": null,
      "Red Wine": null,
      "White Wine": null,
      "Parsley": null,
      "Cilantro": null,
      "Mint": null,
      "Pepper Flakes": null,
    },
  });
});
 