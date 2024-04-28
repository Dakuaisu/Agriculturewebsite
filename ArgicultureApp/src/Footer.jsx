function Footer() {
    return (
        <footer className="bg-white  shadow  dark:bg-primary fixed bottom-0 w-full z-10">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-text sm:text-center dark:text-text"> <a href="/" className="hover:underline">AgriApp</a>
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-text sm:mt-0">
                    <li>
                        <a href="/About.html" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="/Services.html" className="hover:underline me-4 md:me-6">Services</a>
                    </li>
                    <li>
                        <a href="/CropRecc.html" className="hover:underline me-4 md:me-6">Crop Recommendation</a>
                    </li>
                    <li>
                        <a href="/WeatherAna.html" className="hover:underline me-4 md:me-6">Weather Analysis</a>
                    </li>
                    <li>
                        <a href="/Roadmap.html" className="hover:underline ">RoadMap</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
