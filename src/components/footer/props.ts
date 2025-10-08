export interface FooterLink {
  label: string;
  link: string;
}

export interface FooterContact {
  email: string;
  phone: string;
  address: string;
}

export interface FooterSocial {
  icon: string;
  name: string;
  link: string;
}

export interface FooterPayment {
  icon: string;
  label: string;
}

export interface FooterSecurity {
  icon: string;
  label: string;
}

export interface CarouselLogo {
  id: string | number;
  image: {
    src: string;
    alt: string;
    title?: string;
  };
  link: {
    url: string;
    alt?: string;
    title?: string;
  };
}

export interface FooterData {
  institutional: FooterLink[];
  account: FooterLink[];
  contact: FooterContact;
  social: FooterSocial[];
  payments: FooterPayment[];
  security: FooterSecurity[];
  company: string;
  companyLogoSmall?: string;
  brandCarousel: CarouselLogo[];
}
