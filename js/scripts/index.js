const meal_lists = document.querySelectorAll('ul.meal-list');

meal_lists.forEach(li=>{
    li.addEventListener('mouseover',hover_meal);
    li.addEventListener('mouseout',hover_off_meal);
    li.addEventListener('click', click_meal)
});

document.querySelectorAll('.carousel-img').forEach(e=>{
    e.addEventListener('mouseover',hover_weekday);
    e.addEventListener('click',click_weekday);
})

get_day_meals('monday', ()=>{
    document.querySelector('li.meal-item').click();
});

function hover_meal(e){
    if(e.target.classList.contains('meal-item') && !e.target.classList.contains('clicked')){
        e.target.style.backgroundColor = '#99bbad';
        e.target.style.cursor = 'pointer';
    }
}

function hover_off_meal(e){
    if(e.target.classList.contains('meal-item') && !e.target.classList.contains('clicked')){
        e.target.style.backgroundColor = 'transparent';
    }
}

function hover_weekday(e){
    e.target.style.cursor = 'pointer';
}

function click_weekday(e){
    clear_left_panel();
    get_day_meals(e.target.id);
}

function click_meal(e){
    if(e.target.classList.contains('meal-item')){
        if(!e.target.classList.contains('clicked')){
            deselect_items();
            clear_right_panel();
            e.target.style.backgroundColor = '#81b59f'; 
            e.target.classList.add('clicked');
            let recipe_name = e.target.innerHTML;

            display_recipe(recipe_name)
        }
    }
}


function display_recipe(recipe_name){
    let url = './placeholder_data/recipes/' + recipe_name.toLowerCase().replace(/ /g,"_")+'/';
        document.getElementById('RecipeImg').src = url + 'img.jpg';
        document.getElementById('RecipeName').innerHTML = recipe_name;
        document.getElementById('NutriFacts').src = url + 'nutritional_facts.jpg';
        document.getElementById('IngredientsHeader').innerHTML = "Ingredients";
        document.getElementById('RecipeHeader').innerHTML = "Recipe";
        fetch(url+'recipe.json')
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            let parentElementIngredients = document.getElementById("RecipeContainer1");
            let parentElementRecipe = document.getElementById("RecipeContainer2");
            data.ingredients.forEach(ingredient=>{
                const newP = document.createElement("p");
                newP.classList.add("dynamic");
                newP.innerHTML = ingredient;
                parentElementIngredients.insertBefore(newP, document.getElementById("IngredientsRefPlaceholder"));
            });
            let recipe_counter = 1;
            data.recipe.forEach(recipe_step=>{
                const newP = document.createElement("p");
                newP.classList.add("dynamic");
                newP.innerHTML = recipe_counter + '. ' + recipe_step;
                parentElementRecipe.insertBefore(newP, document.getElementById("RecipeRefPlaceholder"));
                recipe_counter++;
            });
        })
        .catch(function(err){
            console.log(err);
        });
}

function deselect_items(){
    document.querySelectorAll('li').forEach(li=>{
        li.style.background = 'transparent';
        li.classList.remove('clicked');
    })
}

function clear_right_panel(){
    document.querySelectorAll('.dynamic').forEach(e=>{
        e.parentNode.removeChild(e);
    });

}


// Get local json data
function get_day_meals(day, callback){
    fetch('./placeholder_data/' + day + '.json')
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        for(let key in data){
            let items = '';
            data[key].forEach(meal=>{
               items += `<li class="meal-item">${meal}</li>`
            });
            document.getElementById(key).innerHTML = items;
        }
        callback();
    })
    .catch(function(err){
        console.log(err);
    });

}

function clear_left_panel(){
    document.querySelectorAll('.meal-item').forEach(e=>{
        e.parentNode.removeChild(e);
    });
}
