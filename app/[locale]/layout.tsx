import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from "../../i18n/routing";
import "styles/tailwind.css"


export default async function LocaleLayout({
                                               children,

                                           }: {
    children: React.ReactNode;
}) {
    // if (!routing.locales.includes(params.locale)) {
    //     notFound();
    // }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html>
        <body>
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}