import Link from "next/link";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

export default function Footer() {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content py-5">
            <nav className="grid grid-flow-col gap-5">
                <Link href={siteConfig.links.twitter} target="_blank">
                    <FaTwitter size={24} />
                </Link>
                <Link href={siteConfig.links.instagram} target="_blank">
                    <FaInstagram size={24} />
                </Link>
                <Link href={siteConfig.links.github} target="_blank">
                    <FaGithub size={24} />
                </Link>
                <Link href="/privacy-policy" className="link link-hover">
                    Privacy
                </Link>
                <Link href="/terms-of-service" className="link link-hover">
                    Terms
                </Link>
                <Link href="/community-guidelines" className="link link-hover">
                    Guidelines
                </Link>
            </nav>
        </footer>
    );
}
