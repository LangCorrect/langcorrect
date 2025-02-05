import Link from "next/link";
import { logout } from "@/actions/auth";
import { FaRightFromBracket } from "react-icons/fa6";

function LoginButton() {
    return (
        <Link href="/login" className="btn btn-sm btn-secondary rounded">
            Login
        </Link>
    );
}

function SignoutButton() {
    return (
        <form className="flex gap-2" action={logout}>
            <FaRightFromBracket />
            <button type="submit" className="cursor-pointer">
                Logout
            </button>
        </form>
    );
}

export { LoginButton, SignoutButton };
