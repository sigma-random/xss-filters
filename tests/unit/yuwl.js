/*
Copyright (c) 2015, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.

Authors: Nera Liu <neraliu@yahoo-inc.com>
         Adonis Fung <adon@yahoo-inc.com>
         Albert Yu <albertyu@yahoo-inc.com>
*/
(function() {

    var priv = xssFilters._privFilters;
    console.log(priv);
    var yuwlFactory = priv.yuwlFactory;

    describe("yuwlFactory: existence tests", function() {

        it('yuwlFactory exists', function() {
            expect(yuwlFactory).to.be.ok();
        });
        
    });

    describe("yuwlFactory: protocol tests", function() {
        var yuwl = yuwlFactory();

        it('positive tests', function() {
            [
                'http://www.yahoo.com/',                //add blank target
                'http://9.com',                         //safe but dubious link
                'http://9.com/foo',                     //safe but dubious link
                'http://9.com?foo',                     //safe but dubious link with args
                'http://9.com:80',                      //safe but dubious link with ports
                'http://127.0.0.1.com',                 //safe but dubious link
                'http://127.0.0.1.com/',                //safe but dubious link
                'http://127.0.0.1.com?foo',             //safe but dubious link with args
                'http://127.0.0.1.com:80',              //safe but dubious link with ports
                'http://0x43.0.0x11.com/',              //safe but dubious link
                'http://0x43.0.0x11.com/',              //safe but dubious link
                'http://0x43.0.0x11.com/',              //safe but dubious link with args
                'http://0x43.0.0x11.com/',              //safe but dubious link with ports
                'http://12798120-foo.com',              //safe but dubious decimal link
                'http://0x127981foo.com',               //safe but dubious hex link
            ].forEach(function(url) {
                expect(yuwl(url)).to.eql(url);
            });
        });
        
    });


}());
