tests[".each() functionality"] = {
		
		"classical each-loop": {
			
			".each(callback)": function($, test){
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callbackX = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context element?", $x[i], this);
					test.assertEquals("because we are running parallel, all callbackY must be processed after", 0, y);
				};
				var y=0;
				var callbackY = function(i){
					test.assertEquals("wrong order of elements?", y, i);
					y++;
					test.assertEquals("wrong context element?", $x[i], this);
					test.assertEquals("because we are running parallel, all callbackX must be processed before", 3, x);
				};
				var tic = $x.each(callbackX).each(callbackY);
				test.assertEquals("tic object must be original", $x, tic);
				test.assertEquals("callbackX must be triggered for each element", 3, x);
				test.assertEquals("callbackY must be triggered for each element", 3, y);
				test.assertEquals("there must be no .all() without timed .each()", undefined, tic.all);
				test.done();
			},
			
			".wait(timeout).each(callback)": function($, test){
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callbackX = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context element?", $x[i], this);
					test.assertEquals("because we are running parallel, all callbackY must be processed after", 0, y);
				};
				var y=0;
				var callbackY = function(i){
					test.assertEquals("wrong order of elements?", y, i);
					y++;
					test.assertEquals("wrong context element?", $x[i], this);
					test.assertEquals("because we are running parallel, all callbackX must be processed before", 3, x);
				};
				var tic = $x.wait(1).each(callbackX).each(callbackY);
				test.assertNotEquals("tic object must not be original", $x, tic);
				window.setTimeout(function(){
					test.assertEquals("callbackX must be triggered for each element", 3, x);
					test.assertEquals("callbackY must be triggered for each element", 3, y);
					test.done();
				}, 10);
			},
			
		},
		
		"instant each-loop": {
		
			".each().then(callback)": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callbackX = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
					test.assertEquals("because we are running parallel, all callbackY must be processed after", 0, y);
				};
				var y=0;
				var callbackY = function(i){
					test.assertEquals("wrong order of elements?", y, i);
					y++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
					test.assertEquals("because we are running parallel, all callbackX must be processed before", 3, x);
				};
				var tic = $x.each().then(callbackX).then(callbackY);
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callbackX must be triggered for each element", 3, x);
				test.assertEquals("callbackY must be triggered for each element", 3, y);
				var $y = tic.all();
				test.assertEquals("instant .each()..all() must return original object", $x, $y);
				test.done();
			},
	
			".each($).then(callback).all()": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callbackX = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
					test.assertEquals("because we are running serial, all callbackY must be processed step by step", x-1, y);
				};
				var y=0;
				var callbackY = function(i){
					test.assertEquals("wrong order of elements?", y, i);
					y++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
					test.assertEquals("because we are running serial, each callbackX must be processed step by step", y, x);
				};
				var tic = $x.each($).then(callbackX).then(callbackY);
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callbackX must be triggered once for now", 1, x);
				test.assertEquals("callbackY must be triggered once for now", 1, y);
				var $y = tic.all();
				test.assertEquals("instant .each($)..all() must return original object", $x, $y);
				test.assertEquals("callbackX must be triggered for each element", 3, x);
				test.assertEquals("callbackY must be triggered for each element", 3, y);
				test.done();
			},
			
			".each($).then(callback)": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callbackX = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
					test.assertEquals("because we are running serial, all callbackY must be processed step by step", x-1, y);
				};
				var y=0;
				var callbackY = function(i){
					test.assertEquals("wrong order of elements?", y, i);
					y++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
					test.assertEquals("because we are running serial, each callbackX must be processed step by step", y, x);
				};
				var tic = $x.each($).then(callbackX).then(callbackY);
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callbackX must be triggered once for now", 1, x);
				test.assertEquals("callbackY must be triggered once for now", 1, y);
				window.setTimeout(function(){
					test.assertEquals("callbackX must be triggered for each element", 3, x);
					test.assertEquals("callbackY must be triggered for each element", 3, y);
					test.done();
				}, 10);
			},
			
			".each().text().all().get()": function($, test){
				var $x = test.element('<div>foo</div>').add('<p>bar</p>').add('<span>Foo<em>Bar</em></span>');
				test.assertEquals("jQuery's .text() method going wrong??", 'foobarFooBar', $x.text());
				var tic = $x.each().text();
				test.assertNotEquals("each-loop must return TIC object", $x, tic);
				var $y = tic.all();
				test.assertNotEquals("instant .all() must return some jQuery object", tic, $y);
				var array = $y.get();
				test.assertTrue(".get() must return some Array", array instanceof Array);
				test.assertEquals("array has wrong content", 'foo::bar::FooBar', array.join('::'));
				test.done();
			},
			
			".each().data('unknown').all().get()": function($, test){
				var $x = test.element('<div>foo</div>');
				var tic = $x.each().data('unknown');
				test.assertNotEquals("each-loop must return TIC object", $x, tic);
				var $y = tic.all();
				test.assertNotEquals("instant .all() must return some jQuery object", tic, $y);
				var array = $y.get();
				test.assertTrue(".get() must return some Array", array instanceof Array);
				test.assertEquals(".get() must return empty Array", 0, array.length);
				test.done();
			},
			
			"$($(some).each().attr('title')).map(toUpperCase)": function($, test){
				var $x = test.element('<div title="foo">').add('<p title="bar">').add('<span title="Fooo"><em title="Bar"/></span>');
				test.assertEquals("jQuery's .attr() should only find first one", 'foo', $x.attr('title'));
				var tic = $x.each().attr('title');
				test.assertNotEquals("each-loop must return TIC object", $x, tic);
				test.assertEquals("snapshot has wrong content", 'foo::bar::Fooo', $(tic).get().join('::'));
				var $y = test.element(tic).map(String.prototype.toUpperCase);
				test.assertEquals("result has wrong content", 'FOO::BAR::FOOO', $y.get().join('::'));
				test.done();
			},
			
			".each().next().all().end()": function($, test){
				var $x = test.element('<div><div title="foo"></div><p title="bar"></p><span title="Fooo"><em title="Bar"/></span></div>').children();
				test.assertEquals("not enough children", 3, $x.size());
				var tic = $x.each().next();
				test.assertNotEquals("each-loop must return TIC object", $x, tic);
				test.assertEquals("snapshot has wrong size", 2, $(tic).size());
				var $y = tic.all();
				test.assertNotEquals("instant .all() must return some jQuery object", tic, $y);
				test.assertEquals("result has wrong size", 2, $y.size());
				test.assertEquals(".end() must return previous", $x, $y.end());
				test.done();
			},
			
			"$('empty').each().all()": function($, test){
				var $x = $([]);
				var x = 0;
				function callback() {
					x++;
				}
				test.assertEquals("too much elements", 0, $x.size());
				var $y = $x.each().then(callback).all();
				test.assertEquals("instant each-loop must return original object", $x, $y);
				test.assertEquals("callback must have run once", 1, x);
				test.done();
			},
						
		},

		"instant each-loop with delay": {
		
			".each().wait(timeout,callback)": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.each().wait(0,callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for timeout", 0, x);
				window.setTimeout(function(){
					test.assertEquals("callback must be triggered for each element after timeout", 3, x);
					x=0;
					var tic2 = tic.then(callback);
					test.assertEquals("tic object still must not be original", tic, tic2);
					test.assertEquals("callback must be triggered for each element", 3, x);
					test.done();
				}, 10);
			},
	
			".each($).wait(timeout,callback).all()": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.each($).wait(1,callback).all();				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for timeout", 0, x);
				window.setTimeout(function(){
					test.assertEquals("callback must be triggered for each element after timeout", 3, x);
					x=0;
					var $y = tic.then(function(){ x++; });
					test.assertEquals("instant then must return original object", $x, $y);
					test.assertEquals("callback must be triggered once element", 1, x);
					test.done();
				}, 200);
			},
	
			".each($).wait(timeout,callback)": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.each($).wait(1,callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for timeout", 0, x);
				window.setTimeout(function(){
					test.assertEquals("callback must be triggered for each element after timeout", 3, x);
					var $y = tic.then(function(){ x++; });
					test.assertEquals("after open .each($) then works instantly", $x, $y);
					test.assertEquals("callback must be triggered once", 4, x);
					test.done();
				}, 200);
			},
	
			".each().wait(event).then(callback)": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.each().wait('click').then(callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for event", 0, x);
				$x.eq(0).click();
				test.assertEquals("callback must be triggered for first element only", 1, x);
				$x.eq(1).click();
				test.assertEquals("callback must be triggered for second element only", 2, x);
				$x.eq(2).click();
				test.assertEquals("callback must be triggered for third element only", 3, x);
				test.done();
			},
	
		},
		
		"deferred each-loop": {

			".wait(timeout).each().then(callback)": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.wait(0).each().then(callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for timeout", 0, x);
				window.setTimeout(function(){
					test.assertEquals("callback must be triggered for each element", 3, x);
					test.done();
				}, 10);
			},
	
			".repeat(event).each($).then(callback).all()": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var event = 'myEvent';
				var callback = function(i){
					test.assertEquals("single element in event-loop expected", x, i);
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[x], this[0]);
					x++;
				};
				var tic = $x.repeat(event).each($).then(callback).all();				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for event", 0, x);
				$x.eq(0).trigger('myEvent');
				test.assertEquals("callback must be triggered for each element", 3, x);
				x=0;
				$x.eq(1).trigger('myEvent');
				test.assertEquals("callback must be triggered for each element again", 3, x);
				test.done();
			},
	
			".repeat(event).each().then(callback).until(false)": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var event = 'myEvent';
				var callback = function(i){
					test.assertEquals("single element in event-loop expected", x, i);
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[x], this[0]);
					x++;
				};
				var tic = $x.repeat(event).each().then(callback).until(false);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for event", 0, x);
				$x.eq(2).trigger('myEvent');
				test.assertEquals("callback must be triggered for each element", 3, x);
				x=0;
				$x.eq(1).trigger('myEvent');
				test.assertEquals("callback must be triggered for each element again", 3, x);
				test.done();
			},
			
			".repeat(interval).each($).then(callback)": function($, test) {
				var $x = test.element($('<div>').add('<p>').add('<span>'));
				var x=0;
				var interval = 200;
				var callback = function(i){
					x++;
				};
				var tic = $x.repeat(interval,true).each($).then(callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must be called once", 1, x);
				window.setTimeout(function(){
					test.assertEquals("callback must be called once for all three elements", 3, x);
					window.setTimeout(function(){
						test.assertEquals("callback must be called twice for all three elements", 6, x);
						$x.unrepeat();
						test.done();
					}, interval);
				}, interval/2);
			},
	
		},
		
};