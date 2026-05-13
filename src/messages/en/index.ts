import core from "./core";
import home from "./home";
import pages from "./pages";
import servicesData from "./servicesData";
import faqTestimonials from "./faqTestimonials";

const en = {
  ...core,
  home,
  ...pages,
  servicesCatalog: servicesData,
  ...faqTestimonials,
} as const;

export default en;
