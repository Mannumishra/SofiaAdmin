import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from './sofiaLogo.png'

const Header = () => {
  const [sidetoggle, setSideToggle] = useState(false)

  const handletoggleBtn = () => {
    setSideToggle(!sidetoggle)
  }
  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            {/* <h2>SW Health Admin Panel</h2> */}
            <img src={logo} alt="" style={{ width: "300px" }} />
            <div className="bar" onClick={handletoggleBtn}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <a href="" target="_blank">
              <i class="fa-solid fa-globe"></i>
              Go To Website
            </a>

            <div className="logout">
              Log Out <i class="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>

        </div>

        <div className={`rightNav ${sidetoggle ? "active" : ""} `}>
          <ul>
            <li><Link to="/dashboard" onClick={handletoggleBtn}> <i class="fa-solid fa-gauge"></i> Dashboard</Link></li>
            <li><Link to="/all-dealership-query" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> DealerShip Query</Link></li>
            <li><Link to="/all-getintouch-query" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> GetInTouch Query</Link></li>
            <li><Link to="/all-contact-query" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> Contact Query</Link></li>
            <li><Link to="/all-category" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Manage Category</Link></li>
            <li><Link to="/all-inplants" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Manage Inplants</Link></li>
            <li><Link to="/all-instupment" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Manage Instupment</Link></li>
            <li><Link to="/all-inplants-products" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> Manage Inplants Product</Link></li>
            <li><Link to="/all-instupment-products" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> Manage Instupment Product</Link></li>
            <li><Link to="/all-catalog" onClick={handletoggleBtn}> <i class="fa-brands fa-unsplash"></i> Manage Catalog</Link></li>
           <li><Link to="/all-testimonial" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Manage Testimonial</Link></li>
             {/* <li><Link to="/all-banners" onClick={handletoggleBtn}> <i class="fa-regular fa-images"></i> Manage Banners</Link></li>
            <li><Link to="/all-voucher" onClick={handletoggleBtn}> <i class="fa-brands fa-cc-discover"></i> Manage Voucher</Link></li>
            <li><Link to="/all-users" onClick={handletoggleBtn}> <i class="fa-solid fa-user"></i> All Users</Link></li>
            <li><Link to="/all-orders" onClick={handletoggleBtn}> <i class="fa-solid fa-truck-arrow-right"></i> Manage Orders</Link></li> */}

            <button className='logout mb-5'>Log Out <i class="fa-solid fa-right-from-bracket"></i></button>

          </ul>
        </div>

      </header>
    </>
  )
}

export default Header