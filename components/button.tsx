import Link from "next/link";
import { signOut } from "@/auth";
import { FaRightFromBracket } from "react-icons/fa6";

function LoginButton() {
    return (
        <Link
            href="/api/auth/signin"
            className="btn btn-sm btn-secondary rounded"
        >
            Login
        </Link>
    );
}

function SignoutButton() {
    return (
        <form
            className="flex gap-2 "
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <FaRightFromBracket />
            <button type="submit" className="cursor-pointer">
                Logout
            </button>
        </form>
    );
}

export { LoginButton, SignoutButton };
