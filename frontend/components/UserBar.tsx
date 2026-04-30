"use client";

import { useState, useEffect } from "react";

import { getMe } from "@/api/auth"
import { useRouter } from "next/navigation";

const UserBar = () => {
    const router = useRouter();

    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await getMe();
                setUserEmail(res.data.user.email);
            } catch (e) {
                console.error(e);
            }
        };

        fetchMe();
    }, []);

    return (
        <div className="flex items-center gap-3">
            <>
                <span className="text-md text-gray-500">
                    {userEmail}
                </span>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        setUserEmail(null);
                        router.push("/auth");
                    }}
                    className="text-sm underline"
                >
                    Logout
                </button>
            </>
        </div>
    );
}

export default UserBar