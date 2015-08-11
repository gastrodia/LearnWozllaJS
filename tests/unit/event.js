describe('event', function(){

    it('listen & dispatch', function(){
        var result = [];
        var dispatcher = new WOZLLA.event.EventDispatcher();
        dispatcher.addListener('test', function(e) {
            result.push(e.type + ' bubble');
        });
        dispatcher.addListener('test', function(e) {
            result.push(e.type + ' capture');
        }, true);
        dispatcher.dispatchEvent(new WOZLLA.event.Event('test', true));
        expect(result).toEqual([
            'test capture',
            'test bubble'
        ]);
    });

});