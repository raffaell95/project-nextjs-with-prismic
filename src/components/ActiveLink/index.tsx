import { ReactElement, cloneElement } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router';

interface ActiveLinkProps{
    children: ReactElement,
    activeClassName: string,
    href: string
}

export function ActiveLink({children, activeClassName, ...rest}: ActiveLinkProps){

    const { asPath } = useRouter()

    const className = asPath === rest.href ? activeClassName : ''

    return(
        <Link {...rest} legacyBehavior>
            {cloneElement(children, { className })}
        </Link>
    )
}