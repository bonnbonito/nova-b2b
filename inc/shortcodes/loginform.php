<form class="grid grid-cols-1 gap-2" id="novaLoginForm">
    <label class="block">
        <span class="text-gray-700 font-title uppercase text-[14px]">Email address/Username</span>
        <input type="text" required name="login"
            class="text-xs p-2 mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="john@example.com">
    </label>
    <label class="block">
        <span class="text-gray-700 font-title uppercase text-[14px]">Password</span>
        <input type="password" required name="user_password"
            class="text-xs p-2 mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    </label>
    <input type="hidden" name="action" value="nova_login">
    <button type="submit" class="block rounded button" id="submitBtn">Sign In</button>
    <div id="loginStatus"></div>
</form>
