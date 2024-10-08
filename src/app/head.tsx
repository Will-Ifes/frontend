import Head from "next/head";

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta
          name="description"
          content="This is a description of my page content"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="My page title" key="title" />
        <meta
          property="og:description"
          content="This is a description of my page content"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.example.com" />
        <meta property="og:image" content="https://www.example.com/image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My page title" />
        <meta
          name="twitter:description"
          content="This is a description of my page content"
        />
        <meta
          name="twitter:image"
          content="https://www.example.com/image.jpg"
        />
      </Head>
      <p>Hello world!</p>
    </div>
  );
}

export default IndexPage;
