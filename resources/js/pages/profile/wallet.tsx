import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { DollarSign } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wallet',
        href: '/profile/wallet',
    },
];

export default function Wallet() {

    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing} = useForm({
        balance: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('update_wallet'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Wallet" />
            <h1 className='font-bold text-xl mx-auto'>Current Wallet Balance: ${auth.user.balance}</h1>

            <div className='flex items-center justify-center mb-4'>
                <form onSubmit={submit} className='flex flex-col gap-2 '>
                <Input
                    type='number'
                    id="balance"
                    className="mt-1 block w-full"
                    value={data.balance}
                    onChange={(e) => setData('balance', e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="enter your ammount" />
                    <InputError className="mt-2" message={errors.balance} />
                    <Button disabled={processing}>Save</Button>
            </form>
            </div>
        </AppLayout>
    );
}
