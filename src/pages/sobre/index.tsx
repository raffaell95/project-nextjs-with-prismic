import { GetStaticProps } from "next"
import styles from './styles.module.scss'

import { getPrismicClient } from "../../services/prismic"
import Prismic from '@prismicio/client'
import { RichText } from "prismic-dom"
import Head from "next/head"

import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

type Content = {
    title: string
    description: string
    banner: string
    facebook: string
    instagran: string
    linkedin: string
}

interface ContentProps {
    content: Content
}

export default function Sobre({ content }: ContentProps) {
    return (
        <>
            <Head>
                <title>Quem somos?</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <section className={styles.ctaText}>
                        <h1>{content.title}</h1>
                        <p>{content.description}</p>

                        <a href={content.facebook}>
                            <FaFacebook size={40} />
                        </a>

                        <a href={content.instagran}>
                            <FaInstagram size={40} />
                        </a>

                        <a href={content.linkedin}>
                            <FaLinkedin size={40} />
                        </a>

                    </section>

                    <img src={content.banner} alt="sobre o programador" />
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'about')
    ])

    const {
        title,
        description,
        banner,
        facebook,
        instagran,
        linkedin
    } = response.results[0].data

    const content = {
        title: RichText.asText(title),
        description: RichText.asText(description),
        banner: banner.url,
        facebook: facebook.url,
        instagran: instagran.url,
        linkedin: linkedin.url
    }

    return {
        props: {
            content
        },
        revalidate: 60 * 15 // a cada 15 minutos vai ser revalidada
    }
}