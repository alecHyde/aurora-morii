import Layout from '../components/Layout/layout';

const AboutAuroraMorii = () => (
  <Layout>
    <div className="first">
      <h1>First</h1>
    </div>
    <h3> Info about Aurora Morii goes here goes here </h3>
    <div className="second">
      <h1>Second</h1>
    </div>
    <style jsx>{`
      .first{
        color: green;
        background: yellow;

      }
      .second{
        color: red;
        background: blue;

      }

    `}
    </style>

  </Layout>
)

export default AboutAuroraMorii;