import React, {useEffect, useState} from 'react';
import './Main.css';
import {Link} from 'react-router-dom';
import { getPostFromAPI } from '../../API';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { tokenActions } from '../../../store';

const Main = () => {
    const [listProduct, setListProduct] = useState([]);
    const token = useSelector(state=>state.token.token);
    const listData = useSelector(state=>state.token.listProduct);
    const dispatch = useDispatch();

    const searchHandle = e => {
        if(e.target.value.length > 1) {
            setListProduct(e.target.value.trim())
            setListProduct([]);
            listProduct.filter(data => {
                if(data.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').includes((e.target.value).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D'))) {
                    setListProduct(onSearch=>[...onSearch, data])
                }
                return [];
            })
        } else {
            setListProduct(listData);
        }
    }

    useEffect(() => {
        async function getPostFromAPIF() {
            const res = await getPostFromAPI(token)
            setListProduct(res.data);
            dispatch(tokenActions.listproductHandle(res.data));
            console.log(res.data);
        }
        getPostFromAPIF();
    }, [dispatch, token]);

    useEffect(() => {
        const isToken = localStorage.getItem('token');
        dispatch(tokenActions.tokenHandle(isToken));
    }, [dispatch]);

    return (
            <div className="card">
                <div className="product__list">
                    <div className="product__title">
                        <h2>Danh sách sinh vien</h2>
                        <input onChange={searchHandle} type="text" placeholder=" Nhập tên sinh viên"/>
                    </div>
                    <div className="row">
                        {listProduct.map((qlsv) => 
                        <div className="col l-2-4 gutter" key={qlsv.id}>
                            <div className="product-item">
                                <Link to={`/page/qlsv/${qlsv.id}`}>
                                    
                                    <div className="product-description">
                                        <span>{qlsv.hoten}</span>
                                        <h4>{qlsv.msv}</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>)}
                        
                    </div>
                </div>
            </div>
    );
};

export default Main;