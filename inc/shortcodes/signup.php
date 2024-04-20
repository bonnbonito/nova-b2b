<div class="nova-b2b">
    <form class="nova-signup w-full border border-nova-light rounded-md px-8 pt-6 pb-8" id="novaSignUpForm">
        <div class="md:flex md:gap-x-20 mb-9">
            <div class="form-field flex-1 mb-9 md:mb-0">
                <label class="block mb-2 font-title uppercase" for="firstName">
                    First Name
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="firstName" name="firstName" type="text" placeholder="First Name" required>

            </div>

            <div class="form-field flex-1">
                <label class="block mb-2 font-title uppercase" for="lastName">
                    Last Name
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="lastName" type="text" name="lastName" placeholder="Last Name" required>

            </div>
        </div>

        <div class="md:flex md:gap-x-20 mb-9">
            <div class="form-field flex-1 mb-9 md:mb-0">
                <label class="block mb-2 font-title uppercase" for="businessName">
                    Business Name
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="businessName" name="businessName" type="text" placeholder="Business Name" required>

            </div>

            <div class="form-field flex-1">
                <label class="block mb-2 font-title uppercase" for="businessEmail">
                    Business Email
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="businessEmail" name="businessEmail" type="email" placeholder="Business Email" required>

            </div>
        </div>

        <div class="md:flex md:gap-x-20 mb-9">
            <div class="form-field flex-1 mb-9 md:mb-0">
                <label class="block mb-2 font-title uppercase" for="businessType">
                    Business Type
                </label>
                <select id="businessType" name="businessType"
                    class="rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    required>
                    <option value="">Select Business Type</option>
                    <option value="sign-shops">Sign Shops</option>
                    <option value="printing-shops">Printing Shops</option>
                    <option value="display">Display and Tradeshow firms</option>
                    <option value="graphics">Graphics</option>
                    <option value="marketing-agencies">Marketing Agencies</option>
                    <option value="others">Others</option>
                </select>
            </div>

            <div class="form-field flex-1">
                <label class="block mb-2 font-title uppercase" for="businessWebsite">
                    Business Website
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="businessWebsite" name="businessWebsite" type="text" placeholder="Business Website">

            </div>
        </div>

        <div class="md:flex md:gap-x-20 mb-9">
            <div class="form-field flex-1 mb-9 md:mb-0">
                <label class="block mb-2 font-title uppercase" for="businessPhone">
                    Business Phone Number
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="businessPhone" name="businessPhone" type="text" placeholder="Business Phone Number" required>

            </div>


        </div>

        <div class="md:flex md:gap-x-20 mb-9">
            <div class="form-field flex-1">
                <label class="block mb-2 font-title uppercase" for="country">
                    Country
                </label>
                <select id="country" name="country"
                    class="rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    required>
                    <option value="">Select Country</option>
                    <option value="US">US</option>
                    <option value="CA">Canada</option>
                </select>
            </div>

            <div class="form-field flex-1 hidden" id="taxField">
                <label class="block mb-2 font-title uppercase" for="taxId">
                    Federal Business Number
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="taxId" name="taxId" type="text" placeholder="Tax ID/Business Registration #">
            </div>
        </div>

        <div class="md:flex md:gap-x-20 mb-9">
            <div class="form-field flex-1">
                <label class="block mb-2 font-title uppercase" for="street">
                    Street Address
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="street" name="street" type="text" placeholder="Street Address" required>
            </div>
        </div>

        <div class="md:flex md:gap-x-10 xl:gap-x-20 mb-14">
            <div class="form-field flex-1 mb-9 md:mb-0">
                <label class="block mb-2 font-title uppercase" for="city">
                    Town/City
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="city" name="city" type="text" placeholder="Town/City" required>
            </div>

            <div class="form-field flex-1 mb-9 md:mb-0">
                <label class="block mb-2 font-title uppercase" for="state">
                    State
                </label>
                <select id="state" name="state"
                    class="appearance-none rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    required>
                    <option value="">Select State</option>
                </select>
            </div>

            <div class="form-field flex-1">
                <label class="block mb-2 font-title uppercase" for="zip">
                    Zip Code
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="zip" name="zip" type="text" placeholder="Zip Code" required>
            </div>
        </div>

        <div id="pstField" class="hidden">

            <div class="md:flex md:gap-x-20 mb-9">
                <div class="form-field md:w-1/2">
                    <label class="block mb-2 font-title uppercase" for="street">
                        PST #
                    </label>
                    <input
                        class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                        id="pst" name="pst" type="text" placeholder="PST #">
                </div>
            </div>

        </div>


        <div class="md:flex md:gap-x-20 md:gap-y-10 mb-14 flex-wrap">
            <div class="form-field md:w-1/2 mb-9 md:mb-0">
                <label class="block mb-2 font-title uppercase" for="username">
                    Username
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="username" name="username" type="text" placeholder="Username" autocomplete="username" required>
            </div>

            <div class="form-field md:w-1/2">
                <label class="block mb-2 font-title uppercase" for="password">
                    Password
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="password" name="password" type="password" placeholder="*******" autocomplete="current-password"
                    required>
            </div>
        </div>

        <div class="flex gap-x-20 mb-14 flex-wrap">
            <div class="w-full mb-6">
                <h6 class="uppercase text-[#2f2f2f]">How did you hear about us?</h6>
            </div>
            <div class="sm:flex flex-1 w-full gap-y-14 flex-wrap">
                <div class="flex items-center mb-4 w-full sm:w-1/4">
                    <input id="google" type="checkbox" value="google" name="hear[]"
                        class="w-5 h-5 text-nova-primary border-nova-light focus:ring-nova-primary ">
                    <label for="google" class="ms-3 text-sm font-medium text-nova-gray">Google</label>
                </div>
                <div class="flex items-center mb-4 w-full sm:w-1/4">
                    <input id="youtube" type="checkbox" value="youtube" name="hear[]"
                        class="w-5 h-5 text-nova-primary border-nova-light focus:ring-nova-primary ">
                    <label for="youtube" class="ms-3 text-sm font-medium text-nova-gray">Youtube</label>
                </div>
                <div class="flex items-center mb-4 w-full sm:w-1/4">
                    <input id="newsletter" type="checkbox" value="newsletter" name="hear[]"
                        class="w-5 h-5 text-nova-primary border-nova-light focus:ring-nova-primary ">
                    <label for="newsletter" class="ms-3 text-sm font-medium text-nova-gray">Email/Newsletter</label>
                </div>
                <div class="flex items-center mb-4 w-full sm:w-1/4">
                    <input id="other" type="checkbox" value="other" name="hear[]"
                        class="w-5 h-5 text-nova-primary border-nova-light focus:ring-nova-primary ">
                    <label for="other" class="ms-3 text-sm font-medium text-nova-gray">Other</label>
                </div>
                <div class="flex items-center mb-4 w-full sm:w-1/4">
                    <input id="referral" type="checkbox" value="referral" name="hear[]"
                        class="w-5 h-5 text-nova-primary border-nova-light focus:ring-nova-primary ">
                    <label for="referral" class="ms-3 text-sm font-medium text-nova-gray">Referral</label>
                </div>
            </div>
        </div>

        <div class="md:flex md:gap-x-20 md:gap-y-10 mb-14 flex-wrap hidden" id="referralField" style="display: none;">
            <div class="form-field md:w-1/2 mb-9 md:mb-0">
                <label class="block mb-2 font-title uppercase" for="referredBy">
                    Referred by:
                </label>
                <input
                    class="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                    id="referredBy" name="referredBy" type="text" placeholder="Name">
            </div>

        </div>


        <div class="flex flex-1 w-full gap-y-6 flex-wrap mb-14">

            <div class="flex items-center mb-4 w-full">
                <input id="privacy" type="checkbox" value="yes" name="privacy"
                    class="w-5 h-5 text-nova-primary border-nova-light focus:ring-nova-primary" required>
                <label for="privacy" class="ms-3 text-sm font-medium text-nova-gray">Yes, I have read the <a
                        class="text-black" href="/privacy-policy" target="_blank">Privacy
                        Policy.</a></label>
            </div>
        </div>


        <div class="flex justify-center">
            <input type="hidden" name="action" value="nova_signup">
            <button type="submit"
                class="uppercase font-title w-full max-w-[820px] mx-auto py-2 bg-nova-primary hover:bg-nova-secondary"
                id="submitBtn">Submit
                Application</button>
        </div>


    </form>
</div>
