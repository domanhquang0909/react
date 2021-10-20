import React,  {useRef} from "react";
import {useSelector} from 'react-redux';
import { postQlsvToAPI } from '../../API';

const AddQlsv = () =>{
    const token = useSelector(state=>state.token.token);
    const hoten = useRef();
    const msv = useRef();
    const gt = useRef();
    const ngaysinh = useRef();
    const sdt = useRef();
    const email = useRef();
    const diachi = useRef();


    const submit= async (e) =>{
        e.preventDefault();
        let data ={
            "hoten":hoten.current.value,
            "msv":msv.current.value,
            "gt" :gt.current.value,
            "ngaysinh":ngaysinh.current.value,
            "sdt":sdt.current.value,
            "email":email.current.value,
            "diachi":diachi.current.value
        }

        let status = await postQlsvToAPI(token , data);
        if(status.statusText=== "OK"){
            alert('Thêm thông tin sinh viên thành công!');

        }else{
            alert('Thêm thông tin sinh viên không thành công');
        }
    }

    return (
        <div className="card" onSubmit={submit}>
            <div className="main-update">

                <form className='update-product'>
                    <ul>
                        <h2>Thêm sinh viên</h2>
                        <li>
                            <span>Tên sinh viên:</span>
                            <input ref={hoten} type="text" placeholder='Nhập tên sinh viên ' />
                        </li>
                        <li>
                            <span>Mã sinh viên</span>
                            <input ref={msv} type="text" placeholder='Nhập mã sinh viên ' />
                        </li>
                        <li>
                            <span>Giới tính</span>
                            <input ref={gt} type="radio" value="Nam" />Nam
                            <input rel={gt} type="radio" value="Nữ"/>Nữ

                        </li>
                        <li>
                            <span>Ngày sinh</span>
                            <input ref={ngaysinh} type="date" placeholder='Nhập ngày sinh ' />
                        </li>
                        <li>
                            <span>Số điện thoại</span>
                            <input ref={sdt} type="text" placeholder='Nhập số điện thoại '  />
                        </li>
                        <li>
                            <span>Email</span>
                            <input ref={email} type="email" placeholder='Nhập email ' />
                        </li>
                        <li>
                            <span>địa chỉ</span>
                            <input ref={diachi} type="text" placeholder='Nhập địa chỉ ' />
                        </li>
                        
                        <button className='btn-add' type="submit">Thêm sinh viên</button>
                    </ul>
                </form>
            </div>
        </div>
    );
};
export default AddQlsv;