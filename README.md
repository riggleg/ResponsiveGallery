# ResponsiveGallery

This is a plugin for responsive tile based galleries.  It was influenced by RTG (Responsive Tile Gallery), I noticed that RTG has issues with multiple galleries on the same page so I made plugin to have the same effect and support multiple galleries.

# Requirements
JQuery 1.7+ Required

#HTML Structure
The container element must be a list (ul) with li elements for each image.  The li elements are used for the gallery positioning.

```html
<ul class="gallery">
  <li><img ...></li>
  <li><img ...></li>
  ....
</ul>
```

Images inside list items with a ul as the container element work fine.

# Usage

ResponsiveGallery expects images to be fully loaded before being called.  So, you would use the window.load event.  Do not use document.ready as the images will not have loaded yet.


```js
jQuery(window).load(function(){
  $(".gallery").responsiveGallery();
});


# Options

* imageWidth - This defaults to 300.  This controls the width of each column in the gallery.  The image will be resized proportionally to this width.  Just give a number, no unit (no px).