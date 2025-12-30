export default function Footer() {
    return (
        <footer className="border-t border-border mt-20">
            <div className="container-custom py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-text-secondary text-sm">
                        © {new Date().getFullYear()} Aman Blogs. Built with Next.js, Supabase & ❤️
                    </div>
                    <div className="flex gap-6 text-sm">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
                            GitHub
                        </a>
                        <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
