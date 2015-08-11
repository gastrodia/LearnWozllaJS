describe('core director', function(){

    var director;

    beforeEach(function() {
        var canvas = document.createElement('canvas');
        director = new WOZLLA.Director(canvas);

        spyOn(director, 'runStep');
    });

    afterEach(function() {
        director.stop();
    });

    it('start()', function(done){
        director.start();
        expect(director.isStarted()).toBeTruthy();
        setTimeout(function() {
            expect(director.runStep).toHaveBeenCalled();
            done();
        }, 1000);
    });

    it('director stop()', function(done){
        director.start();
        director.stop();
        expect(director.isStarted()).toBeFalsy();
        setTimeout(function() {
            expect(director.runStep.calls.count()).toBe(0);
            done();
        }, 500);
    });

    it('pause()', function(done){
        director.start();
        director.pause();
        setTimeout(function() {
            expect(director.runStep.calls.count()).toBe(0);
            done();
        }, 500);
    });

    it('resume()', function(done){
        director.start();
        director.pause();
        expect(director.isPaused()).toBeTruthy();
        setTimeout(function() {
            expect(director.runStep).toHaveBeenCalled();
            done();
        }, 2000);
        setTimeout(function() {
            director.resume();
        });
    });

    it('time scale', function(done) {
        var timeScale = 2;
        director.timeScale = timeScale;
        director.start();

        var repeatTime = 5;
        var interval = setInterval(function() {
            if(repeatTime-- <= 0) {
                clearInterval(interval);
                done();
                return;
            }
            expect(director.deltaTime).toBe(director.realDeltaTime*timeScale);
            expect(director.now).toBe((director.realNow-director.realStartTime)*timeScale);
        }, 200);
    });
});