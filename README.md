# Recipe-App
Make an easy choice and feel satisfied with it! This application calls on two APIs by querying either the ingredients in your kitchen and health restrictions or the cuisine of your choice to then deliver three recipe options. If you love it, save it to your favorites!
#### Video Demonstration: https://drive.google.com/file/d/1JctYqvw2sH7cRAKsuJdH4UlOtlOooZKk/view?usp=sharing
#### Link to App: https://hmlauth.github.io/IngrediFeed/

<h1 align="center">Our Origin Story</h1>
<p align="center">We all love food</br>
+ </br>
We all struggle figuring out what we want to eat and this has become harder with more choices than ever</br>
("Decision Paralysis" is real people!**)</br>
+</br>
Find two APIs that have enough interesting information to use for a decent website </br>(and are also not a complete pain-in-the-a$$ to work with)</br>
+</br>
Brainstorming text sesh with friends and family getting weird (*creative) over potential app names</br>
(<em>Runner Up: PantryRaid</em>)</br>
=</br>
<em><strong>IngrediFeed</strong></em></br> 
<em>An app designed to facilitate the decision-making process and increase satisfaction with your choice!</em></br>
</p>

## Front End
Mobile-responsive front end made primarily with Materialize framework and also Google Fonts and css styling. A jQuery Plugin is used to demonstrate potential functionality of social media icons.

### Materialize
Key features include:
- scrollspy() 
- parallax() 
- formselect()
- autocomplete() </br>
. . . which are all initialized in app.js

We also utilized Materialize's:
- grid system
- buttons
- z-index
- containers
- forms
- cards / card reveal

### Google Fonts
For font we leaned toward a more rustic and light-hearted font, reminiscent to that which might appear on a chalkboard at a modern, trendy and healthy restaurant in a sunny Southern California. <strong>Our choice?</strong> <em>'Rock Salt', cursive</em> Name fits the food theme too!

## Back End
### APIs
1. Food2Fork: https://www.food2fork.com/about/api
2. Edamam: https://developer.edamam.com/

Other Features include:
- Data Persistence (i.e. localStorage) for the Favorites section
- Event Delegation for on click events

## Opportunities for Improvement
- Make responsive across all devices. The application is currently response only in inspector "responsive" frame.
- Include user input validation that checks if user input is spelled correctly and notify accordingly. 
- Fix card height so height of each card stays uniform.
- Create social media sharing ability without jQuery plugin.
- Create Login Page along with user authentication so each user can have their own account.
______________________________________________________________________________________________________________________________________
**Link to study (2000 Iyendar and Lepper): https://faculty.washington.edu/jdb/345/345%20Articles/Iyengar%20%26%20Lepper%20(2000).pdf
