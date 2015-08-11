describe('core scheduler', function(){

    var schedulerHelper;
    var scheduler;

    beforeEach(function() {
        scheduler = new WOZLLA.Scheduler();
        schedulerHelper = {
            func: function() {}
        };

        spyOn(schedulerHelper, 'func');
    });

    it('scheduleTime()', function(){
        var schedulerId = scheduler.scheduleTime(schedulerHelper.func, 1000);
        for(var i=0; i<10; i++) {
            scheduler.runSchedule(101);
        }
        expect(schedulerHelper.func.calls.count()).toBe(1);
        expect(scheduler.hasSchedule(schedulerId)).toBe(false);
    });

    it('scheduleFrame()', function(){
        var schedulerId = scheduler.scheduleFrame(schedulerHelper.func, 2);
        for(var i=0; i<3; i++) {
            scheduler.runSchedule(10);
        }
        expect(schedulerHelper.func.calls.count()).toBe(1);
        expect(scheduler.hasSchedule(schedulerId)).toBe(false);
    });

    it('scheduleInterval()', function() {
        var callTime = 3;
        var schedulerId = scheduler.scheduleInterval(schedulerHelper.func, 100);
        for(var i=0; i<callTime; i++) {
            scheduler.runSchedule(101);
        }
        expect(schedulerHelper.func.calls.count()).toBe(callTime);
        expect(scheduler.hasSchedule(schedulerId)).toBe(true);

        scheduler.removeSchedule(schedulerId);
        expect(scheduler.hasSchedule(schedulerId)).toBe(false);

    });

    it('scheduleLoop()', function() {
        var callTime = 5;
        var schedulerId = scheduler.scheduleLoop(schedulerHelper.func);
        for(var i=0; i<callTime; i++) {
            scheduler.runSchedule(17);
        }
        expect(schedulerHelper.func.calls.count()).toBe(callTime);
        expect(scheduler.hasSchedule(schedulerId)).toBe(true);

        scheduler.removeSchedule(schedulerId);
        expect(scheduler.hasSchedule(schedulerId)).toBe(false);
    });

    it('pauseSchedule() & resumeSchedule()', function() {
        var callTime = 5;
        var pauseIndex = 2;
        var resumeIndex = 4;
        var schedulerId = scheduler.scheduleLoop(schedulerHelper.func);

        for(var i=0; i<callTime; i++) {
            if(i == pauseIndex) {
                scheduler.pauseSchedule(schedulerId);
            }
            if(i === resumeIndex) {
                scheduler.resumeSchedule(schedulerId);
            }
            scheduler.runSchedule(17);
        }
        expect(schedulerHelper.func.calls.count()).toBe(pauseIndex + callTime - resumeIndex);
        expect(scheduler.hasSchedule(schedulerId)).toBe(true);

        scheduler.removeSchedule(schedulerId);
        expect(scheduler.hasSchedule(schedulerId)).toBe(false);
    });

    it('nest schedule', function() {
        scheduler.scheduleTime(function() {
            scheduler.scheduleFrame(schedulerHelper.func, -1);
        }, 200);
        scheduler.scheduleTime(function() {
            scheduler.scheduleLoop(function() {
                scheduler.scheduleFrame(schedulerHelper.func, -1);
            });
        }, 200);
        scheduler.runSchedule(201);
        expect(schedulerHelper.func.calls.count()).toBe(0);
    });
});