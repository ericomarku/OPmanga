var home = true;
var ready = false;
var singlePage = true;
var password = false;

var covers = 92;

var manga = "One Piece"

var page, cpage, volumenumber, chapternumber, pagenumber;

var posV, posC, posP;

function storage(witch) {
	var val = localStorage.getItem(manga + '_' + witch);
	return Number(val);
}

function storing(witch, val) {
	localStorage.setItem(manga + '_' + witch, val);
}

if (localStorage.getItem(manga + "_page") === null) {
	storing("page", 1);
}
if (localStorage.getItem(manga + "_cpage") === null) {
	storing("cpage", 1);
}

function clearConsole() {
	console.clear()
};



$(function() {
	var chnavi = [];
	var volnavi = [];

	$(document).ready(function () {
		$('#menubar').delay(4000).animate({
			top: '0px'
		}, 3500, "swing", "callback");
		$('body').delay(4000).css('overflow-y','scroll').animate({scrollTop: 0}, 0);
		$('#covergrid').delay(3000).animate({
			'margin-top': '6.3vw'
		}, 6000, "swing", "callback");
		$('.volumecoverframe').delay(4500).fadeIn(3500).wait(6500, function () {
			ready = true;
			$('#covergrid').css('pointer-events', 'auto');
			$('::-webkit-scrollbar').animate({
				'width': '10px'
			}, 1000, "swing", "callback");
			$('#credit').show();
		});;
	});

	arraymaker()

	bubblemaker()

	whellmaker()

	function arraymaker() {
		var output = 0;
		for (var i = 0; i < mainchnavi.length; i++) {
			output = output + mainchnavi[i];
			chnavi.push(output);
			volindex = fchprvol.findIndex(j => j > i) - 1;
			if (i == fchprvol[volindex]){
				volnavi.push(output);
			}
		}
		volnavi.push(output + 1);
	}

	function bubblemaker() {
		var colums = 5;
		var rows = (volnavi.length-2) / colums;
		var lastrowscolums = (rows * 5) % 5;

		function adding(number) {
			var nr = number * colums;
			var fs;

			var add = '';

			if (nr == volnavi.length - 2 - lastrowscolums) {
				if (lastrowscolums == 1) {
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
					adder(1);
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
				} else if (lastrowscolums == 2) {
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
					adder(1);
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
					adder(2);
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
				} else if (lastrowscolums == 3) {
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
					adder(1);
					adder(2);
					adder(3);
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
				} else if (lastrowscolums == 4) {
					adder(1);
					adder(2);
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
					adder(3);
					adder(4);
				}
			} else {
				for (var j = 1; j <= colums; j++) {
					adder(j);
				}
			}

			function adder(colum) {
				if (nr + colum < 10) {
					fs = '9.5vw';
				} else if (nr + colum < 100) {
					fs = '8vw';
				} else {
					fs = '6.5vw';
				}
				if (nr + colum <= covers) {
					add = add + '<td><div class="volumecoverframe"><div class="shadowdiv"></div><button class="volumecover" data-cover="'+(nr+colum)+'" ><img src="img/op manga/Volume_'+(nr+colum)+'.png"  width="100%" class="cover"/><div class="number" style="font-size:'+fs+';" id="'+(nr+colum)+'"></div></button></div></td>';
				} else if (nr + colum > volnavi.length - 2) {
					add = add + '<td><div class="volumecoverframe noshow"></div></td>';
				} else {
					add = add + '<td><div class="volumecoverframe"><div class="shadowdiv"></div><button class="volumecover" data-cover="'+(nr+colum)+'"><img src="img/op manga/Placeholder.png" width="100%" class="cover"/><div class="number" style="font-size:'+fs+';" id="'+(nr+colum)+'"></div></button></div></td>';
				}
			}

			return add;
		}

		for (var i = 0; i < rows; i++) {
			$('#covergrid').append('<tr>' + adding(i) + '</tr>');
		}

		// $('#covergrid').append('<tr><td id="credit" colspan="' + colums + '"><p>' + 'One Piece is written by Eiichiro Oda.<br>Published by Shueisha and Viz Media in Weekly Shonen Jump.<br>Please support the official release.' + '</p></td></tr>');
	}


	function whellmaker() {
		for (var i = 1; i < volnavi.length - 1; i++) {
			$("#volumewhell").append('<li><button class="volumewhellbtn vcpbtn" data-vol="' + i + '">' + i + '</button></li>');
		}
		$("#volumewhell").append('<li style="height:30px"></liv>');

		for (var i = 1; i < chnavi.length - 2; i++) {
			$("#chapterwhell").append('<li><button class="chapterwhellbtn vcpbtn" data-chap="' + i + '">' + i + '</button></li>');
		}
		$("#chapterwhell").append('<li style="height:30px"></li>');

		for (var i = 1; i <= 52; i++) {
			$("#pagewhell").append('<li><button class="pagewhellbtn vcpbtn" data-page="' + i + '">' + i + '</button></li>');
		}
		$("#pagewhell").append('<li style="height:30px"></li>');
	}

	let lastime;
	function whellbtnhidder() {
		if (lastime != chapternumber) {
			$('.pagewhellbtn').parent().show()

			for (var i = mainchnavi[chapternumber + 1] + 1; i <= 52; i++) {
				$('[data-page="'+ i +'"]').parent().hide();
			}
		}

		lastime = chapternumber;

		if (chapternumber < chnavi.length - 2) {
			$('#pagebox').show();
		} else {
			$('#pagebox').hide();
		}

		$("#volumewhell").scrollTop(0);
		$("#chapterwhell").scrollTop(0);
		$("#pagewhell").scrollTop(0);

		posV = $('[data-vol="'+ volumenumber +'"]').parent().offset().top - $('[data-vol="'+ volumenumber +'"]').parent().parent().offset().top;
		if (chapternumber < chnavi.length - 2) {
			posC = $('[data-chap="'+ chapternumber +'"]').parent().offset().top - $('[data-chap="'+ chapternumber +'"]').parent().parent().offset().top;
		} else {
			posC = $('[data-chap="'+ (chapternumber - 1) +'"]').parent().offset().top - $('[data-chap="'+ (chapternumber - 1) +'"]').parent().parent().offset().top;
		}
		posP = $('[data-page="'+ Number(pagenumber) +'"]').parent().offset().top - $('[data-page="'+ Number(pagenumber) +'"]').parent().parent().offset().top;
	}

	$('.vcpbox').mouseenter(function () {
		$("#volumewhell").scrollTop(posV);
		$("#chapterwhell").scrollTop(posC);
		$("#pagewhell").scrollTop(posP);
	})

	function findframe(event) {
		mouseX = event.pageX;
		mouseY = event.pageY;
		framewidth = $('.framed').width()
		frameheight = $('.framed').height()
		frameoffset = $('.framed').offset()
		if (mouseX >= frameoffset.left && mouseX <= frameoffset.left + framewidth && mouseY >= frameoffset.top && mouseY <= frameoffset.top + frameheight) {
			return true;
		}
		return false;
	}

	$(document).on('click', function () {
		$(this).blur();
	});

	for (var i = 0; i < 1; i++) {
		var count = 0;
		var randomBubbles = [];
		covers = $(".volumecover").length;

		setInterval(function () {
			count++;
			if (home && ready) {
				var randomBubble = Math.floor((Math.random() * covers) + 1);

				while (randomBubbles.includes(randomBubble) || randomBubbles.includes(randomBubble + 1, randomBubble -1) || randomBubbles.includes(randomBubble + 5, randomBubble -5)) {
					var coin = Math.random()
					if (coin < 0.5) {
						randomBubble += Math.floor((Math.random() * 2) + 3);
					} else {
						randomBubble -= Math.floor((Math.random() * 2) + 3);
					}
					if (randomBubble <= 0) {
						randomBubble += covers + 1;
					}
					if (randomBubble > covers + 1) {
						randomBubble -= covers + 1;
					}
				}

				randomBubbles.push(randomBubble);

				where = $(".volumecover[data-cover='" + randomBubble + "']").parent();

				if (Math.random() < 0.5) {
					where.wait(200).toggleClass('moveRandom').wait(2000).toggleClass('moveRandom').wait(0, function () {
						randomBubbles.splice(0, 1);
					});
				} else {
					where.wait(200).toggleClass('moveModnar').wait(2000).toggleClass('moveModnar').wait(0, function () {
						randomBubbles.splice(0, 1);
					});
				}

				while (randomBubbles.length > 5) {
					randomBubbles.splice(0, 1);
				}
			}


			if (count == 1) {
				i=-1;
			}
		}, 500)
	}


	$(document).click(function (e) {
		if (e.target.id == "typechap") {
			$("#menu").addClass("onNow");
		} else {
			$("#menu").removeClass("onNow");
		}
	});

	$('.volumecover').mouseenter(function() {
		var cover = $(this).attr('data-cover');
		var number = '#' + cover;
		$(number).html(cover).fadeIn("slow");
	});

	$('.volumecover').mouseleave(function() {
		var cover = $(this).attr('data-cover');
		var number = '#' + cover;
		$(number).html("").fadeOut("slow");
	});






	function update(indput_page, indput_cpage) {
		var path;
		home = false;
		page = indput_page;
		cpage = indput_cpage;

		chindex = chnavi.findIndex(i => i > page);
		chapternumber = chindex - 1;
		volindex = volnavi.findIndex(i => i > page);
		volumenumber = volindex - 1;

		if (page == chnavi[chapternumber]) {
			cpage = 1;
		}

		if (cpage < 10) {
			pagenumber = "0" + cpage;
		} else {
			pagenumber = "" + cpage;
		}

		$('#frame').empty();

		if (password || chapternumber > chnavi.length - 6) {
			if (singlePage) {
				path = 'Manga/'+ manga +' Vol. '+ volumenumber +'/'+ manga +' '+ chapternumber +'/'+ pagenumber;
				framing(path);
			} else {
				for (var i = 1; i < mainchnavi[chapternumber + 1] + 1; i++) {
					var chapage
					if (i < 10) {
						chapage = "0" + i;
					} else {
						chapage = "" + i;
					}
					path = 'Manga/'+ manga +' Vol. '+ volumenumber +'/'+ manga +' '+ chapternumber +'/'+ chapage;
					framing(path);
				}
			}
		} else {
			path = 'img/op manga/needpassword'
			framing(path);
		}

		$('#volnr').html("<p>Volume</p><p class='nr'>" + volumenumber + "</p>");
		$('#chnr').html("<p>Chapter</p><p class='nr'>" + chapternumber + "</p>");
		$('#pagenr').html("<p>Page</p><p class='nr'>" + cpage + "</p>");

		$('body,html').animate({scrollTop: 0}, 0);

		$('#home').hide();

		storing("page", page);
		storing("cpage", cpage);
		whellbtnhidder()
	};

	function framing(path) {
		var src = path + '.jpg';
		var error = "this.src='"+ path + ".png" +"'";
		var frame = $('#frame');

		if(page == chnavi[chnavi.length - 2]){
			frame.append('<img class="framed" src="img/op manga/to be continued.jpg"/><br>');
		} else {
			frame.append('<img class="framed" src="' + path + '.jpg"/><br>');
		};

		var framed = $('.framed');

		framed.on('error', function () {
			var newpath = $(this).attr('src');
			var filetype = newpath.substring(newpath.length - 3, newpath.length);

			newpath = newpath.substring(0, newpath.length - 4);

			if (filetype == 'jpg') {
				$(this).attr('src', newpath + '.png')
			}

			clearConsole();
		});
	}



	function lastchapter() {
		var lastch = chnavi.length - 3;

		page = chnavi[lastch];
		cpage = 1;

		update(page, cpage);
	}

	var Page = function(){

		page = storage('page');
		cpage = storage('cpage');

		if (!page) {
			page = 0;
			cpage = 1;
		}

		//bact to top
		$(window).scroll(function() {
			var wScroll = $(this).scrollTop();
		});

		//volnr
		var volindex = volnavi.findIndex(i => i > page);
		var volumenumber = volindex - 1;
		$('#volnr').html("Vol. " + volumenumber);

		//Chnr
		var chindex = chnavi.findIndex(i => i > page);
		var chapternumber = chindex - 1;
		$('#chnr').html("Ch. " + chapternumber);

		$('#pagenr').html("Page " + cpage);






		//home Page
		$('.volumecover').on('click', function() {
			var cover = $(this).attr('data-cover');

			page = volnavi[cover];
			cpage = 1;

			update(page, cpage);
		});

		//back to home
		$('#homebtn').on('click', function() {
			if (home) {
				$('#home').fadeOut(1200);
				home = false;
			} else {
				if (!singlePage) {
					$('#singlefullbtn').html('<img src="img/op manga/fullchapter.png"  width="70%"/>');
					$('#pagebox').removeClass('noShow');
					singlePage = true;
					update(page, cpage);
				}
				$('#home').fadeIn(0);
				home = true;
			}
		});

		// toggle single page or full chapter
		$('#singlefullbtn').on('click', function() {
			if (singlePage) {
				$('#singlefullbtn').html('<img src="img/op manga/singlepage.png"  width="70%"/>');
				$('#pagebox').addClass('noShow');
				singlePage = false;
			} else {
				$('#singlefullbtn').html('<img src="img/op manga/fullchapter.png"  width="70%"/>');
				$('#pagebox').removeClass('noShow');
				singlePage = true;
			}
			update(page, cpage);
			whellbtnhidder()
		});

		$('#header').on('click', function() {
			$('#home').fadeOut(1200);
			home = false;
		});

		$('#crawlcontainer').on('click', function () {
			$('#covergrid').fadeIn(1500, "swing");
			$('#menubar').fadeIn(1500, "swing");
		});

		//last chapter button
		$('#lastbtn').on('click', function() {
			lastchapter();
		});

		//type a chapter number
		$('#typechap').keypress(function (e) {
			if (e.which == 13) {
				var input = this.value;

				if (input == ''){
				}
				else if (input >= chnavi.length){
					lastchapter();
				}
				else if (input >= 1 && input < chnavi.length) {
					page = chnavi[input];
					cpage = 1;

					update(page, cpage);
				} else if (input == 'login') {
					password = true;
					update(page, cpage);
				}

				e.preventDefault();
				$(this).val('');
				$(this).blur();
				$("#menu").removeClass("onNow");
			}
		});


		//click page to go to next page
		$('#frame').on('click', function(event) {

			if (page == chnavi[chnavi.length - 2]){
			} else if (findframe(event) && singlePage) {
				page = page+1;
				cpage = cpage+1;

				update(page, cpage);
			}
	  });

		// pick volume
		$('.volumewhellbtn').on('click', function() {
			var vol = $(this).attr('data-vol');

			page = volnavi[vol];
			cpage = 1;

			update(page, cpage);
		});

		// pick chaper
		$('.chapterwhellbtn').on('click', function() {
			var chap = $(this).attr('data-chap');

			page = chnavi[chap];
			cpage = 1;

			update(page, cpage);
		});

		// pick page
		$('.pagewhellbtn').on('click', function() {

			var npage = $(this).attr('data-page');

			page = page - (cpage - npage);
			cpage = npage;

			update(page, cpage);
		});

		$('#nextbtn').on('click',function () {
			if(page == chnavi[chnavi.length - 2]){
			} else {
				if (singlePage) {
					page = page+1;
					cpage = cpage+1;
				} else {
					page = chnavi[chnavi.findIndex(i => i > page)];
					cpage = 1;
				}

				update(page, cpage);
			}
		})

		$('#backbtn').on('click', function () {
			if(page == 0){
			} else {
				if (singlePage) {
					page = page-1;

					if(cpage != 1){
						cpage = cpage-1;
					} else {
						chindex = chnavi.indexOf(page + 1);
						chapternumber = chindex - 1;
						var pageprch = chnavi[chindex] - chnavi[chindex-1];
						cpage = pageprch;
					}
				} else {
					page = chnavi[chnavi.findIndex(i => i > page) - 2];
					cpage = 1;
				}

				update(page, cpage);
			}
		});


		//ArrowKey Controll
		$(document).keydown(function(objEvent){
			(objEvent) ? keycode = objEvent.keyCode : keycode = keycode = event.keyCode;

			//forward
			if(keycode == 39 && !home) {
				if(page == chnavi[chnavi.length - 2]){
				} else {
					if (singlePage) {
						page = page+1;
						cpage = cpage+1;
					} else {
						page = chnavi[chnavi.findIndex(i => i > page)];
						cpage = 1;
					}

					update(page, cpage);
				}
			}
			//back
			if(keycode == 37 && !home) {
				if(page == 0){
				} else {
					if (singlePage) {
						page = page-1;

						if(cpage != 1){
							cpage = cpage-1;
						} else {
							chindex = chnavi.indexOf(page + 1);
							chapternumber = chindex - 1;
							var pageprch = chnavi[chindex] - chnavi[chindex-1];
							cpage = pageprch;
						}
					} else {
						page = chnavi[chnavi.findIndex(i => i > page) - 2];
						cpage = 1;
					}

				update(page, cpage);
				}
			}
		});
	return page;
	};

	page = Page();
	cpage = storage('cpage');

	update(page, cpage);
	$('#home').stop().show();
	home = true;
});;
