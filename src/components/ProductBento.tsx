import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bank,
  Briefcase,
  Car,
  Coins,
  CreditCard,
  Storefront,
  Receipt,
  AirplaneTilt,
} from "@phosphor-icons/react";
import { NEXUS_PRODUCTS } from "../data/content";
interface ProductBentoProps {
  onSelectProduct: (productId: string) => void;
}
const categories = [
  "Featured",
  "Personal",
  "Business",
  "Investments",
  "All products",
] as const;
type Category = (typeof categories)[number];
const featuredIds = ["car-for-cash", "suremoney-loan", "nexus-credit"];
const presentation: Record<
  string,
  { description: string; image: string; icon: typeof Car; label: string }
> = {
  "car-for-cash": {
    description:
      "Access short-term funding using your vehicle as security. Your car is held until the loan is repaid.",
    image: "hero_car.jpg",
    icon: Car,
    label: "Put your assets to work",
  },
  "suremoney-loan": {
    description:
      "Flexible funding for unexpected expenses and opportunities, with no collateral required.",
    image: "entrepreneur.webp",
    icon: CreditCard,
    label: "For everyday possibilities",
  },
  "nexus-credit": {
    description:
      "Salary-based financing with repayments collected through your payroll.",
    image: "corporate_salary_exec.jpg",
    icon: Bank,
    label: "Make your salary go further",
  },
  "travel-financing": {
    description:
      "Explore financing and documentation options for study, relocation, and overseas travel.",
    image: "travel_documents.jpg",
    icon: AirplaneTilt,
    label: "For your next chapter",
  },
  "women-empowerment": {
    description:
      "Funding designed to help women build, manage, and grow their businesses.",
    image: "entrepreneur.webp",
    icon: Briefcase,
    label: "Back your ambition",
  },
  "shop-owned-sme": {
    description:
      "Working capital for shop owners, retailers, and distributors ready to grow.",
    image: "entrepreneur.webp",
    icon: Storefront,
    label: "Keep business moving",
  },
  "invoice-discounting": {
    description:
      "Access working capital against eligible invoices while you wait for payment.",
    image: "corporate_salary_exec.jpg",
    icon: Receipt,
    label: "Unlock your receivables",
  },
  "gold-for-cash": {
    description:
      "Explore a short-term loan secured against your appraised gold assets.",
    image: "gold_vault.jpg",
    icon: Coins,
    label: "Unlock the value you hold",
  },
  "high-yield-investments": {
    description:
      "Explore fixed-term investment options, tenures, and payout schedules with our team.",
    image: "gold_vault.jpg",
    icon: Coins,
    label: "Plan beyond today",
  },
};
export const ProductBento: React.FC<ProductBentoProps> = ({
  onSelectProduct,
}) => {
  const [category, setCategory] = useState<Category>("Featured");
  const filtered =
    category === "Featured"
      ? featuredIds.map(
          (id) => NEXUS_PRODUCTS.find((product) => product.id === id)!,
        )
      : NEXUS_PRODUCTS.filter(
          (product) =>
            category === "All products" ||
            (category === "Personal" &&
              (product.category === "individual" ||
                product.category === "mda")) ||
            (category === "Business" &&
              (product.category === "business" ||
                product.id === "women-empowerment")) ||
            (category === "Investments" && product.category === "investment"),
        );
  return (
    <section
      id="products"
      className="nx-products"
      aria-labelledby="nx-products-title"
    >
      <div className="nx-container">
        <div className="nx-section-intro">
          <div>
            <p className="nx-eyebrow">
              <span className="nx-line" />
              Our products
            </p>
            <h2 id="nx-products-title">
              A little support.
              <br />A bigger possibility.
            </h2>
          </div>
          <p>
            For the things you need today,
            <br className="nx-desktop-break" /> and the plans you have for
            tomorrow.
          </p>
        </div>
        <div
          className="nx-product-filters"
          role="group"
          aria-label="Filter financial products"
        >
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
              {item === "All products" && (
                <ArrowUpRight size={16} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
        <div
          className={`nx-product-layout ${filtered.length === 1 ? "nx-product-layout-single" : ""}`}
        >
          {filtered.map((product, i) => {
            const visual = presentation[product.id];
            const Icon = visual.icon;
            return (
              <article
                key={product.id}
                className={`nx-product-card ${i === 0 ? "nx-product-feature" : "nx-product-compact"}`}
              >
                {i === 0 && (
                  <div className="nx-product-photo">
                    <img
                      src={`./assets/nexus/${visual.image}`}
                      alt={`${product.name} illustration`}
                      width="1000"
                      height="650"
                      loading="lazy"
                    />
                    <span>01 / {visual.label}</span>
                  </div>
                )}
                <div className="nx-product-content">
                  <div className="nx-product-top">
                    <Icon size={26} weight="regular" aria-hidden="true" />
                    <span>
                      {i === 0
                        ? "Featured solution"
                        : `0${i + 1} / ${visual.label}`}
                    </span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{visual.description}</p>
                  <div className="nx-product-facts">
                    <div>
                      <span>
                        {product.category === "investment"
                          ? "Annualised return"
                          : "Loan amount"}
                      </span>
                      <strong>
                        {product.category === "investment"
                          ? product.rateInfo
                          : `Up to ${product.maxAmount}`}
                      </strong>
                    </div>
                    <div>
                      <span>Tenure</span>
                      <strong>
                        {(product.tenure || "Discuss with our team")
                          .replace(" Flexible", "")
                          .replace("Months", "months")}
                      </strong>
                    </div>
                  </div>
                  <button
                    className="nx-text-link"
                    onClick={() => onSelectProduct(product.id)}
                  >
                    Explore{" "}
                    {product.name
                      .replace(" (CFC)", "")
                      .replace("Institutional ", "")}
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="nx-product-help">
          <span>Not sure where to start? Let’s find the right fit.</span>
          <a className="nx-text-link" href="#contact">
            Talk to our team <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <p className="nx-product-disclaimer">
          Loan amounts and terms are subject to eligibility, assessment, and
          approval. Review the product details for requirements and applicable
          charges.
        </p>
      </div>
    </section>
  );
};
