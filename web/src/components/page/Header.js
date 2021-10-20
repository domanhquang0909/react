import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { tokenActions } from '../../store';
import './Header.css';


const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className="header">
            <div className="background"></div>
            <div className="card">
                <h2>QUẢN LÝ SINH VIÊN</h2>
                <div className='header__page'>
                    <NavLink activeClassName="active" to='/page/qlsv'>Sinh viên</NavLink>
                    <NavLink activeClassName="active" to='/page/add-qlsv'>Thêm sinh viên</NavLink>
                    <NavLink to='/' onClick={()=>{
                        localStorage.removeItem('token');
                        dispatch(tokenActions.tokenHandle(null))
                        }}>Đăng xuất</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;