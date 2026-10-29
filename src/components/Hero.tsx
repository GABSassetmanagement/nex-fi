import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  Check,
  MapPin,
  Pause,
  Play,
} from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
interface HeroProps {
  onOpenApply: (productName?: string, amount?: number, tenure?: number) => void;
  onScrollToCalculator: () => void;
  onNavigateProduct?: (productId: string) => void;
}
const slides = [
  {
    id: "car-for-cash",
    name: "Car-for-Cash",
    eyebrow: "Make more of what you own",
    line1: "Turn your car",
    line2: "into cash.",
    description:
      "Put your vehicle’s value to work. Access a short-term loan while your car is held securely until repayment.",
    benefits: ["Up to 70% of vehicle value", "Subject to appraisal & approval"],
    product: "Car-for-Cash (CFC)",
    amount: 5000000,
    image: "hero_car.jpg",
    alt: "Executive car in a dark studio, illustrating vehicle-backed lending",
    category: "Asset-backed lending",
    caption: "An asset today.\nAn opportunity tomorrow.",
  },
  {
    id: "suremoney-loan",
    name: "Suremoney Loan",
    eyebrow: "For the moments that matter",
    line1: "Get ₦1 million.",
    line2: "Keep moving.",
    description:
      "Handle an unexpected expense or take the next step in your business with a flexible personal or business loan.",
    benefits: ["No collateral required", "Subject to eligibility & approval"],
    product: "Suremoney Loan",
    amount: 1000000,
    image: "entrepreneur.webp",
    alt: "Entrepreneur in a fashion studio, illustrating personal and business finance",
    category: "Personal & business loans",
    caption: "For your plans.\nAnd everything in between.",
  },
  {
    id: "travel-financing",
    name: "Travel Financing",
    eyebrow: "Give your next chapter a start",
    line1: "Big plans.",
    line2: "New horizons.",
    description:
      "Explore financing and financial documentation options for study, relocation, and your next journey abroad.",
    benefits: ["Discuss your requirements", "Clear guidance from our team"],
    product: "Travel Financing",
    amount: 15000000,
    image: "travel_documents.jpg",
    alt: "Travel documents illustrating travel financing",
    category: "Travel financing",
    caption: "A world of possibilities.\nA team in your corner.",
  },
];
export const Hero: React.FC<HeroProps> = ({
  onOpenApply,
  onScrollToCalculator,
  onNavigateProduct,
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const slide = slides[index];
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || reduceMotion || !pageVisible) return;
    const timer = window.setTimeout(
      () => setIndex((previous) => (previous + 1) % slides.length),
      10000,
    );
    return () => window.clearTimeout(timer);
  }, [index, paused, hovered, focused, reduceMotion, pageVisible]);
  const select = (next: number) => {
    setIndex((next + slides.length) % slides.length);
    setPaused(true);
  };
  return (
    <section
      className="nx-hero"
      aria-label="Featured Nexus products"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setFocused(false);
      }}
    >
      <div className="nx-container">
        <div className="nx-hero-topline">
          <span>Finance, with you in mind.</span>
          <span>
            <MapPin size={14} aria-hidden="true" /> Abuja, Nigeria
          </span>
        </div>
        <div
          className="nx-hero-grid"
          aria-live={paused || focused ? "polite" : "off"}
        >
          <div className="nx-hero-copy" key={`copy-${slide.id}`}>
            <p className="nx-eyebrow">
              <span className="nx-line" />
              {slide.eyebrow}
            </p>
            <h1>
              {slide.line1}
              <br />
              <span>{slide.line2}</span>
            </h1>
            <p className="nx-hero-description">{slide.description}</p>
            <div className="nx-hero-cta">
              <button
                className="nx-button"
                onClick={() => onOpenApply(slide.product, slide.amount, 1)}
              >
                Start your application{" "}
                <ArrowUpRight size={21} aria-hidden="true" />
              </button>
              <button
                className="nx-text-link"
                onClick={() =>
                  onNavigateProduct
                    ? onNavigateProduct(slide.id)
                    : onScrollToCalculator()
                }
              >
                How it works <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            <ul className="nx-hero-benefits">
              {slide.benefits.map((benefit) => (
                <li key={benefit}>
                  <Check size={16} aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`nx-hero-visual nx-visual-${slide.id}`}
            key={`image-${slide.id}`}
          >
            <img
              src={`./assets/nexus/${slide.image}`}
              alt={slide.alt}
              width="900"
              height="1000"
              fetchPriority="high"
            />
            <div className="nx-image-shade" aria-hidden="true" />
            <span className="nx-image-category">{slide.category}</span>
            <div className="nx-image-caption">{slide.caption}</div>
            <img
              className="nx-image-mark"
              src="./assets/nexus/NEXUS-mark-BW-1x1-WH.png"
              alt=""
              width="64"
              height="64"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="nx-hero-bottom">
          <div
            className="nx-slide-options"
            aria-label="Choose featured product"
          >
            {slides.map((item, i) => (
              <button
                key={item.id}
                aria-pressed={index === i}
                onClick={() => select(i)}
              >
                <span>0{i + 1}</span>
                {item.name}
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="nx-slide-controls">
            <button
              className="nx-icon-button"
              aria-label="Previous featured product"
              onClick={() => select(index - 1)}
            >
              <CaretLeft size={19} aria-hidden="true" />
            </button>
            <button
              className="nx-icon-button"
              aria-label={
                paused || reduceMotion
                  ? "Play featured products"
                  : "Pause featured products"
              }
              disabled={!!reduceMotion}
              onClick={() => setPaused(!paused)}
            >
              {paused || reduceMotion ? (
                <Play size={16} aria-hidden="true" />
              ) : (
                <Pause size={16} aria-hidden="true" />
              )}
            </button>
            <button
              className="nx-icon-button"
              aria-label="Next featured product"
              onClick={() => select(index + 1)}
            >
              <CaretRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="nx-hero-footnote">
          <span>
            Personal goals. Business ambitions. One financial partner.
          </span>
          <button className="nx-text-link" onClick={onScrollToCalculator}>
            Explore your repayments <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
