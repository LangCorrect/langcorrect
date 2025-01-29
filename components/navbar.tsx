import Link from "next/link";
import { siteConfig } from "@/config/site";
import ThemeController from "./theme-controller";

const links = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Posts",
        href: "/posts",
    },
    {
        label: "Prompts",
        href: "/prompts",
    },
    {
        label: "Corrections",
        href: "/corrections",
    },
    {
        label: "Challenges",
        href: "/challenges",
    },
    {
        label: "Socials",
        href: "#",
        subMenuItems: [
            {
                label: "Twitter",
                href: siteConfig.links.twitter,
                isExternal: true,
            },
            {
                label: "Instagram",
                href: siteConfig.links.instagram,
                isExternal: true,
            },
        ],
    },
];

interface NavLinkProps {
    label: string;
    href: string;
    subMenuItems?: { label: string; href: string; isExternal: boolean }[];
}

export function NavLink({ label, href, subMenuItems }: NavLinkProps) {
    return (
        <li key={label}>
            <Link href={href}>{label}</Link>
            {subMenuItems !== undefined && (
                <ul className="p-2">
                    {subMenuItems?.map(({ label, href, isExternal }) => {
                        return (
                            <li key={label}>
                                <Link
                                    href={href}
                                    target={isExternal ? "_blank" : undefined}
                                >
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm px-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {links.map((link) => NavLink(link))}
                    </ul>
                </div>
                <button className="btn btn-ghost">Logo</button>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link href="/prompts">Prompts</Link>
                    </li>
                    <li>
                        <Link href="/corrections">Corrections</Link>
                    </li>
                    <li>
                        <Link href="/challenges">Challenges</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-3">
                <ThemeController />
                <button className="btn btn-sm rounded-full btn-primary">
                    Write
                </button>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm btn-ghost btn-circle"
                    >
                        <div className="avatar avatar-placeholder">
                            <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                <span>DZ</span>
                            </div>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
                    >
                        <li>
                            <Link href="/users/slug">Profile</Link>
                        </li>
                        <li>
                            <Link href="/settings">Settings</Link>
                        </li>
                        <li>
                            <Link href="/logout">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
