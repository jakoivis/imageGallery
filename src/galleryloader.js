;(function() {
    'use strict';
    
    window.GalleryLoader = GalleryLoader;
    
    function GalleryLoader(images)
    {
        if (!(this instanceof GalleryLoader))
        {
            return new GalleryLoader(images);
        }
        
        var me = this;
        var isComplete = false;
        
        init();
        
        me.isComplete = function()
        {
            return isComplete;
        }
       
        function init()
        {
            var loader = new Preloader({
                autoload: false,
                images:convertImageListForPreloader(images),
                numberOfThreads: 2,
                onFileComplete: onFileComplete,
                onComplete: onComplete,
                onFileStart: onFileStart
            });
            
            amplify.publish(Topics.UPDATE_IMAGE_QUEUE, loader.getQueue());
            
            loader.load();
        }
        
        function convertImageListForPreloader(images)
        {
            var result = [];
            var item;
            
            for(var i = 0; i < images.length; i++)
            {
                item = images[i];
                
                result.push({
                    src: item.tb,
                    counterpartIndex: result.length +1,
                    type: "thumbnail"
                });
                
                result.push({
                    src: item.image,
                    counterpartIndex: result.length -1,
                    type: "image"
                });
            }
            
            return result;
        }
        
        function onFileStart(item)
        {
            amplify.publish(Topics.PRELOADER_FILE_START, item);
        }
        function onFileComplete(item)
        {
            amplify.publish(Topics.PRELOADER_FILE_COMPLETE, item);
        }
        function onComplete()
        {
            isComplete = true;
            amplify.publish(Topics.PRELOADER_COMPLETE, {});
        }
        
        return this;
    }
})();