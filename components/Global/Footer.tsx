import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    const footerLinks = {
        Product: [
            { label: "Pricing", href: "/pricing" },
            { label: "Compare", href: "/compare" },
        ],
        Resources: [
            { label: "Help Center", href: "/help" },
            { label: "Use Cases", href: "/use-cases" },
        ],
        Company: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
        ],
        Legal: [
            { label: "Privacy Policy", href: "/legal/privacy-policy" },
            { label: "Terms of Service", href: "/legal/terms-of-service" },
            { label: "Cookie Policy", href: "/legal/cookie-policy" },
            { label: "Acceptable Use Policy", href: "/legal/acceptable-use-policy" },
            { label: "Data Processing Agreement", href: "/legal/dpa" },
            { label: "Security & Compliance", href: "/legal/security-policy" },
        ],
    };

    return (
        <footer className="bg-background border-t border-border">
            <div className="border-b border-border">
                <div className="container-wide py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">Stay in the loop</h3>
                            <p className="text-muted-foreground">Get the latest on product updates, tips, and social media insights.</p>
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground w-64 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <Button size="lg" className="group">
                                Subscribe
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-wide py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-4 -mt-16">
                            <Image
                                src="/zyvarin-logo_1.png"
                                alt="Zyvarin Logo"
                                width={126}
                                height={126}
                                className="h-48 w-48 object-contain relative -ml-16"
                            />
                            <div className="flex flex-col relative -ml-16">
                                <span className="text-lg font-bold text-foreground tracking-tight leading-none">Zyvarin</span>
                                <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Write Once</span>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed -mt-16">
                            The smarter way to manage social media. Trusted by 50,000+ teams worldwide.
                        </p>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-foreground mb-4 text-sm">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link, index) => {
                                    const isObject = typeof link === 'object';
                                    const label = isObject ? link.label : link;
                                    const href = isObject ? link.href : '#';
                                    return (
                                        <li key={index}>
                                            <Link
                                                href={href}
                                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Zyvarin, Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Twitter", "LinkedIn", "GitHub", "YouTube"].map((social) => (
                            <a key={social} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
