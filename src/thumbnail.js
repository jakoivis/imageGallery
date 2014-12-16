;(function() {
    'use strict';
    
    extend(Thumbnail, Graphic);
    
    window.Thumbnail = Thumbnail;
    
    function Thumbnail(options)
    {
        Thumbnail.baseConstructor.call(this, options);
        
        if (!(this instanceof Thumbnail))
        {
            return new Thumbnail(options);
        }
        
        var me = this;
        
        var numberOfRows = 3;
        
        var itemSpacingX = 100;
        var itemSpacingY = 120;
        
        var gridMaxHeight = 400;
        var gridPaddingLeft = 100;
        var gridPaddingRight = 100;
        
        me.index = 0;

        function init()
        {
            if (options)
            {
                me.index = options.index || 0;
            }
            
            console.log(me.index);
            
            me.x = calculateXPosition();
            me.y = calculateYPosition();
        }
        
        me.update = function()
        {
            me.x = calculateXPosition();
            me.y = calculateYPosition();
        }
        
        function isInBounds()
        {
            var xPosition = calculateXPosition();
            // ...
        }
        
        function calculateXPosition()
        {
            return Thumbnail.scrollX + gridPaddingLeft + Math.floor(me.index / numberOfRows) * itemSpacingX;
        }
        
        function calculateYPosition()
        {
            return (me.index % numberOfRows) * itemSpacingY;
        }
        
        init();
     
        return this;
    }
    
    Thumbnail.initStatics = function()
    {
        Thumbnail.scrollX = 0;
        
        amplify.subscribe(Topics.THUMBNAILS_SCROLL_X, thumbnailsScrollXHandler);
        
        function thumbnailsScrollXHandler(scrollX)
        {
            Thumbnail.scrollX = scrollX;
        }
    };
    
    Thumbnail.initStatics();
    
})();