import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Form from '../components/Form'
import Link from 'next/link'
import ErrorMessage from '../components/ErrorMessage'
import { useState } from 'react'

export default function Home() {
  const [nameVal, setNameVal] = useState('')
  const submitHandler = (e) => {
    console.log(e)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      </Head>
      <div>
        <div className="m-4" style={{maxWidth: '360px'}}>
          <Form onSubmit={submitHandler}>
            <div className="mb-4">
              <label>Name</label>
              <input type="text" className="form-control" onInput={(e) => setNameVal(e.target.value)}></input>
              <ErrorMessage required minlength={2} value={nameVal}></ErrorMessage>
            </div>
            <div className="mb-4">
              <label>Select</label>
              <select required className="orca form-select">
                <option value="">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </Form>
        </div>
        <Link href="/hi">Hi</Link>
      </div>
     </div>
  )
}
