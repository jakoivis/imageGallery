;(function() {
    'use strict';
    
    extend(ThumbnailLayer, Layer);
    
    window.ThumbnailLayer = ThumbnailLayer;
    
    function ThumbnailLayer(options)
    {
        ThumbnailLayer.baseConstructor.call(this, options);
        
        if (!(this instanceof ThumbnailLayer))
        {
            return new ThumbnailLayer(options);
        }
        
        var me = this;

        function init()
        {
            subscribePreloadTopics();
            initSwipe();
        }
        
        function initSwipe()
        {
            var canvas = me.getCanvas();
            canvas.addEventListener("mousedown", mouseDownHandler);
            canvas.addEventListener("mouseup", mouseUpHandler);
            canvas.addEventListener("mousemove", mouseMoveHandler);
            
            var isMouseDown = false;
            var startX;

            function mouseDownHandler(event)
            {
                startX = event.clientX;
                isMouseDown = true;
            }
            
            function mouseUpHandler(event)
            {
                isMouseDown = false;
            }
            
            function mouseMoveHandler(event)
            {
                if (isMouseDown)
                {
                    var deltaX = (startX - event.clientX) * 3;
                    amplify.publish(Topics.THUMBNAILS_SCROLL_X, deltaX);
                }
            }
            
        }
        
        
        function preloadStart(queue)
        {
            console.log("preloadStart");
        }
        
        function preloadComplete()
        {
            unSubscribePreloadTopics();
            console.log("preloadComplete");
        }
        
        function preloadFileStart(item)
        {
            
        }
        
        function preloadFileComplete(item)
        {
            if (item.type === "thumbnail")
            {
                var canvasUtil = new CanvasUtil();
                var imageData = canvasUtil.getImageDataFromTag(item.tag);
                var thumbnail = new Thumbnail({
                    imageData: imageData,
                    index: me.length()
                });
                
                me.addGraphic(thumbnail);
                thumbnail.render();
            }
        }
        
        function subscribePreloadTopics()
        {
            amplify.subscribe(Topics.UPDATE_IMAGE_QUEUE, preloadStart);
            amplify.subscribe(Topics.PRELOADER_FILE_START, preloadFileStart);
            amplify.subscribe(Topics.PRELOADER_FILE_COMPLETE, preloadFileComplete);
            amplify.subscribe(Topics.PRELOADER_COMPLETE, preloadComplete);
        }
        
        function unSubscribePreloadTopics()
        {
            amplify.unsubscribe(Topics.UPDATE_IMAGE_QUEUE, preloadStart);
            amplify.unsubscribe(Topics.PRELOADER_FILE_START, preloadFileStart);
            amplify.unsubscribe(Topics.PRELOADER_FILE_COMPLETE, preloadFileComplete);
            amplify.unsubscribe(Topics.PRELOADER_COMPLETE, preloadComplete);
        }
        
        init();
        
        return this;
    }
    
})();