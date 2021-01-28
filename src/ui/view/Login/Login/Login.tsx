import React from 'react'
import "./style.scss"
import { IoIosCloseCircle } from "react-icons/io"
import { AiOutlinePlus } from "react-icons/ai"

import { useHistory } from 'react-router'
const Login = () => {
    const history = useHistory();
    return (
        <section className="Login">
            <div className="container px-5-add py-4">
                <div className="row justify-content-between">
                    <div className="col-md-6">
                        <img src="images/dF5SId3UHWd.svg" className="component__logo mb-0" alt="" />
                        <h1 className="component__h1-title m-0">Đăng nhập gần đây</h1>
                        <p className="component__ft-15 color__gray mb-4">Nhấp vào ảnh của bạn hoặc thêm tài khoản</p>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="bg__white border__radius-5 component__card-profile card__active position-relative">
                                    <div className="close__up">
                                        <IoIosCloseCircle className="icon" />
                                    </div>
                                    <div className="close">
                                        <IoIosCloseCircle className="icon" />
                                    </div>
                                    <div className="box-notif">2</div>
                                    <img src="https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg" alt="" />
                                    <p className="m-0 px-3 py-2 text-center component__ft-18 color__gray lh__22">Joko</p>
                                </div>
                            </div>
                            <div className="col-md-5 component__min-30">
                                <div className="bg__white border__radius-5 component__card-profile position-relative">
                                    <div className="component__plus d-flex justify-content-center align-items-center">
                                        <div className="component__plus--icon">
                                            <AiOutlinePlus className="icon" />
                                        </div>
                                    </div>
                                    <p className="m-0 px-3 py-2 text-center component__ft-18 color__blue lh__22">Thêm tài khoản</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="bg__white component__form-card mb-4">
                            <form action="" className="px-3">
                                <div className="form-group">
                                    <input type="Text" placeholder="Email hoặc số điện thoại" className="form-control" name="" />
                                </div>
                                <div className="form-group">
                                    <input type="password" placeholder="Mật khẩu" className="form-control" name="" />
                                </div>
                                <button className="btn w-100 bg__blue color__white btn__font mb-2">Đăng nhập</button>
                            </form>
                            <div className="text-center component__tag-a">
                                <a href="#!">Quên mật khẩu</a>
                            </div>
                            <hr />
                            <div className="text-center">
                                <a href="#!" className="btn bg__green btn__create" onClick={() => history.push("/register")
                                }>Tạo tài khoản mới</a>
                            </div>
                        </div>
                        <p className="text-center component__ft-14">
                            <b>Tạo trang</b>  dành cho người nổi tiếng, nhãn hiệu hoặc doanh nghiệp.
					</p>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Login
