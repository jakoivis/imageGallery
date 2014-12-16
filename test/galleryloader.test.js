describe("galleryLoader", function() {
    
    var TIMEOUT = 100;
    
    var subscribeSpy;
    var loader;
    var expected;
    var actual;
    
    function getImages() {
        return [
            {
                image: 'assets/images/img.jpg',
                tb: 'assets/images/tb200.jpg'
            },
            {
                image: 'assets/images/img-2.jpg',
                tb: 'assets/images/tb200-2.jpg'
            },
            {
                image: 'assets/images/img-3.jpg',
                tb: 'assets/images/tb200-3.jpg'
            },
            {
                image: 'assets/images/img-4.jpg',
                tb: 'assets/images/tb200-4.jpg'
            }
        ];  
    }
    
    beforeEach(function(){
        subscribeSpy = jasmine.createSpy('subscribe');
    });
 
    afterEach(function() {
    });
 
    describe("Topics are published", function() {
        
        it(Topics.UPDATE_IMAGE_QUEUE + " topic is published when initializing", function() {
            loadAndSpyTopic(Topics.UPDATE_IMAGE_QUEUE);
            
            expect(subscribeSpy).toHaveBeenCalled();
        });
        
        it(Topics.PRELOADER_COMPLETE + " topic is published when loading is complete", function() {
            loadAndSpyTopic(Topics.PRELOADER_COMPLETE);
            waitForComplete(loader);
            
            runs(function () {
                expect(subscribeSpy).toHaveBeenCalled();
            });
        });
        
        it(Topics.PRELOADER_FILE_COMPLETE + " topic is published for each file complete", function() {
            loadAndSpyTopic(Topics.PRELOADER_FILE_COMPLETE);
            waitForComplete(loader);
            
            runs(function () {
                expect(subscribeSpy.callCount).toEqual(8);
            });
        });
        
        it(Topics.PRELOADER_FILE_START + " topic is published for each file start", function() {
            loadAndSpyTopic(Topics.PRELOADER_FILE_START);
            waitForComplete(loader);
            
            runs(function () {
                expect(subscribeSpy.callCount).toEqual(8);
            });
        });
    });
    
    describe("Topic arguments", function() {
        
        it(Topics.UPDATE_IMAGE_QUEUE + " queue length is correct", function() {
            loadAndSpyTopic(Topics.UPDATE_IMAGE_QUEUE);
            
            var queue = subscribeSpy.mostRecentCall.args[0];

            expect(queue.length).toEqual(8);
        });
        
        it(Topics.UPDATE_IMAGE_QUEUE + " queueItem src", function() {
            loadAndSpyTopic(Topics.UPDATE_IMAGE_QUEUE);
            
            var queue = subscribeSpy.mostRecentCall.args[0];
            var expectedImages = [
                'assets/images/tb200.jpg',
                'assets/images/img.jpg',
                'assets/images/tb200-2.jpg',
                'assets/images/img-2.jpg',
                'assets/images/tb200-3.jpg',
                'assets/images/img-3.jpg',
                'assets/images/tb200-4.jpg',
                'assets/images/img-4.jpg',
            ];  
            
            for(var i = 0; i < queue.length; i++) {
                expected = expectedImages[i];
                actual = queue.get(i).src;
                expect(actual).toEqual(expected);
            }
        });
        
        it(Topics.UPDATE_IMAGE_QUEUE + " queueItem type", function() {
            loadAndSpyTopic(Topics.UPDATE_IMAGE_QUEUE);
            
            var queue = subscribeSpy.mostRecentCall.args[0];
            
            for(var i = 0; i < queue.length; i++) {
                // every second is thumbnail and every second is image type
                expected = i % 2 === 0 ? "thumbnail" : "image";
                actual = queue.get(i).type;
                expect(actual).toEqual(expected);
            }
        });
        
        it(Topics.UPDATE_IMAGE_QUEUE + " queueItem counterpartIndex", function() {
            loadAndSpyTopic(Topics.UPDATE_IMAGE_QUEUE);
            
            var queue = subscribeSpy.mostRecentCall.args[0];
            var expectedIndices = [1,0,3,2,5,4,7,6];
            
            for(var i = 0; i < queue.length; i++) {
                // check the cross-reference indices for thumbnail and image objects
                expected = expectedIndices[i];
                actual = queue.get(i).counterpartIndex;
                expect(actual).toEqual(expected);
            }
        });  
    });
    
    function waitForComplete(galleryLoader, timeout) {
        waitsFor(function() {
            return galleryLoader.isComplete();
        }, "all files to load", timeout || TIMEOUT);
    }
    
    function loadAndSpyTopic(topic) {
        amplify.subscribe(topic, subscribeSpy);
        loader = new GalleryLoader(getImages());
    }

});