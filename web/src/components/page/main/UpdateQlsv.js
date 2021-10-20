import React, { useRef } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { putQlsvToAPI } from '../../API';
import './UpdateQlsv.css';

const UpdateQlsv = () => {
    const token = useSelector(state=>state.token.token);
    const listProduct = useSelector(state=>state.token.listProduct);
    const idParams = useParams();
    const data = listProduct.filter(qlsv=>(qlsv.id.toString() === idParams.updateId.toString()))[0];
    const hoten = useRef();
    const msv = useRef();
    const gt = useRef();
    const ngaysinh = useRef();
    const sdt = useRef();
    const email = useRef();
    const diachi = useRef();
    

    const submitHandle = async e => {
        e.preventDefault();
        
        const result = await putQlsvToAPI(token, data.id, {
            "hoten": hoten.current.value,
            "msv": msv.current.value,
            "gt": gt.current.value,
            "ngaysinh": ngaysinh.current.value,
            "sdt": sdt.current.value,
            "email": email.current.value,
            "diachi": diachi.current.value,
            
        })

        if(result.status === 204) {
            alert('Sửa thành công!')
        } else {
            alert('Thất bại!')
        }
    }
    return (
        <div className="card">
            <div className="main-update">
                <form className='update-product' onSubmit={submitHandle}>
                    <ul>
                        <h2>Thay đổi thông tin sinh viên {idParams.updateId}</h2>
                        <li>
                            <span>Họ và tên</span>
                            <input ref={hoten} type="text" defaultValue={data.hoten} />
                        </li>
                        <li>
                            <span>Mã sinh viên</span>
                            <input ref={msv} type="text" defaultValue={data.msv} />
                        </li>
                        <li>
                            <span>Giới tính</span>
                            <input ref={gt} type="radio" defaultValue={data.gt} />Nam
                            <input ref={gt} type="radio" defaultValue={data.gt} />Nữ
                        </li>
                        <li>
                            <span>Thể loại:</span>
                            <input ref={ngaysinh} type="date" defaultValue={data.ngaysinh} />
                        </li>
                        <li>
                            <span>Số điện thoại</span>
                            <input ref={sdt} type="text"  defaultValue={data.sdt} />
                        </li>
                        <li>
                            <span>Email</span>
                            <input ref={email} type="email" defaultValue={data.email} />
                        </li>
                        <li>
                            <span>Địa chỉ</span>
                            <input ref={diachi} type="text" defaultValue={data.diachi} />
                        </li>
                    
                        <button className='button-fix' type="submit">Sửa</button>
                    </ul>
                </form>
            </div>
        </div>
    );
};

export default UpdateQlsv;