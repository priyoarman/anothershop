import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slider images - using free placeholder images
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80",
      title: "Summer Collection",
      subtitle: "Discover the latest trends",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop",
      title: "Electronics",
      subtitle: "Premium quality products",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=400&fit=crop",
      title: "Fashion Forward",
      subtitle: "Express your style",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&h=400&fit=crop",
      title: "Sports and Outdoors",
      subtitle: "Gear up for adventure",
    },
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative mb-4 h-dvh min-h-[28rem] w-full overflow-hidden bg-yellow-200 sm:mb-6 sm:h-148 group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://via.placeholder.com/1200x400/1f2937/ffffff?text=Summer+Collection";
              }}
            />
            {/* Overlay */}
            <div className="hero-slide-overlay absolute inset-0 bg-black/30 transition-colors duration-500"></div>
            {/* Text Content */}
            <div className="hero-slide-text absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-colors duration-500">
              <h2 className="mb-3 text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
                {slide.title}
              </h2>
              <p className="text-base text-gray-100 drop-shadow-md md:text-2xl">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 opacity-100 transition-all hover:bg-white/80 sm:left-4 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <MdChevronLeft size={28} className="text-gray-800" />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 opacity-100 transition-all hover:bg-white/80 sm:right-4 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="Next slide"
      >
        <MdChevronRight size={28} className="text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
