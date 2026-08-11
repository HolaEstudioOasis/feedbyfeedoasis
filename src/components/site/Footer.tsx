import { Link } from "@tanstack/react-router";
import logoAzul from "@/assets/logo-azul.svg.asset.json";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link to="/" className="footer-logo" aria-label="Feed by Feed — Home">
            <img src={logoAzul.url} width={88} height={88} alt="Feed by Feed" />
          </Link>

          <nav className="footer-nav" aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services/prenatal-services">Services</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="footer-newsletter">
            <p>
              Get expert, judgment-free feeding tips and parenthood insights delivered to your
              inbox monthly.
            </p>
            <form
              className="newsletter-form"
              action="https://assets.mailerlite.com/jsonp/2570708/forms/195544417940014318/subscribe"
              method="post"
              target="_blank"
            >
              <label htmlFor="newsletter-email" className="visually-hidden">
                Email address
              </label>
              <input
                type="email"
                id="newsletter-email"
                name="fields[email]"
                placeholder="Type here..."
                autoComplete="email"
                required
              />
              <button type="submit">Subscribe</button>
              <input type="hidden" name="ml-submit" value="1" />
              <input type="hidden" name="anticsrf" value="true" />
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <a href="#" className="social-link" aria-label="Feed by Feed on Instagram">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.86.04-1.33.18-1.64.3-.41.16-.71.35-1.02.66-.31.31-.5.61-.66 1.02-.12.31-.26.78-.3 1.64C4.29 8.53 4.28 8.85 4.28 12s.01 3.47.06 4.52c.04.86.18 1.33.3 1.64.16.41.35.71.66 1.02.31.31.61.5 1.02.66.31.12.78.26 1.64.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.86-.04 1.33-.18 1.64-.3.41-.16.71-.35 1.02-.66.31-.31.5-.61.66-1.02.12-.31.26-.78.3-1.64.05-1.05.06-1.37.06-4.52s-.01-3.47-.06-4.52c-.04-.86-.18-1.33-.3-1.64a2.74 2.74 0 0 0-.66-1.02 2.74 2.74 0 0 0-1.02-.66c-.31-.12-.78-.26-1.64-.3-1.05-.05-1.37-.06-4.04-.06z" />
              <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.75a3.05 3.05 0 1 1 0-6.1 3.05 3.05 0 0 1 0 6.1z" />
              <circle cx="17.1" cy="6.9" r="1.1" />
            </svg>
          </a>
          <nav className="footer-legal" aria-label="Legal">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cancellation Policy</a>
          </nav>
          <p className="footer-copy">© 2026 Feed by Feed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
