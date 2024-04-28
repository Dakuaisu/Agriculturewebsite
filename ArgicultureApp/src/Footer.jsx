function Footer() {
    return (
        <footer class="bg-white  shadow  dark:bg-primary fixed bottom-0 w-full z-10">
            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span class="text-sm text-text sm:text-center dark:text-text"> <a href="/" class="hover:underline">AgriApp</a>
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-text sm:mt-0">
                    <li>
                        <a href="/About.html" class="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="/Services.html" class="hover:underline me-4 md:me-6">Services</a>
                    </li>
                    <li>
                        <a href="/CropRecc.html" class="hover:underline me-4 md:me-6">Crop Recommendation</a>
                    </li>
                    <li>
                        <a href="/WeatherAna.html" class="hover:underline me-4 md:me-6">Weather Analysis</a>
                    </li>
                    <li>
                        <a href="/Roadmap.html" class="hover:underline ">RoadMap</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
