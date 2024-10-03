import { siteConfig } from "@/config/site";
import NextLink from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-100 text-foreground">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Company Info */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold text-yellow-500">SalTech</h2>
            <p className="text-sm mt-4">
              Founded on the principles of fostering black enterprise and
              promoting social mobility, SalTech is a leading technology and
              information services organization. Our diverse teams drive
              innovative technological transformations, aiming to provide
              equitable access and opportunities for people from all walks of
              life.
            </p>
          </div>

          {/* Useful Links */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold">Useful Links</h3>
            <ul className="mt-4 space-y-2">
              {siteConfig.footerLinks.map((item, index) => (
                <li key={index}>
                  <NextLink href={item.href} className="hover:text-yellow-500">
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="mt-4 space-y-2">
              <li>support@saltechapps.com</li>
              <li>+1 (844) 877-1078</li>
              <li>
                3203 Mcknight East Drive, STE 138, Pittsburgh, PA 15237 United
                States
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full mt-6 md:mt-0 md:w-1/3">
            <h3 className="text-lg font-semibold">Newsletter Signup</h3>
            <div className="flex flex-col md:flex-row mt-4">
              <input
                type="email"
                placeholder="Email address"
                className="px-4 py-2 w-full md:w-3/4 bg-black text-white border-0 rounded-md focus:ring-0"
              />
              <button className="bg-yellow-500 px-4 py-2 mt-2 md:mt-0 md:ml-2 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm  text-black  text-center md:text-left">
            © 2024 SalTech Services LLC. All Rights Reserved
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social Media Icons */}
            <a href="#" className="hover:text-yellow-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-yellow-300">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="hover:text-yellow-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-yellow-300">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
