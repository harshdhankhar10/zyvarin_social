"use client"

import { useState, use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    checkSession();
  }, []);

  const navItems = [
    { label: "About", href: "/about" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Pricing", href: "/pricing" },
      { label: "Compare", href: "/compare" },
    { label: "Help", href: "/help" },
  ];
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-7xl mx-auto bg-background/80 backdrop-blur-2xl border border-border/40 rounded-2xl shadow-lg">
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Image
                  src="/zyvarin-logo_1.png"
                  alt="Zyvarin Logo"
                  width={126}
                  height={126}
                  className="h-48 w-48 object-contain relative -ml-16"
                />
                <div className="flex flex-col relative -ml-16">
                  <span className="text-lg font-bold text-foreground tracking-tight leading-none">Zyvarin</span>
                  <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Write Once, Publish Everywhere</span>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-xl p-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.href)}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

             {session ? (
                <div className="hidden lg:flex items-center gap-3">
                  <Button size="sm" variant={"accent"} onClick={() => router.push('/dashboard')}>
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => signOut()}>
                    Sign out
                  </Button>
                </div>
             ) : (
               <div className="hidden lg:flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => router.push('/signin')}>
                  Sign in
                </Button>
                <Button size="sm" variant={"accent"} onClick={() => router.push('/signup')}>
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Start free
                </Button>
              </div>
             )}

              <button
                className="lg:hidden p-2.5 text-foreground hover:bg-secondary rounded-xl transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="lg:hidden px-6 pb-6 border-t border-border/30 animate-fade-up">
              <div className="flex flex-col gap-1 pt-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      router.push(item.href);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between py-3 px-4 text-foreground hover:bg-secondary rounded-xl transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
                <hr className="my-3 border-border/30" />
                {session ? (
                  <div className="flex flex-col gap-2">
                    <Button variant="accent" onClick={() => router.push('/dashboard')} className="h-12 rounded-xl">
                      Go to Dashboard
                    </Button>
                    <Button variant="outline" onClick={() => signOut()} className="h-12 rounded-xl">
                      Sign out
                    </Button>
                  </div>
                ) : (
                   <div>
                 <Button variant="outline" onClick={() => router.push('/signin')} className="h-12 rounded-xl">
                  Sign in
                </Button>
                <Button variant="accent" onClick={() => router.push('/signup')} className="mt-2 h-12 rounded-xl">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start free trial
                </Button>
               </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
