
function Navigation(){
  return(
      <>
      <nav className="bg-text border-gray-200 dark:bg-secondary">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="./src/Images/image.png" className="h-8" alt="AgriApp Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-text">AgriApp</span>
        </div>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" className="flex text-sm bg-secondary rounded-full md:me-0 focus:ring-4 focus:ring-primary dark:focus:ring-secondary" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"></img>
            </button>
            <div className="z-50 hidden my-4 text-base list-none bg-text divide-y divide-text rounded-lg shadow dark:bg-white dark:divide-gray-600" id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-text dark:text-black">Bonnie Green</span> 
                <span className="block text-sm  text-gray-500 truncate dark:text-black">name@flowbite.com</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-text hover:bg-text dark:hover:bg-gray-200 dark:text-black dark:hover:text-black">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-text hover:bg-text dark:hover:bg-gray-600 dark:text-black dark:hover:text-black">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-text hover:bg-text dark:hover:bg-gray-600 dark:text-black dark:hover:text-black">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-text hover:bg-text dark:hover:bg-gray-600 dark:text-black dark:hover:text-black">Sign out</a>
                </li>
              </ul>
            </div>
            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg md:hidden hover:bg-text focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-secondary" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-text rounded-lg bg-text md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-text dark:bg-primary md:dark:bg-secondary dark:border-gray-700">
            <li>
                <a href="/" className="block py-2 px-3 text-text rounded hover:bg-text md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-text md:dark:hover:text-primary dark:hover:bg-secondary dark:hover:text-text md:dark:hover:bg-transparent dark:border-secondary">Home</a>
            </li>
            <li>
              <a href="../About.html" className="block py-2 px-3 text-text rounded hover:bg-text md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-text md:dark:hover:text-primary dark:hover:bg-secondary dark:hover:text-text md:dark:hover:bg-transparent dark:border-secondary">About</a>
            </li>
            <li>
              <a href="../Services.html" className="block py-2 px-3 text-text rounded hover:bg-text md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-text md:dark:hover:text-primary dark:hover:bg-secondary dark:hover:text-text md:dark:hover:bg-transparent dark:border-secondary">Services</a>
            </li>
            {/* <li>
              <a href="#" className="block py-2 px-3 text-text rounded hover:bg-text md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-text md:dark:hover:text-primary dark:hover:bg-secondary dark:hover:text-text md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-text rounded hover:bg-text md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-text md:dark:hover:text-primary dark:hover:bg-secondary dark:hover:text-text md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li> */}
          </ul>
        </div>
        </div>
      </nav>
      </>
  )
}
export default Navigation
