"use client"

const Footer = ({profileInfo, user}) => {

    const menuItems = [
        { label: 'Home', path: '/', show: true },
        { label: 'Login', path: '/sign-in', show: !user },
        { label: 'Register', path: '/sign-up', show: !user },
        { label: 'Jobs', path: '/jobs', show: user },
        { label: 'Activity', path: '/activity', show: profileInfo?.role === 'candidate' },
        { label: 'Membership', path: '/membership', show: user },
        { label: 'Account', path: '/account', show: user },
    ]

    const socialLinks = [
        {
            label: 'LinkedIn',
            path: 'https://www.linkedin.com/in/anjali-singh-b43515276/',
        },
        {
            label: 'GitHub',
            path: 'https://github.com/AnjaliSingh605',
        },
    ]

    return (
        <footer className="w-full bg-gray-900 border-t border-gray-800 px-20 py-10">
            <div className="flex items-start justify-between gap-10">

                {/* Left — Brand */}
                <div className="flex-1">
                    <p className="text-lg font-bold tracking-widest text-white mb-2">JOBSCO</p>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-[220px] mb-4">
                        Thousands of jobs across tech, design, finance, and more — updated daily.
                    </p>
                    <div className="inline-flex items-center gap-2 border border-gray-700 bg-gray-800 rounded-full px-3 py-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-xs text-gray-400">500,000+ active listings</span>
                    </div>
                </div>

                {/* Center — Navigate */}
                <div className="flex-1 flex flex-col items-center">
                    <h4 className="text-xs tracking-widest uppercase text-gray-500 mb-4">Navigate</h4>
                    <ul className="flex flex-col items-center gap-2">
                        {menuItems.map((item, i) =>
                            item.show ? (
                                <li key={i}>
                                    <a href={item.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                                        {item.label}
                                    </a>
                                </li>
                            ) : null
                        )}
                    </ul>
                </div>

                {/* Right — Social */}
                <div className="flex-1 flex flex-col items-end">
                    <h4 className="text-xs tracking-widest uppercase text-gray-500 mb-4">Follow us</h4>
                    <ul className="flex flex-col items-end gap-2">
                        {socialLinks.map((item, i) => (
                            <li key={i}>
                                <a
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-800 flex-wrap gap-2">
                <p className="text-xs text-gray-600">© 2026 Jobsco. All rights reserved.</p>
                <p className="text-xs text-gray-600">Privacy · Terms</p>
            </div>
        </footer>
    );
};

export default Footer;