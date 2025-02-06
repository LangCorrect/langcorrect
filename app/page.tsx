import { getCurrentUser } from "@/features/auth/data";

export default async function HomePage() {
    const currentUser = await getCurrentUser();

    return (
        <div className="container mx-auto my-10 ">
            <div className="flex flex-col gap-5">
                <div className="card bg-base-100 p-6 border border-base-300 shadow-sm">
                    <h2 className="text-xl font-bold">Session Data</h2>
                    <p className="text-base-content whitespace-break-spaces">
                        {JSON.stringify(currentUser, null, 4)}
                    </p>
                </div>
            </div>
        </div>
    );
}
