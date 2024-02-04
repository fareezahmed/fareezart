import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next';

import Header from '@/components/header'
import Hero from '@/components/hero'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white">
        <Header />
        <Hero />
        <main>
          <Hero />
          <Hero />
          <Hero />
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;
  const res = await fetch(`http://localhost:3000/locales/en/common.json`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, [
//         'common',
//         'footer',
//       ])),
//       // Will be passed to the page component as props
//     },
//   }
// }