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
    <div className="relative w-full h-148 bg-gray-200 overflow-hidden mb-6 group">
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
            <div className="hero-slide-text absolute inset-0 flex flex-col justify-center items-center text-center transition-colors duration-500">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl text-gray-100 drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <MdChevronLeft size={28} className="text-gray-800" />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <MdChevronRight size={28} className="text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
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
