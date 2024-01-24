import imageCompression from 'browser-image-compression';

export const ImgCompression = async (file: File) => {
  try {
    const options = {
      maxSizeMB: 10, // 이미지 최대 용량
      maxWidthOrHeight: 256, // 이미지 최대 너비 및 높이
      useWebWorker: true, // webworker 적용 유무
      // webworker : 웹 워커 API가 멀티 스레딩을 지원하게 되어 워커를 이용하면 워커에서 작성된 스크립트는
      // 메인 스레드에서 분기되어 독립된 스레드로 실행되기 때문에 메모리 자원을 효율적으로 사용할 수 있다.
    };

    //imageCompression 함수는 blob 타입을 반환해 준다.
    const compressedFileBlob = await imageCompression(file, options);

    //File 타입의 이미지를 return 하기 위해 new File로 File 인스턴스 생성 (이름 & type)
    const compressedFile = new File([compressedFileBlob], file.name, {
      type: file.type,
    });

    //preview 이미지는 src='' , url 형식이므로 imageCompression에서 제공하는 getDataUrlFromFile 함수를 사용해 file-> url 문자열로 변환
    const preview = await imageCompression.getDataUrlFromFile(file);
    return { compressedFile, preview };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
