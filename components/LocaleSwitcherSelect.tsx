'use client';

import {useParams, useSearchParams} from 'next/navigation';
import {useLocale} from "next-intl";
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {Locale, routing, usePathname, useRouter} from '../i18n/routing';




export default function LocaleSwitcherSelect() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();
    const query = Object.fromEntries(searchParams.entries());
    const local=useLocale();
    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value as Locale;
        startTransition(() => {
            router.push(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                {pathname,  params,query},
                {locale: nextLocale},
            );
        });
    }

    return (

            <select
                className="absolute right-0 w-24 h-8 top-0 mr-8 mb-8 px-2 text-xs font-semibold text-black bg-white border border-black rounded hover:bg-gray-100"
                defaultValue={local}
                disabled={isPending}
                onChange={onSelectChange}
            >
                {routing.locales.map((cur) => (
                    <option key={cur} value={cur}>
                        {cur==='en'?'English':'中文简体'}
                    </option>
                ))}
            </select>
    );
}