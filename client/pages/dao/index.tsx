import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from 'embla-carousel'
import s from "./dao.module.scss";
import Carousel from "@/components/carousel/carousel";
import Divider from "@/components/divider/divider";
import Web3 from "web3";
import { DAOABI } from "@/abi/dao";

export default function Dao() {

    const web3 = new Web3(new Web3.providers.HttpProvider("https://arbitrum-sepolia-rpc.publicnode.com/"));

    const daocontractaddress = "0xFD7F4cb794BB6ea7dC2754898cD67182a637bBDF"
    const daocontract = new web3.eth.Contract(DAOABI, daocontractaddress);

    const [contractbalance, setContractbalance] = useState<any>();
    async function getcontractbalance() {
        try {
            const res = await web3.eth.getBalance(daocontractaddress);
            console.log(res);
            setContractbalance(web3.utils.fromWei(res, 'ether'));
        } catch (e) {
            console.error(e);
        }
    }

    const proposalsexamples = [
        {
            maker: "0x0000000000",
            votes: 0,
            entry: {
                name: "The Iliad",
                author: "Homer",
                medium: "poem",
                year: -800,
                language: "greek",
                cid: "QmZ1"
            }
        },
        {
            maker: "0x0000000000",
            votes: 0,
            entry: {
                name: "The Odyssey",
                author: "Homer",
                medium: "poem",
                year: -800,
                language: "greek",
                cid: "QmZ2"
            }
        }
    ]

    const [proposals, setProposals] = useState<any[]>([]);
    async function getproposals() {
        try {
            const res = await daocontract.methods.getEntryProposals().call();

            const newproposals = []

            for (let i = 0; i < res!.length; i++) {
                console.log((res as any)[i]);
                console.log((res as any)[i].creator);
                console.log((res as any)[i].votes);
                console.log((res as any)[i].name);
                console.log((res as any)[i].author);
                console.log((res as any)[i].medium);
                console.log((res as any)[i].yearReleased);
                console.log((res as any)[i].language);
                console.log((res as any)[i].cid);
                console.log("-------------------")

                if ((res as any)[i].cid == "") continue;

                let newproposal = {
                    maker: (res as any)[i].creator,
                    votes: (res as any)[i].votes.toString(),
                    entry: {
                        name: (res as any)[i].name,
                        author: (res as any)[i].author,
                        medium: (res as any)[i].medium,
                        year: (res as any)[i].yearReleased,
                        language: (res as any)[i].language,
                        cid: (res as any)[i].cid
                    }
                }

                newproposals.push(newproposal)
            }

            setProposals(newproposals);
        } catch (e) {
            console.error(e);
        }
    }

    const moniesexample = [
        {
            reason: "maintenance",
            to: "0x0000000000",
            value: 100,
            creator: "0x1111111111",
            votes: 0
        },
        {
            reason: "acquisition",
            to: "0x0000000000",
            value: 100,
            creator: "0x1111111111",
            votes: 0
        }
    ]
    const [monies, setMonies] = useState<any[]>([]);
    async function getmonies() {
        try {
            const res = await daocontract.methods.getSpendMoneyProposals().call();
            console.log(res);
            const newmonies = []

            for (let i = 0; i < res!.length; i++) {
                console.log((res as any)[i].creator);
                console.log((res as any)[i].votes);
                console.log((res as any)[i]['0'].reason);
                console.log((res as any)[i]['0'].to);
                console.log((res as any)[i]['0'].value);
                console.log("-------------------")

                let newmoney = {
                    creator: (res as any)[i].creator,
                    votes: (res as any)[i].votes.toString(),
                    reason: (res as any)[i]['0'].reason,
                    to: (res as any)[i]['0'].to,
                    value: (res as any)[i]['0'].value
                }

                newmonies.push(newmoney)
            }

            setMonies(newmonies);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getproposals();
        getmonies();
        getcontractbalance();
    }, []);

    const [donation, setDonation] = useState<number>()
    async function donate() {
        // @ts-ignore
        await window.ethereum.enable();
        console.log("donating", donation);
        try {
            if (!donation || donation <= 0) {
                return;
            }

            console.log("getting acc")
            const accounts = await web3.eth.getAccounts(); 
            if (accounts.length === 0) {
                console.error('No account found');
                return;
            }
            const account = accounts[0]; 

            const donationAmount = web3.utils.toWei(donation.toString(), 'ether');
            await daocontract.methods.donate().send({ from: account, value: donationAmount });

            setDonation(undefined);
        } catch (error) {
            console.error('Donation error:', error);
        }
    }


    const OPTIONS: EmblaOptionsType = { align: 'start', loop: true }

    const members = [
        {
            name: "Wes",
            description: "Co-founder of BASEMUGAR",
            link: "@wezabis"
        },
        {
            name: "Saad",
            description: "Co-founder of BASEMUGAR",
            link: "@gi1lgamesh"
        }
    ]

    function librarians(): JSX.Element[] {
        return members.map((member, index) => {
            return (
                <div key={index} className={s.member}>
                    <h2>{member.name}</h2>
                    <p>{member.description}</p>
                    <a href={`https://twitter.com/${member.link}`}>{member.link}</a>
                </div>
            )
        })
    }

    function entries(): JSX.Element[] {
        return proposals.map((proposal, index) => {
            return (
                <div key={index} className={s.proposal}>
                    <div className={s.hex}>{proposal.entry.cid}</div>
                    <div className={s.entry}>
                        <h2>{proposal.entry.name}</h2>
                        <p>{proposal.entry.author}</p>
                        <p>{proposal.entry.medium}</p>
                        {/* <p>{proposal.entry.year}</p> */}
                        {/*  <p>{proposal.entry.language}</p> */}
                    </div>
                    <div className={s.voting}>
                        {/* <div className={s.maker}>{proposal.maker}</div> */}
                        <div className={s.votes}>{proposal.votes} votes</div>
                        <button className={s.vote}>vote</button>
                    </div>
                </div>
            )
        })
    }

    function monetaries(): JSX.Element[] {
        return moniesexample.map((money, index) => {
            return (
                <div key={index} className={s.monetary}>
                    <div className={s.value}>{money.value} ETH</div>
                    <h2 className={s.reason}>{money.reason}</h2>
                    <div className={s.addr}>
                        <div className={s.to}>{money.to}</div>
                        <div className={s.creator}>{money.creator}</div>
                    </div>
                    <div className={s.voting}>
                        <div className={s.votes}>{money.votes} votes</div>
                        <button className={s.vote}>vote</button>
                    </div>
                </div>
            )
        })
    }

    return (
        <section className={s.dao}>
            <h1 className={s.librarians}>MUGARDAO</h1>

            <Divider content="banking" />
            <div className={s.bank}>
                <h2>balance: {contractbalance} ETH</h2>
                <div>
                    <input type="number" value={donation} onChange={(e) => setDonation(parseInt(e.target.value))}
                        placeholder="donate"
                    />
                    <button className={s.vote} onClick={donate}>donate</button>
                </div>
            </div>
            <Divider content="members" />
            <div className={s.library}>
                <Carousel slides={librarians()} options={OPTIONS} type="quarter" />
            </div>

            <Divider content="proposals" />
            <div className={s.library}>
                <Carousel slides={entries()} options={OPTIONS} type="half" />
            </div>

            <Divider content="monetary" />
            <div className={s.library}>
                <Carousel slides={monetaries()} options={OPTIONS} type="half" />
            </div>
        </section>
    );
}