//cuisine search function
function cuisineSearch(response){
    var response = JSON.parse(JSONresponse);
    console.log(response);
    
    //build each trending recipe
    for(var i=0;i<3;i++){
        var title = $('<p>').text(response.recipes[i].title);
        var recipeSource = $('<a>').text('View Full Recipe').attr('href', response.recipes[i].source_url);
        var trendingPhoto = $('<img>').attr('src', response.recipes[i].image_url).attr('class','trending-recipe-photo');
        var newTrendingRecipe = $('<div>').append(trendingPhoto);
        $('#cuisine-field').append(title).append(newTrendingRecipe).append(recipeSource);
    };
};

//pageload trending cuisine search
$.ajax({
    // url:'https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=f4f40279aca7dd14a4df19d4902cae70',
    method: 'GET'
}).then(cuisineSearch(response));

//cuisine seach button event listener
$('#cuisine-search-button').on('click', function(){
    if($('#cuisine-search').val()===''){
        console.log('no input received');
    };
});

//ingredient search
$('#ingredient-search-button').on('click', function(){
    var protein = $('#protein-search').val();
    var vegetables = $('#vegetable-search').val();
    $.ajax({
        url:'https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?count=10&app_id=d6442f57&app_key=69127160173cd4569256538b60dfbc9c&q=' + protein + "," + vegetables,
        method:'GET'
    }).then(function(response){
        console.log(response);
        // function getIngrediendt(){
        //     var ingredientsArray = resposne.hits[3].recipe.ingredients
        //     for(var i=0;i<){}
        // }
        var ingredients = function(response){
            var result = [];
            var ingredientsArray = response.hits[3].recipe.ingredients;
            for (var i=0;i<ingredientsArray.length;i++){
                result.push(ingredientsArray[i].text);
            };
            return result;
        };

        var dietRestrictions = $('<p>').text('Dietary Restrictions: ' + response.hits[3].recipe.healthLabels);
        var ingredientsDOM = $('<p>').text('Ingredients: ' + ingredients(response));
        var servingSize = $('<p>').text('Serving size: ' + response.hits[3].recipe.yield);
        var linkToRecipe = $('<a>').text(response.hits[3].recipe.url).attr('href',response.hits[3].recipe.url);
        var label = $('<p>').text(response.hits[3].recipe.label);
        var totalTime = $('<p>').text('Total Time: ' + response.hits[3].recipe.totalTime);
        var ingredientPhoto = $('<img>').attr('src', response.hits[3].recipe.image);
        $('#ingredient-field').append(ingredientPhoto).append(label).append(totalTime).append(linkToRecipe).append(servingSize).append(ingredientsDOM).append(dietRestrictions);
    })
})
