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
			borderRadius    :  '2px',

		}

		var settings = $.extend({},deafults,options);

		var $element = $(this),
			$hoverElem = $element.find('.caption'),
			width = $element.width(),
		 	height = $element.height(),
		 	animation = 'all '+ settings.animationDuration + 'ms ' + settings.animationType + ' ' + settings.animationDelay + 's';

		 	$element.css({

		 		width: settings.parentWidth,
				height: settings.parentHeight,
				backgroundColor: settings.parentBgColor,
				borderRadius: settings.borderRadius,
				position: 'relative',
				overflow: 'hidden'
		 	});

		 	$hoverElem.css({

		 		width: '100%',
				height: '100%',
				top : 0 + 'px',
				left  : "-100%",
				position : "absolute",
				display: 'block',
		 		backgroundColor : settings.captionBgColor,
		 		opacity    : 0.8,
		 		zIndex    : 9999
		 	});

		$element.on('mouseenter',function(e){

			$hoverElem.hide();
			setPosition(e);
			$hoverElem.show();

		}).on('mouseleave',function(e){

			setPosition(e);

		}).on('mousemove',function(){

			$hoverElem.css({

					left : 0 + 'px',
					top  : 0 + 'px',
					transition: animation
			});
		});

		function setPosition(e){

			switch(getDirection(e)){

				case 0 :
					// 	top
					$hoverElem.css({

						left : 0 + 'px',
						top  : "-100%"
					});
					break;
				case 1 :
					// Right
					$hoverElem.css({

						top : 0 + 'px',
						left  : "100%"
					});
					break;
				case 2 :
					// Bottom
					$hoverElem.css({

						left : 0 + 'px',
						top : "100%"
					});
					break;
				case 3 :
					// 	left
					$hoverElem.css({

						top : 0 + 'px',
						left  : "-100%"
					});
					break;
			}
		}

		// This funtion's Credit Goes to  http://stackoverflow.com/a/3647634

		function getDirection(e){

			var x = (e.pageX - $element.offset().left - (width/2)) * (width > height ? (height/width) : 1);
			var y = (e.pageY - $element.offset().top - (height/2)) * (height > width ? (width/height) : 1);
				
			var direction = Math.round((((Math.atan2(y,x) * (180 / Math.PI)) + 180) / 90) + 3) %4 ;
			//var direction = Math.round(Math.atan2(y,x)/1.57079633+5)%4;
			return direction;
			
		}
	};
	
})(jQuery);