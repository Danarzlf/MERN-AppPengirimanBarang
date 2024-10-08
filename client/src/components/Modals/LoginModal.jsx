import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled-components for the modal
const StyledModal = styled(Modal)`
  .modal .modal-dialog.modal-full-width {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    left: 0 !important;
    right: 0 !important
}

.modal .modal-content {
    border: 0;
    border-radius: 3px
}

.modal.fade.modal-top-left .modal-dialog {
    width: 100%;
    position: absolute;
    top: 0
}

@media (min-width:576px) {
    .modal.fade.modal-top-left .modal-dialog {
        left: 1.75rem;
        margin: 1.75rem auto
    }
}

@media (max-width:767.98px) {
    .modal.fade.modal-top-left .modal-dialog {
        width: calc(100% - (.5rem*2))
    }
}

.modal.fade.modal-top-right .modal-dialog {
    width: 100%;
    position: absolute;
    top: 0
}

@media (min-width:576px) {
    .modal.fade.modal-top-right .modal-dialog {
        right: 1.75rem;
        margin: 1.75rem auto
    }
}

@media (max-width:767.98px) {
    .modal.fade.modal-top-right .modal-dialog {
        width: calc(100% - (.5rem*2))
    }
}

.modal.fade.modal-bottom-right .modal-dialog {
    width: 100%;
    position: absolute;
    bottom: 0
}

@media (min-width:576px) {
    .modal.fade.modal-bottom-right .modal-dialog {
        right: 1.75rem;
        margin: 1.75rem auto
    }
}

@media (max-width:767.98px) {
    .modal.fade.modal-bottom-right .modal-dialog {
        width: calc(100% - (.5rem*2))
    }
}

.modal.fade.modal-bottom-left .modal-dialog {
    width: 100%;
    position: absolute;
    bottom: 0
}

@media (min-width:576px) {
    .modal.fade.modal-bottom-left .modal-dialog {
        left: 1.75rem;
        margin: 1.75rem auto
    }
}

@media (max-width:767.98px) {
    .modal.fade.modal-bottom-left .modal-dialog {
        width: calc(100% - (.5rem*2))
    }
}

.modal.fade.modal-bottom-center .modal-dialog {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0
}

@media (min-width:576px) {
    .modal.fade.modal-bottom-center .modal-dialog {
        margin: 1.75rem auto
    }
}

@media (max-width:767.98px) {
    .modal.fade.modal-bottom-center .modal-dialog {
        width: calc(100% - (.5rem*2))
    }
}

.modal .close {
    position: absolute;
    z-index: 1;
    right: 10px !important;
    top: 10px !important;
    height: 2.5rem;
    width: 2.5rem;
    background: rgba(193, 193, 193, .3) !important;
    border-radius: 50%;
    font-size: 1.8rem;
    padding: 0
}

.modal .close:focus {
    outline: 0
}

.modal .close span {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16'%3E%3Cpath d='M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3 c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    color: transparent;
    text-shadow: none;
    background-position: center
}

.modal .close.light span {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3 c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z'/%3E%3C/svg%3E")
}

.modal .close.size-sm {
    transform: scale(.5);
    right: .5rem;
    top: .5rem
}

.modal .close.close-pinned {
    top: -19px;
    right: -19px
}

.modal[data-popup=true] {
    position: relative;
    top: unset;
    left: unset;
    right: unset;
    bottom: unset;
    width: unset;
    height: unset
}

.modal[data-popup=true].fade.modal-bottom-center .modal-dialog,
.modal[data-popup=true].fade.modal-bottom-left .modal-dialog,
.modal[data-popup=true].fade.modal-bottom-right .modal-dialog,
.modal[data-popup=true].fade.modal-top-left .modal-dialog,
.modal[data-popup=true].fade.modal-top-right .modal-dialog {
    position: fixed
}

.modal[data-popup=true].fade .modal-content {
    box-shadow: 0 20px 60px -2px rgba(18, 21, 35, .19)
}

.body-scrollable {
    overflow: unset;
    padding-right: unset !important
}

.body-scrollable .modal-backdrop {
    display: none
}

.modal-backdrop {
    background: #2d343a
}

.btn-cta {
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 15px 20px;
    font-size: .8rem;
    font-weight: 600;
    background: var(--main-color);
    border : none;
}

.event-type {
    border: 3px solid #e0e6ed;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: all ease .2s;
    transition-delay: .3s
}

.event-type .event-indicator {
    transition: all cubic-bezier(0, .89, .44, 1) .2s;
    transform: scale(0);
    opacity: 0;
    transition-delay: .5s
}

.show .event-type .event-indicator {
    transform: scale(1);
    opacity: 1
}

.show .event-type {
    border-color: #e0e6ed;
    background-color: #e0e6ed
}

.show .event-type.success {
    border-color: #0c9;
    background-color: #0c9
}

.show .event-type.error {
    border-color: #f2545b;
    background-color: #f2545b
}

.show .event-type.warning {
    border-color: #f7bc06;
    background-color: #f7bc06
}

.show .event-type.info {
    border-color: #19b5fe;
    background-color: #19b5fe
}


.modal .overlay {
    background-color: rgba(0, 0, 0, .35)
}

.modal .overlay-light {
    background-color: rgba(0, 0, 0, .15)
}

.modal .pull-up-lg {
    margin-top: -70px
}

.modal .border-thick {
    border-width: .3rem !important
}

.bg-img {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat
}

.pointer-events-none {
    pointer-events: none
}

.m-h-10 {
    min-height: 10vh
}

.m-h-20 {
    min-height: 20vh
}

.m-h-30 {
    min-height: 30vh
}

.m-h-40 {
    min-height: 40vh
}

.m-h-50 {
    min-height: 50vh
}

.m-h-60 {
    min-height: 60vh
}

.m-h-70 {
    min-height: 70vh
}

.m-h-80 {
    min-height: 80vh
}

.m-h-90 {
    min-height: 90vh
}

.m-h-100 {
    min-height: 100vh
}

.bg-rhino {
    background-color: #28304e !important
}

.btn-cstm-light {
    color: #212841;
    background-color: #fff;
    border-color: #fff
}

.btn-cstm-light:hover {
    color: #212841;
    background-color: #ececec;
    border-color: #e6e6e6
}

.btn-cstm-light.focus,
.btn-cstm-light:focus {
    box-shadow: 0 0 0 .2rem rgba(255, 255, 255, .5)
}

.btn-cstm-light.disabled,
.btn-cstm-light:disabled {
    color: #212841;
    background-color: #fff;
    border-color: #fff
}

.btn-cstm-light:not(:disabled):not(.disabled).active,
.btn-cstm-light:not(:disabled):not(.disabled):active,
.show>.btn-cstm-light.dropdown-toggle {
    color: #212841;
    background-color: #e6e6e6;
    border-color: #dfdfdf
}

.btn-cstm-light:not(:disabled):not(.disabled).active:focus,
.btn-cstm-light:not(:disabled):not(.disabled):active:focus,
.show>.btn-cstm-light.dropdown-toggle:focus {
    box-shadow: 0 0 0 .2rem rgba(255, 255, 255, .5)
}

.btn-cstm-dark {
    color: #fff;
    background-color: #28304e;
    border-color: #28304e
}

.btn-cstm-dark:hover {
    color: #fff;
    background-color: #1b2035;
    border-color: #171b2c
}

.btn-cstm-dark.focus,
.btn-cstm-dark:focus {
    box-shadow: 0 0 0 .2rem rgba(40, 48, 78, .5)
}

.btn-cstm-dark.disabled,
.btn-cstm-dark:disabled {
    color: #fff;
    background-color: #28304e;
    border-color: #28304e
}

.btn-cstm-dark:not(:disabled):not(.disabled).active,
.btn-cstm-dark:not(:disabled):not(.disabled):active,
.show>.btn-cstm-dark.dropdown-toggle {
    color: #fff;
    background-color: #171b2c;
    border-color: #121624
}

.btn-cstm-danger {
    color: #fff;
    background-color: #f2545b;
    border-color: #f2545b
}

.btn-cstm-danger:hover {
    color: #fff;
    background-color: #ef3039;
    border-color: #ee252e
}

.btn-cstm-danger.focus,
.btn-cstm-danger:focus {
    box-shadow: 0 0 0 .2rem rgba(242, 84, 91, .5)
}

.btn-cstm-danger.disabled,
.btn-cstm-danger:disabled {
    color: #fff;
    background-color: #f2545b;
    border-color: #f2545b
}

.btn-cstm-danger:not(:disabled):not(.disabled).active,
.btn-cstm-danger:not(:disabled):not(.disabled):active,
.show>.btn-cstm-danger.dropdown-toggle {
    color: #fff;
    background-color: #ee252e;
    border-color: #ed1922
}

.btn-cstm-danger:not(:disabled):not(.disabled).active:focus,
.btn-cstm-danger:not(:disabled):not(.disabled):active:focus,
.show>.btn-cstm-danger.dropdown-toggle:focus {
    box-shadow: 0 0 0 .2rem rgba(242, 84, 91, .5)
}

.btn-cstm-success {
    color: #fff;
    background-color: #0c9;
    border-color: #0c9
}

.btn-cstm-success:hover {
    color: #fff;
    background-color: #00a67c;
    border-color: #009973
}

.btn-cstm-success.focus,
.btn-cstm-success:focus {
    box-shadow: 0 0 0 .2rem rgba(0, 204, 153, .5)
}

.btn-cstm-success.disabled,
.btn-cstm-success:disabled {
    color: #fff;
    background-color: #0c9;
    border-color: #0c9
}

.btn-cstm-success:not(:disabled):not(.disabled).active,
.btn-cstm-success:not(:disabled):not(.disabled):active,
.show>.btn-cstm-success.dropdown-toggle {
    color: #fff;
    background-color: #009973;
    border-color: #008c69
}

.btn-cstm-success:not(:disabled):not(.disabled).active:focus,
.btn-cstm-success:not(:disabled):not(.disabled):active:focus,
.show>.btn-cstm-success.dropdown-toggle:focus {
    box-shadow: 0 0 0 .2rem rgba(0, 204, 153, .5)
}

.btn-cstm-secondary {
    color: #fff;
    background-color: #95aac9;
    border-color: #95aac9
}

.btn-cstm-secondary:hover {
    color: #fff;
    background-color: #7c96bc;
    border-color: #738fb8
}

.btn-cstm-secondary.focus,
.btn-cstm-secondary:focus {
    box-shadow: 0 0 0 .2rem rgba(149, 170, 201, .5)
}

.btn-cstm-secondary.disabled,
.btn-cstm-secondary:disabled {
    color: #fff;
    background-color: #95aac9;
    border-color: #95aac9
}

.btn-cstm-secondary:not(:disabled):not(.disabled).active,
.btn-cstm-secondary:not(:disabled):not(.disabled):active,
.show>.btn-cstm-secondary.dropdown-toggle {
    color: #fff;
    background-color: #738fb8;
    border-color: #6b88b3
}

.btn-cstm-secondary:not(:disabled):not(.disabled).active:focus,
.btn-cstm-secondary:not(:disabled):not(.disabled):active:focus,
.show>.btn-cstm-secondary.dropdown-toggle:focus {
    box-shadow: 0 0 0 .2rem rgba(149, 170, 201, .5)
}

body {
    font-family: Overpass
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: "Work Sans";
    font-weight: 600
}

.btn {
    font-family: "Work Sans"
}

.demo-panel {
    display: flex;
    overflow: hidden;
    height: 100vh
}

.demo-area {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center
}

.demo-sidebar {
    width: 320px;
    overflow: auto;
    height: 100vh;
    padding: 25px;
    background: #160f16
}

.modal-preview {
    opacity: .7;
    transition: all ease .2s;
    overflow: hidden
}

.modal-preview:hover {
    opacity: 1
}

.frame-window {
    flex: 1
}

.iframe {
    width: 100%;
    height: 100vh;
    border: 0
}

.modal-name {
    color: #fff;
    text-decoration: none;
    position: absolute;
    z-index: 1;
    bottom: 10px;
    background: #000;
    padding: 4px 10px;
    font-size: 10px;
    left: 10px;
    border-radius: 29px;
    text-transform: uppercase;
    font-weight: 600
}

.open-frame,
.open-frame:hover {
    text-decoration: none;
    position: relative;
    display: block;
    border: 2px solid rgba(255, 255, 255, .18);
    border-radius: .25rem;
    height: 181.89px;
    background: rgba(255, 255, 255, .09)
}

.font-worksans {
    font-family: 'Work Sans';
    font-weight: 600
}

.underline {
    color: inherit;
    border-bottom: 1px dashed currentColor;
    transition: all ease .2s
}

.underline:hover {
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid currentColor
}

@media (max-width:768px) {
    .frame-window {
        display: none
    }

    .demo-sidebar {
        flex: 1
    }
}

a.custom-anchor {
    height: 340px;
    display: block;
    background-size: 680px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 3s
}

a.custom-anchor:hover {
    background-position: center 0
`;

const LoginModal = ({ showModal, handleClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    handleClose();
    navigate('/login');
  };

  return (
    // <Modal centered show={showModal} onHide={handleClose}>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Login</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <p>You need to log in to proceed.</p>
    //     {/* Add your login form here */}
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={handleClose}>
    //       Close
    //     </Button>
    //     <Button variant="primary" onClick={handleLoginRedirect}>
    //       Log In
    //     </Button>
    //   </Modal.Footer>
    // </Modal>

    <StyledModal show={showModal} onHide={handleClose} centered dialogClassName="animated zoomInDown">
      <Modal.Header closeButton>
        {/* <Button variant="close" onClick={handleClose} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </Button> */}
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 m-h-20 bg-img rounded-left" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1525097596740-cb2a70e07e3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80)' }}></div>
            <div className="col-md-12 text-center py-5 px-sm-5">
              <h2>Login Diperlukan</h2>
              <p className="text-muted">Anda harus login untuk melanjutkan. Silakan login atau buat akun baru untuk mengakses fitur ini</p>
              <form>
                {/* <Button type="button" variant="dark" className="btn-block btn-cta" onClick={handleClose}>Close Modal</Button> */}
                <Button type="button" variant="dark" className="btn-block btn-cta" onClick={handleLoginRedirect}>Log In</Button>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </StyledModal>
  );
};

export default LoginModal;
