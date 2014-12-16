;(function() {
    'use strict';
    
    window.Slideshow = Slideshow;
    
    function Slideshow(options)
    {
        if (!(this instanceof Slideshow))
        {
            return new Slideshow(options);
        }
        
        var me = this;
       
        init();
       
        function init()
        {
        }
        
        return this;
    }
})();