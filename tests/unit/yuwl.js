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

    describe("yuwlFactory: default protocol tests", function() {
        var yuwl = yuwlFactory();

        it('positive tests', function() {
            [
                'http://www.evil-hackers.org/img.jpg',  //safe 
                'https://www.yahoo.com',                //safe 
                'http://www.yahoo.com/',                //safe
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
                'http://foo"onload="alert(0)'           //safe but dubious link *1
            ].forEach(function(url) {
                expect(yuwl(url)).to.eql(url);
            });
        });

        it('negative tests', function() {
            [
                'javascript:evil();',
                'cid:1234567:111',
                'data:image/jpeg;base64,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=',
                'data:image/png;base64,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=',
                'data:image/gif;base64,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+='
            ].forEach(function(url) {
                expect(yuwl(url)).to.eql('unsafe:' + url);
            });
        });
        
    });


    describe("yuwlFactory: protocol config tests", function() {
        var yuwl = yuwlFactory({protocols:['http', 'https', 'cid'], imgDataURIs: true});

        it('positive tests', function() {
            [
                'http://www.evil-hackers.org/img.jpg',
                'http://www.yahoo.com/',                
                'https://9.com',
                'cid:1234567:111',
                'data:image/jpeg;base64,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=',
                'data:image/png;base64,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=',
                'data:image/gif;base64,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+='
            ].forEach(function(url) {
                expect(yuwl(url)).to.eql(url);
            });
        });

        it('negative tests', function() {
            expect(yuwl('javascript:evil();')).to.eql('unsafe:javascript:evil();');
        });
        
    });


}());
