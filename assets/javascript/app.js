$(document).ready(function () {
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

//grab ingredient array from response
function ingredients(response) {
  var result = [];
  var ingredientsArray = response.hits[3].recipe.ingredients;
  for (var i = 0; i < ingredientsArray.length; i++) {
    result.push(ingredientsArray[i].text);
  };
  return result;
};

//hide cuisine search buttons on page load
$('.cuisine-button-blue').css('display', 'none');

//cuisine seach button event listener
$('#cuisine-search-button').on('click', function () {

  var cuisineSearch = $('#cuisine-search').val().trim();

  // check for input from user
  if (cuisineSearch.length == 0) {
    $("#cuisine-validation").text("* Please enter your cuisine of choice * ");
    cuisineSearch.focus();
    return false;

  } else {
    //cuisine search
    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=f4f40279aca7dd14a4df19d4902cae70&q=' + cuisineSearch,
      method: 'GET'
    }).then(function (JSONresponse) {
      var response = JSON.parse(JSONresponse);
      console.log(response);

      //build each recipe
      var random = Math.floor((Math.random() * 9));
      for (var i = 0; i < 3; i++) {
        $('#cuisine-title-' + i).text(response.recipes[random].title);
        $('#cuisine-recipe-' + i).attr('href', response.recipes[random].source_url);
        $('#cuisine-image-' + i).attr('src', response.recipes[random].image_url);

        //build favorites button attributes
        $('#save-cuisine-recipe-' + i).attr('link', response.recipes[random].source_url)
        $('#save-cuisine-recipe-' + i).attr('title', response.recipes[random].title)
        $('#save-cuisine-recipe-' + i).attr('photo', response.recipes[random].image_url)

        //show cuisine search buttons
        $('.cuisine-button-blue').css('display', 'block');

        random++
      };
    });
  };
  //reset cuisine input field
  $('#cuisine-search').val("");
  $("#cuisine-validation").text("");
});

//ingredient search listener
$(document).on('click', '#ingredient-search-button', function () {

  // retrieve value of ingredient inputs
  var proteinSearch = $("#protein-search").val().trim();
  var vegetableSearch = $("#vegetable-search").val().trim();

  //retrieve clicked health options
  var healthOptionsArray = [];
  var instance = M.FormSelect.getInstance($('select'));
  var selectedBoxIndeces = instance.getSelectedValues();

  // create function to grab selected health option values
  function createHealthOptions(indeces) {
    if (indeces[0] !== "" && indeces.length > 0) {
      for (var i = 0; i < indeces.length; i++) {
        healthOptionsArray.push($('[id="health-option-' + selectedBoxIndeces[i] + '"]').text());
      };
      healthOptionsArray = '&health=' + healthOptionsArray.join("&health=");
    };
  };
  createHealthOptions(selectedBoxIndeces);

  // Check if input is in input form
  if (proteinSearch.length == 0 && vegetableSearch.length == 0 && healthOptionsArray.length === 0) {
    $('#ingredient-validation').text("Please enter at least one ingredient or select a health option"); // This Segment Displays The Validation Rule For All Fields
    proteinSearch.focus();
    vegetableSearch.focus();
    return false;

  } else if (proteinSearch !== "" || vegetableSearch !== "" || healthOptionsArray.length > 0) {
    // Clear p tag for user input validation
    $('#ingredient-validation').text("");

    //clear old recipes
    $('#ul-0, #ul-1, #ul-2').empty();

    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?app_id=d6442f57&app_key=69127160173cd4569256538b60dfbc9c&q=' + proteinSearch + "," + vegetableSearch + healthOptionsArray,
      method: 'GET'
    }).then(function (response) {

      $('.ingredient-start').css('display', 'block');

      var random = Math.floor((Math.random() * 8));
      for (var i = 0; i < 3; i++) {

        var thisHit = response.hits[random].recipe;

        //build each recipe
        $('#card-' + i + '-img').attr('src', thisHit.image);
        $('#card-' + i + '-title').text(thisHit.label);
        $('#ul-' + i).append($('<li>').text('Serving size: ' + thisHit.yield));
        $('#recipe-url-' + i).text("See Full Recipe").attr('href', thisHit.url).attr('target', '_blank');

        //add link, title and photo to 'save recipe' button
        $('#save-recipe-' + i).attr('link', thisHit.url);
        $('#save-recipe-' + i).attr('title', thisHit.label);
        $('#save-recipe-' + i).attr('photo', thisHit.image);

        //Populate ingredients popup card
        ingredients(response);
        $('#popup-title-' + i).text(thisHit.label);
        for (var j = 0; j < thisHit.ingredients.length; j++) {
          $('#popup-ingredients-' + i).append($('<li class="ingredient">').text(thisHit.ingredients[j].text));
        };

        random++;

        //add in dietlabels
        for (var j = 0; j < thisHit.dietLabels.length; j++) {
          $('#ul-' + i).append($('<li>').text(thisHit.dietLabels[j]));
        };

        //add in healthlabels
        for (var j = 0; j < 2; j++) {
          $('#ul-' + i).append($('<li>').text(thisHit.healthLabels[j]));
        };
        //reset input values
        $('#protein-search').val('');
        $('#vegetable-search').val('');

      };
    });
  };
});

//Initialize favorites from storage
var favorites;
function resetFavorites() {
  if (localStorage.getItem('favorites') === null || localStorage.getItem('favorites') === '') {
    favorites = [];
  } else {
    favorites = JSON.parse(localStorage.getItem('favorites'));
  };
};
resetFavorites();

//function to populate favorites
function populateFavorites(array) {
  for (var i = 0; i < favorites.length; i++) {
    var buildFavoriteCard = '<div class="card favorite-card large ingredient-card" style="height: 100%;"> <div class="card-image waves-effect waves-block waves-light"> <img class="activator ingredient-img" src="' + array[i].photo + '"> </div> <div class="card-content"> <span class="card-title activator grey-text text-darken-4"><h4 id="card-2-title">' + array[i].title + '</h4></span> <div class="button-class"><button class="waves-effect waves-light btn-small"><a target="_blank" class="recipe-button-search" href="' + array[i].link + '" >See Full Recipe</a></button><button class="waves-effect waves-light btn-small"><a title="' + array[i].title + '" class="remove-recipe-button recipe-button-search">Remove Recipe</a></button></div></div> </div>'
    $('#favorites-body').append(buildFavoriteCard);
  };
};
populateFavorites(favorites);

//function to check if recipe is already in favorites
function checkIfinFavorites(array, newObject) {
  var found = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i].link === newObject.link) {
      found = true;
    };
  };
  if (!found) {
    array.push(newObject);
    return array;
  };
};


//save to favorites
$('.save-recipe').on('click', function () {
  $('#favorites-body').empty();
  var newSavedObject = {
    title: this.firstChild.getAttribute('title'),
    photo: this.firstChild.getAttribute('photo'),
    link: this.firstChild.getAttribute('link')
  };
  //check if recipe is already in favorites
  checkIfinFavorites(favorites, newSavedObject);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  populateFavorites(favorites);
});

//remove buton from favorites
$(document).on('click', '.recipe-button-search', function () {
  $('#favorites-body').empty();
  var newArray = [];
  for (var i = 0; i < favorites.length; i++) {
    if (favorites[i].title !== $(this).attr('title')) {
      newArray.push(favorites[i]);
    };
  };
  favorites = newArray;
  localStorage.setItem('favorites', JSON.stringify(favorites));
  populateFavorites(favorites);
});

// Social Media Links using jQuery Plugin
$('.popup').BEShare({

  // CSS class to custom the popup
  'class': 'popup-share'
  
});

$('.inline-share').BEShare({
  'type': 'inline',
  'targets': ['Facebook', 'Twitter', 'LinkedIn', 'GPlus', 'Print', 'Email'],
  'onShare': function(targetName) {
    ga('send', 'event', 'Social', 'Click', 'Share', targetName);
  }
});

$('SELECTOR').BEShare({

  // popup or inline
  'type': 'popup',

  // 'Facebook', 'Twitter', 'LinkedIn', 
  // 'GPlus', 'Print', 'Email', 'SMS'
  'targets': ['Facebook', 'Twitter'],

  // addional CSS class
  'class': PLUGIN_NAME,

  // CSS prefix & suffix 
  'prefix': 'icon-',
  'suffix': '',

  // adds aria-label parameter to link
  'aria-prefix': 'Share on ',

  // width / height of the social share window
  'width': '626',
  'height': '436',

  // for <a href="https://www.jqueryscript.net/tags.php?/twitter/">twitter</a>
  'via': '',

  // message to share
  'message': document.title,

  // callback
  'onShare': null,

  // to use "rel" parameter as the url to share
  'altLink': null,

  // removes hash
  'removeHash': false

});

