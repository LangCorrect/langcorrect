import Link from "next/link";
import { auth } from "@/auth";
import {
    FaChessKnight,
    FaCircleCheck,
    FaGear,
    FaHouse,
    FaLightbulb,
    FaNewspaper,
    FaPen,
    FaThumbsUp,
    FaUser,
} from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { LoginButton, SignoutButton } from "./button";

const links = [
    {
        label: "Home",
        href: "/",
        icon: <FaHouse />,
    },
    {
        label: "Posts",
        href: "/posts",
        icon: <FaNewspaper />,
    },
    {
        label: "Prompts",
        href: "/prompts",
        icon: <FaLightbulb />,
    },
    {
        label: "Corrections",
        href: "/corrections",
        icon: <FaCircleCheck />,
    },
    {
        label: "Challenges",
        href: "/challenges",
        icon: <FaChessKnight />,
    },
    {
        label: "Socials",
        href: "#",
        icon: <FaThumbsUp />,
        disabled: true,
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
    icon: React.ReactElement;
    disabled?: boolean;
    subMenuItems?: { label: string; href: string; isExternal: boolean }[];
}

export function NavLink({
    label,
    href,
    icon,
    disabled,
    subMenuItems,
}: NavLinkProps) {
    return (
        <li key={label}>
            <Link
                href={href}
                className={disabled ? "pointer-events-none" : undefined}
            >
                {icon} {label}
            </Link>
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

export default async function Navbar() {
    const session = await auth();
    const isLoggedIn = session !== null && session.user !== null;

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
                        <Link href="/">
                            <FaHouse />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/posts">
                            <FaNewspaper />
                            Posts
                        </Link>
                    </li>
                    <li>
                        <Link href="/prompts">
                            <FaLightbulb />
                            Prompts
                        </Link>
                    </li>
                    <li>
                        <Link href="/corrections">
                            <FaCircleCheck />
                            Corrections
                        </Link>
                    </li>
                    <li>
                        <Link href="/challenges">
                            <FaChessKnight />
                            Challenges
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-3">
                <button className="btn btn-sm btn-accent rounded">
                    <FaPen /> Write
                </button>
                {isLoggedIn ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm btn-ghost btn-circle"
                        >
                            <div className="avatar avatar-placeholder">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <span>{/* TODO:  */} DZ</span>
                                </div>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100  z-1 mt-3 w-52 p-2 shadow-sm border-1 border-base-300"
                        >
                            <li>
                                <Link href="/users/slug">
                                    <FaUser />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings">
                                    <FaGear />
                                    Settings
                                </Link>
                            </li>
                            <li>
                                <SignoutButton />
                            </li>
                        </ul>
                    </div>
                ) : (
                    <LoginButton />
                )}
            </div>
        </div>
    );
}
