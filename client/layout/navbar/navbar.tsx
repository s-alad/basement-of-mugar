import React from "react";
import s from "./navbar.module.scss";
import Link from "next/link";
import Router, { useRouter } from "next/router";

export default function Navbar() {

    const router = useRouter();

    function Navigation(): JSX.Element {
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
                <a href="" target="_blank"><button>contract</button></a>
                {Navigation()}
            </div>
        </nav>
    )
}