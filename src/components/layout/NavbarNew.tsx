import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from "react-router";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthPage = ["/sign-in", "/sign-up"].includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { label: "Demo", href: "/", scrollTo: "demo" },
        { label: "Features", href: "/", scrollTo: "features" },
        // { label: "GitHub", href: "#built-with" },
        { label: "Sign in", href: "/sign-in" },
    ];

return (
    <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
    >

    <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className={`text-xl font-bold tracking-tight ${
                    scrolled || isAuthPage ? "text-[#2c5bbc]" : "text-amber-400"
                }`}>
            My Life Timelines
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
            <Link
                key={link.label}
                to={link.href}
                state={link.scrollTo ? { scrollTo: link.scrollTo } : undefined}
                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                    scrolled || isAuthPage ? "text-[#2c5bbc]" : "text-white"
                }`}
            >
                {link.label}
            </Link>
            ))}
            <Button variant="contained" sx={{ size: "small", color:'white'}} onClick={()=>navigate('/sign-up')}>
                Sign Up
            </Button>
        </div>

        {/* Mobile toggle */}
        <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
        >
            {mobileOpen
                ? <CloseIcon sx={{ color: scrolled ? '#2c5bbc' : 'white' }} />
                : <MenuIcon sx={{ color: scrolled ? '#2c5bbc' : 'white' }} />
            }
        </button>
    </div>

    {/* Mobile menu */}
    {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pb-4 space-y-3">
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm font-medium text-gray-600 hover:text-[#2c5bbc] py-1"
                    onClick={() => setMobileOpen(false)}
                >
                    {link.label}
                </a>
            ))}
            <Button variant="contained" sx={{ width: '100%', color: 'white' }} onClick={() => { navigate('/sign-up'); setMobileOpen(false); }}>
                Sign Up
            </Button>
        </div>
    )}
    </nav>
);
};

export default Navbar;
