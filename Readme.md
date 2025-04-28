Project Description:

This project is a functional e-commerce application designed to facilitate online shoping experiences. 
Built with Laravel ver. 12 and React library (using typescript) starter pack, it includes essential features such as product management, user authentication, 
a cart system, and order processing.

Features:
User registration and login system.
Shopping cart functionality to add and remove items.
Order processing:
 - Validates product availability and user balance.
 - Deducts stock quantity and user balance upon successful order completion.

Provides error messages for invalid actions.

Tech Stack:
Frontend: React (TypeScript), Tailwind.
Backend: Laravel framework.

How to install (for herd users):


- git clone https://github.com/exeeny/e-commerce.git
- cd repository-name
- cp .env.example .env
- composer install
- php artisan key:generate
- php artisan migrate (click yes to make db file)
- php artisan db:seed --class=ProductSeeder (seeding products into database with provided by me info)


next:

- npm install
- npm run build

done

if u're not a herd user, installing proccess is practically the same