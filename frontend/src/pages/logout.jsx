import './logout.css';

function Logout() {
   return (
      <>
         <div className="logout-container">
            <h1 className='logout-h1'>You have been logged out</h1>
            <p className='logout-p'>For logging in again click<a href='/login'>login</a></p>
         </div>
      </>
   )
}
export default Logout