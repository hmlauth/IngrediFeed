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
function cuisineSearch(response){
  var response = JSON.parse(JSONresponse);
  console.log(response);
  
  //build each trending recipe
  var random = Math.floor((Math.random()*9)-1)
  for(var i=0;i<3;i++){
      console.log('random: ' + random)
      var title = $('<p>').text(response.recipes[random].title);
      var recipeSource = $('<a>').text('View Full Recipe').attr('href', response.recipes[random].source_url);
      var trendingPhoto = $('<img>').attr('src', response.recipes[random].image_url).attr('class','trending-recipe-photo');
      var newTrendingRecipe = $('<div>').append(trendingPhoto);
      $('#cuisine-field').append(title).append(newTrendingRecipe).append(recipeSource);
      random ++
  };
};

//grab ingredient array from response
function ingredients(response){
  var result = [];
  var ingredientsArray = response.hits[3].recipe.ingredients;
  for (var i=0;i<ingredientsArray.length;i++){
      result.push(ingredientsArray[i].text);
  };
  return result;
};

//pageload trending cuisine search
// $.ajax({
//     url:'https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=f4f40279aca7dd14a4df19d4902cae70',
//     method: 'GET'
// }).then(cuisineSearch(response));

//cuisine seach button event listener
$('#cuisine-search-button').on('click', function(){
  if($('#cuisine-search').val()===''){
      console.log('no input received');
  };
});

//ingredient search listener
$(document).on('click', '#ingredient-search-button', function(){
  $('#ul-0, #ul-1, #ul-2').empty()

  var protein = $('#protein-search').val();
  var vegetables = $('#vegetable-search').val();
  
  //retrieve clicked health options
  var healthOptionsArray = [];
  var instance = M.FormSelect.getInstance($('select'));
  var selectedBoxIndeces = instance.getSelectedValues()

  function createHealthOptions(indeces){
    if(indeces[0] !== "" && indeces.length>0){
      for(var i=0;i<indeces.length;i++){
        healthOptionsArray.push($('[id="health-option-' + selectedBoxIndeces[i] + '"]').text())
      }
      healthOptionsArray = '&health=' + healthOptionsArray.join("&health=")      
    }
  }
  createHealthOptions(selectedBoxIndeces) 
  
  $.ajax({
      url:'https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?app_id=d6442f57&app_key=69127160173cd4569256538b60dfbc9c&q=' + protein + "," + vegetables + healthOptionsArray,
      method:'GET'
  }).then(function(response){
      console.log(response);

      var random = Math.floor((Math.random()*9)-1)
      for(var i=0;i<3;i++){
        console.log(random)
          var thisHit = response.hits[random].recipe;
          $('#card-' + i + '-img').attr('src', thisHit.image);
          $('#card-' + i + '-title').text(thisHit.label)
          $('#recipe-url-' + i).text("See Full Recipe").attr('href', thisHit.url).attr('target','_blank')
          $('#serving-size-' + i).text('Serving size: ' + thisHit.yield)
          random++
          
          //add in dietlabels
          for(var j=0; j<thisHit.dietLabels.length;j++){
              $('#ul-' + i).append($('<li>').text(thisHit.dietLabels[j]))

          //add in healthlabels
          for(var j=0;j<2;j++){
              $('#ul-' + i).append($('<li>').text(thisHit.healthLabels[j]))
          }

          ingredients(response)
      }
      
      $('#protein-search').val('');
      $('#vegetable-search').val('');
      
    }
  })
})

