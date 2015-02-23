# ResponsiveGallery

This is a plugin for responsive tile based galleries.  It was influenced by RTG (Responsive Tile Gallery), I noticed that RTG has issues with multiple galleries on the same page so I made plugin to have the same effect and support multiple galleries.

# Requirements
JQuery 1.7+ Required

#HTML Structure
The HTML should have a container element, containing a bunch of img tags.  Something like this will work fine:

```html
<div class="gallery">
  <img ...>
  <img ...>
  ....
</div>
```

Images inside list items with a ul as the container element work fine.

# Usage

ResponsiveGallery expects images to be fully loaded before being called.  So, you would use the window.load event.  Do not use document.ready as the images will not have loaded yet.


```js
jQuery(window).load(function(){
  $(".gallery").responsiveGallery();
});
