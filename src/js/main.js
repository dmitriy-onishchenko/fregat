function openDropdownSelect($dropdown, $select) {
	new TimelineMax({
		onStart() {
			$('.dropdown-phone').removeClass('is-open-select');
			$('.dropdown-phone__hidden').addClass('is-hidden');
			$dropdown.removeClass('is-hidden');
			$select.addClass('is-open-select');
		},
	})
		.from($dropdown, 0.3, {
			autoAlpha: 0,
			clearProps: 'all',
		});
}

function closeDropdownSelect() {
	new TimelineMax({
		onStart() {
			$('.dropdown-phone').removeClass('is-open-select');
		},
		onComplete() {
			$('.dropdown-phone__hidden').addClass('is-hidden');
		},
	})
		.to($('.dropdown-phone__hidden'), 0.3, {
			autoAlpha: 0,
			clearProps: 'all',
		});
}

$('.dropdown-phone__active').on('click', (e) => {
	let $this = $(e.currentTarget);

	let $select = $this.closest('.dropdown-phone');

	let $dropdown = $this.next();

	if (!$select.hasClass('is-open-select')) {
		openDropdownSelect($dropdown, $select);
	} else {
		closeDropdownSelect();
	}
});

$('.dropdown-phone__number').on('click', (e) => {
	let $this = $(e.currentTarget);

	let $selectButton = $this.closest('.dropdown-phone').find('.dropdown-phone__active');

	let text = $this.text();

	$selectButton.text(text);
	closeDropdownSelect();
});

$(document).on('click', (e) => {
	let $target = $(e.target);

	if (!$target.closest('.dropdown-phone__hidden').length && !$target.closest('.dropdown-phone__active').length) {
		closeDropdownSelect();
	}
});

if ($('.main-slider__carousel').length) {
	$('.main-slider__carousel').slick({
		dots: true,
		infinite: true,
		arrows: false,
		autoplay: true,
		pauseOnHover: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
}

if ($('.product-thumb__slider').length) {
	if ($('.product-thumb__item').length > 3) {
		let $thumb = $('.product-thumb__slider');

		$thumb.on('init.slick', (event, slick) => {
			let $this = $(event.currentTarget);

			let $thumbnail = $this.find('.slick-cloned .thumbnail');

			$thumbnail.removeAttr('data-fancybox');
		});

		$thumb.slick({
			infinite: true,
			vertical: true,
			slidesToShow: 3,
			slidesToScroll: 1,
		});
	}
}

$('[data-fancybox="gallery"]').fancybox({
	loop: true,
});

$('.thumbnail').on('click', (e) => {
	e.preventDefault();

	let $this = $(e.currentTarget);

	let $img = $this.attr('href');

	let $launcher = $('.product-img-container__launcher');

	let $launcherImg = $('.product-img-container__launcher img');

	$launcher.attr('href', $img);
	$launcherImg.attr('src', $img);
});

$('.product-img-container__launcher').on('click', (e) => {
	e.preventDefault();

	let $this = $(e.currentTarget);

	let src = $this.attr('href');

	$('.thumbnail').each((index, item) => {
		if ($(item).attr('href') === src) {
			$(item).trigger('click');
		}
	});
});

$('.menu__button-dropdown').on('click', (e) => {
	e.preventDefault();
	let $this = $(e.currentTarget);

	let $menu = $this.next();

	let $arrowDown = $this.find('.fa-arrow-down');

	let $arrowUp = $this.find('.fa-arrow-up');

	if ($menu.is(':hidden')) {
		$arrowDown.addClass('is-hidden');
		$arrowUp.removeClass('is-hidden');
		$menu.slideDown(250);
	} else {
		$arrowDown.removeClass('is-hidden');
		$arrowUp.addClass('is-hidden');
		$menu.slideUp(250);
	}
});

$('.menu__button').on('click', (e) => {
	e.preventDefault();
	let $this = $(e.currentTarget);

	let $menu = $this.next();

	let $burger = $this.find('.menu__burger');

	let $close = $this.find('.menu__close');

	if ($menu.is(':hidden')) {
		$burger.addClass('is-hidden');
		$close.removeClass('is-hidden');
		$menu.slideDown(250);
	} else {
		$burger.removeClass('is-hidden');
		$close.addClass('is-hidden');
		$menu.slideUp(250);
	}
});

function setPadding() {
	let height = $('.footer').innerHeight();

	$('.site-container').css('padding-bottom', `${height}px`);
}

$('.js-popup-button').on('click', (e) => {
	e.preventDefault();
	let $this = $(e.currentTarget);

	let $modal = $this.attr('data-modal');

	let $modalWrapp = $(`${$modal}`).find('.popup__wrapp');

	new TimelineMax({
		onStart() {
			$(`${$modal}`).removeClass('is-hidden');
		},
	})
		.from($(`${$modal}`), 0.3, {
			autoAlpha: 0,
			clearProps: 'all',
		}, 0)
		.from($modalWrapp, 0.3, {
			scale: 0.6,
			clearProps: 'all',
		}, 0);
});

$('.js-popup-close').on('click', (e) => {
	e.preventDefault();
	let $this = $(e.currentTarget);

	let $modalWrapp = $this.closest('.popup').find('.popup__wrapp');

	new TimelineMax({
		onComplete() {
			$('.popup').addClass('is-hidden');
		},
	})
		.to($('.popup'), 0.3, {
			autoAlpha: 0,
			clearProps: 'all',
		}, 0)
		.to($modalWrapp, 0.3, {
			scale: 0.6,
			clearProps: 'all',
		}, 0);
});

$(document).on('click', (e) => {
	let $target = $(e.target);

	if (!$target.closest('.popup__wrapp').length && !$target.closest('.js-popup-button').length) {
		new TimelineMax({
			onComplete() {
				$('.popup').addClass('is-hidden');
			},
		})
			.to($('.popup'), 0.3, {
				autoAlpha: 0,
				clearProps: 'all',
			}, 0)
			.to($('.popup__wrapp'), 0.3, {
				scale: 0.6,
				clearProps: 'all',
			}, 0);
	}
});

$('.contacts__item-tab').on('click', (e) => {
	let $this = $(e.currentTarget);

	let pos = $this.position().left;

	let width = $this.innerWidth();

	let $pane = $this.attr('data-tab');

	if (innerWidth > 768) {
		new TimelineMax({
			onStart() {
				$('.contacts__item-tab').removeClass('is-active');
				$this.addClass('is-active');
				$('.contacts__item-pane').addClass('is-hidden');
				$(`${$pane}`).removeClass('is-hidden');
			},
		})
			.to($('.contacts__line-tab'), 0.3, {
				x: pos,
				width,
			}, 0);
	} else {
		$('.contacts__item-tab').removeClass('is-active');
		$this.addClass('is-active');
		$('.contacts__item-pane').addClass('is-hidden');
		$(`${$pane}`).removeClass('is-hidden');
	}
});

$('.product-card__item-tab').on('click', (e) => {
	let $this = $(e.currentTarget);

	let $pane = $this.attr('data-tab');

	$('.product-card__item-tab').removeClass('is-active');
	$this.addClass('is-active');
	$('.product-card__pane').addClass('is-hidden');
	$(`${$pane}`).removeClass('is-hidden');
});

if (innerWidth > 1199) {
	setPadding();
}

$(window).on('resize', () => {
	if (innerWidth < 1199) {
		$('.site-container').removeAttr('style');
	}
});
