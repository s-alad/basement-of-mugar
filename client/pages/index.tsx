import { useState } from "react";
import s from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";


interface Entry {
  name: string;
  author: string;
  medium: string;
  yearReleased: number;
  language: string;
  CID: string;
}


export default function Index() {

  const [text, setText] = useState("")
  const [results, setResults] = useState<Entry[] | null>()
  const [loading, setLoading] = useState(false)
  
  async function search(term: string) {
    if (!term) {
      console.log("no search term");
      setResults(null);
      return;
    }
    setLoading(true);
    const uri = "/api/search?query=" + term;
    console.log(uri);
    console.log("searching for", term);
    try {
      const res = await fetch(uri);
      const { results } = await res.json();
      
      if (results.length > 0) {
        console.log("results", results);
        setResults(results);
      } else {
        console.log("no results");
        setResults(
          [
            {
              name: "no results",
              author: "no results",
              medium: "no results",
              yearReleased: -1,
              language: "no results",
              CID: "/"
            }
          ]
        )
      }

    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <section className={s.main}>
      <h1 className={s.basemugar}>BASEMENT OF MUGAR</h1>
      <div className={s.search}>
        <input type="text" placeholder="Search Literature"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => search(text)}>Search</button>
      </div>
      {

        loading ?
          <div className={s.loading}>
            <div className={s.loader}></div>
          </div>
          :
        results && results.length > 0 ?
          <div className={s.books}>
            {
              results.map((book, index) => {
                return (
                  <div key={index} className={s.book}>
                    <h2>{book.name}</h2>
                    <p>{book.author}</p>
                    <p>{book.medium}</p>
                    <p>{book.yearReleased}</p>
                    <p>{book.language}</p>
                    <p>{book.CID}</p>
                    <a href={`https://ipfs.io/ipfs/${book.CID}`} target="_blank">https://ipfs.io/ipfs{book.CID}</a>
                  </div>
                )
              })
            }
          </div>
          :
          <div className={s.library}>
            <Image src="/basemugar.jpg" alt="Alexandria Library" width={500} height={500} />
            <p>
              At the BASEMENT OF MUGAR, we believe that information should be free, easily accessible, and free from censorship. For much of the internet's history this has been the case however we've identified a flaw in the model used by platforms such as The Internet Archive and Google Scholar. These sites, despite their value, are costly to operate and maintain due to their reliance on centralized servers. While generous donations have sustained them thus far, future financial stability is uncertain. To address this, we've developed a new, more economical and sustainable method for storing digital content. Utilizing blockchain technology, specifically IPFS and an EVM-compatible chain, we can permanently archive digital information at a minimal cost. The only expense is maintaining an IPFS node, which, in our case, is a Raspberry Pi. Through this innovative approach, we aim to preserve and provide open access to a wealth of copyright-free books, news articles, research papers, and more, ensuring they remain free and accessible for everyone.
            </p>
          </div>
      }
    </section>
  );
}
