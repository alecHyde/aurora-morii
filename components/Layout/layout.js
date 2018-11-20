import Header from './header';

const auroraOuter = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '55em',
  background: `linear-gradient(45deg, #32a6ff 0%, #3f6fff 49%, #8d54ff 82%)`,
  animation: 'aurora 10s infinite'



}

const Layout = (props) => (
  <div >

      <Header />
      {props.children}
      <style jsx>{`
      
        div {
          background: linear-gradient(45deg, white 0%, #3f6fff 49%, black 82%);

          animation-duration: 4s;
          animation-iteration-count: infinite;
          
          animation-name: aurora;
          
          display: flex;
          flex-direction: column;
          min-height: 55em;
        }
        

        @keyframes aurora {
          0%  {
              background-color: red;
          }
          25% {
              background-color: green;
          }
          50% {
              background-color: blue;
          }
          75% {
              background-color: black;
          }
          100% {background-color: white;}
        }

      `}</style>

  </div>
)


export default Layout;






// .aurora-outer {
//     background: linear-gradient(45deg, #32a6ff 0%, #3f6fff 49%, #8d54ff 82%);
//     background-size: 200%;
//     animation: aurora 10s infinite;
// }

// .aurora-inner {
//     background: radial-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.15));
//     background-size: 200%;
//     animation: aurora 7s infinite;
// }

// @keyframes aurora {
//     0% {
//         background-position: left top;
//     }
//     25% {
//         background-position: right top;
//     }
//     50% {
//         background-position: right bottom;
//     }
//     75% {
//         background-position: left bottom;
//     }
//     100% {
//         background-position: left top;
//     }
// }

// div {
//     display: block;
//     height: 180px;
//     width: 180px;
//     position: relative;
// }

// .title {
//     position: absolute;
//     top: 50%;
//     left: 0;
//     right: 0;
//     margin: 0;
//     transform: translateY(-50%);
//     font-size: 32px;
//     text-align: center;
//     color: white;
// }

