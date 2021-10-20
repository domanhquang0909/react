import React  from "react";
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import './DetaiQlsv.css';
import { deleteQlsvToAPI } from '../../API';


const DetailQlsv = () => {

    const qlsv= useSelector(state=>state.token.qlsv);
    const idParams=useParams();
    const qlsvdata= qlsv.filter(qlsv=>(qlsv.id.toString()===idParams.productId.toString()))[0];
    const token = useSelector(state=>state.state.token);
    const history=useHistory();


    return(
        <div className="card">
        <div className="row">
            
            <div className="col l-7 product-detail">
                <div className="product-detail__content">
                    <ul>
                    <h3>Chi tiết sản phẩm</h3>
                        <li><span>tên sinh viên:</span>{qlsvdata.hoten}</li>
                        <li><span>Msv:</span>{qlsvdata.msv}</li>
                        <li><span>Giới tính:</span>{qlsvdata.gt}</li>
                        <li><span>Ngày sinh</span>{qlsvdata.ngaysinh}</li>
                        <li><span>Số điện thoại</span>{qlsvdata.sdt}</li>
                        <li><span>Email</span>{qlsvdata.email}</li>
                        <li><span>Địa chỉ</span>{qlsvdata.diachi}</li>
                        <li>
                            <Link to={`/page/update/${qlsvdata.id}`}>
                            <button className='button-fix'>Sửa</button>
                            </Link>
                            <button className='button-delete' onClick={()=> {if(window.confirm("Bạn chắc muốn xóa sinh viên này chứ!")){
                                deleteQlsvToAPI(token, qlsvdata.id);
                                history.replace('/page/qlsv');
                                }}}>Xóa</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);
};
export default DetailQlsv;