import { auth } from "@/auth";

export default async function HomePage() {
    const session = await auth();
    return (
        <div className="container mx-auto my-10 ">
            <div className="flex flex-col gap-5">
                <div className="card bg-base-100 p-6 border border-base-300 shadow-sm">
                    <h2 className="text-xl font-bold">Session Data</h2>
                    <p className="text-base-content whitespace-break-spaces">
                        {JSON.stringify(session, null, 4)}
                    </p>
                </div>
            </div>
        </div>
    );
}
