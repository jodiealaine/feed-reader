/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Ensure a URL is defined
         * and that the URL is not empty.
         */
         it('has a URL defined and is not empty', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* Ensure a name defined
         * and that the name is not empty.
         */
        it('has a name defined and is not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);        
            });
        });
    });

    describe('The Menu', function() {
        var body = $('body');
        
        /* Ensure the menu element is hidden by default. */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* Ensure the menu changes
         * visibility when the menu icon is clicked. 
         */
        describe('visibility', function() {

            var menuIcon = $('.menu-icon-link');
            beforeEach(function() {
                menuIcon.click();
            });

            it('is displayed when the menu icon is clicked', function() {
                expect(body.hasClass('menu-hidden')).toBe(false);
            });

            it('is hidden when the menu icon is clicked again', function() {
                expect(body.hasClass('menu-hidden')).toBe(true);
            });
        });
    });
             
    describe('Initial Entries', function() {
        /* Ensure the loadFeed function is called and completes its work, 
         * there is at least a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least a single entry element', function() {
            expect($('.feed').has('.entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        /* Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var firstFeed,
            secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done();
                });
            }); 
        });

        it('content has changed', function() {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());
