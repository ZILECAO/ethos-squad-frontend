import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { EthosConnectStatus, SignInButton, ethos } from 'ethos-connect';
import { FC, useState } from 'react';

const navigation = [
    { name: 'Spot', href: '/' },
    { name: 'Bridge', href: '/' },
    { name: 'Derivatives', href: '/' },
    { name: 'Rewards', href: '/' },
];

const Header: FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { status } = ethos.useWallet();

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex max-w-screen items-center justify-between lg:mx-4 p-6" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5 flex flex-row items-center gap-3">
                        <span className="sr-only">Ethos Squad</span>
                        <img
                            className="h-12 w-auto"
                            src="/iguazu_logo.png"
                            alt=""
                        />
                        <span className='flex gap-1'>
                            <h1 className="text-xl font-light tracking-tight text-yellow-100 sm:text-2xl">
                            Project 
                            </h1>
                            <h1 className="text-xl font-bold tracking-tight text-yellow-100 sm:text-2xl">
                            Iguazu
                            </h1>
                        </span>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-yellow-100">
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:block rounded-md ml-12 bg-yellow-100 px-4 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 transition duration-700 ease-in-out">
                    {status === EthosConnectStatus.Connected ? <ethos.components.AddressWidget /> : <SignInButton />}
                </div>
            </nav>
            {/* BEGIN MOBILE MENU */}
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-yellow-100 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <SignInButton />
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* END MOBILE MENU */}
        </header>
    );
};

export default Header;
