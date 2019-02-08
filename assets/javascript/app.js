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

//cuisine search function
// function cuisineSearch(response){
//   var response = JSON.parse(JSONresponse);
//   console.log(response);
  
//   //build each trending recipe
//   var random = Math.floor((Math.random()*9)-1);
//   for(var i=0;i<3;i++){
//       var title = $('<p>').text(response.recipes[random].title);
//       var recipeSource = $('<a>').text('View Full Recipe').attr('href', response.recipes[random].source_url);
//       var trendingPhoto = $('<img>').attr('src', response.recipes[random].image_url).attr('class','trending-recipe-photo');
//       var newTrendingRecipe = $('<div>').append(trendingPhoto);
//       $('#cuisine-field').append(title).append(newTrendingRecipe).append(recipeSource);
//       random ++;
//   };
// };

//grab ingredient array from response
function ingredients(response){
  var result = [];
  var ingredientsArray = response.hits[3].recipe.ingredients;
  for (var i=0;i<ingredientsArray.length;i++){
      result.push(ingredientsArray[i].text);
  };
  return result;
};
    
//hide cuisine search buttons on page load
$('.cuisine-button-blue').css('display', 'none');

//cuisine seach button event listener
$('#cuisine-search-button').on('click', function(){
  //show cuisine search buttons
  $('.cuisine-button-blue').css('display', 'block');
  if($('#cuisine-search').val()===''){
      console.log('no input received');
  } else {
    //cuisine search
    $.ajax({
        url:'https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=f4f40279aca7dd14a4df19d4902cae70&q=' + $('#cuisine-search').val(),
        method: 'GET'
    }).then(function (JSONresponse){
      var response = JSON.parse(JSONresponse);
      console.log(response);
      
      //build each recipe
      var random = Math.floor((Math.random()*9));
      for(var i=0;i<3;i++){
        $('#cuisine-title-' + i).text(response.recipes[random].title);
        $('#cuisine-recipe-' + i).attr('href', response.recipes[random].source_url);
        $('#cuisine-image-' + i).attr('src', response.recipes[random].image_url);
        
        //build favorites button attributes
        $('#save-cuisine-recipe-' + i).attr('link', response.recipes[random].source_url)
        $('#save-cuisine-recipe-' + i).attr('title', response.recipes[random].title)
        $('#save-cuisine-recipe-' + i).attr('photo', response.recipes[random].image_url)  
        
        random ++
      };
    });
  };
  //reset cuisine input field
  $('#cuisine-search-button').val("");
});


//ingredient search listener
$(document).on('click', '#ingredient-search-button', function(){
  if($('#protein-search').val()!== "" || $('#vegetable-search').val()!== ""){
    
    //clear old recipes
    $('#ul-0, #ul-1, #ul-2').empty();

    var protein = $('#protein-search').val();
    var vegetables = $('#vegetable-search').val();
    
    //retrieve clicked health options
    var healthOptionsArray = [];
    var instance = M.FormSelect.getInstance($('select'));
    var selectedBoxIndeces = instance.getSelectedValues();

    function createHealthOptions(indeces){
      if(indeces[0] !== "" && indeces.length>0){
        for(var i=0;i<indeces.length;i++){
          healthOptionsArray.push($('[id="health-option-' + selectedBoxIndeces[i] + '"]').text());
        };
        healthOptionsArray = '&health=' + healthOptionsArray.join("&health=");     
      };
    };
    createHealthOptions(selectedBoxIndeces);
    
    $.ajax({
        url:'https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?app_id=d6442f57&app_key=69127160173cd4569256538b60dfbc9c&q=' + protein + "," + vegetables + healthOptionsArray,
        method:'GET'
    }).then(function(response){
      
      $('.ingredient-start').css('display', 'block');

      var random = Math.floor((Math.random()*8));
      for(var i=0;i<3;i++){

        var thisHit = response.hits[random].recipe;

        //build each recipe
        $('#card-' + i + '-img').attr('src', thisHit.image);
        $('#card-' + i + '-title').text(thisHit.label);
        $('#ul-' + i).append($('<li>').text('Serving size: ' + thisHit.yield));
        $('#recipe-url-' + i).text("See Full Recipe").attr('href', thisHit.url).attr('target','_blank');
        
        //add link, title and photo to 'save recipe' button
        $('#save-recipe-' + i).attr('link', thisHit.url);
        $('#save-recipe-' + i).attr('title', thisHit.label);
        $('#save-recipe-' + i).attr('photo', thisHit.image);

        //Populate ingredients popup card
        ingredients(response);
        $('#popup-title-' + i).text(thisHit.label);
        for(var j=0;j<thisHit.ingredients.length;j++){
            $('#popup-ingredients-' + i).append($('<li class="ingredient">').text(thisHit.ingredients[j].text));
        };

        random++;

        //add in dietlabels
        for(var j=0; j<thisHit.dietLabels.length;j++){
            $('#ul-' + i).append($('<li>').text(thisHit.dietLabels[j]));
        };

        //add in healthlabels
        for(var j=0;j<2;j++){
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
function resetFavorites(){
  if(localStorage.getItem('favorites')===null || localStorage.getItem('favorites')===''){
    favorites = [];
  } else {
    favorites = JSON.parse(localStorage.getItem('favorites'));
  };
};
resetFavorites();

//function to populate favorites
function populateFavorites(array){
  for(var i=0;i<favorites.length;i++){
    var buildFavoriteCard = '<div class="card favorite-card large ingredient-card" style="height: 100%;"> <div class="card-image waves-effect waves-block waves-light"> <img class="activator ingredient-img" src="' + array[i].photo +'"> </div> <div class="card-content"> <span class="card-title activator grey-text text-darken-4"><h4 id="card-2-title">' + array[i].title + '</h4></span> <button class="waves-effect waves-light btn-small"><a target="_blank" class="recipe-button-search" href="' + array[i].link + '" >See Full Recipe</a></button><button class="waves-effect waves-light btn-small"><a title="' + array[i].title + '" class="remove-recipe-button recipe-button-search">Remove Recipe</a></button></div> </div>'
    $('#favorites-body').append(buildFavoriteCard);
  };
};
populateFavorites(favorites);

//function to check if recipe is already in favorites
function checkIfinFavorites(array, newObject){
  var found = false;
  for(var i=0; i<array.length;i++){
    if(array[i].link === newObject.link){
      found = true;
    };
  };
  if(!found){
    array.push(newObject);
    return array;
  };
};


//save to favorites
$('.save-recipe').on('click', function(){
  $('#favorites-body').empty();
  var newSavedObject = {
    title: this.firstChild.getAttribute('title'),
    photo: this.firstChild.getAttribute('photo'),
    link: this.firstChild.getAttribute('link')
  };
  //check if recipe is already in favorites
  checkIfinFavorites(favorites, newSavedObject) ; 
  localStorage.setItem('favorites', JSON.stringify(favorites));
  populateFavorites(favorites);
});

//remove buton from favorites
$(document).on('click', '.recipe-button-search', function(){
  $('#favorites-body').empty();
  var newArray = [];
  for(var i=0;i<favorites.length;i++){
    if(favorites[i].title !== $(this).attr('title')){
      newArray.push(favorites[i]);
    };
  };
  favorites = newArray;
  localStorage.setItem('favorites', JSON.stringify(favorites));
  populateFavorites(favorites);
});




