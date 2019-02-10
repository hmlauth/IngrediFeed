# jQuery-BEShare #

This is a simple jQuery plugin to add social sharing links to your webpage. It supports two modes, as a popup attached to an anchor link, and inline inside a container.

Currently provides the following social shares:

- Facebook
- Twitter
- LinkedIn
- Google+

It also provides Print and Email for convenience.

### [See a demo here](http://brandextract.github.io/jQuery-BEShare/demo/) ###

## Usage ##
```javascript
jQuery('.popup').BEShare({
  'type': 'popup', // string - also accepts 'inline'
  'targets': ['Facebook', 'Twitter'], // array - also accepts 'LinkedIn', 'Google+', 'Print', 'Email', 'SMS'
  'class': '', // string - Class to add to the container
  'prefix': 'icon-', // string - add prefix to icon class
  'suffix': '',  // string - add suffix to icon class
  'aria-prefix': 'Share on ',  // adds aria-label parameter to link
  'width': '626', // string - width of the popup
  'height': '436', // string - height of the popup
  'message': document.title, // string - message to share with link
  'via': '', // string - username associated with the shared content, usually for Twitter
  'onShare': null,  // function - to run when share button is clicked
  'altLink': null  // boolean - to use "rel" parameter as the url to share
  'removeHash': false // boolean - removes the hash part of the URL
});
```

## Building ##
    npm run build

or

    yarn build
