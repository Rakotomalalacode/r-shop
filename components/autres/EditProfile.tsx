"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LiaUserEditSolid } from "react-icons/lia";

const EditProfile = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!user?.id) {
            router.push("/login");
        } else {
            setForm({
                name: user.name || "",
                email: user.email || "",
                password: user.password || "",
            });
            setLoading(false);
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setProfileImage(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        let imageUrl = "";
        if (profileImage) {
            imageUrl = URL.createObjectURL(profileImage);
        }

        const res = await fetch(`/api/user/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, profileImage: imageUrl }),
        });

        if (res.ok) {
            const updatedUser = await res.json();
            localStorage.setItem("user", JSON.stringify(updatedUser));
            alert("Profil mis à jour !");
            router.push("/clients");
        } else {
            alert("Erreur lors de la mise à jour.");
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (


        <Dialog>
            <DialogTrigger className="w-full border-none">
                <div className="flex w-full justify-between items-center border-none">
                    <p>Modifier le profil</p>
                    <LiaUserEditSolid size={25} />
                </div>
            </DialogTrigger>
            <DialogContent>
                <div className="p-5 max-w-md mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold mb-4">
                            Modifier le profil
                        </DialogTitle>
                    </DialogHeader>
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nom"
                            value={form.name}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="password"
                            placeholder="Entre votre news mot de passe"
                            value={form.password}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <Button type="submit">Mettre à jour</Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default EditProfile;



/*"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EditProfile = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!user?.id) {
            router.push("/login");
        } else {
            setForm({
                name: user.name || "",
                email: user.email || "",
                password: user.password || "",
            });
            setLoading(false);
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setProfileImage(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        let imageUrl = "";
        if (profileImage) {
            imageUrl = URL.createObjectURL(profileImage); 
        }

        const res = await fetch(`/api/user/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, profileImage: imageUrl }),
        });

        if (res.ok) {
            const updatedUser = await res.json();
            localStorage.setItem("user", JSON.stringify(updatedUser));
            alert("Profil mis à jour !");
            router.push("/clients");
        } else {
            alert("Erreur lors de la mise à jour.");
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="p-5 max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Modifier le profil</h1>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Entre votre news mot de passe"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <Button type="submit">Mettre à jour</Button>
            </form>
        </div>
    );
};

export default EditProfile;
*/