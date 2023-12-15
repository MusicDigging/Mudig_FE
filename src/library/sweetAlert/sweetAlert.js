import Swal from 'sweetalert2';
import styles from './sweetalert.module.css';

const showCustomModal = (config) => {
  return Swal.fire(config);
};

// Modal configurations
export const confirmModal = {
  title: '정말로 회원탈퇴를 하시겠습니까?',
  text: '다시 되돌릴 수 없습니다.',
  icon: 'warning',
  showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
  confirmButtonColor: '#FF003E', // confrim 버튼 색깔 지정 #3085d6
  cancelButtonColor: '#5D9EFF', // cancel 버튼 색깔 지정#d33
  confirmButtonText: '확인', // confirm 버튼 텍스트 지정
  cancelButtonText: '아니오', // cancel 버튼 텍스트 지정
  reverseButtons: true, // 버튼 순서 거꾸로
  customClass: {
    icon: styles.customIcon,
    title: styles.customTitle,
    text: styles.customText,
    // popup: styles.customPopup,
  },
};

export const changePassworrdModal = {
  title: '비밀번호 변경 완료',
  text: '비밀번호가 변경되었습니다! 다시 로그인을 진행해주세요.',
  icon: 'success',
  customClass: {
    icon: styles.customIcon,
    title: styles.customTitle,
    text: styles.customText,
    // popup: styles.customPopup,
  },
};

export const successModal = {
  title: '회원탈퇴 완료',
  text: '그동안 뮤딕을 이용해주셔서 감사합니다.',
  icon: 'success',
  customClass: {
    icon: styles.customIcon,
    title: styles.customTitle,
    text: styles.customText,
    // popup: styles.customPopup,
  },
};

export { showCustomModal };
