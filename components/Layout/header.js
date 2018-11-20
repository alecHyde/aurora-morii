import Link from 'next/link';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  border: '5px solid #7751a9',
  background: '#032e3e'
}

const Header = () => (
  <div>
 
    <Link href="/">
      <button>Home</button>
    </Link>
    <Link href="/auroraForecast">
      <button>Aurora Forecast</button>
    </Link>
    <Link href="/aboutAuroraMorii">
      <button>About Aurora Morii</button>
    </Link>
    <Link href="/aboutTheAurora">
      <button>About The Aurora</button>
    </Link>
    <Link href="/FAQ">
      <button>FAQ</button>
    </Link>

    <style jsx>{`
      button {
        display: inline flex;
        flex-direction: row;
        flex-wrap: wrap;
        border: 2px solid #19646a; 
        border-radius: 4px;
        text-align: center;
        padding: 0.25em 0.75em;
        margin: 1em 0.1em;
        background: #00c690;
        color: #F5F5F5;
        font-weight: 700;
        font-size: 1.0em;
      }
      button:hover {
        background: #89ff77;
      }
      div {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        border: 5px solid #7751a9;
        background: #032e3e;

      }
    `}</style>
    

  </div>
)

export default Header;
