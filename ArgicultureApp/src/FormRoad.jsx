function FormRoad(){
    return(
        <>
        <form className="max-w-sm h-10 w-72 mx-auto">
        
            
            <label for="underline_select" className="sr-only">Underline select</label>
            <select id="underline_select" className="relative z-0 mb-5 group block py-2.5 px-0 w-full text-sm  text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                <option selected>Choose a Crop</option>
                <option value="US">Wheat</option>
                <option value="CA">Barley</option>
                <option value="FR">Corn</option>
                <option value="DE">Sugar Cane</option>
            </select>
            <div className="relative z-0 w-full mb-5 group">
                <input type="number" name="floating_Amount" pattern="[0-9]" id="floating_Amount" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " required />
                <label for="floating_Amount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount (in Tons)</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_Location" id="floating_Location" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " required />
                        <label for="floating_Location" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location</label>
                    </div>
                    <button type="submit" className="text-white bg-secondary hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-secondary dark:hover:bg-green-900 dark:focus:ring-green-800">Create Roadmap</button>
          </form>
        </>
    );
}
export default FormRoad