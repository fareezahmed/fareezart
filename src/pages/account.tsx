import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import Header from '../components/header';

export default function Home() {

  return (
    <>
      <Head>
        <title>My Account | RAAZ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <h1 className={styles.title}>My Account</h1>
      </main>
    </>
  )
}
