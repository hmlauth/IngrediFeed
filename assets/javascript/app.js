$(document).ready(function(){
// Materialize initialize for drop down selection menu for health options
  $('select').formSelect();
  // Materialize intiialize autocomplete for ingredient input boxes
  $('input.autocomplete').autocomplete({
    data: {
      "Apple": null,
      "Broccoli": null,
      "Google": 'https://placehold.it/250x250'
    },
  });
});
     