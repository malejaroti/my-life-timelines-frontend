import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { label: "Demo", href: "#demo" },
        { label: "Features", href: "#features" },
        // { label: "GitHub", href: "#built-with" },
        { label: "Sign in", href: "/sign-in" },
    ];

return (
    <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
            ? "bg-card/90 backdrop-blur-md border-border shadow-sm"
            : "bg-transparent"
        }`}
    >

    <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className={`text-xl font-bold tracking-tight ${
                    scrolled ? "text-[#2c5bbc]" : "text-amber-400"
                }`}>
            My Life Timelines
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
            <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                    scrolled ? "text-[#2c5bbc]" : "text-white"
                }`}
            >
                {link.label}
            </a>
            ))}
            <Button variant="contained" sx={{ size: "small", color:'white'}} onClick={()=>navigate('/sign-up')}>
                Sign Up
            </Button>
        </div>

        </div>
    </nav>
);
};

export default Navbar;
