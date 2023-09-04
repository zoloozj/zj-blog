import Image from "next/image";
import Link from "next/link";
import HeaderNavLinks from "@/data/headerNavLinks";
import headerNavLinks from "@/data/headerNavLinks";
import ThemeSwitch from "./ThemeSwitch";
import SigninButton from "./auth/SigninButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label="ZJs blog">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image
                width={53}
                height={43}
                priority
                src="/images/logo.svg"
                alt="Logo"
              />
            </div>
            <p className="hidden h-6 text-2xl font-semibold sm:block">
              ZJs Blog
            </p>
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          <ul className="flex items-center">
            {headerNavLinks.map((link) => (
              <li key={link.title} className="p-4">
                <Link
                  key={link.title}
                  href={link.href}
                  className="font-medium text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <li className="p-4">
              <SigninButton />
            </li>
          </ul>
        </div>
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
