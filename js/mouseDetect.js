/**
 * hover figure caption with mouse direction
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016 MAAB
 * http://www.github.com/maab16/hover-figure-caption-with-mouse-direction
 */
;(function($,window,document,undefined){
	'use strict';

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

	function mouseDetect(element,options){
		
		this.element  = $(element);
		this.$hoverElem = this.element.find('.caption');
		this.settings = $.extend({},deafults,options);
		this.init();

		};

	mouseDetect.prototype = {

		init          	: function(){
			 		
			 	this.element.css({

			 		width: this.settings.parentWidth,
					height: this.settings.parentHeight,
					backgroundColor: this.settings.parentBgColor,
					borderRadius: this.settings.borderRadius,
					position: 'relative',
					overflow: 'hidden'
			 	});

			 	this.$hoverElem.css({

			 		width: '100%',
					height: '100%',
					top : 0 + 'px',
					left  : "-100%",
					position : "absolute",
					display: 'block',
			 		backgroundColor : this.settings.captionBgColor,
			 		opacity    : 0.8,
			 		zIndex    : 9999
			 	});

				this.applyAction();
		},

		applyAction 	: function(){

			var self = this,
				animation = 'all '+ this.settings.animationDuration + 'ms ' + this.settings.animationType + ' ' + this.settings.animationDelay + 's';

			this.element.on('mouseenter',function(e){

				self.$hoverElem.hide();
				self.setPosition(e);
				self.$hoverElem.show();

			}).on('mouseleave',function(e){

				self.setPosition(e);

			}).on('mousemove',function(){

				self.$hoverElem.css({

						left : 0 + 'px',
						top  : 0 + 'px',
						transition: animation
				});
			});
		},
		// This funtion's Credit Goes to  http://stackoverflow.com/a/3647634
		getDirection   	: function(e){
			var width = this.element.width(),
				height = this.element.height();
			var x = (e.pageX - this.element.offset().left - (width/2)) * (width > height ? (height/width) : 1);
			var y = (e.pageY - this.element.offset().top - (height/2)) * (height > width ? (width/height) : 1);
				
			var direction = Math.round((((Math.atan2(y,x) * (180 / Math.PI)) + 180) / 90) + 3) %4 ;
			//var direction = Math.round(Math.atan2(y,x)/1.57079633+5)%4;
			return direction;
		},
		setPosition 	: function(e){

			switch(this.getDirection(e)){

				case 0 :
					// 	top
					this.$hoverElem.css({

						left : 0 + 'px',
						top  : "-100%"
					});
					break;
				case 1 :
					// Right
					this.$hoverElem.css({

						top : 0 + 'px',
						left  : "100%"
					});
					break;
				case 2 :
					// Bottom
					this.$hoverElem.css({

						left : 0 + 'px',
						top : "100%"
					});
					break;
				case 3 :
					// 	left
					this.$hoverElem.css({

						top : 0 + 'px',
						left  : "-100%"
					});
					break;
			}
		}
	};

	$.fn.mouseDetect = function(options){

		return this.each(function(){

			if (!$.data(this,'mouseDetect')) {

				$.data(this,'mouseDetect',new mouseDetect(this,options));
			}
		});
	};


})(jQuery,window,document);
