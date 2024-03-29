//Source: https://tailwindui.com/components/application-ui/navigation/navbars
//Requires Tailwind CSS v2.0+

import React from 'react';
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { ConnectWallet } from './ConnectWallet';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

const navigation = [
  { name: 'Shelf', href: '/shelf', current: true },
  { name: 'Store', href: '/', current: false },
  { name: 'FAQs', href: '/faqs', current: false },
  { name: 'Docs', href: '/docs', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to={'/'}>
                    <img
                      className="block lg:hidden h-8 w-auto bg-transparent"
                      src="https://bookverse.s3.eu-west-3.amazonaws.com/luis.png?shade=500"
                      alt="Logo"
                    />
                  </Link>
                  <Link to={'/'}>
                    <img
                      className="hidden lg:block h-8 w-auto bg-transparent"
                      src="https://bookverse.s3.eu-west-3.amazonaws.com/luis.png?shade=500"
                      alt="Logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({isActive}) => classNames(
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <SearchBar />
                <ConnectWallet />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
          {({ close }) => (
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  as="a"
                  to={item.href}
                  className={({isActive}) => classNames(
                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                  onClick={() => close()}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>)}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
