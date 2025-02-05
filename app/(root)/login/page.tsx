import LoginForm from "@/components/login-form";

export default function LoginPage() {
    return (
        <main className="mx-auto container max-w-md mt-10">
            <div className="card p-6 bg-base-100 border border-base-300 shadow">
                <LoginForm />
            </div>
        </main>
    );
}
