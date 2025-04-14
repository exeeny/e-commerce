import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { DollarSign } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wallet',
        href: '/profile/wallet',
    },
];

export default function Wallet() {

    const { auth } = usePage<SharedData>().props;


    const [balance, setBalance] = useState<number>(auth.user.balance);
    const [topUpAmount, settopUpAmount] = useState<number>(0);

    const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        settopUpAmount(Number(e.target.value))
    }

    const topUp = async () => {
        try {
           const result =  await axios.put('/profile/wallet', {
                balance: topUpAmount
            })
            console.log(result.data)
            setBalance((prev) => prev + topUpAmount);
            
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Wallet" />
            <h1 className='font-bold text-xl mx-auto'>Current Wallet Balance: ${balance}</h1>
            

            
<div className="max-w-sm mx-auto m-2">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter amount</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <DollarSign className="w-5 h-5 text-gray-500" />
    </div>
    <input  onChange={handleBalanceChange} value={topUpAmount} type="number"  id="balance" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000" / >
  </div>

  <button className=' mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={topUp}>top up</button>

</div>

 
               
                
            
        </AppLayout>
    );
}
