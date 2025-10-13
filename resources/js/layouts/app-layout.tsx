import { Alert, AlertTitle } from '@/components/ui/alert';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const {flash} = usePage().props;
    console.log(flash)
    return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {flash.message && <Alert>
            <CheckCircle2Icon />
        <AlertTitle>{flash.message}</AlertTitle></Alert>}

        {flash.alert && <Alert className='text-destructive' variant='destructive'>
            <AlertCircleIcon />
        <AlertTitle>{flash.alert}</AlertTitle></Alert>}

        {children}
    </AppLayoutTemplate>
)};
