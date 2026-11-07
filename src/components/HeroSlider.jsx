import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85",
      eyebrow: "New arrivals",
      title: "A softer way to live",
      subtitle:
        "Thoughtful furniture for slow mornings, long dinners, and the everyday in between.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&w=1400&q=85",
      eyebrow: "The linen edit",
      title: "Warm tones, made easy",
      subtitle:
        "Natural textures and easy silhouettes that make a room feel like home.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
      eyebrow: "Room to breathe",
      title: "Make space for living",
      subtitle:
        "Pieces with a point of view, designed to settle beautifully into yours.",
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
    <section className="hero-shell group">
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
              className="hero-image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://via.placeholder.com/1200x400/1f2937/ffffff?text=Summer+Collection";
              }}
            />
            {/* Overlay */}
            <div className="hero-slide-overlay"></div>
            {/* Text Content */}
            <div className="hero-slide-text">
              <p className="hero-eyebrow">{slide.eyebrow}</p>
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <a className="primary-button" href="#shop">
                Shop the collection
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        className="hero-arrow hero-arrow-left"
        aria-label="Previous slide"
      >
        <MdChevronLeft />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        className="hero-arrow hero-arrow-right"
        aria-label="Next slide"
      >
        <MdChevronRight />
      </button>

      {/* Dots Indicator */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={index === currentSlide ? "active" : ""}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
