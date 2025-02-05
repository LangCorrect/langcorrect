"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";
import { cn } from "@/lib/utils";
import Alert from "./alert";

export default function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined);
    const isPasswordInvalid = state?.errors?.password !== undefined;
    const isEmailInvalid = state?.errors?.email !== undefined;

    return (
        <>
            <form action={action} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        required
                        disabled={pending}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="me@example.com"
                        className={cn(
                            "input w-full",
                            isEmailInvalid && "input-error"
                        )}
                    />
                    {state?.errors?.email && (
                        <div className="text-error">
                            {state.errors?.email.map((msg, idx) => (
                                <p key={idx}>{msg}</p>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                        required
                        minLength={8}
                        maxLength={40}
                        disabled={pending}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="********"
                        className={cn(
                            "input w-full",
                            isPasswordInvalid && "input-error"
                        )}
                    />
                    {state?.errors?.password && (
                        <div className="text-error">
                            {state.errors?.password.map((msg, idx) => (
                                <p key={idx}>{msg}</p>
                            ))}
                        </div>
                    )}
                </div>

                {state?.message && (
                    <Alert variant="error" message={state?.message} />
                )}

                <button
                    className="btn btn-block btn-primary"
                    type="submit"
                    disabled={pending}
                >
                    Log in
                </button>
            </form>
        </>
    );
}
