import React from "react";
import s from "./navbar.module.scss";
import Link from "next/link";
import Router, { useRouter } from "next/router";

export default function Navbar() {

    const router = useRouter();

    function Navigation(): JSX.Element {
        if (router.pathname === "/") {
            return (
                <>
                <Link href={"/dao"}><button className={s.dao}>dao</button></Link>
                {/* <Link href={"/howtouse"}><button className={s.dao}>how to use</button></Link> */}
                </>
            )
        } 
        if (router.pathname === "/dao" || router.pathname === "/howtouse") {
            return (
                <Link href={"/"}><button className={s.home}>library</button></Link>
            )
        }

        return <></>
    }

    return (
        <nav className={s.nav}>
            <div>
                <Link href={"/"}>
                    <h1>BASEMUGAR</h1>
                </Link>
            </div>
            <div>
                <a href="https://sepolia.arbiscan.io/address/0x65aeC0B96491566e9055c57e882d45d86De24219" target="_blank"><button>contract</button></a>
                {Navigation()}
            </div>
        </nav>
    )
}