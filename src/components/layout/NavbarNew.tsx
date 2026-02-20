import { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth.context";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);


    if (!authContext) {
        throw new Error('This page must be used within an AuthWrapper');
    }

    const { isLoggedIn } = authContext;
    const handleGetStarted = () => {
        if (isLoggedIn) {
            navigate('/lifetimeline');
        } else {
            navigate('/sign-up');
        }
    };
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
            {/* <Button
                onClick={handleGetStarted}
                variant="contained"
                size="large"
                sx={{
                    fontSize: '1rem',
                    borderRadius: 4,
                    textTransform: 'none',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    // fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#1e3a8a',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 30px rgba(59, 130, 246, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                }}
                >
                {isLoggedIn ? 'View Your Timeline' : 'Create Your Timeline'}
                </Button> */}
        </div>

        </div>
    </nav>
);
};

export default Navbar;
