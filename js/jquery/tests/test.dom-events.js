function unbind() {
	var $q = Array.prototype.shift.apply(arguments);
	return $q.unbind.apply($q, arguments);
}

tests["dom events functionality"] = {
		
		"binding click event - classical style": {
		
			".click(handler) + .unbind/.off('click')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				unbind($x,'click');
				test.assertEquals("event must not trigger on .unbind/.off", 0, x);
				$x.click();
				test.assertEquals("because of .unbind/.off trigger must not happen", 0, x);
				$x.click();
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".click(handler) + .unbind/.off('click',handler)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				unbind($x,'click',handler);
				test.assertEquals("event must not trigger on .unbind/.off", 0, x);
				$x.click();
				test.assertEquals("because of .unbind/.off trigger must not happen", 0, x);
				$x.click();
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".click(handler) + .unbind/.off('click',otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				unbind($x,'click', function(){x++;});
				test.assertEquals("event must not trigger on .unbind/.off", 0, x);
				$x.click();
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.click();
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".click(handler) + .click() + .unbind/.off('click')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				unbind($x,'click');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.click();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.click();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".click(handler) + .click() + .unbind/.off('click',handler)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				unbind($x,'click', handler);
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.click();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.click();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".click(handler) + .click() + .unbind/.off('click',otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				unbind($x,'click', function(){x++;});
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.click();
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.click();
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

		},
		
		"binding click event with data - classical style": {
			
			_version: ['1.4.3'],
			
			".click(data,handler) + .unbind/.off('click')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				unbind($x,'click');
				test.assertEquals("event must not trigger on .unbind/.off", 0, x);
				$x.click();
				test.assertEquals("because of .unbind/.off trigger must not happen", 0, x);
				$x.click();
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".click(data,handler) + .unbind/.off('click',handler)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				unbind($x,'click',handler);
				test.assertEquals("event must not trigger on .unbind/.off", 0, x);
				$x.click();
				test.assertEquals("because of .unbind/.off trigger must not happen", 0, x);
				$x.click();
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".click(data,handler) + .unbind/.off('click',otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				unbind($x,'click', function(){x++;});
				test.assertEquals("event must not trigger on .unbind/.off", 0, x);
				$x.click();
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.click();
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".click(data,handler) + .click() + .unbind/.off('click')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				unbind($x,'click');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.click();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.click();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".click(data,handler) + .click() + .unbind/.off('click',handler)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				unbind($x,'click', handler);
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.click();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.click();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".click(data,handler) + .click() + .unbind/.off('click',otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				unbind($x,'click', function(){x++;});
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.click();
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.click();
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

		},
		
		"binding other DOM events - classical style": {

			".blur(handler) + .blur() + .unbind/.off('blur')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.blur(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.blur();
				test.assertEquals("first trigger should fire", 1, x);
				$x.blur();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'blur');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.blur();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.blur();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".focus(handler) + .focus() + .unbind/.off('focus')||1.8.99": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.focus(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.focus();
				test.assertEquals("first trigger should fire", 1, x);
				$x.focus();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'focus');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.focus();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.focus();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".load(handler) + .load() + .unbind/.off('load')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.load(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.load();
				test.assertEquals("first trigger should fire", 1, x);
				$x.load();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'load');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.load();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.load();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".resize(handler) + .resize() + .unbind/.off('resize')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.resize(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.resize();
				test.assertEquals("first trigger should fire", 1, x);
				$x.resize();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'resize');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.resize();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.resize();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".scroll(handler) + .scroll() + .unbind/.off('scroll')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.scroll(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.scroll();
				test.assertEquals("first trigger should fire", 1, x);
				$x.scroll();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'scroll');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.scroll();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.scroll();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".unload(handler) + .unload() + .unbind/.off('unload')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.unload(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unload();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unload();
				if (compareVersion($.fn.jquery,'1.7.0') >= 0) {	x--; }
				test.assertEquals("trigger should fire again", 1, x);
				unbind($x,'unload');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.unload();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.unload();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".dblclick(handler) + .dblclick() + .unbind/.off('dblclick')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.dblclick(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.dblclick();
				test.assertEquals("first trigger should fire", 1, x);
				$x.dblclick();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'dblclick');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.dblclick();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.dblclick();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mousedown(handler) + .mousedown() + .unbind/.off('mousedown')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mousedown(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mousedown();
				test.assertEquals("first trigger should fire", 1, x);
				$x.mousedown();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mousedown');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mousedown();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.mousedown();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mouseup(handler) + .mouseup() + .unbind/.off('mouseup')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mouseup(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseup();
				test.assertEquals("first trigger should fire", 1, x);
				$x.mouseup();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mouseup');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mouseup();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.mouseup();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mousemove(handler) + .mousemove() + .unbind/.off('mousemove')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mousemove(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mousemove();
				test.assertEquals("first trigger should fire", 1, x);
				$x.mousemove();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mousemove');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mousemove();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.mousemove();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mouseover(handler) + .mouseover() + .unbind/.off('mouseover')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mouseover(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseover();
				test.assertEquals("first trigger should fire", 1, x);
				$x.mouseover();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mouseover');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mouseover();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.mouseover();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mouseout(handler) + .mouseout() + .unbind/.off('mouseout')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mouseout(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseout();
				test.assertEquals("first trigger should fire", 1, x);
				$x.mouseout();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mouseout');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mouseout();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.mouseout();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".change(handler) + .change() + .unbind/.off('change')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.change(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.change();
				test.assertEquals("first trigger should fire", 1, x);
				$x.change();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'change');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.change();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.change();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".select(handler) + .select() + .unbind/.off('select')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.select(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.select();
				test.assertEquals("first trigger should fire", 1, x);
				$x.select();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'select');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.select();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.select();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".submit(handler) + .submit() + .unbind/.off('submit')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.submit(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.submit();
				test.assertEquals("first trigger should fire", 1, x);
				$x.submit();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'submit');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.submit();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.submit();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".keydown(handler) + .keydown() + .unbind/.off('keydown')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.keydown(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keydown();
				test.assertEquals("first trigger should fire", 1, x);
				$x.keydown();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'keydown');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.keydown();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.keydown();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".keypress(handler) + .keypress() + .unbind/.off('keypress')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.keypress(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keypress();
				test.assertEquals("first trigger should fire", 1, x);
				$x.keypress();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'keypress');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.keypress();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.keypress();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".keyup(handler) + .keyup() + .unbind/.off('keyup')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.keyup(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keyup();
				test.assertEquals("first trigger should fire", 1, x);
				$x.keyup();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'keyup');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.keyup();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.keyup();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".error(handler) + .error() + .unbind/.off('error')": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.error(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.error();
				test.assertEquals("first trigger should fire", 1, x);
				$x.error();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'error');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.error();
				test.assertEquals("because of .unbind/.off trigger must not happen", 1, x);
				$x.error();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

		},

		"binding DOM event - timed invocation chain style": {
			
			".click($).doSomething() + .click()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.click($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("trigger should fire", 1, x);
				$x.click();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'click');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.click();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".blur($).doSomething() + .blur()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.blur($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.blur();
				test.assertEquals("trigger should fire", 1, x);
				$x.blur();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'blur');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.blur();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".focus($).doSomething() + .focus()||1.8.99": function($, test) {
				var $x = test.element('<input>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.focus($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.focus();
				test.assertEquals("trigger should fire", 1, x);
				$x.focus();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'focus');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.focus();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".load($).doSomething() + .load()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.load($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.load();
				test.assertEquals("trigger should fire", 1, x);
				$x.load();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'load');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.load();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".resize($).doSomething() + .resize()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.resize($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.resize();
				test.assertEquals("trigger should fire", 1, x);
				$x.resize();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'resize');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.resize();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".scroll($).doSomething() + .scroll()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.scroll($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.scroll();
				test.assertEquals("trigger should fire", 1, x);
				$x.scroll();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'scroll');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.scroll();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".unload($).doSomething() + .unload()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.unload($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unload();
				test.assertEquals("trigger should fire", 1, x);
				$x.unload();
				if (compareVersion($.fn.jquery,'1.7.0') >= 0) {	x--; }
				test.assertEquals("trigger should fire again", 1, x);
				unbind($x,'unload');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.unload();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".dblclick($).doSomething() + .dblclick()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.dblclick($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.dblclick();
				test.assertEquals("trigger should fire", 1, x);
				$x.dblclick();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'dblclick');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.dblclick();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".mousedown($).doSomething() + .mousedown()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mousedown($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mousedown();
				test.assertEquals("trigger should fire", 1, x);
				$x.mousedown();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mousedown');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mousedown();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".mouseup($).doSomething() + .mouseup()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mouseup($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseup();
				test.assertEquals("trigger should fire", 1, x);
				$x.mouseup();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mouseup');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mouseup();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".mousemove($).doSomething() + .mousemove()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mousemove($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mousemove();
				test.assertEquals("trigger should fire", 1, x);
				$x.mousemove();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mousemove');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mousemove();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".mouseover($).doSomething() + .mouseover()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mouseover($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseover();
				test.assertEquals("trigger should fire", 1, x);
				$x.mouseover();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mouseover');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mouseover();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".mouseout($).doSomething() + .mouseout()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mouseout($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseout();
				test.assertEquals("trigger should fire", 1, x);
				$x.mouseout();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'mouseout');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.mouseout();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".change($).doSomething() + .change()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.change($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.change();
				test.assertEquals("trigger should fire", 1, x);
				$x.change();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'change');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.change();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".select($).doSomething() + .select()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.select($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.select();
				test.assertEquals("trigger should fire", 1, x);
				$x.select();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'select');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.select();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".submit($).doSomething() + .submit()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.submit($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.submit();
				test.assertEquals("trigger should fire", 1, x);
				$x.submit();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'submit');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.submit();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".keydown($).doSomething() + .keydown()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.keydown($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keydown();
				test.assertEquals("trigger should fire", 1, x);
				$x.keydown();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'keydown');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.keydown();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".keypress($).doSomething() + .keypress()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.keypress($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keypress();
				test.assertEquals("trigger should fire", 1, x);
				$x.keypress();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'keypress');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.keypress();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".keyup($).doSomething() + .keyup()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.keyup($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keyup();
				test.assertEquals("trigger should fire", 1, x);
				$x.keyup();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'keyup');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.keyup();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

			".error($).doSomething() + .error()": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.error($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.error();
				test.assertEquals("trigger should fire", 1, x);
				$x.error();
				test.assertEquals("trigger should fire again", 1, --x);
				unbind($x,'error');
				test.assertEquals("event must not trigger on .unbind/.off", 1, x);
				$x.error();
				test.assertEquals("because of .unbind/.off trigger must not happen again", 1, x);
				test.done();
			},

		},
		
		"access original context": {
			
			"$(some).blur($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.blur($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.blur();
				test.assertEquals("later action must have happened after .blur()", 'later', $x.text());
				test.done();
			},

			"$(some).focus($).doThisLater()._.doThatNow()||1.8.99": function($, test){
				var $x = test.element('<input>');
				$x.focus($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.focus();
				test.assertEquals("later action must have happened after .focus()", 'later', $x.text());
				test.done();
			},

			"$(some).load($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.load($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.load();
				test.assertEquals("later action must have happened after .load()", 'later', $x.text());
				test.done();
			},

			"$(some).resize($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.resize($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.resize();
				test.assertEquals("later action must have happened after .resize()", 'later', $x.text());
				test.done();
			},

			"$(some).scroll($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.scroll($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.scroll();
				test.assertEquals("later action must have happened after .scroll()", 'later', $x.text());
				test.done();
			},

			"$(some).unload($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.unload($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.unload();
				test.assertEquals("later action must have happened after .unload()", 'later', $x.text());
				test.done();
			},
			
			"$(some).click($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.click($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.click();
				test.assertEquals("later action must have happened after .click()", 'later', $x.text());
				test.done();
			},

			"$(some).dblclick($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.dblclick($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.dblclick();
				test.assertEquals("later action must have happened after .dblclick()", 'later', $x.text());
				test.done();
			},

			"$(some).mousedown($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.mousedown($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mousedown();
				test.assertEquals("later action must have happened after .mousedown()", 'later', $x.text());
				test.done();
			},

			"$(some).mouseup($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.mouseup($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mouseup();
				test.assertEquals("later action must have happened after .mouseup()", 'later', $x.text());
				test.done();
			},

			"$(some).mousemove($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.mousemove($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mousemove();
				test.assertEquals("later action must have happened after .mousemove()", 'later', $x.text());
				test.done();
			},

			"$(some).mouseover($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.mouseover($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mouseover();
				test.assertEquals("later action must have happened after .mouseover()", 'later', $x.text());
				test.done();
			},

			"$(some).mouseout($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.mouseout($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mouseout();
				test.assertEquals("later action must have happened after .mouseout()", 'later', $x.text());
				test.done();
			},

			"$(some).change($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.change($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.change();
				test.assertEquals("later action must have happened after .change()", 'later', $x.text());
				test.done();
			},

			"$(some).select($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.select($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.select();
				test.assertEquals("later action must have happened after .select()", 'later', $x.text());
				test.done();
			},

			"$(some).submit($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.submit($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.submit();
				test.assertEquals("later action must have happened after .submit()", 'later', $x.text());
				test.done();
			},

			"$(some).keydown($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.keydown($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.keydown();
				test.assertEquals("later action must have happened after .keydown()", 'later', $x.text());
				test.done();
			},

			"$(some).keypress($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.keypress($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.keypress();
				test.assertEquals("later action must have happened after .keypress()", 'later', $x.text());
				test.done();
			},

			"$(some).keyup($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.keyup($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.keyup();
				test.assertEquals("later action must have happened after .keyup()", 'later', $x.text());
				test.done();
			},

			"$(some).error($).doThisLater()._.doThatNow()": function($, test){
				var $x = test.element('<div>');
				$x.error($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.error();
				test.assertEquals("later action must have happened after .error()", 'later', $x.text());
				test.done();
			},

		},

};