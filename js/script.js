const slider = tns({
	container: '.carusel__inner',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false,
	nav: true,
	navPosition: 'bottom',
	speed: 1200
});

$(window).ready(function() {


	document.querySelector('.prev').addEventListener('click', function () {
		slider.goTo('prev');
	});
	document.querySelector('.next').addEventListener('click', function () {
		slider.goTo('next');
	});
	
	function filterCatalog(filterType) {
    const allTab = document.getElementById('all');
    const officeTab = document.getElementById('office');
    const budgetTab = document.getElementById('budget');
    const gamingTab = document.getElementById('gaming');

    allTab.classList.remove('catalog__tab_active');
    officeTab.classList.remove('catalog__tab_active');
    budgetTab.classList.remove('catalog__tab_active');
    gamingTab.classList.remove('catalog__tab_active');

    const catalogItems = document.getElementsByClassName('catalog-item');
    for (let i = 0; i < catalogItems.length; i++) {
        const item = catalogItems[i];
        const priceElement = item.querySelector('.catalog-item__price');
        const price = parseFloat(priceElement.innerText.replace('$', '').replace(',', ''));

        if (filterType === 'all' || (filterType === 'office' && price < 300) || (filterType === 'budget' && price < 700 && price >= 300) || (filterType === 'gaming' && price >= 590)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }

    if (filterType === 'all') {
        allTab.classList.add('catalog__tab_active');
    } else if (filterType === 'office') {
        officeTab.classList.add('catalog__tab_active');
    } else if (filterType === 'budget') {
        budgetTab.classList.add('catalog__tab_active');
    } else if (filterType === 'gaming') {
        gamingTab.classList.add('catalog__tab_active');
    }
}
const catalogTabs = document.querySelectorAll('.catalog__tab');
catalogTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        catalogTabs.forEach(tab => tab.classList.remove('catalog__tab_active'));
        tab.classList.add('catalog__tab_active');
        filterCatalog(tab.id);
    });
});

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		})
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');
	
	
	const showModal = function(btn, modal) {
		$(btn).on('click', () => {
			$(`.overlay, ${modal}`).fadeIn();
		});
		$('.modal__close, .modal__close-area').on('click', () => {
			$(`.overlay, ${modal}`).fadeOut();
		});
	};
	
	showModal('[data-modal="consultation"]', '#consultation');
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	})

	const formValidate = function(formName) {
		$(formName).validate({
			rules:{
				name: "required",
				phone: {
					required: true,
					maxlength: 11,
					minlength: 11
				},
				email: {
					required: true,
					email: true
			}
		},
		messages: {
			name: "Пожалуйста, введите свое имя",
			phone: "Пожалуйста, введите свой номер телефона",
			email: {
				required: "Пожалуйста, введите свою почту",
				email: "Неправильно введен адресс почты"
			}
		}
		});
	}
	
	formValidate('#consultation-form');
	formValidate('#consultation form');
	$('#submit_cons').on('click', () => {$('#consultation').fadeOut()})
	showModal('[id="submit_cons"]', '#thanks')
})


