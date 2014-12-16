/*
    ImageGallery version 1.0
    imagegallery-1.0.js
    

    features 1.0:
        
    options [object]

    implementation plan:
        - slideshow: images can be changed: left and right
        - gallery of thumbnails
        version x
        - "shader" effects for slideshow
        - "shader" effects switching between slideshow and gallery
        - "shader" effects for gallery thumbnails
        - slideshow change effect as a plugin
        - gallery types as a plugin
        - various "shader" effects
        
        
        imagegallery
        | 
        +-- imageloader
        +-- thumbnailgrid (canvas)
        +-- slideshow (canvas)
*/

;(function() {
    'use strict';
    
    function ImageGallery(options)
    {
        if (!(this instanceof ImageGallery))
        {
            return new ImageGallery(options);
        }
        
        var me = this;
        var timer;
        var images = [];
        var loader;
        var slideshow;
        var thumbnails;
       
        init(options);
       
        function init(options)
        {
            validateOptions(options);
            applyOptions(options);
            
            //slideshow = new Slideshow(options.slideshow);
            
            // add this options.thumbnailgrid
            thumbnails = new ThumbnailLayer({
                fullScreen: true,
                appendToBody: true,
                enableOnRollEvents: true,
                enableOnClickEvents: true
            });
            
            loader = new GalleryLoader(options.images);
            
            timer = new Timer({
                renderCallback: render,
                updateCallback: update,
                frameRate: 30
            });
            
            timer.start();
            
            function test()
            {
                
            }
            
            function test2()
            {
                
            }
            
            function test3()
            {
                
            }
        }
        
        function validateOptions(options)
        {
        }
        
        function applyOptions(options)
        {
        }
        
        function render()
        {
            thumbnails.render();
        }
        
        function update()
        {
            thumbnails.update();
        }
        
        return this;
    }
    
    window.ImageGallery = ImageGallery;
    
})();