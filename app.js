class Gallery {
	constructor(element) {
		this.element = element;
        this.carouselImageTrack = this.element.firstElementChild;
        this.childNodes = Array.from(element.children);
        console.log(this.childNodes)
		this.btnPrev = this.childNodes[1].firstElementChild;
        this.btnNext = this.childNodes[1].lastElementChild;
		this.count = 0;
		this.gotoNext();
		this.gotoPrev();
		this.windowResize();
		this.carouselImage = [].slice.call(this.carouselImageTrack.children);
		this.carouselImageTrack.style.width = `${this.carouselImage.length*100}%`;
		this.carouselImage.forEach(img => {
			img.style.flexBasis = 100 / this.carouselImage.length + '%';
		});
		this.amountToMove = this.carouselImage[0].offsetWidth;
		window.addEventListener('resize', () => {
			this.amountToMove = this.carouselImage[0].offsetWidth;
		});
		this.loadImage();
		window.addEventListener('resize', this.windowResize.bind(this));
		window.addEventListener('orientationchange', this.windowResize.bind(this));
	}
	loadImage() {
		let imgElement = this.carouselImage[0].firstElementChild;
		imgElement.src = imgElement.dataset.src;
	}
	gotoNext() {
		this.btnNext.addEventListener('click', () => {
			if (this.count >= this.carouselImage.length - 1) this.count = -1;
			this.count++;
			let imgElement = this.carouselImage[this.count].firstElementChild;
			if (imgElement.naturalHeight !== 0 && imgElement.naturalWidth !== 0 && imgElement.src.includes("https://via.placeholder.com/150x150.png")) {
				imgElement.src = imgElement.dataset.src;
			} else if (imgElement.naturalHeight == 0 && imgElement.naturalWidth == 0) {
				imgElement.src = imgElement.dataset.src;
			}
			this.carouselImageTrack.style.transition = "transform 0.3s ease-in-out";
			this.carouselImageTrack.style.transform = `translate3d(-${this.amountToMove*this.count}px,0,0)`;
		});
	}
	gotoPrev() {
		this.btnPrev.addEventListener('click', () => {
			if (this.count == 0) this.count = this.carouselImage.length;
			this.count--;
			let imgElement = this.carouselImage[this.count].firstElementChild;
			if (imgElement.naturalHeight !== 0 && imgElement.naturalWidth !== 0 && imgElement.src.includes("https://via.placeholder.com/150x150.png")) {
				imgElement.src = imgElement.dataset.src;
			} else if (imgElement.naturalHeight == 0 && imgElement.naturalWidth == 0) {
				imgElement.src = imgElement.dataset.src;
			}
			this.carouselImageTrack.style.transition = "transform 0.3s ease-in-out";
			this.carouselImageTrack.style.transform = `translate3d(-${this.amountToMove*this.count}px,0,0)`;
		});
	}
	windowResize() {
		this.carouselImageTrack.style.transition = "none";
		this.carouselImageTrack.style.transform = `translate3d(-${this.amountToMove*this.count}px,0,0)`;
	}
}

window.addEventListener("DOMContentLoaded", function () {
  new Gallery(document.querySelector('#one'));
})