(function($){
	'use strict';
	$.fn.mouseDetect = function(options){

		var deafults = {

			animationType 	: 'ease',
			animationDuration 	: 300,
			animationDelay 	: 0,
			parentWidth 	: '400px',
			parentHeight 	: '400px',
			parentBgColor   :  'gray',
			captionBgColor  :  'black',
			borderRadius    :  '2px'

		}

		var settings = $.extend({},deafults,options);

		var $element = $(this),
			$hoverElem = $element.find('.caption'),
			w = $element.width(),
		 	h = $element.height(),
		 	animation = 'all '+ settings.animationDuration + 'ms ' + settings.animationType + ' ' + settings.animationDelay + 's';
		 	console.log(animation);

		 	$element.css({

		 		width: settings.parentWidth,
				height: settings.parentHeight,
				backgroundColor: settings.parentBgColor,
				borderRadius: settings.borderRadius,
				position: 'relative',
				overflow: 'hidden'
		 	});

		 	$hoverElem.css({

		 		width: settings.parentWidth,
				height: settings.parentHeight,
				left     : "-100%",
		 		top    : 0 + 'px',
				position : "absolute",
				display: 'block',
		 		backgroundColor : settings.captionBgColor,
		 		opacity    : 0.8,
		 		zIndex 		: 9999
		 	});

		$element.on('mouseenter',function(e){


			switch(direction(e)){

				case 0 : case 1 : case 2 : case 3 : // Top : Right : Bottom : Left
					
					$hoverElem.css({

						left : 0 + 'px',
						top  : 0 + 'px',
						transition: animation
					});

				
			}
				
		}).on('mouseleave',function(e){

			switch(direction(e)){

				case 0 :

					// 	top

					$hoverElem.css({

						left : 0 + 'px',
						top  : "-100%",
						transition: animation
					});

					break;
				case 1 :

					// Right

					$hoverElem.css({

						top : 0 + 'px',
						left  : "100%",
						transition: animation

					});

					break;
				case 2 :

					// Bottom

					$hoverElem.css({

						left : 0 + 'px',
						top : "100%",
						transition: animation

					});

					break;
				case 3 :

					// 	left

					$hoverElem.css({

						top : 0 + 'px',
						left  : "-100%",
						transition: animation

					});

					break;
			}
		});

		// This funtion's Credit Goes to  http://stackoverflow.com/a/3647634

		function direction(e){

			var x = (e.pageX - $element.offset().left - (w/2)) * (w > h ? (h/w) : 1);
			var y = (e.pageY - $element.offset().top - (h/2)) * (h > w ? (w/h) : 1);
				
			var direction = Math.round((((Math.atan2(y,x) * (180 / Math.PI)) + 180) / 90) + 3) %4 ;
			//var direction = Math.round(Math.atan2(y,x)/1.57079633+5)%4;
			return direction;
			
		}
	};
})(jQuery);